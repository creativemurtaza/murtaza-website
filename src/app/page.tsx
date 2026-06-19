"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { profile, experience, projects, blogPosts, skills } from "@/lib/data";
import { formatDate } from "@/lib/utils";

// Live Lahore clock (GMT+5)
function Clock() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const pk = new Date(utc + 5 * 3600000);
      const h = pk.getHours();
      const m = String(pk.getMinutes()).padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
}

// Logo map for experience entries
const LOGOS: Record<string, string> = {
  vivo: "/logos/vivo.png",
  emirates: "/logos/emirates.png",
  bookme: "/logos/bookme.png",
  freelance: "/logos/fiverr.png",
  cubefilms: "/logos/cubefilm.png",
};

// Fade-up animation hook
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          io.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    setTimeout(() => el.classList.add("in"), 1800);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Anim({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}ms`;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          io.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    setTimeout(() => el.classList.add("in"), 1800);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`anim ${className}`}>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <style>{`
        .anim {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity .64s var(--ease), transform .64s var(--ease);
          will-change: opacity, transform;
        }
        .anim.in { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) {
          .anim { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
        .item-logo {
          width: 40px; height: 40px; flex: none;
          display: inline-flex; align-items: center; justify-content: center;
          padding: 7px;
          background: #fff;
          border: 1px solid var(--line-soft);
          border-radius: 10px;
          box-shadow: 0 1px 2px oklch(0 0 0 / 0.04);
          transition: transform .35s var(--ease), box-shadow .35s var(--ease), border-color .35s var(--ease);
        }
        .item-entry:hover .item-logo {
          transform: translateY(-2px);
          border-color: var(--line);
          box-shadow: 0 6px 16px -8px oklch(0 0 0 / 0.18);
        }
        .pill {
          font-size: 14px; color: var(--ink-2);
          padding: 8px 14px; border-radius: 9px;
          border: 1px solid var(--line);
          background: var(--bg);
          transition: color .25s, border-color .25s, transform .25s var(--ease), background .25s;
          cursor: default;
        }
        .pill:hover {
          color: var(--ink); border-color: var(--ink-4);
          transform: translateY(-1px); background: var(--surface);
        }
        .section-divider { border-top: 1px dashed var(--line); }
        .label {
          margin: 0 0 30px;
          font-size: 13px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: var(--ink);
        }
        .contact-row {
          display: flex; align-items: baseline; justify-content: space-between; gap: 16px;
          padding: 16px 0; border-bottom: 1px solid var(--line-soft);
        }
        .contact-row:last-child { border-bottom: 0; }
        .contact-row:first-child { padding-top: 0; }
      `}</style>

      <div style={{ maxWidth: "660px", margin: "0 auto", paddingInline: "clamp(20px, 5vw, 36px)" }}>

        {/* Top status bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: "26px", fontSize: "12.5px", textTransform: "uppercase",
          letterSpacing: "0.08em", color: "var(--ink-4)"
        }}>
          <span className="mono" style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z"/>
              <circle cx="12" cy="10" r="2.5"/>
            </svg>
            Lahore, Pakistan
          </span>
          <span className="mono" style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
            </svg>
            <Clock /> GMT+5
          </span>
        </div>

        {/* Header */}
        <header style={{ textAlign: "center", padding: "clamp(48px,9vw,88px) 0 clamp(40px,7vw,64px)" }}>
          <Anim>
            <div style={{ width: "86px", height: "86px", borderRadius: "22px", overflow: "hidden", margin: "0 auto", boxShadow: "0 8px 24px -12px oklch(0.52 0.18 274 / 0.5)" }}>
              <Image
                src="/avatar.png"
                alt="Ghulam Murtaza"
                width={200}
                height={200}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                priority
              />
            </div>
          </Anim>
          <Anim delay={60}>
            <h1 style={{ margin: "26px 0 0", fontSize: "clamp(32px,5.5vw,42px)", fontWeight: 700, letterSpacing: "-0.03em" }}>
              {profile.name}
            </h1>
          </Anim>
          <Anim delay={120}>
            <p style={{ margin: "10px 0 0", fontSize: "clamp(17px,2.2vw,20px)", color: "var(--ink-2)", fontWeight: 400 }}>
              {profile.headline}
            </p>
          </Anim>
          <Anim delay={160}>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
              <Link href="/professional" style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "var(--ink)", color: "var(--bg)",
                borderRadius: "9px", padding: "10px 20px", fontSize: "14px", fontWeight: 500
              }}>
                View Profile
              </Link>
              <Link href="/creative" style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                border: "1px solid var(--line)", color: "var(--ink-2)",
                borderRadius: "9px", padding: "10px 20px", fontSize: "14px", fontWeight: 500
              }}>
                Creative Work
              </Link>
              <Link href="/contact" style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                border: "1px solid var(--line)", color: "var(--ink-2)",
                borderRadius: "9px", padding: "10px 20px", fontSize: "14px", fontWeight: 500
              }}>
                Get in Touch
              </Link>
            </div>
          </Anim>
        </header>

        {/* About */}
        <section style={{ padding: "clamp(40px,6vw,54px) 0" }} className="section-divider">
          <Anim><p className="label">About</p></Anim>
          <Anim delay={40}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {profile.about.map((para, i) => (
                <p key={i} style={{ margin: 0, fontSize: "17px", color: "var(--ink-2)", lineHeight: 1.66 }}>
                  {para}
                </p>
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
                      <span style={{ font: "600 13px var(--font-geist-sans)", color: "var(--ink-2)" }}>
                        {job.company.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 600, letterSpacing: "-0.02em" }}>{job.role}</h3>
                    <p className="mono" style={{ margin: "6px 0 0", fontSize: "12.5px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink-4)" }}>
                      {job.company} · {job.period}
                    </p>
                    <p style={{ margin: "14px 0 0", fontSize: "15.5px", color: "var(--ink-2)", lineHeight: 1.62 }}>{job.description}</p>
                  </div>
                </div>
              </Anim>
            ))}
          </div>
          <Anim delay={300}>
            <div style={{ marginTop: "32px" }}>
              <Link href="/professional" style={{ fontSize: "14px", color: "var(--ink-4)", fontWeight: 500 }}>
                View full profile →
              </Link>
            </div>
          </Anim>
        </section>

        {/* Selected Projects */}
        <section style={{ padding: "clamp(40px,6vw,54px) 0" }} className="section-divider">
          <Anim><p className="label">Selected Projects</p></Anim>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {projects.slice(0, 4).map((project, i) => (
              <Anim key={project.id} delay={i * 50}>
                <div style={{ display: "grid", gridTemplateColumns: "40px 1fr", gap: "18px" }}>
                  <span className="item-logo">
                    <span style={{ font: "600 12px var(--font-geist-sans)", color: "var(--ink-2)" }}>
                      {project.title.slice(0, 2).toUpperCase()}
                    </span>
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "14px" }}>
                      <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 600, letterSpacing: "-0.02em" }}>{project.title}</h3>
                      <span style={{
                        fontSize: "12px", fontWeight: 500, padding: "3px 9px",
                        borderRadius: "6px", border: "1px solid var(--line)",
                        color: "var(--ink-4)", whiteSpace: "nowrap"
                      }}>
                        {project.status}
                      </span>
                    </div>
                    <p className="mono" style={{ margin: "6px 0 0", fontSize: "12.5px", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ink-4)" }}>
                      {project.category} · {project.year}
                    </p>
                    <p style={{ margin: "12px 0 0", fontSize: "15.5px", color: "var(--ink-2)", lineHeight: 1.62 }}>{project.description}</p>
                  </div>
                </div>
              </Anim>
            ))}
          </div>
          <Anim delay={250}>
            <div style={{ marginTop: "32px" }}>
              <Link href="/creative" style={{ fontSize: "14px", color: "var(--ink-4)", fontWeight: 500 }}>
                All projects →
              </Link>
            </div>
          </Anim>
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
                <p style={{ margin: "0 0 12px", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.09em", color: "var(--ink-4)" }}>
                  {block.sub}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "9px" }}>
                  {block.items.map((s) => (
                    <span key={s} className="pill">{s}</span>
                  ))}
                </div>
              </div>
            </Anim>
          ))}
        </section>

        {/* Blog */}
        <section style={{ padding: "clamp(40px,6vw,54px) 0" }} className="section-divider">
          <Anim><p className="label">From the Blog</p></Anim>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {blogPosts.map((post, i) => (
              <Anim key={post.id} delay={i * 60}>
                <Link href={`/blog/${post.slug}`} className="contact-row" style={{ display: "flex", gap: "16px", alignItems: "baseline", textDecoration: "none" }}>
                  <span style={{ fontSize: "16px", fontWeight: 500 }}>{post.title}</span>
                  <span style={{ fontSize: "13px", color: "var(--ink-4)", fontFamily: "var(--font-geist-mono)", whiteSpace: "nowrap" }}>
                    {formatDate(post.date)}
                  </span>
                </Link>
              </Anim>
            ))}
          </div>
          <Anim delay={200}>
            <div style={{ marginTop: "24px" }}>
              <Link href="/blog" style={{ fontSize: "14px", color: "var(--ink-4)", fontWeight: 500 }}>
                All posts →
              </Link>
            </div>
          </Anim>
        </section>

        {/* Contact */}
        <section style={{ padding: "clamp(40px,6vw,54px) 0" }} className="section-divider">
          <Anim><p className="label">Contact</p></Anim>
          <div>
            {[
              { k: "Email", v: profile.email, href: `mailto:${profile.email}` },
              { k: "LinkedIn", v: "/in/murtazaameen", href: profile.social.linkedin },
              { k: "Instagram", v: "murtaxa00", href: profile.social.instagram },
            ].map((row, i) => (
              <Anim key={row.k} delay={i * 50}>
                <Link href={row.href} target={row.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className="contact-row">
                  <span style={{ fontSize: "16.5px", fontWeight: 500 }}>{row.k}</span>
                  <span style={{ fontSize: "15.5px", color: "var(--ink-2)" }}>{row.v}</span>
                </Link>
              </Anim>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer style={{ padding: "clamp(40px,6vw,56px) 0 clamp(48px,8vw,80px)", borderTop: "1px dashed var(--line)", textAlign: "center" }}>
          <Anim>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "11px" }}>
              <span style={{
                width: "30px", height: "30px", borderRadius: "8px",
                background: "var(--ink)", color: "var(--bg)",
                display: "grid", placeItems: "center",
                fontSize: "11.5px", fontWeight: 600, letterSpacing: "0.02em",
                fontFamily: "var(--font-geist-mono)"
              }}>
                GM
              </span>
              <span style={{ fontWeight: 600, fontSize: "15.5px" }}>Ghulam Murtaza</span>
            </div>
          </Anim>
          <Anim delay={60}>
            <div className="mono" style={{ marginTop: "18px", fontSize: "13px", color: "var(--ink-4)" }}>
              © 2026 · Lahore, Pakistan
            </div>
          </Anim>
        </footer>

      </div>
    </>
  );
}
