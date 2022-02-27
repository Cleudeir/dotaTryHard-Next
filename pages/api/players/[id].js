/* eslint-disable camelcase */
import GetMatchHistory from '../../../back/get/GetMatchHistory';
import ListPlayers from '../../../back/math/ListPlayers';

export default async function Players(req, res) {
  console.log('Players');
  const { id } = req.query;
  const account_id = id
  const pull = await GetMatchHistory(account_id);  
  if(pull){
    const list = await ListPlayers(pull)
    const qnt = 10
    const random = Math.floor(Math.random() * (list.length - qnt))
    console.log(random, random + qnt)
    const slice = list.slice(random, random + qnt);
    const result = slice.filter(x=> x!= account_id )
    
    res.status(200).json([...result, account_id]);
  } else{
    res.status(500).json("Error");
  }
}
