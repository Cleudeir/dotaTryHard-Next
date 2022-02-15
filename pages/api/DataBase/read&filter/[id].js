import connect from '../../../../back_end/data/Connect';

export default async function readData(req, res) {
  const { id } = req.query;
  const body = JSON.parse(req.body);
  const connection = await connect();

  const filter = body;
  async function queryMySql(request, prop2) {
    const result = await connection.query(request, prop2)
      .then((data) => data[0])
      .catch(() => null);
    return result;
  }
  if (connection) {
    const read = await queryMySql(`SELECT * FROM dotatryhard.n_${id}`);

    if (read) {
      for (let i = filter.length - 1; i >= 0; i -= 1) {
        for (let j = 0; j < read.length; j += 1) {
          if (filter[i] === read[j].match_id) {
            filter.splice(i, 1);
          }
        }
      }
    }

    res.status(200).json({ read, filter });
  }
  res.status(500).json('Erro connection');
}
