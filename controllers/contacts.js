
const contacts = require(".././models/contacts");
const { HttpError, ctrlWrapper } = require(".././helpers");

const addShema = require("../schemas/contacts")


const listContacts = async (req, res) => {
    const result = await contacts.listContacts();

    if (!result) {
      throw HttpError(404, "Not fount");
    }
    res.json(result);
}

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw HttpError(404, "Not fount");
    }
    res.json(result);
}

const addContact = async (req, res) => {
        const { error } = addShema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
}

const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);

    if (!result) {
      throw HttpError(404, "Not fount");
    }
    res.json({
      message: "Delete success"
    })
}

const updateContact = async (req, res) => {
    const { error } = addShema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);

    if (!result) {
      throw HttpError(404, "Not fount");
    }
    res.json(result);
}

module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),
}