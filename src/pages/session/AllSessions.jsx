import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosConfig";

const SessionsListPage = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get("/sessions");
        setSessions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const handleSessionClick = (sessionId) => {
    navigate(`/sessions/${sessionId}`);
  };

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          جميع المحاضرات
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <List>
            {sessions.map((session) => (
              <ListItem
                button
                key={session.id}
                onClick={() => handleSessionClick(session.id)}
              >
                <ListItemText
                  primary={`الجلسة بتاريخ ${session.date} ووقت ${session.time}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
};

export default SessionsListPage;
