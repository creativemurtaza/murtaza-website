import type { Metadata } from "next";
import { profile } from "@/lib/data";
import { Mail, MapPin, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Ghulam Murtaza.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-4">
          Get in Touch
        </h1>
        <p className="text-base text-neutral-500 leading-relaxed mb-12">
          I am open to conversations about product roles, business development opportunities,
          freelance animation and design projects, and collaboration. Feel free to reach out.
        </p>

        <div className="space-y-5 mb-14">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-4 rounded-xl border border-neutral-200 p-5 hover:border-neutral-300 hover:shadow-sm transition-all group"
          >
            <div className="rounded-lg bg-neutral-100 p-2.5 group-hover:bg-neutral-200 transition-colors">
              <Mail size={18} className="text-neutral-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900">Email</p>
              <p className="text-sm text-neutral-500">{profile.email}</p>
            </div>
          </a>

          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl border border-neutral-200 p-5 hover:border-neutral-300 hover:shadow-sm transition-all group"
          >
            <div className="rounded-lg bg-neutral-100 p-2.5 group-hover:bg-neutral-200 transition-colors">
              <ExternalLink size={18} className="text-neutral-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900">LinkedIn</p>
              <p className="text-sm text-neutral-500">linkedin.com/in/murtaza-ameen</p>
            </div>
          </a>

          <div className="flex items-center gap-4 rounded-xl border border-neutral-200 p-5">
            <div className="rounded-lg bg-neutral-100 p-2.5">
              <MapPin size={18} className="text-neutral-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900">Location</p>
              <p className="text-sm text-neutral-500">{profile.location}</p>
            </div>
          </div>
        </div>

        {/* Simple contact form */}
        <div className="rounded-xl border border-neutral-200 p-6 sm:p-8">
          <h2 className="text-sm font-semibold text-neutral-900 mb-6">Send a Message</h2>
          <form
            action={`mailto:${profile.email}`}
            method="get"
            encType="text/plain"
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1.5" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-400 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1.5" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-400 focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1.5" htmlFor="subject">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="What is this about?"
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-400 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1.5" htmlFor="body">
                Message
              </label>
              <textarea
                id="body"
                name="body"
                rows={4}
                placeholder="Your message..."
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-900 placeholder-neutral-400 focus:border-neutral-400 focus:outline-none transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
