import logo from './logo.svg';
import './App.css';
import Mapa from './componentes/Mapa/Mapa';
import ListaPuntos from './componentes/ListaPuntos/ListaPuntos';
import { useEffect, useState } from 'react';

function App() {
  const [puntosMapa, setPuntosMapa] = useState([]);

  const agregarPuntos = (punto) => {
    setPuntosMapa((puntosMapa) => [...puntosMapa, punto]);
  }

  useEffect(()=>{
    console.log(puntosMapa);   
  }, [puntosMapa])

  return (
    <div className="App">
      <Mapa agregarPunto={agregarPuntos} puntos={puntosMapa} />
      <ListaPuntos />
    </div>
  );
}

export default App;
