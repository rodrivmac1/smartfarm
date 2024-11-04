import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useTranslation } from 'react-i18next';

Chart.register(...registerables);

const ChartComponent = ({ data, labels, label }) => {
    const { t } = useTranslation(); 

    const chartData = {
        labels: labels, // Fechas dinámicas
        datasets: [
            {
                label: label || 'Sensor Data',
                data: data, // Datos dinámicos
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
                            label += context.parsed.y;
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
                    text: t('ChartComponent.Dates'),
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
                    text: t('ChartComponent.Value'),
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
            <Line data={chartData} options={options} />
        </div>
    );
};

export default ChartComponent;
