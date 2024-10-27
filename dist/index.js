"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
// Read the base (default) config and overload with environment specific variables
function loadConfig(filePath) {
    try {
        var fullPath = path_1.default.resolve(__dirname, filePath);
        if (fs_1.default.existsSync(fullPath)) {
            return JSON.parse(fs_1.default.readFileSync(fullPath, 'utf-8'));
        }
    }
    catch (error) {
        console.error("Error loading config file at ".concat(filePath, ":"), error);
    }
    return undefined;
}
function mergeConfig(baseConfig, overrideConfig) {
    return __assign(__assign({}, baseConfig), overrideConfig);
}
var baseDatabaseConfigData = loadConfig('../cfg/baseDatabaseConfig.json');
var prodDatabaseConfigData = loadConfig('../cfg/prodDatabaseConfig.json');
var baseServerConfigData = loadConfig('../cfg/baseServerConfig.json');
var prodServerConfigData = loadConfig('../cfg/prodServerConfig.json');
var baseLoggingConfigData = loadConfig('../cfg/baseLoggingConfig.json');
var prodLoggingConfigData = loadConfig('../cfg/prodLoggingConfig.json');
var databaseConfig = mergeConfig(baseDatabaseConfigData, prodDatabaseConfigData);
var serverConfig = mergeConfig(baseServerConfigData, prodServerConfigData);
var loggingConfig = mergeConfig(baseLoggingConfigData, prodLoggingConfigData);
var appConfig = {
    database: databaseConfig,
    server: serverConfig,
    logging: loggingConfig,
};
console.log(JSON.stringify(appConfig));
