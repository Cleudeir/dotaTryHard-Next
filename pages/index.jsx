/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/function-component-definition */
import StatusAverage from '../components/math/StatusAverage';

export default function Home() {
  async function requests() {
    const id = 87683422;
    // Procurar partidas jogadas
    const pullMatches = await fetch(`/api/Matches/${id}`).then((resp) => resp.json()).then((resp) => resp).catch((error) => error.message);
    console.log({ pullMatches });
    // Procurar informações do perfil
    const pullProfile = await fetch(`/api/Profile/${id}`).then((resp) => resp.json()).then((resp) => resp).catch((error) => error.message);
    console.log({ pullProfile });
    // Procurar status de cada partida
    const pullStatus = await fetch(`/api/Status/${JSON.stringify(pullMatches)}`).then((resp) => resp.json()).then((resp) => resp).catch((error) => error.message);
    console.log({ pullStatus });
    const pullDataBase = await fetch('/api/DataBase/data', {
      method: 'POST',
      body: JSON.stringify(pullStatus),
    })
      .then((resp) => resp.json()).then((resp) => resp).catch((error) => error.message);
    console.log({ pullDataBase });
    // Fazer média dos status
    const pullStatusAverage = StatusAverage(pullStatus);
    console.log(pullStatusAverage);
  }
  requests();

  return <div>Buscando</div>;
}
