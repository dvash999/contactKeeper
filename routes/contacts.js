const express = require('express');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Contact = require('../models/Contact');

const router = express.Router();

const resHandler = require('../helpers/responseHandler');

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id });
    console.log(contacts)

    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    resHandler(res, 500, 'Server error');
  }
});

// @route   GET api/contacts/:id
// @desc    Get specific user contact
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) return resHandler(res, 404, 'Contact not found');

    res.send(contact);
  } catch (err) {
    console.error(err.message);
    resHandler(res, 500, 'Server error');
  }
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is missing')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return resHandler(res, 400, { error: error.array() });

    const { name, email, phone, type } = req.body;

    try {
      newContact = new Contact({ name, email, phone, type, user: req.user.id });

      await newContact.save();

      resHandler(res, 200, newContact);
    } catch (err) {
      console.error(err);
      resHandler(res, 500, 'Server error');
    }
  }
);

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  Private
router.put(
  '/:id',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return resHandler(res, 400, { error: error.array() });

    try {
      let contact = await Contact.findById(req.params.id);

      if (!contact) return resHandler(res, 400, 'Contact not found');

      if (contact.user.toString() !== req.user.id)
        return resHandler(res, 401, 'Not authorized');

      await Contact.findByIdAndUpdate(
        req.params.id,
        { $set: { ...req.body } },
        { new: true }
      );

      resHandler(res, 200, `contact ${contact.name} has been updated`);
    } catch (err) {
      console.error(err);
      resHandler(res, 500, 'Server error');
    }
  }
);

// @route   Delete api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) return resHandler(res, 404, 'Contact not found');

    contact.delete();

    return resHandler(res, 200, 'contact has been deleted');
  } catch (err) {
    console.error(err);
    resHandler(res, 500, 'Server error');
  }
});

module.exports = router;
