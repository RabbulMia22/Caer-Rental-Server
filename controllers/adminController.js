const Admin = require("../models/adminModels");  
const createAdmin = async (req, res) => {
  try {
    const { email, displayName } = req.body;

    // check if admin already exists
    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = new Admin({ email, displayName, role: "admin" });
    await admin.save();

    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAdminRole = async (req, res) => {
    try {
        const { email } = req.params;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ role: admin.role });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createAdmin, getAdminRole };
