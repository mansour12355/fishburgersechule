// ===================================
// API Routes for DevSync Dashboard
// ===================================

const express = require('express');
const router = express.Router();

// Import Firebase Admin (optional - only if you want server-side Firebase)
let db = null;
try {
    const { getFirestore } = require('./firebase-admin');
    db = getFirestore();
} catch (error) {
    console.log('Firebase Admin not configured - using client-side Firebase only');
}

// ===================================
// Tasks API
// ===================================

// Get all tasks
router.get('/tasks', async (req, res) => {
    try {
        if (!db) {
            return res.status(503).json({ message: 'Server-side database not configured. Use client-side Firebase.' });
        }
        const snapshot = await db.collection('tasks').get();
        const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new task
router.post('/tasks', async (req, res) => {
    try {
        if (!db) {
            return res.status(503).json({ message: 'Server-side database not configured. Use client-side Firebase.' });
        }
        const docRef = await db.collection('tasks').add(req.body);
        res.status(201).json({ id: docRef.id, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a task
router.put('/tasks/:id', async (req, res) => {
    try {
        if (!db) {
            return res.status(503).json({ message: 'Server-side database not configured. Use client-side Firebase.' });
        }
        await db.collection('tasks').doc(req.params.id).update(req.body);
        res.json({ id: req.params.id, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
    try {
        if (!db) {
            return res.status(503).json({ message: 'Server-side database not configured. Use client-side Firebase.' });
        }
        await db.collection('tasks').doc(req.params.id).delete();
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ===================================
// Messages API
// ===================================

// Get all messages
router.get('/messages', async (req, res) => {
    try {
        if (!db) {
            return res.status(503).json({ message: 'Server-side database not configured. Use client-side Firebase.' });
        }
        const snapshot = await db.collection('messages').orderBy('time', 'asc').get();
        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Send a message
router.post('/messages', async (req, res) => {
    try {
        if (!db) {
            return res.status(503).json({ message: 'Server-side database not configured. Use client-side Firebase.' });
        }
        const docRef = await db.collection('messages').add(req.body);
        res.status(201).json({ id: docRef.id, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ===================================
// Activities API
// ===================================

// Get all activities
router.get('/activities', async (req, res) => {
    try {
        if (!db) {
            return res.status(503).json({ message: 'Server-side database not configured. Use client-side Firebase.' });
        }
        const snapshot = await db.collection('activities').get();
        const activities = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(activities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add an activity
router.post('/activities', async (req, res) => {
    try {
        if (!db) {
            return res.status(503).json({ message: 'Server-side database not configured. Use client-side Firebase.' });
        }
        const docRef = await db.collection('activities').add(req.body);
        res.status(201).json({ id: docRef.id, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
