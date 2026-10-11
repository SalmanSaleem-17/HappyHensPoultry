"use server";

import { sendContactEnquiry } from "../lib/email";
import {
  PAYMENT_METHODS,
  PRODUCTS,
  todayInPakistan,
  type PaymentMethod,
  type Product,
} from "../lib/order";

export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const field = (formData: FormData, key: string) =>
  String(formData.get(key) ?? "").trim();

export async function submitContact(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  // Honeypot: real users never fill this hidden field.
  if (field(formData, "company")) {
    return {
      status: "success",
      message: "Thank you! Your order request has been received.",
    };
  }

  const name = field(formData, "name");
  const phone = field(formData, "phone");
  const email = field(formData, "email");
  const city = field(formData, "city");
  const address = field(formData, "address");
  const product = field(formData, "product");
  const deliveryDate = field(formData, "deliveryDate");
  const notes = field(formData, "notes");
  const payment = field(formData, "payment");

  if (!name || !phone || !email || !city || !address) {
    return {
      status: "error",
      message:
        "Please fill in your name, telephone, email, city and delivery address.",
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "That email doesn't look right." };
  }

  if (phone.replace(/\D/g, "").length < 7) {
    return { status: "error", message: "Please enter a valid telephone number." };
  }

  if (!(PRODUCTS as readonly string[]).includes(product)) {
    return { status: "error", message: "Please choose a product pack." };
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(deliveryDate)) {
    return { status: "error", message: "Please choose a delivery date." };
  }
  if (deliveryDate < todayInPakistan()) {
    return {
      status: "error",
      message: "The delivery date can't be in the past. Please pick today or a later date.",
    };
  }

  if (!(PAYMENT_METHODS as readonly string[]).includes(payment)) {
    return { status: "error", message: "Please choose a payment method." };
  }

  if (address.length > 1000 || notes.length > 3000) {
    return {
      status: "error",
      message: "Your address or notes are too long. Please shorten them.",
    };
  }

  try {
    await sendContactEnquiry({
      name,
      phone,
      email,
      city,
      address,
      product: product as Product,
      deliveryDate,
      notes,
      payment: payment as PaymentMethod,
    });
  } catch (err) {
    console.error("[contact-form] failed to send enquiry", err);
    return {
      status: "error",
      message:
        "Sorry, we couldn't send your order right now. Please try again or WhatsApp us at +92 329 7189 007.",
    };
  }

  return {
    status: "success",
    message:
      "Thank you! Your order request has been received. We'll confirm pricing and your delivery slot within one business day.",
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
