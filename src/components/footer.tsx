import Link from "next/link";
import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-neutral-900">Ghulam Murtaza</p>
            <p className="text-xs text-neutral-500 mt-0.5">{profile.location}</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-neutral-400">
            <Link href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-700 transition-colors">
              LinkedIn
            </Link>
            <Link href={profile.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-700 transition-colors">
              Instagram
            </Link>
            <Link href={`mailto:${profile.email}`} className="hover:text-neutral-700 transition-colors">
              Email
            </Link>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
