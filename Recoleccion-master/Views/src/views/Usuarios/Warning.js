import React from 'react';
import {
  callApi,
  callKrakenApi,
  showSweetAlert,
  getCliente,
  getSessionItem,
} from '../../utils/utils';
import { config } from '../../utils/config';
import { Row } from 'reactstrap';

function Warning(props) {
  const ipadress = getSessionItem('Ipaddress');
  const NumbUsuario = getSessionItem('NumUsuario');
    const handlepoppesaje = () => {
    props.setpoppesaje(!props.poppesaje)
    }

    const handlecancel = () => {

      const urlKrakenService = `${config.KrakenService}/${24}/${37}`;
      props.row && props.row.forEach((ro)=>{
        console.log(ro)
        /* eslint-disable */
        const data12 = {
          parameters:
            '{"ClaUbicacion":' +
            props.editBoxValue +
            ',"ClaServicioJson":12,"Parametros":"@pnClaUbicacion=' +
            props.editBoxValue +
            ',@pnIdBoleta=' +
            props.placadato[0].IdBoleta +
            ',@pnClaArticuloCompra=' +
            ro.ClaArticuloCompra +
            ',@pnCantidadMaterial=' +
            ro.CantidadMaterial +
            ',@pnKilosMaterial=' +
            ro.KilosMaterial +
            ',@pnKilosReales=' +
            ro.KilosReales +
            ',@pnKilosContaminados=' +
            ro.KilosContaminados +
            ',@pnKilosDocumentados=' +
            ro.KilosDocumentados +
            ',@pnPorcentajeMaterial=' +
            ro.PorcentajeMaterial +
            ',@pnEsPesajeParcial=' +
            (ro.EsPesajeParcial ? ro.EsPesajeParcial : 1) +
            ',@pnClaAlmacen=' +
            (ro.ClaAlmacen ? ro.ClaAlmacen : 1) +
            ',@pnClaSubAlmacenCompra=' +
            [props.placadato[0].ClaSubAlmacenCompra] +
            ',@pnClaMotivoContaminacion=' +
            (ro.ClaMotivoContaminacion ? ro.ClaMotivoContaminacion : 0) +
            ',@pnEsNoCargoDescargoMaterial=' +
            props.placadato[0].EsNoCargoDescargoMaterial +
            ',@pnClaProveedor=' +
            props.placadato[0].ClaProveedor +
            ',@pnIdListaPrecio=' +
            props.placadato[0].IdListaPrecio +
            ',@pnClaTipoOrdenCompra=,@pnClaOrdenCompra=,@pnClaUbicacionProveedor=' +
            props.placadato[0].ClaUbicacionProveedor +
            ',@psClaReferenciaCompra=' +
            ro.ClaReferenciaCompra +
            ',@pnIdRenglon=' +
            ro.IdRenglon +
            ',@psNombrePcMod=' +
            ipadress +
            ',@pnClaUsuarioMod=' +
            NumbUsuario +
            ',@pnAccionSp=3"}',
          tipoEstructura: 0,
        };
        /* eslint-enable */
         callApi(urlKrakenService, 'POST', data12, (res) => {
          console.log(res);
        })
      })
      
      props.setpesajeparcial(0)
      props.setpoppesaje(!props.poppesaje)
      }
  return (
    <div className="Warning">
      <div className="warning-container">
        <span className="warning-close" style={{cursor:"pointer"}} onClick={handlepoppesaje}>X</span>
        <div>Pesaje parcial pendiente - ¿ Desea cancelar la Operación ?&nbsp; &nbsp; <span style={{cursor:"pointer"}} onClick={handlecancel}>SI</span>&nbsp; &nbsp; &nbsp;<span style={{cursor:"pointer"}} onClick={handlepoppesaje}>NO</span></div>
      </div>
    </div>
  );
}

export default Warning;
