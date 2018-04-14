const Discord = require('discord.js');

module.exports = (guild, user) => {

  guild.defaultChannel.send(`${user.tag} a été unban!`);
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Unban\n**Membre:** ${user.tag}\n**Moderateur:** ${guild.client.unbanAuth.tag}\n**Raison:** ${guild.client.unbanReason}`);
  return guild.channels.get(guild.channels.find('name', 'mod-log').id).send({embed});

};
