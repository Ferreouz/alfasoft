import type { Contact } from "@/types/Contact";
import isValidImageUrl from "./isValidImageUrl"

type ContactErrors = Partial<Record<keyof Omit<Contact, 'id'>, string>>

export default async function validateContact(
  contact: Contact | Omit<Contact, 'id'>
): Promise<{
  valid: boolean
  message?: string
  errors: ContactErrors
}> {
  const errors: ContactErrors = {}

  if (!contact.picture) {
    errors.picture = 'Picture is required'
  } else {
    const isImage = await isValidImageUrl(contact.picture)
    if (!isImage) {
      errors.picture = 'URL must point to a valid image'
    }
  }

  if (!contact.name || contact.name.length <= 5) {
    errors.name = 'Name must be longer than 5 characters'
  }

  if (!/^\d{9}$/.test(contact.contact)) {
    errors.contact = 'Contact must have exactly 9 digits'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
    errors.email = 'Invalid email address'
  }

  const valid = Object.keys(errors).length === 0

  return {
    valid,
    errors,
    message: valid ? undefined : Object.values(errors)[0]
  }
}