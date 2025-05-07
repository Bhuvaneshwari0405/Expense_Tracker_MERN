import React, { useEffect } from 'react';
import { useState } from 'react';
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview"; 
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import  GET_ALL_INCOME  from '../../utils/apiPaths';


const Income = () => {

    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show:false,
        data:null,
    });

    const [openAddIncomeModal, setOenAddIncomeModal] = useState(false);

    const fetchIncomeDetails = async() =>{ 
        if(!loading) return;

        setLoading(true);

        try{
            const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);
            if(response.data){
                setIncomeData(response.data)
            }

        }
        catch(error){
            console.log("Something");
        }finally{
            setLoading(false);
        }
    };
    const handleAddIncome = async (income) => {};
    const deleteIncome = async(id) => {};
    const handleAddIncomeDetails = async () => {};

    useEffect(() =>{
        fetchIncomeDetails();
        return () => {};
    }, []);
    

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1  gap-6">
                    <div className=''>
                        <IncomeOverview 
                            transactions = {incomeData}
                            onAddIncome ={() => setOenAddIncomeModal(true)}
                        />
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}
export default Income;