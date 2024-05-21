const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/traits', {
  serverSelectionTimeoutMS: 30000,  // Increase timeout to 30 seconds
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log("We're connected to MongoDB!");

  // Initialize default traits
  initializeDefaults();
});

const TraitSchema = new mongoose.Schema({
  name: String,
  category: String,
  filePath: String,
});

const Trait = mongoose.model('Trait', TraitSchema);

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Initialize default traits
const initializeDefaults = async () => {
  const defaultTraits = [
    { name: 'City', category: 'background', filePath: 'public/images/backgrounds/city-berlin.jpg' },
    { name: 'Forest', category: 'background', filePath: 'public/images/backgrounds/forest.jpg' },
    { name: 'Space', category: 'background', filePath: 'public/images/backgrounds/space.jpg' },
    { name: 'W3Hub', category: 'background', filePath: 'public/images/backgrounds/w3hub.jpg' },
    { name: 'Red Shirt', category: 'shirt', filePath: 'public/images/shirt/red.png' },
    // { name: 'Blue Shirt', category: 'shirt', filePath: 'public/images/shirt/blue.png' },
    // { name: 'Green Shirt', category: 'shirt', filePath: 'public/images/shirt/green.png' },
    { name: 'Hawai', category: 'shirt', filePath: 'public/images/shirt/hawai.png' },
    { name: 'Tiger', category: 'shirt', filePath: 'public/images/shirt/tiger.png' },
    { name: 'Solana', category: 'shirt', filePath: 'public/images/shirt/solana.png' },
    { name: 'Axe', category: 'weapon', filePath: 'public/images/weapons/axe.png' },
    { name: 'Guns', category: 'weapon', filePath: 'public/images/weapons/guns.png' },
    { name: 'Stick', category: 'weapon', filePath: 'public/images/weapons/stick.png' },
    { name: 'Gun', category: 'weapon', filePath: 'public/images/weapons/gun2.png' },
  ];

  await Trait.deleteMany({}); // Clear all existing traits

  for (const trait of defaultTraits) {
    const newTrait = new Trait(trait);
    await newTrait.save();
  }

  console.log('Default traits initialized');
};

// API endpoint to upload a file and save trait
console.log("api upload")
app.post('/api/upload', upload.single('file'), async (req, res) => {
  const { name, category } = req.body;
  const filePath = req.file.path;

  const trait = new Trait({ name, category, filePath });
  await trait.save();

  res.json({ success: true, trait });
});

// API endpoint to get traits
app.get('/api/traits', async (req, res) => {
  const traits = await Trait.find();
  res.json(traits);
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from public directory
app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
