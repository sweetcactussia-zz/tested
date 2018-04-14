exports.run = (client, message, args) => {
  const reason = args.slice(1).join(' ');
  client.unbanReason = reason;
  client.unbanAuth = message.author;
  const user = args[0];
  const modlog = client.channels.find('name', 'mod-log');
  if (!modlog) return message.reply('Channel mod-logs non trouvé');
  if (reason.length < 1) return message.reply('Vous devez indiquer une raison.');
  if (!user) return message.reply('Vous devez indiquer ID du membre.').catch(console.error);
  message.guild.unban(user);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'unban',
  description: 'Unban un membre.',
  usage: 'unban [mention] [raison]'
};
