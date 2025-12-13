const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ message: "No token provided" });


  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(
      token,
      "5acef0e2f3126957d130e3cf920cb215e57075d710db19298c7896bac42cae9dbfdf55ffd80050f9a3031b2c7227efed6c5d6f1627f790fa0f8cb7a98aab7dad"
    );
    req.userId = decoded.userId; 
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
