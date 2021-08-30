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

      const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
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

        const data37 = {
          parameters:
            '{"ClaUbicacion":' +
            props.editBoxValue +
            ',"ClaServicioJson":37,"Parametros":"@pnClaUbicacion=' +
            props.editBoxValue +
            ',@pnIdBoleta=' +
            props.placadato[0].IdBoleta +
            ',@pnClaViajeOrigen='+
            props.placadato[0].ClaViajeOrigen +
            ',@pnClaUbicacionOrigen='+
            props.placadato[0].ClaUbicacionOrigen +
            ',@pnIdRenglonRecepcion=1,@pnIdFabricacion=' +
            ro.IdFabricacion +
            ',@pnIdFabricacionDet=' +
             1 +
            ',@pnClaArticuloRemisionado=' +
            ro.ClaArticuloRemisionado +
            ',@pnCantRemisionada=' +
            ro.CantRemisionada+
            ',@pnClaMaterialRecibeTraspaso=' +
            ro.ClaMaterialRecibeTraspaso +
            ',@pnCantRecibida=' +
            ro.CantRecibida +
            ',@pnPesoRecibido=' +
            ro.PesoRecibido +
            ',@pnPorcentajeMaterial=' +
            ro.PorcentajeMaterial +
            ',@pnPesoTaraRecibido=' +
            ro.PesoTaraRecibido +
            ',@pnClaAlmacen=' +
            (1) +
            ',@pnClaSubAlmacenTraspaso=' +
            ro.ClaSubAlmacenTraspaso +
            ',@pnClaSubSubAlmacen=' +
            ro.ClaSubSubAlmacen +
            ',@pnClaSeccion=' +
            0 +
            ',@psReferencia1=0,@psReferencia2=0,@psReferencia3=0,@psReferencia4=0,@psReferencia5=0,@pnEsPesajeParcial=' +
            ro.EsPesajeParcial  +
            ',@pnKilosReales='+(0)+
            ',@pnKilosContaminados='+
            ro.KilosContaminados+
            ',@pnClaMotivoContaminacion='+
            ro.ClaMotivoContaminacion +
            ',@pnClaReferenciaTraspaso=' +
            0 +
            ',@pnEsNoCargoDescargoMaterial=' +
            props.placadato[0].EsNoCargoDescargoMaterial +
            ',@psNombrePcMod=' +
            ipadress +
            ',@pnClaUsuarioMod=' +
            NumbUsuario +
            ',@pnAccionSp=3"}',
          tipoEstructura: 0,
        };

        const data65 = {
          parameters:
            '{"ClaUbicacion":' +
            props.editBoxValue +
            ',"ClaServicioJson":65,"Parametros":"@pnClaUbicacion=' +
            props.editBoxValue +
            ',@pnIdBoleta=' +
            props.placadato[0].IdBoleta +
            ',@psClaVehiculoPorClasificar=' +
            props.placadato[0].IdTagVehiculoPorClasificar +
            ',@psPlacas=' +
            props.placadato[0].Placas +
            ',@pnClaPlanCarga=' +  props.placadato[0].ClaPlanCarga + ',@pnOrdenAcomodo=' +
            ro.OrdenAcomodo +
            ',@pnIdFabricacion=' +
            ro.IdFabricacion +
            ',@pnIdFabricacionDet=' +
            ro.IdFabricacionDet +
            ',@pnIdRenglon=1,@pnClaArticuloPlanCarga=' +
            ro.ClaArticuloPlanCarga +
            ',@pnClaAlmacen=1,@pnClaSubAlmacen='+ ro.ClaSubAlmacen +',@psClaReferencia='+ ro.ClaReferencia +',@pnClaTipoReferencia=' +ro.ClaTipoReferencia + ',@pnCantEmbarcada=' +
            ro.CantEmbarcada +
            ',@pnKilogramosEmbarcados=' +
            ro.KilogramosEmbarcados +
            ',@pnPorcentaje=' +
            100 +
            ',@pnCantEmbarcar='+
            ro.CantEmbarcar+
            ',@pnKilogramosEmbarcar='+
            ro.KilogramosEmbarcar+
            ',@pnEsPesajeParcial=' +
            0 +
            ',@pnEsOrdenMaquilaInterna=' +
            ro.EsOrdenMaquilaInterna +
            ',@pnIdOrdenMaquila='+
            ro.IdOrdenMaquila +
            ',@pnKilogramosReales='+
            (ro.KilogramosReales === null ? 0 : ro.KilogramosReales) +
            ',@psComentarios=' + 
            ro.Comentarios + 
            ',@pnEsNoCargoDescargoMaterial='+
            props.placadato[0].EsNoCargoDescargoMaterial +
            ',@pnPesoAtriles=' + 
            ro.PesoAtriles +
            ',@psNombrePcMod=' +
            ipadress +
            ',@pnClaUsuarioMod=' +
            NumbUsuario +
            ',@pnAccionSp=2"}',
          tipoEstructura: 0,
        };
        /* eslint-enable */
        if(props.NomMotivoEntrada===9){
         callApi(urlKrakenService, 'POST', data12, (res) => {
          // console.log(res);
        })
      }

      if(props.NomMotivoEntrada===3){
        callApi(urlKrakenService, 'POST', data37, (res) => {
          // console.log(res);
        })}

      if(props.NomMotivoEntrada===1){
        callApi(urlKrakenService, 'POST', data65, (res) => {
          // console.log(res);
        })}
      })
      
      props.setpesajeparcial(0)
      props.setpoppesaje(!props.poppesaje)

      props.setActualizar(true);
    setTimeout(() =>{
props.setActualizar(false)
    }, 50);
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
