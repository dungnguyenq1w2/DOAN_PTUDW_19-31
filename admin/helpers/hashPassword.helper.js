const bcrypt = require('bcrypt');

const hashPassword = async (data) => {
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
  const hash = await bcrypt.hash(data, salt);

  return hash;
}

module.exports = hashPassword;