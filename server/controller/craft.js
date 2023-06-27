const Craft = require('../model/Craft');


exports.getAllCraft = async (req, res) => {
  try {
    const craftProjects = await Craft.find();
    res.json(craftProjects);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving craft projects' });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Craft.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getCraftsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const crafts = await Craft.find({ category });
    res.json(crafts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.createCraft = async (req, res) => {
  try {
    
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    const { title, category, materials, description, steps, video } = req.body;
    const newCraftProject = new Craft({ title, category, materials, description, steps, video });
    await newCraftProject.save();

    res.status(201).json({ message: 'Craft project created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.deleteCraft = async (req, res) => {
  const craftId = req.params.id;
  try {
    console.log(req.user.role);
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    await Craft.deleteOne({ _id: craftId });
    res.json({ message: 'Craft project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting craft project' });
  }
};









