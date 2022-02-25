/* eslint-disable camelcase */
import GetMatchHistory from '../../../back/get/GetMatchHistory';
import ListPlayers from '../../../back/math/ListPlayers';

export default async function Players(req, res) {

  const { id } = req.query;
  if(id){
    const pull = await GetMatchHistory(id);
    const list = await ListPlayers(pull)
    const result = list.splice(0, 25);
    res.status(200).send(result);
  } else{
    res.status(500).send("Error");
  }
}
