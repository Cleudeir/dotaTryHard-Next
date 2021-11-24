
function Dados(req, res) {
  const function_Post = (req, res) => {
    res.status(200).send();
  };
  const function_Get = (req, res) => {
    res.status(200).json({data: req.query});
  };

  if (req.method === "POST") {
    function_Post(req, res);
  } else if (req.method === "GET") {
    function_Get(req, res);
  } else {
    res.status(405).send();
  }
}
export default Dados;
