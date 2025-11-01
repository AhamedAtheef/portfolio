import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { Send, Image as ImageIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Socket } from "socket.io-client";

interface MessageInputProps {
    receiverId: string;
    socket: Socket | null;
}

const MessageInput: React.FC<MessageInputProps> = ({ receiverId, socket }) => {
    const [text, setText] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // ✅ Handle image upload safely
    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result as string);
        reader.readAsDataURL(file);
    };

    // ✅ Send message
    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prevent sending empty messages
        if (!text.trim() && !image) return;

        // Prevent null socket errors
        if (!socket || !socket.connected) {
            console.error("❌ Socket not connected, cannot send message.");
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/messages/send/${receiverId}`,
                { text, image },
                { withCredentials: true }
            );

            // ✅ Ensure backend responds with proper structure
            if (!data?.data) {
                console.warn("⚠️ No data returned from server:", data);
                return;
            }

            // ✅ Emit only when socket is ready
            socket.emit("newMessage", data.data);

            // Clear inputs
            setText("");
            setImage(null);
        } catch (error: any) {
            console.error("Message send error:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={sendMessage}
            className="flex items-center gap-2 border-t border-gray-700 bg-[#1a1a1a] p-3 rounded-b-2xl"
        >
            {/* Message Text Input */}
            <textarea
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 bg-transparent border border-gray-700 text-white placeholder-gray-400 
             focus:ring-2 focus:ring-[#ffcc00] rounded-xl p-3 resize-none 
             overflow-y-auto max-h-28 min-h-[45px]"
                rows={1}
            />

            {/* Send Button */}
            <Button
                type="submit"
                disabled={loading}
                className="bg-[#ffcc00] text-black hover:bg-[#e6b800] px-3 md:px-4 py-2 rounded-xl flex items-center gap-1"
            >
                <Send size={18} />
                <span className="hidden md:block">{loading ? "Sending..." : "Send"}</span>
            </Button>
        </form>
    );
};

export default MessageInput;
