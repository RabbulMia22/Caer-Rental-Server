const User = require("../models/userModle");

const userInfo = async (req, res) => {
  try {
    let { email, displayName, role } = req.body;

    if (!email || !displayName) {
      return res.status(400).json({ message: "Email and displayName are required" });
    }

    email = email.trim().toLowerCase();
    displayName = displayName.trim();

    let user = await User.findOne({ email });

    if (user) {

      user.displayName = displayName;
      user.role = role || user.role;
      await user.save();

      return res.status(200).json({
        message: "User updated successfully",
        user: {
          email: user.email,
          displayName: user.displayName,
          role: user.role,
        },
      });
    } else {

      user = new User({
        email,
        displayName,
        role: role || "user",
      });
      await user.save();

      return res.status(201).json({
        message: "User created successfully",
        user: {
          email: user.email,
          displayName: user.displayName,
          role: user.role,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserRole = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ role: user.role });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAdmin = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user); // ✅ return full user object
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};





module.exports = { userInfo, getUserRole, getAdmin };
