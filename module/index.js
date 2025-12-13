const User = require('./userModule');
const Expense = require('./expenseModule');

User.hasMany(Expense);
Expense.belongsTo(User);



module.exports = {User,Expense}