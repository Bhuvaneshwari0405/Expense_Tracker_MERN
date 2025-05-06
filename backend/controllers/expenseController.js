const User = require("../models/User");
const Expense = require("../models/Expense");
const xlsx = require("xlsx");
// Add Expense Controller
exports.addExpense = async (req, res) => {
    const userId = req.user._id;
    try{
    const { icon, category, amount, date } = req.body;
    if (!category || !amount || !date) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    const newExpense = new Expense({
        userId,
        icon,
        category,
        amount,
        date: new Date(date),
    });
    await newExpense.save();
    res.status(200).json({
        newExpense,
        message: "Expense added successfully",
    });
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}


//Get All Expense Controller
exports.getAllExpense = async (req, res) => {
    const userId = req.user._id;
    try {
        const Expense = await Expense.find({ userId }).sort({ date: -1 });
        res.status(200).json(Expense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

//Delete Expense Controller
exports.deleteExpense = async (req, res) => {
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Expense deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

//Download Expense as Excel Controller
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user._id;
    try {
        const Expense = await Expense.find({ userId }).sort({ date: -1 });
        const data = Expense.map((item) => ({
            category: item.category,
            amount: item.amount,
            date: item.date.toLocaleDateString(),
        }));
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, "Expense.xlsx");
        res.download("Expense_details.xlsx");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
