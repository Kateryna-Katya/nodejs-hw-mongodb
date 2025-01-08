import Contacts from '../db/models/Contacts.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getContacts = async ({
  page,
  perPage,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = Contacts.find();

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite !== undefined) {
    contactsQuery
      .where('isFavourite')
      .equals(filter.isFavourite === true || filter.isFavourite === 'true');
  }
  if (filter.userId) {
    contactsQuery.where('userId').equals(filter.userId);
  }
  const totalItems = await Contacts.find()
    .merge(contactsQuery)
    .countDocuments();
  const items = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calcPaginationData({ totalItems, page, perPage });
  return {
    data: items,
    ...paginationData,
  };
};

export const getContactById = (contactId) => Contacts.findById(contactId);
export const getContactByFilter = (filter) => Contacts.findOne(filter);
export const createContact = (contactData) => Contacts.create(contactData);

export const updateContact = (contactId, contactData) =>
  Contacts.findByIdAndUpdate(contactId, contactData);

export const deleteContact = (contactId) =>
  Contacts.findByIdAndDelete(contactId);
