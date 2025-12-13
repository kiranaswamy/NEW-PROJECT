const crypto = require("crypto");
const { Op } = require("sequelize");
const User = require("../module/userModule");
const axios = require("axios");
const bcrypt = require("bcrypt");

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const token = crypto.randomBytes(20).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000;
    await user.save();

    const emailData = {
      sender: { name: "Unity Coding", email: "skiranaswamy@gmail.com" },
      to: [{ email }],
      subject: "Reset Password",
      htmlContent: `<p>Click <a href="http://localhost:3000/password/reset/${token}">here</a> to reset your password</p>`
    };

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      emailData,
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY
        }
      }
    );

    return res.json({ message: "Reset email sent" });

  } catch (err) {
    console.error("Brevo Error:", err.response?.data || err.message);
    return res.status(500).json({ error: err.response?.data || err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Find user by token and check expiry
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiry: { [Op.gt]: Date.now() }
      }
    });

    if (!user) return res.status(400).json({ error: "Invalid or expired token" });

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

