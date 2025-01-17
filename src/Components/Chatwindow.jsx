import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Chatwindow = () => {
  const theme = useTheme();

  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    return storedMessages ? JSON.parse(storedMessages) : [];
  });
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, sender: "You" }];
      setMessages(newMessages);
      setInput(""); 
      localStorage.setItem("chatMessages", JSON.stringify(newMessages));
    }
  };

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: "auto",
        mt: 5,
        p: 3,
        borderRadius: 4,
        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#F4F4F4",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        animation: "fadeIn 1s ease-in-out",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          color: theme.palette.grey[700],
          fontWeight: "bold",
          textShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        Chat Window
      </Typography>

      <Paper
        elevation={6}
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: 2,
          borderRadius: 4,
          backgroundColor: "#ffffff",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <List>
          {messages.map((message, index) => (
            <ListItem
              key={index}
              sx={{
                mb: 1,
                width:'50%',
                display: "flex",
                justifyContent: message.sender === "You" ? "flex-end" : "flex-start",
              }}
            >
              <ListItemText
                sx={{
                  maxWidth: "100%",
                  padding: 1.5,
                  borderRadius: 3,
                  backgroundColor: message.sender === "You" ? "#4caf50" : "#1976d2",
                  color: "white",
                  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
                  wordWrap: "break-word",
                  fontWeight: "bold",
                  textAlign: message.sender === "You" ? "right" : "left",
                }}
                primary={message.sender}
                secondary={message.text}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              padding: "0 16px",
            },
          }}
        />
       <Button
          variant="contained"
          color="primary"
          onClick={handleSend}
          sx={{ whiteSpace: "nowrap" }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chatwindow;



