// src/server.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

app.post('/ollama', async (req, res) => {
    const ollamaResponse = await axios.post('http://localhost:11434/api/generate', {
        model: "mistral",
        prompt: req.body.message,
        context: req.body.context,
        stream: false
    });
    res.json({ message: ollamaResponse.data.response, context: ollamaResponse.data.context });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

