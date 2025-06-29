import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Chat from "./Chat";
import { IChat } from "./interfaces";
import { CssBaseline, Stack, TextField } from "@mui/material";
import DebugSection from "./DebugSection";

const prompt =
  "あなたはフレンドリーでやさしい日本語のAIチャットボットです。あなたの名前はアイです。話し方は自然で丁寧すぎない、親しみのある口調（やさしい友達や先輩のように）で会話します。ユーザーの話にしっかり共感し、返事をしたあとは、必ず関連する質問を返して会話を続けてください。オープンな質問で、ユーザーにもっと話してもらえるようにしてください。必ず日本語で答えてください。";

const App = () => {
  const {
    transcript,
    listening,
    finalTranscript,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  const [geminiKey, setGeminiKey] = useState("");
  const [lastTranscript, setLastTranscript] = useState("");
  const [chat, setChat] = useState<IChat>([]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  useEffect(() => {
    const handle = async () => {
      const message = "こんにちは！アイだよ｡今日はどんな話をしようか？";

      // Voicevox
      const url =
        "https://api.tts.quest/v3/voicevox/synthesis?" +
        new URLSearchParams({
          speaker: "0",
          text: message,
        }).toString();
      const res = await fetch(url);
      const json = await res.json();

      // Update UI
      const audio = json.mp3StreamingUrl;
      setChat([{ role: "ai", content: message, audio }]);
    };

    handle();
  }, []);

  useEffect(() => {
    const handle = async () => {
      if (listening || !finalTranscript || finalTranscript === lastTranscript)
        return;
      const updatedChat = [...chat, { role: "user", content: finalTranscript }];
      setChat(updatedChat as IChat);

      // AI
      const model = new ChatGoogleGenerativeAI({
        apiKey: geminiKey,
        model: "gemini-2.0-flash-lite",
        temperature: 1,
        maxOutputTokens: 128,
      });
      const modelResponse = await model.invoke([
        { role: "system", content: prompt },
        ...updatedChat,
      ]);
      const content = modelResponse.content as string;
      console.log("model response:", modelResponse);

      // Voicevox
      const url =
        "https://api.tts.quest/v3/voicevox/synthesis?" +
        new URLSearchParams({
          speaker: "0",
          text: content,
        }).toString();
      const res = await fetch(url);
      const json = await res.json();
      console.log("Voicevox response:", json);

      // Update UI
      const audio = json.mp3StreamingUrl;
      setChat([...(updatedChat as IChat), { role: "ai", content, audio }]);

      // Clean up
      setLastTranscript(finalTranscript);
      resetTranscript();
    };

    handle();
  }, [listening, finalTranscript, lastTranscript]);

  return (
    <>
      <CssBaseline />
      <Stack spacing={1} p={2} height="100vh">
        <TextField
          label="Gemini API Key"
          variant="outlined"
          fullWidth
          value={geminiKey}
          onChange={(e) => setGeminiKey(e.target.value)}
          required
        />
        <Chat
          chat={chat}
          listening={listening}
          micDisabled={!geminiKey}
          onMicClick={() =>
            SpeechRecognition.startListening({
              continuous: true,
              language: "ja",
              interimResults: false,
            })
          }
          onMicStop={SpeechRecognition.stopListening}
        />
        <DebugSection
          listening={listening}
          transcript={transcript}
          finalTranscript={finalTranscript}
          lastTranscript={lastTranscript}
          prompt={prompt}
        />
      </Stack>
    </>
  );
};

export default App;
