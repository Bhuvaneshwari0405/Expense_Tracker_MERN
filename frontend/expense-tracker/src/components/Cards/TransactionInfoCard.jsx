import React from 'react';
import { LuTrendingUp,LuTrendingDown, LuUtensils } from 'react-icons/lu';

const TransactionInfoCard = ({ title, icon, date, amount, type, hideDeleteBtn }) => {

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="flex flex-col">
        <h4 className="text-sm font-medium text-black">{title}</h4>
        <span className="text-xs text-gray-500">{date}</span>
      </div>

      <div className="ml-auto text-right">
        <span
          className={`text-sm font-semibold ${
            type === 'income' ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {type === 'income' ? '+' : '-'}₹{amount}
        </span>
        <span >{type === "income" ? <LuTrendingUp /> : <LuTrendingDown /> }</span>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
