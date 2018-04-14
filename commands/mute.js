const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');
exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  parseUser(message, user);
  const modlog = client.channels.find('name', 'mod-log');
  const caseNum = await caseNumber(client, modlog);
  const muteRole = client.guilds.get(message.guild.id).roles.find('name', 'muted');
  if (!modlog) return message.reply('Channel mod-logs non trouvé').catch(console.error);
  if (!muteRole) return message.reply('Role "Muted" non trouvé.').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('Vous devez mentionner un membre.').catch(console.error);
  const reason = args.splice(1, args.length).join(' ') || `Attente du modérateur. Utilisez ${settings.prefix}reason ${caseNum} <raison>.`;

  const embed = new RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Un/mute\n**Membre:** ${user.tag}\n**Modérateur:** ${message.author.tag}\n**Raison:** ${reason}`)
    .setFooter(`Cas ${caseNum}`);

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('Bot non autorisé.').catch(console.error);

  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole).then(() => {
      client.channels.get(modlog.id).send({embed}).catch(console.error);
    });
  } else {
    message.guild.member(user).addRole(muteRole).then(() => {
      client.channels.get(modlog.id).send({embed}).catch(console.error);
    });
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['unmute'],
  permLevel: 2
};

exports.help = {
  name: 'mute',
  description: 'Mute ou unmute le membre mentionné.',
  usage: 'un/mute [mention] [raison]'
};
