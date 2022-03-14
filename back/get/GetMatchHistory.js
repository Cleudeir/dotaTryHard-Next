import api from './Api';

export default async function GetMatchHistory(props) {
  const objApi = await api();

  const request = await fetch(
    `${objApi.base_url}IDOTA2Match_570/GetMatchHistory/v1/?account_id=${props}&game_mode=${objApi.game_mode}&key=${objApi.key_api}`,
  )
    .then((response) => response.json())
    .then((data) => {
      const qnt = 10;
      const random = Math.floor(Math.random() * (100 - qnt));
      if (data.result.matches) {
        const x = {
          status: 200,
          message: 'ok',
          data: data.result.matches.slice(random, random + qnt),
        };
        return x;
      } if (data.result.status) {
        return {
          status: 15,
          message: data.result.statusDetail,
          data: null,
        };
      }
      return null;
    })
    .catch((error) => {
      console.log(error.message);
      return {
        status: 500,
        message: 'Request error, repete please',
        data: null,
      };
    });
  return request;
}
