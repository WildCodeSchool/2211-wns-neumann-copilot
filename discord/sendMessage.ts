import "dotenv/config";
import { REST } from "@discordjs/rest";
import { ChannelsAPI } from "@discordjs/core";

const { BOT_TOKEN, CHANNEL_ID } = process.env;
const content = process.argv[2];

if (!BOT_TOKEN) throw new Error("no BOT_TOKEN defined in .env file");
if (!CHANNEL_ID) throw new Error("no CHANNEL_ID defined in .env file");

const chanAPI = new ChannelsAPI(
  new REST({ version: "10" }).setToken(BOT_TOKEN)
);

chanAPI
  .createMessage(CHANNEL_ID, { content })
  .then(() => console.log(`Message envoyé`));
