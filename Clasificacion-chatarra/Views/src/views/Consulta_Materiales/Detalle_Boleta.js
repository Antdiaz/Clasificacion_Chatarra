import React from 'react'
import 'devextreme-react/text-area';
import { Row, Col} from 'reactstrap';



const DetalleBoleta= ({listas}) => {
    return (
      <div>
        {listas !==undefined && listas.map((lista) => (
          <div key={lista.IdBoleta}>
            <Col>
              <Row>
                <Col md="1block" style={{padding: "0px"}}>
                  <div
                    id="PlacasFiltradas"
                    className="kar-component"
                    style={{
                    borderRadius: "0px 0px 10px 10px",
                    padding:"0px",
                    display: "flex",
                    flexDirection: 'column',
                    height: "100%",
                    overflowY: 'hidden',
                    overflowX: 'auto',
                    backgroundColor: '#eeeeee'
                    }}
                  >
                    <div className="form" style={{width: "100%"}}>
                      <div className="dx-fieldset">
                        <div className="dx-field">
                          <div className="dx-field-label block">Placa :</div>
                          <div className="dx-field-value-static block">{lista.ClaVehiculoPorClasificar}</div>
                        </div>
                        <div className="dx-field">
                          <div className="dx-field-label block">Transporte :</div>
                          <div className="dx-field-value-static block">{lista.NomTransporte}</div>
                        </div>
                        <div className="dx-field">
                          <div className="dx-field-label block">Chofer :</div>
                          <div className="dx-field-value-static block">{lista.NomChofer}</div>
                        </div>
                        <div className="dx-field">
                          <div className="dx-field-label block">Transportista :</div>
                          <div className="dx-field-value-static block">{lista.NomTransportista}</div>
                        </div>
                        <div className="dx-field">
                          <div className="dx-field-label block">Boleta :</div>
                          <div className="dx-field-value-static block">{lista.IdBoleta}</div>
                        </div>
                        {lista.ClaProveedor ==null ? null : (
                          <div className="dx-field">
                            <div className="dx-field-label block">Proveedor:</div>
                            <div className="dx-field-value-static block">{lista.NomProveedor}</div>
                          </div>
                        )}
                        <div className="dx-field ">
                          <div className="dx-field-label block">Peso :</div>
                          <div className="dx-field-value-static block">{lista.PesoEntrada}{lista.NomCortoUnidadEntrada}</div>
                        </div>
                        <div className="dx-field">
                          <div className="dx-field-label block">Documentado :</div>
                          <div className="dx-field-value-static block">{lista.PesoDocumentado==null ? "Sin documentar": lista.PesoDocumentad0}</div>
                        </div>
                        <div className="dx-field">
                          <div className="dx-field-label block">Tipo :</div>
                          <div className="dx-field-value-static block">{lista.NomMotivoEntrada}</div>
                        </div>
                        {lista.ClaveViajeOrigen ==null ? null : (
                          <div className="dx-field">
                            <div className="dx-field-label block">Viaje:</div>
                            <div className="dx-field-value-static block">{lista.ClaViajeOrigen}</div>
                          </div>
                        )}
                        <div className="dx-field">
                          <div className="dx-field-label block">Observaciones:</div>
                          <div className="dx-field-value-static block">{lista.Observaciones==null ||lista.Observaciones==="" ?"Ninguna" : lista.Observaciones}</div>
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

export default DetalleBoleta
