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

function Consulta({ Valores, Datos, setDatos, Patio, editBoxValue, seteditBoxValue,filtropesaje,setfiltropesaje,showResults,setshowResults,status,setstatus,transporte,settransporte}) {
  const [Filtro, setFiltro] = useState(null);

  const useCheckbox = (e) => {
    setfiltropesaje(e.target.checked)
    setDatos('')
  }

  const handleChange = (event) => {
    event.preventDefault();
    setFiltro(event.target.value);
  };

  const handleinputt = (event) => {
    event.preventDefault();
    settransporte(event.target.value);
    setDatos('')
  };

  const handleinputs = (event) => {
    event.preventDefault();
    setstatus(event.target.value);
    setDatos('')
  };

  const handleShow = (e) => {
    setshowResults(!showResults);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (Filtro !== null) {
      setDatos(Filtro);
    } else if (Filtro === null) {
      setDatos(null);
    }
  };

  return (
    <div style={{ minHeight: '450px' }}>
      <Row>
        <Col className="input-show" style={{ position: 'absolute' }}>
          {!showResults && (
            <div className="extra-tab">
              <i className="fas fa-angle-down fa-2x" onClick={handleShow}></i>
            </div>
          )}
        </Col>
      </Row>
      <Col className="input-parcial">
        <form>
          <input
            type="checkbox"
            id="cbox1"
            onChange={useCheckbox}
            style={{ width: '12px', height: '12px' }}
            checked={filtropesaje}
          />
          <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
          <label type="text">&nbsp; Pesaje Parcial</label>
        </form>
      </Col>

      <Row className="align-items-start" style={{ marginTop: '40px' }}>
        <Col className="input-search" md={{ size: 1, offset: 3 }}>
          <h2 style={{ marginTop: '8px' }}>Filtrar: </h2>
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
              onClick={handleSearch}
              className="animation-on-hover float-right"
              color="success"
            >
              <i className="fa fa-search" aria-hidden="true"></i>
            </Button>
          </div>
        </Col>
      </Row>
      {showResults && (
        <Row className="extra-filter">
          <Col md={{ size: 0, offset: 3 }}>
            <i className="fas fa-angle-right fa-2x" onClick={handleShow}></i>
          </Col>
          <Col md={{ size: 3, offset: 0 }}>
            <form>
              <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
              <label type="text">Transporte:</label>&nbsp;
              <select
                name="vehiculo"
                id="vehiculo"
                className="extra-select"
                onChange={handleinputt}
                defaultValue={transporte}
              >
                <option value="todos">Todos</option>
                <option value="autotransporte">Autotransporte</option>
                <option value="ferrocarril">Ferrocarril</option>
              </select>
            </form>
          </Col>
          <Col md={{ size: 2, offset: 0 }}>
            <form>
              <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
              <label type="text"> Status:</label>&nbsp;
              <select
                name="status"
                id="status"
                className="extra-select"
                onChange={handleinputs}
                defaultValue={status}
              >
                <option value="todos">Todos</option>
                <option value="porclasificar">Por clasificar</option>
                <option value="endescarga">En descarga</option>
                <option value="clasificado">Clasificado</option>
              </select>
            </form>
          </Col>
        </Row>
      )}

      {Valores && (
        <Items
          listas={
            Datos && filtropesaje
              ? Valores.filter(
                  (lista) =>
                  [lista.EsPesajeParcial].includes(1) &&
                  (status === 'porclasificar' ?  [lista.EsClasificado].includes(0):status === 'clasificado' ? [lista.EsClasificado].includes(1):[lista.EsClasificado]) &&
                 lista.ClaVehiculoPorClasificar.includes(Datos) ||
                    [lista.NomChofer].includes(Datos) ||
                    [lista.NomProveedor].includes([Datos]) ||
                    lista.NomMotivoEntrada.includes(Datos) ||
                    lista.IdBoleta.toString().includes(Datos) ||
                    lista.IdBoleta.toString().includes(Datos) ||
                    lista.PesoEntrada.toString().includes(Datos) ||
                    lista.NomTransporte.includes(Datos) ||
                    lista.NomTransportista.includes(Datos) ||
                    lista.NomMotivoEntrada.includes(Datos) ||
                    lista.PesoEntrada.toString().includes(Datos)
                )
              :!Datos && filtropesaje ? Valores.filter((lista) => 
              [lista.EsPesajeParcial].includes(1) && (transporte === 'ferrocarril' ? [lista.ClaTransporte].includes(8):transporte=== 'autotransporte'? ![lista.ClaTransporte].includes(8):[lista.ClaTransporte]) &&
              (status === 'porclasificar' ?  [lista.EsClasificado].includes(0):status === 'clasificado' ? [lista.EsClasificado].includes(1):[lista.EsClasificado])
              ): Datos && !filtropesaje 
              ? Valores.filter(
                (lista) =>
                (transporte === 'ferrocarril' ? [lista.ClaTransporte].includes(8):transporte=== 'autotransporte'? ![lista.ClaTransporte].includes(8):[lista.ClaTransporte]) &&
                (status === 'porclasificar' ?  [lista.EsClasificado].includes(0):status === 'clasificado' ? [lista.EsClasificado].includes(1):[lista.EsClasificado]) &&
                  lista.ClaVehiculoPorClasificar.includes(Datos) ||
                  [lista.NomChofer].includes(Datos) ||
                  [lista.NomProveedor].includes([Datos]) ||
                  lista.NomMotivoEntrada.includes(Datos) ||
                  lista.IdBoleta.toString().includes(Datos) ||
                  lista.IdBoleta.toString().includes(Datos) ||
                  lista.PesoEntrada.toString().includes(Datos) ||
                  lista.NomTransporte.includes(Datos) ||
                  lista.NomTransportista.includes(Datos) ||
                  lista.NomMotivoEntrada.includes(Datos) ||
                  lista.PesoEntrada.toString().includes(Datos)
              ):
               !Datos && !filtropesaje  &&
               Valores.filter(
                (lista) =>
                (status === 'porclasificar' ?  [lista.EsClasificado].includes(0):status === 'clasificado' ? [lista.EsClasificado].includes(1):[lista.EsClasificado]) &&
                (transporte === 'ferrocarril' ? [lista.ClaTransporte].includes(8):transporte=== 'autotransporte'? ![lista.ClaTransporte].includes(8):[lista.ClaTransporte]))
          }
        />
      )}
    </div>
  );
}

export default Consulta;
