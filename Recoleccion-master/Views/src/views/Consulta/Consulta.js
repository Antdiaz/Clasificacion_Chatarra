import React, {useState,useEffect} from 'react'
import Form, { EmptyItem, Item } from 'devextreme-react/form';
import SelectBox from 'devextreme-react/select-box';
import 'devextreme-react/text-area';
import { Row, Col, Card, CardText, CardHeader, CardBody, CardTitle, Button, Input } from 'reactstrap';
import { config } from '../../utils/config';
import { callApi, callKrakenApi, showSweetAlert, getCliente,getSessionItem } from '../../utils/utils';
import Items from './Items';
import create from 'zustand'

function Consulta() {

        const [Filtro, setFiltro] = useState(null)
        const [Valores, setValores] = useState(null)
        const [Datos, setDatos] = useState(null)
        const [Usuario, setUsuario] = useState(null)
        const NumbUsuario = getSessionItem('NumUsuario')

        console.log(NumbUsuario)
        console.log(Usuario)

        useEffect(() => {
          const urlKrakenService = `${config.KrakenService}/${24}/${2}`;
          const urlKrakenUsuario=`${config.KrakenService}/${24}/${3}`;
/* eslint-disable */
          const data = {
            parameters: "{\"ClaUbicacion\":26,\"Valor\":\"%%%\"}",
            tipoEstructura: 1
          };

          const data3 = {
            parameters: "{\"Usuario\":" + NumbUsuario +"}",
            tipoEstructura: 1
          };
/* eslint-enable */

          callApi(urlKrakenUsuario, 'POST',data3,  (res) => {
              setUsuario(res.Result0[0].IdUsuario)
        });

          callApi(urlKrakenService, 'POST',data,  (res) => {
              setValores(res.Result0)
          });
        }, []);


        const handleChange = event => {
            setFiltro(event.target.value)
        }


    const handleSubmit = e =>{
        e.preventDefault();

        if (Filtro !== null ){
          setDatos(Filtro)
         }
        else if (Filtro === null){

          setDatos(null)
        }

    }

    return (
      <div>
        <Row className="align-items-start" style={{marginTop: "40px"}}>
          <Col md={{ size: 1, offset: 3 }}>
            <h2>Filtrar: </h2>
          </Col>
          <Col md={{ size: 4,offset:0 }}>
            <Input
              onChange={handleChange}
              type="text"
              className="kar-input-login"
              placeholder="Agregar a filtrado"
              // value=""
            />
          </Col>
          <Col md={{ size: 1,offset: 0}}>
            <div id="formularioTickets">
              <Button
                onClick={handleSubmit}
                className="animation-on-hover float-right"
                color="success"
              >
                <i className="fa fa-search" aria-hidden="true"></i>
              </Button>
            </div>
          </Col>
        </Row>

        {Valores && <Items listas={Datos ? Valores.filter((lista) =>lista.ClaVehiculoPorClasificar.includes(Datos) || lista.NomTransporte.includes(Datos) || lista.NomTransportista.includes(Datos) || lista.NomMotivoEntrada.includes(Datos)) || lista.PesoEntrada.includes(Datos): Valores} />}
      </div>
    )
}

export default Consulta 
