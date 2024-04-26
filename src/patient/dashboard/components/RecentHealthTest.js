import React, {useEffect, useState} from 'react';
import DashboardCard from 'src/components/shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from '@mui/lab';
import {Typography, Link, Box} from '@mui/material';

// 根据测试状态返回不同颜色
const getColorForStatus = (status) => {
  switch (status) {
    case 'Pending':
      return 'primary';
    case 'Completed':
      return 'success';
    case 'Not Attended':
      return 'error';
    default:
      return 'default';
  }
};

const getStatusStyle = (status) => {
  switch (status) {
    case 'Pending':
      return { backgroundColor: '#ffeb3b', borderRadius: '4px', padding: '3px 10px', display: 'inline-block' };
    case 'Completed':
      return { backgroundColor: '#4caf50', color: '#fff', borderRadius: '4px', padding: '3px 10px', display: 'inline-block' };
    case 'Not Attended':
      return { backgroundColor: '#f44336', color: '#fff', borderRadius: '4px', padding: '3px 10px', display: 'inline-block' };
    default:
      return {};
  }
};

const RecentHealthTest = () => {
  const [healthTests, setHealthTests] = useState([]);

  useEffect(() => {
    const url = process.env.REACT_APP_API_PATH + "/patients/tests";


    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
        .then(response => response.json())
        .then(data => {
          const formatted = data.tests.slice(0, 5).map(test => ({
            content: test.testContent,
            time: test.testTime,
            status: test.status,
          }));
          setHealthTests(formatted);
        })
        .catch(error => console.error('Error fetching appointments:', error));
  }, []);

  return (
      <DashboardCard title="Recent Health Test">
        <Timeline sx={{
          p: 0,
          '& .MuiTimelineConnector-root': {
            width: '2px',
            backgroundColor: '#efefef',
          },
        }}>
          {healthTests.map((test, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent sx={{
                  maxWidth: '105px',
                  wordWrap: 'break-word',
                }}>{test.time}</TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color={getColorForStatus(test.status)} variant="outlined" />
                  {index < healthTests.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Typography fontWeight="600">{test.content}</Typography>
                  <Typography color={getColorForStatus(test.status)}><Box sx={getStatusStyle(test.status)}>
                    {test.status}
                  </Box></Typography>
                </TimelineContent>
              </TimelineItem>
          ))}
        </Timeline>
      </DashboardCard>
  );
};

export default RecentHealthTest;
