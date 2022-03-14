import auto from '../../back/auto';

export default async function Auto(req, res) {
  const body = JSON.parse(req.body);
  const result = await auto(body);
  console.log(result);
  res.status(200).json(result);
}
