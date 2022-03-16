import discord from '../../back/bot';

export default async function Bot(req, res) {
  const result = await discord();
  res.status(200).json(result);
}
