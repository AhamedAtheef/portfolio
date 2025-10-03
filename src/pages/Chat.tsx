/* import { useState } from "react";
import { Send } from "lucide-react";
// ✅ import UI components from your own folder
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
 */

/* interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
}
 */
const Chat = () => {
  /*   const [messages, setMessages] = useState<Message[]>([
      {
        id: 1,
        text: "Hey! Welcome to the chat. This is a demo UI ready for Socket.io integration!",
        sender: "other",
        timestamp: new Date(),
      },
    ]);
    const [inputValue, setInputValue] = useState(""); */

  /*   const handleSendMessage = (e: React.FormEvent) => {
      e.preventDefault();
      if (inputValue.trim()) {
        const newMessage: Message = {
          id: messages.length + 1,
          text: inputValue,
          sender: "user",
          timestamp: new Date(),
        };
        setMessages([...messages, newMessage]);
        setInputValue("");
  
        // Simulate response (replace with Socket.io later)
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: prev.length + 1,
              text: "Thanks for your message! Real-time chat will be enabled with Socket.io.",
              sender: "other",
              timestamp: new Date(),
            },
          ]);
        }, 1000);
      }
    }; */

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <p className="text-center text-red-600 font-semibold bg-red-100 p-3 rounded-lg">
          🚧 Chat feature is temporarily unavailable. Please check back later.
        </p>

        {/*  <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-accent">
            Chat Room
          </h1>
          <p className="text-lg text-muted-foreground">
            Real-time messaging interface (UI ready for Socket.io)
          </p>
        </div>

        <Card className="bg-card border-border animate-slide-up">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-accent">Live Chat</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  } animate-fade-in`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSendMessage}
              className="border-t border-border p-4 flex gap-2"
            >
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-background border-border focus:border-accent"
              />
              <Button
                type="submit"
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Send size={20} />
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center animate-fade-in">
          <p className="text-sm text-muted-foreground">
            💡 This chat UI is ready for Socket.io integration for real-time
            messaging functionality. The backend can be added using Express and
            MongoDB for message persistence.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Chat;
