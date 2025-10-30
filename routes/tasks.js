const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// ✅ CREATE (POST /tasks)
router.post('/', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ✅ READ ALL (GET /tasks)
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate('user_id', 'displayName email')
            .populate('status_id', 'description');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ READ ONE (GET /tasks/:id)
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate('user_id', 'displayName email')
            .populate('status_id', 'description');
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ UPDATE (PUT /tasks/:id)
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ✅ DELETE (DELETE /tasks/:id)
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
