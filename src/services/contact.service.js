import Contact from "../models/contact.model.js";

export const createContactService = async (data) => {
  return await Contact.create(data);
};

export const getAllContactsService = async () => {
  return await Contact.find().sort({ createdAt: -1 });
};

export const deleteContactService = async (id) => {
  const contact = await Contact.findByIdAndDelete(id);

  if (!contact) {
    throw new Error("Contact not found");
  }

  return contact;
};
