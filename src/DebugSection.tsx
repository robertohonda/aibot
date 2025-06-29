import { Stack, Typography } from "@mui/material";

export interface DebugSectionProps {
  listening: boolean;
  transcript: string;
  finalTranscript: string;
  lastTranscript: string;
  prompt: string;
}

const DebugSection = ({
  listening,
  transcript,
  finalTranscript,
  lastTranscript,
  prompt,
}: DebugSectionProps) => (
  <Stack sx={{ gap: 0.5, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
    <Typography variant="subtitle1">
      <strong>Debug Section</strong>
    </Typography>

    <Typography variant="body2">
      Microphone: <strong>{listening ? "On" : "Off"}</strong>
    </Typography>

    <Typography variant="body2">
      Transcript: <span>{transcript}</span>
    </Typography>

    <Typography variant="body2">
      Final Transcript: <span>{finalTranscript}</span>
    </Typography>

    <Typography variant="body2">
      Last Handled Transcript: <span>{lastTranscript}</span>
    </Typography>

    <Typography variant="body2">
      Prompt: <span>{prompt}</span>
    </Typography>
  </Stack>
);

export default DebugSection;
