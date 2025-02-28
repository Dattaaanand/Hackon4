"use client";

import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Page = () => {
    const [formData, setFormData] = useState({
        aim: "",
        apparatus: "",
        procedure: "",
        observations: "",
        conclusion: "",
    });

    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center text-white font-roboto"
            style={{ backgroundImage: "url('/images/Background.jpg')" }}>

            {/* Dark overlay only on background */}
            <div className="absolute inset-0 bg-black/70"></div>

            {/* Form Container (kept above the overlay) */}
            <div className="relative max-w-3xl w-full bg-black/40 p-10 rounded-2xl shadow-2xl border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                <FaArrowLeft
                    className="absolute top-5 left-5 text-white text-2xl cursor-pointer hover:text-gray-300 transition"
                    onClick={() => router.push("/")}
                />
                <h2 className="text-4xl font-extrabold font-serif text-center mb-6">Experiment Form</h2>
                <form className="space-y-6">
                    {[
                        { label: "Aim", name: "aim", placeholder: "Enter the aim" },
                        { label: "Apparatus", name: "apparatus", placeholder: "List the apparatus" },
                        { label: "Procedure", name: "procedure", placeholder: "Describe the steps" },
                        { label: "Observations", name: "observations", placeholder: "Enter observations" },
                        { label: "Conclusion", name: "conclusion", placeholder: "Summarize the findings" },
                    ].map((field) => (
                        <div key={field.name} className="relative">
                            <label className="block text-lg font-serif font-stretch-50% font-extrabold text-gray-300 mb-1">{field.label}</label>
                            <textarea
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                                rows={3}
                                className="w-full p-3 border border-gray-600 rounded-lg bg-black/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 backdrop-blur-sm"
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Page;
