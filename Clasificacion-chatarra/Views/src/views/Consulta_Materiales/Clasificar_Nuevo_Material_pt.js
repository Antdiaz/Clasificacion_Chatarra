import React, {useCallback,useState, useEffect,useRef,useMemo} from 'react';
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

const NuevoMaterial = (props) => {
  const [Todos, setTodos] = useState(0);
  // Valores dinámicos locales al editar material
  const [Datosmaterial, setDatosmaterial] = useState(0);
  const [cantidadr, setcantidadr] = useState(0);
  const [kilosr, setkilosr] = useState(0);
  const [porcentajer, setporcentajer] = useState(pesajeparcial === 1 ? 100 : 0);
  const [observaciones, setobservaciones] = useState('');
  const [pesajeparcial, setpesajeparcial] = useState(
    props.placadato[0].EsPesajeParcial === 1 ? props.placadato[0].EsPesajeParcial : 0
  );
  const ipadress = getSessionItem('Ipaddress');
  const NumbUsuario = getSessionItem('NumUsuario');
  const Token = getSessionItem('Token');
  const [idmaterialr, setidmaterialr] = useState(0);
  const [kilosTara, setkilosTara] = useState(0);
  const [cantremisionada, setcantremisionada] = useState(null);
  const [pesoremisionado, setpesoremisionado] = useState(null);
  const [unidadRemisionado, setunidadRemisionado] = useState(null)
  const [nombrematerialr, setnombrematerialr] = useState(0);
  const [idmaterialviaje, setidmaterialviaje] = useState(0);
  const [idviaje, setidviaje] = useState(0)
  const [nombrematerialviaje, setnombrematerialviaje] = useState(0);
  const [almacen, setalmacen] = useState(0)
  const [subalmacen, setsubalmacen] = useState(0);
  const [nomsubalmacen, setnomsubalmacen] = useState('');
  const [idFabricacion, setidFabricacion] = useState(0);
  const [IdFabricacionDet, setIdfabricacionDet] = useState(0)
  const [subalmacenes, setsubalmacenes] = useState(0);
  const [kiloscont, setkiloscont] = useState(0);
  const [razoncont, setrazoncont] = useState(0);
  const [Referencia, setReferencia] = useState(0);
  const [focusValue, setfocusValue] = useState('')
  const escribiendo = 1500;
  let escribiendoTimer
  const PorcentajeSum = props.row
    ? +props.row.reduce((acc, val) => acc + val.PorcentajeMaterial, 0) + +porcentajer
    : 0;
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
    if (props.pesajeparcial === 1) {
      false;
    } else {
      setpesajeparcial(e.target.checked ? 1 : 0);
      setkilosr(0);
      setcantidadr(0);
    }
  };

const UpSelectBox = () => {
if(escribiendoTimer){
  clearTimeout(escribiendoTimer)
}
escribiendoTimer = setTimeout(terminado, escribiendo)

}

const DownSelectBox = () => {
  clearTimeout(escribiendoTimer)
}

const terminado = () => {
     const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;

  /* eslint-disable */
  const data58 = {
    parameters:
      '{"ClaUbicacion":' +
      props.editBoxValue +
      ',"ClaServicioJson":' +
      58 +
      ',"Parametros":"@psValor='+ focusValue.replace('"', '%22') +'"}',
    tipoEstructura: 0,
  };
   /* eslint-enable */

  if(focusValue!=='' && focusValue.length>2 ){
    callApi(urlKrakenService, 'POST', data58, (res) => {
      props.setmaterialpt(res.Result0);
      });
    }
}

  const focusSelectBox = (e) => {
    if (e.fullName === "text") {
      setfocusValue(e.value)
  }

};


  // Función que corre servicios antes del render cada que haya un cambio de material
  // Servicio JSON 6 --> SP= AmpSch.AmpClaArticuloDatosSel <Consultar datos Material>
  // Servicio JSON 7 --> SP= AmpSch.AmpClaSubAlmacenArticuloCmb <Consultar listado Subalmacenes>

  useEffect(() => {
    const urlKrakenVal = `${config.KrakenService}/${24}/${config.Servicio}`;
     /* eslint-disable */
     if(props.NomMotivoEntrada===3 && props.Materialviaje && props.placadato && idmaterialviaje !==0 && idFabricacion){
    const data49 = {
      parameters:
        '{"ClaUbicacion":' +
        props.editBoxValue +
        ',"ClaServicioJson":' +
        49+
        ',"Parametros":"@pnClaUbicacion=' +
        props.editBoxValue +
        ''+config.Separador+'@pnClaArticuloRemisionado=' +
        idmaterialviaje +
        ''+config.Separador+'@pnClaUbicacionOrigen=' +
        props.placadato[0].ClaUbicacionOrigen +
        ''+config.Separador+'@pnClaViajeOrigen=' +
        props.placadato[0].ClaViajeOrigen +
        '' + ((props.placadato[0].IdFabDefault === null) ? (''+config.Separador+'@pnClaFabricacionViaje='+props.placadato[0].IdFabDefault+'') : (''+config.Separador+'@pnClaFabricacionViaje='+idFabricacion+'')) +
        // ''+config.Separador+'@pnClaFabricacionViaje=' +
        // props.Materialviaje[0].idFabricacion+
        '"}',
      tipoEstructura: 0,
    };
     /* eslint-enable */

      callApi(urlKrakenVal, 'POST', data49, (res) => {
        const book = res.Result0.filter((pac) => pac.IdFabricacion === idFabricacion);
        console.log(book);
        setIdfabricacionDet(book[0].IdFabricacionDet);
        setcantremisionada(book[0].CantRemisionada);
        setpesoremisionado(book[0].PesoRemisionado);
        setunidadRemisionado(book[0].NomUnidadRemisionado);
      })
    }
  }, [idFabricacion])

  useEffect(() => {
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;

    /* eslint-disable */
    const data6 = {
      parameters:
        '{"ClaUbicacion":' +
        props.editBoxValue +
        ',"ClaServicioJson":6,"Parametros":"@pnClaUbicacion=' +
        props.editBoxValue +
        ''+config.Separador+'@pnClaArticuloCompra=' +
        idmaterialr +
        ''+config.Separador+'@pnClaProveedor=' +
        props.placadato[0].ClaProveedor +
        ''+config.Separador+'@pnIdListaPrecio=' +
        props.placadato[0].IdListaPrecio +
        ''+config.Separador+'@pnClaOrdenCompra='+config.Separador+'@pnClaTipoOrdenCompra="}',
      tipoEstructura: 0,
    };

    const data31 = {
      parameters:
        '{"ClaUbicacion":' +
        props.editBoxValue +
        ',"ClaServicioJson":31,"Parametros":"@pnClaUbicacion=' +
        props.editBoxValue +
        ''+config.Separador+'@pnClaMaterialRecibeTraspaso=' +
        idmaterialr +
        '"}',
      tipoEstructura: 0,
    };
    const data7 = {
      parameters:
        '{"ClaUbicacion":' +
        props.editBoxValue +
        ',"ClaServicioJson":7,"Parametros":"@pnClaUbicacion=' +
        props.editBoxValue +
        ''+config.Separador+'@pnClaArticuloCompra=' +
        idmaterialr +
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
        idmaterialr +
        '"}',
      tipoEstructura: 0,
    };

    
    /* eslint-enable */
    if (props.NomMotivoEntrada === 3) {
      if (idmaterialr > 0) {
        callApi(urlKrakenService, 'POST', data31, (res) => {
          setDatosmaterial(res.Result0);
        });

        callApi(urlKrakenService, 'POST', data32, (res) => {
          setsubalmacenes(res.Result0);
        });
      }
    }
  }, [idmaterialr]);

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
        idmaterialr +
        ''+config.Separador+'@pnClaSubAlmacenTraspaso=' +
        subalmacen +
        ''+config.Separador+'@psNomSubAlmacenTraspaso=' 
        +
        (nomsubalmacen.includes('"') ? '':nomsubalmacen) +
        ''
        +config.Separador+'@pnIdBoleta=' +
        props.placadato[0].IdBoleta +
        '"}',
      tipoEstructura: 0,
    };
    /* eslint-enable */
    if (subalmacen > 0 && nomsubalmacen) {
      callApi(urlKrakenService, 'POST', data33, (res) => {
        setalmacen(res.Result0[0].ClaAlmacen);
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
        idmaterialr +
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
      // setTipoReferencia(res.Result0[0].ClaTipoReferencia)
    });
  }
  }, [almacen])

  console.log(Referencia)

  // Función que pone valor determinado de subalmacén si es único

  useEffect(() => {
    if (subalmacenes.length === 1) {
      if (props.NomMotivoEntrada === 9) {
        setsubalmacen(subalmacenes[0].ClaSubAlmacenCompra);
        setnomsubalmacen(subalmacenes[0].NomSubAlmacenCompra);
      } else if (props.NomMotivoEntrada === 3) {
        setsubalmacen([subalmacenes[0].ClaSubAlmacenTraspaso]);
        setnomsubalmacen(subalmacenes[0].NomSubAlmacenTraspaso);
      }
    }
  }, [subalmacenes]);


  // Función para cambio de material en el wizard
  const onValueChangedr = (e) => {
    setidmaterialr(e.value);
    setsubalmacen(0);
    setalmacen(0)
    setnombrematerialr(e.component.option('text').split('-').pop());
  };

  const onValueChangede = (e) => {
    setidviaje(e.value)
    props.setidmaterialviaje(e.component.option("selectedItem").ClaArticuloRemisionado);
    setidmaterialviaje(e.component.option("selectedItem").ClaArticuloRemisionado);
    setnombrematerialviaje(e.component.option('text').split('-').pop());
    setidFabricacion(e.component.option("selectedItem").idFabricacion)
  };

  // Operaciones para obtener los kilos de botes/electrodomésticos

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

  const handlealmacen = (event) => {
    setalmacen(event.target.value);
  };

  const handlesubalmacen = (event) => {
    setsubalmacen(event.value);
    setnomsubalmacen(event.component.option('text'));
  };

  // Función para cambiar del paso 1 (Clasificación de Material) & paso 2 (Contaminación)

  const handleBack = () => {
    // props.setpoppesaje(true);
    props.setmodaladdOpen(false);
  };

  const productsDataSource = useMemo(() => {
    return new DataSource({
    store: {
      data: props.materialpt,
      type: 'array',
      key: 'ID'
    },
    paginate: true,
    pageSize: 10
  });
}, [props.materialpt]);

  // Función que guarda los cambios efectuados en el material
  // Servicio JSON 11 --> SP= BasSch.BasGuardarClasEntCompraMatPrimaProc <Guarda clasificación>
  // Servicio JSON 12 --> SP= BasSch.BasRegistraMaterialClasEntCompraMatPrimaProc <Registra material a clasificar>

  const handleSubmit = () => {
    // props.setpoppesaje(true);
    const urlKrakenBloque = `${config.KrakenService}/${24}/${config.Bloque}`;
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;

    /* eslint-disable */
    // usage
    /* eslint-enable */

    async function FuncionData() {
      /* eslint-disable */
      const data36 = [ `@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaViajeOrigen=${props.ClaViajeOrigen}${config.Separador}@pnClaUbicacionOrigen=${props.ClaUbicacionOrigen}${config.Separador}@pnClaTransporte=${props.placadato[0].ClaTransporte}${config.Separador}@pnClaTransportista=${props.placadato[0].ClaTransportista}${config.Separador}@psNomTransportista='${props.placadato[0].NomTransportista}'${config.Separador}@psNomChofer='${(props.placadato[0].NomChofer !== null ? props.placadato[0].NomChofer: 0)}'${config.Separador}@psPlacas='${props.placadato[0].Placas}'${config.Separador}@pnPesoDocumentado=${(props.placadato[0].PesoDocumentado !== null ? props.placadato[0].PesoDocumentado : 0)}${config.Separador}@psObservaciones='${(props.placadato[0].Observaciones ? props.placadato[0].Observaciones.replace('#', '%23'): '')}'${config.Separador}@pnEsRevisionEfectuada=${(props.placadato[0].EsRevisionEfectuada ? props.placadato[0].EsRevisionEfectuada : 0)}${config.Separador}@pnClaTipoClasificacion=${props.placadato[0].ClaTipoClasificacion}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@psOrigen='WEB'`];

      const data37 = [ `@@TransactionSAMP:@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaViajeOrigen=${props.ClaViajeOrigen}${config.Separador}@pnClaUbicacionOrigen=${props.ClaUbicacionOrigen}${config.Separador}@pnIdRenglonRecepcion=${(props.row.length + 1)}${config.Separador}@pnIdFabricacion=${idFabricacion}${config.Separador}@pnIdFabricacionDet=${IdFabricacionDet}${config.Separador}@pnClaArticuloRemisionado=${(idmaterialviaje ? idmaterialviaje : 0)}${config.Separador}@pnCantRemisionada=${cantremisionada}${config.Separador}@pnClaMaterialRecibeTraspaso=${idmaterialr}${config.Separador}@pnCantRecibida=${(cantidadr === '' ? 0 : kilosr > 0 ? kilosr / Datosmaterial !== 0 ? Datosmaterial[0].PesoTeoricoRecibido : 1 : cantidadr)}${config.Separador}@pnPesoRecibido=${(kilosr === '' ? 0 : cantidadr > 0 ? cantidadr * Datosmaterial !== 0 ? Datosmaterial[0].PesoTeoricoRecibido : 1 : kilosr)}${config.Separador}@pnPorcentajeMaterial=${(porcentajer ==='' ? 0 : pesajeparcial===1 ? 100 : porcentajer)}${config.Separador}@pnPesoTaraRecibido=${kilosTara}${config.Separador}@pnClaAlmacen=${almacen}${config.Separador}@pnClaSubAlmacenTraspaso=${(subalmacen)}${config.Separador}@pnAccionSp=1${config.Separador}@pnClaSeccion=0${config.Separador}@psReferencia1=${Referencia}${config.Separador}@psReferencia2=0${config.Separador}@psReferencia3=0${config.Separador}@psReferencia4=0${config.Separador}@psReferencia5=0${config.Separador}@pnEsPesajeParcial=${pesajeparcial}${config.Separador}@pnKilosReales=0${config.Separador}@pnKilosContaminados=0${config.Separador}@pnClaMotivoContaminacion=0${config.Separador}@pnClaReferenciaTraspaso=${Referencia}${config.Separador}@psClaContaminantes='1|2|3|4|5|6|'${config.Separador}@psValorContaminantes='0|0|0|0|0|0|'${config.Separador}@pnEsNoCargoDescargoMaterial=${props.placadato[0].EsNoCargoDescargoMaterial}${config.Separador}@pnObservaciones='${(observaciones)}'${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`];
   

      const data37g= props.row && props.row.map((element,index)=>{
        if(element.ClaMaterialRecibeTraspaso){
        const data = [ `@@TransactionSAMP:@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaViajeOrigen=${props.ClaViajeOrigen}${config.Separador}@pnClaUbicacionOrigen=${props.ClaUbicacionOrigen}${config.Separador}@pnIdRenglonRecepcion=${(element.IdRenglonRecepcion ? element.IdRenglonRecepcion : '')}${config.Separador}@pnIdFabricacion=${(element.IdFabricacion ? element.IdFabricacion : 0)}${config.Separador}@pnIdFabricacionDet=${(element.IdFabricacionDet ? element.IdFabricacionDet : 0)}${config.Separador}@pnClaArticuloRemisionado=${(element.ClaArticuloRemisionado ? element.ClaArticuloRemisionado : 0)}${config.Separador}@pnCantRemisionada=${(element.CantRemisionada ? element.CantRemisionada : 0)}${config.Separador}@pnClaMaterialRecibeTraspaso=${element.ClaMaterialRecibeTraspaso}${config.Separador}@pnCantRecibida=${element.CantRecibida}${config.Separador}@pnPesoRecibido=${element.PesoRecibido}${config.Separador}@pnPorcentajeMaterial=${element.PorcentajeMaterial}${config.Separador}@pnPesoTaraRecibido=${(element.PesoTaraRecibido !== null ? element.PesoTaraRecibido : 0)}${config.Separador}@pnClaAlmacen=${(element.ClaAlmacen ? element.ClaAlmacen : 1)}${config.Separador}@pnClaSubAlmacenTraspaso=${(element.ClaSubAlmacenTraspaso)}${element.ClaSubSubAlmacen !== null  && element.ClaSubSubAlmacen !== 0  ? (config.Separador+'@pnClaSubSubAlmacen='+element.ClaSubSubAlmacen) : ''}${config.Separador}@pnClaSeccion=${(element.ClaSeccion !== null ? element.ClaSeccion : 0)}${config.Separador}@psReferencia1=${(element.Referencia1 !== null ? element.Referencia1 : 0)}${config.Separador}@psReferencia2=${(element.Referencia2 !== null ? element.Referencia2 : 0)}${config.Separador}@psReferencia3=${(element.Referencia3 !== null ? element.Referencia3 : 0)}${config.Separador}@psReferencia4=${(element.Referencia4 !== null ? element.Referencia4 : 0)}${config.Separador}@psReferencia5=${(element.Referencia5 !== null ? element.Referencia5 : 0)}${config.Separador}@pnEsPesajeParcial=${element.EsPesajeParcial}${config.Separador}@pnKilosReales=${(element.KilosReales ? element.KilosReales : 0)}${config.Separador}@pnKilosContaminados=${(element.KilosContaminados ? element.KilosContaminados : 0)}${config.Separador}@pnClaMotivoContaminacion=${(element.ClaMotivoContaminacion ? element.ClaMotivoContaminacion : 0)}${config.Separador}@pnClaReferenciaTraspaso=${element.ClaReferenciaTraspaso}${config.Separador}@psClaContaminantes='1|2|3|4|5|6|'${config.Separador}@psValorContaminantes='0|0|0|0|0|0|'${config.Separador}@pnEsNoCargoDescargoMaterial=${props.placadato[0].EsNoCargoDescargoMaterial}${config.Separador}@pnObservaciones='${(element.observaciones)}'${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`];

          return data
        }
        })

      const data38 =
      [`@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaUbicacionOrigen=${props.ClaUbicacionOrigen}${config.Separador}@pnClaViajeOrigen=${props.ClaViajeOrigen}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]
    
      const PorcentajeSum =props.row &&  props.row.reduce((acc, val) => acc + val.PorcentajeMaterial, 0) + +porcentajer;
      const CantidadSum=props.row &&  props.row.reduce((acc, val) => acc + val.CantidadMaterial, 0) + +cantidadr;

      const data84 ={ parameters: `{"ClaUbicacion":${props.editBoxValue},"Token":"${Token}","ClaServicioJson":"84","IdBoleta":"${props.placadato[0].IdBoleta}","EnBloque":"${1}","Encabezado":"${data36}","Detalle":"${data37}${data37g ? data37g.join("") : ''}","Validacion":"${(((PorcentajeSum !== null && (PorcentajeSum === 100)) || (PorcentajeSum === 0 && CantidadSum>0) || (props.ValidaCargo===1 && props.row && props.row.length>0 && (props.row[0].CantidadMaterial !==null || props.row[0].KilosMaterial!==null || props.row[0].PorcentajeMaterial!==null)&& (PorcentajeSum !== null && PorcentajeSum === 100) || (PorcentajeSum === 0 && CantidadSum>0))) || pesajeparcial===1) ? data38 : ''}"}`,
    tipoEstructura: 0}
     
      console.log(data84)
          callApi(urlKrakenBloque, 'POST', data84, (res) => {
            res.Mensaje !== undefined &&
        swal('Error', (`${res.Mensaje}`), 'error', {
          buttons: {
            confirm: {
              text: 'Aceptar',
              className: 'animation-on-hover btn btn-success',
            },
          },
        });
      props.setcambioGuardar(1)
      props.setActualizar(true);
      setTimeout(() =>{
      props.setActualizar(false)
        }, 50);
      })
      }
    

     if(props.NomMotivoEntrada===3){
      FuncionData()
  }
    props.setpesajeparcial(pesajeparcial);
    props.setmodaladdOpen(false);
    props.setrow('');
  };

  // Componente final de Wizard para editar material

  return (
    <div>
      <div className="box">
        <span className="close-icon" onClick={handleBack}>
          x
        </span>
        <CardHeader style={{ paddingTop: '25px', color: '#002c6f' }}>
          <Row style={{ marginLeft: '0px' }}>Descargar Material</Row>
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
              <Row className="popup-title">Material Enviado</Row>
              {props.NomMotivoEntrada=== 9 ? <Row> No aplica</Row> :props.NomMotivoEntrada=== 3 ? 
                    (
                      <Row> 
                        <SelectBox
                          searchEnabled={true}
                          dataSource={props.Materialviaje ? props.Materialviaje:''}
                          defaultValue={idviaje}
                          displayExpr="NomArticuloRemisionado"
                          valueExpr="id"
                          placeholder="Seleccionar Material.."
                          onValueChanged={onValueChangede}
                        />
                      </Row>
                    ):<Row> No aplica</Row>}
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
              <span style={{ color: 'red !important', marginTop: '2px' }}>
                {props.NomMotivoEntrada === 3
                  ? idmaterialr < 1 && 'Seleccionar material'
                  : idmaterialr < 1
                  ? 'Seleccionar material'
                  : null}
              </span>
            </Row>
            <Col className="selector">
              <Row className="popup-title" style={{ marginLeft: '0px' }}>
                <Col style={{ paddingLeft: '0px', paddingRight: '0px' }}>Material Recibido</Col>
              </Row>
              <InputGroup>
                <SelectBox
                  searchEnabled={true}
                  dataSource={productsDataSource}
                  defaultValue={idmaterialr}
                  noDataText="Mínimo 3 dígitos para su búsqueda"
                  displayExpr='NomMaterialRecibeTraspaso'
                  valueExpr='ClaMaterialRecibeTraspaso'
                  placeholder="Seleccionar Material.."
                  onValueChanged={onValueChangedr}
                  onOptionChanged={focusSelectBox}
                  onKeyUp={UpSelectBox}
                  onKeyDown={DownSelectBox}
                  showDataBeforeSearch={true}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className="popup-row">
            <Col>
              <Row className="popup-title">Cantidad Enviada</Row>
              <Row>{cantremisionada !== null && unidadRemisionado !== null ? `${cantremisionada.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}  ${unidadRemisionado}`: '-' }</Row>
            </Col>
            <Col>
              <Row className="popup-title" style={{ marginLeft: '0px' }}>
                Cantidad Recibida
              </Row>
              <InputGroup>
                <Input
                  className="popup-recibidos"
                  onChange={handlecantidadr}
                  type="number"
                  value={
                    props.placadato[0].EsPesajeParcial === 1 || pesajeparcial === 1
                      ? 0
                      : kilosr > 0 && Datosmaterial
                      ? kilosr *
                        (props.NomMotivoEntrada === 9
                          ? Datosmaterial === 0
                            ? 1
                            : Datosmaterial[0].PesoTeoricoKgs
                          : props.NomMotivoEntrada === 3
                          ? Datosmaterial === 0
                            ? 1
                            : Datosmaterial[0].PesoTeoricoRecibido
                          : 1)
                      : cantidadr
                  }
                  disabled={
                    props.placadato[0].EsPesajeParcial === 1 ||
                    pesajeparcial === 1 ||
                    porcentajer > 0 ||
                    kilosr > 0
                  }
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    {props.NomMotivoEntrada === 9
                      ? Datosmaterial
                        ? Datosmaterial[0].NomUnidad
                        : ' '
                      : props.NomMotivoEntrada === 3
                      ? Datosmaterial
                        ? Datosmaterial[0].NomUnidadRecibido
                        : ' '
                      : ''}
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>

          <Row className="popup-row">
            <Col>
              <Row className="popup-title">Kilos Enviados</Row>
              <Row>{pesoremisionado !==null && unidadRemisionado !== null ?`${pesoremisionado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}  Kg` : '-'}</Row>
            </Col>
            <Col>
              <Row className="popup-title" style={{ marginLeft: '0px' }}>
                Kilos Recibidos
              </Row>
              <InputGroup>
                <Input
                  className="popup-recibidos"
                  onChange={handlekilosr}
                  value={
                    props.placadato[0].EsPesajeParcial === 1 || pesajeparcial === 1
                      ? 0
                      : cantidadr > 0 && Datosmaterial
                      ? cantidadr /
                        (props.NomMotivoEntrada === 9
                          ? Datosmaterial === 0
                            ? 1
                            : Datosmaterial[0].PesoTeoricoKgs
                          : props.NomMotivoEntrada === 3
                          ? Datosmaterial === 0
                            ? 1
                            : Datosmaterial[0].PesoTeoricoRecibido
                          : 1)
                      : kilosr
                  }
                  disabled={
                    props.placadato[0].EsPesajeParcial === 1 ||
                    pesajeparcial === 1 ||
                    cantidadr > 0 ||
                    porcentajer > 0
                  }
                  type="number"
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>kgs</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>

          <Row className="popup-row">
            <Col>
              <Row className="popup-title">Fabricación</Row>
              <Row>{props.NomMotivoEntrada === 3 && idmaterialviaje >1 && idFabricacion ? `${idFabricacion}`: '-' }</Row>
            </Col>
            <Col>
            <Row className="popup-title" style={{ marginLeft: '0px'}}>
                Kilos Tara Recibidos
              </Row>
              <Input
                className="popup-recibidos"
                onChange={handletara}
                type="number"
                value={
                  props.placadato[0].EsPesajeParcial === 1 || pesajeparcial === 1 ? 0 : kilosTara
                }
                // disabled={props.placadato[0].EsPesajeParcial === 1 || pesajeparcial === 1}
              />
              {/* <Row className="popup-title" style={{ marginLeft: '0px' }}>
                Zona de Descarga
              </Row>
              <Input className="popup-recibidos" type="text" /> */}
            </Col>
          </Row>

          <Row className="popup-row">
            <Col>
              <Row className="popup-title">Porcentaje Recibido</Row>
              <Row>
                <InputGroup>
                  <Input
                    className="popup-recibidos"
                    onChange={handleporcentaje}
                    type="number"
                    min={0}
                    max={100}
                    value={
                      props.placadato[0].EsPesajeParcial === 1 || pesajeparcial === 1
                        ? 0
                        : porcentajer
                    }
                    disabled={
                      props.placadato[0].EsPesajeParcial === 1 ||
                      pesajeparcial === 1 ||
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
            <form>
                <input
                  type="checkbox"
                  onChange={useCheckbox}
                  checked={pesajeparcial === 1 || props.placadato[0].EsPesajeParcial === 1}
                  style={{ width: '12px', height: '12px' }}
                />
                <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
                <label type="text">&nbsp; Pesaje Parcial</label>
              </form>
            </Col>
          </Row>

          <Row className="popup-row">
            <Col></Col>
            <Col>
            </Col>
          </Row>
          <Row
            style={{
              color: 'red',
              position: 'absolute',
              marginTop: '-65px',
              marginLeft: '0px',
            }}
            className="warning"
          >
            <span style={{ color: 'red !important' }}>
              {(PorcentajeSum > 100 && pesajeparcial===0) ? 'El porcentaje no puede exceder el 100%' : null}
            </span>
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
          </Row>
          <Row className="popup-row">
            <Col>
              <Row className="popup-title">
                {/* <Col>Almacén</Col>
                <Col>
                  <Row>1</Row>
                </Col> */}
              </Row>
            </Col>
            <Col className="ajuste-subalmacen">
              <Row className="popup-title" style={{ marginLeft: '0px'}}>Subalmacén</Row>
              <SelectBox
                dataSource={subalmacenes !==0 && subalmacenes}
                value={subalmacenes.length===1 ? (subalmacenes[0].ClaSubAlmacenTraspaso):subalmacen}
                displayExpr={
                  props.NomMotivoEntrada === 9
                    ? 'NomSubAlmacenCompra'
                    : props.NomMotivoEntrada === 3
                    ? 'NomSubAlmacenTraspaso'
                    : 0
                }
                valueExpr={
                  props.NomMotivoEntrada === 9
                    ? 'ClaSubAlmacenCompra'
                    : props.NomMotivoEntrada === 3
                    ? 'ClaSubAlmacenTraspaso'
                    : 0
                }
                placeholder="Seleccionar Subalmacen.."
                onValueChanged={handlesubalmacen}
                noDataText="Selecciona Material"
                disabled={subalmacenes.length === 1}
              />
              <Row
                style={{
                  color: 'red',
                  position: 'absolute',
                  marginTop: '0px',
                  marginLeft: '0px',
                }}
                className="warning"
              >
                <span style={{ color: 'red !important' }}>
                  {idmaterialr > 1 && subalmacen === 0 ? 'Selecciona subalmacen' : null}
                </span>
              </Row>
            </Col>
          </Row>
        </Container>
        <div>
          <button
            style={{ marginRight: '30px' }}
            type="button"
            className="popup-button"
            onClick={
              (PorcentajeSum > 100 && pesajeparcial === 0) ||
              idmaterialr < 1 ||
              subalmacen < 1 ||
              ((kilosr === 0 || kilosr === '' || kilosr === '0') &&
                (cantidadr === 0 || cantidadr === '' || cantidadr === '0') &&
                (porcentajer === 0 || porcentajer === '' || porcentajer === '0') &&
                pesajeparcial === 0 &&
                Datosmaterial === 0)
                ? null
                :almacen !==0 ? handleSubmit :null
            }
          >
            GUARDAR
          </button>
          <button
            type="button"
            className="popup-button"
            onClick={() => props.setmodaladdOpen(false)}
          >
            &#9447; Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NuevoMaterial;
