import Contacts from '../db/models/Contacts.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getContacts = async ({
  page = 1,
 perPage = 10, 
 sortBy="name",
 sortOrder="asc", 
 filter={},
}) => {
const limit=perPage;
const skip=(page - 1) * limit;
const contactsQuery= Contacts.find();

if(filter.type){
  contactsQuery.where("contactType").equals(filter.type);
}
if(filter.isFavourite !==undefined){
  contactsQuery.where("isFavourite").equals(filter.isFavourite);
}

  const items= await contactsQuery.skip(skip).limit(limit).sort({[sortBy]:sortOrder});

  const totalItems =await Contacts.find().merge(contactsQuery).countDocuments();
  const paginationData=calcPaginationData({totalItems,page,perPage});
  return{
    items,
    totalItems,
    ...paginationData,
  };
};

export const getContactById = (id) => Contacts.findById(id);

export const createContact = (contactData) => Contacts.create(contactData);

export const updateContact = (contactId, contactData) =>
  Contacts.findByIdAndUpdate(contactId, contactData);

export const deleteContact = (contactId) =>
  Contacts.findByIdAndDelete(contactId);
