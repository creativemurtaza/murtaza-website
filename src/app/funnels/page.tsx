"use client";

import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { profile as staticProfile, projects as staticProjects } from "@/lib/data";
import { getProfile, getProjects } from "@/lib/queries";
import type { Profile, Project } from "@/lib/types";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

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

const TEARDOWN_MAILTO = "mailto:helloghulammurtaza@gmail.com?subject=Free%20funnel%20teardown&body=Hi%20Murtaza%2C%0A%0AHere%27s%20my%20site%2Ffunnel%3A%20";
const CHECKLIST_MAILTO = "mailto:helloghulammurtaza@gmail.com?subject=Send%20me%20the%20funnel%20checklist";

export default function FunnelsPage() {
  const [profile, setProfile] = useState<Profile>({
    ...staticProfile, id: "main", avatar_url: "/avatar.png", social: staticProfile.social,
  });
  const [projects, setProjects] = useState<Project[]>(
    staticProjects.map((p, i) => ({ ...p, category: p.category as Project["category"], image_url: null, project_url: null, sort_order: i }))
  );

  useEffect(() => {
    getProfile().then(setProfile);
    getProjects().then(setProjects);
  }, []);

  const featured = projects.slice(0, 3);

  return (
    <>
      <style>{`
        .funnel-page {
          --bg: oklch(0.994 0.001 100);
          --surface: oklch(0.972 0.004 70);
          --line: oklch(0.9 0.004 70);
          --line-soft: oklch(0.93 0.003 70);
          --ink: oklch(0.21 0.004 100);
          --ink-2: oklch(0.5 0.006 60);
          --ink-3: oklch(0.62 0.006 60);
          --ink-4: oklch(0.72 0.006 60);
          --accent: oklch(0.55 0.13 45);
          --accent-deep: oklch(0.47 0.13 45);
          --ease: cubic-bezier(0.22, 1, 0.36, 1);
          background: var(--bg);
          background-image: radial-gradient(oklch(0.9 0.004 70 / 0.6) 1px, transparent 1px);
          background-size: 26px 26px;
          background-position: -6px -6px;
          color: var(--ink);
          scroll-behavior: smooth;
        }
        .anim { opacity: 0; transform: translateY(14px); transition: opacity .6s var(--ease), transform .6s var(--ease); }
        .anim.in { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) { .anim { opacity: 1 !important; transform: none !important; transition: none !important; } }
        .f-label { margin: 0 0 10px; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: .1em; color: var(--ink); }
        .f-cue { margin: 0; font-size: 13px; font-style: italic; color: var(--ink-4); }
        .f-section { padding: clamp(48px, 8vw, 72px) 0; border-top: 1px dashed var(--line); }
        .btn-solid {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 24px; border-radius: 10px;
          background: var(--accent); color: #fff; border: 1px solid var(--accent);
          font-weight: 600; font-size: 15.5px; text-decoration: none;
          transition: background .25s var(--ease), transform .25s var(--ease), box-shadow .25s var(--ease);
          box-shadow: 0 6px 18px -8px oklch(0.55 0.13 45 / 0.55);
        }
        .btn-solid:hover { background: var(--accent-deep); transform: translateY(-2px); box-shadow: 0 10px 24px -8px oklch(0.55 0.13 45 / 0.6); }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 24px; border-radius: 10px; border: 1px solid var(--line);
          color: var(--ink-2); font-weight: 500; font-size: 15.5px; text-decoration: none;
          transition: border-color .25s, color .25s, transform .25s var(--ease);
        }
        .btn-ghost:hover { border-color: var(--ink-4); color: var(--ink); transform: translateY(-2px); }
        .fnav {
          position: sticky; top: 0; z-index: 50;
          backdrop-filter: blur(10px);
          background: oklch(0.994 0.001 100 / 0.82);
          border-bottom: 1px solid var(--line-soft);
        }
        .fnav a { text-decoration: none; }
        .fnav .nav-link { font-size: 13.5px; color: var(--ink-3); transition: color .2s; }
        .fnav .nav-link:hover { color: var(--ink); }
        .problem-card {
          border: 1px solid var(--line); border-radius: 14px; padding: 24px;
          background: var(--bg);
          transition: transform .3s var(--ease), border-color .3s, box-shadow .3s var(--ease);
        }
        .problem-card:hover { transform: translateY(-3px); border-color: var(--ink-4); box-shadow: 0 10px 26px -14px oklch(0 0 0 / 0.18); }
        .service-card {
          border: 1px solid var(--line); border-radius: 14px; padding: 24px;
          background: var(--bg); display: flex; flex-direction: column; gap: 10px;
          transition: transform .3s var(--ease), border-color .3s, box-shadow .3s var(--ease);
        }
        .service-card:hover { transform: translateY(-3px); border-color: var(--ink-4); box-shadow: 0 10px 26px -14px oklch(0 0 0 / 0.18); }
        .case-card { text-decoration: none; color: inherit; display: block; border: 1px solid var(--line); border-radius: 14px; overflow: hidden; background: var(--bg); transition: transform .3s var(--ease), box-shadow .3s var(--ease), border-color .3s; }
        .case-card:hover { transform: translateY(-3px); border-color: var(--ink-4); box-shadow: 0 12px 30px -16px oklch(0 0 0 / 0.2); }
        .case-card:hover .case-img { transform: scale(1.03); }
        .case-img { transition: transform .5s var(--ease); }
        .status-pill {
          display: inline-block; font-size: 11.5px; text-transform: uppercase;
          letter-spacing: .07em; color: var(--ink-4);
          padding: 5px 10px; border: 1px solid var(--line); border-radius: 999px;
          font-family: var(--font-geist-mono);
        }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .grid-4 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        @media (max-width: 640px) {
          .grid-3 { grid-template-columns: 1fr; }
          .grid-4 { grid-template-columns: 1fr; }
          .fnav .nav-links { display: none; }
          .hero-ctas { flex-direction: column; align-items: stretch; }
        }
      `}</style>

      <div className={`funnel-page ${inter.className}`} style={{ minHeight: "100vh" }}>

        {/* Sticky nav */}
        <nav className="fnav">
          <div style={{ maxWidth: "760px", margin: "0 auto", paddingInline: "clamp(20px, 5vw, 36px)", display: "flex", alignItems: "center", justifyContent: "space-between", height: "56px" }}>
            <Link href="/funnels" style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: 700, fontSize: "14.5px", color: "var(--ink)" }}>
              <span style={{ width: "28px", height: "28px", borderRadius: "8px", background: "var(--accent)", color: "#fff", display: "inline-grid", placeItems: "center", fontSize: "10.5px", fontWeight: 700, fontFamily: "var(--font-geist-mono)" }}>GM</span>
              Ghulam Murtaza
            </Link>
            <div className="nav-links" style={{ display: "flex", gap: "20px" }}>
              <a className="nav-link" href="#problem">The Problem</a>
              <a className="nav-link" href="#proof">Proof</a>
              <a className="nav-link" href="#services">Services</a>
              <a className="nav-link" href="#move" style={{ color: "var(--accent)", fontWeight: 600 }}>Your Move</a>
            </div>
          </div>
        </nav>

        <div style={{ maxWidth: "760px", margin: "0 auto", paddingInline: "clamp(20px, 5vw, 36px)" }}>

          {/* Hero */}
          <section style={{ padding: "clamp(56px, 10vw, 96px) 0 clamp(32px, 6vw, 48px)" }}>
            <Anim>
              <h1 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(38px, 7.5vw, 68px)", letterSpacing: "-0.035em", lineHeight: 1.02 }}>
                More traffic won&apos;t fix<br />
                <span style={{ color: "var(--accent)" }}>a funnel that leaks.</span>
              </h1>
            </Anim>
            <Anim delay={70}>
              <p style={{ margin: "22px 0 0", maxWidth: "520px", fontSize: "clamp(17px, 2.2vw, 20px)", color: "var(--ink-2)", lineHeight: 1.55 }}>
                I&apos;m Murtaza. I&apos;ve spent years making people <em>stop scrolling</em> as a motion designer and making people <em>say yes</em> on the sales floor at Vivo. Now I build funnels that turn your existing traffic into customers.
              </p>
            </Anim>
            <Anim delay={130}>
              <div className="hero-ctas" style={{ display: "flex", gap: "12px", marginTop: "32px", flexWrap: "wrap" }}>
                <a className="btn-solid" href={TEARDOWN_MAILTO}>
                  Book a free funnel teardown
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7"/><path d="M9 7h8v8"/></svg>
                </a>
                <a className="btn-ghost" href="#proof">See the proof</a>
              </div>
            </Anim>
            <Anim delay={180}>
              <p className="f-cue" style={{ marginTop: "18px" }}>free, honest, and occasionally brutal</p>
            </Anim>
          </section>

          {/* Hero image */}
          <Anim>
            <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: "16px", overflow: "hidden", border: "1px solid var(--line-soft)", position: "relative", background: "var(--surface)" }}>
              <Image src="/about/photo-1.jpg" alt="Ghulam Murtaza presenting" fill sizes="(max-width: 760px) 100vw, 760px" style={{ objectFit: "cover", objectPosition: "center 30%" }} priority />
            </div>
            <p className="f-cue" style={{ marginTop: "10px", textAlign: "right" }}>me, explaining why the button copy matters</p>
          </Anim>

          {/* The Problem */}
          <section className="f-section" id="problem" style={{ marginTop: "clamp(40px, 7vw, 56px)" }}>
            <Anim><p className="f-label">Where your signups are dying</p></Anim>
            <Anim delay={40}><p className="f-cue" style={{ marginBottom: "30px" }}>it&apos;s usually one of these three</p></Anim>
            <div className="grid-3">
              {[
                { t: "A confusing landing page", d: "Visitors give you about five seconds. If they can't tell what you do and why it matters, they're gone — and no ad budget brings them back." },
                { t: "One weak line above the button", d: "The sentence next to your CTA does more selling than the rest of the page combined. Most sites waste it on \"Submit\"." },
                { t: "A leaky signup flow", d: "Every extra field, redirect, and \"verify your email\" wall drops another slice of people who already said yes. The fix is subtraction." },
              ].map((card, i) => (
                <Anim key={card.t} delay={i * 70}>
                  <div className="problem-card">
                    <div style={{ fontSize: "22px", fontWeight: 800, color: "var(--accent)", marginBottom: "10px", fontFamily: "var(--font-geist-mono)" }}>0{i + 1}</div>
                    <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700, letterSpacing: "-0.02em" }}>{card.t}</h3>
                    <p style={{ margin: "10px 0 0", fontSize: "14.5px", color: "var(--ink-2)", lineHeight: 1.6 }}>{card.d}</p>
                  </div>
                </Anim>
              ))}
            </div>
          </section>

          {/* Proof */}
          <section className="f-section" id="proof">
            <Anim><p className="f-label">Where the work has landed</p></Anim>
            <div className="grid-3" style={{ marginTop: "30px" }}>
              {[
                { num: "38+", desc: "projects delivered end-to-end as a freelancer" },
                { num: "26+", desc: "clients who came for one project and stayed" },
                { num: "300+", desc: "hours saved yearly by a product I built and ship" },
              ].map((stat, i) => (
                <Anim key={stat.num} delay={i * 60}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "clamp(36px, 6vw, 52px)", color: "var(--accent)", lineHeight: 1, letterSpacing: "-0.02em" }}>{stat.num}</div>
                    <div style={{ marginTop: "8px", fontSize: "13.5px", color: "var(--ink-3)" }}>{stat.desc}</div>
                  </div>
                </Anim>
              ))}
            </div>
            <Anim delay={200}>
              <p style={{ marginTop: "28px", fontSize: "14.5px", color: "var(--ink-3)" }}>
                Time spent at <strong style={{ color: "var(--ink-2)" }}>Vivo Pakistan</strong> · <strong style={{ color: "var(--ink-2)" }}>Emirates Logistics</strong> · <strong style={{ color: "var(--ink-2)" }}>Bookme</strong> · <strong style={{ color: "var(--ink-2)" }}>Cube Films</strong>
              </p>
            </Anim>
          </section>

          {/* Story */}
          <section className="f-section">
            <Anim><p className="f-label">Why me</p></Anim>
            <Anim delay={40}><p className="f-cue" style={{ marginBottom: "28px" }}>the short version</p></Anim>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 220px", gap: "28px", alignItems: "start" }} className="story-grid">
              <style>{`@media (max-width: 640px){ .story-grid { grid-template-columns: 1fr !important; } }`}</style>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <Anim>
                  <p style={{ margin: 0, fontSize: "16.5px", color: "var(--ink-2)", lineHeight: 1.68 }}>
                    I started as a <strong style={{ color: "var(--ink)" }}>2D animator</strong>, learning the hard way what makes people stop scrolling. Then <strong style={{ color: "var(--ink)" }}>38+ freelance explainer projects</strong> for SaaS companies taught me how to compress a pitch into ninety seconds.
                  </p>
                </Anim>
                <Anim delay={60}>
                  <p style={{ margin: 0, fontSize: "16.5px", color: "var(--ink-2)", lineHeight: 1.68 }}>
                    Then I did something most designers never do: I went and <strong style={{ color: "var(--ink)" }}>sold things to real people</strong> at Vivo Pakistan. Face to face. You learn more about conversion in a week of that than a year of dashboards.
                  </p>
                </Anim>
                <Anim delay={120}>
                  <p style={{ margin: 0, fontSize: "16.5px", color: "var(--ink-2)", lineHeight: 1.68 }}>
                    Now I put both together: pages that hold attention, and flows that close. Design that sells, built with AI-speed.
                  </p>
                </Anim>
              </div>
              <Anim delay={100}>
                <div style={{ transform: "rotate(2deg)" }}>
                  <div style={{ width: "100%", aspectRatio: "4/5", borderRadius: "14px", overflow: "hidden", border: "1px solid var(--line-soft)", position: "relative", background: "var(--surface)" }}>
                    <Image src="/about/photo-2.jpg" alt="At Vivo" fill sizes="220px" style={{ objectFit: "cover" }} />
                  </div>
                  <p className="f-cue" style={{ marginTop: "8px", textAlign: "center" }}>the sales floor years</p>
                </div>
              </Anim>
            </div>
          </section>

          {/* Case studies */}
          <section className="f-section">
            <Anim><p className="f-label">Receipts</p></Anim>
            <Anim delay={40}><p className="f-cue" style={{ marginBottom: "30px" }}>real things, really shipped</p></Anim>
            <div className="grid-3">
              {featured.map((project, i) => {
                const inner = (
                  <>
                    <div style={{ width: "100%", aspectRatio: "4/3", position: "relative", background: "var(--surface)", overflow: "hidden" }}>
                      {project.image_url ? (
                        <Image src={project.image_url} alt={project.title} fill sizes="(max-width: 640px) 100vw, 240px" className="case-img" style={{ objectFit: "cover" }} />
                      ) : (
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-4)", fontSize: "13px", fontStyle: "italic" }}>{project.title}</div>
                      )}
                    </div>
                    <div style={{ padding: "16px" }}>
                      <h3 style={{ margin: 0, fontSize: "15.5px", fontWeight: 700, letterSpacing: "-0.02em" }}>{project.title}</h3>
                      <p style={{ margin: "8px 0 12px", fontSize: "13.5px", color: "var(--ink-3)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{project.description}</p>
                      <span className="status-pill">{project.status}</span>
                    </div>
                  </>
                );
                return (
                  <Anim key={project.id} delay={i * 70}>
                    {project.project_url ? (
                      <a className="case-card" href={project.project_url} target="_blank" rel="noopener noreferrer">{inner}</a>
                    ) : (
                      <div className="case-card">{inner}</div>
                    )}
                  </Anim>
                );
              })}
            </div>
          </section>

          {/* Services */}
          <section className="f-section" id="services">
            <Anim><p className="f-label">Ways to work with me</p></Anim>
            <Anim delay={40}><p className="f-cue" style={{ marginBottom: "30px" }}>pick your depth</p></Anim>
            <div className="grid-4">
              {[
                { t: "Funnel Audit", d: "I go through your landing page and signup flow line by line and hand you a ranked list of leaks — what's costing you signups and exactly how to fix it.", tag: "fastest" },
                { t: "Funnel Build", d: "Landing page, copy, flow, and follow-up — designed and built end to end. You bring the offer; I make the path to \"yes\" frictionless.", tag: "most popular" },
                { t: "Growth Strategy", d: "Ongoing partner for testing and iterating: headlines, CTAs, onboarding steps. We change one thing at a time and keep what converts.", tag: "ongoing" },
                { t: "Free Funnel Checklist", d: "The 20-point checklist I run on every audit. Steal it, run it on your own site tonight, and fix the obvious leaks yourself.", tag: "free", free: true },
              ].map((s, i) => (
                <Anim key={s.t} delay={i * 60}>
                  <div className="service-card" style={s.free ? { borderColor: "var(--accent)", borderStyle: "dashed" } : undefined}>
                    <span className="status-pill" style={s.free ? { color: "var(--accent)", borderColor: "var(--accent)" } : undefined}>{s.tag}</span>
                    <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700, letterSpacing: "-0.02em" }}>{s.t}</h3>
                    <p style={{ margin: 0, fontSize: "14.5px", color: "var(--ink-2)", lineHeight: 1.6, flex: 1 }}>{s.d}</p>
                    <a href={s.free ? CHECKLIST_MAILTO : TEARDOWN_MAILTO} style={{ fontSize: "14px", fontWeight: 600, color: "var(--accent)", textDecoration: "none", marginTop: "4px" }}>
                      {s.free ? "Get the checklist →" : "Start here →"}
                    </a>
                  </div>
                </Anim>
              ))}
            </div>
          </section>

          {/* Big CTA */}
          <section className="f-section" id="move" style={{ textAlign: "center" }}>
            <Anim>
              <h2 style={{ margin: 0, fontWeight: 800, fontSize: "clamp(30px, 5.5vw, 48px)", letterSpacing: "-0.03em", lineHeight: 1.08 }}>
                Your move.
              </h2>
            </Anim>
            <Anim delay={60}>
              <p style={{ margin: "16px auto 0", maxWidth: "440px", fontSize: "17px", color: "var(--ink-2)", lineHeight: 1.6 }}>
                Send me your site. I&apos;ll record a free teardown of where your funnel leaks — no call required, no strings attached.
              </p>
            </Anim>
            <Anim delay={120}>
              <div style={{ marginTop: "28px" }}>
                <a className="btn-solid" href={TEARDOWN_MAILTO} style={{ fontSize: "16.5px", padding: "16px 30px" }}>
                  Get my free teardown
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7"/><path d="M9 7h8v8"/></svg>
                </a>
              </div>
            </Anim>
            <Anim delay={170}>
              <p className="f-cue" style={{ marginTop: "16px" }}>worst case, you get free advice. best case, your signups double.</p>
            </Anim>
          </section>

          {/* Footer */}
          <footer style={{ padding: "clamp(40px, 6vw, 56px) 0 clamp(48px, 8vw, 80px)", borderTop: "1px dashed var(--line)" }}>
            <Anim>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", fontSize: "13px", color: "var(--ink-4)" }}>
                <span style={{ fontFamily: "var(--font-geist-mono)" }}>© 2026 Ghulam Murtaza</span>
                <div style={{ display: "flex", gap: "16px" }}>
                  <a href={`mailto:${profile.email}`} style={{ color: "var(--ink-3)", textDecoration: "underline", textUnderlineOffset: "3px" }}>Email</a>
                  <a href={profile.social.linkedin ?? "#"} target="_blank" rel="noopener noreferrer" style={{ color: "var(--ink-3)", textDecoration: "underline", textUnderlineOffset: "3px" }}>LinkedIn</a>
                  <a href={profile.social.instagram ?? "#"} target="_blank" rel="noopener noreferrer" style={{ color: "var(--ink-3)", textDecoration: "underline", textUnderlineOffset: "3px" }}>Instagram</a>
                </div>
              </div>
            </Anim>
            <Anim delay={60}>
              <p className="f-cue" style={{ marginTop: "16px" }}>
                <Link href="/" style={{ color: "inherit" }}>← the calmer version of me</Link>
              </p>
            </Anim>
          </footer>

        </div>
      </div>
    </>
  );
}
