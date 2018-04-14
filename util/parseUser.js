exports.parseUser = (message, user) => {
  const member = message.guild.member(user) || null;
  if (user.id === message.author.id) {
    return message.channel.send('Vous ne pouvez pas le faire vous même, pourquoi essayer ?');
  } else if (member) {
    if (member.highestRole.position >= message.member.highestRole.position) return message.channel.send('The targeted member has a higher or equal role position than you.');
  }
  return user;
};
