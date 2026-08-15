"use client";

import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { profile as staticProfile, experience as staticExperience, projects as staticProjects } from "@/lib/data";
import { getProfile, getExperience, getProjects } from "@/lib/queries";
import type { Profile, Experience, Project } from "@/lib/types";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

function Anim({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}ms`;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("in"); io.unobserve(el); } },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    setTimeout(() => el.classList.add("in"), 1800);
    return () => io.disconnect();
  }, [delay]);
  return <div ref={ref} className="anim" style={style}>{children}</div>;
}

export default function Home() {
  const [profile, setProfile] = useState<Profile>({
    ...staticProfile, id: "main", avatar_url: "/avatar.png", social: staticProfile.social,
  });
  const [experience, setExperience] = useState<Experience[]>(
    staticExperience.map((e, i) => ({ ...e, sort_order: i }))
  );
  const [projects, setProjects] = useState<Project[]>(
    staticProjects.map((p, i) => ({ ...p, category: p.category as Project["category"], image_url: null, project_url: null, sort_order: i }))
  );

  useEffect(() => {
    getProfile().then(setProfile);
    getExperience().then(setExperience);
    getProjects().then(setProjects);
  }, []);

  const companies = [...new Set(experience.map((e) => e.company))];

  return (
    <>
      <style>{`
        .home-page {
          --bg: oklch(0.994 0.001 100);
          --surface: oklch(0.972 0.004 70);
          --line: oklch(0.9 0.004 70);
          --line-soft: oklch(0.93 0.003 70);
          --ink: oklch(0.21 0.004 100);
          --ink-2: oklch(0.5 0.006 60);
          --ink-3: oklch(0.62 0.006 60);
          --ink-4: oklch(0.72 0.006 60);
          --accent: oklch(0.55 0.13 45);
          --ease: cubic-bezier(0.22, 1, 0.36, 1);
          background: var(--bg);
          background-image: radial-gradient(oklch(0.9 0.004 70 / 0.6) 1px, transparent 1px);
          background-size: 26px 26px;
          background-position: -6px -6px;
          color: var(--ink);
        }
        .anim {
          opacity: 0; transform: translateY(14px);
          transition: opacity .6s var(--ease), transform .6s var(--ease);
          will-change: opacity, transform;
        }
        .anim.in { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) {
          .anim { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
        .home-section { padding: clamp(44px, 7vw, 60px) 0; border-top: 1px dashed var(--line); }
        .home-label { margin: 0 0 10px; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: .1em; color: var(--ink); }
        .home-cue { margin: 0; font-size: 13px; font-style: italic; color: var(--ink-4); }
        .cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 20px; border-radius: 10px; border: 1px solid var(--ink);
          color: var(--ink); font-weight: 500; font-size: 15px; text-decoration: none;
          transition: background .25s var(--ease), color .25s var(--ease), transform .25s var(--ease);
        }
        .cta-btn:hover { background: var(--ink); color: var(--bg); transform: translateY(-1px); }
        .pill-arc {
          font-size: 13.5px; color: var(--ink-2);
          padding: 7px 13px; border-radius: 9px;
          border: 1px solid var(--line);
        }
        .status-pill {
          display: inline-block; font-size: 11.5px; text-transform: uppercase;
          letter-spacing: .07em; color: var(--ink-4);
          padding: 5px 10px; border: 1px solid var(--line); border-radius: 999px;
          font-family: var(--font-geist-mono);
        }
        @media (max-width: 640px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-photo { flex-direction: row !important; align-items: flex-start; }
          .proof-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <div className={`home-page ${inter.className}`} style={{ minHeight: "100vh" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", paddingInline: "clamp(20px, 5vw, 36px)" }}>

          {/* Hero */}
          <section className="hero-grid" style={{
            padding: "clamp(52px,10vw,88px) 0 clamp(28px,5vw,40px)",
            display: "grid", gridTemplateColumns: "1fr auto",
            gap: "28px", alignItems: "end", borderTop: 0,
          }}>
            <div>
              <Anim>
                <h1 style={{
                  margin: 0,
                  fontFamily: `${inter.style.fontFamily}, "Helvetica Neue", Helvetica, Arial, sans-serif`,
                  fontWeight: 700,
                  fontSize: "clamp(40px, 7vw, 64px)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}>
                  {profile.name}
                </h1>
              </Anim>
              <Anim delay={60}>
                <p style={{ margin: "16px 0 0", maxWidth: "440px", fontSize: "clamp(17px, 2.1vw, 19.5px)", color: "var(--ink-2)", lineHeight: 1.5 }}>
                  I turn ideas into working products, using design and AI.
                </p>
              </Anim>
              <Anim delay={120}>
                <a href={`mailto:${profile.email}`} className="cta-btn" style={{ marginTop: "28px" }}>
                  Get in touch
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M7 17 17 7"/><path d="M9 7h8v8"/>
                  </svg>
                </a>
              </Anim>
            </div>
            <Anim delay={80}>
              <div className="hero-photo" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "96px", height: "96px", borderRadius: "16px", overflow: "hidden",
                  border: "1px solid var(--line-soft)", background: "var(--surface)",
                  transform: "rotate(-2deg)", flexShrink: 0,
                }}>
                  <Image
                    src={profile.avatar_url ?? "/avatar.png"}
                    alt={profile.name}
                    width={200} height={200}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                    priority
                  />
                </div>
                <p className="home-cue" style={{ transform: "rotate(-2deg)" }}>that&apos;s me</p>
              </div>
            </Anim>
          </section>

          <Anim>
            <p className="home-cue" style={{ margin: "22px 0 0" }}>keep scrolling — the proof is next</p>
          </Anim>

          {/* Proof strip */}
          <section className="home-section">
            <div style={{ marginBottom: "30px" }}>
              <Anim><p className="home-label">Where the work has landed</p></Anim>
            </div>
            <div className="proof-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {[
                { num: "300+", desc: "hours saved yearly by the Expense Tracker" },
                { num: "38+", desc: "motion projects delivered freelance" },
                { num: "26+", desc: "clients across those projects" },
              ].map((stat, i) => (
                <Anim key={stat.num} delay={i * 60}>
                  <div>
                    <div style={{
                      fontFamily: `${inter.style.fontFamily}, Helvetica, sans-serif`,
                      fontWeight: 700, fontSize: "clamp(30px, 5vw, 42px)",
                      color: "var(--accent)", lineHeight: 1,
                    }}>{stat.num}</div>
                    <div style={{ marginTop: "6px", fontSize: "13.5px", color: "var(--ink-3)" }}>{stat.desc}</div>
                  </div>
                </Anim>
              ))}
            </div>
            <Anim delay={200}>
              <p style={{ marginTop: "26px", fontSize: "14.5px", color: "var(--ink-3)" }}>
                Time spent at{" "}
                {companies.slice(0, 4).map((c, i, arr) => (
                  <span key={c}>
                    <strong style={{ color: "var(--ink-2)", fontWeight: 600 }}>{c}</strong>
                    {i < arr.length - 1 ? " · " : ""}
                  </span>
                ))}
              </p>
            </Anim>
          </section>

          {/* Selected Work */}
          <section className="home-section">
            <div style={{ marginBottom: "30px" }}>
              <Anim><p className="home-label">Selected work</p></Anim>
              <Anim delay={40}><p className="home-cue" style={{ marginTop: "6px" }}>problem, what I did, result</p></Anim>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "56px" }}>
              {projects.slice(0, 2).map((project, i) => (
                <Anim key={project.id} delay={i * 80}>
                  <article>
                    <p style={{ margin: "0 0 12px", fontSize: "12px", fontStyle: "italic", color: "var(--ink-4)" }}>
                      {i === 0 ? "the main project" : "the concept"}
                    </p>
                    {project.image_url ? (
                      <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: "14px", overflow: "hidden", border: "1px solid var(--line-soft)" }}>
                        <Image src={project.image_url} alt={project.title} width={700} height={394} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    ) : (
                      <div style={{
                        width: "100%", aspectRatio: "16/9", borderRadius: "14px",
                        background: "var(--surface)", border: "1px solid var(--line-soft)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "var(--ink-4)", fontSize: "13px", fontStyle: "italic",
                      }}>
                        {project.title} screenshot
                      </div>
                    )}
                    <div style={{ marginTop: "18px" }}>
                      <h3 style={{ margin: 0, fontSize: "21px", fontWeight: 600, letterSpacing: "-0.02em" }}>{project.title}</h3>
                      <p style={{ margin: "12px 0 0", fontSize: "15.5px", color: "var(--ink-2)", lineHeight: 1.6 }}>{project.description}</p>
                      <span className="status-pill" style={{ marginTop: "14px" }}>{project.status}</span>
                    </div>
                  </article>
                </Anim>
              ))}
            </div>
          </section>

          {/* About */}
          <section className="home-section">
            <div style={{ marginBottom: "30px" }}>
              <Anim><p className="home-label">About</p></Anim>
              <Anim delay={40}><p className="home-cue" style={{ marginTop: "6px" }}>true story, all of it</p></Anim>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              <Anim>
                <p style={{ margin: 0, fontSize: "17px", color: "var(--ink-2)", lineHeight: 1.68 }}>
                  {profile.about[0]}
                </p>
              </Anim>
              <Anim delay={60}>
                <div style={{ display: "flex", gap: "16px", margin: "8px 0 4px" }}>
                  {[1, 2].map((n) => (
                    <div key={n} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                      <div style={{
                        width: "100%", aspectRatio: "4/5", borderRadius: "14px",
                        background: "var(--surface)", border: "1px solid var(--line-soft)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "var(--ink-4)", fontSize: "12px", fontStyle: "italic",
                        overflow: "hidden", position: "relative",
                      }}>
                        <Image
                          src={`/about/photo-${n}.jpg`}
                          alt="Ghulam Murtaza"
                          fill
                          sizes="(max-width: 640px) 45vw, 320px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <p className="home-cue">{n === 1 ? "figuring it out, early" : "still figuring it out"}</p>
                    </div>
                  ))}
                </div>
              </Anim>
              {profile.about[1] && (
                <Anim delay={80}>
                  <p style={{ margin: 0, fontSize: "17px", color: "var(--ink-2)", lineHeight: 1.68 }}>
                    {profile.about[1]}
                  </p>
                </Anim>
              )}
              <Anim delay={100}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "9px", marginTop: "6px" }}>
                  {["2D Animator", "Motion Designer", "Sales — Vivo", "Product Builder"].map((tag) => (
                    <span key={tag} className="pill-arc">{tag}</span>
                  ))}
                </div>
              </Anim>
            </div>
          </section>

          {/* Contact */}
          <section className="home-section">
            <div style={{ marginBottom: "30px" }}>
              <Anim><p className="home-label">Contact</p></Anim>
            </div>
            <Anim>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px", flexWrap: "wrap" }}>
                <p style={{ margin: 0, fontSize: "16px", color: "var(--ink-2)", maxWidth: "340px" }}>
                  Have something worth building? I&apos;m easiest to reach by email.
                </p>
                <a href={`mailto:${profile.email}`} className="cta-btn">
                  Get in touch
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M7 17 17 7"/><path d="M9 7h8v8"/>
                  </svg>
                </a>
              </div>
            </Anim>
          </section>

          {/* Footer */}
          <footer style={{ padding: "clamp(40px, 6vw, 56px) 0 clamp(48px, 8vw, 80px)", borderTop: "1px dashed var(--line)" }}>
            <Anim>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "13px", color: "var(--ink-4)" }}>
                <span style={{ fontFamily: "var(--font-geist-mono)" }}>© 2026 Ghulam Murtaza</span>
                <Link href="/professional" style={{ color: "var(--ink-3)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  Full resume →
                </Link>
              </div>
            </Anim>
            <Anim delay={60}>
              <p className="home-cue" style={{ marginTop: "16px" }}>this page is a case for what&apos;s next, not a finished pitch.</p>
            </Anim>
          </footer>

        </div>
      </div>
    </>
  );
}
