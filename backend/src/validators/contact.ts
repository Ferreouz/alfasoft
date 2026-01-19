import { Contact } from "@prisma/client";

export function validateContact(contact: Contact) {
  if (!contact.picture) {
    throw new Error("Picture is required");
  }

  if (contact.name.length <= 5) {
    throw new Error("Name must be longer than 5 characters");
  }

  if (!/^\d{9}$/.test(contact.contact)) {
    throw new Error("Contact must have 9 digits");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
    throw new Error("Invalid email address");
  }
}
