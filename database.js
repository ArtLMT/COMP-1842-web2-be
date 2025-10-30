const User = require('./models/User');
const Role = require('./models/Role');
const Status = require('./models/Status');
const Task = require('./models/Task');
const {connection} = require("mongoose");

// Tạo dữ liệu mẫu nếu chưa có
connection.once('open', async () => {
    console.log('🧩 Checking sample data...');

    const roleCount = await Role.countDocuments();
    if (roleCount === 0) {
        await Role.insertMany([
            { id: '1', description: 'Admin' },
            { id: '2', description: 'User' }
        ]);
        console.log('✅ Added sample roles');
    }

    const statusCount = await Status.countDocuments();
    if (statusCount === 0) {
        await Status.insertMany([
            { id: '1', description: 'To Do' },
            { id: '2', description: 'In Progress' },
            { id: '3', description: 'Done' }
        ]);
        console.log('✅ Added sample statuses');
    }
});
