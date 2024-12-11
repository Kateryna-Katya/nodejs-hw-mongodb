import Contacts from '../db/models/Contacts.js';

export const getContacts = () => Contacts.find();

export const getContactById = (id) => Contacts.findById(id);
