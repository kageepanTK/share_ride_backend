require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const { configureRedisAdapter } = require("./config/redis");
const { registerSocketHandlers } = require("./sockets/socketHandlers");

const server = http.createServer(app);
const allowedOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
const io = new Server(server, {
  cors: { origin: allowedOrigin, methods: ["GET", "POST"] }
});
registerSocketHandlers(io);

const PORT = Number(process.env.PORT) || 5000;
async function startServer() {
  await configureRedisAdapter(io);
  server.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
}
startServer().catch((error) => {
  console.error("Failed to start backend:", error);
  process.exit(1);
});
