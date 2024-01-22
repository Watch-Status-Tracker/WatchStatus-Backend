import * as bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, process.env.BCRYPT_SALT);
  return hash;
};

export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
