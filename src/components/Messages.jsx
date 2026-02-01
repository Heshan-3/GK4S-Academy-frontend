import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, Search } from 'lucide-react';

export default function Messages({ chatPartner }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [conversations, setConversations] = useState([]);
    const scrollRef = useRef();

    const currentUserId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    // Fetch messages from backend
    const fetchMessages = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/messages/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(res.data);
            groupConversations(res.data);
        } catch (err) {
            console.error("Error fetching messages", err);
        }
    };

    // Handle initial mount and partner changes
    useEffect(() => {
        fetchMessages();

        // If a teacher clicked "Message" from the student list
        if (chatPartner) {
            setSelectedUser(chatPartner);
        }

        const interval = setInterval(fetchMessages, 5000);
        return () => clearInterval(interval);
    }, [chatPartner]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, selectedUser]);

    const groupConversations = (allMsgs) => {
        const users = {};
        
        allMsgs.forEach(msg => {
            const otherUser = msg.sender._id === currentUserId ? msg.receiver : msg.sender;
            users[otherUser._id] = {
                ...otherUser,
                lastMessage: msg.message
            };
        });

        // Add the passed chatPartner to the sidebar if they haven't messaged yet
        if (chatPartner && !users[chatPartner._id]) {
            users[chatPartner._id] = {
                ...chatPartner,
                lastMessage: "No messages yet"
            };
        }
        
        setConversations(Object.values(users));
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedUser) return;

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/messages/send`, 
            { receiverId: selectedUser._id, message: newMessage },
            { headers: { Authorization: `Bearer ${token}` } });
            
            setNewMessage("");
            fetchMessages(); // Refresh to show the sent message
        } catch (err) {
            console.error("Send error", err);
        }
    };

    // Filter messages for the active chat
    const activeMessages = messages.filter(m => 
        (m.sender._id === selectedUser?._id || m.receiver._id === selectedUser?._id)
    );

    return (
        <div className="flex h-[600px] w-full max-w-5xl mx-auto border border-gray-300 rounded-xl overflow-hidden bg-white shadow-lg font-sans">
            
            {/* LEFT SIDEBAR */}
            <div className="w-1/3 border-r border-gray-300 flex flex-col">
                <div className="p-4 bg-gray-50/50">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search messages..." 
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg focus:ring-1 focus:ring-blue-500 text-sm outline-none"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {conversations.length > 0 ? (
                        conversations.map(user => (
                            <div 
                                key={user._id}
                                onClick={() => setSelectedUser(user)}
                                className={`p-4 border-b border-gray-100 cursor-pointer transition-all ${selectedUser?._id === user._id ? 'bg-blue-50 border-l-4 border-l-[#1e3a5f]' : 'hover:bg-gray-50'}`}
                            >
                                <h4 className="font-bold text-[#1e3a5f]">{user.name}</h4>
                                <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
                            </div>
                        ))
                    ) : (
                        <p className="p-4 text-center text-gray-400 text-sm italic">No conversations found</p>
                    )}
                </div>
            </div>

            {/* RIGHT CHAT WINDOW */}
            <div className="flex-1 flex flex-col">
                {selectedUser ? (
                    <>
                        {/* Header */}
                        <div className="p-4 border-b border-gray-300 bg-white">
                            <h3 className="font-bold text-[#1e3a5f] text-lg">{selectedUser.name}</h3>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-6 overflow-y-auto bg-white flex flex-col gap-4">
                            {activeMessages.map((msg, idx) => {
                                const isMe = msg.sender._id === currentUserId;
                                return (
                                    <div key={idx} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                                        <div className={`max-w-[75%] p-3 px-4 rounded-2xl shadow-sm text-sm ${
                                            isMe 
                                            ? "bg-[#1e3a5f] text-white rounded-tr-none" 
                                            : "bg-gray-100 border border-gray-200 text-gray-800 rounded-tl-none"
                                        }`}>
                                            {msg.message}
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={scrollRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex items-center gap-3">
                            <input 
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-gray-100 border-none rounded-full px-5 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <button type="submit" className="bg-[#1e3a5f] text-white p-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50">
                                <Send size={20} />
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 italic bg-gray-50/30">
                        <p>Select a conversation to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
}