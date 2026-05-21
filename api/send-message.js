export default async function handler(req, res) {
  // Проверяем, что запрос был методом POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;
  const BOT_TOKEN = process.env.BOT_TOKEN; // Токен берется из настроек Vercel
  const CHAT_ID = 5737961034; // Ваш ID, который мы использовали в HTML

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: text })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
}
