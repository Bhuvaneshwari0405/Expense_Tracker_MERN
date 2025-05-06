const User = require("../models/User");
const Income = require("../models/Income");
const xlsx = require("xlsx");
// Add Income Controller
exports.addIncome = async (req, res) => {
    const userId = req.user._id;
    try{
    const { icon, source, amount, date } = req.body;
    if (!source || !amount || !date) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    const newIncome = new Income({
        userId,
        icon,
        source,
        amount,
        date: new Date(date),
    });
    await newIncome.save();
    res.status(200).json({
        newIncome,
        message: "Income added successfully",
    });
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}


//Get All Income Controller
exports.getAllIncome = async (req, res) => {
    const userId = req.user._id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(income);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

//Delete Income Controller
exports.deleteIncome = async (req, res) => {
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Income deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

//Download Income as Excel Controller
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user._id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        const data = income.map((item) => ({
            source: item.source,
            amount: item.amount,
            date: item.date.toLocaleDateString(),
        }));
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "Income.xlsx");
        res.download("Income_details.xlsx");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
