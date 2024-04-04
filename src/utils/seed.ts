import * as client from './db'

async function setup() {

  const freePlan = {
    FREE_TIER_ID: "FREE_TIER",
    FREE_TIER_MESSAGES: 5,
    FREE_TIER_IMAGES: 2,
    FREE_TIER_AUDIO: 1
  }

  const proPlan = {
    PRO_TIER_ID: "PRO_TIER",
    PRO_TIER_MESSAGES: 1000,
    PRO_TIER_IMAGES: 1000,
    PRO_TIER_AUDIO: 1000
  }

  // Open SQLite connection
  const db = client.openDB()

  // Define table schema
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(36) PRIMARY KEY, 
      user_email VARCHAR(255) NOT NULL, 
      nickname VARCHAR(255) NOT NULL, 
      payment_session_id TEXT, 
      payment_customer_id TEXT, 
      payment_subscription_id TEXT  
    );
  `, ((err, _result) => {
    if (err) throw err
  }))

  await db.execute(`
    CREATE TABLE IF NOT EXISTS Conversations (
      ConversationID VARCHAR(36) PRIMARY KEY,
      UserID VARCHAR(255),
      ModelID VARCHAR(255),
      CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (UserID) REFERENCES users (id)
  ); 
  `, ((err, _result) => {
    if (err) throw err
  }))

  await db.execute(`
    -- Creazione della tabella Messaggi
    CREATE TABLE IF NOT EXISTS Messages (
        MessageID VARCHAR(36) PRIMARY KEY,
        ConversationID VARCHAR(36),
        UserOrModelID VARCHAR(255),
        MessageText TEXT,
        MessageImage TEXT,
        SentAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ConversationID) REFERENCES Conversations (ConversationID)
    );
  `, ((err, _result) => {
    if (err) throw err
  }))

  await db.execute(`
    -- Creazione della tabella Sottoscrizioni
    CREATE TABLE IF NOT EXISTS Subscriptions (
        SubscriptionID VARCHAR(36) PRIMARY KEY,
        MessagesLimit INT,
        ImagesLimit INT,
        AudioLimit INT,
        Period VARCHAR(255) DEFAULT 'MONTHLY'
    );
  `, ((err, _result) => {
    if (err) throw err
  }))

  // Insert Subscriptions data
  // FREE TIER
  await db.execute(
    `INSERT IGNORE INTO Subscriptions (SubscriptionID, MessagesLimit, ImagesLimit, AudioLimit, Period) 
    VALUES ('${freePlan.FREE_TIER_ID}',
       ${freePlan.FREE_TIER_MESSAGES},
       ${freePlan.FREE_TIER_IMAGES}, 
       ${freePlan.FREE_TIER_AUDIO}, 
       'TOTAL');
    `
    , ((err, _result) => {
      if (err) throw err
    }))

  // PRO TIER
  await db.execute(
    `INSERT IGNORE INTO Subscriptions (SubscriptionID, MessagesLimit, ImagesLimit, AudioLimit, Period) 
    VALUES ('${proPlan.PRO_TIER_ID}', 
      ${proPlan.PRO_TIER_MESSAGES}, 
      ${proPlan.PRO_TIER_IMAGES}, 
      ${proPlan.PRO_TIER_AUDIO}, 
      'MONTHLY');`
    , ((err, _result) => {
      if (err) throw err
    }))

  await db.execute(`
    -- Creazione della tabella UsoSottoscrizioni
    CREATE TABLE IF NOT EXISTS SubscriptionsUsage (
        UserID VARCHAR(36) PRIMARY KEY,
        SubscriptionID VARCHAR(36),
        MessagesUsed INT DEFAULT 0,
        ImagesUsed INT DEFAULT 0,
        AudioUsed INT DEFAULT 0,
        EndSubscription DATETIME,
        CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (UserID) REFERENCES users (id),
        FOREIGN KEY (SubscriptionID) REFERENCES Subscriptions (SubscriptionID)
    );
  `, ((err, _result) => {
    if (err) throw err
  }))

  // Close connection
  client.closeDB(db)
}

setup()
  .catch(err => {
    console.error(err)
  })  