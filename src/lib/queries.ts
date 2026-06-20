import { supabase } from "./supabase";
import {
  profile as staticProfile,
  experience as staticExperience,
  education as staticEducation,
  certifications as staticCertifications,
  skills as staticSkills,
  projects as staticProjects,
  blogPosts as staticBlogPosts,
} from "./data";
import type { Profile, Experience, Education, Certification, Skill, SkillsByCategory, Project, BlogPost } from "./types";

export async function getProfile(): Promise<Profile> {
  try {
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("id", "main")
      .single();
    if (error || !data) throw error;
    return data as Profile;
  } catch {
    return {
      id: "main",
      name: staticProfile.name,
      headline: staticProfile.headline,
      tagline: staticProfile.tagline,
      about: staticProfile.about,
      email: staticProfile.email,
      location: staticProfile.location,
      phone: staticProfile.phone,
      avatar_url: "/avatar.png",
      social: staticProfile.social,
    };
  }
}

export async function getExperience(): Promise<Experience[]> {
  try {
    const { data, error } = await supabase
      .from("experience")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error || !data?.length) throw error;
    return data as Experience[];
  } catch {
    return staticExperience.map((e, i) => ({ ...e, sort_order: i }));
  }
}

export async function getEducation(): Promise<Education[]> {
  try {
    const { data, error } = await supabase
      .from("education")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error || !data?.length) throw error;
    return data as Education[];
  } catch {
    return staticEducation.map((e, i) => ({ ...e, sort_order: i }));
  }
}

export async function getCertifications(): Promise<Certification[]> {
  try {
    const { data, error } = await supabase
      .from("certifications")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error || !data?.length) throw error;
    return data as Certification[];
  } catch {
    return staticCertifications.map((e, i) => ({ ...e, sort_order: i }));
  }
}

export async function getSkills(): Promise<SkillsByCategory> {
  try {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error || !data?.length) throw error;

    const grouped: SkillsByCategory = { business: [], design: [], technology: [], tools: [] };
    for (const skill of data as Skill[]) {
      if (grouped[skill.category]) {
        grouped[skill.category].push(skill.name);
      }
    }
    return grouped;
  } catch {
    return staticSkills;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error || !data?.length) throw error;
    return data as Project[];
  } catch {
    return staticProjects.map((p, i) => ({ ...p, category: p.category as Project["category"], image_url: null, sort_order: i }));
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false });
    if (error || !data?.length) throw error;
    return data as BlogPost[];
  } catch {
    return staticBlogPosts.map((p) => ({
      ...p,
      read_time: p.readTime,
      published_at: p.date,
      is_published: true,
    }));
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .single();
    if (error || !data) throw error;
    return data as BlogPost;
  } catch {
    const post = staticBlogPosts.find((p) => p.slug === slug);
    if (!post) return null;
    return {
      ...post,
      read_time: post.readTime,
      published_at: post.date,
      is_published: true,
    };
  }
}
