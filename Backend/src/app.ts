import express from 'express';
import cors from 'cors';
import { IProject } from './models/project.interface';
import { v4 as uuid } from 'uuid';
import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';

const app = express();
const PORT = 3000;
// List of projects
const projects: IProject[] = [];
// Chat messages
const chatHistory: string[] = [];

// Setup cors and express.json()
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');

  // Send history to new client
  ws.send(JSON.stringify(chatHistory));

  ws.on('message', (message: string) => {
    const parsedMessage = message.toString();
    console.log('received: %s', parsedMessage);
    chatHistory.push(parsedMessage);
    
    // Broadcast message to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify([parsedMessage]));
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

app.get('/', (_req, res) => {
  res.send('Errgo Backend Interview Module Loaded Successfully!');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.post('/projects', (req, res) => {
  /**
   * TODO: Complete the method for creating a new project
   * The response should contain an object of type IProject
   * 
   * Hint: Utilize the `projects` to store the newly generated of project
   * Hint: Utilize the `uuid` npm package to generate the unique ids for the project
   */
  const { project } = req.body;
  if (!project || !project.name || !project.description) {
    return res.status(400).json({ message: 'Project name and description are required' });
  }

  const newProject: IProject = {
    id: uuid(),
    name: project.name,
    description: project.description
  };

  projects.push(newProject);
  res.status(201).json(newProject);
});

app.get('/projects', (req, res) => {
  /**
   * TODO: Complete the method for returning the current list of projects
   * The responese should contain a list of IProject
   * 
   * Hint: Utilize the `projects` to retrieve the list of projects
   */
  res.status(200).json(projects);
});