// ChartComponent.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ChartComponent = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Sensor Temperature (°C)',
                data: [22, 19, 23, 25, 21],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Para hacer que el gráfico se ajuste al contenedor
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'white', 
                    font: {
                        family: 'Poppins', 
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y + ' °C';
                        }
                        return label;
                    }
                },
                backgroundColor: '#616161', 
                titleFont: {
                    family: 'Poppins',
                },
                bodyFont: {
                    family: 'Poppins',
                },
                titleColor: 'white', 
                bodyColor: 'white',  
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Months',
                    color: 'white', 
                    font: {
                        family: 'Poppins',
                    },
                },
                ticks: {
                    color: 'white', 
                },
                grid: {
                    display: false, 
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Temperature (°C)',
                    color: 'white', 
                    font: {
                        family: 'Poppins',
                    },
                },
                ticks: {
                    color: 'white', 
                },
                grid: {
                    color: '#454545', 
                }
            }
        }
    };

    return (
        <div className="chart-wrapper">
            <Line data={data} options={options} />
        </div>
    );
};

export default ChartComponent;
