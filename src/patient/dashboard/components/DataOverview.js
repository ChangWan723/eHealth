import React, { useState, useEffect } from 'react';
import { Select, MenuItem } from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import Chart from 'react-apexcharts';

const DataOverview = () => {
    const [year, setYear] = useState('2023');
    const [dataByYear, setDataByYear] = useState({
        '2024': {
            appointments: [],
            healthTests: [],
            prescription: [],
        },
        '2023': {
            appointments: [],
            healthTests: [],
            prescription: [],
        },
        '2022': {
            appointments: [],
            healthTests: [],
            prescription: [],
        },});

    const handleChange = (event) => {
        setYear(event.target.value);
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

    const [seriescolumnchart, setSeriesColumnChart] = useState([]);

    useEffect(() => {
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
            {
                name: 'Prescription',
                data: newData.prescription,
            },
        ]);
    }, [year, dataByYear]);

    useEffect(() => {
        const url = process.env.REACT_APP_API_PATH + "/patients/annualData";

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response => response.json())
            .then(result => {
                const formattedData = {};
                for (const year in result.dataByYear) {
                    formattedData[year] = {
                        appointments: result.dataByYear[year].appointments,
                        healthTests: result.dataByYear[year].healthTests,
                        prescription: result.dataByYear[year].prescription
                    };
                }

                setDataByYear(formattedData);
            })
            .catch(error => console.error('Error fetching patient info:', error));
    }, []);

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
