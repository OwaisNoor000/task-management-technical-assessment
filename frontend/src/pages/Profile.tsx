import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import withAuth from '../hooks/withAuth';
import TaskComponents from '../components/TaskComponents';

const Profile: React.FC = () => {
  return (
    <Container maxWidth={false} sx={{ mt: 4 }}>
      <Box>
        <Typography variant="h3" sx={{ textAlign: "center" }} gutterBottom>
          Task Management Platform
        </Typography>
        <TaskComponents />
      </Box>
    </Container>
  );
};

export default withAuth(Profile);
