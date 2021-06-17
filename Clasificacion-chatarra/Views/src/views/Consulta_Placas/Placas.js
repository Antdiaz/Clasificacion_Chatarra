import React from 'react'
import 'devextreme-react/text-area';
import { Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';


// Cascaron del mapeo de elementos
const Items= ({listas,
  setpoppesaje,
  setrow,
  NomMotivoEntrada,
  setNomMotivoEntrada,
  setClaUbicacionOrigen,
  setClaViajeOrigen,
  setClaFabricacionViaje,
  setpesajeparcial,}) => {
    return (
      <div>
        {listas !==undefined && listas.map((lista) => (
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
                    height: "100%",
                    overflowY: 'hidden',
                    overflowX: 'auto',
                    }}
                  >
                    <Link style={{color:"rgb(41, 41, 41)"}} to={`/Clasificacion-Chatarra/Placa:${lista.ClaVehiculoPorClasificar ? lista.ClaVehiculoPorClasificar : "Sin dato" }/Boleta:${lista.IdBoleta}`}>
                      <i className="fa fa-info-circle fa-2x" onClick={()=>{setpoppesaje(true);setrow(0);setNomMotivoEntrada(lista.ClaMotivoEntrada);setClaUbicacionOrigen(lista.ClaUbicacionOrigen);setClaFabricacionViaje(0); setClaViajeOrigen(lista.ClaViajeOrigen); setpesajeparcial(0)}} aria-hidden="true"></i>
                    </Link>
                    <div className="form" style={{width: "100%"}}>
                      <div className="dx-fieldset">
                        <div className="dx-fieldset-header"><span style={{marginRight: "30px"}}>Boleta:&nbsp;{lista.ClaVehiculoPorClasificar}</span></div>
                        <div className="dx-field">
                          <div className="dx-field-label">Chofer :</div>
                          <div className="dx-field-value-static">{lista.NomChofer}</div>
                        </div>
                        <div className="dx-field">
                          <div className="dx-field-label">Transporte :</div>
                          <div className="dx-field-value-static">{lista.NomTransporte}</div>
                        </div>
                        <div className="dx-field">
                          <div className="dx-field-label">Transportista :</div>
                          <div className="dx-field-value-static">{lista.NomTransportista}</div>
                        </div>
                        <div className="dx-field">
                          <div className="dx-field-label">Boleta :</div>
                          <div className="dx-field-value-static">{lista.IdBoleta}</div>
                        </div>
                        {lista.ClaProveedor ==null ? null : (
                          <div className="dx-field">
                            <div className="dx-field-label">Proveedor:</div>
                            <div className="dx-field-value-static">{lista.NomProveedor.split(/\s+/).slice(0,1) + [" "] + lista.NomProveedor.split(/\s+/).slice(2,3)}</div>
                          </div>
                        )}
                        <div className="dx-field">
                          <div className="dx-field-label">Peso :</div>
                          <div className="dx-field-value-static">{lista.PesoEntrada.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}&nbsp; {lista.NomCortoUnidadEntrada}</div>
                        </div>
                        <div className="dx-field">
                          <div className="dx-field-label">Documentado :</div>
                          <div className="dx-field-value-static">{lista.PesoDocumentado==null ? "Sin documentar": lista.PesoDocumentad0}</div>
                        </div>
                        <div className="dx-field">
                          <div className="dx-field-label">Tipo :</div>
                          <div className="dx-field-value-static">{lista.NomMotivoEntrada}</div>
                        </div>
                        {lista.ClaveViajeOrigen ==null ? null : (
                          <div className="dx-field">
                            <div className="dx-field-label">Viaje:</div>
                            <div className="dx-field-value-static">{lista.ClaViajeOrigen}</div>
                          </div>
                        )}
                        <div className="dx-field">
                          <div className="dx-field-label">Observaciones:</div>
                          <div className="dx-field-value-static">{lista.Observaciones==null ||lista.Observaciones==="" ?"Ninguna" : lista.Observaciones}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>

          </div>
        ))}
      </div>
    );
}

export default Items
