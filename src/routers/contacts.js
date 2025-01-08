import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';

import { authenticate } from '../middlewares/authenticate.js';

import {
  createContactController,
  deleteConatctController,
  getAllContactsController,
  getContactByIdController,
  updateContactController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  contactAddSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
const router = Router();
router.use(authenticate);
router.get('/', ctrlWrapper(getAllContactsController));
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));
router.post(
  '/',
  validateBody(contactAddSchema),
  ctrlWrapper(createContactController),
);
router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);
router.delete('/:contactId', isValidId, ctrlWrapper(deleteConatctController));
export default router;
