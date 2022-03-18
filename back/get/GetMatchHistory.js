/* eslint-disable prefer-const */
import api from './Api';

export default async function GetMatchHistory(props) {
  let [accountId, length] = props;
  if (!length) {
    length = 100;
  }
  const objApi = await api();

  const request = await fetch(
    `${objApi.base_url}IDOTA2Match_570/GetMatchHistory/v1/?account_id=${accountId}&game_mode=${objApi.game_mode}&key=${objApi.key_api}`,
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.result.matches) {
        const x = {
          status: 200,
          message: 'ok',
          data: data.result.matches.splice(0, length),
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
    .catch(() => ({
      status: 500,
      message: 'Request error, repete please',
      data: null,
    }));
  return request;
}
