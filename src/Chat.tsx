import { useRef, useEffect } from "react";
import { Box, IconButton, Avatar, Typography } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import { IChat } from "./interfaces";

export interface ChatProps {
  chat: IChat;
  listening: boolean;
  micDisabled: boolean;
  onMicClick: () => void;
  onMicStop: () => void;
}

export default function Chat({
  chat,
  listening,
  micDisabled,
  onMicClick,
  onMicStop,
}: ChatProps) {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #ccc",
        borderRadius: 2,
        flexGrow: 1,
        overflow: "hidden",
      }}
    >
      {/* Chat display area */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          backgroundColor: "#fafafa",
        }}
      >
        {chat.map((msg, i) => (
          <Box
            key={i}
            display="flex"
            flexDirection={msg.role === "user" ? "row" : "row-reverse"}
            alignItems="flex-start"
            mb={2}
          >
            <Avatar
              sx={{
                bgcolor: msg.role === "user" ? "success.main" : "primary.main",
                mx: 1,
              }}
            >
              {msg.role === "user" ? "U" : "A"}
            </Avatar>
            <Box
              sx={{
                bgcolor: msg.role === "user" ? "#e8f5e9" : "#e3f2fd",
                p: 1.5,
                borderRadius: 2,
                maxWidth: "50%",
                wordBreak: "break-word",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography variant="body2">{msg.content}</Typography>
              {msg.audio && (
                <audio
                  style={{ width: "100%" }}
                  controls
                  src={msg.audio}
                  autoPlay
                >
                  Your browser does not support the audio element.
                </audio>
              )}
            </Box>
          </Box>
        ))}
        <div ref={chatEndRef} />
      </Box>

      {/* Mic-only input */}
      <Box
        sx={{
          borderTop: "1px solid #ccc",
          p: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <IconButton
          onClick={listening ? onMicStop : onMicClick}
          color={listening ? "error" : "primary"}
          size="large"
          disabled={micDisabled}
        >
          {listening ? (
            <StopIcon fontSize="large" />
          ) : (
            <MicIcon fontSize="large" />
          )}
        </IconButton>
      </Box>
    </Box>
  );
}
