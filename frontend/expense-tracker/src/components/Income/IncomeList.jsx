import React from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Income Sources</h5>
        <button className='card-btn' onClick={onDownload}>
          <LuDownload className='text-base' />
          Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {(Array.isArray(transactions) ? transactions : []).map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.source}
            amount={item.amount}
            icon={item.icon}
            date={moment(item.date).format("Do MMM YYYY")}
            type="income"
            onDelete={() => onDelete(item._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
