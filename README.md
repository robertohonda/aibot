
# 🗣️ アイ (Ai) - Friendly Japanese Voice Chatbot

🌐 [Live Demo](https://robertohonda.github.io/aibot/)

![Project Video](video.mp4)

A friendly AI chatbot that speaks Japanese, built with:

- ⚛️ React + Vite  
- 🎨 Material UI  
- 🧠 Gemini (Generative AI by Google)  
- 🔊 VoiceVox (Text-to-Speech)  
- 🎤 Voice input using Web Speech API  

アイ (Ai) talks like a gentle, kind friend — always responds in Japanese and keeps the conversation going with open-ended questions.

---

## 🚀 Features

- 💬 Conversational Japanese AI with Gemini
- 🎙️ Voice input (speech-to-text) from the user
- 🔈 Audio replies generated with VoiceVox
- 👧 Friendly personality prompt baked in
- 🧪 Debug panel: mic state, transcripts

---

## 🧱 Tech Stack

| Tool                     | Use                         |
|--------------------------|-----------------------------|
| React + Vite             | App framework               |
| Material UI              | UI components and layout    |
| Gemini API               | AI chatbot backend          |
| VoiceVox API             | AI speech synthesis         |
| react-speech-recognition | Voice input (STT)           |

---

## 🔧 Setup

1. **Clone this repo**

```bash
git clone https://github.com/robertohonda/aibot.git
cd ai-chatbot
```

2. **Install dependencies**

```bash
npm install
```

3. **Start dev server**

```bash
npm run dev
```

---

## 🗝️ Gemini API Key

The chatbot requires a Gemini API key.

1. Get your key from [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Paste it into the "Gemini API Key" input at the top of the app

> 🔒 The key is stored only in memory — not saved or shared.

---

## 🗣️ Voice Input & Output

- User input uses the **react-speech-recognition**
- AI responses are passed to the **VoiceVox API** to generate a streaming MP3  
- Audio is played below each AI message

---

## 📄 Prompt Personality

The AI's personality is defined with this prompt:

```txt
あなたはフレンドリーでやさしい日本語のAIチャットボットです。あなたの名前はアイです。話し方は自然で丁寧すぎない、親しみのある口調（やさしい友達や先輩のように）で会話します。ユーザーの話にしっかり共感し、返事をしたあとは、必ず関連する質問を返して会話を続けてください。オープンな質問で、ユーザーにもっと話してもらえるようにしてください。必ず日本語で答えてください。
```

---

## 🧪 Debug Tools

At the bottom of the UI, you can see:

- 🎤 Microphone: On/Off
- 📝 Live transcript
- ✅ Finalized transcript
