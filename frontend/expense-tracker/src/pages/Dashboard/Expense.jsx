import React from "react";

const Expense = () => {
    return (
        <div>
            <h1>Expense Page</h1>
            <form>
                <input type="text" placeholder="Expense Category" />
                <input type="number" placeholder="Amount" />
                <button type="submit">Add Expense</button>
            </form>
        </div>
    );
}
export default Expense;