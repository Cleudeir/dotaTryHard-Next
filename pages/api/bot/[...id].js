import discord from '../../../back/bot';

export default async function Bot(req, res) {
  console.log('Bot');
  const [country, min] = req.query.id;
  const result = await discord({ country, min });
  res.status(200).json(result);
}
