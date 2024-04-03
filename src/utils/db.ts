import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { v4 as uuidv4 } from 'uuid'
import { ConversationType } from '@/components/chat/chatbox'

export async function openDB() {
  return open({
    filename: './sqlitedb.db',
    driver: sqlite3.Database,
  })
}

export async function saveMessage(message: ConversationType, userId: string, modelId: string, conversationId: string) {
  const db = await openDB()
  const userOrModelID = message.type === 'in' ? modelId : userId

  const messageID = uuidv4()
  await db.run(`INSERT INTO messages (
      MessageID,
      ConversationID,
      UserOrModelID,
      MessageText,
      MessageImage
    ) VALUES (?, ?, ?, ?, ?) ON CONFLICT(MessageID) DO NOTHING`, messageID, conversationId, userOrModelID, message.text, message.image)
}

export async function updateMessageUsage(userId: string) {
  const db = await openDB();

  // update usage 
  await db.run(`UPDATE SubscriptionsUsage SET MessagesUsed = MessagesUsed + 1 WHERE UserID = ?`, userId)
}

export async function updateImageUsage(userId: string) {
  const db = await openDB();

  // update usage 
  await db.run(`UPDATE SubscriptionsUsage SET ImagesUsed = ImagesUsed + 1 WHERE UserID = ?`, userId)
}

export async function updateAudioUsage(userId: string) {
  const db = await openDB();

  // update usage 
  await db.run(`UPDATE SubscriptionsUsage SET AudioUsed = AudioUsed + 1 WHERE UserID = ?`, userId)
}

export async function getSubscriptionUsageData(userId: string) {

  const db = await openDB()

  // get usage and limit 
  return await db.all(`Select 
    su.SubscriptionID, 
    su.MessagesUsed, s.MessagesLimit,
    su.ImagesUsed, s.ImagesLimit,
    su.AudioUsed, s.AudioLimit,
    su.EndSubscription
    FROM SubscriptionsUsage su
    JOIN Subscriptions s ON s.SubscriptionID = su.SubscriptionID  
    WHERE su.UserID = ?`, userId)
}

export async function updateSubscriptionForCustomer(customerId: string) {

  const db = await openDB()

  const userData = await db.all('SELECT * FROM users where payment_customer_id = ?', customerId)
  await db.run("UPDATE SubscriptionsUsage SET EndSubscription = DATE(CURRENT_TIMESTAMP, '1 month') WHERE UserID = ?", userData[0].id)
}