const Income = require('../models/Income');
const Expense = require('../models/Expense');
const { isValidObjectId, Types } = require('mongoose');
const { trace } = require('../routes/authRoutes');

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const userObjectId = new Types.ObjectId(userId);

    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
    }).sort({ date: -1 }).limit(60);

    const last60DaysIncome = last60DaysIncomeTransactions.reduce((sum, txn) => sum + txn.amount, 0);

    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    }).sort({ date: -1 }).limit(60);

    const last30DaysExpense = last30DaysExpenseTransactions.reduce((sum, txn) => sum + txn.amount, 0);

    const lastTransactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(txn => ({
        ...txn.toObject(),
        type: 'income'
      })),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(txn => ({
        ...txn.toObject(),
        type: 'expense'
      }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json({
      totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
        totalIncome: totalIncome[0]?.total || 0,
        totalExpense: totalExpense[0]?.total || 0,
        last30DaysExpense:{
        total: last30DaysExpense,
        transactions: last30DaysExpenseTransactions
        },
        last60DaysIncome:{
        total: last60DaysIncome,
        transactions: last60DaysIncomeTransactions
        },
        recentTransactions: lastTransactions,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
