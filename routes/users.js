const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {response} = require("express");

// get user by Id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate('role', 'description'); // assuming 'role' ref to Role model
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET all users
router.get('/', async(req, res) =>{
    try {
        const users = await User.find()
            .populate('role', 'description');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
} )

// Post add user
router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// PUT update user
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id)
        if (!user) return res.status(404).json({message: 'User not found'});
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// DELETE user
router.delete('/:id', async (req, response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return response.status(404).json({ message: 'User not found' });
        response.json({ message: 'User deleted' });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
})
module.exports = router;
