import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "../components/ui/scroll-area";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import MessageInput from "../components/MessageInput";

interface User {
    _id: string;
    name: string;
    email: string;
    isAdmin?: boolean;
}

interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    text: string;
    image?: string;
    createdAt: string;
}

const AdminChatPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [loggedUser, setLoggedUser] = useState<User | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    const [isVerifying, setIsVerifying] = useState<boolean>(true); // new flag

    const navigate = useNavigate();

    // ===== Improved Admin verification =====
    // This combines the admin check + a user verify call to ensure we have a real user object (with _id)
    useEffect(() => {
        const verifyAdminAndUser = async () => {
            setIsVerifying(true);
            try {
                // 1) admin check (keeps your existing admin logic)
                const adminRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/admin`, {
                    withCredentials: true,
                });

                if (!adminRes.data?.success || !adminRes.data?.isAdmin) {
                    // not an admin -> redirect to normal chat
                    navigate("/chat");
                    return;
                }

                // 2) fetch the full logged user (important to get _id)
                // Some backends return user in the admin endpoint, some don't — this ensures we have it
                const verifyRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/verify`, {
                    withCredentials: true,
                });

                if (!verifyRes.data?.user?._id) {
                    console.error("Admin verified but couldn't fetch user data:", verifyRes.data);
                    // if verify fails, send them to signup or show an error page
                    navigate("/signup");
                    return;
                }

                // mark as admin and store user
                const userObj: User = { ...verifyRes.data.user, isAdmin: true };
                setLoggedUser(userObj);
                localStorage.setItem("user", JSON.stringify(userObj));
                console.log("✅ Admin verified and logged user set:", userObj._id);
            } catch (err: any) {
                // Log more info to console so you can debug network / CORS / auth errors
                console.error("Admin/User verification error:", err?.response?.data || err.message || err);
                // If token expired or unauthorized, redirect to signup/login
                if (err?.response?.status === 401) {
                    navigate("/signup");
                } else {
                    // fallback: navigate to signup to force re-login (keep same behavior as original)
                    navigate("/signup");
                }
            } finally {
                setIsVerifying(false);
            }
        };

        verifyAdminAndUser();
    }, [navigate]);

    // Load all users (unchanged)
    const loadUsers = useCallback(async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/messages/allusers`, {
                withCredentials: true,
            });
            setUsers(res.data.users);
        } catch (err) {
            console.error("Error loading users:", err);
        }
    }, []);

    // Load messages (unchanged)
    const loadMessages = useCallback(
        async (receiverId: string) => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/messages/${receiverId}`,
                    { withCredentials: true }
                );
                setMessages(res.data.messages || []);
            } catch (err) {
                console.error("Error loading messages:", err);
            }
        },
        []
    );

    // Socket setup (unchanged logic; only starts when loggedUser is present with _id)
    useEffect(() => {
        if (!loggedUser?._id) return;

        const newSocket = io(import.meta.env.VITE_API_URL, {
            withCredentials: true,
            query: { userId: loggedUser._id },
        });

        newSocket.on("Online Users", (users: string[]) => setOnlineUsers(users));

        newSocket.on("newMessage", (msg: Message) => {
            if (msg.senderId === selectedUser?._id || msg.receiverId === selectedUser?._id) {
                setMessages((prev) => [...prev, msg]);
            }
        });

        newSocket.on("messageDeleted", (msgId: string) => {
            setMessages((prev) => prev.filter((m) => m._id !== msgId));
        });


        setSocket(newSocket);
        return () => newSocket.disconnect();
    }, [loggedUser, selectedUser]);

    // Initial load of users & restore selected user
    useEffect(() => {
        loadUsers();
        const savedUser = localStorage.getItem("selectedUser");
        if (savedUser) setSelectedUser(JSON.parse(savedUser));
    }, [loadUsers]);

    // Reload messages on selected user change
    useEffect(() => {
        if (selectedUser) {
            loadMessages(selectedUser._id);
            localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
        }
    }, [selectedUser, loadMessages]);

    // Long press handlers
    const getLongPressHandlers = (callback: () => void, ms = 600) => {
        let timer: NodeJS.Timeout;
        const start = () => (timer = setTimeout(callback, ms));
        const clear = () => clearTimeout(timer);
        return {
            onTouchStart: start,
            onTouchEnd: clear,
            onTouchMove: clear,
            onMouseDown: start,
            onMouseUp: clear,
            onMouseLeave: clear,
            onContextMenu: (e: React.MouseEvent) => { e.preventDefault(); callback(); },
        };
    };

    // Delete message (unchanged)
    const handleDeleteMessage = async (id: string) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/messages/delete/${id}`, {
                withCredentials: true,
            });
            setMessages((prev) => prev.filter((m) => m._id !== id));
            setConfirmDelete(null);
        } catch (err) {
            console.error("Delete message failed:", err);
        }
    };


    // If still verifying, show verifying UI (keeps original look but now controlled by isVerifying)
    if (isVerifying) {
        return (
            <div className="h-screen flex items-center justify-center bg-[#121212] text-gray-400">
                Verifying user...
            </div>
        );
    }

    // If verification finished but loggedUser is still missing, show an error so you can debug
    if (!loggedUser) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-[#121212] text-gray-400">
                <p>Unable to verify admin user.</p>
                <p className="text-xs mt-2">Check console/network and backend auth.</p>
            </div>
        );
    }

    // ---------- (rest of your JSX stays the same) ----------
    return (
        <div className="min-h-[calc(100vh-64px)] flex bg-[#121212] text-white overflow-hidden">
            {/* Sidebar */}
            <div className={`fixed md:static z-30 top-0 left-0 h-[93vh] overflow-y-auto w-3/4 sm:w-2/5 md:w-1/4 bg-[#1a1a1a] border-r border-gray-700 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
                <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-[#ffcc00]">Users</h2>
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(false)}>✕</Button>
                </div>
                <ScrollArea className="flex-1 p-3 space-y-2 ">
                    {users.map((user) => (
                        <Card key={user._id} onClick={() => { setSelectedUser(user); setSidebarOpen(false); }} className={`p-3 cursor-pointer rounded-xl transition-all mb-[3%] ${selectedUser?._id === user._id ? "bg-[#ffcc00] text-black" : "bg-[#2a2a2a] hover:bg-[#333]"}`}>
                            <div className="flex justify-between items-center">
                                <span>{user.name}</span>
                                {onlineUsers.includes(user._id) && <span className="w-2 h-2 bg-green-500 rounded-full" />}
                            </div>
                        </Card>
                    ))}
                </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col h-[calc(100vh-64px)] w-full bg-[#121212] relative">
                {selectedUser ? (
                    <>
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-1 border-b border-gray-800 bg-[#121212]">
                            <div className="flex flex-col">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setSidebarOpen(true)}
                                    className="text-[#ffcc00] text-md ml-[2%] md:hidden"
                                >
                                    ☰ Side Bar
                                </Button>
                                <h2 className="text-xl font-semibold text-[#ffcc00] tracking-wide flex items-center gap-2">
                                    {selectedUser.name}
                                    {onlineUsers.includes(selectedUser._id) && (
                                        <span className="flex items-center gap-1 text-sm text-emerald-400">
                                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                                            Online
                                        </span>
                                    )}
                                </h2>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    Chat securely with {selectedUser.name}
                                </p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-hidden">
                            <ScrollArea className="h-full p-4 overflow-y-auto">
                                <div className="flex flex-col space-y-3 pb-4">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg._id}
                                            {...getLongPressHandlers(() => setConfirmDelete(msg._id))}
                                            className={`flex w-full px-2 mb-1 ${msg.senderId === loggedUser._id
                                                    ? "justify-end"
                                                    : "justify-start"
                                                }`}
                                        >
                                            <div
                                                className={`relative px-4 py-2 rounded-2xl shadow-sm text-sm leading-relaxed break-words
                    ${msg.senderId === loggedUser._id
                                                        ? "bg-[#f1c944] text-black rounded-br-none"
                                                        : "bg-[#2a2a2a] text-gray-100 rounded-bl-none"
                                                    }
                    max-w-[50%] sm:max-w-[70%] whitespace-pre-wrap`}
                                            >
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                    <div />
                                </div>
                            </ScrollArea>
                        </div>

                        {/* Confirm Delete Dialog */}
                        {confirmDelete && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
                                <div className="bg-[#1a1a1a] p-6 rounded-xl text-center space-y-4 w-80">
                                    <p className="text-lg text-white">Delete this message?</p>
                                    <div className="flex justify-center space-x-4">
                                        <Button
                                            onClick={() => handleDeleteMessage(confirmDelete)}
                                            className="bg-red-600 hover:bg-red-700 text-white"
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            onClick={() => setConfirmDelete(null)}
                                            className="bg-gray-700 hover:bg-gray-600 text-white"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        <div className="border-t border-gray-700 bg-[#1a1a1a] shrink-0">
                            <MessageInput receiverId={selectedUser._id} socket={socket} />
                        </div>
                    </>
                ) : (
                    <div className="flex flex-1 items-center justify-center text-gray-500">
                        Select a user to start chatting
                    </div>
                )}
            </div>

        </div>
    );
};

export default AdminChatPage;
