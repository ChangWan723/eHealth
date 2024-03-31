import React from 'react';
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

// 模拟的健康测试数据
const healthTests = [
  {
    time: '2024-03-02 09:30',
    content: 'Blood Pressure Measurement',
    status: 'Pending',
  },
  {
    time: '2024-03-01 09:30',
    content: 'Routine Blood Test',
    status: 'Completed',
  },
  {
    time: '2024-02-05 09:30',
    content: 'X-Ray',
    status: 'Not Attended',
  },
  {
    time: '2024-02-01 09:30',
    content: 'Routine Blood Test',
    status: 'Completed',
  },
  {
    time: '2024-01-01 09:30',
    content: 'Routine Blood Test',
    status: 'Completed',
  },
  // 更多测试数据...
];

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
        <Link color="primary" href="/patient/records/healthtest" sx={{ mt:13 }}>
          See More Health Test
        </Link>
      </DashboardCard>
  );
};

export default RecentHealthTest;
