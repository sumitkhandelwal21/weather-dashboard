"use client"
import { JSX, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface WeatherData {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    temperature_2m_mean: number[];
}

export default function WeatherDashboard() {
    const [latitude, setLatitude] = useState<string>('');
    const [longitude, setLongitude] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    const handleFetchData = async (): Promise<void> => {
        if (!latitude || !longitude || !startDate || !endDate) {
            setError('All fields are required.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
                params: {
                    latitude,
                    longitude,
                    start_date: startDate,
                    end_date: endDate,
                    daily: ['temperature_2m_max', 'temperature_2m_min', 'temperature_2m_mean',
                        'apparent_temperature_max', 'apparent_temperature_min', 'apparent_temperature_mean'],
                    timezone: 'auto'
                }
            });
            setWeatherData(response.data.daily);
        } catch (error) {
            setError(`Failed to fetch weather data. Please check your inputs or try again later. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const renderGraph = (): JSX.Element | null => {
        if (!weatherData) return null;

        const labels = weatherData.time;
        const datasets = [
            {
                label: 'Max Temperature (°C)',
                data: weatherData.temperature_2m_max,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Min Temperature (°C)',
                data: weatherData.temperature_2m_min,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
            {
                label: 'Mean Temperature (°C)',
                data: weatherData.temperature_2m_mean,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
        ];

        return <Line data={{ labels, datasets }} />;
    };

    const renderTable = (): JSX.Element | null => {
        if (!weatherData) return null;

        const rows = weatherData.time.map((date, index) => ({
            date,
            maxTemp: weatherData.temperature_2m_max[index],
            minTemp: weatherData.temperature_2m_min[index],
            meanTemp: weatherData.temperature_2m_mean[index],
        }));

        return (
            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Date</th>
                        <th className="border border-gray-300 px-4 py-2">Max Temp (°C)</th>
                        <th className="border border-gray-300 px-4 py-2">Min Temp (°C)</th>
                        <th className="border border-gray-300 px-4 py-2">Mean Temp (°C)</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 px-4 py-2">{row.date}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.maxTemp}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.minTemp}</td>
                            <td className="border border-gray-300 px-4 py-2">{row.meanTemp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Weather Dashboard</h1>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <input
                    type="number"
                    className="border p-2 text-black rounded w-full"
                    placeholder="Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                />
                <input
                    type="number"
                    className="border p-2 text-black rounded w-full"
                    placeholder="Longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                />
                <input
                    type="date"
                    className="border p-2 text-black rounded w-full"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                    type="date"
                    className="border p-2 text-black rounded w-full"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleFetchData}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Fetch Weather Data'}
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <div className="mt-8">
                {renderGraph()}
            </div>

            <div className="mt-8 overflow-x-auto">
                {renderTable()}
            </div>
        </div>
    );
}
