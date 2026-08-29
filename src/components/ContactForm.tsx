"use client";

import { useState, type FormEvent } from "react";
import {
  FormField,
  TextInput,
  TextArea,
  Button,
} from "@/components/ui";

/**
 * ContactForm — client-only form. Lives in its own file so the parent
 * /contact route can stay a React Server Component and export
 * `metadata` (per Next.js App Router rules: client components can't
 * export metadata).
 *
 * On submit the form opens the user's mail client with a pre-filled
 * mailto: URL. Nothing is captured, stored, or sent to a server.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = [
      `From: ${name} <${email}>`,
      ``,
      message,
      ``,
      `— — —`,
      `Sent from the MyNoosaHeads contact form.`,
      `This form does not store any data. It opens your email client.`,
    ].join("\n");
    const mailto = `mailto:hello@mynoosaheads.com?subject=${encodeURIComponent(
      subject || "MyNoosaHeads contact"
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-5 max-w-2xl"
      aria-describedby="form-help"
    >
      <p id="form-help" className="callout">
        <strong>Privacy note.</strong> This form does not store any data.
        When you submit, your email client opens with the message
        pre-filled; you decide whether to send it. If you prefer, email{" "}
        <a href="mailto:hello@mynoosaheads.com" className="link text-ocean-700">
          hello@mynoosaheads.com
        </a>{" "}
        directly.
      </p>
      <FormField id="contact-name" label="Your name" required>
        {(props) => (
          <TextInput
            {...props}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
        )}
      </FormField>
      <FormField id="contact-email" label="Email address" required>
        {(props) => (
          <TextInput
            {...props}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        )}
      </FormField>
      <FormField id="contact-subject" label="Subject">
        {(props) => (
          <TextInput
            {...props}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        )}
      </FormField>
      <FormField id="contact-message" label="Message" required>
        {(props) => (
          <TextArea
            {...props}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            required
          />
        )}
      </FormField>
      <div className="pt-2">
        <Button type="submit" size="lg">
          Open email client
        </Button>
      </div>
    </form>
  );
}