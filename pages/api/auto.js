import auto from '../../back/auto';

export default async function Auto(req, res) {
  const body = JSON.parse(req.body);
  const result = auto(body);
  res.status(200).json(result);
}
