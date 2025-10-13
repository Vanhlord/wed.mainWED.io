export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { content } = req.body;

  // 🔒 Token và Channel ID đọc từ biến môi trường
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHANNEL_ID = process.env.CHANNEL_ID;

  const response = await fetch(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages`, {
    method: "POST",
    headers: {
      "Authorization": `Bot ${BOT_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  const data = await response.json();
  res.status(200).json(data);
}
