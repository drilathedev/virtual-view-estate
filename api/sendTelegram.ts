import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = request.body;

  // Get credentials from environment variables
  const TELEGRAM_BOT_TOKEN = process.env.VITE_TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.VITE_TELEGRAM_CHAT_ID;

  // Validate credentials
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('Telegram credentials not configured');
    return response.status(500).json({ error: 'Server configuration error' });
  }

  // Validate message
  if (!message) {
    return response.status(400).json({ error: 'Message is required' });
  }

  try {
    // Call Telegram API from server (token stays hidden)
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    const data = await telegramResponse.json();

    if (!telegramResponse.ok) {
      console.error('Telegram API error:', data);
      return response.status(400).json({ error: data.description });
    }

    return response.status(200).json({ success: true, messageId: data.result.message_id });
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return response.status(500).json({ error: 'Failed to send message' });
  }
}
