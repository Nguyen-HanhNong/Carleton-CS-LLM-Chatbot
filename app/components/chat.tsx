"use client";
import { Box, Button, Stack, TextField } from "@mui/material";

import { useState } from "react";

export default function Chatbox() {
  const [messages, setMessages] = useState([
    {role: 'assistant', content: 'Hello! I am the Carleton Computer Science assistant. How can I help you today?'}
  ]);
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    setMessage('');
    setMessages([...messages, { role: 'student', content: message }, { role: 'assistant', content: '' }]);

    const response = await fetch('api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([...messages, { role: 'user', content: message}])
    })

    if (response.ok) {
      const data = await response.json();

      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1];
        let otherMessages = messages.slice(0, messages.length - 1);

        return [...otherMessages, { ...lastMessage, content: lastMessage.content + data.message }];
      });
    }
    else {
      throw new Error('Network response was not ok.');
    }
  }

  return (
    <Box width="100vw" height="100wh" display="flex" flexDirection="column" justifyContent="" alignItems="center">
      <Stack direction="column" width="600px" height="700px" border="1px solid black" p={2} spacing={3}>
        <Stack id="messages" direction="column" spacing={2} flexGrow={1} overflow="auto" maxHeight="100%">
          {messages.map((message, index) => (
            <Box key={index} display="flex" justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}>
              <Box
                bgcolor={message.role === 'assistant' ? 'primary.main' : "secondary.main"}
                color="white"
                borderRadius={16}
                p={3}
                sx={{ 
                  whiteSpace: 'pre-line',
                  border: '1px solid black',
                }}>
                  {message.content}
              </Box>
            </Box>
          ))} 
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField label="Message" value={message} onChange={(e) => setMessage(e.target.value)} fullWidth />
          <Button variant="contained" color="primary" onClick={sendMessage}>Send</Button>
        </Stack>
      </Stack>
    </Box>
  );
}