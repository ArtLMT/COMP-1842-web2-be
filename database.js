const User = require('./models/User');
const Role = require('./models/Role');
const Task = require('./models/Task');
const { connection } = require('mongoose');

connection.once('open', async () => {
    console.log('Checking sample data...');

    const roleCount = await Role.countDocuments();
    if (roleCount === 0) {
        await Role.insertMany([
            { id: '1', description: 'Admin' },
            { id: '2', description: 'User' }
        ]);
        console.log('Added sample roles');
    }

    console.log('Database check complete');
});
