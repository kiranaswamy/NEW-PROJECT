const express = require('express');
const cors = require("cors");
const db = require('./utils/db-connections');
const axios = require("axios");
require("dotenv").config();



const UserRoutes = require('./routes/userRoutes');
const expenceRoutes = require('./routes/expenseRoute')
const passwordRoutes = require("./routes/passwordRoutes");

// const User = require('./module/userModule');
// const Expense = require('./module/expenseModule');

// User.hasMany(Expense);
// Expense.belongsTo(User);

require('./module')

const app = express();
app.use(cors());         
app.use(express.json());

app.get('/', async(req, res) => {


const urlencoded = "https://api.brevo.com/v3/smtp/email";
const emailData = {
  
    sender: {
        name: "Unity Coding",
        email: "skiranaswamy@gmail.com"
    },
    to: [
        { email: "kiranswamygowda72@gmail.com" }
    ],
    subject: "Test Email",
    htmlContent: "<html><body><h1>Hello</h1></body></html>"
};
try{const response = await axios.post(urlencoded,emailData,{
  headers:{
    'Content-Type':'application/json',
    'api-key':process.env.BREVO_API_KEY
  }
  })
  res.send( "<html><body><h1>Email Send</h1></body></html>");
    // res.send('server is created');
}catch(err){
  res.status(500).json({err:err.message})
}
});

app.use('/user',UserRoutes);
app.use('/api',expenceRoutes);
app.use("/password", passwordRoutes);
db.sync({force:true})
  .then(() => {
    app.listen(3000, () => {
      console.log('server is running');
    });
  })
  .catch((err) => {
    console.log(err);
  });
