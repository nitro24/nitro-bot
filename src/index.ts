import * as path from 'path';
import * as fs from 'fs';
import * as Discord from 'discord.js';

const isProd = (): boolean => {
  const rawValue = process.env['IS_PROD'];
  return rawValue !== undefined && rawValue !== null && rawValue === 'true';
};

const getToken = (): string => {
  const fileName = isProd() ? 'prod.txt' : 'dev.txt';
  const filePath = path.join(path.resolve(__dirname), '../tokens/', fileName);
  if (!fs.existsSync(filePath)) return '';
  const result = fs.readFileSync(filePath, 'utf8').trim();
  return result;
};

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`logged in as ${client.user.tag}`);
});

client.on('message', message => {
  if (message.content === 'ping') {
    message.reply('pong');
  }
});

client.login(getToken());
