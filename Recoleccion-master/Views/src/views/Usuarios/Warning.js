import React from 'react';

function Warning({poppesaje,setpoppesaje,pesajeparcial,setpesajeparcial}) {

    const handlepoppesaje = () => {
    setpoppesaje(!poppesaje)
    }

    const handlecancel = () => {
      const urlKrakenService = `${config.KrakenService}/${24}/${37}`;

      
      const data12 = {
        parameters:
          '{"ClaUbicacion":' +
          props.editBoxValue +
          ',"ClaServicioJson":12,"Parametros":"@pnClaUbicacion=' +
          props.editBoxValue +
          ',@pnIdBoleta=' +
          props.placadato[0].IdBoleta +
          ',@pnClaArticuloCompra=' +
          props.ro.ClaArticuloCompra +
          ',@pnCantidadMaterial=' +
          props.ro.CantidadMaterial +
          ',@pnKilosMaterial=' +
          props.ro.KilosMaterial +
          ',@pnKilosReales=' +
          kilos +
          ',@pnKilosContaminados=' +
          kiloscont +
          ',@pnKilosDocumentados=' +
          props.ro.KilosDocumentados +
          ',@pnPorcentajeMaterial=' +
          porcentajer +
          ',@pnEsPesajeParcial=' +
          (props.ro.EsPesajeParcial ? props.ro.EsPesajeParcial : pesajeparcial) +
          ',@pnClaAlmacen=' +
          (props.ro.ClaAlmacen ? props.ro.ClaAlmacen : 0) +
          ',@pnClaSubAlmacenCompra=' +
          [props.placadato[0].ClaSubAlmacenCompra] +
          ',@pnClaMotivoContaminacion=' +
          razoncont +
          ',@pnEsNoCargoDescargoMaterial=' +
          props.placadato[0].EsNoCargoDescargoMaterial +
          ',@pnClaProveedor=' +
          props.placadato[0].ClaProveedor +
          ',@pnIdListaPrecio=' +
          props.placadato[0].IdListaPrecio +
          ',@pnClaTipoOrdenCompra=,@pnClaOrdenCompra=,@pnClaUbicacionProveedor=' +
          props.placadato[0].ClaUbicacionProveedor +
          ',@psClaReferenciaCompra=' +
          '' +
          props.ro.ClaReferenciaCompra +
          Referencia +
          ',@pnIdRenglon=' +
          props.ro.IdRenglon +
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
      });
      setpesajeparcial(0)
      setpoppesaje(!poppesaje)
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
