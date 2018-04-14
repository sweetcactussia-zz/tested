module.exports = member => {
  const guild = member.guild;
  guild.defaultChannel.send(`Dites au revoir à ${member.user.username}.`);
};
