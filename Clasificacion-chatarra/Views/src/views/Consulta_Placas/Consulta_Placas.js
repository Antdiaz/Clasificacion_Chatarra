import React, { useState } from 'react';
import 'devextreme-react/text-area';
import { Row, Col, Button, Input } from 'reactstrap';
import Items from './Placas';

function Consulta({
  Valores,
  Datos,
  setDatos,
  filtropesaje,
  setfiltropesaje,
  showResults,
  setshowResults,
  status,
  setstatus,
  transporte,
  settransporte,
  setpoppesaje,
  setrow,
  NomMotivoEntrada,
  setNomMotivoEntrada,
  setClaUbicacionOrigen,
  setClaViajeOrigen,
  setClaFabricacionViaje,
  setpesajeparcial
}) {
  // Valor usado para el input de filtrado
  const [Filtro, setFiltro] = useState(null);

  // Función para filtrado de Placas con Pesaje Parcial
  const useCheckbox = (e) => {
    setfiltropesaje(e.target.checked);
    setDatos('');
  };
  // Función para input de filtrado
  const handleChange = (event) => {
    event.preventDefault();
    setFiltro(event.target.value);
  };

  // Función para filtrado de Tipo de Transporte
  const handleinputt = (event) => {
    event.preventDefault();
    settransporte(event.target.value);
    setDatos('');
  };

  // Función para filtrado de Tipo de Status
  const handleinputs = (event) => {
    event.preventDefault();
    setstatus(event.target.value);
    setDatos('');
  };

  const handleShow = (e) => {
    setshowResults(!showResults);
  };

  // Función para Filtrado que se agregó al input
  const handleSearch = (e) => {
    e.preventDefault();

    if (Filtro !== null) {
      setDatos(Filtro);
    } else if (Filtro === null) {
      setDatos(null);
    }
  };

  return (
    <div className="Consulta" style={{ minHeight: '450px' }}>
      <Row>
        <Col className="input-show" style={{ position: 'absolute' }}>
          {/* Símbolo ">" cuando no se muestran los filtros */}
          {!showResults && (
            <div className="extra-tab">
              <i className="fas fa-angle-down fa-2x" onClick={handleShow}></i>
            </div>
          )}
        </Col>
      </Row>
      <Col className="input-parcial">
        {/* Filtro de Pesaje Parcial */}
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
            {/* Input para filtrar por lo que el usuario escriba */}
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
            {/* Botón para hacer el filtrado */}
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
      {/* Filtros de tipo de tranporte y status */}
      {showResults && (
        <Row className="extra-filter">
          <Col md={{ size: 0, offset: 3 }}>
            <i className="fas fa-angle-right fa-2x" onClick={handleShow}></i>
          </Col>
          <Col md={{ size: 3, offset: 0 }}>
            <form className="filtro-transporte">
              <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
              <label type="text" className="filtro-texto">
                Transporte:
              </label>
              &nbsp;
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
          <Col md={{ size: 3, offset: 0 }}>
            <form>
              <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
              <label type="text" className="filtro-texto">
                {' '}
                Status:
              </label>
              &nbsp;
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
      {/* Placas de la Ubicación afectado por los filtros */}
      {Valores && (
        <Items
          setpesajeparcial={setpesajeparcial}
          setClaUbicacionOrigen={setClaUbicacionOrigen}
          setClaViajeOrigen={setClaViajeOrigen}
          setClaFabricacionViaje={setClaFabricacionViaje}
          NomMotivoEntrada={NomMotivoEntrada}
          setNomMotivoEntrada={setNomMotivoEntrada}
          setrow={setrow}
          setpoppesaje={setpoppesaje}
          listas={
            Datos && filtropesaje
              ? Valores.filter(
                  (lista) =>
                    ([lista.EsPesajeParcial].includes(1) &&
                      (status === 'porclasificar'
                        ? [lista.EsClasificado].includes(0)
                        : status === 'clasificado'
                        ? [lista.EsClasificado].includes(1)
                        : [lista.EsClasificado]) &&
                      lista.ClaVehiculoPorClasificar.toLowerCase().includes(Datos.toLowerCase())) ||
                    [lista.NomChofer].includes(Datos.toUpperCase()) ||
                    [lista.NomProveedor].includes(Datos) ||
                    lista.NomMotivoEntrada.toLowerCase().includes(Datos.toLowerCase()) ||
                    lista.IdBoleta.toString().includes(Datos) ||
                    lista.PesoEntrada.toString().includes(Datos.replace(/,/g, '')) ||
                    lista.NomTransporte.includes(Datos.toUpperCase()) ||
                    lista.NomTransportista.includes(Datos.toUpperCase())
                )
              : !Datos && filtropesaje
              ? Valores.filter(
                  (lista) =>
                    [lista.EsPesajeParcial].includes(1) &&
                    (transporte === 'ferrocarril'
                      ? [lista.ClaTransporte].includes(8)
                      : transporte === 'autotransporte'
                      ? ![lista.ClaTransporte].includes(8)
                      : [lista.ClaTransporte]) &&
                    (status === 'porclasificar'
                      ? [lista.EsClasificado].includes(0)
                      : status === 'clasificado'
                      ? [lista.EsClasificado].includes(1)
                      : [lista.EsClasificado])
                )
              : Datos && !filtropesaje
              ? Valores.filter(
                  (lista) =>
                    ((transporte === 'ferrocarril'
                      ? [lista.ClaTransporte].includes(8)
                      : transporte === 'autotransporte'
                      ? ![lista.ClaTransporte].includes(8)
                      : [lista.ClaTransporte]) &&
                      (status === 'porclasificar'
                        ? [lista.EsClasificado].includes(0)
                        : status === 'clasificado'
                        ? [lista.EsClasificado].includes(1)
                        : [lista.EsClasificado]) &&
                      lista.ClaVehiculoPorClasificar.toLowerCase().includes(Datos.toLowerCase())) ||
                    [lista.NomChofer].includes(Datos.toUpperCase()) ||
                    [lista.NomProveedor].includes(Datos) ||
                    lista.NomMotivoEntrada.toLowerCase().includes(Datos.toLowerCase()) ||
                    lista.IdBoleta.toString().includes(Datos) ||
                    lista.PesoEntrada.toString().includes(Datos.replace(/,/g, '')) ||
                    lista.NomTransporte.includes(Datos.toUpperCase()) ||
                    lista.NomTransportista.includes(Datos.toUpperCase())
                )
              : !Datos &&
                !filtropesaje &&
                Valores.filter(
                  (lista) =>
                    (status === 'porclasificar'
                      ? [lista.EsClasificado].includes(0)
                      : status === 'clasificado'
                      ? [lista.EsClasificado].includes(1)
                      : [lista.EsClasificado]) &&
                    (transporte === 'ferrocarril'
                      ? [lista.ClaTransporte].includes(8)
                      : transporte === 'autotransporte'
                      ? ![lista.ClaTransporte].includes(8)
                      : [lista.ClaTransporte])
                )
          }
        />
      )}
    </div>
  );
}

export default Consulta;