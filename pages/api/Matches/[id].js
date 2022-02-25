import GetMatchHistory from '../../../back/get/GetMatchHistory';
import ListMatchs from '../../../back/math/ListMatchs';

export default async function Matches(req, res) {
  const { id } = req.query;
  if(id){
    const pull = await GetMatchHistory(id);
    const list = await ListMatchs(pull);
    const result = list.splice(0, 25);
    res.status(200).json(result);
  } else{
    res.status(500).json("Error");
  }
}



