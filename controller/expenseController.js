const Expense = require("../module/expenseModule");
const User = require('../module/userModule');
const { fn, col} = require("sequelize");
const sequelize = require('../utils/db-connections')


const addExpense = async (req, res) => {
  console.log(req)
   const t =await sequelize.transaction();
  try {
    const { amount, description, category ,updateTotal = true } = req.body;
    const userId = req.userId; 
    console.log("User ID:", userId);

    if (!amount || !description) {
      await t.rollback()
      return res.status(400).json({ error: "Amount and Description required" });
    }

    const expense = await Expense.create({
      amount,
      description,
      category,
      UserId: userId,
      
    },
    {transaction:t});

    if(updateTotal){
    await User.increment("totalExpense", {
      by: amount,
      where: { id: userId },
      transaction:t
    });
  }

    await t.commit();
    return res.status(201).json(expense);
    
  } catch (error) {
    console.error(error);
    await t.rollback();
    res.status(500).json({ error: "Failed to add expense" });
  }
};


const getExpenses = async (req, res) => {
  try {
    const userId = req.userId;
    const expenses = await Expense.findAll({
      where: { UserId: userId }
    });
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};


const deleteExpense = async (req, res) => {
   const t = await sequelize.transaction();
  try {
    const id = req.params.id;
    const exp = await Expense.findByPk(id);
      if (!exp) {
      return res.status(404).json({ error: "Expense not found" });
    }

 await User.decrement("totalExpense", {
      by: exp.amount,
      where: { id: exp.UserId },
      transaction:t
    });

    await Expense.destroy({ where: { id },transaction:t });
    await t.commit();
    res.json({ message: "Expense deleted" });
  } catch (err) {
    console.error(err);
    await t.rollback();
    res.status(500).json({ error: "Failed to delete expense" });
  }
};


const leardboardData = async (req,res)=>{
  try {
    const leaderboard = await User.findAll({
      attributes: [
        "id",
        "name",
        "email",
        [fn("SUM", col("expenses.amount")), "totalExpense"]  
      ],
      include: [
        {
          model: Expense,
          attributes: []
        }
      ],
      group: ["User.id"], // Group by user
      order: [[fn("SUM", col("expenses.amount")), "DESC"]] 
    });

    res.status(200).json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  addExpense,
  getExpenses,
  deleteExpense,
  leardboardData
};
