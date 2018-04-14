const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');
exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  parseUser(message, user);
  const modlog = client.channels.find('name', 'mod-log');
  const caseNum = await caseNumber(client, modlog);
  if (!modlog) return message.reply('Channel mod-logs non trouvé');
  if (message.mentions.users.size < 1) return message.reply('Veuillez mentionner un membre.').catch(console.error);

  // message.guild.member(user).kick();

  const reason = args.splice(1, args.length).join(' ') || `Attente du modérateur. Utilisez ${settings.prefix}reason ${caseNum} <raison>.`;
  const embed = new RichEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
  .setDescription(`**Action:** Kick\n**Membre:** ${user.tag}\n**Modérateur:** ${message.author.tag}\n**Raison:** ${reason}`)
  .setFooter(`Cas ${caseNum}`);
  return client.channels.get(modlog.id).send({embed});
};

exports.conf = {
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'kick',
  description: 'Kick le membre mentionné.',
  usage: 'kick [mention] [raison]'
};
