import React from 'react';
 
const Income = () => {
    return (
        <div>
            <h1>Income Page</h1>
            <form>
                <input type="text" placeholder="Source of Income" />
                <input type="number" placeholder="Amount" />
                <button type="submit">Add Income</button>
            </form>
        </div>
    );
}
export default Income;