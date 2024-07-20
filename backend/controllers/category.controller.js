
const Category = require('../models/category.model');

exports.createCategory = async (req, res) => {
  try {
    const newCategory = new Category({
      name: req.body.name,
      user: req.userId 
    });

    await newCategory.save();
    res.send({ message: "Category created successfully", data: newCategory });
  } catch (error) {
    res.status(500).send({ message: "Error creating category" });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.send(categories);
  } catch (error) {
    res.status(500).send({ message: "Error fetching categories" });
  }
};

exports.updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, { name: req.body.name }, { new: true });
    if (!updatedCategory) {
      return res.status(404).send({ message: "Category not found" });
    }
    res.send({ message: "Category updated successfully", data: updatedCategory });
  } catch (error) {
    res.status(500).send({ message: "Error updating category" });
  }
};

exports.deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).send({ message: "Category not found" });
    }
    res.send({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting category" });
  }
};
