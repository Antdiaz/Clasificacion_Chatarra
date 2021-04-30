import React, { useState, useEffect } from 'react';
import Form, { EmptyItem, Item } from 'devextreme-react/form';
import SelectBox from 'devextreme-react/select-box';
import 'devextreme-react/text-area';
import {
  Row,
  Col,
  Card,
  CardText,
  CardHeader,
  CardBody,
  CardTitle,
  Button,
  Input,
} from 'reactstrap';
import { config } from '../../utils/config';
import {
  callApi,
  callKrakenApi,
  showSweetAlert,
  getCliente,
  getSessionItem,
} from '../../utils/utils';
import Items from './Items';
import create from 'zustand';
import { Link } from 'react-router-dom';

function Consulta({ Valores, Datos, setDatos, Patio, editBoxValue, seteditBoxValue }) {
  const [Filtro, setFiltro] = useState(null);

  const handleChange = (event) => {
    setFiltro(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Filtro !== null) {
      setDatos(Filtro);
    } else if (Filtro === null) {
      setDatos(null);
    }
  };

  return (
    <div style={{minHeight: "450px"}}>
      <Row className="align-items-start" style={{ marginTop: '40px' }}>
        <Col className="input-search" md={{ size: 1, offset: 3 }}>
          <h2>Filtrar: </h2>
        </Col>
        <Col className="input-bar" md={{ size: 4, offset: 0 }}>
          <div className="popup-materiales">
            <Input
              onChange={handleChange}
              type="text"
              className="kar-input-login"
              placeholder="Agregar a filtrado"
              // value=""
            />
          </div>
        </Col>
        <Col className="input-search" md={{ size: 1, offset: 0 }}>
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

      {Valores && (
        <Items
          listas={
            Datos
              ? Valores.filter(
                  (lista) =>
                    lista.ClaVehiculoPorClasificar.includes(Datos) ||
                    [lista.NomChofer].includes(Datos) ||
                    [lista.NomProveedor].includes([Datos]) ||
                    lista.NomMotivoEntrada.includes(Datos) ||
                    lista.IdBoleta.toString().includes(Datos) ||
                    lista.IdBoleta.toString().includes(Datos) ||
                    lista.PesoEntrada.toString().includes(Datos) ||
                    lista.NomTransporte.includes(Datos) ||
                    lista.NomTransportista.includes(Datos) ||
                    lista.NomMotivoEntrada.includes(Datos)
                ) || lista.PesoEntrada.includes(Datos)
              : Valores
          }
        />
      )}
    </div>
  );
}

export default Consulta;
