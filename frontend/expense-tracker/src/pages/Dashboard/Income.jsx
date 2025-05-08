import React, { useEffect } from "react";
import { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import { toast } from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddIncomeModal, setOenAddIncomeModal] = useState(false);

  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something");
    } finally {
      setLoading(false);
    }
  };
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    //validate
    if (!source.trim()) {
      toast.error("Source is reqiured");
      return;
    }
    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Amount is required");
      return;
    }
    if(!date){
      toast.error("Date is required");
      return;
    }
    try{
        await axiosInstance.post(`${API_PATHS.INCOME.ADD_INCOME}`, {
            source,
            amount,
            date,
            icon,
        });
        
        setOenAddIncomeModal(false);
        toast.success("Income added successfully");
        fetchIncomeDetails();

    }catch(error){
        console.log(error);
        toast.error("Something went wrong");
    }
    
  };
  const deleteIncome = async (id) => {
    try{
        await axiosInstance.delete(`${API_PATHS.INCOME.DELETE_INCOME}/${id}`);
        setOpenDeleteAlert({show: false, data: null});
        toast.success("Income deleted SuccessFully");
        fetchIncomeDetails();
    }catch(error){
        console.log(error);
        toast.error("Something went wrong");
    }
  };
  const handleDownloadIncomeDetails = async () => {};

  useEffect(() => {
    fetchIncomeDetails();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1  gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData || []}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
          <IncomeList 
            transactions={incomeData}
            onDelete={(id) => {
                setOpenDeleteAlert({
                  show: true,
                  data: id,
                });
            }}
            onDownload={handleDownloadIncomeDetails}
            />
        </div>
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOenAddIncomeModal(false)}
          title="Add income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
        <Modal 
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({show: false, data: null})}
        title="Delete Income"
        >

        <DeleteAlert  content="Are you sure you want to delete this income?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
            />
        </Modal>
      </div>
    </DashboardLayout>
  );
};
export default Income;
