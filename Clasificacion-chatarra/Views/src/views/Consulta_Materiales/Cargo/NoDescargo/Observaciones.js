import React,{useState,useEffect} from 'react'
import { Card, CardText, CardHeader, CardBody, CardTitle, Button, Row, Col,Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { callApi, getSessionItem } from '../../../../utils/utils';
import {config} from '../../../../utils/config'




function Observaciones({Observacionesno,row,setObservacionesno,placadato,editBoxValue,NomMotivoEntrada,setActualizar,setrow,Todos,TodosChange,setTodosChange,setValidaCargo}) {
    const ipadress = getSessionItem('Ipaddress');
    const NumbUsuario = getSessionItem('NumUsuario');
    const Token = getSessionItem('Token');
    const [electrobots, setelectrobots] = useState('0|0|0|0|0|0|0|0|0|0|0|0|')
    const [electrobots2, setelectrobots2] = useState('0|0|0|0|0|0|0|0|0|0|0|0|')
    const handleObservaciones = (event) => {
        setObservacionesno(event.target.value);
      };

      useEffect(() => {
          /* eslint-disable */
      row && row.map(electros => {
    
      const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
        const data70 = {
          parameters:
            '{"ClaUbicacion":' +
            editBoxValue +
            ',"ClaServicioJson":' +
            70 +
            ',"Parametros":"@pnClaUbicacion=' +
            editBoxValue +
            ''+config.Separador+'@pnIdBoleta=' +
              placadato[0].IdBoleta +
            // ',@pnClaArticuloCompra=' +
            // (props.NomMotivoEntrada===9 ? props.ro.ClaArticuloCompra : props.NomMotivoEntrada===3 && props.ro.ClaMaterialRecibeTraspaso)+
            '"}',
          tipoEstructura: 0,
        };
        /* eslint-enable */
        callApi(urlKrakenService, 'POST', data70, (res) => {
          if(res.Result0.length>0 && electros.ClaArticuloCompra){
          const isrefri= res.Result0.filter(electrobotes => electrobotes.ClaArticulo === electros.ClaArticuloCompra && electrobotes.ClaArtSupTipo===1)[0].Cantidad
          const imrefri =res.Result0.filter(electrobotes => electrobotes.ClaArticulo === electros.ClaArticuloCompra && electrobotes.ClaArtSupTipo===2)[0].Cantidad
          const irefri =res.Result0.filter(electrobotes => electrobotes.ClaArticulo === electros.ClaArticuloCompra && electrobotes.ClaArtSupTipo===3)[0].Cantidad
          const ilavadora = res.Result0.filter(electrobotes => electrobotes.ClaArticulo === electros.ClaArticuloCompra && electrobotes.ClaArtSupTipo===4)[0].Cantidad
          const iboiler = res.Result0.filter(electrobotes => electrobotes.ClaArticulo === electros.ClaArticuloCompra && electrobotes.ClaArtSupTipo===5)[0].Cantidad
          const isecadora = res.Result0.filter(electrobotes => electrobotes.ClaArticulo === electros.ClaArticuloCompra && electrobotes.ClaArtSupTipo===6)[0].Cantidad
          const iestufa= res.Result0.filter(electrobotes => electrobotes.ClaArticulo === electros.ClaArticuloCompra && electrobotes.ClaArtSupTipo===7)[0].Cantidad
          const imicroondas = res.Result0.filter(electrobotes => electrobotes.ClaArticulo === electros.ClaArticuloCompra && electrobotes.ClaArtSupTipo===8)[0].Cantidad
          const iotros = res.Result0.filter(electrobotes => electrobotes.ClaArticulo === electros.ClaArticuloCompra && electrobotes.ClaArtSupTipo===9)[0].Cantidad
          const icostal= res.Result0.filter(electrobotes => electrobotes.ClaArticulo === electros.ClaArticuloCompra && electrobotes.ClaArtSupTipo===10)[0].Cantidad
          const isaco = res.Result0.filter(electrobotes => electrobotes.ClaArticulo === electros.ClaArticuloCompra && electrobotes.ClaArtSupTipo===11)[0].Cantidad
          const icontenedor = res.Result0.filter(electrobotes => electrobotes.ClaArticulo === electros.ClaArticuloCompra && electrobotes.ClaArtSupTipo===12)[0].Cantidad
          if(row.length===1 || row.length===2){
            setelectrobots((`${isrefri}|${imrefri}|${irefri}|${ilavadora}|${iboiler}|${isecadora}|${iestufa}|${imicroondas}|${iotros}|${icostal}|${isaco}|${icontenedor}|`).toString())
          }
    
          else if(row.length===2){
            setelectrobots2((`${isrefri}|${imrefri}|${irefri}|${ilavadora}|${iboiler}|${isecadora}|${iestufa}|${imicroondas}|${iotros}|${icostal}|${isaco}|${icontenedor}|`).toString())
          }
        }})
      })
      }, [])
    
    const handleEnter = (event) => {
                  /* eslint-disable */
        const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
        const urlKrakenBloque = `${config.KrakenService}/${24}/${config.Bloque}`;
        const PorcentajeSum = row && row.reduce((acc, val) => acc + val.PorcentajeMaterial, 0);
        const CantidadSum=row && NomMotivoEntrada===9 && row.reduce((acc, val) => acc + val.CantidadMaterial, 0);
        const KilosSum=row && NomMotivoEntrada===9 && row.reduce((acc, val) => acc + val.KilosMaterial, 0);
        const KilosSumt=row && NomMotivoEntrada===3 && row.reduce((acc, val) => acc + val.PesoRecibido, 0);
        const CantidadSumt=row && NomMotivoEntrada===3 && row.reduce((acc, val) => acc + val.CantRecibida, 0);
      const CantidadSumc=row && row.reduce((acc, val) => acc + val.CantEmbarcada, 0);
      const KilosSumc=row && row.reduce((acc, val) => acc + val.KilogramosEmbarcados, 0);

        const data11 = 
        [ `@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@psObservaciones='${(Observacionesno ? Observacionesno.replace('#', '%23').replace('\r\n', '').replace(/\\/g,""): '')}'${config.Separador}@pnEsRevisionEfectuada=${placadato[0].EsRevisionEfectuada}${config.Separador}@pnClaTipoClasificacion=${placadato[0].ClaTipoClasificacion}${config.Separador}@pnEsNoCargoDescargoMaterial=${Todos}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@psOrigen='WEB'`];

        
        const data12g= 
        row && row.map((element,index)=>{
          if(element.ClaArticuloCompra){
        const data = [`@@TransactionSAMP:@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@pnClaArticuloPreReg=${element.ClaArticuloPreReg ? element.ClaArticuloPreReg: 0}${config.Separador}@pnClaArticuloCompra=${element.ClaArticuloCompra}${config.Separador}@pnCantidadMaterial=${(element.CantidadMaterial)}${config.Separador}@pnKilosMaterial=${element.KilosMaterial}${config.Separador}@pnKilosReales=${(element.KilosReales)}${config.Separador}@pnKilosContaminados=${element.KilosContaminados}${config.Separador}@pnKilosDocumentados=${(element.KilosDocumentados)}${config.Separador}@pnPorcentajeMaterial=${(element.PorcentajeMaterial)}${config.Separador}@pnEsPesajeParcial=${(element.EsPesajeParcial)}${config.Separador}@pnClaAlmacen=${element.ClaAlmacen}${config.Separador}@pnClaSubAlmacenCompra=${element.ClaSubAlmacenCompra}${config.Separador}@pnClaMotivoContaminacion=${element.ClaMotivoContaminacion ? element.ClaMotivoContaminacion : 0}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@pnClaProveedor=${placadato[0].ClaProveedor}${config.Separador}@pnIdListaPrecio=${placadato[0].IdListaPrecio}${config.Separador}@pnClaTipoOrdenCompra=''${config.Separador}@pnClaOrdenCompra=''${config.Separador}@pnClaUbicacionProveedor=${placadato[0].ClaUbicacionProveedor}${config.Separador}@psClaReferenciaCompra='${element.ClaReferenciaCompra}'${config.Separador}@psClaArtSupTipo='1|2|3|4|5|6|7|8|9|10|11|12|'${config.Separador}@psValorArtSupTipo='${((index + 1) === 1 ? electrobots: electrobots2)}'${config.Separador}@pnIdRenglon=${(element.IdRenglon)}${config.Separador}@pnKilosElectrodomesticos=${(element.KilosElectrodomesticos ? element.KilosElectrodomesticos : 0)}${config.Separador}@pnKilosBote=${(element.KilosBote ? element.KilosBote : 0)}${config.Separador}@pnObservaciones='${(element.Observaciones)}'${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]
          return data
    
          }
        });

        const data13 =
        [`@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@pnClaTipoClasificacion=1${config.Separador}@pnClaUbicacionProveedor=${placadato[0].ClaUbicacionProveedor}${config.Separador}@pnClaOrdenCompra=''${config.Separador}@pnClaTipoOrdenCompra=''${config.Separador}@pnIdListaPrecio=${placadato[0].IdListaPrecio}${config.Separador}@pnEsNoCargoDescargoMaterial=${Todos}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@pnEsPesajeParcial=${row && row.some(ro => ro.EsPesajeParcial ===1) ? '1':'0'}`]
    
        
        const data36 = 
        [ `@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@pnClaViajeOrigen=${placadato[0].ClaViajeOrigen}${config.Separador}@pnClaUbicacionOrigen=${placadato[0].ClaUbicacionOrigen}${config.Separador}@pnClaTransporte=${placadato[0].ClaTransporte}${config.Separador}@pnClaTransportista=${placadato[0].ClaTransportista}${config.Separador}@psNomTransportista='${placadato[0].NomTransportista}'${config.Separador}@psNomChofer='${(placadato[0].NomChofer !== null ? placadato[0].NomChofer: 0)}'${config.Separador}@psPlacas='${placadato[0].Placas}'${config.Separador}@pnPesoDocumentado=${placadato[0].PesoDocumentado}${config.Separador}@psObservaciones='${(Observacionesno ? Observacionesno.replace('#', '%23').replace(/\r\n|\n/gi,'').replace(/\\/g,""):'')}'${config.Separador}@pnEsRevisionEfectuada=${(placadato[0].EsRevisionEfectuada ? placadato[0].EsRevisionEfectuada : 0)}${config.Separador}@pnClaTipoClasificacion=${placadato[0].ClaTipoClasificacion}${config.Separador}@pnEsNoCargoDescargoMaterial=${Todos}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@psOrigen='WEB'`];

        
        const data37g= row && row.map((element,index)=>{
          if(element.ClaMaterialRecibeTraspaso){
          const data = [ `@@TransactionSAMP:@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@pnClaViajeOrigen=${placadato[0].ClaViajeOrigen}${config.Separador}@pnClaUbicacionOrigen=${placadato[0].ClaUbicacionOrigen}${config.Separador}@pnIdRenglonRecepcion=${(element.IdRenglonRecepcion ? element.IdRenglonRecepcion : '')}${config.Separador}@pnIdFabricacion=${(element.IdFabricacion ? element.IdFabricacion : 0)}${config.Separador}@pnIdFabricacionDet=${(element.IdFabricacionDet ? element.IdFabricacionDet : 0)}${config.Separador}@pnClaArticuloRemisionado=${(element.ClaArticuloRemisionado ? element.ClaArticuloRemisionado : 0)}${config.Separador}@pnCantRemisionada=${(element.CantRemisionada ? element.CantRemisionada : 0)}${config.Separador}@pnClaMaterialRecibeTraspaso=${element.ClaMaterialRecibeTraspaso}${config.Separador}@pnCantRecibida=${element.CantRecibida}${config.Separador}@pnPesoRecibido=${element.PesoRecibido}${config.Separador}@pnPorcentajeMaterial=${element.PorcentajeMaterial}${config.Separador}@pnPesoTaraRecibido=${(element.PesoTaraRecibido !== null ? element.PesoTaraRecibido : 0)}${config.Separador}@pnClaAlmacen=${(element.ClaAlmacen ? element.ClaAlmacen : 1)}${config.Separador}@pnClaSubAlmacenTraspaso=${(element.ClaSubAlmacenTraspaso)}${element.ClaSubSubAlmacen !== null  && element.ClaSubSubAlmacen !== 0 ? (config.Separador+'@pnClaSubSubAlmacen='+element.ClaSubSubAlmacen) : ''}${config.Separador}@pnClaSeccion=${(element.ClaSeccion !== null ? element.ClaSeccion : 0)}${config.Separador}@psReferencia1=${(element.Referencia1 !== null ? element.Referencia1 : 0)}${config.Separador}@psReferencia2=${(element.Referencia2 !== null ? element.Referencia2 : 0)}${config.Separador}@psReferencia3=${(element.Referencia3 !== null ? element.Referencia3 : 0)}${config.Separador}@psReferencia4=${(element.Referencia4 !== null ? element.Referencia4 : 0)}${config.Separador}@psReferencia5=${(element.Referencia5 !== null ? element.Referencia5 : 0)}${config.Separador}@pnEsPesajeParcial=${element.EsPesajeParcial}${config.Separador}@pnKilosReales=${(element.KilosReales ? element.KilosReales : 0)}${config.Separador}@pnKilosContaminados=${(element.KilosContaminados ? element.KilosContaminados : 0)}${config.Separador}@pnClaMotivoContaminacion=${(element.ClaMotivoContaminacion ? element.ClaMotivoContaminacion : 0)}${config.Separador}@pnClaReferenciaTraspaso=${element.ClaReferenciaTraspaso}${config.Separador}@pnEsNoCargoDescargoMaterial=${Todos}${config.Separador}@pnObservaciones='${(element.observaciones)}'${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`];
 
            return data
          }
          });

          const data38 =
          [`@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@pnClaUbicacionOrigen=${placadato[0].ClaUbicacionOrigen}${config.Separador}@pnClaViajeOrigen=${placadato[0].ClaViajeOrigen}${config.Separador}@pnEsNoCargoDescargoMaterial=${Todos}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]
          
          const data84 = { parameters: `{"ClaUbicacion":${editBoxValue},"Token":"${Token}","ClaServicioJson":"84","IdBoleta":"${placadato[0].IdBoleta}","EnBloque":"${1}","Encabezado":"${data36}","Detalle":"${data37g ? data37g.join(""):''}","Validacion":"${(((PorcentajeSum !== null && (PorcentajeSum === 100)) || (PorcentajeSum === 0 && CantidadSum>0) || (row && row.length>0 && (row.every((em) => em.CantidadMaterial !==null) || row.every((em) =>em.KilosMaterial!==null) || row.every((em) =>em.PorcentajeMaterial!==null) && (PorcentajeSum !== null && PorcentajeSum === 100) || (PorcentajeSum === 0 && CantidadSum>0)))|| row.some(ro => ro.EsPesajeParcial===1)) ? data38 : '')}"}`,
          tipoEstructura: 0}
        
        
          const data64 =  [ `@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@psPlacas='${placadato[0].Placas}'${config.Separador}@pnIdPlanCarga=${(placadato[0].ClaPlanCarga !== null ? placadato[0].ClaPlanCarga : 0)}${config.Separador}@psObservaciones='${(Observacionesno ? Observacionesno.replace('#', '%23').replace('\r\n', '').replace(/\\/g,""):'') }'${config.Separador}@pnEsRevisionEfectuada=${placadato[0].EsRevisionEfectuada}${config.Separador}@pnEsNoCargoDescargoMaterial=${Todos}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@psOrigen='WEB'`];
    
          
          const data66 =
          [`@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@pnClaPlanCarga=${(placadato[0].ClaPlanCarga !== null ? placadato[0].ClaPlanCarga : 0)}${config.Separador}@psClaVehiculoPorClasificar='${placadato[0].Placas}'${config.Separador}@psPlacas='${placadato[0].Placas}'${config.Separador}@pnEsNoCargoDescargoMaterial=${Todos}${config.Separador}@pnPesoAtrilesTarimas=${(placadato[0].PesoAtrilesTarimas !== null ? placadato[0].PesoAtrilesTarimas : 0)}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]
        
          const data85 ={ parameters: `{"ClaUbicacion":${editBoxValue},"Token":"${Token}","ClaServicioJson":"85","IdBoleta":"${placadato[0].IdBoleta}","EnBloque":"${1}","Encabezado":"${data64}","Detalle":"","Validacion":"${((PorcentajeSum !== null && (PorcentajeSum === 100 || (row && row.some(ro => ro.EsPesajeParcial) && (PorcentajeSum === 100 || PorcentajeSum > 100)))) || (PorcentajeSum === 0 && (CantidadSumc>0 || KilosSumc>0)) || (row && row.length>0 && (row[0].CantEmbarcada !==null || row[0].KilogramosEmbarcados!==null || row[0].Porcentaje!==null)) || Todos===1 || row.some(ro => ro.EsPesajeParcial===1)) ? data66 : ''}"}`,
          tipoEstructura: 0}

        const data72 = {
          parameters:
            '{"ClaUbicacion":' +
            editBoxValue +
            ',"ClaServicioJson":72,"Parametros":"@pnClaUbicacion=' +
            editBoxValue +
            ''+config.Separador+'@pnIdBoleta=' +
            placadato[0].IdBoleta +
            ''+config.Separador+'@pnClaViajeDevolucionTraspaso='+ 
            placadato[0].ClaViajeDevolucionTraspaso+
            ''+config.Separador+'@pnClaUbicacionEntradaTraspaso='+
            placadato[0].ClaUbicacionEntradaTraspaso+
            ''+config.Separador+'@pnIdBoletaOrigenTrasRec='+
            placadato[0].IdBoletaOrigenTrasRec+
            ''+config.Separador+'@psObservaciones=' +
            (Observacionesno ? Observacionesno.replace('#', '%23').replace(/\r\n|\n/gi,'').replace(/\\/g,""):'') +
            ''+config.Separador+'@pnEsRevisionEfectuada=' +
            (placadato[0].EsRevisionEfectuada !==null ? placadato[0].EsRevisionEfectuada:0) +
            ''+config.Separador+'@pnEsNoCargoDescargoMaterial=' +
            Todos +
            ''+config.Separador+'@psNombrePcMod=' +
            ipadress +
            ''+config.Separador+'@pnClaUsuarioMod=' +
            NumbUsuario +'"}',
            tipoEstructura: 0,
        };

        const data83 = { parameters: `{"ClaUbicacion":${editBoxValue},"Token":"${Token}","ClaServicioJson":"83","IdBoleta":"${placadato[0].IdBoleta}","EnBloque":"${1}","Encabezado":"${data11}","Detalle":"${data12g ? data12g.join(""):''}","Validacion":"${(((PorcentajeSum !== null && (PorcentajeSum === 100)) || (PorcentajeSum === 0 && CantidadSum>0) || (row && row.length>0 && (row.every((em) => em.CantidadMaterial !==null) || row.every((em) =>em.KilosMaterial!==null) || row.every((em) =>em.PorcentajeMaterial!==null) && ((PorcentajeSum !== null && PorcentajeSum === 100) || (PorcentajeSum === 0 && CantidadSum>0))))|| row.some(ro => ro.EsPesajeParcial===1)) ? data13 : '')}"}`,
        tipoEstructura: 0}

    /* eslint-enable */
    async function FuncionData() {
    if(NomMotivoEntrada===9 ){
      console.log(data83)
      await callApi(urlKrakenBloque, 'POST', data83, (res) => {
        setActualizar(true);
        setTimeout(() =>{
    setActualizar(false)
        }, 50);
      })
    }
    
    if(NomMotivoEntrada===3){
  
          console.log(data84)
        /* eslint-enable */
        await callApi(urlKrakenBloque, 'POST', data84, (res) => {
          // console.log(res);
            setActualizar(true);
            setTimeout(() =>{
        setActualizar(false)
            }, 50);
        });
      }

    
    if(NomMotivoEntrada===1){
      await callApi(urlKrakenBloque, 'POST', data85, (res) => {
        // console.log(res);
        setActualizar(true);
        setTimeout(() =>{
    setActualizar(false)
        }, 50);
      }); 
    }
    
    if(NomMotivoEntrada===110){
      await callApi(urlKrakenService, 'POST', data72, (res) => {
        // console.log(res);
        setActualizar(true);
        setTimeout(() =>{
    setActualizar(false)
        }, 50);
      });
    }
        }        
        
        if(placadato && event.charCode === 13){
          FuncionData()
        }
        }

        const handleClick = () => {
                  /* eslint-disable */
        const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
        const urlKrakenBloque = `${config.KrakenService}/${24}/${config.Bloque}`;
        const PorcentajeSum = row && row.reduce((acc, val) => acc + val.Porcentaje, 0);
        const CantidadSum=row && NomMotivoEntrada===9 && row.reduce((acc, val) => acc + val.CantidadMaterial, 0);
        const KilosSum=row && NomMotivoEntrada===9 && row.reduce((acc, val) => acc + val.KilosMaterial, 0);
        const KilosSumt=row && NomMotivoEntrada===3 && row.reduce((acc, val) => acc + val.PesoRecibido, 0);
        const CantidadSumt=row && NomMotivoEntrada===3 && row.reduce((acc, val) => acc + val.CantRecibida, 0);
      const CantidadSumc=row && row.reduce((acc, val) => acc + val.CantEmbarcada, 0);
      const KilosSumc=row && row.reduce((acc, val) => acc + val.KilogramosEmbarcados, 0);


        const data11 = 
        [ `@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@psObservaciones='${(Observacionesno ? Observacionesno.replace('#', '%23').replace(/\\/g,""):'')}'${config.Separador}@pnEsRevisionEfectuada=${placadato[0].EsRevisionEfectuada}${config.Separador}@pnClaTipoClasificacion=${placadato[0].ClaTipoClasificacion}${config.Separador}@pnEsNoCargoDescargoMaterial=${Todos}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@psOrigen='WEB'`];

        
        const data12g= 
        row && row.map((element,index)=>{
          if(element.ClaArticuloCompra){
        const data = [`@@TransactionSAMP:@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@pnClaArticuloPreReg=${element.ClaArticuloPreReg ? element.ClaArticuloPreReg: 0}${config.Separador}@pnClaArticuloCompra=${element.ClaArticuloCompra}${config.Separador}@pnCantidadMaterial=${(element.CantidadMaterial)}${config.Separador}@pnKilosMaterial=${element.KilosMaterial}${config.Separador}@pnKilosReales=${(element.KilosReales)}${config.Separador}@pnKilosContaminados=${element.KilosContaminados}${config.Separador}@pnKilosDocumentados=${(element.KilosDocumentados)}${config.Separador}@pnPorcentajeMaterial=${(element.PorcentajeMaterial)}${config.Separador}@pnEsPesajeParcial=${(element.EsPesajeParcial)}${config.Separador}@pnClaAlmacen=${element.ClaAlmacen}${config.Separador}@pnClaSubAlmacenCompra=${element.ClaSubAlmacenCompra}${config.Separador}@pnClaMotivoContaminacion=${element.ClaMotivoContaminacion ? element.ClaMotivoContaminacion : 0}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@pnClaProveedor=${placadato[0].ClaProveedor}${config.Separador}@pnIdListaPrecio=${placadato[0].IdListaPrecio}${config.Separador}@pnClaTipoOrdenCompra=''${config.Separador}@pnClaOrdenCompra=''${config.Separador}@pnClaUbicacionProveedor=${placadato[0].ClaUbicacionProveedor}${config.Separador}@psClaReferenciaCompra='${element.ClaReferenciaCompra}'${config.Separador}@psClaArtSupTipo='1|2|3|4|5|6|7|8|9|10|11|12|'${config.Separador}@psValorArtSupTipo='${((index + 1) === 1 ? electrobots: electrobots2)}'${config.Separador}@pnIdRenglon=${(element.IdRenglon)}${config.Separador}@pnKilosElectrodomesticos=${(element.KilosElectrodomesticos ? element.KilosElectrodomesticos : 0)}${config.Separador}@pnKilosBote=${(element.KilosBote ? element.KilosBote : 0)}${config.Separador}@pnObservaciones='${(element.Observaciones)}'${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]
          return data
    
          }
        })

        const data13 =
        [`@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@pnClaTipoClasificacion=1${config.Separador}@pnClaUbicacionProveedor=${placadato[0].ClaUbicacionProveedor}${config.Separador}@pnClaOrdenCompra=''${config.Separador}@pnClaTipoOrdenCompra=''${config.Separador}@pnIdListaPrecio=${placadato[0].IdListaPrecio}${config.Separador}@pnEsNoCargoDescargoMaterial=${Todos}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@pnEsPesajeParcial=${row && row.some(ro => ro.EsPesajeParcial ===1) ? '1':'0'}`]
    
        
        const data36 = 
        [ `@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@pnClaViajeOrigen=${placadato[0].ClaViajeOrigen}${config.Separador}@pnClaUbicacionOrigen=${placadato[0].ClaUbicacionOrigen}${config.Separador}@pnClaTransporte=${placadato[0].ClaTransporte}${config.Separador}@pnClaTransportista=${placadato[0].ClaTransportista}${config.Separador}@psNomTransportista='${placadato[0].NomTransportista}'${config.Separador}@psNomChofer='${(placadato[0].NomChofer !== null ? placadato[0].NomChofer: 0)}'${config.Separador}@psPlacas='${placadato[0].Placas}'${config.Separador}@pnPesoDocumentado=${placadato[0].PesoDocumentado}${config.Separador}@psObservaciones='${(Observacionesno ? Observacionesno.replace(/\r\n|\n/gi,'').replace(/\\/g,""):'')}'${config.Separador}@pnEsRevisionEfectuada=${(placadato[0].EsRevisionEfectuada ? placadato[0].EsRevisionEfectuada : 0)}${config.Separador}@pnClaTipoClasificacion=${placadato[0].ClaTipoClasificacion}${config.Separador}@pnEsNoCargoDescargoMaterial=${Todos}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@psOrigen='WEB'`];

        
        const data37g= row && row.map((element,index)=>{
          if(element.ClaMaterialRecibeTraspaso){
          const data = [ `@@TransactionSAMP:@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@pnClaViajeOrigen=${placadato[0].ClaViajeOrigen}${config.Separador}@pnClaUbicacionOrigen=${placadato[0].ClaUbicacionOrigen}${config.Separador}@pnIdRenglonRecepcion=${(element.IdRenglonRecepcion ? element.IdRenglonRecepcion : '')}${config.Separador}@pnIdFabricacion=${(element.IdFabricacion ? element.IdFabricacion : 0)}${config.Separador}@pnIdFabricacionDet=${(element.IdFabricacionDet ? element.IdFabricacionDet : 0)}${config.Separador}@pnClaArticuloRemisionado=${(element.ClaArticuloRemisionado ? element.ClaArticuloRemisionado : 0)}${config.Separador}@pnCantRemisionada=${(element.CantRemisionada ? element.CantRemisionada : 0)}${config.Separador}@pnClaMaterialRecibeTraspaso=${element.ClaMaterialRecibeTraspaso}${config.Separador}@pnCantRecibida=${element.CantRecibida}${config.Separador}@pnPesoRecibido=${element.PesoRecibido}${config.Separador}@pnPorcentajeMaterial=${element.PorcentajeMaterial}${config.Separador}@pnPesoTaraRecibido=${(element.PesoTaraRecibido !== null ? element.PesoTaraRecibido : 0)}${config.Separador}@pnClaAlmacen=${(element.ClaAlmacen ? element.ClaAlmacen : 1)}${config.Separador}@pnClaSubAlmacenTraspaso=${(element.ClaSubAlmacenTraspaso)}${element.ClaSubSubAlmacen !== null  && element.ClaSubSubAlmacen !== 0 ? (config.Separador+'@pnClaSubSubAlmacen='+element.ClaSubSubAlmacen) : ''}${config.Separador}@pnClaSeccion=${(element.ClaSeccion !== null ? element.ClaSeccion : 0)}${config.Separador}@psReferencia1=${(element.Referencia1 !== null ? element.Referencia1 : 0)}${config.Separador}@psReferencia2=${(element.Referencia2 !== null ? element.Referencia2 : 0)}${config.Separador}@psReferencia3=${(element.Referencia3 !== null ? element.Referencia3 : 0)}${config.Separador}@psReferencia4=${(element.Referencia4 !== null ? element.Referencia4 : 0)}${config.Separador}@psReferencia5=${(element.Referencia5 !== null ? element.Referencia5 : 0)}${config.Separador}@pnEsPesajeParcial=${element.EsPesajeParcial}${config.Separador}@pnKilosReales=${(element.KilosReales ? element.KilosReales : 0)}${config.Separador}@pnKilosContaminados=${(element.KilosContaminados ? element.KilosContaminados : 0)}${config.Separador}@pnClaMotivoContaminacion=${(element.ClaMotivoContaminacion ? element.ClaMotivoContaminacion : 0)}${config.Separador}@pnClaReferenciaTraspaso=${element.ClaReferenciaTraspaso}${config.Separador}@pnEsNoCargoDescargoMaterial=${Todos}${config.Separador}@pnObservaciones='${(element.observaciones)}'${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`];
 
            return data
          }
          })

          const data38 =
          [`@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@pnClaUbicacionOrigen=${placadato[0].ClaUbicacionOrigen}${config.Separador}@pnClaViajeOrigen=${placadato[0].ClaViajeOrigen}${config.Separador}@pnEsNoCargoDescargoMaterial=${Todos}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]
          
          const data84 ={ parameters: `{"ClaUbicacion":${editBoxValue},"Token":"${Token}","ClaServicioJson":"84","IdBoleta":"${placadato[0].IdBoleta}","EnBloque":"${1}","Encabezado":"${data36}","Detalle":"${data37g.join("")}","Validacion":"${(((PorcentajeSum !== null && (PorcentajeSum === 100)) || (PorcentajeSum === 0 && CantidadSum>0) || (row && row.length>0 && (row.every((em) => em.CantidadMaterial !==null) || row.every((em) =>em.KilosMaterial!==null) || row.every((em) =>em.PorcentajeMaterial!==null) && (PorcentajeSum !== null && PorcentajeSum === 100) || (PorcentajeSum === 0 && CantidadSum>0))) || row.some(ro => ro.EsPesajeParcial===1)) ? data38 : '')}"}`,
          tipoEstructura: 0}
        
        
          const data64 = NomMotivoEntrada===1 && [ `@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@psPlacas='${placadato[0].Placas}'${config.Separador}@pnIdPlanCarga=${(placadato[0].ClaPlanCarga !== null ? placadato[0].ClaPlanCarga : 0)}${config.Separador}@psObservaciones='${(Observacionesno ? Observacionesno.replace('#', '%23').replace(/\r\n|\n/gi,'').replace(/\\/g,""):'') }'${config.Separador}@pnEsRevisionEfectuada=${placadato[0].EsRevisionEfectuada}${config.Separador}@pnEsNoCargoDescargoMaterial=${Todos}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@psOrigen='WEB'`];
    
          
          const data66 =
          [`@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@pnClaPlanCarga=${(placadato[0].ClaPlanCarga !== null ? placadato[0].ClaPlanCarga : 0)}${config.Separador}@psClaVehiculoPorClasificar='${placadato[0].Placas}'${config.Separador}@psPlacas='${placadato[0].Placas}'${config.Separador}@pnEsNoCargoDescargoMaterial=${Todos}${config.Separador}@pnPesoAtrilesTarimas=${(placadato[0].PesoAtrilesTarimas !== null ? placadato[0].PesoAtrilesTarimas : 0)}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]
        
          const data85 ={ parameters: `{"ClaUbicacion":${editBoxValue},"Token":"${Token}","ClaServicioJson":"85","IdBoleta":"${placadato[0].IdBoleta}","EnBloque":"${1}","Encabezado":"${data64}","Detalle":"","Validacion":"${((PorcentajeSum !== null && (PorcentajeSum === 100 || (row && row.some(ro => ro.EsPesajeParcial) && (PorcentajeSum === 100 || PorcentajeSum > 100)))) || (PorcentajeSum === 0 && (CantidadSumc>0 || KilosSumc>0)) || (row && row.length>0 && (row[0].CantEmbarcada !==null || row[0].KilogramosEmbarcados!==null || row[0].Porcentaje!==null)) || Todos===1 || row.some(ro => ro.EsPesajeParcial===1)) ? data66 : ''}"}`,
          tipoEstructura: 0}

        const data72 = {
          parameters:
            '{"ClaUbicacion":' +
            editBoxValue +
            ',"ClaServicioJson":72,"Parametros":"@pnClaUbicacion=' +
            editBoxValue +
            ''+config.Separador+'@pnIdBoleta=' +
            placadato[0].IdBoleta +
            ''+config.Separador+'@pnClaViajeDevolucionTraspaso='+ 
            placadato[0].ClaViajeDevolucionTraspaso+
            ''+config.Separador+'@pnClaUbicacionEntradaTraspaso='+
            placadato[0].ClaUbicacionEntradaTraspaso+
            ''+config.Separador+'@pnIdBoletaOrigenTrasRec='+
            placadato[0].IdBoletaOrigenTrasRec+
            ''+config.Separador+'@psObservaciones=' +
            (Observacionesno ? Observacionesno.replace('#', '%23').replace(/\r\n|\n/gi,'').replace(/\\/g,""):'') +
            ''+config.Separador+'@pnEsRevisionEfectuada=' +
            (placadato[0].EsRevisionEfectuada !==null ? placadato[0].EsRevisionEfectuada:0) +
            ''+config.Separador+'@pnEsNoCargoDescargoMaterial=' +
            Todos +
            ''+config.Separador+'@psNombrePcMod=' +
            ipadress +
            ''+config.Separador+'@pnClaUsuarioMod=' +
            NumbUsuario +'"}',
            tipoEstructura: 0,
        };

        const data83 ={ parameters: `{"ClaUbicacion":${editBoxValue},"Token":"${Token}","ClaServicioJson":"83","IdBoleta":"${placadato[0].IdBoleta}","EnBloque":"${1}","Encabezado":"${data11}","Detalle":"${data12g.join("")}","Validacion":"${(((PorcentajeSum !== null && (PorcentajeSum === 100)) || (PorcentajeSum === 0 && CantidadSum>0) || (row && row.length>0 && (row.every((em) => em.CantidadMaterial !==null && em.CantidadMaterial !==0) || row.every((em) =>em.KilosMaterial!==null && em.KilosMaterial!==0) || (row.every((em) =>em.PorcentajeMaterial!==null) && (PorcentajeSum !== null && PorcentajeSum === 100)) || (PorcentajeSum === 0 && CantidadSum>0)))|| row.some(ro => ro.EsPesajeParcial===1)) ? data13 : '')}"}`,
        tipoEstructura: 0}

    /* eslint-enable */
    async function FuncionData() {
    if(NomMotivoEntrada===9 ){
      console.log(data83)
      await callApi(urlKrakenBloque, 'POST', data83, (res) => {
        setActualizar(true);
        setTimeout(() =>{
    setActualizar(false)
        }, 50);
      })
    }
    
    if(NomMotivoEntrada===3){
  
          console.log(data84)
        /* eslint-enable */
        await callApi(urlKrakenBloque, 'POST', data84, (res) => {
          // console.log(res);
            setActualizar(true);
            setTimeout(() =>{
        setActualizar(false)
            }, 50);
        });
      }

    
    if(NomMotivoEntrada===1){
      console.log(data85)
      await callApi(urlKrakenBloque, 'POST', data85, (res) => {
        // console.log(res);
        setActualizar(true);
        setTimeout(() =>{
    setActualizar(false)
        }, 50);
      }); 
    }
    
    if(NomMotivoEntrada===110){
      await callApi(urlKrakenService, 'POST', data72, (res) => {
        // console.log(res);
        setActualizar(true);
        setTimeout(() =>{
    setActualizar(false)
        }, 50);
      });
    }
        }        
        
        if(placadato){
          FuncionData()
        }
        }

    return (
      <div className="Observaciones">
        <InputGroup style={{paddingLeft: '1vw',paddingRight: '1vw'}}>
          <InputGroupAddon addonType="prepend">
            Observaciones: &nbsp;
          </InputGroupAddon>
          <Input className="observaciones_no" aria-label="hola" onKeyPress={handleEnter} defaultValue={Observacionesno} onChange={handleObservaciones} />
          <i className="fas fa-save fa-lg" onClick={handleClick} style={{cursor: 'pointer',color:'#333b95'}}></i>
        </InputGroup>
      </div>
    )
}

export default Observaciones
