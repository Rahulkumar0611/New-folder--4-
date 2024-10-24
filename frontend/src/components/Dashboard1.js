import React, { useState, useEffect } from 'react';
import '../style/Dashboard1.css';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
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
  const [selectedCategory, setSelectedCategory] = useState('Student');
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5000/graph/barGraphData?category=${selectedCategory}`);
        
        console.log('API Response:', response.data); // Log the response data

        if (selectedCategory === 'Student' || selectedCategory === 'Staff') {
          setChartData({
            labels: response.data.labels,
            datasets: [
              {
                label: selectedCategory === 'Student' ? 'Number of Students' : 'Number of Staff',
                data: response.data.counts,
                backgroundColor: selectedCategory === 'Student' 
                  ? 'rgba(75, 192, 192, 0.2)' 
                  : 'rgba(153, 102, 255, 0.2)',
                borderColor: selectedCategory === 'Student' 
                  ? 'rgba(75, 192, 192, 1)' 
                  : 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
              },
            ],
          });
        } else if (selectedCategory === 'Payments') {
          setChartData({
            labels: response.data.labels,
            datasets: [
              {
                label: 'Monthly Revenue',
                data: response.data.revenue,
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

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

      {/* Loading and error handling */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="chart-container">
          <Bar data={chartData} options={options} />
        </div>
      )}
    </div>
  );
};

export default Dashboard1;
