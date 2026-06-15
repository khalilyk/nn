/** The full editable site content tree. One JSON document, edited in /admin. */

export type ImageRef = string;

export interface Hero {
  verticalLabel: string;
  titleLines: string[];
  spotsLeftBadge: string;
  supportingCopy: string;
}

export interface Course {
  course: string;
  title: string;
  intro?: string[];
  items: string[];
}
export interface Swatch { bg: string; fg: string; }
export interface Menu {
  eyebrow: string;
  heading: string;
  courses: Course[];
  palette: Swatch[];
}

export interface Project {
  name: string;
  sub: string;
  city: string;
  year: string;
  cat: string;
  desc: string;
  img: ImageRef;
}

export interface About {
  eyebrow: string;
  founderName: string;
  paragraphs: string[];
  image: ImageRef;
  thoughtBubble: string;
}

export interface Testimonial {
  q: string;
  name: string;
  venue: string;
  color: string;
}

interface NoteBase {
  cat: string;
  date: string;
  title: string;
  read: string;
  excerpt?: string;
  body?: string;
  bg: string;
  ink: string;
  rotate: string;
}
export type Note =
  | (NoteBase & { variant: "split"; top: string; bottom: string; img: ImageRef })
  | (NoteBase & { variant: "type"; eyebrow: string; lines: string[]; footer: string })
  | (NoteBase & { variant: "blah"; word: string; rows: number; line: string; img: ImageRef });
export interface Notes {
  eyebrow: string;
  heading: string;
  posts: Note[];
}

export interface Contact {
  heading: string;
  intro: string;
  detailEyebrow: string;
  detailHeading: string;
  detailBody: string[];
  email: string;
  phone: string;
  formEyebrow: string;
  formHeading: string;
  coffeeOptions: string[];
}

export interface NavLink {
  l: string;
  href: string;
  tip: string;
  shape?: string;
}

export interface LegalDoc {
  title: string;
  body: string[];
}
export interface Footer {
  email: string;
  phone: string;
  socials: { label: string; href: string }[];
  locations: string;
  landAck: string;
  trademark: string;
  legal: { privacy: LegalDoc; terms: LegalDoc };
}

export interface SiteContent {
  hero: Hero;
  menu: Menu;
  about: About;
  projects: Project[];
  testimonials: Testimonial[];
  notes: Notes;
  contact: Contact;
  nav: NavLink[];
  footer: Footer;
}
