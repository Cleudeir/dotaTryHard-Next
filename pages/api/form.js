const users_array = [];
function Form(req, res) {
  const function_Post = (req, res) => {
    const user = JSON.parse(req.body);
    users_array.push(user);
    res.status(200).send();
  };
  const function_Get = (req, res) => {
    res.status(200).json(users_array);
  };

  if (req.method === "POST") {
    function_Post(req, res);
  } else if (req.method === "GET") {
    function_Get(req, res);
  } else {
    res.status(405).send();
  }
}


export default Form;
