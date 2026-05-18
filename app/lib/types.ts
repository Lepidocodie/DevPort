/**
 * Shared TypeScript interfaces for the DevPort portfolio.
 * Single source of truth for all data shapes consumed by components.
 */

export interface Project {
  id: string;
  name: string;
  description: string;
  tag: string[];
  link: string;
  github: string;
  cover: string;
  image: string[];
  features: string[];
  role: string;
  year: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuingOrganization: string;
  credentialID: string;
  description: string;
  year: string;
  cover: string;
  tag: string[];
  image: string[];
  link: string;
}

export interface SkillCategory {
  icon: string;
  title: string;
  accent: "cyan" | "magenta";
  skills: string[];
  /** Optional size hint for layout variation */
  size?: "large" | "compact";
}
