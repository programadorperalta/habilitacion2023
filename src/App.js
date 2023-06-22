import './App.css';
import Mapa from './componentes/Mapa/Mapa';
import ListaPuntos from './componentes/ListaPuntos/ListaPuntos';
import { useEffect, useState } from 'react';
import Login from './componentes/Login/Login.tsx';

import 'animate.css';

function App() {
  const [puntosMapa, setPuntosMapa] = useState([]);

  const agregarPuntos = (punto) => {
    setPuntosMapa((puntosMapa) => [...puntosMapa, punto]);
  }

  useEffect(()=>{
    console.log(puntosMapa);   
  }, [puntosMapa])

  return (
    <div className='bg-black flex items-center justify-center h-screen'>
      <Login/>
      {/* <Mapa agregarPunto={agregarPuntos} puntos={puntosMapa} />
      <ListaPuntos /> */}
    </div>
  );
}

export default App;
