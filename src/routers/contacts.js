import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';

import {
  createContactController,
  deleteConatctController,
  getAllContactsController,
  getContactByIdController,
  updateContactController,
} from '../controllers/contacts.js';

const router = Router();
router.get('/', ctrlWrapper(getAllContactsController));
router.get('/:contactId', ctrlWrapper(getContactByIdController));
router.post('/', ctrlWrapper(createContactController));
router.patch('/:contactId', ctrlWrapper(updateContactController));
router.delete('/:contactId', ctrlWrapper(deleteConatctController));
export default router;
