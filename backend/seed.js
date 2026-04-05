const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');
const User = require('./models/user');

dns.setServers(['8.8.8.8', '8.8.4.4']);
dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding');

    // Check if Admin already exists
    const adminExists = await User.findOne({ email: 'admin21@gmail.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin21@gmail.com',
        password: '123',
        role: 'Admin'
      });
      console.log('✔ Admin user (admin21@gmail.com) created successfully');
    } else {
      console.log('➡ Admin user already exists');
    }

    // Check if Employee already exists
    const empExists = await User.findOne({ email: 'ritik21@gmail.com' });
    if (!empExists) {
      await User.create({
        name: 'Ritik',
        email: 'ritik21@gmail.com',
        password: '123',
        role: 'Employee'
      });
      console.log('✔ Employee user (ritik21@gmail.com) created successfully');
    } else {
      console.log('➡ Employee user already exists');
    }

    console.log('Database seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Seeding blocked due to error:', err);
    process.exit(1);
  }
};

seedDatabase();
