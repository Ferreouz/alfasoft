import type { Contact } from '@/types/Contact'

const BASE_URL = import.meta.env.VITE_API_BASE_URL + '/contacts';

export interface ApiError {
  status: number
  message: string
}

export function isApiError(error: any): error is ApiError {
  return error && typeof error.status === 'number' && typeof error.message === 'string'
}

const api = {
  async getContacts(): Promise<Contact[]> {
    const response = await fetch(`${BASE_URL}`);

    if (!response.ok) {
      throw {
        status: response.status,
        message: 'Failed to fetch contacts',
      } as ApiError;
    }

    return response.json()
  },

  async getContactById(id: number): Promise<Contact> {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      throw {
        status: response.status,
        message: 'Failed to fetch contact',
      } as ApiError
    }

    return response.json()
  },

  async createContact(contact: Omit<Contact, 'id'>): Promise<Contact> {
    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    });

    if (!response.ok) {
      throw {
        status: response.status,
        message: 'Failed to create contact',
      } as ApiError;
    }

    return response.json()
  },

  async updateContact(contact: Contact): Promise<Contact> {
    const response = await fetch(`${BASE_URL}/${contact.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    });

    if (!response.ok) {
      throw {
        status: response.status,
        message: 'Failed to update contact',
      } as ApiError;
    }

    return response.json()
  },

  async deleteContact(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw {
        status: response.status,
        message: 'Failed to delete contact',
      } as ApiError;
    }
  }
}

export default api;