import auto from '../../../back/auto';

export default async function Auto(req, res) {
  console.log('Auto');
  const { id } = req.query;
  const request = await auto(id);
  res.status(200).json(request);
}
