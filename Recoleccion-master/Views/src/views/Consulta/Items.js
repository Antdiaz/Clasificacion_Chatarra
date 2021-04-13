import React, {useState, useEffect} from 'react'
import Form, { Item } from 'devextreme-react/form';
import SelectBox from 'devextreme-react/select-box';
import FileUploader from 'devextreme-react/file-uploader';
import { Autocomplete } from 'devextreme-react/autocomplete';
import Header from '../../components/Headers/Header';
import 'devextreme-react/text-area';
import { Row, Col, Card, CardText, CardHeader, CardBody, CardTitle, Button, Input } from 'reactstrap';
import GraficaPie from '../Grafica/Grafica';



const Items= ({listas}) => {
    return (
      <div>
        {listas !==undefined && listas.map((lista) => (
          <div style={{marginTop: "20px"}}>
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
                    <i className="fa fa-info-circle fa-2x" aria-hidden="true"></i>
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
                            <div className="dx-field-value-static">{lista.ClaProveedor}</div>
                          </div>
                        )}
                        <div className="dx-field">
                          <div className="dx-field-label">Peso :</div>
                          <div className="dx-field-value-static">{lista.PesoEntrada} Kg</div>
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
