"use client";

import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { profile as staticProfile, projects as staticProjects } from "@/lib/data";
import { getProfile, getProjects } from "@/lib/queries";
import type { Profile, Project } from "@/lib/types";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

const TEARDOWN_MAILTO = "mailto:helloghulammurtaza@gmail.com?subject=Free%20funnel%20teardown&body=Hi%20Murtaza%2C%0A%0AHere%27s%20my%20site%3A%20";
const CHECKLIST_MAILTO = "mailto:helloghulammurtaza@gmail.com?subject=Send%20me%20the%20funnel%20checklist";

/* ---------- scroll reveal ---------- */
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
    setTimeout(() => el.classList.add("in"), 2000);
    return () => io.disconnect();
  }, [delay]);
  return <div ref={ref} className="anim" style={style}>{children}</div>;
}

/* ---------- count-up number ---------- */
function CountUp({ to, suffix = "", duration = 1400 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started.current) return;
      started.current = true;
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(to * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.disconnect();
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ---------- animated funnel bar ---------- */
function LeakBar({ width, label, count, leak, delay }: { width: number; label: string; count: string; leak?: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => { el.style.width = `${width}%`; }, delay);
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [width, delay]);
  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div
          ref={ref}
          style={{
            width: "0%", height: "54px", borderRadius: "8px",
            background: "linear-gradient(90deg, oklch(0.72 0.16 45), oklch(0.62 0.19 40))",
            transition: "width 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
            display: "flex", alignItems: "center", paddingLeft: "16px",
            minWidth: "fit-content", whiteSpace: "nowrap",
            boxShadow: "0 4px 14px -6px oklch(0.62 0.19 40 / 0.5)",
          }}
        >
          <span style={{ fontWeight: 800, fontSize: "15px", color: "#fff", paddingRight: "16px" }}>{count}</span>
        </div>
        <span style={{ fontSize: "13.5px", color: "var(--f-mute)", whiteSpace: "nowrap", fontWeight: 500 }}>{label}</span>
      </div>
      {leak && (
        <div style={{
          marginTop: "6px", marginBottom: "6px", paddingLeft: "16px",
          fontSize: "12.5px", fontStyle: "italic", color: "oklch(0.62 0.19 29)",
          display: "flex", alignItems: "center", gap: "6px",
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 3v14"/><path d="m6 13 6 6 6-6"/></svg>
          {leak}
        </div>
      )}
    </div>
  );
}

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
        .fp {
          --f-black: oklch(0.17 0.01 60);
          --f-black-2: oklch(0.22 0.012 60);
          --f-cream: oklch(0.97 0.008 85);
          --f-cream-2: oklch(0.93 0.012 85);
          --f-orange: oklch(0.66 0.19 40);
          --f-orange-hot: oklch(0.6 0.21 35);
          --f-red: oklch(0.58 0.21 29);
          --f-ink: oklch(0.2 0.01 60);
          --f-mute: oklch(0.62 0.015 70);
          --f-mute-dark: oklch(0.52 0.015 70);
          --ease: cubic-bezier(0.22, 1, 0.36, 1);
          background: var(--f-black);
          color: var(--f-cream);
          overflow-x: clip;
        }
        .fp ::selection { background: oklch(0.66 0.19 40 / 0.35); }
        .anim { opacity: 0; transform: translateY(18px); transition: opacity .7s var(--ease), transform .7s var(--ease); }
        .anim.in { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) { .anim { opacity: 1 !important; transform: none !important; transition: none !important; } }

        .fp-wrap { max-width: 1060px; margin: 0 auto; padding-inline: clamp(20px, 5vw, 48px); }

        /* nav */
        .fp-nav { position: sticky; top: 0; z-index: 60; background: oklch(0.17 0.01 60 / 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid oklch(1 0 0 / 0.08); }
        .fp-nav a { text-decoration: none; }
        .fp-nav .lnk { font-size: 13px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--f-mute); transition: color .2s; }
        .fp-nav .lnk:hover { color: var(--f-cream); }

        /* display type */
        .display {
          font-weight: 900; letter-spacing: -0.04em; line-height: 0.95;
          text-transform: uppercase;
        }

        /* marquee */
        .marquee { overflow: hidden; border-block: 1px solid oklch(1 0 0 / 0.12); background: var(--f-orange); color: var(--f-black); }
        .marquee-track { display: flex; gap: 0; width: max-content; animation: scroll 22s linear infinite; }
        .marquee span { font-weight: 800; font-size: 15px; text-transform: uppercase; letter-spacing: 0.06em; padding: 12px 0; white-space: nowrap; }
        .marquee b { margin: 0 18px; font-weight: 400; }
        @keyframes scroll { to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .marquee-track { animation: none; } }

        /* buttons */
        .cta-hot {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--f-orange); color: var(--f-black);
          font-weight: 800; font-size: 16px; letter-spacing: -0.01em;
          padding: 18px 30px; border-radius: 999px; text-decoration: none;
          border: 2px solid var(--f-orange);
          transition: transform .25s var(--ease), box-shadow .25s var(--ease), background .25s;
          box-shadow: 0 10px 34px -10px oklch(0.66 0.19 40 / 0.65);
        }
        .cta-hot:hover { transform: translateY(-3px) scale(1.02); background: var(--f-orange-hot); box-shadow: 0 16px 44px -10px oklch(0.66 0.19 40 / 0.75); }
        .cta-line {
          display: inline-flex; align-items: center; gap: 10px;
          color: var(--f-cream); font-weight: 600; font-size: 16px;
          padding: 18px 30px; border-radius: 999px; text-decoration: none;
          border: 2px solid oklch(1 0 0 / 0.22);
          transition: border-color .25s, transform .25s var(--ease), background .25s;
        }
        .cta-line:hover { border-color: var(--f-cream); transform: translateY(-3px); background: oklch(1 0 0 / 0.05); }

        /* light sections */
        .light { background: var(--f-cream); color: var(--f-ink); }
        .light .f-cue { color: var(--f-mute-dark); }

        .f-cue { font-size: 13.5px; font-style: italic; color: var(--f-mute); }
        .kicker {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 12.5px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase;
        }
        .kicker::before { content: ""; width: 34px; height: 3px; background: var(--f-orange); border-radius: 2px; }

        /* problem cards */
        .p-card {
          background: #fff; color: var(--f-ink);
          border-radius: 18px; padding: 30px 26px;
          box-shadow: 0 18px 44px -20px oklch(0 0 0 / 0.28);
          position: relative;
          transition: transform .35s var(--ease), box-shadow .35s var(--ease);
        }
        .p-card:hover { transform: translateY(-6px) rotate(0deg) !important; box-shadow: 0 30px 60px -24px oklch(0 0 0 / 0.35); }
        .p-num {
          position: absolute; top: -18px; left: 22px;
          width: 44px; height: 44px; border-radius: 50%;
          background: var(--f-black); color: var(--f-orange);
          display: grid; place-items: center;
          font-weight: 900; font-size: 16px;
          border: 3px solid var(--f-cream);
        }

        /* don't/do */
        .dd { border-radius: 18px; padding: 26px 28px; position: relative; overflow: hidden; }
        .dd-dont { background: oklch(0.95 0.03 29); border: 2px dashed oklch(0.7 0.14 29); color: oklch(0.4 0.14 29); }
        .dd-do { background: oklch(0.95 0.05 145); border: 2px solid oklch(0.55 0.14 150); color: oklch(0.32 0.1 150); }
        .dd .tag { font-size: 11px; font-weight: 900; letter-spacing: 0.16em; text-transform: uppercase; }
        .dd .line { font-size: clamp(18px, 2.6vw, 24px); font-weight: 700; letter-spacing: -0.02em; margin-top: 10px; }
        .dd-dont .line { text-decoration: line-through; text-decoration-thickness: 3px; text-decoration-color: oklch(0.58 0.21 29 / 0.7); }

        /* dark stat */
        .stat-num { font-weight: 900; font-size: clamp(56px, 9vw, 110px); letter-spacing: -0.05em; line-height: 1; color: var(--f-orange); }

        /* photos */
        .tape-photo { position: relative; background: #fff; padding: 10px 10px 34px; border-radius: 4px; box-shadow: 0 20px 44px -18px oklch(0 0 0 / 0.45); }
        .tape-photo::before {
          content: ""; position: absolute; top: -12px; left: 50%; transform: translateX(-50%) rotate(-3deg);
          width: 90px; height: 26px; background: oklch(0.85 0.06 85 / 0.85); border-radius: 2px;
          box-shadow: 0 2px 6px oklch(0 0 0 / 0.15);
        }
        .tape-cap { position: absolute; bottom: 8px; left: 0; right: 0; text-align: center; font-size: 12.5px; font-style: italic; color: var(--f-mute-dark); }

        /* case cards */
        .r-card { display: block; text-decoration: none; color: var(--f-cream); border: 1px solid oklch(1 0 0 / 0.12); border-radius: 18px; overflow: hidden; background: var(--f-black-2); transition: transform .35s var(--ease), border-color .3s, box-shadow .35s var(--ease); }
        .r-card:hover { transform: translateY(-5px); border-color: var(--f-orange); box-shadow: 0 24px 50px -20px oklch(0.66 0.19 40 / 0.35); }
        .r-card:hover .r-img { transform: scale(1.04); }
        .r-img { transition: transform .6s var(--ease); }

        /* services */
        .s-card {
          border-radius: 20px; padding: 30px 28px; display: flex; flex-direction: column; gap: 12px;
          background: #fff; color: var(--f-ink);
          box-shadow: 0 18px 44px -22px oklch(0 0 0 / 0.25);
          transition: transform .35s var(--ease), box-shadow .35s var(--ease);
          position: relative;
        }
        .s-card:hover { transform: translateY(-6px); box-shadow: 0 30px 60px -24px oklch(0 0 0 / 0.32); }
        .s-card.hero-card { background: var(--f-black); color: var(--f-cream); outline: 3px solid var(--f-orange); outline-offset: -3px; }
        .s-tag { align-self: flex-start; font-size: 11px; font-weight: 900; letter-spacing: 0.14em; text-transform: uppercase; padding: 6px 12px; border-radius: 999px; background: oklch(0.66 0.19 40 / 0.14); color: var(--f-orange-hot); }
        .s-card.hero-card .s-tag { background: var(--f-orange); color: var(--f-black); }
        .s-link { font-weight: 800; font-size: 15px; color: var(--f-orange-hot); text-decoration: none; margin-top: auto; display: inline-flex; align-items: center; gap: 6px; transition: gap .25s var(--ease); }
        .s-link:hover { gap: 11px; }
        .s-card.hero-card .s-link { color: var(--f-orange); }

        /* grids */
        .g3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px; }
        .g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 26px; }
        @media (max-width: 760px) {
          .g3 { grid-template-columns: 1fr; }
          .g2 { grid-template-columns: 1fr; }
          .fp-nav .navlinks { display: none; }
          .hero-cta-row { flex-direction: column; align-items: stretch; }
          .story-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className={`fp ${inter.className}`} style={{ minHeight: "100vh" }}>

        {/* ===== NAV ===== */}
        <nav className="fp-nav">
          <div className="fp-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "62px" }}>
            <Link href="/funnels" style={{ display: "flex", alignItems: "center", gap: "11px", color: "var(--f-cream)", fontWeight: 800, fontSize: "15px", letterSpacing: "-0.01em" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "9px", background: "var(--f-orange)", color: "var(--f-black)", display: "inline-grid", placeItems: "center", fontSize: "11px", fontWeight: 900 }}>GM</span>
              MURTAZA
            </Link>
            <div className="navlinks" style={{ display: "flex", gap: "26px", alignItems: "center" }}>
              <a className="lnk" href="#leaks">The Leaks</a>
              <a className="lnk" href="#proof">Proof</a>
              <a className="lnk" href="#receipts">Receipts</a>
              <a className="lnk" href="#services">Services</a>
              <a href="#move" style={{ background: "var(--f-orange)", color: "var(--f-black)", fontWeight: 800, fontSize: "13px", padding: "9px 18px", borderRadius: "999px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Your Move</a>
            </div>
          </div>
        </nav>

        {/* ===== HERO ===== */}
        <header style={{ position: "relative" }}>
          <div className="fp-wrap" style={{ padding: "clamp(64px, 11vw, 130px) 0 clamp(48px, 7vw, 80px)" }}>
            <Anim>
              <p className="kicker" style={{ color: "var(--f-orange)" }}>Sales funnels · teardowns · rebuilds</p>
            </Anim>
            <Anim delay={70}>
              <h1 className="display" style={{ margin: "26px 0 0", fontSize: "clamp(46px, 9.5vw, 118px)" }}>
                Your traffic<br />isn&apos;t the problem.
              </h1>
            </Anim>
            <Anim delay={150}>
              <h1 className="display" style={{ margin: "10px 0 0", fontSize: "clamp(46px, 9.5vw, 118px)", color: "var(--f-orange)", WebkitTextStroke: "0", textShadow: "0 12px 60px oklch(0.66 0.19 40 / 0.35)" }}>
                The leaks are.
              </h1>
            </Anim>
            <Anim delay={230}>
              <p style={{ margin: "30px 0 0", maxWidth: "560px", fontSize: "clamp(17px, 2.2vw, 21px)", lineHeight: 1.55, color: "var(--f-mute)" }}>
                Every day, people land on your site, almost buy, and quietly leave. I find where they fall out — and rebuild the path so they don&apos;t. <strong style={{ color: "var(--f-cream)" }}>Free teardown. No call. No strings.</strong>
              </p>
            </Anim>
            <Anim delay={300}>
              <div className="hero-cta-row" style={{ display: "flex", gap: "14px", marginTop: "38px", flexWrap: "wrap" }}>
                <a className="cta-hot" href={TEARDOWN_MAILTO}>
                  Tear my funnel apart — free
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M7 17 17 7"/><path d="M9 7h8v8"/></svg>
                </a>
                <a className="cta-line" href="#leaks">Show me the leaks first</a>
              </div>
            </Anim>
          </div>
        </header>

        {/* ===== MARQUEE ===== */}
        <div className="marquee">
          <div className="marquee-track">
            {[0, 1].map((k) => (
              <span key={k} aria-hidden={k === 1}>
                Funnel teardowns<b>✦</b>Landing pages that close<b>✦</b>Copy that converts<b>✦</b>Signup flows without friction<b>✦</b>Built with AI-speed<b>✦</b>
                Funnel teardowns<b>✦</b>Landing pages that close<b>✦</b>Copy that converts<b>✦</b>Signup flows without friction<b>✦</b>Built with AI-speed<b>✦</b>
              </span>
            ))}
          </div>
        </div>

        {/* ===== THE LEAK DIAGRAM ===== */}
        <section className="light" id="leaks">
          <div className="fp-wrap" style={{ padding: "clamp(64px, 9vw, 110px) 0" }}>
            <Anim><p className="kicker" style={{ color: "var(--f-orange-hot)" }}>Exhibit A</p></Anim>
            <Anim delay={60}>
              <h2 className="display" style={{ margin: "20px 0 0", fontSize: "clamp(32px, 5.5vw, 64px)" }}>
                Watch 1,000 visitors<br />become 12 customers.
              </h2>
            </Anim>
            <Anim delay={120}>
              <p className="f-cue" style={{ marginTop: "14px" }}>this is what an average funnel actually does — your scroll is filling this one</p>
            </Anim>

            <div style={{ marginTop: "48px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <LeakBar width={100} count="1,000" label="land on your page" delay={0} />
              <LeakBar width={46} count="460" label="still reading after 5 seconds" leak="— 540 gone: headline didn't say what you do" delay={200} />
              <LeakBar width={17} count="170" label="reach the button" leak="— 290 gone: wall of text, no reason to keep going" delay={400} />
              <LeakBar width={5} count="47" label="click it" leak="— 123 gone: the line above the button sold nothing" delay={600} />
              <LeakBar width={1.4} count="12" label="actually finish signing up" leak="— 35 gone: six form fields and a verify-email wall" delay={800} />
            </div>

            <Anim delay={200}>
              <div style={{ marginTop: "44px", padding: "24px 28px", borderRadius: "16px", background: "#fff", boxShadow: "0 18px 44px -22px oklch(0 0 0 / 0.25)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "18px" }}>
                <p style={{ margin: 0, fontSize: "17px", fontWeight: 700, letterSpacing: "-0.01em" }}>
                  988 people wanted to know more. <span style={{ color: "var(--f-orange-hot)" }}>You paid for all of them.</span>
                </p>
                <a href={TEARDOWN_MAILTO} style={{ fontWeight: 800, fontSize: "15px", color: "var(--f-orange-hot)", textDecoration: "none", whiteSpace: "nowrap" }}>Find my leaks →</a>
              </div>
            </Anim>
          </div>
        </section>

        {/* ===== THE 3 LEAKS ===== */}
        <section className="light" style={{ background: "var(--f-cream-2)" }}>
          <div className="fp-wrap" style={{ padding: "clamp(64px, 9vw, 110px) 0" }}>
            <Anim><p className="kicker" style={{ color: "var(--f-orange-hot)" }}>The usual suspects</p></Anim>
            <Anim delay={60}>
              <h2 className="display" style={{ margin: "20px 0 46px", fontSize: "clamp(32px, 5.5vw, 64px)" }}>
                Three leaks kill<br />most funnels.
              </h2>
            </Anim>
            <div className="g3">
              {[
                { n: "01", t: "The confused hello", d: "Your landing page takes 30 seconds to explain what should take 5. Confused visitors don't scroll down — they close the tab.", tilt: "-1.2deg" },
                { n: "02", t: "The wasted button", d: "“Submit.” “Learn more.” “Get started.” The most valuable pixels on your page, spent on words that promise nothing.", tilt: "0.8deg" },
                { n: "03", t: "The signup obstacle course", d: "Six fields, a captcha, a verify-email wall. Every step after “yes” is a chance to turn it back into “no”.", tilt: "-0.7deg" },
              ].map((c, i) => (
                <Anim key={c.n} delay={i * 90}>
                  <div className="p-card" style={{ transform: `rotate(${c.tilt})` }}>
                    <div className="p-num">{c.n}</div>
                    <h3 style={{ margin: "16px 0 0", fontSize: "20px", fontWeight: 800, letterSpacing: "-0.02em" }}>{c.t}</h3>
                    <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: 1.6, color: "var(--f-mute-dark)" }}>{c.d}</p>
                  </div>
                </Anim>
              ))}
            </div>

            {/* don't / do */}
            <div className="g2" style={{ marginTop: "54px" }}>
              <Anim>
                <div className="dd dd-dont">
                  <span className="tag">✕ what most sites say</span>
                  <p className="line">Submit</p>
                  <p style={{ margin: "8px 0 0", fontSize: "13.5px", opacity: 0.75 }}>a word that asks for effort and offers nothing</p>
                </div>
              </Anim>
              <Anim delay={90}>
                <div className="dd dd-do">
                  <span className="tag">✓ what converts</span>
                  <p className="line">Get my free teardown →</p>
                  <p style={{ margin: "8px 0 0", fontSize: "13.5px", opacity: 0.75 }}>a promise, a price (free), and a direction</p>
                </div>
              </Anim>
            </div>
          </div>
        </section>

        {/* ===== PROOF ===== */}
        <section id="proof">
          <div className="fp-wrap" style={{ padding: "clamp(64px, 9vw, 110px) 0" }}>
            <Anim><p className="kicker" style={{ color: "var(--f-orange)" }}>Proof, not promises</p></Anim>
            <div className="g3" style={{ marginTop: "44px", gap: "40px" }}>
              {[
                { to: 38, suffix: "+", desc: "projects delivered end-to-end — every one shipped, none ghosted" },
                { to: 26, suffix: "+", desc: "clients who came for one project and came back for more" },
                { to: 300, suffix: "+", desc: "hours saved every year by a product I designed, built, and still run" },
              ].map((s, i) => (
                <Anim key={i} delay={i * 80}>
                  <div>
                    <div className="stat-num"><CountUp to={s.to} suffix={s.suffix} /></div>
                    <p style={{ margin: "14px 0 0", fontSize: "14.5px", lineHeight: 1.55, color: "var(--f-mute)" }}>{s.desc}</p>
                  </div>
                </Anim>
              ))}
            </div>
            <Anim delay={220}>
              <p style={{ marginTop: "44px", fontSize: "15px", color: "var(--f-mute)" }}>
                Sharpened at <strong style={{ color: "var(--f-cream)" }}>Vivo Pakistan</strong> · <strong style={{ color: "var(--f-cream)" }}>Emirates Logistics</strong> · <strong style={{ color: "var(--f-cream)" }}>Bookme</strong> · <strong style={{ color: "var(--f-cream)" }}>Cube Films</strong>
              </p>
            </Anim>
          </div>
        </section>

        {/* ===== STORY ===== */}
        <section className="light">
          <div className="fp-wrap" style={{ padding: "clamp(64px, 9vw, 110px) 0" }}>
            <div className="story-cols" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "clamp(32px, 6vw, 72px)", alignItems: "center" }}>
              <div>
                <Anim><p className="kicker" style={{ color: "var(--f-orange-hot)" }}>Why listen to me</p></Anim>
                <Anim delay={60}>
                  <h2 className="display" style={{ margin: "20px 0 0", fontSize: "clamp(30px, 4.5vw, 52px)" }}>
                    I&apos;ve done the two jobs<br />a funnel actually is.
                  </h2>
                </Anim>
                <Anim delay={120}>
                  <p style={{ margin: "24px 0 0", fontSize: "16.5px", lineHeight: 1.7, color: "var(--f-mute-dark)" }}>
                    A funnel does two things: it <strong style={{ color: "var(--f-ink)" }}>catches attention</strong> and it <strong style={{ color: "var(--f-ink)" }}>closes</strong>. I spent years as a motion designer making 38+ explainer videos for SaaS companies — the catching-attention business. Then I went and sold smartphones face-to-face at Vivo Pakistan — the closing business.
                  </p>
                </Anim>
                <Anim delay={180}>
                  <p style={{ margin: "16px 0 0", fontSize: "16.5px", lineHeight: 1.7, color: "var(--f-mute-dark)" }}>
                    Most funnel people have only ever done one of those. Designers who never sold. Salespeople who can&apos;t build. I build the page, write the line, and know from the sales floor why someone hesitates at the button.
                  </p>
                </Anim>
              </div>
              <Anim delay={140}>
                <div style={{ display: "flex", flexDirection: "column", gap: "34px" }}>
                  <div className="tape-photo" style={{ transform: "rotate(-2.5deg)" }}>
                    <div style={{ width: "100%", aspectRatio: "4/3", position: "relative", overflow: "hidden" }}>
                      <Image src="/about/photo-1.jpg" alt="Presenting" fill sizes="(max-width: 760px) 90vw, 420px" style={{ objectFit: "cover", objectPosition: "center 25%" }} />
                    </div>
                    <span className="tape-cap">pitching — the catching-attention job</span>
                  </div>
                  <div className="tape-photo" style={{ transform: "rotate(1.8deg)" }}>
                    <div style={{ width: "100%", aspectRatio: "4/3", position: "relative", overflow: "hidden" }}>
                      <Image src="/about/photo-2.jpg" alt="At Vivo" fill sizes="(max-width: 760px) 90vw, 420px" style={{ objectFit: "cover" }} />
                    </div>
                    <span className="tape-cap">vivo sales floor — the closing job</span>
                  </div>
                </div>
              </Anim>
            </div>
          </div>
        </section>

        {/* ===== RECEIPTS ===== */}
        <section id="receipts">
          <div className="fp-wrap" style={{ padding: "clamp(64px, 9vw, 110px) 0" }}>
            <Anim><p className="kicker" style={{ color: "var(--f-orange)" }}>Receipts</p></Anim>
            <Anim delay={60}>
              <h2 className="display" style={{ margin: "20px 0 44px", fontSize: "clamp(32px, 5.5vw, 64px)" }}>
                Real things,<br />really shipped.
              </h2>
            </Anim>
            <div className="g3">
              {featured.map((project, i) => {
                const inner = (
                  <>
                    <div style={{ width: "100%", aspectRatio: "4/3", position: "relative", background: "var(--f-black-2)", overflow: "hidden" }}>
                      {project.image_url ? (
                        <Image src={project.image_url} alt={project.title} fill sizes="(max-width: 760px) 100vw, 330px" className="r-img" style={{ objectFit: "cover" }} />
                      ) : (
                        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "var(--f-mute)", fontStyle: "italic", fontSize: "13px" }}>{project.title}</div>
                      )}
                    </div>
                    <div style={{ padding: "20px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                        <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 800, letterSpacing: "-0.02em" }}>{project.title}</h3>
                        {project.project_url && <span style={{ color: "var(--f-orange)", fontWeight: 800 }}>↗</span>}
                      </div>
                      <p style={{ margin: "10px 0 14px", fontSize: "14px", lineHeight: 1.55, color: "var(--f-mute)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{project.description}</p>
                      <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--f-orange)", border: "1px solid oklch(0.66 0.19 40 / 0.4)", borderRadius: "999px", padding: "5px 12px" }}>{project.status}</span>
                    </div>
                  </>
                );
                return (
                  <Anim key={project.id} delay={i * 90}>
                    {project.project_url ? (
                      <a className="r-card" href={project.project_url} target="_blank" rel="noopener noreferrer">{inner}</a>
                    ) : (
                      <div className="r-card">{inner}</div>
                    )}
                  </Anim>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== SERVICES ===== */}
        <section className="light" id="services">
          <div className="fp-wrap" style={{ padding: "clamp(64px, 9vw, 110px) 0" }}>
            <Anim><p className="kicker" style={{ color: "var(--f-orange-hot)" }}>Ways in</p></Anim>
            <Anim delay={60}>
              <h2 className="display" style={{ margin: "20px 0 46px", fontSize: "clamp(32px, 5.5vw, 64px)" }}>
                Pick your depth.
              </h2>
            </Anim>
            <div className="g2">
              {[
                { tag: "Start here — free", t: "The Teardown", d: "Send me your link. I record a walkthrough of your funnel showing exactly where people bail and why — ranked by what's costing you most. Yours to keep, no call, no pitch.", cta: "Get my free teardown →", href: TEARDOWN_MAILTO, hero: true },
                { tag: "The fix", t: "Funnel Build", d: "Landing page, copy, and signup flow — rebuilt end to end. You bring the offer; I make the path from “curious” to “customer” frictionless. Built fast, with AI as the second pair of hands.", cta: "Rebuild my funnel →", href: TEARDOWN_MAILTO },
                { tag: "The partnership", t: "Growth Loop", d: "Ongoing: we test one thing at a time — headlines, buttons, onboarding steps — keep what converts, kill what doesn't. Compounding wins, monthly rhythm.", cta: "Let's talk growth →", href: TEARDOWN_MAILTO },
                { tag: "DIY — also free", t: "The Leak Checklist", d: "The exact 20-point checklist I run on every teardown. Run it on your own site tonight and fix the obvious leaks before you ever pay anyone.", cta: "Send me the checklist →", href: CHECKLIST_MAILTO },
              ].map((s, i) => (
                <Anim key={s.t} delay={i * 70}>
                  <div className={`s-card ${s.hero ? "hero-card" : ""}`} style={{ minHeight: "240px" }}>
                    <span className="s-tag">{s.tag}</span>
                    <h3 style={{ margin: 0, fontSize: "24px", fontWeight: 900, letterSpacing: "-0.025em" }}>{s.t}</h3>
                    <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.62, color: s.hero ? "var(--f-mute)" : "var(--f-mute-dark)" }}>{s.d}</p>
                    <a className="s-link" href={s.href}>{s.cta}</a>
                  </div>
                </Anim>
              ))}
            </div>
          </div>
        </section>

        {/* ===== YOUR MOVE ===== */}
        <section id="move" style={{ background: "var(--f-orange)", color: "var(--f-black)" }}>
          <div className="fp-wrap" style={{ padding: "clamp(72px, 11vw, 130px) 0", textAlign: "center" }}>
            <Anim>
              <h2 className="display" style={{ margin: 0, fontSize: "clamp(44px, 9vw, 110px)" }}>
                Your move.
              </h2>
            </Anim>
            <Anim delay={80}>
              <p style={{ margin: "22px auto 0", maxWidth: "480px", fontSize: "clamp(16px, 2.2vw, 19px)", fontWeight: 600, lineHeight: 1.55 }}>
                Send your link. Get a recorded teardown of exactly where your funnel leaks. Free — worst case, you walk away with a fix-it list.
              </p>
            </Anim>
            <Anim delay={150}>
              <div style={{ marginTop: "36px" }}>
                <a href={TEARDOWN_MAILTO} style={{
                  display: "inline-flex", alignItems: "center", gap: "12px",
                  background: "var(--f-black)", color: "var(--f-cream)",
                  fontWeight: 800, fontSize: "clamp(16px, 2vw, 19px)",
                  padding: "20px 40px", borderRadius: "999px", textDecoration: "none",
                  boxShadow: "0 18px 40px -12px oklch(0 0 0 / 0.45)",
                  transition: "transform .25s cubic-bezier(0.22,1,0.36,1)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px) scale(1.03)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}
                >
                  Tear my funnel apart
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M7 17 17 7"/><path d="M9 7h8v8"/></svg>
                </a>
              </div>
            </Anim>
            <Anim delay={210}>
              <p style={{ marginTop: "18px", fontSize: "13.5px", fontStyle: "italic", opacity: 0.75 }}>
                takes you 30 seconds. costs you nothing. might double your signups.
              </p>
            </Anim>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer style={{ borderTop: "1px solid oklch(1 0 0 / 0.1)" }}>
          <div className="fp-wrap" style={{ padding: "36px 0 56px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <span style={{ fontSize: "13px", color: "var(--f-mute)", fontFamily: "var(--font-geist-mono)" }}>© 2026 Ghulam Murtaza</span>
            <div style={{ display: "flex", gap: "20px", fontSize: "13.5px" }}>
              <a href={`mailto:${profile.email}`} style={{ color: "var(--f-mute)", textDecoration: "none" }}>Email</a>
              <a href={profile.social.linkedin ?? "#"} target="_blank" rel="noopener noreferrer" style={{ color: "var(--f-mute)", textDecoration: "none" }}>LinkedIn</a>
              <a href={profile.social.instagram ?? "#"} target="_blank" rel="noopener noreferrer" style={{ color: "var(--f-mute)", textDecoration: "none" }}>Instagram</a>
              <Link href="/" style={{ color: "var(--f-mute)", textDecoration: "none" }}>← calmer me</Link>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
