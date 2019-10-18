const express = require('express');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

const router = express.Router();

// TODO -> build middleware for validation
// TODO -> build error handling
// TODO -> build response handling

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id });

    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET api/contacts/:id
// @desc    Get specific user contact
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({msg: 'Contact not found'});

    res.send(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
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
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      newContact = new Contact({ name, email, phone, type, user: req.user.id });

      await newContact.save();
      res
        .status(200)
        .json({ msg: `New contact ${newContact.name} has been saved!` });
    } catch (err) {
      console.error(err);
      res.status(500).json('Could not create new contact');
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

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let contact = await Contact.findById(req.params.id);

      if (!contact) return res.status(404).json({ msg: 'Contact not found' });

      if (contact.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }

      await Contact.findByIdAndUpdate(
        req.params.id,
        { $set: { ...req.body } },
        { new: true }
      );

      res.status(200).json({ msg: `contact ${contact.name} has been updated` });
    } catch (err) {
      console.error(err);
      res.status(500).json('Could not update contact');
    }
  }
);

// @route   Delete api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });

    contact.delete();

    return res.status(200).json({ msg: 'contact has been deleted' });

  } catch (err) {
    console.error(err);
    res.status(500).json('Could not update contact');
  }
});

module.exports = router;
