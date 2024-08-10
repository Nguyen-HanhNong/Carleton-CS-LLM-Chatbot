"use client";
import { Box, Button, Stack, TextField } from "@mui/material";

import Chatbox from "./components/chat";

import { ResponsiveAppBar } from "./components/appbar";

export default function Home() {
  return (
    <Box>
      <ResponsiveAppBar />
      <br />
      <Chatbox />
    </Box>
  );
}
