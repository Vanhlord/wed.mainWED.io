export default function handler(req, res) {
  // giả lập thông tin server Minecraft
  const status = {
    onlinePlayers: 42,
    maxPlayers: 100,
    tps: 19.9
  };
  res.status(200).json(status);
}

