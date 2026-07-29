# AI Code Generator

A full-stack AI code generator that turns a user prompt into a plain HTML, CSS, and JavaScript web app. The React client sends prompts to an Express server, and the server streams generated code back from an AI model.

## Features

- Prompt improvement before code generation
- Streaming AI responses
- Generated output split into HTML, CSS, and JavaScript
- Live preview using Sandpack
- Download generated code as a zip file

## Project Structure

```text
.
├── client/   # React + Vite frontend
└── server/   # Express API server
```

## Requirements

- Node.js
- npm
- An AI API key

## Setup

Install dependencies for both apps:

```bash
cd server
npm install

cd ../client
npm install
```

Create `server/.env`:

```env
OPENAI_API_KEY=your_api_key_here
PORT=3000
```

## Run Locally

Start the server:

```bash
cd server
npm run dev
```

Start the client in a second terminal:

```bash
cd client
npm run dev
```

The server runs on `http://localhost:3000`. The Vite client will print its local URL in the terminal, usually `http://localhost:5173`.

## Scripts

Server:

```bash
npm run dev
npm start
```

Client:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```
