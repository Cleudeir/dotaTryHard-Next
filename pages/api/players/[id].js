/* eslint-disable camelcase */
import GetMatchHistory from '../../../back/get/GetMatchHistory';
import ListPlayers from '../../../back/math/ListPlayers';

export default async function Players(req, res) {
  console.log('Players');
  const { id } = req.query;
  const account_id = id;
  const pull = await GetMatchHistory(account_id);
  if (pull.data) {
    const list = await ListPlayers(pull.data);
    const qnt = 50;
    const random = Math.floor(Math.random() * (list.length - qnt));
    const slice = list.slice(random, random + qnt);
    const result = slice.filter((x) => x !== account_id);
    res.status(200).json(
      {
        status: pull.status,
        message: pull.message,
        data: [...result, +account_id],
      },
    );
  } else {
    res.status(200).json(pull);
  }
}
