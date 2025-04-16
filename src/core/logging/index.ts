/**
 * Logging Service
 *
 * Centralized logging for the application.
 * This service can be configured to log to different destinations
 * (console, file, external service) depending on the environment.
 */

import { ErrorInfo } from "react";

// Log levels
export enum LogLevel {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
  FATAL = "fatal",
}

// Log metadata
export interface LogMetadata {
  timestamp: string;
  level: LogLevel;
  context?: string;
  user?: string;
  tags?: string[];
  [key: string]: any;
}

// Log entry
export interface LogEntry {
  message: string;
  metadata: LogMetadata;
  data?: any;
}

// Logger configuration
interface LoggerConfig {
  minLevel: LogLevel;
  enableConsole: boolean;
  enableRemote: boolean;
  remoteUrl?: string;
}

// Default configuration
const DEFAULT_CONFIG: LoggerConfig = {
  minLevel:
    process.env.NODE_ENV === "production" ? LogLevel.INFO : LogLevel.DEBUG,
  enableConsole: process.env.NODE_ENV !== "production",
  enableRemote: process.env.NODE_ENV === "production",
};

// Initialize with default config
let config: LoggerConfig = DEFAULT_CONFIG;

// Configure the logger
export function configureLogger(newConfig: Partial<LoggerConfig>): void {
  config = { ...config, ...newConfig };
}

// Create a log entry
function createLogEntry(
  level: LogLevel,
  message: string,
  data?: any,
  context?: string
): LogEntry {
  return {
    message,
    metadata: {
      timestamp: new Date().toISOString(),
      level,
      context,
      ...(data?.user && { user: data.user }),
    },
    data,
  };
}

// Log to console
function logToConsole(entry: LogEntry): void {
  const { message, metadata, data } = entry;
  const { level, timestamp, context } = metadata;

  const contextString = context ? `[${context}]` : "";
  const logMessage = `${timestamp} ${level.toUpperCase()} ${contextString} ${message}`;

  switch (level) {
    case LogLevel.DEBUG:
      console.debug(logMessage, data);
      break;
    case LogLevel.INFO:
      console.info(logMessage, data);
      break;
    case LogLevel.WARN:
      console.warn(logMessage, data);
      break;
    case LogLevel.ERROR:
    case LogLevel.FATAL:
      console.error(logMessage, data);
      break;
  }
}

// Log to remote service
async function logToRemote(entry: LogEntry): Promise<void> {
  if (!config.remoteUrl) return;

  try {
    await fetch(config.remoteUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entry),
    });
  } catch (error) {
    // Fallback to console if remote logging fails
    console.error("Failed to send log to remote service", error);
  }
}

// Main log function
function log(
  level: LogLevel,
  message: string,
  data?: any,
  context?: string
): void {
  // Skip logging if below minimum level
  if (
    (level === LogLevel.DEBUG && config.minLevel !== LogLevel.DEBUG) ||
    (level === LogLevel.INFO && config.minLevel === LogLevel.WARN) ||
    (level === LogLevel.INFO && config.minLevel === LogLevel.ERROR) ||
    (level === LogLevel.WARN && config.minLevel === LogLevel.ERROR)
  ) {
    return;
  }

  const entry = createLogEntry(level, message, data, context);

  if (config.enableConsole) {
    logToConsole(entry);
  }

  if (config.enableRemote) {
    logToRemote(entry).catch();
  }
}

// Public logging API
export const logger = {
  debug: (message: string, data?: any, context?: string) =>
    log(LogLevel.DEBUG, message, data, context),

  info: (message: string, data?: any, context?: string) =>
    log(LogLevel.INFO, message, data, context),

  warn: (message: string, data?: any, context?: string) =>
    log(LogLevel.WARN, message, data, context),

  error: (message: string, data?: any, context?: string) =>
    log(LogLevel.ERROR, message, data, context),

  fatal: (message: string, data?: any, context?: string) =>
    log(LogLevel.FATAL, message, data, context),
};

// Error logging helper
export function logError(error: Error, errorInfo?: ErrorInfo): void {
  logger.error(
    error.message || "An error occurred",
    {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
        ...(errorInfo && { componentStack: errorInfo.componentStack }),
      },
    },
    "ErrorBoundary"
  );
}
