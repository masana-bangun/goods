const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Add resolver configuration to handle dynamic files properly
config.resolver.blockList = [
  // Block problematic dynamic files with double extensions
  /.*\.tsx\.tsx$/,
  /.*\.ts\.ts$/,
  // Block other potential problematic patterns
  /app\/tempobook\/dynamic\/.*\.tsx\.tsx$/,
];

// Ensure proper file extensions are resolved
config.resolver.sourceExts = [
  ...config.resolver.sourceExts,
  "tsx",
  "ts",
  "jsx",
  "js",
];

module.exports = withNativeWind(config, { input: "./global.css" });
