"use client";
import { useForm } from "react-hook-form";
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt } from "react-icons/fa";
import { profile } from "@/data/profile";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const subject = encodeURIComponent(`Site message from ${data.name}`);
    const body = encodeURIComponent(`${data.message}\n\n— ${data.name} <${data.email}>`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    reset();
  };

  return (
    <div className="flex flex-col w-full max-w-3xl py-2 gap-8">
      <section>
        <h2 className="font-mono text-xl text-blue-400 mb-3">Contact</h2>
        <ul className="flex flex-col gap-2 text-sm">
          <li className="flex items-center gap-2">
            <FaEnvelope className="text-blue-400" />
            <a className="hover:text-blue-400" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <FaGithub />
            <a className="hover:text-blue-400" target="_blank" rel="noopener noreferrer" href={profile.links.githubPersonal}>
              GitHub · personal
            </a>
          </li>
          <li className="flex items-center gap-2">
            <FaGithub />
            <a className="hover:text-blue-400" target="_blank" rel="noopener noreferrer" href={profile.links.githubSchool}>
              GitHub · school
            </a>
          </li>
          <li className="flex items-center gap-2">
            <FaLinkedin className="text-blue-400" />
            <a className="hover:text-blue-400" target="_blank" rel="noopener noreferrer" href={profile.links.linkedin}>
              LinkedIn
            </a>
          </li>
          <li className="flex items-center gap-2">
            <FaFileAlt className="text-blue-400" />
            <a className="hover:text-blue-400" href={profile.links.resume} target="_blank" rel="noopener noreferrer">
              Resume (PDF)
            </a>
          </li>
        </ul>
      </section>

      <section className="bg-gray-900/80 p-5 rounded-lg border border-gray-700">
        <h3 className="font-mono text-lg text-blue-400 mb-3">Send a note</h3>
        <p className="text-xs text-gray-500 mb-4">Opens your mail client to {profile.email}.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <input
              type="text"
              placeholder="Name"
              className="bg-gray-800 p-2 rounded-md w-full"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="bg-gray-800 p-2 rounded-md w-full"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <textarea
              placeholder="Message"
              rows={5}
              className="bg-gray-800 p-2 rounded-md w-full"
              {...register("message", { required: "Message is required" })}
            />
            {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? "Opening…" : "Send"}
          </button>
          {isSubmitSuccessful && <p className="text-green-400 text-sm">Mail client opened.</p>}
        </form>
      </section>
    </div>
  );
}
