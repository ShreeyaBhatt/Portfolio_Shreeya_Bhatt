import { projects } from "../../data/projects.js";
import { experience } from "../../data/experience.js";
import { toolboxGroups } from "../../data/skills.js";
import { certifications } from "../../data/certifications.js";
import { timeline } from "../../data/timeline.js";
import { profile } from "../../data/profile.js";

/**
 * The Mission Core's waypoints — every satellite in orbit is a destination on
 * this site, and its readout is built only from the site's own data, so it
 * stays current as the data files change.
 *
 * @typedef {Object} Waypoint
 * @property {string} id
 * @property {string} code     short all-caps channel name
 * @property {string} to       route (+ optional #section)
 * @property {string} status   one-word telemetry state
 * @property {string} title    the headline fact
 * @property {string} detail   one supporting line
 * @property {string} cta
 */

const featured = projects.find((p) => p.featured) ?? projects[0];
const role = experience.find((e) => e.current) ?? experience[0];
const years = timeline.map((t) => parseInt(t.year, 10)).filter(Boolean);
const pad = (n) => String(n).padStart(2, "0");

/** @type {Waypoint[]} */
export const waypoints = [
  {
    id: "missions",
    code: "MISSIONS",
    to: "/projects",
    status: `${pad(projects.length)} LOGGED`,
    title: `${projects.length} projects shipped`,
    detail: `Flagship: ${featured.title} · ${featured.system}`,
    cta: "Open mission control",
  },
  role && {
    id: "experience",
    code: "SERVICE",
    to: "/about#experience",
    status: role.current ? "ACTIVE" : "LOGGED",
    title: `${role.role} · ${role.company}`,
    detail: `${role.type} · ${role.period}`,
    cta: "Open service record",
  },
  {
    id: "systems",
    code: "SYSTEMS",
    to: "/about#skills",
    status: `${pad(toolboxGroups.length)} ONLINE`,
    title: `${toolboxGroups.length} connected systems`,
    detail: `${toolboxGroups[0].label} at the core · ${toolboxGroups
      .slice(1, 4)
      .map((g) => g.label)
      .join(" · ")}`,
    cta: "Open systems map",
  },
  {
    id: "credentials",
    code: "CREDENTIALS",
    to: "/about#credentials",
    status: `${pad(certifications.length)} VERIFIED`,
    title: `${certifications.length} certifications`,
    detail: `Latest: ${certifications[0].title} · ${certifications[0].issuer}`,
    cta: "Open credentials",
  },
  {
    id: "log",
    code: "LOG",
    to: "/about#log",
    status: "TIMELINE",
    title: `${Math.min(...years)} → now`,
    detail: timeline.map((t) => t.title).join(" · "),
    cta: "Open mission log",
  },
  {
    id: "channel",
    code: "CHANNEL",
    to: "/contact",
    status: "OPEN",
    title: "Open a channel",
    detail: `Email · LinkedIn · GitHub · ${profile.location}`,
    cta: "Make contact",
  },
].filter(Boolean);
