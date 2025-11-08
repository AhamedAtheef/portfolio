import React, { useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const Login = () => {
    const [form, setForm] = useState({
        email: ""
    });
    const [loading, setLoading] = useState(false);
    const loginuser = JSON.parse(localStorage.getItem("user") || "{}");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/user/login`,
                form,
                { withCredentials: true }
            );

            toast.success("Verification successful!");

            if (data.user?.isAdmin) {
                window.location.href = "/admin_chat";
            } else {
                window.location.href = "/chat";
            }

            console.log(data);
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Login failed");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#1a1a1a] text-white">
            <form
                onSubmit={handleSubmit}
                className="bg-[#222] p-6 rounded-2xl w-full max-w-sm shadow-lg border border-gray-700 space-y-4"
            >
                <h2 className="text-2xl font-semibold text-center text-[#ffcc00]">
                    Verify your details
                </h2>
                <div>
                    <label className="block text-sm mb-1">Email</label>
                    <Input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        className="bg-transparent border border-gray-600 text-white placeholder-gray-400"
                    />
                </div>


                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#ffcc00] tracking-wider text-md text-black hover:bg-[#e6b800] rounded-xl"
                >
                    {loading ? "Creating..." : "Verify"}
                </Button>
                <p className="text-center">Submit your details? <Link to="/signup" className="text-[#ffcc00]">Submit</Link></p>
                <div className="w-full flex items-center justify-center gap-3">
                    <div className="flex-1 border-b border-gray-300"></div>
                    <span className="text-gray-400 text-sm font-medium">OR</span>
                    <div className="flex-1 border-b border-gray-300"></div>
                </div>

                <div className="w-full flex justify-center border rounded-xl border-[#ebb401] hover:border-[#c09403] transition-colors duration-300 cursor-pointer">
                    <div className="w-full sm:w-auto ">
                        <a
                            href="https://wa.me/94750943802"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Chat on WhatsApp"
                            className="flex items-center justify-center gap-2 text-md tracking-wider text-[#ffcc] py-2.5 px-6 text-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                fill="currentColor"
                                className="w-6 h-6 sm:w-8 sm:h-8"
                            >
                                <path d="M16 .667C7.64.667.667 7.64.667 16c0 2.827.747 5.578 2.16 7.987L.667 31.333l7.573-2.093A15.24 15.24 0 0 0 16 31.333c8.36 0 15.333-6.973 15.333-15.333S24.36.667 16 .667zm0 28a12.62 12.62 0 0 1-6.453-1.773l-.467-.28-4.493 1.24 1.213-4.36-.307-.467A12.58 12.58 0 0 1 3.333 16C3.333 9.013 9.013 3.333 16 3.333c6.987 0 12.667 5.68 12.667 12.667S22.987 28.667 16 28.667zm7.067-9.333c-.4-.2-2.373-1.173-2.747-1.307-.373-.133-.64-.2-.907.2-.267.4-1.04 1.307-1.28 1.573-.24.267-.48.3-.88.1-.4-.2-1.693-.627-3.227-2-1.2-1.067-2-2.373-2.24-2.773-.24-.4-.027-.613.173-.813.18-.18.4-.467.6-.707.2-.24.267-.4.4-.667.133-.267.067-.507-.033-.707-.1-.2-.88-2.12-1.2-2.907-.32-.773-.64-.667-.88-.667-.227 0-.493-.027-.76-.027s-.707.1-1.08.507c-.373.4-1.413 1.387-1.413 3.373 0 1.987 1.453 3.907 1.653 4.173.2.267 2.867 4.387 6.947 6.147.973.413 1.733.667 2.32.853.973.307 1.867.267 2.573.16.787-.12 2.373-.973 2.707-1.92.333-.947.333-1.76.233-1.92-.093-.16-.36-.267-.76-.467z" />
                            </svg>
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
