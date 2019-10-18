const express = require('express');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

const router = express.Router();

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id });
    res.send(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
  res.send('Get all contacts');
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    newContact = new Contact(req.body);

    newContact.save((err, contact) => {
      if (err) throw err;
      res.status(200).json({ msg: `New contact ${contact.name} saved!` });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id', (req, res) => res.send('Update contact'));

// @route   Delete api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', (req, res) => res.send('Delete contact'));

module.exports = router;
