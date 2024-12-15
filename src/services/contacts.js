import Contacts from '../db/models/Contacts.js';

export const getContacts = () => Contacts.find();

export const getContactById = (id) => Contacts.findById(id);

export const createContact = (contactData) => Contacts.create(contactData);

export const updateContact = (contactId, contactData) =>
  Contacts.findByIdAndUpdate(contactId, contactData, { new: true });

export const deleteContact = (contactId) =>
  Contacts.findByIdAndDelete(contactId);
