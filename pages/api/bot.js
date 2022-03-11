/* eslint-disable camelcase */
import bot from '../../back/discord';

export default async function Bot(req, res) {
  console.log('Bot');
  const result = await bot();
  res.status(200).json(result);
}
