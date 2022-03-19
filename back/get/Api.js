export default async function Api() {
  let key = '';
  const hours = new Date().getHours();
  if (hours % 2 === 1) { key = process.env.key_api; } else { key = process.env.key_api2; }
  const obj = {
    base_url: process.env.base_url,
    game_mode: process.env.game_mode,
    key_api: key,
  };
  return obj;
}
