import React, { useState }  from "react"; 
import Input from "../Inputs/input.jsx";
import EmojiPickerPopup from "../EmojiPickerPopup.jsx";
const AddIncomeForm = ({onAddIncome}) =>{

    const [income, setIncome] = useState({
        source: "",
        amount: "",
        date: "",
        icon:"",
    });
    const handleChange = (key, value) => setIncome({ ...income, [key]: value });


    return(

        <div>
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
            <Input 
                value={income.source}
                onChange={({target}) => handleChange("source", target.value)}
                placeholder="Source"
                label="Income Source"
                type="text"
            />
            <Input 
                value={income.amount}
                onChange={({target}) => handleChange("amount", target.value)}
                placeholder="amount"
                label="Enter amount"
                type="number"
            />
            <Input 
                value={income.date}
                onChange={({target}) => handleChange("date", target.value)}
                placeholder=""
                label="Enter Date"
                type="date"
            />
            <div className="flex justify-end mt-6">
                <button type="button" className="add-btn add-btn-fill " onClick={() => onAddIncome(income)}>Add Income</button>
            </div>
            
        </div>

    );


}

export default AddIncomeForm;

