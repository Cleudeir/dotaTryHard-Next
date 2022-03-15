import auto from '../../back/auto';

export default async function Auto(req, res) {
  if (req.body) {
    const body = JSON.parse(req.body);
    console.log('body', body);
    auto(body);
    res.status(200).json(body);
  } else {
    res.status(200).json('auto');
  }
}
