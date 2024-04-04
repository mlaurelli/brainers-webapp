import mysql, { Connection, ConnectionOptions, Pool, RowDataPacket } from 'mysql2'
import { v4 as uuidv4 } from 'uuid'
import { ConversationType } from '@/components/chat/chatbox'
import { AiGirlfriend } from '@/models/ai-girlfriend'

export function openDB(): Connection {

  const access: ConnectionOptions = {
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    // debug: true
  }
  let conn = mysql.createConnection(access)

  conn.connect()

  return conn
}

export function closeDB(connection: Connection) {
  connection.end()
}

// // ---------------- Conversations

export async function getConversations(userId: string) {
  const db = openDB()
  return new Promise<RowDataPacket[]>((resolve, reject) => {
    db.query<RowDataPacket[]>(`SELECT c.*
      FROM Conversations c
      where c.UserID = ? 
      ORDER BY c.CreatedAT DESC`, [userId], (err, res) => {
      if (err) throw (err)
      else resolve(res)
    })
  })
}

export async function getConversationWithMessages(conversationId: string, userId: string): Promise<{ conversation: ConversationType[], modelId: string, conversationId: string }> {
  const models = AiGirlfriend.map(model => model.id)
  const db = openDB()
  let conversationRecord: RowDataPacket[]
  let conversation: ConversationType[] | null = null

  return new Promise((resolve, reject) => {
    db.query<RowDataPacket[]>(`
    SELECT c.*
    FROM Conversations c
    where c.ConversationID = ? and c.UserID = ?`, [conversationId, userId], (err, result) => {
      if (err) {
        console.error(err)
        throw err
      }
      conversationRecord = result

      const girlfriend = AiGirlfriend.filter(model => model.id == conversationRecord[0].ModelID)[0]

      db.query<RowDataPacket[]>(`
    SELECT m.*
    FROM Messages m 
    where m.ConversationID = ? order by SentAt asc`, [conversationId], (err, result) => {
        if (err) {
          console.error(err)
          throw err
        }

        conversation = result.map(message => {
          return {
            type: models.includes(message.UserOrModelID) ? "in" : "out",
            text: message.MessageText,
            image: message.MessageImage,
            avatar: models.indexOf(message.UserOrModelID) === -1 ? "/dist/media/img/avatar6.jpg" : girlfriend.avatar,
            name: models.includes(message.UserOrModelID) ? girlfriend.id : "me"
          } as ConversationType
        })

        resolve({ conversation, modelId: girlfriend.id, conversationId })
      })
    })
  })
}

export async function newConversationForUser(conversationId: string, modelId: string, userId: string) {
  const db = openDB()

  db.query(`INSERT IGNORE INTO Conversations (ConversationID, UserID, ModelID) 
    VALUES (?, ?, ?)`, [conversationId, userId, modelId], (err, result) => {
    if (err) {
      console.error(err)
      throw err
    }
  })
}

export async function deleteConversationForUser(conversationId: string, userId: string) {
  const db = openDB()

  db.query(`DELETE 
  FROM Messages 
  WHERE ConversationID = ? 
  AND ConversationID IN (SELECT ConversationID FROM Conversations WHERE ConversationID = ? AND UserID = ?)`,
    [conversationId, conversationId, userId], (err, result) => {
      if (err) {
        console.error(err)
        throw err
      }
    })
}

export async function saveMessage(message: ConversationType, userId: string, modelId: string, conversationId: string) {
  const db = await openDB()
  const userOrModelID = message.type === 'in' ? modelId : userId

  const messageID = uuidv4()
  db.query(`INSERT IGNORE INTO Messages (
      MessageID,
      ConversationID,
      UserOrModelID,
      MessageText,
      MessageImage
    ) VALUES (?, ?, ?, ?, ?)`,
    [messageID, conversationId, userOrModelID, message.text, message.image], (err, result) => {
      if (err) {
        console.error(err)
        throw err
      }
    })
}

// ---------------- Subscriptions

export async function updateMessageUsage(userId: string) {
  const db = openDB()

  // update usage 
  db.query(`UPDATE SubscriptionsUsage SET MessagesUsed = MessagesUsed + 1 WHERE UserID = ?`, [userId], (err, result) => {
    if (err) {
      console.error(err)
      throw err
    }
  })
}

export async function updateImageUsage(userId: string) {
  const db = openDB();

  // update usage 
  db.query(`UPDATE SubscriptionsUsage SET ImagesUsed = ImagesUsed + 1 WHERE UserID = ?`, [userId], (err, result) => {
    if (err) {
      console.error(err)
      throw err
    }
  })
}

export async function updateAudioUsage(userId: string) {
  const db = openDB();

  // update usage 
  db.query(`UPDATE SubscriptionsUsage SET AudioUsed = AudioUsed + 1 WHERE UserID = ?`, [userId], (err, result) => {
    if (err) {
      console.error(err)
      throw err
    }
  })
}

export async function getSubscriptionUsageData(userId: string) {

  const db = openDB()

  // get usage and limit 
  return new Promise<RowDataPacket[]>((resolve, reject) => {
    db.query<RowDataPacket[]>(`Select 
    su.SubscriptionID, 
    su.MessagesUsed, s.MessagesLimit,
    su.ImagesUsed, s.ImagesLimit,
    su.AudioUsed, s.AudioLimit,
    su.EndSubscription
    FROM SubscriptionsUsage su
    JOIN Subscriptions s ON s.SubscriptionID = su.SubscriptionID  
    WHERE su.UserID = ?`, [userId], (err, result) => {
      if (err) {
        console.error(err)
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

export async function updateSubscriptionForCustomer(customerId: string) {
  const db = openDB()
  db.query<RowDataPacket[]>('SELECT * FROM users where payment_customer_id = ?', [customerId],
    (err, result) => {
      if (err) throw err
      const userData = result
      db.query("UPDATE SubscriptionsUsage SET EndSubscription = DATE_ADD(CURDATE(), INTERVAL 1 MONTH) WHERE UserID = ?", [userData[0].id], (err, result) => {
        if (err) {
          console.error(err)
          throw err
        }
      })
    })
}

export async function setSubscriptionForCustomer(customerId: string, subscriptionId: string, sessionId: string) {

  const db = openDB()

  db.query("UPDATE users SET payment_customer_id = ?, payment_subscription_id = ? where payment_session_id = ?", [customerId, subscriptionId, sessionId], (err, result) => {
    if (err) {
      console.error(err)
      throw err
    }
  })
  db.query<RowDataPacket[]>('SELECT * FROM users where payment_session_id = ?', [sessionId],
    (err, result) => {
      if (err) throw err
      const userData = result
      db.query("UPDATE SubscriptionsUsage SET SubscriptionID = 'PRO_TIER', EndSubscription = DATE_ADD(CURDATE(), INTERVAL 1 MONTH) WHERE UserID = ?", [userData[0].id], (err, result) => {
        if (err) {
          console.error(err)
          throw err
        }
      })
    })
}

// // ---------------- Users

export async function upsertUser(userEmail: string, nickname: string) {

  const db = openDB()

  db.query("INSERT IGNORE INTO users (id, user_email, nickname, payment_session_id, payment_customer_id, payment_subscription_id) VALUES (?, ?, ?, '', '', '')",
    [userEmail, userEmail, nickname], (err, result) => {
      if (err) {
        console.error(err)
        throw err
      }
    })
  db.query("INSERT IGNORE INTO SubscriptionsUsage (UserID, SubscriptionID, MessagesUsed, ImagesUsed, AudioUsed, EndSubscription) VALUES (?, ?, ?, ?, ?, ?)",
    [userEmail, process.env.FREE_TIER_ID!, 0, 0, 0, null], (err, result) => {
      if (err) {
        console.error(err)
        throw err
      }
    })
}

export async function getUserData(userId: string) {

  const db = openDB()

  return new Promise<RowDataPacket[]>((resolve, reject) => {
    db.query<RowDataPacket[]>(`SELECT * FROM users where id = '${userId}'`, (err, result) => {
      if (err) {
        console.error(err)
        reject(err)
      } else resolve(result)
    })
  })
}

export async function updateUserSession(sessionId: string, userId: string) {

  const db = openDB()

  db.query("UPDATE users SET payment_session_id = ? WHERE id = ?", [sessionId, userId], (err, result) => {
    if (err) {
      console.error(err)
      throw err
    }
  })
}

