import Ranking from './math/Ranking';

export default async function Request({ country }) {
  async function pull(url, parameter) {
    const result = await fetch(url, parameter)
      .then((resp) => resp.json())
      .then((resp) => resp)
      .catch((err) => { console.log(err.message); return []; });
    return result;
  }
  const { dataAvg, dataAvgAll } = await pull(
    '/api/database/read',
    {
      method: 'POST',
      body: JSON.stringify(
        { body: 'avg', country, min: 10 },
      ),
    },
  );
  if (dataAvg === 0) {
    return {
      status: 'Error',
      message: 'INSUFFICIENT INFORMATION',
      data: null,
    };
  }
  //---------------------------------------------------
  const ranked = await Ranking({ dataAvg, dataAvgAll });
  //---------------------------------------------------
  const order = ranked.sort((a, b) => {
    if (a.ranking > b.ranking) return -1;
    return a.ranking < b.ranking ? 1 : 0;
  });
  const result = order.map(
    (x, i) => { const obj = { ...x, id: (i + 1) }; return obj; },
  );
  return {
    status: 'ok',
    message: 'Tudo ocorreu bem',
    data: result,
  };
}
