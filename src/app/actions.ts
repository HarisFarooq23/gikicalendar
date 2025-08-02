"use server";

import { z } from "zod";

const emailSchema = z.string().email({ message: "Invalid email address." });

export async function subscribeToNewsletter(email: string) {
  const validation = emailSchema.safeParse(email);

  if (!validation.success) {
    return {
      success: false,
      message: validation.error.errors[0].message,
    };
  }

  try {
    // In a real application, you would save the email to your database (e.g., Firebase Firestore).
    // For this example, we'll just simulate a successful operation.
    console.log(`Subscribing email: ${validation.data}`);
    
    // Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      message: "Thank you for subscribing!",
    };
  } catch (error) {
    console.error("Subscription failed:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
