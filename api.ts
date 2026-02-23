
import { User, DesignHistoryItem, SupportTicket, ChatMessage, GeneratedAsset } from './types';

// Simulated DB delay
const delay = (ms: number = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Quality of Life: Image Compression Utility
const compressImage = (src: string, maxWidth: number = 1200, quality: number = 0.7): Promise<string> => {
  return new Promise((resolve) => {
    // If it's already a small base64 or not an image, just return it
    if (!src || (!src.startsWith('data:') && !src.startsWith('http'))) {
      return resolve(src);
    }

    const img = new Image();
    
    // Handle CORS for external URLs
    if (src.startsWith('http')) {
      img.crossOrigin = "anonymous";
    }

    img.src = src;
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        // This might still throw if the server doesn't support CORS
        resolve(canvas.toDataURL('image/jpeg', quality));
      } catch (e) {
        console.warn('Could not compress image due to security restrictions (CORS), using original.', e);
        resolve(src);
      }
    };
    img.onerror = () => resolve(src); // Fallback to original if error
  });
};

export const MockAPI = {
  // AUTH
  login: async (email: string, pass: string): Promise<User> => {
    await delay();
    if (email === "error@test.com") throw new Error("Invalid credentials");
    const user = { id: 'u1', name: 'Premium User', email, avatar: 'https://i.pravatar.cc/150?u=u1' };
    localStorage.setItem('auth_token', 'mock_jwt_token');
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  register: async (name: string, email: string, pass: string): Promise<User> => {
    await delay();
    const user = { id: Date.now().toString(), name, email, avatar: `https://i.pravatar.cc/150?u=${email}` };
    localStorage.setItem('auth_token', 'mock_jwt_token');
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // HISTORY
  getHistory: async (userId: string): Promise<DesignHistoryItem[]> => {
    await delay();
    const history = localStorage.getItem(`history_${userId}`);
    return history ? JSON.parse(history) : [];
  },

  saveDesign: async (userId: string, item: DesignHistoryItem): Promise<void> => {
    await delay(300);
    
    // Compress images before saving to save storage space
    const compressedBefore = await compressImage(item.beforeImage);
    const compressedAfter = await compressImage(item.afterImage);
    
    const compressedItem = {
      ...item,
      beforeImage: compressedBefore,
      afterImage: compressedAfter
    };

    const history = await MockAPI.getHistory(userId);
    // Limit history to last 5 items to prevent QuotaExceededError
    const updated = [compressedItem, ...history].slice(0, 5);
    try {
      localStorage.setItem(`history_${userId}`, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage quota exceeded, clearing oldest history item');
      localStorage.setItem(`history_${userId}`, JSON.stringify([compressedItem]));
    }
  },

  deleteDesign: async (userId: string, id: string): Promise<void> => {
    await delay(300);
    const history = await MockAPI.getHistory(userId);
    const updated = history.filter(i => i.id !== id);
    localStorage.setItem(`history_${userId}`, JSON.stringify(updated));
  },

  // ASSETS
  getAssets: async (userId: string): Promise<GeneratedAsset[]> => {
    await delay();
    const assets = localStorage.getItem(`assets_${userId}`);
    return assets ? JSON.parse(assets) : [];
  },

  saveAsset: async (userId: string, asset: GeneratedAsset): Promise<void> => {
    await delay(300);
    
    // Compress asset image
    const compressedUrl = await compressImage(asset.imageUrl);
    const compressedAsset = { ...asset, imageUrl: compressedUrl };

    const assets = await MockAPI.getAssets(userId);
    // Limit assets to last 10 items
    const updated = [compressedAsset, ...assets].slice(0, 10);
    try {
      localStorage.setItem(`assets_${userId}`, JSON.stringify(updated));
    } catch (e) {
      localStorage.setItem(`assets_${userId}`, JSON.stringify([compressedAsset]));
    }
  },

  // SUPPORT
  submitTicket: async (ticket: SupportTicket): Promise<void> => {
    await delay();
    const tickets = JSON.parse(localStorage.getItem('support_tickets') || '[]');
    tickets.push(ticket);
    localStorage.setItem('support_tickets', JSON.stringify(tickets));
  },

  // CHAT
  saveChatMessage: async (userId: string, msg: ChatMessage): Promise<void> => {
    const chats = JSON.parse(localStorage.getItem(`chats_${userId}`) || '[]');
    // Limit chat history to last 50 messages
    const updated = [...chats, msg].slice(-50);
    localStorage.setItem(`chats_${userId}`, JSON.stringify(updated));
  },

  getChatHistory: async (userId: string): Promise<ChatMessage[]> => {
    const chats = localStorage.getItem(`chats_${userId}`);
    return chats ? JSON.parse(chats) : [];
  }
};
