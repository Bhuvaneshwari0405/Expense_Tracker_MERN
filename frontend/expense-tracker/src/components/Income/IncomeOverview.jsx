import React from 'react';

const IncomeOverview = () => {
    

    return (
        <div className='bg-white shadow-md rounded-lg p-4'>
            <h2 className='text-xl font-semibold'>Income Overview</h2>
            <div className='mt-4'>
                <p>Total Income: $5000</p>
                <p>Average Monthly Income: $1000</p>
                <p>Highest Income Month: January 2023</p>
            </div>
        </div>
    );
}
export default IncomeOverview;