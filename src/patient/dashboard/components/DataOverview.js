import React, { useState, useEffect } from 'react';
import { Select, MenuItem } from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import Chart from 'react-apexcharts';

const DataOverview = () => {
    const [year, setYear] = useState('2023');

    const handleChange = (event) => {
        setYear(event.target.value);
    };

    // Prepare mock data for different years
    const dataByYear = {
        '2024': {
            appointments: [5, 2, 3],
            healthTests: [5, 3, 6],
        },
        '2023': {
            appointments: [3, 2, 1, 4, 5, 2, 1, 4, 5, 2, 3, 4],
            healthTests: [2, 3, 1, 5, 3, 2, 3, 1, 2, 3, 4, 5],
        },
        '2022': {
            appointments: [1, 4, 5, 2, 3, 4, 5, 3, 2, 1, 4, 5],
            healthTests: [3, 1, 4, 2, 1, 5, 3, 4, 2, 1, 2, 3],
        },
    };

    // Dynamic chart options remain unchanged
    const optionscolumnchart = {
        chart: {
            type: 'bar',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '80%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },
        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 3,
            title: {
                text: 'times',
                rotate: 90,
                style: {
                    color: '#adb0bb',
                    fontSize: '14px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 600,
                    cssClass: 'apexcharts-yaxis-title',
                },
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
    };

    // Use state to dynamically change the series data based on the selected year
    const [seriescolumnchart, setSeriesColumnChart] = useState([]);

    useEffect(() => {
        // Update series data when the selected year changes
        const newData = dataByYear[year];
        setSeriesColumnChart([
            {
                name: 'Medical Appointment',
                data: newData.appointments,
            },
            {
                name: 'Health Test',
                data: newData.healthTests,
            },
        ]);
    }, [year]); // This effect depends on the year state

    return (
        <DashboardCard title="Annual Data Overview" action={
            <Select
                labelId="year-dd"
                id="year-dd"
                value={year}
                size="small"
                onChange={handleChange}
            >
                <MenuItem value={'2024'}>2024</MenuItem>
                <MenuItem value={'2023'}>2023</MenuItem>
                <MenuItem value={'2022'}>2022</MenuItem>
            </Select>
        }>
            <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="bar"
                height="370px"
            />
        </DashboardCard>
    );
};

export default DataOverview;
