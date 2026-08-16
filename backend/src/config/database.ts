import mongoose from 'mongoose';

let isConnected = false;

function sanitizeMongoUri(rawUri: string): string {
  let cleaned = rawUri.trim();
  // Strip surrounding quotes if present
  if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
    cleaned = cleaned.slice(1, -1).trim();
  }

  // Handle common Atlas copy-paste error where user kept <password> with brackets or whitespace
  // Example: mongodb+srv://user:<password >@cluster... -> mongodb+srv://user:password@cluster...
  cleaned = cleaned.replace(/:\s*<([^>]+)>\s*@/, (_, pwd) => `:${encodeURIComponent(pwd.trim())}@`);

  return cleaned;
}

export async function connectDatabase(): Promise<boolean> {
  const rawUri = process.env.MONGODB_URL || process.env.MONGODB_URI;

  if (!rawUri || rawUri.trim() === '') {
    console.warn(
      '[MongoDB] MONGODB_URL / MONGODB_URI environment variable is not defined. Running in unconfigured database mode.'
    );
    isConnected = false;
    return false;
  }

  const uri = sanitizeMongoUri(rawUri);

  if (isConnected && mongoose.connection.readyState === 1) {
    return true;
  }

  try {
    console.log('[MongoDB] Connecting to MongoDB Atlas...');
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log('[MongoDB] Successfully connected to database:', mongoose.connection.name);

    mongoose.connection.on('error', (err) => {
      console.error('[MongoDB] Connection error event:', err);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[MongoDB] Connection disconnected.');
      isConnected = false;
    });

    mongoose.connection.on('reconnected', () => {
      console.log('[MongoDB] Connection re-established.');
      isConnected = true;
    });

    return true;
  } catch (error) {
    console.error('[MongoDB] Failed to connect to MongoDB Atlas:', error);
    isConnected = false;
    return false;
  }
}

export function isDatabaseConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

export function getDatabaseState(): {
  connected: boolean;
  state: string;
  name?: string;
  host?: string;
} {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const stateCode = mongoose.connection.readyState;
  return {
    connected: stateCode === 1,
    state: states[stateCode] || 'unknown',
    name: mongoose.connection.name,
    host: mongoose.connection.host,
  };
}
