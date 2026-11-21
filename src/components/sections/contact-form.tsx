"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolio } from "@/data/portfolio";

type FieldName = "fullName" | "email" | "subject" | "message";
type FormErrors = Partial<Record<FieldName, string>>;

const inputStyles =
  "mt-2 min-h-12 w-full rounded-xl border border-border bg-background/70 px-4 py-3 text-sm text-foreground outline-none transition-[border-color,box-shadow,background-color] placeholder:text-slate-500 focus:border-purple/70 focus:bg-background focus:ring-4 focus:ring-purple/10 aria-[invalid=true]:border-rose-400/70 aria-[invalid=true]:focus:ring-rose-400/10";

export function ContactForm() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = {
      fullName: String(formData.get("fullName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      subject: String(formData.get("subject") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };
    const nextErrors: FormErrors = {};

    if (!values.fullName) nextErrors.fullName = "Please enter your name.";
    if (!values.email) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!values.subject) nextErrors.subject = "Please add a subject.";
    if (!values.message) nextErrors.message = "Please write a message.";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFeedback({ type: "error", message: "Please check the highlighted fields." });
      return;
    }

    const mailto = new URL(`mailto:${portfolio.email}`);
    mailto.searchParams.set("subject", values.subject);
    mailto.searchParams.set(
      "body",
      `Name: ${values.fullName}\nReply email: ${values.email}\n\n${values.message}`,
    );
    setFeedback({
      type: "success",
      message: "Opening your email app with this message. The website does not send or store it.",
    });
    window.location.href = mailto.toString();
  }

  function clearFeedback(field: FieldName) {
    setErrors((current) => ({ ...current, [field]: undefined }));
    setFeedback(null);
  }

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit}>
      {feedback ? (
        <p
          id="contact-feedback"
          role={feedback.type === "error" ? "alert" : "status"}
          aria-live={feedback.type === "error" ? "assertive" : "polite"}
          className={`mb-0 rounded-xl border px-4 py-3 text-sm leading-6 ${
            feedback.type === "error"
              ? "border-rose-400/25 bg-rose-400/[0.07] text-rose-200"
              : "border-emerald-400/25 bg-emerald-400/[0.07] text-emerald-200"
          }`}
        >
          {feedback.message}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-full-name" className="text-sm font-medium text-slate-200">
            Full Name <span className="text-purple" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-full-name"
            name="fullName"
            type="text"
            autoComplete="name"
            maxLength={100}
            required
            placeholder="Your name"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "contact-full-name-error" : undefined}
            className={inputStyles}
            onChange={() => clearFeedback("fullName")}
          />
          {errors.fullName ? <p id="contact-full-name-error" className="mb-0 mt-2 text-sm text-rose-300">{errors.fullName}</p> : null}
        </div>

        <div>
          <label htmlFor="contact-email" className="text-sm font-medium text-slate-200">
            Email Address <span className="text-purple" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={inputStyles}
            onChange={() => clearFeedback("email")}
          />
          {errors.email ? <p id="contact-email-error" className="mb-0 mt-2 text-sm text-rose-300">{errors.email}</p> : null}
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="text-sm font-medium text-slate-200">
          Subject <span className="text-purple" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          maxLength={160}
          required
          placeholder="What would you like to discuss?"
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
          className={inputStyles}
          onChange={() => clearFeedback("subject")}
        />
        {errors.subject ? <p id="contact-subject-error" className="mb-0 mt-2 text-sm text-rose-300">{errors.subject}</p> : null}
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm font-medium text-slate-200">
          Message <span className="text-purple" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={3000}
          required
          placeholder="Tell me a little about it..."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={`${inputStyles} min-h-36 resize-y leading-6`}
          onChange={() => clearFeedback("message")}
        />
        {errors.message ? <p id="contact-message-error" className="mb-0 mt-2 text-sm text-rose-300">{errors.message}</p> : null}
      </div>

      <div className="flex flex-col items-start gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="mb-0 max-w-sm text-xs leading-5 text-secondary">
          Submitting opens your email app. This website does not send or store messages.
        </p>
        <Button type="submit" className="group w-full sm:w-auto">
          Open Email App <Send size={15} aria-hidden="true" />
          <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Button>
      </div>
    </form>
  );
}
