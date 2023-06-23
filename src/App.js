import './App.css';
import Mapa from './componentes/Mapa/Mapa';
import ListaPuntos from './componentes/ListaPuntos/ListaPuntos';
import { useEffect, useState } from 'react';
import Login from './componentes/Login/Login.tsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'animate.css';

import 'animate.css';
import Header from './componentes/Header/header.tsx';

function App() {

  return (

  <div className='bg-black flex items-center justify-center relative h-screen'>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/puntos" element={<ListaPuntos/>}/>
        <Route path="/mapa" element={<Mapa/>}/>
      </Routes>
    </Router>
    </div>
    // 
    //   <Login/>
    //   {/* <Mapa agregarPunto={agregarPuntos} puntos={puntosMapa} />
    //   <ListaPuntos /> */}
    // 
  );
}

export default App;
