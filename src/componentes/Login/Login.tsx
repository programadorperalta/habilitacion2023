import React, { useState } from 'react'
import Usuario from '../../models/User/User'
import * as Yup from 'yup';
import Formulario from '../Formulario/Formulario.tsx';


const Login = () => {

  
    //Hooks
    const [usuario,setUsuario] = useState<Usuario>({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:''
    })

    const [modalVisible,setModalVisible] = useState(false);

    const handleInputEmail = (event) => {
      const value = event.target.value;
      setUsuario((prevData)=>({
        ...prevData,
        email:value
      }));
    };

    const handleInputPassword = (event) => {
      const value = event.target.value;
      setUsuario((prevData)=>({
        ...prevData,
        password:value
      }));
    };

    const handleSignIn = () => {
      
    }

    const handleSignUp = () => {
      setModalVisible(true)
    }

    const closeModal = () => {
      setModalVisible(false)
  }
  
  return (
<>


    <div className='mb-2'>

    <div 
    className='w-40 h-40 mx-auto animate__animated animate__tada'
    >
      <img 
        src="https://png.pngtree.com/png-vector/20220805/ourmid/pngtree-route-maps-png-image_6099764.png"
        alt='Logo'/>
    </div>
     
        <h1
        className='text-white mb-10 text-2xl text-center animate__animated animate__backInLeft'
        >RouteOptimizer</h1>
        <div className="form mb-4">

          <div className="inputs animate__animated animate__backInRight ">

          <h1
          className='text-white'
          >Email</h1>
          <input
        className='mb-5 border rounded-md bg-blue-100 py-1 px-4'
        placeholder='user@user.com'
        value={usuario.email}
        onChange={handleInputEmail}
        />
        <h1
        className='text-white'
        >Password</h1>
        <input
        placeholder='Your password'
        className='mb-5 border rounded-md bg-blue-100 py-1 px-4'
        value={usuario.password}
        onChange={handleInputPassword}
        />
          </div>
        

        <div className="p-2 mb-2 flex-1 px-4 space-x-2">
          <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSignIn}
          >
            Sign In
          </button>

          <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSignUp}
          >
            <h1
            className='text-white'
            >Sign Up</h1>

            
          </button>

          {modalVisible && (

            
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-black w-1/2 rounded-lg shadow-lg p-2">
            <h2 className="text-2xl font-bold mb-3 text-green-400 text-center  animate__bounce">RouteOptimizer</h2>
            <div className="flex justify-center items-center">
            
            <Formulario/>
          </div>

        </div>
          <button
          className='absolute top-0 right-80 m-6 p-6 text-lg text-green-400 rounded-full focus:outline-none'
          onClick={closeModal}
          >X</button>
        </div>
      )}
          </div>

        </div>
        </div>
        
    </>
  )
}

export default Login