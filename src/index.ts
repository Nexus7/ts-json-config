import fs from 'fs';
import path from 'path';

interface DatabaseConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
}

interface ServerConfig {
  port: number;
  enableHttps: boolean;
}

interface LoggingConfig {
  level: string;
  format: string;
}

interface AppConfig {
  database: DatabaseConfig;
  server: ServerConfig;
  logging: LoggingConfig;
}

// Read the base (default) config and overload with environment specific variables

function loadConfig<T>(filePath: string): T | undefined {
  try {
    const fullPath = path.resolve(__dirname, filePath);
    if (fs.existsSync(fullPath)) {
      return JSON.parse(fs.readFileSync(fullPath, 'utf-8')) as T;
    }
  } catch (error) {
    console.error(`Error loading config file at ${filePath}:`, error);
  }
  return undefined;
}

function mergeConfig<T>(baseConfig: T, overrideConfig?: Partial<T>): T {
  return {
    ...baseConfig,
    ...overrideConfig,
  };
}

const baseDatabaseConfigData: DatabaseConfig | undefined = loadConfig<DatabaseConfig>('../cfg/baseDatabaseConfig.json');
const prodDatabaseConfigData: Partial<DatabaseConfig> | undefined = loadConfig<Partial<DatabaseConfig>>('../cfg/prodDatabaseConfig.json');

const baseServerConfigData: ServerConfig | undefined = loadConfig<ServerConfig>('../cfg/baseServerConfig.json');
const prodServerConfigData: Partial<ServerConfig> | undefined = loadConfig<Partial<ServerConfig>>('../cfg/prodServerConfig.json');

const baseLoggingConfigData: LoggingConfig | undefined = loadConfig<LoggingConfig>('../cfg/baseLoggingConfig.json');
const prodLoggingConfigData: Partial<LoggingConfig> | undefined = loadConfig<Partial<LoggingConfig>>('../cfg/prodLoggingConfig.json');

const databaseConfig: DatabaseConfig = mergeConfig(baseDatabaseConfigData!, prodDatabaseConfigData);
const serverConfig: ServerConfig = mergeConfig(baseServerConfigData!, prodServerConfigData);
const loggingConfig: LoggingConfig = mergeConfig(baseLoggingConfigData!, prodLoggingConfigData);

const appConfig: AppConfig = {
  database: databaseConfig,
  server: serverConfig,
  logging: loggingConfig,
};

console.log(JSON.stringify(appConfig));