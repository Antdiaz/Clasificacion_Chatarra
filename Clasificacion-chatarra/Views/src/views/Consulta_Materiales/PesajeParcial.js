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
  const Token = getSessionItem('Token');
    const handlepoppesaje = () => {
    props.setpoppesaje(!props.poppesaje)
    }
  const CantidadSum=props.row &&  props.row.reduce((acc, val) => acc + (props.NomMotivoEntrada===9 ? val.CantidadMaterial: val.CantRecibida), 0);


// Función para cancelar proceso de pesaje parcial
 // Función que elimina material que el usuario desee (Se usa el parámetro de AccionSP = 3 para eliminar)
  // Servicio JSON 12 --> SP= BasSch.BasRegistraMaterialClasEntCompraMatPrimaProc <Registra material a clasificar>
    const handlecancel = () => {
 /* eslint-disable */
      const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
      const urlKrakenBloque = `${config.KrakenService}/${24}/${config.Bloque}`;
  

  
        if(props.NomMotivoEntrada===9){

          const data11 = 
          [ `@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@psObservaciones='${(props.placadato[0].Observaciones ? props.placadato[0].Observaciones.replace('#', '%23').replace(/\r\n|\n/gi,'').replace(/['\']/g,''): '')}'${config.Separador}@pnEsRevisionEfectuada=${props.placadato[0].EsRevisionEfectuada}${config.Separador}@pnClaTipoClasificacion=${props.placadato[0].ClaTipoClasificacion}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@psOrigen='WEB'`];
      
          const data12= props.row && props.row.map((element,index)=>{
            if(element.ClaArticuloCompra && element.KilosMaterial===0){
          const data = [`@@TransactionSAMP:@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaArticuloPreReg=${element.ClaArticuloPreReg ? element.ClaArticuloPreReg: 0}${config.Separador}@pnClaArticuloCompra=${element.ClaArticuloCompra}${config.Separador}@pnCantidadMaterial=${(element.CantidadMaterial)}${config.Separador}@pnKilosMaterial=${element.KilosMaterial}${config.Separador} @pnKilosReales=${(element.KilosReales)}${config.Separador}@pnKilosContaminados=${element.KilosContaminados}${config.Separador}@pnKilosDocumentados=${(element.KilosDocumentados)}${config.Separador}@pnPorcentajeMaterial=${(element.PorcentajeMaterial)}${config.Separador}@pnEsPesajeParcial=${(element.EsPesajeParcial)}${config.Separador}@pnClaAlmacen=${element.ClaAlmacen}${config.Separador}@pnClaSubAlmacenCompra=${element.ClaSubAlmacenCompra}${config.Separador}@pnClaMotivoContaminacion=${element.ClaMotivoContaminacion ? element.ClaMotivoContaminacion: 0}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@pnClaProveedor=${props.placadato[0].ClaProveedor}${config.Separador}@pnIdListaPrecio=${props.placadato[0].IdListaPrecio}${config.Separador}@pnClaTipoOrdenCompra=''${config.Separador}@pnClaOrdenCompra=''${config.Separador}@pnClaUbicacionProveedor=${props.placadato[0].ClaUbicacionProveedor}${config.Separador}@psClaReferenciaCompra='${element.ClaReferenciaCompra}'${config.Separador}@pnIdRenglon=${(element.IdRenglon)}${config.Separador}@pnKilosElectrodomesticos=${(element.KilosElectrodomesticos ? element.KilosElectrodomesticos : 0)}${config.Separador}@pnKilosBote=${(element.KilosBote ? element.KilosBote : 0)}${config.Separador}@pnObservaciones='${(element.Observaciones)}'${config.Separador}@pnAccionSp=3${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]
      
            return data
              }
          });
    
          const data13 =
          [`@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaTipoClasificacion=1${config.Separador}@pnClaUbicacionProveedor=${props.placadato[0].ClaUbicacionProveedor}${config.Separador}@pnClaOrdenCompra=''${config.Separador}@pnClaTipoOrdenCompra=''${config.Separador}@pnIdListaPrecio=${props.placadato[0].IdListaPrecio}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@pnEsPesajeParcial=${props.placadato[0].pesajeparcial ? props.placadato[0].pesajeparcial : 0}`]
        
      
          const data83 ={ parameters: `{"ClaUbicacion":${props.editBoxValue},"Token":"${Token}","ClaServicioJson":"83","IdBoleta":"${props.placadato[0].IdBoleta}","EnBloque":"${1}","Encabezado":"${data11}","Detalle":"${data12.join("")}","Validacion":"${props.row.length>1 ?  data13 :''}"}`,
          tipoEstructura: 0}

          console.log(data83)
         callApi(urlKrakenBloque, 'POST', data83, (res) => {
          // console.log(res);
        })
      }

      if(props.NomMotivoEntrada===3 ){
        const data36 = 
        [ `@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaViajeOrigen=${props.placadato[0].ClaViajeOrigen}${config.Separador}@pnClaUbicacionOrigen=${props.placadato[0].ClaUbicacionOrigen}${config.Separador}@pnClaTransporte=${props.placadato[0].ClaTransporte}${config.Separador}@pnClaTransportista=${props.placadato[0].ClaTransportista}${config.Separador}@psNomTransportista='${props.placadato[0].NomTransportista}'${config.Separador}@psNomChofer='${(props.placadato[0].NomChofer !== null ? props.placadato[0].NomChofer: 0)}'${config.Separador}@psPlacas='${props.placadato[0].Placas}'${config.Separador}@pnPesoDocumentado=${(props.placadato[0].PesoDocumentado ? props.placadato[0].PesoDocumentado :0)}${config.Separador}@psObservaciones='${(props.placadato[0].Observaciones ? props.placadato[0].Observaciones.replace('#', '%23').replace(/\r\n|\n/gi,'').replace(/['\']/g,''): '')}'${config.Separador}@pnEsRevisionEfectuada=${(props.placadato[0].EsRevisionEfectuada ? props.placadato[0].EsRevisionEfectuada : 0)}${config.Separador}@pnClaTipoClasificacion=${props.placadato[0].ClaTipoClasificacion}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@psOrigen='WEB'`];
    
  
        const data37= props.row && props.row.map((element,index)=>{
          if(element.ClaMaterialRecibeTraspaso && element.PesoRecibido===0){
          const data = [ `@@TransactionSAMP:@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaViajeOrigen=${props.placadato[0].ClaViajeOrigen}${config.Separador}@pnClaUbicacionOrigen=${props.placadato[0].ClaUbicacionOrigen}${config.Separador}@pnIdRenglonRecepcion=${(element.IdRenglonRecepcion ? element.IdRenglonRecepcion : '')}${config.Separador}@pnIdFabricacion=${(element.IdFabricacion ? element.IdFabricacion : 0)}${config.Separador}@pnIdFabricacionDet=${(element.IdFabricacionDet ? element.IdFabricacionDet : 0)}${config.Separador}@pnClaArticuloRemisionado=${(element.ClaArticuloRemisionado ? element.ClaArticuloRemisionado : 0)}${config.Separador}@pnCantRemisionada=${(element.CantRemisionada ? element.CantRemisionada : 0)}${config.Separador}@pnClaMaterialRecibeTraspaso=${element.ClaMaterialRecibeTraspaso}${config.Separador}@pnCantRecibida=${element.CantRecibida}${config.Separador}@pnPesoRecibido=${element.PesoRecibido}${config.Separador}@pnPorcentajeMaterial=${element.PorcentajeMaterial}${config.Separador}@pnPesoTaraRecibido=${(element.PesoTaraRecibido !== null ? element.PesoTaraRecibido : 0)}${config.Separador}@pnClaAlmacen=${(element.ClaAlmacen ? element.ClaAlmacen : 1)}${config.Separador}@pnClaSubAlmacenTraspaso=${(element.ClaSubAlmacenTraspaso)}${element.ClaSubSubAlmacen !== null  && element.ClaSubSubAlmacen !== 0 ? (config.Separador+'@pnClaSubSubAlmacen='+element.ClaSubSubAlmacen) : ''}${config.Separador}@pnClaSeccion=${(element.ClaSeccion !== null ? element.ClaSeccion : 0)}${config.Separador}@psReferencia1=${(element.Referencia1 !== null ? element.Referencia1 : 0)}${config.Separador}@psReferencia2=${(element.Referencia2 !== null ? element.Referencia2 : 0)}${config.Separador}@psReferencia3=${(element.Referencia3 !== null ? element.Referencia3 : 0)}${config.Separador}@psReferencia4=${(element.Referencia4 !== null ? element.Referencia4 : 0)}${config.Separador}@psReferencia5=${(element.Referencia5 !== null ? element.Referencia5 : 0)}${config.Separador}@pnEsPesajeParcial=${element.EsPesajeParcial}${config.Separador}@pnKilosReales=${(element.KilosReales ? element.KilosReales : 0)}${config.Separador}@pnKilosContaminados=${(element.KilosContaminados ? element.KilosContaminados : 0)}${config.Separador}@pnClaMotivoContaminacion=${(element.ClaMotivoContaminacion ? element.ClaMotivoContaminacion : 0)}${config.Separador}@pnClaReferenciaTraspaso=${element.ClaReferenciaTraspaso}${config.Separador}@psClaContaminantes='1|2|3|4|5|6|'${config.Separador}@psValorContaminantes='0|0|0|0|0|0|'${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@pnObservaciones='${(element.Observaciones)}'${config.Separador}@pnAccionSp=3${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`];
  
            return data
            }
          });
        
        const data38 =
        [`@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaUbicacionOrigen=${props.placadato[0].ClaUbicacionOrigen}${config.Separador}@pnClaViajeOrigen=${props.placadato[0].ClaViajeOrigen}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]
      
    
        const data84 ={ parameters: `{"ClaUbicacion":${props.editBoxValue},"Token":"${Token}","ClaServicioJson":"84","IdBoleta":"${props.placadato[0].IdBoleta}","EnBloque":"${1}","Encabezado":"${data36}","Detalle":"${data37.join('')}","Validacion":"${props.row.length>1 ? data38 : ''}"}`,
      tipoEstructura: 0}

      console.log(data84)
        callApi(urlKrakenBloque, 'POST', data84, (res) => {
          // console.log(res);
        })}

      if(props.NomMotivoEntrada===1 ){
        const data64 = [ `@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@psPlacas='${props.placadato[0].Placas}'${config.Separador}@pnIdPlanCarga=${(props.BoxPlanCarga ? props.BoxPlanCarga : props.placadato[0].ClaPlanCarga )}${config.Separador}@psObservaciones='${props.placadato[0].Observaciones.replace(/\r\n|\n/gi,'').replace(/['\']/g,'')}'${config.Separador}@pnEsRevisionEfectuada=${props.placadato[0].EsRevisionEfectuada}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@psOrigen='WEB'`];



        const data65= props.row && props.row.map((ro,index)=>{
          if(ro.ClaArticuloPlanCarga && ro.KilogramosEmbarcados===0){
            const data = 
            [ `@@TransactionSAMP:@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@psClaVehiculoPorClasificar='${props.placadato[0].IdTagVehiculoPorClasificar}'${config.Separador}@psPlacas='${props.placadato[0].Placas}'${config.Separador}@pnClaPlanCarga=${(props.BoxPlanCarga ? props.BoxPlanCarga : props.placadato[0].ClaPlanCarga )}${config.Separador}@pnOrdenAcomodo=${ro.OrdenAcomodo}${config.Separador}@pnIdFabricacion=${ro.IdFabricacion}${config.Separador}@pnIdFabricacionDet=${ro.IdFabricacionDet}${config.Separador}@pnIdRenglon=1${config.Separador}@pnClaArticuloPlanCarga=${ro.ClaArticuloPlanCarga}${config.Separador}@pnClaAlmacen=${ro.ClaAlmacen}${config.Separador}@pnClaSubAlmacen=${ro.ClaSubAlmacen}${config.Separador}@psClaReferencia='${((ro.ClaReferencia !==0 && ro.ClaReferencia !==null)? ro.ClaReferencia :0 )}'${config.Separador}@pnClaTipoReferencia=${ro.ClaTipoReferencia}${config.Separador}@pnCantEmbarcada=${ro.CantEmbarcada}${config.Separador}@pnKilogramosEmbarcados=${ro.KilogramosEmbarcados}${config.Separador}@pnPorcentaje=${ro.Porcentaje}${config.Separador}@pnCantEmbarcar=${ro.CantEmbarcar}${config.Separador}@pnKilogramosEmbarcar=${ro.KilogramosEmbarcar}${config.Separador}@pnEsPesajeParcial=0${config.Separador}@pnEsOrdenMaquilaInterna=0${config.Separador}@pnIdOrdenMaquila=0${config.Separador}@pnKilogramosReales=0${config.Separador}@psComentarios='${ro.Comentarios}'${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@pnAccionSp=3${config.Separador}@pnPesoAtriles=${ro.PesoAtriles}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]
            return data
            }
          });
     
        const data66 =
        [`@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaPlanCarga=${(props.placadato[0].ClaPlanCarga !== null ? props.placadato[0].ClaPlanCarga : props.BoxPlanCarga!==null ? props.BoxPlanCarga:0)}${config.Separador}@psClaVehiculoPorClasificar='${props.placadato[0].Placas}'${config.Separador}@psPlacas='${props.placadato[0].Placas}'${config.Separador}@pnEsNoCargoDescargoMaterial=${(props.placadato[0].EsNoCargoDescargoMaterial !==null ? props.placadato[0].EsNoCargoDescargoMaterial : 0)}${config.Separador}@pnPesoAtrilesTarimas=${(props.ValidaTara!==0 ? props.ValidaTara : props.placadato[0].PesoAtrilesTarimas !== null ? props.placadato[0].PesoAtrilesTarimas : 0)}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]
      
    
        const data85 ={ parameters: `{"ClaUbicacion":${props.editBoxValue},"Token":"${Token}","ClaServicioJson":"85","IdBoleta":"${props.placadato[0].IdBoleta}","EnBloque":"${1}","Encabezado":"${data64}","Detalle":"${data65.join('')}","Validacion":"${''}"}`,
        tipoEstructura: 0};
        console.log(data85)
        callApi(urlKrakenBloque, 'POST', data85, (res) => {
          // console.log(res);
        })}

  /* eslint-enable */   
      
      props.setpesajeparcial(0)
      props.setpoppesaje(!props.poppesaje)
      props.setrow('')
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
        <div>Pesaje parcial pendiente - ¿ Desea cancelar la Operación ?&nbsp; &nbsp; &nbsp; <span style={{cursor:"pointer"}} onClick={handlecancel}>SI</span>&nbsp; &nbsp; &nbsp; &nbsp;<span style={{cursor:"pointer"}} onClick={handlepoppesaje}>NO</span></div>
        <div style={{fontSize: '1vw'}}>(Se borraran los materiales pendientes a pesar)</div>
      </div>
    </div>
  );
}

export default PesajeParcial;
