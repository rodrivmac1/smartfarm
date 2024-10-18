import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useTranslation } from 'react-i18next';

Chart.register(...registerables);

const ChartComponent = () => {
    const { t } = useTranslation(); 

    const data = {
        labels: [
            t('ChartComponent.january'), 
            t('ChartComponent.february'), 
            t('ChartComponent.march'), 
            t('ChartComponent.april'), 
            t('ChartComponent.may')
        ],
        datasets: [
            {
                label: t('ChartComponent.sensorTemperature'), 
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
                    text: t('ChartComponent.months'),
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
                    text: t('ChartComponent.temperature'),
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
