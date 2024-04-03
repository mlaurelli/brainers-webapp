import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { v4 as uuidv4 } from 'uuid'
import { ConversationType } from '@/components/chat/chatbox'
import { AiGirlfriend } from '@/models/ai-girlfriend'

export async function openDB() {
  return open({
    filename: './sqlitedb.db',
    driver: sqlite3.Database,
  })
}

// ---------------- Conversations

export async function getConversations(userId: string) {
  const db = await openDB()
  return await db.all(`
  SELECT c.*
  FROM Conversations c
  where c.UserID = ? 
  ORDER BY c.CreatedAT DESC`, userId)
}

export async function getConversationWithMessages(conversationId: string, userId: string) {
  const models = AiGirlfriend.map(model => model.id)
  const db = await openDB()
  const conversationRecord = await db.all(`
    SELECT c.*
    FROM Conversations c
    where c.ConversationID = ? and c.UserID = ?`, conversationId, userId)

  const data = await db.all(`
    SELECT m.*
    FROM Messages m 
    where m.ConversationID = ? `, conversationId)

  let conversation: ConversationType[] | null = null

  const girlfriend = AiGirlfriend.filter(model => model.id == conversationRecord[0].ModelID)[0]

  conversation = data.map(message => {
    return {
      type: models.includes(message.UserOrModelID) ? "in" : "out",
      text: message.MessageText,
      image: message.MessageImage,
      avatar: models.indexOf(message.UserOrModelID) === -1 ? "/dist/media/img/avatar6.jpg" : girlfriend.avatar,
      name: models.includes(message.UserOrModelID) ? girlfriend.id : "me"
    }
  })

  return { conversation, modelId: girlfriend.id, conversationId }
}

export async function newConversationForUser(conversationId: string, modelId: string, userId: string) {
  const db = await openDB()

  await db.run(`INSERT INTO Conversations (ConversationID, UserID, ModelID) 
    VALUES (?, ?, ?) ON CONFLICT(ConversationID) DO NOTHING`, conversationId, userId, modelId);
}

export async function deleteConversationForUser(conversationId: string, userId: string) {
  const db = await openDB()

  await db.run(`DELETE 
  FROM Messages 
  WHERE ConversationID = ? 
  AND ConversationID IN (SELECT ConversationID FROM Conversations WHERE ConversationID = ? AND UserID = ?)`, conversationId, conversationId, userId)
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

// ---------------- Subscriptions

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

export async function setSubscriptionForCustomer(customerId: string, subscriptionId: string, sessionId: string) {

  const db = await openDB()

  await db.run("UPDATE users SET payment_customer_id = ?, payment_subscription_id = ? where payment_session_id = ?", customerId, subscriptionId, sessionId)
  const userData = await db.all('SELECT * FROM users where payment_session_id = ?', sessionId)
  await db.run("UPDATE SubscriptionsUsage SET SubscriptionID = 'PRO_TIER', EndSubscription = DATE(CURRENT_TIMESTAMP, '1 month') WHERE UserID = ?", userData[0].id)
}

// ---------------- Users

export async function upsertUser(userEmail: string, nickname: string) {

  const db = await openDB()

  await db.run("INSERT INTO users (id, user_email, nickname, payment_session_id, payment_customer_id, payment_subscription_id) VALUES (?, ?, ?, '', '', '') ON CONFLICT(id) DO NOTHING",
    userEmail, userEmail, nickname)
  await db.run("INSERT INTO SubscriptionsUsage (UserID, SubscriptionID, MessagesUsed, ImagesUsed, AudioUsed, EndSubscription) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(UserID) DO NOTHING",
    userEmail, process.env.FREE_TIER_ID!, 0, 0, 0, null)
}

export async function getUserData(userId: string) {

  const db = await openDB()

  return await db.all('SELECT * FROM users where id = ?', userId)
}

export async function updateUserSession(sessionId: string, userId: string) {

  const db = await openDB()

  await db.run("UPDATE users SET payment_session_id = ? WHERE id = ?", sessionId, userId)
}

