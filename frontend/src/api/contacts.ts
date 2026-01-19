import type { Contact } from '@/types/Contact'

const BASE_URL = import.meta.env.VITE_API_BASE_URL + '/contacts';

const api = {
  async getContacts(): Promise<Contact[]> {
    const response = await fetch(`${BASE_URL}`);

    if (!response.ok) {
      return Promise.reject({ status: response.status, message: 'Failed to fetch contacts' });
    }

    return response.json()
  },

  async getContactById(id: number): Promise<Contact> {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      return Promise.reject({ status: response.status, message: 'Failed to fetch contact' });
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
      return Promise.reject({ status: response.status, message: 'Failed to create contact' });
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
      return Promise.reject({ status: response.status, message: 'Failed to update contact' });
    }

    return response.json()
  },

  async deleteContact(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      return Promise.reject({ status: response.status, message: 'Failed to delete contact' });
    }
  }
}

export default api;