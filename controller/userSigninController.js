// // SIGNIN CONTROLLER
// const User = require('../module/userModule');
// const bcrypt = require('bcrypt');

// const signin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     return res.status(200).json({ message: "Signin successful" });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports = { signin };


// SIGNIN CONTROLLER
const User = require('../module/userModule');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');   

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    // req.session.userId = user.id;

    
    const token = jwt.sign(
      { userId: user.id },    
      "5acef0e2f3126957d130e3cf920cb215e57075d710db19298c7896bac42cae9dbfdf55ffd80050f9a3031b2c7227efed6c5d6f1627f790fa0f8cb7a98aab7dad", 
      { expiresIn: "1d" } 
    );

    return res.status(200).json({
      message: "Signin successful",
      token: token,             
      userId: user.id           
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signin };
