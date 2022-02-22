export default async function DataBase() {
  const obj = {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    port: process.env.port,
    database: process.env.database,
  };
  return obj;
}
