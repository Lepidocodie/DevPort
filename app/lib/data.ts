/**
 * Data access layer for the DevPort portfolio.
 * Encapsulates data retrieval, filtering, and path normalization using OOP principles.
 */

import rawData from "@/public/data/data.json";
import type { Project, Certificate, SkillCategory } from "./types";

const DEFAULT_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAYey_5MbtnWRUzasKHUA_qDW9IrdWU3mPnU_ySeHQP89WX0CxFRmar9fxGKz5TgjOhtyt0FcfO1wUiaEUVPPFibhlNk5RS7gxVmv2Ny5qY4Xqth93P07qFLbQEKzjhU9xX4LodikXGj-NBJS4bqLzeFFEdYnP3lo1TwfDEJsVMvBqtS6ertafQJg3uH1gKHVsULyKD8Ztto6D66sfk5r8bduyDPsCBPUEyFHbR4gYeJp2KdI0_KPyLHYE6i5hy9GtYLFvHLreJYMcE";

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    icon: "🎨",
    title: "Front-end",
    accent: "cyan",
    size: "large",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vue", "Nuxt.js", "TailwindCSS", "Bootstrap"],
  },
  {
    icon: "⚙️",
    title: "Back-end",
    accent: "magenta",
    size: "large",
    skills: ["Node.js", "Python", "RESTful API", "Web Authentication", "JWT", "Passport.js"],
  },
  {
    icon: "🗄️",
    title: "Database",
    accent: "cyan",
    size: "compact",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "TypeORM", "ODM", "Database Design", "ER Diagram"],
  },
  {
    icon: "☁️",
    title: "DevOps & Cloud",
    accent: "magenta",
    size: "compact",
    skills: ["Docker", "Kubernetes", "Google Cloud", "AWS EC2", "Nginx", "GitHub Actions CI/CD"],
  },
  {
    icon: "🧪",
    title: "Testing & QA",
    accent: "cyan",
    size: "compact",
    skills: ["Unit Testing", "Integration Testing", "Performance Testing", "Selenium", "Supertest", "SonarQube"],
  },
  {
    icon: "🛠️",
    title: "Tools",
    accent: "magenta",
    size: "compact",
    skills: ["GitHub", "GitHub Desktop", "VSCode", "Vite", "Postman", "Figma"],
  },
  {
    icon: "🔒",
    title: "Security",
    accent: "cyan",
    size: "compact",
    skills: ["OWASP Top 10"],
  },
];

export class PortfolioRepository {
  private data: any;

  constructor(data: any) {
    this.data = data;
  }

  public getProjects(): Project[] {
    return this.data.project as Project[];
  }

  public getMiniProjects(): Project[] {
    return this.data.miniproject as Project[];
  }

  public getProjectById(id: string): Project | null {
    const all = [...this.getProjects(), ...this.getMiniProjects()];
    return all.find((p) => String(p.id) === String(id)) ?? null;
  }

  public getCertificates(): Certificate[] {
    return this.data.certificate as Certificate[];
  }

  /**
   * Extracts all unique tags from certificates, sorted alphabetically.
   * Returns ["All", ...tags].
   */
  public getCertificateTags(): string[] {
    const tags = new Set<string>();
    this.getCertificates().forEach((cert) => {
      if (Array.isArray(cert.tag)) {
        cert.tag.forEach((t) => tags.add(t));
      }
    });
    return ["All", ...Array.from(tags).sort()];
  }

  /**
   * Filters certificates by tag. Returns all if tag is "All".
   */
  public filterCertificates(tag: string): Certificate[] {
    const certs = this.getCertificates();
    if (tag === "All") return certs;
    return certs.filter((c) => Array.isArray(c.tag) && c.tag.includes(tag));
  }
}

/**
 * Image normalization utility encapsulated.
 */
export class ImageNormalizer {
  public static normalizeImagePath(raw?: string): string {
    if (!raw) return DEFAULT_IMAGE;
    const cleaned = raw.replace("my-portfolio/", "");
    return cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
  }

  public static normalizeImageArray(images: string[], cover?: string): string[] {
    if (images && images.length > 0) {
      return images.map((img) => this.normalizeImagePath(img));
    }
    if (cover) return [this.normalizeImagePath(cover)];
    return ["/placeholder.jpg"];
  }
}

// Singleton instance
export const portfolioData = new PortfolioRepository(rawData);
