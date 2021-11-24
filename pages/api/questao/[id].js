export default function questao_id(req, res) {
  const Id = req.query.id;
  if (req.method === "GET") {
    console.log(Id);
    res.status(200).json({
      id: Id,
      enunciado:"what's favorite color?",
      respostas:['blue','black','white']

    });
  } else {
    res.statu(405).send();
  }
}
