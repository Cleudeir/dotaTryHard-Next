export function getStaticProps(){
  return{
    props: {
      numero: Math.random()
    }
  }
}
function Estatico(props) {
  return <div>Aleatorio {props.numero}</div>;
}

export default Estatico;
