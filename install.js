#!/usr/bin/env node

/**
 * AllCollegeEvents Installation Script
 * Automates the setup process for both frontend and backend
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
};

const log = {
  success: (msg) => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ ${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}⚠ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}✗ ${msg}${colors.reset}`),
};

async function installDependencies() {
  const projectRoot = path.resolve(__dirname);
  const serverPath = path.join(projectRoot, "server");
  const clientPath = path.join(projectRoot, "client");

  console.log("\n");
  console.log("╔════════════════════════════════════════╗");
  console.log("║  AllCollegeEvents Setup & Installation ║");
  console.log("╚════════════════════════════════════════╝");
  console.log();

  try {
    // Check Node.js version
    log.info("Checking Node.js version...");
    const nodeVersion = execSync("node --version").toString().trim();
    log.success(`Node.js version: ${nodeVersion}`);

    // Check npm version
    log.info("Checking npm version...");
    const npmVersion = execSync("npm --version").toString().trim();
    log.success(`npm version: ${npmVersion}`);

    // Install backend dependencies
    console.log();
    log.info("Installing backend dependencies...");
    if (fs.existsSync(serverPath)) {
      execSync("npm install", { cwd: serverPath, stdio: "inherit" });
      log.success("Backend dependencies installed");
    } else {
      log.error(`Server directory not found at ${serverPath}`);
    }

    // Install frontend dependencies
    console.log();
    log.info("Installing frontend dependencies...");
    if (fs.existsSync(clientPath)) {
      execSync("npm install", { cwd: clientPath, stdio: "inherit" });
      log.success("Frontend dependencies installed");
    } else {
      log.error(`Client directory not found at ${clientPath}`);
    }

    console.log();
    console.log("╔════════════════════════════════════════╗");
    console.log("║     Installation Completed! 🎉        ║");
    console.log("╚════════════════════════════════════════╝");
    console.log();

    // Print next steps
    console.log(`${colors.blue}Next Steps:${colors.reset}`);
    console.log(`1. Ensure MongoDB is running:`);
    console.log(`   - Windows Services: Start "MongoDB Community Server"`);
    console.log(`   - Or run: mongod`);
    console.log();
    console.log(`2. Start backend server:`);
    console.log(`   cd ${path.relative(process.cwd(), serverPath)}`);
    console.log(`   npm run dev`);
    console.log();
    console.log(`3. Start frontend server (in new terminal):`);
    console.log(`   cd ${path.relative(process.cwd(), clientPath)}`);
    console.log(`   npm run dev`);
    console.log();
    console.log(`4. Open http://localhost:5173 in your browser`);
    console.log();
    console.log(`For detailed setup instructions, see: ${path.join(projectRoot, "SETUP_GUIDE.md")}`);
    console.log();
  } catch (error) {
    log.error(`Installation failed: ${error.message}`);
    process.exit(1);
  }
}

installDependencies();
