"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { profile as staticProfile, experience as staticExperience, education as staticEducation, skills as staticSkills, certifications as staticCertifications } from "@/lib/data";
import { getProfile, getExperience, getEducation, getSkills, getCertifications } from "@/lib/queries";
import type { Profile, Experience, Education, SkillsByCategory, Certification } from "@/lib/types";

const LOGOS: Record<string, string> = {
  vivo: "/logos/vivo.png",
  emirates: "/logos/emirates.png",
  bookme: "/logos/bookme.png",
  freelance: "/logos/fiverr.png",
  cubefilms: "/logos/cubefilm.png",
};

function Anim({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}ms`;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("in"); io.unobserve(el); } },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    setTimeout(() => el.classList.add("in"), 1800);
    return () => io.disconnect();
  }, [delay]);
  return <div ref={ref} className="anim">{children}</div>;
}

export default function ProfessionalPage() {
  const [profile, setProfile] = useState<Profile>({ ...staticProfile, id: "main", avatar_url: "/avatar.png", social: staticProfile.social });
  const [experience, setExperience] = useState<Experience[]>(staticExperience.map((e, i) => ({ ...e, sort_order: i })));
  const [education, setEducation] = useState<Education[]>(staticEducation.map((e, i) => ({ ...e, sort_order: i })));
  const [skills, setSkills] = useState<SkillsByCategory>(staticSkills);
  const [certifications, setCertifications] = useState<Certification[]>(staticCertifications.map((c, i) => ({ ...c, sort_order: i })));

  useEffect(() => {
    getProfile().then(setProfile);
    getExperience().then(setExperience);
    getEducation().then(setEducation);
    getSkills().then(setSkills);
    getCertifications().then(setCertifications);
  }, []);

  return (
    <>
      <style>{`
        .anim { opacity: 0; transform: translateY(16px); transition: opacity .64s var(--ease), transform .64s var(--ease); will-change: opacity, transform; }
        .anim.in { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) { .anim { opacity: 1 !important; transform: none !important; transition: none !important; } }
        .item-logo {
          width: 40px; height: 40px; flex: none;
          display: inline-flex; align-items: center; justify-content: center;
          padding: 7px; background: #fff;
          border: 1px solid var(--line-soft); border-radius: 10px;
          box-shadow: 0 1px 2px oklch(0 0 0 / 0.04);
          transition: transform .35s var(--ease), box-shadow .35s var(--ease), border-color .35s var(--ease);
        }
        .item-entry:hover .item-logo { transform: translateY(-2px); border-color: var(--line); box-shadow: 0 6px 16px -8px oklch(0 0 0 / 0.18); }
        .pill { font-size: 14px; color: var(--ink-2); padding: 8px 14px; border-radius: 9px; border: 1px solid var(--line); background: var(--bg); transition: color .25s, border-color .25s, transform .25s var(--ease), background .25s; cursor: default; }
        .pill:hover { color: var(--ink); border-color: var(--ink-4); transform: translateY(-1px); background: var(--surface); }
        .section-divider { border-top: 1px dashed var(--line); }
        .label { margin: 0 0 30px; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--ink); }
        .tag { display: inline-block; font-size: 12px; padding: 3px 9px; border-radius: 6px; border: 1px solid var(--line); color: var(--ink-4); }
      `}</style>

      <div style={{ maxWidth: "660px", margin: "0 auto", paddingInline: "clamp(20px, 5vw, 36px)" }}>

        {/* Back */}
        <div style={{ paddingTop: "26px" }}>
          <Link href="/" style={{ fontSize: "13px", color: "var(--ink-4)", fontWeight: 500 }}>← Back</Link>
        </div>

        {/* Header */}
        <header style={{ padding: "clamp(40px,7vw,64px) 0 clamp(24px,4vw,36px)" }}>
          <Anim>
            <div style={{ width: "72px", height: "72px", borderRadius: "18px", overflow: "hidden", marginBottom: "24px", boxShadow: "0 8px 24px -12px oklch(0.52 0.18 274 / 0.5)" }}>
              <Image src="/avatar.png" alt="Ghulam Murtaza" width={150} height={150}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} priority />
            </div>
          </Anim>
          <Anim delay={60}>
            <h1 style={{ margin: "0 0 8px", fontSize: "clamp(28px,5vw,36px)", fontWeight: 700, letterSpacing: "-0.03em" }}>{profile.name}</h1>
          </Anim>
          <Anim delay={100}>
            <p style={{ margin: "0 0 20px", fontSize: "18px", color: "var(--ink-2)", fontWeight: 400 }}>{profile.headline}</p>
          </Anim>
          <Anim delay={140}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "18px", fontSize: "13.5px", color: "var(--ink-4)" }}>
              <span>{profile.location}</span>
              <a href={`mailto:${profile.email}`} style={{ color: "var(--ink-3)" }}>{profile.email}</a>
              <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "var(--ink-3)" }}>LinkedIn</a>
            </div>
          </Anim>
        </header>

        {/* About */}
        <section style={{ padding: "clamp(24px,4vw,36px) 0" }} className="section-divider">
          <Anim><p className="label">About</p></Anim>
          <Anim delay={40}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {profile.about.map((para, i) => (
                <p key={i} style={{ margin: 0, fontSize: "17px", color: "var(--ink-2)", lineHeight: 1.66 }}>{para}</p>
              ))}
            </div>
          </Anim>
        </section>

        {/* Experience */}
        <section style={{ padding: "clamp(40px,6vw,54px) 0" }} className="section-divider">
          <Anim><p className="label">Experience</p></Anim>
          <div style={{ display: "flex", flexDirection: "column", gap: "38px" }}>
            {experience.map((job, i) => (
              <Anim key={job.id} delay={i * 50}>
                <div className="item-entry" style={{ display: "grid", gridTemplateColumns: "40px 1fr", gap: "18px" }}>
                  <span className="item-logo">
                    {LOGOS[job.id] ? (
                      <Image src={LOGOS[job.id]} alt={job.company} width={26} height={26} style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }} />
                    ) : (
                      <span style={{ font: "600 13px var(--font-geist-sans)", color: "var(--ink-2)" }}>{job.company.slice(0, 2).toUpperCase()}</span>
                    )}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 600, letterSpacing: "-0.02em" }}>{job.role}</h3>
                    <p className="mono" style={{ margin: "6px 0 0", fontSize: "12.5px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink-4)" }}>
                      {job.company} · {job.period}
                    </p>
                    <p style={{ margin: "14px 0 12px", fontSize: "15.5px", color: "var(--ink-2)", lineHeight: 1.62 }}>{job.description}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                      {job.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
                    </div>
                  </div>
                </div>
              </Anim>
            ))}
          </div>
        </section>

        {/* Education */}
        <section style={{ padding: "clamp(40px,6vw,54px) 0" }} className="section-divider">
          <Anim><p className="label">Education</p></Anim>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {education.map((edu, i) => (
              <Anim key={edu.id} delay={i * 60}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "flex-start" }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 600, letterSpacing: "-0.02em" }}>{edu.degree}</h3>
                    <p style={{ margin: "5px 0 0", fontSize: "15px", color: "var(--ink-3)" }}>{edu.institution}</p>
                    {edu.description && <p style={{ margin: "6px 0 0", fontSize: "14px", color: "var(--ink-4)" }}>{edu.description}</p>}
                  </div>
                  <span className="mono" style={{ fontSize: "12.5px", color: "var(--ink-4)", whiteSpace: "nowrap", paddingTop: "3px" }}>{edu.period}</span>
                </div>
              </Anim>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section style={{ padding: "clamp(40px,6vw,54px) 0" }} className="section-divider">
          <Anim><p className="label">Certifications</p></Anim>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {certifications.map((cert, i) => (
              <Anim key={cert.id} delay={i * 50}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ margin: 0, fontSize: "16px", fontWeight: 500 }}>{cert.name}</p>
                    <p style={{ margin: "4px 0 0", fontSize: "14px", color: "var(--ink-4)" }}>{cert.issuer}</p>
                  </div>
                  <span className="mono" style={{ fontSize: "12.5px", color: "var(--ink-4)", whiteSpace: "nowrap", paddingTop: "3px" }}>{cert.year}</span>
                </div>
              </Anim>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section style={{ padding: "clamp(40px,6vw,54px) 0" }} className="section-divider">
          <Anim><p className="label">Skills</p></Anim>
          {[
            { sub: "Business", items: skills.business },
            { sub: "Design", items: skills.design },
            { sub: "Technology", items: skills.technology },
            { sub: "Tools", items: skills.tools },
          ].map((block, i) => (
            <Anim key={block.sub} delay={i * 40}>
              <div style={{ marginBottom: i < 3 ? "26px" : 0 }}>
                <p style={{ margin: "0 0 12px", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.09em", color: "var(--ink-4)" }}>{block.sub}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "9px" }}>
                  {block.items.map((s) => <span key={s} className="pill">{s}</span>)}
                </div>
              </div>
            </Anim>
          ))}
        </section>

        {/* Languages */}
        <section style={{ padding: "clamp(40px,6vw,54px) 0" }} className="section-divider">
          <Anim><p className="label">Languages</p></Anim>
          <Anim delay={40}>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[{ lang: "Urdu", level: "Native" }, { lang: "English", level: "Fluent" }].map((l) => (
                <div key={l.lang} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontSize: "16px", fontWeight: 500 }}>{l.lang}</span>
                  <span style={{ fontSize: "14px", color: "var(--ink-4)" }}>{l.level}</span>
                </div>
              ))}
            </div>
          </Anim>
        </section>

        {/* Footer */}
        <footer style={{ padding: "clamp(40px,6vw,56px) 0 clamp(48px,8vw,80px)", borderTop: "1px dashed var(--line)", textAlign: "center" }}>
          <Anim>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "11px" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", background: "var(--ink)", color: "var(--bg)", display: "grid", placeItems: "center", fontSize: "11.5px", fontWeight: 600, letterSpacing: "0.02em", fontFamily: "var(--font-geist-mono)" }}>GM</span>
              <span style={{ fontWeight: 600, fontSize: "15.5px" }}>Ghulam Murtaza</span>
            </div>
          </Anim>
          <Anim delay={60}>
            <div className="mono" style={{ marginTop: "18px", fontSize: "13px", color: "var(--ink-4)" }}>© 2026 · Lahore, Pakistan</div>
          </Anim>
        </footer>

      </div>
    </>
  );
}
