import GetMatchHistory from '../../../back/get/GetMatchHistory';
import ListMatchs from '../../../back/math/ListMatchs';

export default async function Matches(req, res) {
  console.log(req.query);
  const { id } = req.query;
  const pull = await GetMatchHistory(id);
  if (pull.data) {
    const list = await ListMatchs(pull.data);
    res.status(200).json({
      status: pull.status,
      message: pull.message,
      data: list,
    });
  } else {
    res.status(200).json(pull);
  }
}
