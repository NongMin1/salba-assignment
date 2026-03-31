enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
}

class Logger {
  private logs: LogEntry[] = [];

  private formatTimestamp(): string {
    return new Date().toISOString();
  }

  private formatLog(entry: LogEntry): string {
    const timestamp = entry.timestamp;
    const level = entry.level.padEnd(5);
    const context = entry.context ? ` | ${JSON.stringify(entry.context)}` : "";
    return `[${timestamp}] ${level} ${entry.message}${context}`;
  }

  debug(message: string, context?: Record<string, any>): void {
    if (process.env.DEBUG) {
      const entry: LogEntry = {
        timestamp: this.formatTimestamp(),
        level: LogLevel.DEBUG,
        message,
        context,
      };
      this.logs.push(entry);
      console.log(this.formatLog(entry));
    }
  }

  info(message: string, context?: Record<string, any>): void {
    const entry: LogEntry = {
      timestamp: this.formatTimestamp(),
      level: LogLevel.INFO,
      message,
      context,
    };
    this.logs.push(entry);
    console.log(this.formatLog(entry));
  }

  warn(message: string, context?: Record<string, any>): void {
    const entry: LogEntry = {
      timestamp: this.formatTimestamp(),
      level: LogLevel.WARN,
      message,
      context,
    };
    this.logs.push(entry);
    console.warn(this.formatLog(entry));
  }

  error(message: string, context?: Record<string, any>): void {
    const entry: LogEntry = {
      timestamp: this.formatTimestamp(),
      level: LogLevel.ERROR,
      message,
      context,
    };
    this.logs.push(entry);
    console.error(this.formatLog(entry));
  }

  getLogs(): LogEntry[] {
    return this.logs;
  }

  clearLogs(): void {
    this.logs = [];
  }
}

export const logger = new Logger();
