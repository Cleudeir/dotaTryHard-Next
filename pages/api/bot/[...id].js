import discord from '../../../back/bot';

export default async function Bot(req, res) {
  const [country, min] = req.query.id;
  console.log(country, min);
  const result = await discord({ country, min });
  res.status(200).json(result);
}
