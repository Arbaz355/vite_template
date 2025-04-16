/**
 * Storage Utilities
 *
 * Provides a unified interface for working with different storage mechanisms:
 * - Local Storage (persistent)
 * - Session Storage (session-based)
 * - Cookies (with options for secure cookies)
 *
 * Features:
 * - Type safety
 * - Optional encryption
 * - Expiration management
 * - Namespace support to avoid conflicts
 */

// Default namespace to prefix all storage keys
const DEFAULT_NAMESPACE = 'app';

/**
 * Storage options
 */
interface StorageOptions {
  // Namespace for storage keys to avoid conflicts with other applications
  namespace?: string;
  // TTL in seconds, 0 means no expiration
  ttl?: number;
  // Whether to encrypt the stored value
  encrypt?: boolean;
}

/**
 * Cookie specific options
 */
interface CookieOptions extends StorageOptions {
  // Cookie path
  path?: string;
  // Cookie domain
  domain?: string;
  // Whether the cookie should be secure (HTTPS only)
  secure?: boolean;
  // Whether the cookie should be HTTP only (not accessible via JS)
  httpOnly?: boolean;
  // SameSite attribute
  sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * Entry with metadata for expiration
 */
interface StorageEntry<T> {
  // The actual value
  value: T;
  // Expiration timestamp
  expiry?: number;
  // When it was created
  created: number;
}

/**
 * Simple encryption/decryption helpers
 * Note: This is basic obfuscation, not true encryption.
 * For sensitive data, use a proper encryption library.
 */
function encrypt(data: string): string {
  return btoa(encodeURIComponent(data));
}

function decrypt(data: string): string {
  try {
    return decodeURIComponent(atob(data));
  } catch (e) {
    return '';
  }
}

/**
 * Generate a namespaced key
 */
function getNamespacedKey(key: string, namespace = DEFAULT_NAMESPACE): string {
  return `${namespace}:${key}`;
}

/**
 * Local Storage API
 */
export const local = {
  /**
   * Set an item in local storage
   */
  set<T>(key: string, value: T, options: StorageOptions = {}): void {
    const { namespace, ttl = 0, encrypt: shouldEncrypt = false } = options;
    const namespacedKey = getNamespacedKey(key, namespace);

    const entry: StorageEntry<T> = {
      value,
      created: Date.now(),
    };

    if (ttl > 0) {
      entry.expiry = Date.now() + ttl * 1000;
    }

    const serialized = JSON.stringify(entry);
    const dataToStore = shouldEncrypt ? encrypt(serialized) : serialized;

    localStorage.setItem(namespacedKey, dataToStore);
  },

  /**
   * Get an item from local storage
   */
  get<T>(key: string, options: StorageOptions = {}): T | null {
    const { namespace, encrypt: isEncrypted = false } = options;
    const namespacedKey = getNamespacedKey(key, namespace);

    const data = localStorage.getItem(namespacedKey);
    if (!data) return null;

    try {
      const decrypted = isEncrypted ? decrypt(data) : data;
      const entry = JSON.parse(decrypted) as StorageEntry<T>;

      // Check if the item has expired
      if (entry.expiry && entry.expiry < Date.now()) {
        this.remove(key, options);
        return null;
      }

      return entry.value;
    } catch (e) {
      // If parsing fails, remove the corrupt data
      this.remove(key, options);
      return null;
    }
  },

  /**
   * Remove an item from local storage
   */
  remove(key: string, options: StorageOptions = {}): void {
    const { namespace } = options;
    const namespacedKey = getNamespacedKey(key, namespace);

    localStorage.removeItem(namespacedKey);
  },

  /**
   * Clear all items in this namespace from local storage
   */
  clear(namespace = DEFAULT_NAMESPACE): void {
    const prefix = `${namespace}:`;

    Object.keys(localStorage)
      .filter((key) => key.startsWith(prefix))
      .forEach((key) => localStorage.removeItem(key));
  },
};

/**
 * Session Storage API
 */
export const session = {
  /**
   * Set an item in session storage
   */
  set<T>(key: string, value: T, options: StorageOptions = {}): void {
    const { namespace, ttl = 0, encrypt: shouldEncrypt = false } = options;
    const namespacedKey = getNamespacedKey(key, namespace);

    const entry: StorageEntry<T> = {
      value,
      created: Date.now(),
    };

    if (ttl > 0) {
      entry.expiry = Date.now() + ttl * 1000;
    }

    const serialized = JSON.stringify(entry);
    const dataToStore = shouldEncrypt ? encrypt(serialized) : serialized;

    sessionStorage.setItem(namespacedKey, dataToStore);
  },

  /**
   * Get an item from session storage
   */
  get<T>(key: string, options: StorageOptions = {}): T | null {
    const { namespace, encrypt: isEncrypted = false } = options;
    const namespacedKey = getNamespacedKey(key, namespace);

    const data = sessionStorage.getItem(namespacedKey);
    if (!data) return null;

    try {
      const decrypted = isEncrypted ? decrypt(data) : data;
      const entry = JSON.parse(decrypted) as StorageEntry<T>;

      // Check if the item has expired
      if (entry.expiry && entry.expiry < Date.now()) {
        this.remove(key, options);
        return null;
      }

      return entry.value;
    } catch (e) {
      // If parsing fails, remove the corrupt data
      this.remove(key, options);
      return null;
    }
  },

  /**
   * Remove an item from session storage
   */
  remove(key: string, options: StorageOptions = {}): void {
    const { namespace } = options;
    const namespacedKey = getNamespacedKey(key, namespace);

    sessionStorage.removeItem(namespacedKey);
  },

  /**
   * Clear all items in this namespace from session storage
   */
  clear(namespace = DEFAULT_NAMESPACE): void {
    const prefix = `${namespace}:`;

    Object.keys(sessionStorage)
      .filter((key) => key.startsWith(prefix))
      .forEach((key) => sessionStorage.removeItem(key));
  },
};

/**
 * Cookie Storage API
 */
export const cookie = {
  /**
   * Set a cookie
   */
  set<T>(key: string, value: T, options: CookieOptions = {}): void {
    const {
      namespace,
      ttl = 0,
      encrypt: shouldEncrypt = false,
      path = '/',
      domain,
      secure = true,
      httpOnly = false,
      sameSite = 'lax',
    } = options;

    const namespacedKey = getNamespacedKey(key, namespace);

    const entry: StorageEntry<T> = {
      value,
      created: Date.now(),
    };

    if (ttl > 0) {
      entry.expiry = Date.now() + ttl * 1000;
    }

    const serialized = JSON.stringify(entry);
    const dataToStore = shouldEncrypt ? encrypt(serialized) : serialized;

    let cookieString = `${encodeURIComponent(namespacedKey)}=${encodeURIComponent(dataToStore)}`;

    if (ttl > 0) {
      const expiryDate = new Date(Date.now() + ttl * 1000);
      cookieString += `; expires=${expiryDate.toUTCString()}`;
    }

    if (path) cookieString += `; path=${path}`;
    if (domain) cookieString += `; domain=${domain}`;
    if (secure) cookieString += '; secure';
    if (httpOnly) cookieString += '; httpOnly';
    cookieString += `; sameSite=${sameSite}`;

    document.cookie = cookieString;
  },

  /**
   * Get a cookie
   */
  get<T>(key: string, options: CookieOptions = {}): T | null {
    const { namespace, encrypt: isEncrypted = false } = options;
    const namespacedKey = getNamespacedKey(key, namespace);
    const encodedKey = encodeURIComponent(namespacedKey);

    const cookies = document.cookie.split(';');
    const cookie = cookies.find((c) => c.trim().startsWith(`${encodedKey}=`));

    if (!cookie) return null;

    try {
      const encodedValue = cookie.trim().substring(encodedKey.length + 1);
      const value = decodeURIComponent(encodedValue);

      const decrypted = isEncrypted ? decrypt(value) : value;
      const entry = JSON.parse(decrypted) as StorageEntry<T>;

      // Check if the cookie has expired
      if (entry.expiry && entry.expiry < Date.now()) {
        this.remove(key, options);
        return null;
      }

      return entry.value;
    } catch (e) {
      // If parsing fails, remove the corrupt cookie
      this.remove(key, options);
      return null;
    }
  },

  /**
   * Remove a cookie
   */
  remove(key: string, options: CookieOptions = {}): void {
    const { namespace, path = '/', domain } = options;
    const namespacedKey = getNamespacedKey(key, namespace);

    // To remove a cookie, set it with an expired date
    let cookieString = `${encodeURIComponent(
      namespacedKey
    )}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

    if (path) cookieString += `; path=${path}`;
    if (domain) cookieString += `; domain=${domain}`;

    document.cookie = cookieString;
  },
};

// Default export with all storage types
export default {
  local,
  session,
  cookie,
};
