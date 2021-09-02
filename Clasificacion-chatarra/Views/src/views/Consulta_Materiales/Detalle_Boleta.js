import React,{useEffect,useState} from 'react'
import { config } from '../../utils/config';
import { callApi} from '../../utils/utils';
import 'devextreme-react/text-area';
import { Row, Col} from 'reactstrap';


// Elemento Cascaron para detalle de la placa
const DetalleBoleta= ({listas,material,setmaterial,editBoxValue,NomMotivoEntrada,ClaUbicacionOrigen,ClaViajeOrigen,setMaterialviaje,TipoTraspaso,setTipoTraspaso,Materialviaje,ClaFabricacionViaje}) => {
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
        ',@pnIdListaPrecio=' +
        listas[0].IdListaPrecio +
        ',@pnIdBoleta=' +
        listas[0].IdBoleta +
        '"}',
      tipoEstructura: 0,
    };

    const data29 = {
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"ClaServicioJson":29,"Parametros":"@pnClaUbicacion=' +
        editBoxValue +
        ',@pnClaUbicacionOrigen=' +
        ClaUbicacionOrigen+
        ',@pnClaViajeOrigen=' +
        ClaViajeOrigen +
        ',@pnClaFabricacionViaje=' +
        ClaFabricacionViaje +
        '"}',
      tipoEstructura: 0,
    };

    /* eslint-enable */

    if(NomMotivoEntrada===9 && material === null){
    callApi(urlKrakenService, 'POST', data5, (res) => {
      setmaterial(res.Result0);
    });

  }
  if(NomMotivoEntrada===3 ){
    if(ClaFabricacionViaje!==0)
    callApi(urlKrakenService, 'POST', data29, (res) => {
      setMaterialviaje(res.Result0);
      setTipoTraspaso(res.Result0[0].EsPT);
    });
  } 
  }, [ClaFabricacionViaje]);

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
                    overflowX: 'auto',
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
                            <div className="dx-field-value-static block">{lista.NomProveedor.split(/\s+/).slice(0,1) + [" "] + lista.NomProveedor.split(/\s+/).slice(2,3)}</div>
                          </div>
                        )}
                        <div className="dx-field ">
                          <div className="dx-field-label block">Peso :</div>
                          <div className="dx-field-value-static block">{lista.PesoEntrada.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{lista.NomCortoUnidadEntrada}</div>
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
                          <div className="dx-field-value-static block" style={{witdh: '60%'}} onClick={handleShow}> {lista.Observaciones==null ||lista.Observaciones==="" ?"" : !showResults ? <i className="fas fa-ellipsis-h" style={{ cursor: 'pointer' }}></i>: lista.Observaciones}</div>
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
