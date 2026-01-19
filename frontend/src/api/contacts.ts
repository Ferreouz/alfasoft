import type { Contact } from '@/types/Contact'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const api = {
  async getContacts(): Promise<Contact[]> {
    const response = await fetch(`${API_BASE_URL}/contacts`)

    if (!response.ok) {
      throw new Error('Failed to fetch contacts')
    }

    return response.json()
  },

  async getContactById(id: number): Promise<Contact> {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`)

    if (!response.ok) {
      throw new Error('Failed to fetch contact')
    }

    return response.json()
  },

  async createContact(contact: Omit<Contact, 'id'>): Promise<Contact> {
    const response = await fetch(`${API_BASE_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    })

    if (!response.ok) {
      throw new Error('Failed to create contact')
    }

    return response.json()
  },

  async updateContact(contact: Contact): Promise<Contact> {
    const response = await fetch(`${API_BASE_URL}/contacts/${contact.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    })

    if (!response.ok) {
      throw new Error('Failed to update contact')
    }

    return response.json()
  },

  async deleteContact(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Failed to delete contact')
    }
  }
}

export default api;