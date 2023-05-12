const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewars");

const contactsSchema = require("../../schemas");

const router = express.Router();

router
  .route("/")
  .get(ctrl.listContacts)
  .post(validateBody(contactsSchema), ctrl.addContact);

router.route("/:contactId").get(ctrl.getContactById).delete(ctrl.removeContact);

router.put("/:id", validateBody(contactsSchema), ctrl.updateContact);

module.exports = router;
