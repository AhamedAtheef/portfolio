import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "../components/ui/scroll-area";
import MessageInput from "../components/MessageInput";
import { Button } from "../components/ui/button";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  image?: string;
  createdAt: string;
}

// Ensure you have set VITE_ADMIN_ID in your Netlify Environment Variables
const ADMIN_ID = import.meta.env.VITE_ADMIN_ID;

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  const navigate = useNavigate();

  // Load current logged user
  const loadLoggedUser = useCallback(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/verify`, {
        withCredentials: true,
      });

      if (!res.data?.user?._id) {
        navigate("/signup");
        return;
      }

      setLoggedUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      console.error("User verification failed:", err);
      navigate("/signup");
    }
  }, [navigate]);

  // Load chat messages
  const loadMessages = useCallback(async (receiverId: string) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/messages/${receiverId}`,
        { withCredentials: true }
      );
      setMessages(res.data.messages || []);
    } catch (err) {
      console.error("Error loading messages:", err);
    }
  }, []);

  // Function to load the Admin user based on the environment ID
  const loadAdminUser = useCallback(async (adminId: string) => {
    if (!adminId) {
      console.error("Admin ID is missing from environment variables.");
      return;
    }
    try {
      // Assuming your backend has an endpoint to get a user by ID
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/${adminId}`,
        { withCredentials: true }
      );

      // Adjust this based on your API response structure (e.g., res.data or res.data.user)
      if (res.data) {
        setSelectedUser(res.data);
        loadMessages(res.data._id);
        // Save the admin as the selected user for subsequent visits
        localStorage.setItem("selectedUser", JSON.stringify(res.data));
      }
    } catch (err) {
      console.error("Failed to fetch admin user for client chat:", err);
    }
  }, [loadMessages]);


  // Setup socket connection (only once when loggedUser is set)
  useEffect(() => {
    if (!loggedUser) return;

    // Use the correct protocol (wss:// for live, ws:// for local)
    // The io client handles the protocol correctly based on the VITE_API_URL content
    const newSocket = io(import.meta.env.VITE_API_URL, {
      withCredentials: true,
      query: { userId: loggedUser._id },
    });

    console.log("🟢 Socket connected");

    // Online users
    newSocket.on("Online Users", (users: string[]) => setOnlineUsers(users));

    // Receive new messages (real-time)
    newSocket.on("newMessage", (msg: Message) => {
      if (
        msg.senderId === selectedUser?._id ||
        msg.receiverId === selectedUser?._id
      ) {
        setMessages((prev) => {
          // Avoid duplicates (fix for double messages)
          const exists = prev.some((m) => m._id === msg._id);
          return exists ? prev : [...prev, msg];
        });
      }
    });

    // Live delete messages
    newSocket.on("messageDeleted", (msgId: string) => {
      setMessages((prev) => prev.filter((m) => m._id !== msgId));
    });

    setSocket(newSocket);

    return () => {
      console.log("🔴 Socket disconnected");
      newSocket.disconnect();
    };
  }, [loggedUser, selectedUser?._id]);

  // Initial load (user + selectedUser + messages)
  useEffect(() => {
    loadLoggedUser();

    const savedUser = localStorage.getItem("selectedUser");

    if (savedUser) {
      // Scenario 1: Admin has clicked a client or a returning client exists (correct flow)
      const user = JSON.parse(savedUser);
      setSelectedUser(user);
      loadMessages(user._id);
    } else {
      // Scenario 2: First-time client visit. Set the receiver to the Admin.
      if (ADMIN_ID) {
        loadAdminUser(ADMIN_ID);
      } else {
        console.error("Admin ID environment variable is missing.");
      }
    }
  }, [loadLoggedUser, loadMessages, loadAdminUser]);

  // Delete message (with real-time broadcast)
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


  // Long-press or right-click event
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
      onContextMenu: (e: React.MouseEvent) => {
        e.preventDefault();
        callback();
      },
    };
  };

  // Conditional Rendering Check: Wait until both users are loaded
  if (!loggedUser || !selectedUser) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#121212] text-gray-400">
        Loading Chat...
      </div>
    );
  }

  // --- Main UI Render ---
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-[#121212] text-white">
      {/*Top Bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800 bg-[#121212] shrink-0">
        <div className="flex flex-col">
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


      {/* Messages Section */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-4 overflow-y-auto">
          <div className="flex flex-col space-y-3 pb-4">
            {messages.map((msg) => (
              <div
                key={msg._id}
                {...getLongPressHandlers(() => setConfirmDelete(msg._id))}
                className={`flex w-full px-2 mb-1 ${msg.senderId === loggedUser._id ? "justify-end" : "justify-start"}`}
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

      {/* Message Input (Fixed Bottom) */}
      <div className="border-t border-gray-700 bg-[#1a1a1a] shrink-0">
        {/* We know selectedUser is not null here due to the loading check above */}
        <MessageInput receiverId={selectedUser._id} socket={socket} />
      </div>
    </div>
  );
}

export default ChatPage;