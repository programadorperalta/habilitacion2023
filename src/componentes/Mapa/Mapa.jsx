import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import '@geoapify/leaflet-address-search-plugin';
import { useEffect, useState } from 'react';
import './Mapa.css'
import axios from 'axios';
import Header from '../Header/header.tsx';
import ListaPuntos from '../ListaPuntos/ListaPuntos';
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

const Mapa = () => {
    const myAPIKey = "38bf763b78744c80bb5671ef040b927c";

    const [puntosMapa, setPuntosMapa] = useState([]);
    const [mapa, setMapa] = useState();
    const [marcadores, setMarcadores] = useState();

    let routingControl;

    const agregarPuntos = (punto) => {
        setPuntosMapa((puntosMapa) => [...puntosMapa, punto]);
    }

    function eliminarPunto(punto) {
        let aux = [];

        puntosMapa.forEach((puntoActual) => {
            if (puntoActual[0] != punto[0] || puntoActual[1] != punto[1]) {
                aux.push(puntoActual);
            }
        })

        setPuntosMapa(aux);
    }

    const limpiarPuntos = () => {
        setPuntosMapa([]);
        clearRoute();
    }

    const getNombreByCoordenadas = async (latitud, longitud) => {
        let response = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitud}&lon=${longitud}&format=json&apiKey=${myAPIKey}`);
        return (response.data.results[0].address_line1 + ' ' + response.data.results[0].address_line2);
    }

    const rutaTest = () => {
       routingControl =  L.Routing.control({
            waypoints: puntosMapa.map(([lat, lng]) => L.latLng(lat, lng)),
          }).addTo(mapa);
    }

    useEffect(() => {
        // console.log(puntosMapa);
    }, [puntosMapa])


    const clearRoute = () => {
        if (routingControl) {
          routingControl.getPlan().setWaypoints([]);
          mapa.removeControl(routingControl);
          routingControl = null;
          const routingContainer = document.getElementsByClassName(
            "leaflet-routing-container"
          )[0];
          if (routingContainer) {
            routingContainer.remove();
          }
          
        }
      };


    let IsLoaded = false;

    useEffect(() => {
        if (IsLoaded) return;
        IsLoaded = true;
        let map = L.map('map').setView([-26.83261080003296, -65.19707679748537], 13);
        setMarcadores(L.layerGroup());
        setMapa(map);
    }, [])

    useEffect(() => {
        if (mapa == undefined) return;

        for (let layer in mapa._layers) {
            if (mapa._layers[layer] instanceof L.Marker) {
                mapa.removeLayer(mapa._layers[layer]);
            }
        }

        puntosMapa.forEach((punto) => {
            let lat = punto[0];
            let lon = punto[1];
            L.marker([lat, lon]).addTo(mapa);
        })
    }, [puntosMapa, mapa])

    useEffect(() => {
        if (mapa == undefined) return;
        var marker = null;

        // Get an API Key on https://myprojects.geoapify.com
        var mapURL = L.Browser.retina
            ? `https://maps.geoapify.com/v1/tile/{mapStyle}/{z}/{x}/{y}.png?apiKey=${myAPIKey}`
            : `https://maps.geoapify.com/v1/tile/{mapStyle}/{z}/{x}/{y}@2x.png?apiKey=${myAPIKey}`;

        //https://tile.openstreetmap.org/{z}/{x}/{y}.png
        // Add map tiles layer. Set 20 as the maximal zoom and provide map data attribution.
        L.tileLayer(mapURL, {
            attribution: 'Powered by Los Pibes del Barrio',
            apiKey: myAPIKey,
            mapStyle: "osm-bright-smooth", // More map styles on https://apidocs.geoapify.com/docs/maps/map-tiles/
            maxZoom: 19
        }).addTo(mapa);

        mapa.on('click', async function (e) {
            var latLng = e.latlng;
            var lat = latLng.lat;
            var lng = latLng.lng;

            let name = await getNombreByCoordenadas(lat, lng);

            agregarPuntos([lat, lng, name]);
        });

        // Add Geoapify Address Search control
        const addressSearchControl = L.control.addressSearch(myAPIKey, {
            position: 'topleft',
            resultCallback: (address) => {
                if (marker) {
                    marker.remove();
                }

                if (!address) {
                    return;
                }

                agregarPuntos([address.lat, address.lon, address.address_line1 + " " + address.address_line2]);
                //marker = L.marker([address.lat, address.lon]).addTo(mapa);
                if (address.bbox && address.bbox.lat1 !== address.bbox.lat2 && address.bbox.lon1 !== address.bbox.lon2) {
                    mapa.fitBounds([[address.bbox.lat1, address.bbox.lon1], [address.bbox.lat2, address.bbox.lon2]], { padding: [100, 100] })
                } else {
                    mapa.setView([address.lat, address.lon], 15);
                }
            },
            suggestionsCallback: (suggestions) => {
                // console.log(suggestions);
            }
        });
        mapa.addControl(addressSearchControl);
        L.control.zoom({ position: 'bottomright' }).addTo(mapa);

    }, [mapa])

    return (
        <>
            <div className='bg-black flex'>
                <div className='col'>
                    <div className="row text-white justify-center flex p-2 text-xl">
                        <h1>RouteOptimizer</h1>
                    </div>
                    <div className="row">

                        <div id='map'></div>


                    </div>
                    <div className="row justify-center">
                        <div className="flex space-x-4 justify-between p-2">
                            <button onClick={limpiarPuntos} className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                <h1
                                    className='text-white'
                                >Limpiar Puntos</h1>
                            </button>

                            <button
                                onClick={rutaTest}
                                className="bg-green-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                <h1
                                    className='text-white'
                                >Optimizar Ruta</h1>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col text-white">
                    <ListaPuntos eliminar={eliminarPunto} puntos={puntosMapa}></ListaPuntos>
                </div>

            </div>

        </>
    )
}

export default Mapa;