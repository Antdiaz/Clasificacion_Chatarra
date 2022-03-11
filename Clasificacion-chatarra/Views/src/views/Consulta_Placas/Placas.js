import React, { useState } from 'react';
import 'devextreme-react/text-area';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

// Cascaron del mapeo de elementos
const Items = ({
  listas,
  setpoppesaje,
  setrow,
  NomMotivoEntrada,
  setNomMotivoEntrada,
  setClaUbicacionOrigen,
  setClaViajeOrigen,
  setClaFabricacionViaje,
  setpesajeparcial,
  editBoxValue,
}) => {
  const Placas = ({lista}) => {
    const [showResults, setshowResults] = useState(false);
    const [showProv, setshowProv] = useState(false)
    const [showObservaciones, setshowObservaciones] = useState(false);

    const timediff = (Math.abs(new Date() - new Date(lista.HoraEntrada.replace("T",' ').replace(/-/g,'/').split(".")[0])))/60000;
    const hours = (timediff/60);
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours)*60;
    const rminutes = Math.round(minutes);
    const tiempo = `${rhours}h ${rminutes}m`;


    const handleShow = () => {
      setshowResults(!showResults);
    };

    const handleProv = () =>{
      setshowProv(!showProv)
    }

    const handleObservaciones = () => {
      setshowObservaciones(!showObservaciones);
    };
    return (
      <div key={lista.IdBoleta} className="placas-container">
        <Col className="column-items">
          <Row>
            <Col md="12">
              <div
                id="PlacasFiltradas"
                className="kar-component"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  overflowY: 'hidden',
                  overflowX: 'auto',
                }}
              >
                <Link
                  style={{ color: 'rgb(41, 41, 41)' }}
                  to={`/Clasificacion-Chatarra/Placa:${
                    lista.ClaVehiculoPorClasificar ? lista.ClaVehiculoPorClasificar : 'Sin dato'
                  }/Boleta:${lista.IdBoleta}`}
                >
                  {lista.ClaMotivoEntrada !==102 && lista.ClaMotivoEntrada !==111 ? (<i className="fa fa-info-circle fa-2x" title="Más información / Clasificación" onClick={() => {setpoppesaje(false);setrow(0);setNomMotivoEntrada(lista.ClaMotivoEntrada);setClaUbicacionOrigen(lista.ClaUbicacionOrigen);setClaViajeOrigen(lista.ClaViajeOrigen);setpesajeparcial(0);}} aria-hidden="true"></i>):null}
                </Link>
                <div className="form" style={{ width: '100%' }}>
                  <div className="dx-fieldset">
                    <div className="dx-fieldset-header" style={{width: '55%',display:'inline-flex',justifyContent:'space-between'}} onClick={handleShow}>
                      <span>
                        Placa:&nbsp;{lista.ClaVehiculoPorClasificar}
                      </span>
                      <small>
                        &nbsp;{lista.NomMotivoEntrada}
                      </small>
                      <i className="fas fa-ellipsis-h"></i>
                    </div>
                    <div className="dx-fieldset-header" style={{width: '40%',display:'inline-flex',float:'right',paddingLeft:'11vw'}} onClick={handleShow}>
                      {/* <i className=" estado fas fa-clock" style={{color: timediff < 30 ? '#179f17': (timediff <= 45 && timediff >= 30) ? '#ffc82b': '#f11f1f' }}></i>{lista.HoraEntrada.split("T").pop().split(".")[0]} */}
                      <i className=" estado fas fa-clock" style={{color: timediff < 30 ? '#179f17': (timediff <= 45 && timediff >= 30) ? '#ffc82b': '#f11f1f' }}></i>{tiempo}
                    </div>
                    {showResults && (
                      <div className="dx-field">
                        <div className="dx-field-label">Chofer :</div>
                        <div className="dx-field-value-static">{lista.NomChofer}</div>
                      </div>
                    )}
                    {showResults && (
                      <div className="dx-field">
                        <div className="dx-field-label">Transporte :</div>
                        <div className="dx-field-value-static">{lista.NomTransporte}</div>
                      </div>
                    )}
                    {showResults && (
                      <div className="dx-field">
                        <div className="dx-field-label">Transportista :</div>
                        <div className="dx-field-value-static">{lista.NomTransportista}</div>
                      </div>
                    )}
                    {showResults && (
                      <div className="dx-field">
                        <div className="dx-field-label">Boleta :</div>
                        <div className="dx-field-value-static">{lista.IdBoleta}</div>
                      </div>
                    )}
                    {lista.ClaProveedor == null ? null : (
                      <div className="dx-field">
                        <div className="dx-field-label" style={{overflow: 'visible'}}>Proveedor:</div>
                        <div className="dx-field-value-static" onClick={handleProv}>
                          {!showProv  ?
                            (
                              <div style={{cursor: 'pointer'}}>
                                {lista.NomProveedor.split(/\s+/).slice(0, 1) +
                                  [' '] +
                                  lista.NomProveedor.split(/\s+/).slice(2, 3)} 
                                <span>...</span>
                              </div>
                            )
                            :
                            !showResults ? (
                              <div style={{width:'25vw'}}>
                                {lista.NomProveedor}
                              </div>
                            )
                            : (
                              <div style={{width:'15vw'}}>
                                {lista.NomProveedor}
                              </div>
                            )} 
                        </div>
                      </div>
                    )}
                    {showResults && (
                      <div className="dx-field">
                        <div className="dx-field-label">Peso :</div>
                        <div className="dx-field-value-static">
                          {lista.PesoEntrada.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          &nbsp; {lista.NomCortoUnidadEntrada}
                        </div>
                      </div>
                    )}
                    {showResults && (
                      <div className="dx-field">
                        <div className="dx-field-label">Observaciones:</div>
                        <div className="dx-field-value-static" onClick={handleObservaciones} style={!showObservaciones ? {textOverflow: 'ellipsis',whiteSpace: 'nowrap',overflow: 'hidden', width:'60%'}:{width:'65%'}}>
                          {lista.Observaciones == null || lista.Observaciones === ''
                            ? 'Ninguna'
                            : lista.Observaciones}
                        </div>
                      </div>
                    )}
                    {showResults && (
                      <div className="dx-field">
                        <div className="dx-field-label">Documentado :</div>
                        <div className="dx-field-value-static">
                          {lista.PesoDocumentado == null ? 'Sin documentar' : lista.PesoDocumentad0}
                        </div>
                      </div>
                    )}
                    {showResults && (
                      <div className="dx-field">
                        <div className="dx-field-label">Fecha Entrada:</div>
                        <div className="dx-field-value-static">
                          {lista.HoraEntrada == null ? '-' : (lista.HoraEntrada.replace("T",' ').replace(/-/g,'/').split(".")[0])}
                        </div>
                      </div>
                    )}
                    {showResults && (
                      <div className="dx-field">
                        <div className="dx-field-label">Tipo :</div>
                        <div className="dx-field-value-static">{lista.NomMotivoEntrada}</div>
                      </div>
                    )}
                    {lista.ClaveViajeOrigen == null ? null : (
                      <div className="dx-field">
                        <div className="dx-field-label">Viaje:</div>
                        <div className="dx-field-value-static">{lista.ClaViajeOrigen}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </div>
    );
  };

  return (
    <div>{listas !== undefined && listas.map((lista,index) => <Placas lista={lista} key={index} />)}</div>
  );
};

export default Items;
