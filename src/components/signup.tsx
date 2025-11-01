import React, { useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const Signup = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
    });
    const [loading, setLoading] = useState(false);
    const loginuser = JSON.parse(localStorage.getItem("user") || "{}");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value  } = e.target;
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
                `${import.meta.env.VITE_API_URL}/api/user/signup`,
                form,
                { withCredentials: true }
            );
            toast.success("Signup successful!");
            console.log(data);
            window.location.href = "/chat";
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Signup failed");
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
                    Submit your details
                </h2>

                <div>
                    <label className="block text-sm mb-1">Name</label>
                    <Input
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={handleChange}
                        className="bg-transparent border border-gray-600 text-white placeholder-gray-400"
                    />
                </div>

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
                    {loading ? "Creating..." : "Submit"}
                </Button>
                <p className="text-center">Already Submited? <Link to="/login" className="text-[#ffcc00]">Verify</Link></p>
            </form>
        </div>
    );
};

export default Signup;
