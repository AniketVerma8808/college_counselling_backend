import asyncHandler from "../middlewares/asyncHandler.js";
import * as contactService from "../services/contact.service.js";
import { successResponse } from "../utils/apiResponse.js";

export const createContact = asyncHandler(async (req, res) => {
  const contact = await contactService.createContactService(req.body);

  return successResponse(res, "Message sent successfully", contact);
});

export const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await contactService.getAllContactsService();

  return successResponse(res, "Contacts fetched successfully", contacts);
});

export const deleteContact = asyncHandler(async (req, res) => {
  await contactService.deleteContactService(req.params.id);

  return successResponse(res, "Contact deleted successfully");
});
