module.exports = member => {
  const guild = member.guild;
  guild.defaultChannel.send(`bienvenue à ${member.user.username} sur le serveur !`);
};
