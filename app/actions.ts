"use server";

import { sendContactEnquiry } from "../lib/email";

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function submitContact(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return {
      status: "error",
      message: "Please fill in your name, email and a short message.",
    };
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValid) {
    return { status: "error", message: "That email doesn't look right." };
  }

  // Honeypot: real users never fill this hidden field.
  if (String(formData.get("company") ?? "").trim()) {
    return {
      status: "success",
      message: "Thank you! Your message has been received.",
    };
  }

  if (message.length > 5000) {
    return {
      status: "error",
      message: "Please keep your message under 5000 characters.",
    };
  }

  try {
    await sendContactEnquiry({ name, email, phone, city, message });
  } catch (err) {
    console.error("[contact-form] failed to send enquiry", err);
    return {
      status: "error",
      message:
        "Sorry, we couldn't send your message right now. Please try again or WhatsApp us at +92 329 7189 007.",
    };
  }

  return {
    status: "success",
    message:
      "Thank you! Your message has been received. Our team will get back to you within one business day.",
  };
}

export async function subscribeNewsletter(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValid) {
    return { status: "error", message: "Enter a valid email address." };
  }
  console.log("[newsletter] subscribe", email);
  return {
    status: "success",
    message: "You're in! Watch your inbox for fresh-from-the-coop updates.",
  };
}
