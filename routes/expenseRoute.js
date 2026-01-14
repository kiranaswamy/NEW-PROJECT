const express = require("express");
const route = express.Router();
const expenseController = require("../controller/expenseController");
const authenticateToken = require("../middleware/auth"); 

// Protected routes (require JWT)
route.post("/addExpense", authenticateToken, expenseController.addExpense);
route.get("/expenses", authenticateToken, expenseController.getExpenses);
route.delete("/expense/:id", authenticateToken, expenseController.deleteExpense);
route.get('/leaderboard',authenticateToken,expenseController.leardboardData)
route.put("/addingValues/:id", authenticateToken, expenseController.updateExpense);

module.exports = route;
