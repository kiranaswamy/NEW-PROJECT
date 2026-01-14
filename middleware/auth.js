const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ message: "No token provided" });


  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(
      token,
      "a666fb6e5982f6376624d4066e35fc96ceff63755eac9256f6d2e8b4fdaf3259"
    );
    req.userId = decoded.userId; 
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
