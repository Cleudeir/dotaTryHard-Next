export default async function Request({ id }) {
  async function pull(url, parameter) {
    const result = await fetch(url, parameter)
      .then((resp) => resp.json())
      .then((resp) => resp)
      .catch((err) => { console.log(err.message); return []; });
    return result;
  }

  // procurar dados salvos database
  const { dataDetailsMatch, dataDetailsStatus } = await pull(
    '/api/database/read',
    {
      method: 'POST',
      body: JSON.stringify(
        {
          body: 'details', accountId: id,
        },
      ),
    },
  );
  if (dataDetailsMatch === undefined) {
    return {
      status: 'Error',
      message: 'SERVIDOR DATABASE OFFLINE, FAVOR TENTAR MAIS TARDE!',
      data: null,
    };
  }
  console.log('--------------------------');
  return {
    status: 'ok',
    message: 'Tudo ocorreu bem',
    data: { dataDetailsMatch, dataDetailsStatus },
  };
}
