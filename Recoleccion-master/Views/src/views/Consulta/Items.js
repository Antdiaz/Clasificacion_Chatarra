import React from 'react'
import 'devextreme-react/text-area';
import { Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';



const Items= ({listas}) => {
    return (
      <div>
        {listas !==undefined && listas.map((lista) => (
          <div key={lista.IdBoleta} style={{marginTop: "20px"}}>
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
                    <Link style={{color:"rgb(41, 41, 41)"}} to={`/Informacion/${lista.ClaVehiculoPorClasificar ? lista.ClaVehiculoPorClasificar : "Sin dato" }/${lista.IdBoleta}`}>
                      <i className="fa fa-info-circle fa-2x" aria-hidden="true"></i>
                    </Link>
                    <div className="form" style={{width: "100%"}}>
                      <div className="dx-fieldset">
                        <div className="dx-fieldset-header"><span style={{marginRight: "30px"}}>{lista.ClaVehiculoPorClasificar}</span> <span>{lista.NomTransporte}</span> </div>
                        <div className="dx-field">
                          <div className="dx-field-label">Chofer :</div>
                          <div className="dx-field-value-static">{lista.NomChofer}</div>
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
                          <div className="dx-field-value-static">{lista.PesoEntrada}&nbsp; {lista.NomCortoUnidadEntrada}</div>
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
