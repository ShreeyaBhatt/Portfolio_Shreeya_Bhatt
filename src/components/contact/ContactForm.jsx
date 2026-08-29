import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/Button.jsx";
import { site } from "../../data/site.js";
import { profile } from "../../data/profile.js";
import { cn } from "../../lib/cn.js";
import { easeSignature } from "../../lib/motion.js";

/**
 * "Submit a new experiment request" — the contact form as a lab intake slip.
 *
 * If `site.contactEndpoint` is set it POSTs there and reports the real result.
 * With no endpoint it drafts a pre-filled email and hands off to the visitor's
 * mail client — and says exactly that. Nothing here ever fakes a successful
 * send.
 */
const FIELDS = [
  { name: "name", label: "Name", type: "text", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "idea", label: "Mission / Project", type: "text", required: false, autoComplete: "off" },
  { name: "message", label: "Message", type: "textarea", required: true, autoComplete: "off" },
];

const EMAIL_RE = /^\S+@\S+\.\S+$/;

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", idea: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | mail | error
  const formRef = useRef(null);

  function setField(name, value) {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  }

  function validate() {
    const next = {};
    if (!values.name.trim()) next.name = "Required.";
    if (!values.email.trim()) next.email = "Required.";
    else if (!EMAIL_RE.test(values.email.trim())) next.email = "That doesn't look like an email.";
    if (!values.message.trim()) next.message = "Tell me a little about it.";
    return next;
  }

  async function onSubmit(event) {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = FIELDS.find((f) => found[f.name]);
      formRef.current?.querySelector(`[name="${first.name}"]`)?.focus();
      return;
    }

    if (site.contactEndpoint) {
      setStatus("sending");
      try {
        const res = await fetch(site.contactEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(values),
        });
        setStatus(res.ok ? "sent" : "error");
      } catch {
        setStatus("error");
      }
      return;
    }

    // No endpoint — draft an email and hand off.
    const subject = encodeURIComponent(`Experiment request — ${values.name}`);
    const body = encodeURIComponent(
      `From: ${values.name} <${values.email}>\n` +
        `Idea: ${values.idea || "—"}\n\n${values.message}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("mail");
  }

  const done = status === "sent" || status === "mail" || status === "error";

  return (
    <div className="hud min-w-0 p-6 sm:p-8">
      <p className="coord text-[var(--color-accent)]">TRANSMIT · NEW SIGNAL</p>

      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="result"
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: easeSignature }}
            className="mt-6"
          >
            {status === "sent" && (
              <>
                <p className="text-h3 font-bold">Transmission complete.</p>
                <p className="label-mono mt-3 text-[var(--color-accent)]">Status → transmitted</p>
                <p className="mt-4 text-sm text-[var(--color-fg-muted)]">
                  Thanks — I'll get back to you at {values.email}.
                </p>
              </>
            )}
            {status === "mail" && (
              <>
                <p className="text-h3 font-bold">Signal drafted.</p>
                <p className="label-mono mt-3 text-[var(--color-accent)]">
                  Status → handed to your mail client
                </p>
                <p className="mt-4 text-sm text-[var(--color-fg-muted)]">
                  Your email app should have opened with everything filled in. If it didn't,
                  send it straight to{" "}
                  <a
                    href={`mailto:${profile.email}`}
                    data-cursor="contact"
                    className="link-underline text-[var(--color-fg)]"
                  >
                    {profile.email}
                  </a>
                  .
                </p>
              </>
            )}
            {status === "error" && (
              <>
                <p className="text-h3 font-bold">Transmission failed.</p>
                <p className="label-mono mt-3 text-[var(--color-danger)]">Status → error</p>
                <p className="mt-4 text-sm text-[var(--color-fg-muted)]">
                  Something went wrong sending that. Email me directly at{" "}
                  <a
                    href={`mailto:${profile.email}`}
                    data-cursor="contact"
                    className="link-underline text-[var(--color-fg)]"
                  >
                    {profile.email}
                  </a>
                  .
                </p>
              </>
            )}
            <button
              type="button"
              data-cursor-hover
              onClick={() => setStatus("idle")}
              className="label-mono mt-6 text-[var(--color-fg-subtle)] underline-offset-4 hover:text-[var(--color-fg)] hover:underline"
            >
              Send another signal
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-6 space-y-5"
          >
            {FIELDS.map((field) => {
              const err = errors[field.name];
              const common = {
                id: `cf-${field.name}`,
                name: field.name,
                value: values[field.name],
                required: field.required,
                autoComplete: field.autoComplete,
                "aria-invalid": err ? "true" : undefined,
                "aria-describedby": err ? `cf-${field.name}-err` : undefined,
                onChange: (e) => setField(field.name, e.target.value),
                className: cn(
                  "mt-2 w-full rounded-[var(--radius-sm)] border bg-[var(--color-bg)] px-3.5 py-2.5",
                  "font-mono text-sm text-[var(--color-fg)] outline-none transition-colors",
                  "placeholder:text-[var(--color-fg-subtle)] focus-visible:border-[var(--color-accent)]",
                  err ? "border-[var(--color-danger)]" : "border-[var(--color-border-strong)]"
                ),
              };
              return (
                <div key={field.name}>
                  <label
                    htmlFor={`cf-${field.name}`}
                    className="label-mono flex items-center gap-2 text-[var(--color-fg-subtle)]"
                  >
                    {field.label}
                    {field.required && <span className="text-[var(--color-accent)]">*</span>}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea rows={4} {...common} />
                  ) : (
                    <input type={field.type} {...common} />
                  )}
                  {err && (
                    <p
                      id={`cf-${field.name}-err`}
                      className="mt-1.5 font-mono text-xs text-[var(--color-danger)]"
                    >
                      {err}
                    </p>
                  )}
                </div>
              );
            })}

            <Button type="submit" variant="primary" disabled={status === "sending"}>
              {status === "sending" ? "Transmitting…" : "Transmit message →"}
            </Button>
            {!site.contactEndpoint && (
              <p className="font-mono text-[0.7rem] text-[var(--color-fg-subtle)]">
                Opens a pre-filled email in your mail client.
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
