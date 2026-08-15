"use client";

import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { projects as staticProjects } from "@/lib/data";
import { getProjects } from "@/lib/queries";
import type { Project } from "@/lib/types";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

function Clock() {
  const [time, setTime] = useState("—:—");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const pk = new Date(utc + 5 * 3600000);
      setTime(`${pk.getHours()}:${String(pk.getMinutes()).padStart(2, "0")}`);
    };
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);
  return <span>{time}</span>;
}

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

const categories = ["all", "product", "development", "animation", "design"] as const;
type Category = (typeof categories)[number];
const categoryLabels: Record<Category, string> = {
  all: "All", product: "Product", development: "Development", animation: "Animation", design: "Design",
};

export default function CreativePage() {
  const [projects, setProjects] = useState<Project[]>(
    staticProjects.map((p, i) => ({ ...p, category: p.category as Project["category"], image_url: null, project_url: null, sort_order: i }))
  );
  const [active, setActive] = useState<Category>("all");

  useEffect(() => { getProjects().then(setProjects); }, []);

  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);
  const showFilters = projects.length >= 6;

  return (
    <>
      <style>{`
        .creative-page {
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
          min-height: 100vh;
        }
        .anim {
          opacity: 0; transform: translateY(14px);
          transition: opacity .6s var(--ease), transform .6s var(--ease);
        }
        .anim.in { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) {
          .anim { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
        .creative-label { margin: 0 0 10px; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: .1em; color: var(--ink); }
        .creative-cue { margin: 0; font-size: 13px; font-style: italic; color: var(--ink-4); }
        .cat-pill {
          font-size: 13px; padding: 7px 14px; border-radius: 999px;
          border: 1px solid var(--line); background: var(--bg); color: var(--ink-3);
          cursor: pointer; transition: all .2s var(--ease);
          font-family: inherit;
        }
        .cat-pill:hover { color: var(--ink); border-color: var(--ink-4); }
        .cat-pill.active { background: var(--ink); color: var(--bg); border-color: var(--ink); }
        .card-desc {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card:hover .card-img { transform: scale(1.02); }
        .card-img { transition: transform .5s var(--ease); }
        a:hover .card-arrow { color: var(--ink); transform: translate(2px, -2px); }
        .grid-wrap {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 28px;
        }
        @media (max-width: 520px) {
          .grid-wrap { grid-template-columns: 1fr; gap: 24px; }
        }
      `}</style>

      <div className={`creative-page ${inter.className}`}>
        <div style={{ maxWidth: "700px", margin: "0 auto", paddingInline: "clamp(20px, 5vw, 36px)" }}>

          {/* Status bar */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            paddingTop: "26px", fontSize: "12.5px", textTransform: "uppercase",
            letterSpacing: "0.08em", color: "var(--ink-4)",
          }}>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "7px", color: "var(--ink-4)", textDecoration: "underline", textUnderlineOffset: "3px", fontFamily: "var(--font-geist-mono)" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M15 18 9 12l6-6"/>
              </svg>
              Back to site
            </Link>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontFamily: "var(--font-geist-mono)" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
              </svg>
              <Clock /> GMT+5
            </span>
          </div>

          {/* Header */}
          <header style={{ padding: "clamp(52px, 10vw, 88px) 0 clamp(28px, 5vw, 40px)" }}>
            <Anim>
              <h1 style={{
                margin: 0, fontWeight: 700,
                fontSize: "clamp(40px, 7vw, 64px)",
                letterSpacing: "-0.03em", lineHeight: 1,
              }}>Creative Work</h1>
            </Anim>
            <Anim delay={60}>
              <p style={{ margin: "18px 0 0", maxWidth: "460px", fontSize: "17px", color: "var(--ink-2)", lineHeight: 1.6 }}>
                Motion, product, and design work — from freelance explainers to shipped apps.
              </p>
            </Anim>
            <Anim delay={100}>
              <p className="creative-cue" style={{ marginTop: "10px" }}>things I&apos;ve shipped, sketched, or animated</p>
            </Anim>
          </header>

          {/* Filter tabs */}
          {showFilters && (
            <div style={{ borderTop: "1px dashed var(--line)", padding: "28px 0 20px" }}>
              <Anim>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActive(cat)}
                      className={`cat-pill ${active === cat ? "active" : ""}`}
                    >
                      {categoryLabels[cat]}
                    </button>
                  ))}
                </div>
              </Anim>
            </div>
          )}

          {/* Grid */}
          <section style={{ padding: "clamp(24px, 5vw, 40px) 0 clamp(40px, 7vw, 60px)", borderTop: showFilters ? "none" : "1px dashed var(--line)" }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ink-4)", fontSize: "14px", fontStyle: "italic" }}>
                No projects in this category yet.
              </div>
            ) : (
              <div className="grid-wrap">
                {filtered.map((project, i) => {
                  const inner = (
                    <div className="card">
                      <div style={{
                        width: "100%", aspectRatio: "1",
                        borderRadius: "14px", overflow: "hidden",
                        border: "1px solid var(--line-soft)",
                        background: "var(--surface)",
                        position: "relative",
                      }}>
                        {project.image_url ? (
                          <Image
                            src={project.image_url}
                            alt={project.title}
                            fill
                            sizes="(max-width: 520px) 100vw, 400px"
                            className="card-img"
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <div style={{
                            position: "absolute", inset: 0,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "var(--ink-4)", fontSize: "13px", fontStyle: "italic",
                          }}>
                            {project.title}
                          </div>
                        )}
                      </div>
                      <div style={{ marginTop: "16px" }}>
                        <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 600, letterSpacing: "-0.02em", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                          {project.title}
                          {project.project_url && (
                            <span className="card-arrow" style={{ display: "inline-block", color: "var(--ink-4)", transition: "transform .3s var(--ease), color .3s" }}>↗</span>
                          )}
                        </h3>
                        <p style={{
                          margin: "6px 0 0", fontSize: "12.5px",
                          textTransform: "uppercase", letterSpacing: "0.06em",
                          color: "var(--ink-4)", fontFamily: "var(--font-geist-mono)",
                        }}>
                          {project.category} · {project.year}
                        </p>
                        <p className="card-desc" style={{ margin: "10px 0 0", fontSize: "14.5px", color: "var(--ink-3)", lineHeight: 1.55 }}>
                          {project.description}
                        </p>
                      </div>
                    </div>
                  );
                  return (
                    <Anim key={project.id} delay={i * 40}>
                      {project.project_url ? (
                        <a href={project.project_url} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none", display: "block" }}>
                          {inner}
                        </a>
                      ) : inner}
                    </Anim>
                  );
                })}
              </div>
            )}
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
          </footer>

        </div>
      </div>
    </>
  );
}
