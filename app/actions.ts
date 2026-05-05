"use server";

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

  console.log("[contact-form] new enquiry", {
    name,
    email,
    phone,
    city,
    message,
  });

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
