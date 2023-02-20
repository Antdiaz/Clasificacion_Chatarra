import React,{useEffect,useState} from 'react'
import { config } from '../../utils/config';
import { callApi} from '../../utils/utils';
import 'devextreme-react/text-area';
import { Row, Col} from 'reactstrap';


// Elemento Cascaron para detalle de la placa
const DetalleBoleta= ({Todos,listas,material,placadato,setmaterial,editBoxValue,NomMotivoEntrada,ClaUbicacionOrigen,ClaViajeOrigen,setMaterialviaje,TipoTraspaso,setTipoTraspaso,Materialviaje,ClaFabricacionViaje}) => {
  const [showResults, setshowResults] = useState(false);

    const handleShow = (e) => {
      setshowResults(!showResults);
    };
  // Función que corre servicios antes del render cada que haya un cambio de material
  // Servicio JSON 5 --> SP= AmpSch.AmpClaArticulosdeProvSel <Consultar Materiales>
  useEffect(() => {
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;

    /* eslint-disable */
    const data5 = {
      // parameters: "{\"IdListaPrecio\":"+ placadato[0].IdListaPrecio +",\"ClaOrdenCompra\":"+ placadato[0].ClaOrdenCompra+",\"IdAcuerdo\":"+ placadato[0].IdAcuerdo +",\"IdPedidoImportacion\":"+ placadato[0].IdPedidoImportacion +",\"IdBoleta\":"+ placadato[0].IdBoleta +"}",
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"ClaServicioJson":' +
        5 +
        ',"Parametros":"@pnClaUbicacion=' +
        editBoxValue +
        ''+config.Separador+'@pnIdListaPrecio=' +
        (listas[0].IdListaPrecio ? listas[0].IdListaPrecio : 0) +
        '' + ((placadato[0].IdAcuerdo === 0 || placadato[0].IdAcuerdo === null) ? '' :(''+config.Separador+'@pnIdAcuerdo='+placadato[0].IdAcuerdo+'')) +
        '' + ((placadato[0].IdPedidoImportacion === 0 || placadato[0].IdPedidoImportacion === null) ? '' :(''+config.Separador+'@pnIdPedidoImportacion='+placadato[0].IdPedidoImportacion+'')) +
        ''+config.Separador+'@pnIdBoleta=' +
        placadato[0].IdBoleta +
        '"}',
      tipoEstructura: 0,
    };

    const data29 = {
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"ClaServicioJson":29,"Parametros":"@pnClaUbicacion=' +
        editBoxValue +
        ''+config.Separador+'@pnClaUbicacionOrigen=' +
        ClaUbicacionOrigen+
        ''+config.Separador+'@pnClaViajeOrigen=' +
        ClaViajeOrigen +
        '' + ((listas[0].IdFabDefault !== null) ? (''+config.Separador+'@pnClaFabricacionViaje='+listas[0].IdFabDefault+'') : '') +
        
        // ''+config.Separador+'@pnClaFabricacionViaje=' +
        // ClaFabricacionViaje +
        '"}',
      tipoEstructura: 0,
    };

    /* eslint-enable */

    if(NomMotivoEntrada===9 && material === null && Todos !==1){
      console.log(data5,"HOLA")
    callApi(urlKrakenService, 'POST', data5, (res) => {
      setmaterial(res.Result0);
    });

  }
  if(NomMotivoEntrada===3 && Todos !==1 ){
    console.log(data29)
    callApi(urlKrakenService, 'POST', data29, (res) => {
      setMaterialviaje(res.Result0.map(v => ({...v,id: Math.floor(Math.random() * 100)})));
      setTipoTraspaso(res.Result0[0].EsPT);
      console.log(Materialviaje)
    });
  } 
  }, []);

    return (
      <div>
        {listas !==undefined && listas.map((lista) => (
          <div key={lista.IdBoleta} className="detalle-boleta">
            <Col>
              <Row style={{display:"block"}}>
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
                    overflowX: 'visible',
                    backgroundColor: '#eeeeee'
                    }}
                  >
                    <div className="form" style={{width: "100%"}}>
                      <div className="dx-fieldset">
                        <div className="dx-field">
                          <div className="dx-field-label block">Placa :</div>
                          <div className="dx-field-value-static block">{lista.ClaVehiculoPorClasificar || lista.Placas}</div>
                        </div>
                        <div className="dx-field">
                          <div className="dx-field-label block">Transporte :</div>
                          <div className="dx-field-value-static block">{lista.NomTransporte}</div>
                        </div>
                        {lista.NomChofer ===null ? null : (
                          <div className="dx-field">
                            <div className="dx-field-label block">Chofer :</div>
                            <div className="dx-field-value-static block">{lista.NomChofer}</div>
                          </div>
                         )}
                        <div className="dx-field">
                          <div className="dx-field-label block">Transportista :</div>
                          <div className="dx-field-value-static block">{lista.NomTransportista}</div>
                        </div>
                        <div className="dx-field">
                          <div className="dx-field-label block">Boleta :</div>
                          <div className="dx-field-value-static block">{lista.IdBoleta}</div>
                        </div>
                        {lista.ClaProveedor ===null ? null : (
                          <div className="dx-field">
                            <div className="dx-field-label block" style={{overflow: 'visible'}}>Proveedor:</div>
                            <div className="dx-field-value-static block">{lista.NomProveedorWeb}</div>
                          </div>
                        )}
                        {lista.PesoEntrada ===null ? null : (
                          <div className="dx-field ">
                            <div className="dx-field-label block">Peso :</div>
                            <div className="dx-field-value-static block">{lista.PesoEntrada.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{lista.NomCortoUnidadEntrada}</div>
                          </div>
                        )}
                        <div className="dx-field">
                          <div className="dx-field-label block">Documentado :</div>
                          <div className="dx-field-value-static block">{lista.PesoDocumentado==null ? "Sin documentar": lista.PesoDocumentado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                        </div>
                        {lista.ClaveViajeOrigen ==null ? null : (
                          <div className="dx-field">
                            <div className="dx-field-label block">Viaje:</div>
                            <div className="dx-field-value-static block">{lista.ClaViajeOrigen}</div>
                          </div>
                        )}
                        <div className="dx-field">
                          <div className="dx-field-label block">Observaciones:</div>
                          <div className="dx-field-value-static block" style={{width: '60%'}} onClick={handleShow}> {lista.Observaciones==null ||lista.Observaciones==="" ?"" : showResults ? <i className="fas fa-ellipsis-h" style={{ cursor: 'pointer' }}></i>: lista.Observaciones}</div>
                        </div>
                        {NomMotivoEntrada ===110 ?
                        null:
                        (
                          <div className="dx-field">
                            <div className="dx-field-label block">Fecha entrada:</div>
                            <div className="dx-field-value-static block" style={{width: '60%'}}> {lista.FechaEntrada}</div>
                          </div>
                        )}
                        <div className="dx-field">
                          <div className="dx-field-label block">Hora entrada:</div>
                          <div className="dx-field-value-static block" style={{width: '60%'}}> {lista.HoraEntrada}</div>
                        </div>
                        {NomMotivoEntrada ===110 ?
                        (
                          <div className="dx-field">
                            <div className="dx-field-label block">Viaje:</div>
                            <div className="dx-field-value-static block" style={{witdh: '60%'}}>{lista.IdBoletaOrigenTrasRec} </div>
                          </div>
                        ) : null}
                        {NomMotivoEntrada ===110 ?
                        (
                          <div className="dx-field">
                            <div className="dx-field-label block">Ubicación:</div>
                            <div className="dx-field-value-static block" style={{witdh: '60%'}}>{lista.NomUbicacionEntradaTraspaso}</div>
                          </div>
                        ) : null}

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
