import User from './models/User.js';
import Role from './models/Role.js';
import Task from './models/Task.js';
import { connection } from 'mongoose'; // Lấy named export connection từ module mongoose

connection.once('open', async () => {
    console.log('Checking sample data...');

    // 2. Sử dụng Models (đã được import)
    const roleCount = await Role.countDocuments();
    if (roleCount === 0) {
        await Role.insertMany([
            { description: 'Admin' },
            { description: 'User' }
        ]);
        console.log('Added sample roles');
    }

    console.log('Database check complete');
});