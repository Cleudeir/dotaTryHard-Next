import auto from '../../back/auto';

export default async function Auto(req, res) {
  const body = JSON.parse(req.body);
  console.log('body', body);
  const result = await auto(body);
  res.status(200).json(result);
}
