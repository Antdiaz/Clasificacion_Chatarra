import React from 'react';
import {
  callApi,
  getSessionItem,
} from '../../utils/utils';
import { config } from '../../utils/config';

// Elemento pop up de Proceso de pesaje parcial
function PesajeParcial(props) {
  const ipadress = getSessionItem('Ipaddress');
  const NumbUsuario = getSessionItem('NumUsuario');
    const handlepoppesaje = () => {
    props.setpoppesaje(!props.poppesaje)
    }

// Función para cancelar proceso de pesaje parcial
 // Función que elimina material que el usuario desee (Se usa el parámetro de AccionSP = 3 para eliminar)
  // Servicio JSON 12 --> SP= BasSch.BasRegistraMaterialClasEntCompraMatPrimaProc <Registra material a clasificar>
    const handlecancel = () => {

      const urlKrakenService = `${config.KrakenService}/${24}/${37}`;
      props.row && props.row.forEach((ro)=>{
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
          // console.log(res);
        })
      })
      
      props.setpesajeparcial(0)
      props.setpoppesaje(!props.poppesaje)
      }

  // Elemento pop up visual
  return (
    <div className="Warning">
      <div className="warning-container">
        <span className="warning-close" style={{cursor:"pointer"}} onClick={handlepoppesaje}>X</span>
        <div>Pesaje parcial pendiente - ¿ Desea cancelar la Operación ?&nbsp; &nbsp; <span style={{cursor:"pointer"}} onClick={handlecancel}>SI</span>&nbsp; &nbsp; &nbsp;<span style={{cursor:"pointer"}} onClick={handlepoppesaje}>NO</span></div>
      </div>
    </div>
  );
}

export default PesajeParcial;
