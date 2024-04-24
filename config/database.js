const mongoose = require('mongoose');
const Challenge = require('../models/challenge');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);

  const seedData = [
    // ADD SEED DATA
  ];

  try {
    // Clear existing data
    await Challenge.deleteMany({});
    // Insert seed data
    await Challenge.insertMany(seedData);
    console.log('Challenges seeded successfully');
  } catch (err) {
    console.error('Error seeding challenges:', err);
  } finally {
    // Close database connection
    mongoose.connection.close();
  }
});
