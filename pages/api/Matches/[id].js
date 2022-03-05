import GetMatchHistory from '../../../back/get/GetMatchHistory';
import ListMatchs from '../../../back/math/ListMatchs';

export default async function Matches(req, res) {
  console.log('--------------------------');
  console.log('Matches');
  const { id } = req.query;
  const pull = await GetMatchHistory(id);
  if (pull.data) {
    const list = await ListMatchs(pull.data);
    const qnt = 20;
    const random = Math.floor(Math.random() * (list.length - qnt));
    const result = list.slice(random, random + qnt);
    res.status(200).json({
      status: pull.status,
      message: pull.message,
      data: result,
    });
  } else {
    res.status(200).json(pull);
  }
}
