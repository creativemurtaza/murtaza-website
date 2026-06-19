import type { Metadata } from "next";
import { profile, experience, education, skills, certifications } from "@/lib/data";
import { MapPin, Mail, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Professional",
  description: "Professional experience, education, skills, and certifications of Ghulam Murtaza.",
};

export default function ProfessionalPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
      {/* Hero */}
      <section className="mb-16 sm:mb-20">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-3">
          {profile.name}
        </h1>
        <p className="text-lg text-neutral-500 mb-6 font-medium">{profile.headline}</p>
        <div className="space-y-4 max-w-2xl mb-8">
          {profile.about.map((para, i) => (
            <p key={i} className="text-base text-neutral-600 leading-relaxed">
              {para}
            </p>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-neutral-400" />
            {profile.location}
          </span>
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-1.5 hover:text-neutral-800 transition-colors"
          >
            <Mail size={14} className="text-neutral-400" />
            {profile.email}
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-neutral-800 transition-colors"
          >
            <ExternalLink size={14} className="text-neutral-400" />
            LinkedIn
          </a>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-14">
          {/* Experience */}
          <section>
            <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-8">
              Experience
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 top-2 bottom-0 w-px bg-neutral-100 hidden sm:block" />
              <div className="space-y-8">
                {experience.map((job) => (
                  <div key={job.id} className="sm:pl-6 relative">
                    <div className="hidden sm:block absolute left-0 top-2 w-2 h-2 -translate-x-0.5 rounded-full border-2 border-neutral-300 bg-white" />
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                      <div>
                        <h3 className="text-sm font-semibold text-neutral-900">{job.role}</h3>
                        <p className="text-sm text-neutral-500">{job.company}</p>
                      </div>
                      <span className="text-xs text-neutral-400 shrink-0 sm:text-right">{job.period}</span>
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed mb-3">{job.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-8">
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-900">{edu.degree}</h3>
                    <p className="text-sm text-neutral-500">{edu.institution}</p>
                    {edu.description && (
                      <p className="text-sm text-neutral-500 mt-1">{edu.description}</p>
                    )}
                  </div>
                  <span className="text-xs text-neutral-400 shrink-0">{edu.period}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section>
            <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-8">
              Certifications
            </h2>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{cert.name}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{cert.issuer}</p>
                  </div>
                  <span className="text-xs text-neutral-400 shrink-0">{cert.year}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-10">
          {/* Business skills */}
          <section>
            <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-5">
              Business
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.business.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Design skills */}
          <section>
            <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-5">
              Design
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.design.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Technology skills */}
          <section>
            <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-5">
              Technology
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.technology.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Tools */}
          <section>
            <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-5">
              Tools
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600"
                >
                  {tool}
                </span>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section>
            <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-5">
              Languages
            </h2>
            <div className="space-y-2">
              {[
                { lang: "Urdu", level: "Native" },
                { lang: "English", level: "Fluent" },
              ].map((l) => (
                <div key={l.lang} className="flex items-center justify-between text-sm">
                  <span className="text-neutral-700">{l.lang}</span>
                  <span className="text-xs text-neutral-400">{l.level}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
