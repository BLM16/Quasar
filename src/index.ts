import { Bot } from "./bot";

// Load the environment variables from the .env file
import "dotenv-safe/config";

const BOT = new Bot(); // Create the bot
BOT.eventSubscriber(); // Subscribe the bot to all the needed discord events
BOT.login(); // Login the bot
