/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
function Form() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [data_api, setData_api] = useState(false);
  const send_data = async () => {
    console.log(nome, idade);

    let fetch_post = await fetch("/api/form", {
      method: "POST",
      body: JSON.stringify({ nome, idade }),
    });
    console.log("fetch_post:", fetch_post.status);
    let fetch_get = await (await fetch("/api/form")).json();
    await setData_api(fetch_get);

    console.log("fetch_get:", fetch_get);
  };
  return (
    <div>
      <h1>Integrando API</h1>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="number"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
      />
      <button onClick={send_data} type="button">
        Enviar
      </button>
      <ul>
        {data_api && data_api.map((x, i) => (
          <li key={x + i}>
            {x.nome} tem {x.idade} anos
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Form;
