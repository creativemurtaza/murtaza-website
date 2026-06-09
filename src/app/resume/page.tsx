"use client";

import { profile, experience, education, skills, certifications } from "@/lib/data";
import { Download } from "lucide-react";

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16 sm:py-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Resume</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Always up to date — synced from the website database.
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors print:hidden"
        >
          <Download size={14} />
          Download PDF
        </button>
      </div>

      {/* Resume document */}
      <div className="rounded-xl border border-neutral-200 bg-white p-8 sm:p-12 print:border-none print:p-0 print:shadow-none">
        {/* Name & contact */}
        <div className="mb-8 border-b border-neutral-100 pb-8">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-1">
            {profile.name}
          </h2>
          <p className="text-sm text-neutral-500 font-medium mb-3">{profile.headline}</p>
          <div className="flex flex-wrap gap-4 text-xs text-neutral-500">
            <span>{profile.location}</span>
            <span>·</span>
            <a href={`mailto:${profile.email}`} className="hover:text-neutral-800">
              {profile.email}
            </a>
            <span>·</span>
            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-800">
              LinkedIn
            </a>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3">
            Summary
          </h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Marketing graduate with hands-on experience in business development, operations, and freelance design.
            Experienced across logistics, healthcare technology, and travel tech.
            Builder of software products with skills spanning frontend development, backend services, UI/UX design, and motion graphics.
            Holds certifications in project management and digital marketing.
          </p>
        </div>

        {/* Experience */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-5">
            Experience
          </h3>
          <div className="space-y-5">
            {experience.map((job) => (
              <div key={job.id}>
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{job.role}</p>
                    <p className="text-xs text-neutral-500">{job.company}</p>
                  </div>
                  <span className="text-xs text-neutral-400 shrink-0 ml-4">{job.period}</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed mt-1">{job.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-5">
            Education
          </h3>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{edu.degree}</p>
                  <p className="text-xs text-neutral-500">{edu.institution}</p>
                </div>
                <span className="text-xs text-neutral-400 shrink-0 ml-4">{edu.period}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-5">
            Skills
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <p className="text-xs font-medium text-neutral-600 mb-2">Business</p>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {skills.business.join(" · ")}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-600 mb-2">Design</p>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {skills.design.join(" · ")}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-600 mb-2">Technology</p>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {skills.technology.join(" · ")}
              </p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-5">
            Certifications
          </h3>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-neutral-900">{cert.name}</p>
                  <p className="text-xs text-neutral-500">{cert.issuer}</p>
                </div>
                <span className="text-xs text-neutral-400 shrink-0 ml-4">{cert.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-neutral-400 text-center mt-6">
        To export as PDF: use the Download button or File → Print → Save as PDF
      </p>
    </div>
  );
}
