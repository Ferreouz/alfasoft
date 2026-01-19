import { Prisma } from "@prisma/client";

type CreateContactInput = Prisma.ContactCreateInput;
type UpdateContactInput = Prisma.ContactUpdateInput;
type ValidationResult = { valid: true } | { valid: false; message: string };

function validateContactFormats(contact: {
  name?: string;
  contact?: string;
  email?: string;
}): ValidationResult {

  if (contact.name && contact.name.length <= 5) {
    return { valid: false, message: "Name must be longer than 5 characters" };
  }

  if (contact.contact && !/^\d{9}$/.test(contact.contact)) {
    return { valid: false, message: "Contact must have 9 digits" };
  }

  if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
    return { valid: false, message: "Invalid email address" };
  }

  return { valid: true };
}

export function validateNewContact(contact: CreateContactInput): ValidationResult {
  if (!contact.picture) return { valid: false, message: "Picture is required" };
  if (!contact.name) return { valid: false, message: "Name is required" };
  if (!contact.contact) return { valid: false, message: "Contact field is required" };
  if (!contact.email) return { valid: false, message: "Email field is required" };

  return validateContactFormats(contact);
}

export function validateContactUpdate(contact: UpdateContactInput): ValidationResult {
  return validateContactFormats(contact);
}
