import React from "react";
import { useForm } from "react-hook-form";
import { FaGithub, FaLinkedin } from "react-icons/fa";

type formatdata = {
    name: string;
    email: string;
    message: string;
}

const onSubmit = async(data: formatdata) => {
    const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (res.ok) { throw new Error("Failed to send email"); }
}

export default function Contact() {
    const {
        register, handleSubmit, formState: { errors, isSubmitting }
    } = useForm<formatdata>();

    return (
        <div className = "flex flex-col min-h-[80vh] w-full max-w-3xl py-4 gap-8">
            <section className = "w-full flex flex-col">

                <h2 className = "font-mono text-xl text-blue-400 mb-2">Contact</h2>

                <ul className = "flex flex-col gap-2 whitespace-nowrap">
                    <li className = "flex items-center gap-2"> <FaGithub /> 
                        <a className = "hover:text-blue-400"  target="_blank" rel="noopener noreferrer" 
                        href = "https://github.com/EpicaltCMPT">GitHub (School)</a> 
                    </li>

                    <li className = "flex items-center gap-2"> <FaGithub />
                        <a className = "hover:text-blue-400" target="_blank" rel="noopener noreferrer" 
                        href = "https://github.com/Epicslooyer">GitHub (Personal)</a> 
                    </li>

                    <li className = "flex items-center gap-2"> <FaLinkedin /> 
                        <a className = "hover:text-blue-400" target="_blank" rel="noopener noreferrer" 
                        href = "https://www.linkedin.com/in/sajan-s/">LinkedIn</a> 
                    </li>

                </ul>
            </section>

            <section className = "bg-[#14141f] p-6 rounded-lg shadow-md">

                <h2 className = "font-mono text-xl font-semibold text-blue-400 mb-4">Send me a message (Broken) </h2>

                <form onSubmit = {handleSubmit(onSubmit)} className = "space-y-4">

                    <div>
                        <input
                        type="text"
                        placeholder="Name"
                        className="bg-[#1e1e2f] p-2 rounded-md w-full"
                        {...register("name", { required: "Name is required" })}/>
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div>
                        <input
                        type="email"
                        placeholder="Email"
                        className="bg-[#1e1e2f] p-2 rounded-md w-full"
                        {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address",
                        }, })} />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div>
                        <textarea
                        placeholder="Message"
                        rows={5}
                        className="bg-[#1e1e2f] p-2 rounded-md w-full"
                        {...register("message", { required: "Message is required" })}/>
                        {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                    </div>

                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50">
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </section>
        </div>
    );        
}
