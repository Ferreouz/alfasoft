import type { Contact } from "@/types/Contact";

export default function validateContact(contact: Contact | Omit<Contact, 'id'>): {valid: boolean, message?: string} {
  if (!contact.picture) {
    return {valid: false, message: 'Picture is required'}

  }

  if (!contact.name || contact.name.length <= 5) {
    return {valid: false, message: 'Name must be longer than 5 characters'}
  }

  if (!/^\d{9}$/.test(contact.contact)) {
    return {valid: false, message: 'Contact must have exactly 9 digits'}
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
    return {valid: false, message: 'Invalid email address'}
  }
  return {valid: true};
}
