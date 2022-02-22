export default async function Api() {
  const obj = {
    base_url: process.env.base_url,
    game_mode: process.env.game_mode,
    key_api: process.env.key_api,
  };
  return obj;
}
