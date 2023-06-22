import React from 'react';

const ListaPuntos = ({puntos, eliminar}) => {

    return (
        <>
            <h1 className="text-3xl font-bold">
                Test
            </h1>
            {
                puntos.map((punto) => {
                    return (
                        <div>
                            <div className="text-gray-300 w-2/3 overflow-hidden">{punto[2]}</div>
                            <div><button onClick={() => eliminar(punto)} className=" text-white bg-red-500">Borrar</button></div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default ListaPuntos;