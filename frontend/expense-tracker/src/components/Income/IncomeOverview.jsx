import React, { useEffect,useState } from 'react';
import {LuPlus} from "react-icons/lu";
import { prepareIncomeBarChartData } from '../../utils/helper';
import CustomBarChart from '../../components/charts/CustomBarChart';

const IncomeOverview = ({transactions, onAddIncome}) => {
    
    const [chartData, setChartData] = useState([]);
    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result);
    }, [transactions]);
    console.log(chartData);
    return (
        <div className='card'>
            <div className='flex justify-between items-center'>
                <div className=''>
                    
            <h2 className='text-lg'>Income Overview</h2>
            <p className="text-xs text-gray-400 mt-0.5">Track your income</p>
          
            </div>
            <button className="add-btn" onClick={onAddIncome}>
                <LuPlus className='text-lg'/>
                Add Income</button>
            </div>
            <div className='mt-10'>
                <CustomBarChart chartData={chartData}/>
            </div>
        </div> 
    );
}
export default IncomeOverview;