import connect from '../../../../back_end/data/Connect';

export default async function ranking(req, res) {
  const connection = await connect();

  async function queryMySql(request, prop2) {
    const result = await connection.query(request, prop2)
      .then((data) => data[0])
      .catch((err) => err.code);
    return result;
  }

  if (connection) {
    const dataBase = 'create database dotaTryHard;';
    const useDatabase = 'use dotaTryHard';
    const players = `create table IF NOT EXISTS PLAYERS  (
      account_id bigint unsigned,
      personaname varchar(25),
      avatarfull text,
      loccountrycode varchar(2) ,
      primary key(account_id)
        );`;
    const matches = ` create table IF NOT EXISTS MATCHES  (
      match_id bigint unsigned,
      start_time bigint unsigned,
      primary key(match_id)
          );`;
    const playersMatches = ` create table IF NOT EXISTS PLAYERS_MATCHES  (
      id  bigint unsigned auto_increment,
      account_id  bigint unsigned,
      match_id  bigint unsigned,
      assists int unsigned,
      deaths int unsigned,
      denies int unsigned,
      gold_per_min int unsigned,
      hero_damage int unsigned,
      hero_healing int unsigned,
      kills int unsigned,
      last_hits int unsigned,
      net_worth int unsigned,
      tower_damage int unsigned,
      xp_per_min int unsigned,
      win int unsigned,
      primary key(id),
      foreign key(account_id) references PLAYERS (account_id) ON DELETE CASCADE ON UPDATE CASCADE,
      foreign key(match_id) references MATCHES (match_id) ON DELETE CASCADE ON UPDATE CASCADE
      );`;

    res.status(200).json({
      dataBase: await queryMySql(dataBase),
      useDatabase: await queryMySql(useDatabase),
      players: await queryMySql(players),
      matches: await queryMySql(matches),
      playersMatches: await queryMySql(playersMatches),
    });
  }
  res.status(500).json(connection);
}
