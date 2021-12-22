import React,{useState,useEffect} from 'react'
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { callApi, getSessionItem } from '../../../../utils/utils';
import {config} from '../../../../utils/config'
import { SettingsRemoteTwoTone } from '@material-ui/icons';

function Cargo_Nodescargo({ClaUbicacionOrigen,cambionodesc,setcambionodesc,setPlanCarga,placadato,editBoxValue,setBoxPlanCarga,NomMotivoEntrada,setActualizar,row,setrow,Todos,setTodos,TodosChange,setTodosChange,setValidaCargo,Nocargo,setNocargo}) {
    const ipadress = getSessionItem('Ipaddress');
    const NumbUsuario = getSessionItem('NumUsuario');
    const Token = getSessionItem('Token');

    useEffect(() => {
    if(placadato){
              /* eslint-disable */
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    const urlKrakenBloque = `${config.KrakenService}/${24}/${config.Bloque}`;
    if(NomMotivoEntrada===9 && (row || row==='')){
      const data11 = 
      [ `@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@psObservaciones='${(placadato[0].Observaciones ? placadato[0].Observaciones.replace('#', '%23'): '')}'${config.Separador}@pnEsRevisionEfectuada=${placadato[0].EsRevisionEfectuada}${config.Separador}@pnClaTipoClasificacion=${placadato[0].ClaTipoClasificacion}${config.Separador}@pnEsNoCargoDescargoMaterial=${Todos}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@psOrigen='WEB'`];

      const data13 =
      [`@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@pnClaTipoClasificacion=1${config.Separador}@pnClaUbicacionProveedor=${placadato[0].ClaUbicacionProveedor}${config.Separador}@pnClaOrdenCompra=''${config.Separador}@pnClaTipoOrdenCompra=''${config.Separador}@pnIdListaPrecio=${placadato[0].IdListaPrecio}${config.Separador}@pnEsNoCargoDescargoMaterial=${Todos}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@pnEsPesajeParcial=0`]
    

      const data83 ={ parameters: `{"ClaUbicacion":${editBoxValue},"Token":"${Token}","ClaServicioJson":"83","IdBoleta":"${placadato[0].IdBoleta}","EnBloque":"${1}","Encabezado":"${data11}","Detalle":"","Validacion":"${data13}"}`,
      tipoEstructura: 0}

    async function Encabezado()  {
      setcambionodesc(1);
      console.log(data83)
      callApi(urlKrakenBloque, 'POST', data83, (res) => {
        // console.log(res);
      });
      if(NomMotivoEntrada===9 && TodosChange===1 && Todos===1){
        setTimeout(() =>{
          setrow('')
              }, 1000);
      }
    }
    if(Todos==1){
    Encabezado().then
    setPlanCarga('')
    setBoxPlanCarga(null)
    setTodosChange(0)
    setValidaCargo(1)

    if(Todos===1){
      setNocargo(1)
    }
    setActualizar(true);
        setTimeout(() =>{
    setActualizar(false)
        }, 50);
      }

    else {
      setActualizar(true);
        setTimeout(() =>{
    setActualizar(false)
        }, 50);
    }
  }

  if(NomMotivoEntrada===3 && (row || row==='')){

    const data36 = 
        [ `@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@pnClaViajeOrigen=${placadato[0].ClaViajeOrigen}${config.Separador}@pnClaUbicacionOrigen=${placadato[0].ClaUbicacionOrigen}${config.Separador}@pnClaTransporte=${placadato[0].ClaTransporte}${config.Separador}@pnClaTransportista=${placadato[0].ClaTransportista}${config.Separador}@psNomTransportista='${placadato[0].NomTransportista}'${config.Separador}@psNomChofer='${(placadato[0].NomChofer !== null ? placadato[0].NomChofer: 0)}'${config.Separador}@psPlacas='${placadato[0].Placas}'${config.Separador}@pnPesoDocumentado=${(placadato[0].PesoDocumentado !==null ? placadato[0].PesoDocumentado: 0)}${config.Separador}@psObservaciones='${(placadato[0].Observaciones ? placadato[0].Observaciones.replace('#', '%23'): '')}'${config.Separador}@pnEsRevisionEfectuada=${(placadato[0].EsRevisionEfectuada ? placadato[0].EsRevisionEfectuada : 0)}${config.Separador}@pnClaTipoClasificacion=${placadato[0].ClaTipoClasificacion}${config.Separador}@pnEsNoCargoDescargoMaterial=${Todos}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@psOrigen='WEB'`];
 
    const data38 =
        [`@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@pnClaUbicacionOrigen=${ClaUbicacionOrigen}${config.Separador}@pnClaViajeOrigen=${placadato[0].ClaViajeOrigen}${config.Separador}@pnEsNoCargoDescargoMaterial=${Todos}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]
        
        const data84 ={ parameters: `{"ClaUbicacion":${editBoxValue},"Token":"${Token}","ClaServicioJson":"84","IdBoleta":"${placadato[0].IdBoleta}","EnBloque":"${1}","Encabezado":"${data36}","Detalle":"","Validacion":"${(Todos===1) ? data38 : ''}"}`,
        tipoEstructura: 0}


    if(NomMotivoEntrada===3 && TodosChange===1){
      setcambionodesc(1)
      async function Encabezado()  {
        setcambionodesc(1);
        console.log(data84)
        callApi(urlKrakenBloque, 'POST', data84, (res) => {
          // console.log(res);
        });
        if(NomMotivoEntrada===3 && TodosChange===1 && Todos===1){
          setTimeout(() =>{
            setrow('')
                }, 1000);
        }
      }
      if(Todos===1 || Todos===0 && TodosChange===1){
        Encabezado().then
        setPlanCarga('')
        setBoxPlanCarga(null)
        setTodosChange(0)
        setValidaCargo(1)
    
        if(Todos===1){
          setNocargo(1)
        }
        setActualizar(true);
            setTimeout(() =>{
        setActualizar(false)
            }, 50);
          }
          else {
            setActualizar(true);
              setTimeout(() =>{
          setActualizar(false)
              }, 50);
          }
      }
    }

  if(NomMotivoEntrada===1 && (row || row===''|| row===null || row==='0'|| !row)) {

    
    const data64 = [ `@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@psPlacas='${placadato[0].Placas}'${config.Separador}@pnIdPlanCarga=${placadato[0].IdPlanCarga ? placadato[0].IdPlanCarga:0}${config.Separador}@psObservaciones='${placadato[0].Observaciones ? placadato[0].Observaciones :''}'${config.Separador}@pnEsRevisionEfectuada=${placadato[0].EsRevisionEfectuada}${config.Separador}@pnEsNoCargoDescargoMaterial=${Todos}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@psOrigen='WEB'`];

    const data66 =
    [`@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@pnClaPlanCarga=${(placadato[0].ClaPlanCarga !== null ? placadato[0].ClaPlanCarga : 0)}${config.Separador}@psClaVehiculoPorClasificar='${placadato[0].Placas}'${config.Separador}@psPlacas='${placadato[0].Placas}'${config.Separador}@pnEsNoCargoDescargoMaterial=${Todos}${config.Separador}@pnPesoAtrilesTarimas=${(placadato[0].PesoAtrilesTarimas !== null ? placadato[0].PesoAtrilesTarimas : 0)}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]
  
   
    const data85 ={ parameters: `{"ClaUbicacion":${editBoxValue},"Token":"${Token}","ClaServicioJson":"85","IdBoleta":"${placadato[0].IdBoleta}","EnBloque":"${1}","Encabezado":"${data64}","Detalle":"","Validacion":"${(Todos===1) ? data66 : ''}"}`,
    tipoEstructura: 0}
  
    
    if(NomMotivoEntrada===1 && TodosChange===1){
      setcambionodesc(1)
      async function Encabezado()  {
        setcambionodesc(1);
        console.log(data85)
        callApi(urlKrakenBloque, 'POST', data85, (res) => {
          // console.log(res);
        });
        if(NomMotivoEntrada===1 && TodosChange===1 && Todos===1){
          setTimeout(() =>{
            setrow('')
                }, 1000);
        }
      }
      if(Todos===1 || Todos===0 && TodosChange===1){
        Encabezado().then
        setPlanCarga('')
        setBoxPlanCarga(null)
        setTodosChange(0)
        setValidaCargo(1)
    
        if(Todos===1){
          setNocargo(1)
        }
        setActualizar(true);
            setTimeout(() =>{
        setActualizar(false)
            }, 50);
          }
          else {
            setActualizar(true);
              setTimeout(() =>{
          setActualizar(false)
              }, 50);
          }
      }

    }

  if(NomMotivoEntrada===110 && row){
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
        (placadato[0].Observaciones ? placadato[0].Observaciones.replace('#', '%23'):'') +
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

    if(NomMotivoEntrada===110 && TodosChange===1){
      setcambionodesc(1);
      async function Encabezado()  {
      if(TodosChange===1){
      callApi(urlKrakenService, 'POST', data72, (res) => {
        // console.log(res);
      });
    }
    
      if(NomMotivoEntrada===110 && TodosChange===1 && Todos===1){
        setTimeout(() =>{
          setrow('')
              }, 1400);
      }
    }
      Encabezado().then
      setPlanCarga('')
      setBoxPlanCarga(null)
      setTodosChange(0)
      setValidaCargo(1)
      if(Todos===1){
        setNocargo(1)
      }
      setActualizar(true);
          setTimeout(() =>{
      setActualizar(false)
          }, 50);
  }
/* eslint-enable */



}
    }
    }, [Todos])

     const handleTodos = (event) => {
        setTodos(event.target.checked ? 1 : 0)
        if(TodosChange===0){
          setTodosChange(1)
        }
        
      };

    
    const IOSSwitch = withStyles((theme) => ({
        root: {
          width: "22%",
          height: "17px",
          padding: 0,
          margin: theme.spacing(1),
        },
        switchBase: {
          padding: 1,
          '&$checked': {
            transform: 'translateX(17px)',
            color: theme.palette.common.white,
            '& + $track': {
              backgroundColor: '#52d869',
              opacity: 1,
              border: 'none',
            },
          },
          '&$focusVisible $thumb': {
            color: '#52d869',
            border: '6px solid #fff',
          },
        },
        thumb: {
          width: 15,
          height: 15,
        },
        track: {
          borderRadius: 26 / 2,
          border: `1px solid ${theme.palette.grey[400]}`,
          backgroundColor: theme.palette.grey[400],
          opacity: 1,
          transition: theme.transitions.create(['background-color', 'border']),
        },
        checked: {},
        focusVisible: {},
      }))(({ classes, ...props }) => {
        return (
          <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
              root: classes.root,
              switchBase: classes.switchBase,
              thumb: classes.thumb,
              track: classes.track,
              checked: classes.checked,
            }}
            {...props}
          />
        );
      });
    return (
      <>
        <FormControlLabel style={{height: "27px",float:'right',width:'20%'}} control={<IOSSwitch checked={Todos === 1} onChange={handleTodos} disabled={cambionodesc === 1} name="checkedB" />} label={NomMotivoEntrada===1 ? "No cargo material" :"No descargo material"} />
      </>
    )
}

export default Cargo_Nodescargo
