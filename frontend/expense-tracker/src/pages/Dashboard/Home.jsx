import React from "react";
import { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const Home = () => {
    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Dashboard</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Welcome to your dashboard! Here you can track your expenses and income.
                </p>
            </div>
        </DashboardLayout>
    );
}
export default Home;