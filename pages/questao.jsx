/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";

function Questao() {
  const [questao, setQuestao] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3000/api/questao/1")
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        setQuestao(data);
      })
      .catch((error) => {
        console.log(error.message);
        setQuestao(error.message);
      });
  }, []);

  return (
    <div>
      <h1>Questão {questao?.id}</h1>
      <h2>{questao?.enunciado}</h2>
      <ol>
        {questao?.respostas?.map((x, i) => (
          <li key={i}>{x}</li>
        ))}
      </ol>
    </div>
  );
}

export default Questao;
