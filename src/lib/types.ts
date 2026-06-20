export interface Profile {
  id: string;
  name: string;
  headline: string;
  tagline: string;
  about: string[];
  email: string;
  location: string;
  phone: string;
  avatar_url: string | null;
  social: { linkedin?: string; instagram?: string };
  updated_at?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
  sort_order: number;
  created_at?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  description: string;
  sort_order: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  sort_order: number;
}

export interface Skill {
  id: number;
  name: string;
  category: "business" | "design" | "technology" | "tools";
  sort_order: number;
}

export interface SkillsByCategory {
  business: string[];
  design: string[];
  technology: string[];
  tools: string[];
}

export interface Project {
  id: string;
  title: string;
  category: "product" | "development" | "animation" | "design";
  description: string;
  tags: string[];
  status: string;
  year: string;
  image_url: string | null;
  sort_order: number;
  created_at?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  read_time: string;
  published_at: string | null;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}
