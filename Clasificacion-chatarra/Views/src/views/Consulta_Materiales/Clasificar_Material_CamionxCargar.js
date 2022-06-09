import React, { useState, useEffect } from 'react';
import DataSource from "devextreme/data/data_source";
import swal from 'sweetalert';
import {
  CardHeader,
  Row,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
// imagenes de botes/Electrodomésticos
import SelectBox from 'devextreme-react/select-box';
import { callApi, getSessionItem } from '../../utils/utils';
import { config } from '../../utils/config';
import { data } from 'jquery';

const MaterialesXCargar = (props) => {
  const [Todos, setTodos] = useState(0);
  // Valores dinámicos locales al editar material
  const [Datosmaterial, setDatosmaterial] = useState(0);
  const [cantidade, setcantidade] = useState(0);
  const [cantidadr, setcantidadr] = useState(props.ro.CantEmbarcada ? props.ro.CantEmbarcada : 0);
  const [kilose, setkilose] = useState(0);
  const [kilosr, setkilosr] = useState(0);
  const [porcentajer, setporcentajer] = useState(pesajeparcial=== 1 ? 100 : props.ro.Porcentaje ? props.ro.Porcentaje : 0);
  const [observaciones, setobservaciones] = useState(props.ro.Observaciones && props.ro.Observaciones !=='undefined' ? props.ro.Observaciones : '');
  const [pesajeparcial, setpesajeparcial] = useState(
    props.ro.EsPesajeParcial === 1 ? props.ro.EsPesajeParcial :props.row.some(ro => ro.EsPesajeParcial ===1) ? 1 : 0
  );
  const ipadress = getSessionItem('Ipaddress');
  const NumbUsuario = getSessionItem('NumUsuario');
  const Token = getSessionItem('Token');
  const [idmaterialr, setidmaterialr] = useState(props.ro.ClaArticuloPlanCarga);
  const [kilosTara, setkilosTara] = useState(props.ValidaTara!==0 ? props.ValidaTara : props.placadato[0].PesoAtrilesTarimas !== null ? props.placadato[0].PesoAtrilesTarimas : 0);
  const [nombrematerialr, setnombrematerialr] = useState(0);
  const [idmaterialviaje, setidmaterialviaje] = useState(0);
  const [nombrematerialviaje, setnombrematerialviaje] = useState(0);
  const [almacen, setalmacen] = useState(props.ro.ClaAlmacen ? props.ro.ClaAlmacen:0 )
  const [subalmacen, setsubalmacen] = useState(props.ro.ClaSubAlmacen ? props.ro.ClaSubAlmacen:0 );
  const [nomsubalmacen, setnomsubalmacen] = useState(0);
  const [subalmacenes, setsubalmacenes] = useState(0);
  const [kiloscont, setkiloscont] = useState(0);
  const [razoncont, setrazoncont] = useState(0);
  const [Referencia, setReferencia] = useState(0);
  const [Referencia2, setReferencia2] = useState(0);
  const [Existencia, setExistencia] = useState(0);
  const [TipoReferencia, setTipoReferencia] = useState(0);


    const Rowies = props.row.filter((rox)=> ( rox.OrdenAcomodo !== props.ro.OrdenAcomodo))
    const PorcentajeSum = Rowies.length>0
    ? (+Rowies.reduce((acc, val) => acc + val.Porcentaje, 0) + +porcentajer)
    : porcentajer;
  const CantidadSum=Rowies && +Rowies.reduce((acc, val) => acc + val.CantEmbarcada, 0) + +cantidadr;
  const KilosSum=Rowies && Rowies.reduce((acc, val) => acc + val.KilogramosEmbarcados, 0) + +kilosr;
  const IOSSwitch = withStyles((theme) => ({
    root: {
      width: '22%',
      height: '17px',
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
  // Función para cambio a pesaje parcial
  const useCheckbox = (e) => {
    if (props.ro.pesajeparcial === 1) {
      false;
    } else {
      setpesajeparcial(e.target.checked ? 1 : 0);
      setkilosr(0);
      setcantidadr(0);
    }
  };

  const handleMensaje= () => {
    swal('Error', ('Almacen,Referencia y/o TipoReferencia se está mandando como 0. Favor de intentar de nuevo y si persiste revisar con sistemas'), 'error', {
      buttons: {
        confirm: {
          text: 'Aceptar',
          className: 'animation-on-hover btn btn-success',
        },
      },
    });
   }

  const handlefiltro = (event) => {
  };
  // Función que corre servicios antes del render cada que haya un cambio de material
  // Servicio JSON 6 --> SP= AmpSch.AmpClaArticuloDatosSel <Consultar datos Material>
  // Servicio JSON 7 --> SP= AmpSch.AmpClaSubAlmacenArticuloCmb <Consultar listado Subalmacenes>

  useEffect(() => {
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;

    /* eslint-disable */

    const data31 = {
      parameters:
        '{"ClaUbicacion":' +
        props.editBoxValue +
        ',"ClaServicioJson":31,"Parametros":"@pnClaUbicacion=' +
        props.editBoxValue +
        ''+config.Separador+'@pnClaMaterialRecibeTraspaso=' +
        props.ro.ClaArticuloPlanCarga +
        '"}',
      tipoEstructura: 0,
    };

    const data32 = {
      parameters:
        '{"ClaUbicacion":' +
        props.editBoxValue +
        ',"ClaServicioJson":32,"Parametros":"@pnClaUbicacion=' +
        props.editBoxValue +
        ''+config.Separador+'@pnClaMaterialRecibeTraspaso=' +
        props.ro.ClaArticuloPlanCarga +
        '"}',
      tipoEstructura: 0,
    };

    
    /* eslint-enable */
        callApi(urlKrakenService, 'POST', data31, (res) => {
          setDatosmaterial(res.Result0);
        });

        callApi(urlKrakenService, 'POST', data32, (res) => {
          setsubalmacenes(res.Result0);
        });
  }, []);


  const handledelete = () => {
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    const urlKrakenBloque = `${config.KrakenService}/${24}/${config.Bloque}`;
    
    /* eslint-disable */
    const data64 = [ `@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@psPlacas='${props.placadato[0].Placas}'${config.Separador}@pnIdPlanCarga=${(props.PlanCarga ? props.PlanCarga : props.placadato[0].ClaPlanCarga )}${config.Separador}@psObservaciones='${observaciones ? observaciones.replace('#', '%23').replace(/\r\n|\n/gi,'').replace(/\\/g,""):''}'${config.Separador}@pnEsRevisionEfectuada=${props.placadato[0].EsRevisionEfectuada}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@psOrigen='WEB'`];

    const data65 = 
    [`@@TransactionSAMP:@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@psClaVehiculoPorClasificar='${props.placadato[0].IdTagVehiculoPorClasificar}'${config.Separador}@psPlacas='${props.placadato[0].Placas}'${config.Separador}@pnClaPlanCarga=${(props.PlanCarga ? props.PlanCarga : props.placadato[0].ClaPlanCarga )}${config.Separador}@pnOrdenAcomodo=${props.ro.OrdenAcomodo}${config.Separador}@pnIdFabricacion=${props.ro.IdFabricacion}${config.Separador}@pnIdFabricacionDet=${props.ro.IdFabricacionDet}${config.Separador}@pnIdRenglon=1${config.Separador}@pnClaArticuloPlanCarga=${props.ro.ClaArticuloPlanCarga}${config.Separador}@pnClaAlmacen=${almacen}${config.Separador}@pnClaSubAlmacen=${subalmacen}${config.Separador}@psClaReferencia='${((Referencia !==0 && Referencia !==null)? Referencia :Referencia2 )}'${config.Separador}@pnClaTipoReferencia=${TipoReferencia !==0 && TipoReferencia !==null && TipoReferencia}${config.Separador}@pnCantEmbarcada=${(kilosr > 0 && Datosmaterial ? kilosr /Datosmaterial[0].PesoTeoricoRecibido : cantidadr==='' ? 0 : cantidadr)}${config.Separador}@pnKilogramosEmbarcados=${(cantidadr > 0 && Datosmaterial ? cantidadr *  Datosmaterial[0].PesoTeoricoRecibido : kilosr==='' ? 0 : kilosr)}${config.Separador}@pnPorcentaje=${(pesajeparcial===1 ? 100 : (porcentajer==='' ? 0 : porcentajer))}${config.Separador}@pnCantEmbarcar=${props.ro.CantEmbarcar}${config.Separador}@pnKilogramosEmbarcar=${props.ro.KilogramosEmbarcar}${config.Separador}@pnEsPesajeParcial=${pesajeparcial}${config.Separador}@pnEsOrdenMaquilaInterna=0${config.Separador}@pnIdOrdenMaquila=0${config.Separador}@pnKilogramosReales=0${config.Separador}@psComentarios='${observaciones}'${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@pnAccionSp=3${config.Separador}@pnPesoAtriles=${kilosTara}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]

    const data66 =
    [`@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaPlanCarga=${(props.placadato[0].ClaPlanCarga !== null ? props.placadato[0].ClaPlanCarga : props.PlanCarga!==null ? props.PlanCarga:0)}${config.Separador}@psClaVehiculoPorClasificar='${props.placadato[0].Placas}'${config.Separador}@psPlacas='${props.placadato[0].Placas}'${config.Separador}@pnEsNoCargoDescargoMaterial=${(props.placadato[0].EsNoCargoDescargoMaterial !==null ? props.placadato[0].EsNoCargoDescargoMaterial : 0)}${config.Separador}@pnPesoAtrilesTarimas=${(props.ValidaTara!==0 ? props.ValidaTara : props.placadato[0].PesoAtrilesTarimas !== null ? props.placadato[0].PesoAtrilesTarimas : 0)}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]
  
   

    const data85 ={ parameters: `{"ClaUbicacion":${props.editBoxValue},"Token":"${Token}","ClaServicioJson":"85","IdBoleta":"${props.placadato[0].IdBoleta}","EnBloque":"${1}","Encabezado":"${data64}","Detalle":"${data65}","Validacion":"${CantidadSum-cantidadr > 0 || pesajeparcial===1 ? data66 : ''}"}`,
    tipoEstructura: 0}
  
    // usage
    /* eslint-enable */
    callApi(urlKrakenBloque, 'POST', data85, (res) => {
      // console.log(res);
      // props.setpoppesaje(true);
      props.setmodaledit(false);
      props.seteditOpen(false);
      props.setrow('')
      props.setActualizar(true);
      setTimeout(() =>{
  props.setActualizar(false)
      }, 50);
    });

  };
  // Función que corre servicios antes del render para obtener Referencia cada que cambia el Material/subalmacen
  // Servicio JSON 8 --> SP= AmpSch.AmpClaSubAlmacenDatosSel <Consultar datos subalmacen>

  useEffect(() => {
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    
    /* eslint-disable */

    const data33 = {
      parameters:
        '{"ClaUbicacion":' +
        props.editBoxValue +
        ',"ClaServicioJson":33,"Parametros":"@pnClaUbicacion=' +
        props.editBoxValue +
        ''+config.Separador+'@pnClaMaterialRecibeTraspaso=' +
        props.ro.ClaArticuloPlanCarga +
        ''+config.Separador+'@pnClaSubAlmacenTraspaso=' +
        subalmacen +
        ''+config.Separador+'@psNomSubAlmacenTraspaso=' 
        // +
        // (nomsubalmacen && nomsubalmacen.includes('"') ? '':nomsubalmacen) +
        +config.Separador+'@pnIdBoleta=' +
        props.placadato[0].IdBoleta +
        '"}',
      tipoEstructura: 0,
    };
    /* eslint-enable */
    if (subalmacen > 0 && nomsubalmacen) {
      setalmacen(0);
      callApi(urlKrakenService, 'POST', data33, (res) => {
        setalmacen(res.Result0[0].ClaAlmacen);
        setReferencia2(res.Result0[0].ClaReferenciaTraspaso)
      });
    }
  }, [nomsubalmacen, subalmacen, subalmacenes]);


  useEffect(() => {
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    /* eslint-disable */
    const data34 = {
      parameters:
        '{"ClaUbicacion":' +
        props.editBoxValue +
        ',"ClaServicioJson":34,"Parametros":"@pnClaUbicacion=' +
        props.editBoxValue +
        ''+config.Separador+'@pnClaMaterialRecibeTraspaso=' +
        props.ro.ClaArticuloPlanCarga +
        ''+config.Separador+'@pnClaAlmacen='+
        almacen +
        ''+config.Separador+'@pnClaSubAlmacenTraspaso=' +
        subalmacen +
        ''+config.Separador+'@psReferencia="}',
      tipoEstructura: 0,
    };
    /* eslint-enable */
    if (almacen!==0) {
    callApi(urlKrakenService, 'POST', data34, (res) => {
      setReferencia(res.Result0[0].ClaReferencia);
      setTipoReferencia(res.Result0[0].ClaTipoReferencia)
      setExistencia(res.Result0[0].Existencia)
    });
  }
  }, [almacen])
  // Función que pone valor determinado de subalmacén si es único
console.log(Referencia)
  useEffect(() => {
    if (subalmacenes.length === 1) {
        setsubalmacen(subalmacenes[0].ClaSubAlmacenTraspaso);
        setnomsubalmacen(subalmacenes[0].NomSubAlmacenTraspaso);
    }
  }, [subalmacenes]);


  // Funciones para obtener las cantidades/opciones individuales que el usuario ingrese

  const handlecantidadr = (event) => {
    setcantidadr(event.target.value);
  };

  const handletara = (event) => {
    setkilosTara(event.target.value);
  };

  const handlekilosr = (event) => {
    setkilosr(event.target.value);
  };

  const handleobservaciones = (event) => {
    setobservaciones(event.target.value);
  };

  const handlekiloscont = (e) => {
    setkiloscont(e.target.value);
  };

  const handleporcentaje = (event) => {
    // const val = event.target.value
    // const max = 100
    // const maxLength = max.toString().length-1
    // const newVal = val < max ? val : parseInt(val.toString().substring(0, maxLength))
    setporcentajer(event.target.value);
  };


  const handlesubalmacen = (event) => {
    setsubalmacen(event.value);
    setnomsubalmacen(event.component.option('text'));
  };

  // Función para cambiar del paso 1 (Clasificación de Material) & paso 2 (Contaminación)

  const handleBack = () => {
    props.setmodaledit(false)
    // props.setpoppesaje(true);
  };

  const productsDataSource = new DataSource({
    store: {
      data: props.materialpt ? props.materialpt : null,
      type: 'array',
      key: 'ID'
    },
    paginate: true,
    pageSize: 10
  });

  // Función que guarda los cambios efectuados en el material
  // Servicio JSON 11 --> SP= BasSch.BasGuardarClasEntCompraMatPrimaProc <Guarda clasificación>
  // Servicio JSON 12 --> SP= BasSch.BasRegistraMaterialClasEntCompraMatPrimaProc <Registra material a clasificar>
  const handleSubmit = () => {
    // props.setpoppesaje(true);
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    const urlKrakenBloque = `${config.KrakenService}/${24}/${config.Bloque}`;
    /* eslint-disable */

    const data64 = [ `@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@psPlacas='${props.placadato[0].Placas}'${config.Separador}@pnIdPlanCarga=${(props.PlanCarga ? props.PlanCarga : props.placadato[0].ClaPlanCarga )}${config.Separador}@psObservaciones='${observaciones ? observaciones.replace('#', '%23').replace(/\r\n|\n/gi,'').replace(/\\/g,""):''}'${config.Separador}@pnEsRevisionEfectuada=${props.placadato[0].EsRevisionEfectuada}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@psOrigen='WEB'`];

    const data65 = 
    [`@@TransactionSAMP:@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@psClaVehiculoPorClasificar='${props.placadato[0].IdTagVehiculoPorClasificar}'${config.Separador}@psPlacas='${props.placadato[0].Placas}'${config.Separador}@pnClaPlanCarga=${(props.PlanCarga ? props.PlanCarga : props.placadato[0].ClaPlanCarga )}${config.Separador}@pnOrdenAcomodo=${props.ro.OrdenAcomodo}${config.Separador}@pnIdFabricacion=${props.ro.IdFabricacion}${config.Separador}@pnIdFabricacionDet=${props.ro.IdFabricacionDet}${config.Separador}@pnIdRenglon=1${config.Separador}@pnClaArticuloPlanCarga=${props.ro.ClaArticuloPlanCarga}${config.Separador}@pnClaAlmacen=${almacen}${config.Separador}@pnClaSubAlmacen=${subalmacen}${config.Separador}@psClaReferencia='${((Referencia !==0 && Referencia !==null)? Referencia :Referencia2 )}'${config.Separador}@pnClaTipoReferencia=${TipoReferencia !==0 && TipoReferencia !==null && TipoReferencia}${config.Separador}@pnCantEmbarcada=${(kilosr > 0 && Datosmaterial ? kilosr /Datosmaterial[0].PesoTeoricoRecibido : cantidadr==='' ? 0 : cantidadr)}${config.Separador}@pnKilogramosEmbarcados=${(cantidadr > 0 && Datosmaterial ? cantidadr *  Datosmaterial[0].PesoTeoricoRecibido : kilosr==='' ? 0 : kilosr)}${config.Separador}@pnPorcentaje=${(pesajeparcial===1 ? 100 : (porcentajer==='' ? 0 : porcentajer))}${config.Separador}@pnCantEmbarcar=${props.ro.CantEmbarcar}${config.Separador}@pnKilogramosEmbarcar=${props.ro.KilogramosEmbarcar}${config.Separador}@pnEsPesajeParcial=${pesajeparcial}${config.Separador}@pnEsOrdenMaquilaInterna=0${config.Separador}@pnIdOrdenMaquila=0${config.Separador}@pnKilogramosReales=0${config.Separador}@psComentarios='${observaciones}'${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@pnAccionSp=2${config.Separador}@pnPesoAtriles=${kilosTara && kilosTara !== '' ? kilosTara:0}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]

    const data66 =
    [`@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaPlanCarga=${(props.placadato[0].ClaPlanCarga !== null ? props.placadato[0].ClaPlanCarga : props.PlanCarga!==null ? props.PlanCarga:0)}${config.Separador}@psClaVehiculoPorClasificar='${props.placadato[0].Placas}'${config.Separador}@psPlacas='${props.placadato[0].Placas}'${config.Separador}@pnEsNoCargoDescargoMaterial=${(props.placadato[0].EsNoCargoDescargoMaterial !==null ? props.placadato[0].EsNoCargoDescargoMaterial : 0)}${config.Separador}@pnPesoAtrilesTarimas=${kilosTara && kilosTara !== '' ? kilosTara:0}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]
  
   

    const data85 ={ parameters: `{"ClaUbicacion":${props.editBoxValue},"Token":"${Token}","ClaServicioJson":"85","IdBoleta":"${props.placadato[0].IdBoleta}","EnBloque":"${1}","Encabezado":"${data64}","Detalle":"${data65}","Validacion":"${((porcentajer ===100) ||(PorcentajeSum !== null && ((PorcentajeSum === 100 || PorcentajeSum === '100'))) || ((PorcentajeSum === '0' || PorcentajeSum === 0) && (CantidadSum>'0' || CantidadSum>0)) || (props.row && props.row.length>0 && (props.row.some(ro => ro.CantEmbarcada !==null) || props.row.some(ro => ro.KilogramosEmbarcados !==null) || props.row.some(ro => ro.Porcentaje !==null)) && (PorcentajeSum !== null && (PorcentajeSum === '100' || PorcentajeSum === 100)) || ((PorcentajeSum === '0' || PorcentajeSum === 0) && (CantidadSum>'0' || CantidadSum> 0))) || pesajeparcial===1) ? data66 : ''}"}`,
    tipoEstructura: 0}
  
    // usage
    /* eslint-enable */


    
    async function FuncionData() {
      callApi(urlKrakenBloque, 'POST', data85, (res) => {
        res.Result0[0].Mensaje !== 'OK' &&
        swal('Error', (`${res.Result0[0].Mensaje}`), 'error', {
          buttons: {
            confirm: {
              text: 'Aceptar',
              className: 'animation-on-hover btn btn-success',
            },
          },
        });
          props.setActualizar(true);
          setTimeout(() => {
            props.setActualizar(false);
          }, 50);
        });
    }
    if (props.NomMotivoEntrada === 1) {
      FuncionData();
    }
    // setValidaCargo(0)
    // if(Nocargo===1){
    // setNocargo(0)
    // }
    props.setValidaTara(kilosTara)
    props.setpesajeparcial(pesajeparcial);
    props.setSavemat(1)
    props.setrow('');
  };

  // Componente final de Wizard para editar material

  return (
    <div className="CamionxCargar">
      <div className="box">
        <span className="close-icon" onClick={handleBack}>
          x
        </span>
        <CardHeader style={{ paddingTop: '25px', color: '#002c6f' }}>
          <Row style={{ marginLeft: '0px' }}>Cargar Material</Row>
        </CardHeader>
        <Container fluid={true}>
          <Row className="popup-row" style={{ marginTop: '10px' }}>
            <Col className="selector">
              <Row
                style={{
                  color: 'red',
                  position: 'absolute',
                  marginTop: '50px',
                  marginLeft: '-5%',
                }}
                className="warning"
              >
              </Row>
              <Row className="popup-title">Material:&nbsp; {props.ro.NomArticuloPlanCarga}</Row>
            </Col>
            <Row
              style={{
                color: 'red',
                position: 'absolute',
                marginTop: '64px',
                marginLeft: '52%',
              }}
              className="warning"
            >
            </Row>
          </Row>
          <Row className="popup-row">
            <Col>
              <Row className="popup-title">Cantidad a Embarcar</Row>
              <Row>{props.ro.CantEmbarcar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} &nbsp; {props.ro.NomUnidad}</Row>
            </Col>
            <Col>
              <Row className="popup-title" style={{ marginLeft: '0px' }}>
                Cantidad Embarcada
              </Row>
              <InputGroup>
                <Input
                  className="popup-recibidos"
                  onChange={handlecantidadr}
                  type="number"
                  value={
                    props.row.EsPesajeParcial === 1 || pesajeparcial === 1
                      ? 0
                      : kilosr > 0 && Datosmaterial
                      ? kilosr /Datosmaterial[0].PesoTeoricoRecibido
                          : cantidadr
                  }
                  disabled={
                    props.row.EsPesajeParcial === 1 ||
                    props.row.some(ro => ro.EsPesajeParcial ===1) ||
                    pesajeparcial === 1 ||
                    porcentajer > 0 ||
                    kilosr > 0
                  }
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    {Datosmaterial ? Datosmaterial[0].NomUnidadRecibido : ''}
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>

          <Row className="popup-row">
            <Col>
              <Row className="popup-title">Kilos a Embarcar</Row>
              <Row>{props.ro.KilogramosEmbarcar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} &nbsp; Kg</Row>
            </Col>
            <Col>
              <Row className="popup-title" style={{ marginLeft: '0px' }}>
                Kilos Embarcados
              </Row>
              <InputGroup>
                <Input
                  className="popup-recibidos"
                  onChange={handlekilosr}
                  value={
                    props.row.EsPesajeParcial === 1 || pesajeparcial === 1
                      ? 0
                      : cantidadr > 0 && Datosmaterial
                      ? cantidadr *  Datosmaterial[0].PesoTeoricoRecibido
                          : kilosr
                  }
                  disabled={
                    props.row.EsPesajeParcial === 1 ||
                    props.row.some(ro => ro.EsPesajeParcial ===1) ||
                    pesajeparcial === 1 ||
                    cantidadr > 0 ||
                    porcentajer > 0
                  }
                  type="number"
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>Kg</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>

          <Row className="popup-row">
            <Col>
              <Row className="popup-title">Porcentaje Cargado</Row>
              <Row>
                <InputGroup>
                  <Input
                    className="popup-recibidos"
                    onChange={handleporcentaje}
                    type="number"
                    min={0}
                    max={100}
                    value={
                      pesajeparcial === 1
                        ? 100
                        : porcentajer
                    }
                    disabled={
                      pesajeparcial === 1 ||
                      props.ro.EsPesajeParcial === 1 ||
                      props.row.some(ro => ro.EsPesajeParcial ===1) ||
                      cantidadr > 0 ||
                      kilosr > 0
                    }
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>&nbsp;%&nbsp;</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Row>
            </Col>
            <Col>
              <Row className="popup-title" style={{ marginLeft: '0px'}}>
                Kilos Tarima
              </Row>
              <InputGroup>
                <Input
                  className="popup-recibidos"
                  onChange={handletara}
                  type="number"
                  value={
                    kilosTara
                  }
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>Kg</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>

          </Row>

          <Row className="popup-row">
            <Col>
              <Row className="popup-title">Observaciones</Row>
              <Row>
                <Input
                  className="popup-recibidos"
                  onChange={handleobservaciones}
                  defaultValue={observaciones}
                  type="text"
                />
              </Row>
            </Col>
            <Col>
              <form>
                <input
                  type="checkbox"
                  onChange={useCheckbox}
                  checked={pesajeparcial === 1 || props.ro.EsPesajeParcial === 1 || props.row.some(ro => ro.EsPesajeParcial ===1)}
                  style={{ width: '12px', height: '12px',visibility: 'visible' }}
                />
                <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                <label type="text" style={{visibility: 'visible' }}>&nbsp; Pesaje Parcial</label>
              </form>
            </Col>
          </Row>
          <Row
            style={{
              color: 'red',
              position: 'absolute',
              marginTop: '-88px',
              marginLeft: '0px',
            }}
            className="warning"
          >
            <span style={{ color: 'red !important' }}>
              {PorcentajeSum > 100 ? 'El porcentaje no puede exceder el 100%' : null}
            </span>
          </Row>

          <Row className="popup-row">
            <Col>
              <Row className="popup-title">Subalmacén</Row>
              <Row>
                <SelectBox
                  dataSource={props.ro ? subalmacenes : ''}
                  value={subalmacenes.length===1 ? (subalmacenes[0].ClaSubAlmacenTraspaso):subalmacen}
                  displayExpr='NomSubAlmacenTraspaso'
                  valueExpr='ClaSubAlmacenTraspaso'
                  placeholder="Seleccionar Subalmacen.."
                  noDataText="No hay subalmacen disponible"
                  onValueChanged={handlesubalmacen}
                  disabled={subalmacenes.length === 1}
                />
              </Row>
              <Row
                style={{
                  color: 'red',
                  position: 'absolute',
                  marginTop: '0px',
                  marginLeft: '0px',
                }}
                className="warning"
              >
                <span style={{ color: 'red !important'}}>
                  {idmaterialr > 1 && subalmacen === 0 ? 'Selecciona subalmacen' : null}
                </span>
              </Row>
            </Col>
            <Col>
              <Row className="popup-title" style={{ marginLeft: '0px'}}>Existencia</Row>
              <Input
                className="popup-recibidos"
                value={`${Existencia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Kg`}
                readOnly='true'
                disabled='false'
                style={{background: 'transparent'}}
              />
            </Col>
          </Row>
        </Container>
        <div>
          <button
            style={{ marginRight: '30px' }}
            type="button"
            className="popup-delete"
            onClick={handledelete}
          >
            <i className="fas fa-trash-alt"></i> Eliminar
          </button>
          <button
            style={{ marginRight: '30px' }}
            type="button"
            className="popup-button"
            onClick={((PorcentajeSum>100 && pesajeparcial===0) ||  subalmacen<1 || Datosmaterial===0 || ((kilosr===0 || kilosr==='' || kilosr==='0')&& (cantidadr===0 || cantidadr==='' || cantidadr==='0') && (porcentajer===0 || porcentajer==='' || porcentajer==='0') && (pesajeparcial===0))) ? null: (almacen !==0 && ((Referencia !==0 && Referencia!==null)||(Referencia2 !==0 && Referencia2!==null)) && (TipoReferencia !==0 && TipoReferencia !==null)) ? handleSubmit:handleMensaje}
          >
            GUARDAR
          </button>
          <button
            type="button"
            className="popup-button"
            onClick={handleBack}
          >
            &#9447; Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialesXCargar;
