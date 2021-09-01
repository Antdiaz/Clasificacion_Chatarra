import React,{useState,useEffect} from 'react'
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { callApi, getSessionItem } from '../../../../utils/utils';
import {config} from '../../../../utils/config'
import { SettingsRemoteTwoTone } from '@material-ui/icons';

function Cargo_Nodescargo({setPlanCarga,placadato,editBoxValue,setBoxPlanCarga,NomMotivoEntrada,setActualizar,row,setrow,Todos,setTodos,TodosChange,setTodosChange,setValidaCargo,Nocargo,setNocargo}) {
    const ipadress = getSessionItem('Ipaddress');
    const NumbUsuario = getSessionItem('NumUsuario');


    useEffect(() => {
    if(placadato){
              /* eslint-disable */
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    const data11 = {
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"ClaServicioJson":' +
        11 +
        ',"Parametros":"@pnClaUbicacion=' +
        editBoxValue +
        ',@pnIdBoleta=' +
        placadato[0].IdBoleta +
        ',@psObservaciones=,@pnEsRevisionEfectuada=' +
        placadato[0].EsRevisionEfectuada +
        ',@pnClaTipoClasificacion=' +
        placadato[0].ClaTipoClasificacion +
        ',@pnEsNoCargoDescargoMaterial=' +
        Todos +
        ',@psNombrePcMod=' +
        ipadress +
        ',@pnClaUsuarioMod=' +
        NumbUsuario +
        ',@psOrigen=WEB"}',
      tipoEstructura: 0,
    };

    const data36 = {
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"ClaServicioJson":36,"Parametros":"@pnClaUbicacion=' +
        editBoxValue +
        ',@pnIdBoleta=' +
        placadato[0].IdBoleta +
        ',@pnClaViajeOrigen='+
        placadato[0].ClaViajeOrigen +
        ',@pnClaUbicacionOrigen=' +
        placadato[0].ClaUbicacionOrigen +
        ',@pnClaTransporte=' +
        placadato[0].ClaTransporte +
        ',@pnClaTransportista=' +
        placadato[0].ClaTransportista +
        ',@psNomTransportista=' +
        placadato[0].NomTransportista +
        ',@psNomChofer=' +
        (placadato[0].NomChofer !== null ? placadato[0].NomChofer: 0)+
        ',@psPlacas=' +
        placadato[0].Placas +
        ',@pnPesoDocumentado=' +
        (placadato[0].PesoDocumentado !==null ? placadato[0].PesoDocumentado: 0)+
        ',@psObservaciones=' +
        placadato[0].Observaciones +
        ',@pnEsRevisionEfectuada=' +
        (placadato[0].EsRevisionEfectuada ? placadato[0].EsRevisionEfectuada :0)+
        ',@pnClaTipoClasificacion=' +
        placadato[0].ClaTipoClasificacion +
        ',@pnEsNoCargoDescargoMaterial=' +
        Todos +
        ',@psNombrePcMod=' +
        ipadress +
        ',@pnClaUsuarioMod=' +
        NumbUsuario +
        ',@pnAccionSp=,@psOrigen=WEB"}',
        tipoEstructura: 0,
    };

    const data64 = {
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"ClaServicioJson":64,"Parametros":"@pnClaUbicacion=' +
        editBoxValue +
        ',@pnIdBoleta=' +
        placadato[0].IdBoleta +
        ',@psPlacas='+
        placadato[0].Placas +
        '@pnIdPlanCarga='+ 
        placadato[0].IdPlanCarga+
        ',@psObservaciones=' +
        placadato[0].Observaciones +
        ',@pnEsRevisionEfectuada=' +
        placadato[0].EsRevisionEfectuada +
        ',@pnEsNoCargoDescargoMaterial=' +
        Todos +
        ',@psNombrePcMod=' +
        ipadress +
        ',@pnClaUsuarioMod=' +
        NumbUsuario +'"}',
        tipoEstructura: 0,
    };
/* eslint-enable */

if(NomMotivoEntrada===9 && TodosChange===1){
  callApi(urlKrakenService, 'POST', data11, (res) => {
    // console.log(res);
  });
  if(NomMotivoEntrada===9 && TodosChange===1 && Todos===1){
    setTimeout(() =>{
      setrow('')
          }, 1000);
  }
}

if(NomMotivoEntrada===3 && TodosChange===1){
  callApi(urlKrakenService, 'POST', data36, (res) => {
    // console.log(res);
  });
  if(NomMotivoEntrada===3 && TodosChange===1 && Todos===1){
    setTimeout(() =>{
      setrow('')
          }, 1400);
  }
}

if(NomMotivoEntrada===1 && TodosChange===1){
  if(TodosChange===1 && Todos!==0){
  callApi(urlKrakenService, 'POST', data64, (res) => {
    // console.log(res);
  });
}

  if(NomMotivoEntrada===1 && TodosChange===1 && Todos===1){
    setTimeout(() =>{
      setrow('')
          }, 1400);
  }


}
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
        <FormControlLabel style={{height: "27px",float:'right',width:'20%'}} control={<IOSSwitch checked={Todos === 1} onChange={handleTodos} name="checkedB" />} label={NomMotivoEntrada===1 ? "No cargo material" :"No descargo material"} />
      </>
    )
}

export default Cargo_Nodescargo
