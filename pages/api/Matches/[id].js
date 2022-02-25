import GetMatchHistory from '../../../back/get/GetMatchHistory';
import ListMatchs from '../../../back/math/ListMatchs';

export default async function Matches(req, res) {
  console.log('Matches');
  const { id } = req.query;  
  const pull = await GetMatchHistory(id);
  if(pull){
    const list = await ListMatchs(pull);
    const result = list.splice(0, 50);
    res.status(200).json(result);
  } else{
    res.status(500).json("Error");
  }
}



