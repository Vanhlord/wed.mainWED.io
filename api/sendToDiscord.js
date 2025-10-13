// /api/sendToDiscord.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { content } = req.body;
  const TOKEN = process.env.TOKEN;
  const CHANNEL = process.env.CHANNEL;

  const response = await fetch(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages`, {
    method: "POST",
    headers: {
      "Authorization": `Bot ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  const data = await response.json();
  res.status(200).json(data);
}
