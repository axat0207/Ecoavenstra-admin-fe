import React from 'react';
import { FaBox, FaUser } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  const stats = [
    { icon: <FaBox className="text-3xl text-gray-600" />, label: 'Total Enquiry', value: 3509, color: 'text-blue-600' },
    { icon: <FaBox className="text-3xl text-gray-600" />, label: 'Total Job', value: 2, color: 'text-blue-600' },
    { icon: <FaBox className="text-3xl text-gray-600" />, label: 'Total Service', value: 4, color: 'text-blue-600' },
    { icon: <FaUser className="text-3xl text-gray-600" />, label: 'Pending Enquiry', value: 3509, color: 'text-red-600' },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-4">{stat.icon}</div>
              <div>
                <h2 className="text-sm font-medium text-gray-500">{stat.label}</h2>
                <h1 className={`text-2xl font-bold ${stat.color}`}>{stat.value}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
