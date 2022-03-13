import auto from '../../back/auto';

export default async function Auto(req, res) {
  console.log('auto');
  const body = JSON.parse(req.body);
  console.log(body.length);
  const result = await auto(body);
  console.log(result);
  res.status(200).json(result);
}
