/**
 * Telegram Integration Module
 * Handles sending notifications to Telegram chat
 */

// Configuration from environment variables
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

// Data type definition
export interface ContactData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date?: string;
}

export interface PropertyInquiryData {
  customer: {
    name: string;
    email: string;
    phone: string;
    interest?: string;
  };
  property: {
    title?: string;
    id?: string;
  };
  message: string;
  date?: string;
}

/**
 * Main function to send a contact message to Telegram
 * @param data - Contact or inquiry data
 * @returns Promise<boolean> - true if sent successfully, false otherwise
 */
export const sendToTelegram = async (
  data: ContactData | PropertyInquiryData
): Promise<boolean> => {
  // Check if bot token and chat ID are configured
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram bot not configured. Message not sent to Telegram.');
    return false;
  }

  try {
    // Format the message based on data type
    let message: string;
    if ('subject' in data) {
      message = formatContactMessage(data as ContactData);
    } else {
      message = formatPropertyInquiryMessage(data as PropertyInquiryData);
    }

    // Send message to Telegram
    const response = await fetch(
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

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API error:', errorData);
      return false;
    }

    console.log('Message sent to Telegram successfully');
    return true;
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return false;
  }
};

/**
 * Format contact form message for Telegram
 */
const formatContactMessage = (data: ContactData): string => {
  const messageDate = data.date
    ? new Date(data.date).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    : new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });

  const message = `
📧 <b>NEW CONTACT MESSAGE - VIRTUAL VIEW ESTATE</b> 📧

📅 <b>Date:</b> ${messageDate}

👤 <b>SENDER INFORMATION:</b>
• <b>Name:</b> ${data.name}
• <b>Email:</b> ${data.email}
• <b>Phone:</b> ${data.phone}

📝 <b>Subject:</b> ${data.subject}

💬 <b>MESSAGE:</b>
${data.message}

━━━━━━━━━━━━━━━━━━━━
⚡️ Please respond to this inquiry as soon as possible!
  `.trim();

  return message;
};

/**
 * Format property inquiry message for Telegram
 */
const formatPropertyInquiryMessage = (data: PropertyInquiryData): string => {
  const messageDate = data.date
    ? new Date(data.date).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    : new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });

  const message = `
🏠 <b>NEW PROPERTY INQUIRY - VIRTUAL VIEW ESTATE</b> 🏠

📅 <b>Date:</b> ${messageDate}

👤 <b>CUSTOMER INFORMATION:</b>
• <b>Name:</b> ${data.customer.name}
• <b>Email:</b> ${data.customer.email}
• <b>Phone:</b> ${data.customer.phone}
${data.customer.interest ? `• <b>Interest:</b> ${data.customer.interest}` : ''}

🏘️ <b>PROPERTY:</b>
${data.property.title ? `• <b>Title:</b> ${data.property.title}` : ''}
${data.property.id ? `• <b>ID:</b> ${data.property.id}` : ''}

💬 <b>INQUIRY MESSAGE:</b>
${data.message}

━━━━━━━━━━━━━━━━━━━━
⚡️ Please follow up with this inquiry as soon as possible!
  `.trim();

  return message;
};

/**
 * Test Telegram connection
 * Verifies bot token is valid by calling getMe endpoint
 */
export const testTelegramConnection = async (): Promise<boolean> => {
  if (!TELEGRAM_BOT_TOKEN) {
    console.error('Telegram bot token not configured');
    return false;
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`
    );
    const data = await response.json();

    if (data.ok) {
      console.log('Telegram bot connection successful:', data.result);
      return true;
    } else {
      console.error('Telegram bot connection failed:', data);
      return false;
    }
  } catch (error) {
    console.error('Error testing Telegram connection:', error);
    return false;
  }
};

/**
 * Helper function to display configuration instructions
 */
export const configureTelegramBot = (botToken: string, chatId: string) => {
  console.log('To configure the Telegram bot:');
  console.log('1. Add to .env file:');
  console.log(`   VITE_TELEGRAM_BOT_TOKEN=${botToken}`);
  console.log(`   VITE_TELEGRAM_CHAT_ID=${chatId}`);
  console.log('2. Restart your development server');
};
