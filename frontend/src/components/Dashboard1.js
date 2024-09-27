import React, { useState } from 'react';
import '../style/Dashboard1.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard1 = () => {
  // State to store the selected category (Student, Staff, Finance)
  const [selectedCategory, setSelectedCategory] = useState('Student');

  // Data for the different categories
  const dataByCategory = {
    Student: {
      labels: ['Class 1', 'Class 2', 'Class 3', 'Class 4'],
      datasets: [
        {
          label: 'Number of Students',
          data: [30, 25, 35, 40],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    },
    Staff: {
      labels: ['Teaching Staff', 'Administrative Staff', 'Support Staff'],
      datasets: [
        {
          label: 'Number of Staff',
          data: [15, 8, 10],
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
        },
      ],
    },
    Payments: {
      labels: ['January', 'February', 'March', 'April'],
      datasets: [
        {
          label: 'Monthly Revenue',
          data: [4000, 3000, 5000, 4500],
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1,
        },
      ],
    },
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return (
    <div className="dashboard-container">
      <table>
        <tbody>
          <tr onClick={() => setSelectedCategory('Staff')}>
            <td>Staff</td>
          </tr>
          <tr onClick={() => setSelectedCategory('Student')}>
            <td>Student</td>
          </tr>
          <tr onClick={() => setSelectedCategory('Payments')}>
            <td>Payments</td>
          </tr>
        </tbody>
      </table>

      {/* Bar chart for displaying the selected category's data */}
      <div className="chart-container">
        <Bar data={dataByCategory[selectedCategory]} options={options} />
      </div>
    </div>
  );
};

export default Dashboard1;
