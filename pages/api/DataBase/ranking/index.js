import connect from '../../../../back_end/data/Connect';
import StatusAverage from '../../../../back_end/math/StatusAverage';

export default async function ranking(req, res) {
  const connection = await connect();
  async function queryMySql(request, prop2) {
    const result = await connection.query(request, prop2)
      .then((data) => data[0])
      .catch(() => null);
    return result;
  }
  if (connection) {
    const show = await queryMySql('show tables');
    const tables = [];
    for (let i = 0; i < show.length; i += 1) {
      const player = show[i].Tables_in_dotatryhard;
      if (player !== 'profile') {
        tables.push(+player.slice(2, player.length));
      }
    }
    const tablesDetails = [];
    const profilePlayer = await queryMySql('select * from profile');
    for (let j = 0; j < tables.length; j += 1) {
      const accountId = tables[j];
      const statusPlayer = await queryMySql('select * from n_');
      const filter = profilePlayer.filter((x) => x.account_id === accountId)[0];
      const average = StatusAverage(statusPlayer);
      tablesDetails.push({ ...filter, ...average });
    }
    res.status(200).json(tablesDetails);
  }
  res.status(500).json('Erro connection');
}
