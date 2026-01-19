import type { Contact } from '@/types/Contact'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function getContacts(): Promise<Contact[]> {
  const response = await fetch(`${API_BASE_URL}/contacts`)

  if (!response.ok) {
    throw new Error('Failed to fetch contacts')
  }

  return response.json()
}
