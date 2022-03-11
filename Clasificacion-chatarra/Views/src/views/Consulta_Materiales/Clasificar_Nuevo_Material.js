import React, { useState, useEffect } from 'react';
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
import dryer from '../../assets/img/dryer.png';
import freezer from '../../assets/img/freezer.png';
import heater from '../../assets/img/heater.png';
import microwave from '../../assets/img/microwave.png';
import oven from '../../assets/img/oven.png';
import washer from '../../assets/img/washer.png';
import smfreezer from '../../assets/img/mini-freezer.png';
import mdfreezer from '../../assets/img/md-freezer.png';
import others from '../../assets/img/no-image.png';
import smbag from '../../assets/img/little-bag.png';
import bag from '../../assets/img/bag.png';
import contenedors from '../../assets/img/contenedor.png';
import { callApi, getSessionItem } from '../../utils/utils';
import { config } from '../../utils/config';

// imagenes de Contaminantes
import LlantaC from '../../assets/img/LlantaC.png';
import LlantaG from '../../assets/img/LlantaG.png';
import LlantaM from '../../assets/img/LlantaM.png';
import Tank from '../../assets/img/Tanque.png';
import Boya from '../../assets/img/boya.png';
import Cilinder from '../../assets/img/Cilindro.png';

const NuevoMaterial = (props) => {
  // Valores que leen cantidades de botes y electrodomésticos
  const [isNext, setIsNext] = useState(0);
  const [srefri, setsrefri] = useState(0);
  const [mrefri, setmrefri] = useState(0);
  const [refri, setrefri] = useState(0);
  const [lavadora, setlavadora] = useState(0);
  const [boiler, setboiler] = useState(0);
  const [secadora, setsecadora] = useState(0);
  const [estufa, setestufa] = useState(0);
  const [microondas, setmicroondas] = useState(0);
  const [otros, setotros] = useState(0);
  const [costal, setcostal] = useState(0);
  const [saco, setsaco] = useState(0);
  const [Todos, setTodos] = useState(0);
  // Valores dinámicos locales al editar material
  const [Datosmaterial, setDatosmaterial] = useState(0);
  const [contenedor, setcontenedor] = useState(0);
  const [cantidade, setcantidade] = useState(0);
  const [cantidadr, setcantidadr] = useState(0);
  const [kilose, setkilose] = useState(0);
  const [kilosr, setkilosr] = useState(0);
  const [porcentajer, setporcentajer] = useState(pesajeparcial === 1 ? 0 : 0);
  const [observaciones, setobservaciones] = useState('');
  const [pesajeparcial, setpesajeparcial] = useState(
    props.placadato[0].EsPesajeParcial === 1 ? props.placadato[0].EsPesajeParcial : 0);
  const ipadress = getSessionItem('Ipaddress');
  const NumbUsuario = getSessionItem('NumUsuario');
  const Token = getSessionItem('Token');
  const [idmaterialr, setidmaterialr] = useState(0);
  const [nombrematerialr, setnombrematerialr] = useState(0);
  const [idmaterialviaje, setidmaterialviaje] = useState(0);
  const [cantremisionada, setcantremisionada] = useState(null);
  const [pesoremisionado, setpesoremisionado] = useState(null);
  const [unidadRemisionado, setunidadRemisionado] = useState(null)
  const [nombrematerialviaje, setnombrematerialviaje] = useState(0);
  const [almacen, setalmacen] = useState(0)
  const [subalmacen, setsubalmacen] = useState(0);
  const [nomsubalmacen, setnomsubalmacen] = useState('');
  const [subalmacenes, setsubalmacenes] = useState(0);
  const [kiloscont, setkiloscont] = useState(0);
  const [razoncont, setrazoncont] = useState(0);
  const [electrobots, setelectrobots] = useState('0|0|0|0|0|0|0|0|0|0|0|0|')
  const [electrobots2, setelectrobots2] = useState('0|0|0|0|0|0|0|0|0|0|0|0|')
  const [idFabricacion, setidFabricacion] = useState(0)
  const [IdFabricacionDet, setIdfabricacionDet] = useState(0)
  const [Referencia, setReferencia] = useState(0);
  const [ClaTransportista, setClaTransportista] = useState(props.placadato[0].ClaTransportista);
  const [NomTransportista, setNomTransportista] = useState(props.placadato[0].NomTransportista);
  const PorcentajeSum = props.row
    ? +props.row.reduce((acc, val) => acc + val.PorcentajeMaterial, 0) + +porcentajer
    : 0;
  const Electcheck = props.row ? props.row.some(material => material.idmaterialr === (config.idBote ||
    config.idElect)) ? 1:0:0;
  const ElectBotecheck = props.row ? props.row.some(material => (material.Bote >0 || material.ELECTRODOMESTICOS >0)) ? 1:0:0;
  const Materialescheck= props.row ? props.row.some(material=> (props.NomMotivoEntrada===9 ? (material.ClaArticuloCompra===config.idBote || material.ClaArticuloCompra===config.idElect):props.NomMotivoEntrada===3 && (material.ClaMaterialRecibeTraspaso===config.idBote || material.ClaMaterialRecibeTraspaso===config.idElect))) ? 1:0:0;
  // Arreglo valores Contaminantes
  const [Contaminantes, setContaminantes] = useState([
    [
      { nombre: 'Bollas', comentario: '50kgs', imagen: Boya, id: 1 },
      { nombre: 'Cilindro', comentario: '100kgs', imagen: Cilinder, id: 2 },
      {
        nombre: 'Tanque Estacionario',
        peso: '200',
        comentario: '200kgs',
        imagen: Tank,
        id: 3,
      },
    ],
    [
      { nombre: 'Llantas Chico', comentario: '25kgs', imagen: LlantaC, id: 4 },
      { nombre: 'Llantas Mediano', comentario: '50kgs', imagen: LlantaM, id: 5 },
      { nombre: 'Llantas grande', comentario: '100kgs', imagen: LlantaG, id: 6 },
    ],
  ]);
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
  // Valores dinámicos contaminantes
  const [Bollas, setBollas] = useState(0);
  const [Cilindro, setCilindro] = useState(0);
  const [Tanque, setTanque] = useState(0);
  const [LlantasChico, setLlantasChico] = useState(0);
  const [LlantasMediano, setLlantasMediano] = useState(0);
  const [LlantasGrande, setLlantasGrande] = useState(0);
  const [Bollas2, setBollas2] = useState(0);
  const [Cilindro2, setCilindro2] = useState(0);
  const [Tanque2, setTanque2] = useState(0);
  const [LlantasChico2, setLlantasChico2] = useState(0);
  const [LlantasMediano2, setLlantasMediano2] = useState(0);
  const [LlantasGrande2, setLlantasGrande2] = useState(0);
  const [Bollas3, setBollas3] = useState(0);
  const [Cilindro3, setCilindro3] = useState(0);
  const [Tanque3, setTanque3] = useState(0);
  const [LlantasChico3, setLlantasChico3] = useState(0);
  const [LlantasMediano3, setLlantasMediano3] = useState(0);
  const [LlantasGrande3, setLlantasGrande3] = useState(0);
  const Llantas = +LlantasChico * +25 + +LlantasMediano * +50 + +LlantasGrande * +100;
  const Tanques = +Tanque * +200 +Cilindro * +100 + +Bollas * +50 ;
  const Otros =  + kiloscont;
  const Totales = +Llantas +Tanques ;
  const ContTotal= +Bollas*+50 + +Cilindro*+100 + +Tanque*+200 + +LlantasChico*+25 + +LlantasMediano*+50 + +LlantasGrande*+100 + +Bollas2*+50 + +Cilindro2*+100 + +Tanque2*+200 + +LlantasChico2*+25 + +LlantasMediano2*+50 + +LlantasGrande2*+100 + +Bollas3*+50 + +Cilindro3*+100 + +Tanque3*+200 + +LlantasChico3*+25 + +LlantasMediano3*+50 + +LlantasGrande3*+100 ;
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

  const handleTodos = (event) => {
    setTodos(event.target.checked ? 1 : 0)
  };

  // Función que corre servicios antes del render cada que haya un cambio de material
  // Servicio JSON 6 --> SP= AmpSch.AmpClaArticuloDatosSel <Consultar datos Material>
  // Servicio JSON 7 --> SP= AmpSch.AmpClaSubAlmacenArticuloCmb <Consultar listado Subalmacenes>

  useEffect(() => {

  const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
  /* eslint-disable */
  if((props.row.length===1  || props.row.length===2) && props.row[0].ClaArticuloCompra>0 ){
  const data481 = {
    parameters:
      '{"ClaUbicacion":' +
      props.editBoxValue +
      ',"ClaServicioJson":' +
      48 +
      ',"Parametros":"@pnClaUbicacion=' +
      props.editBoxValue +
      ''+config.Separador+'@pnIdBoleta=' +
        props.placadato[0].IdBoleta +
      ''+config.Separador+'@pnClaArticuloCompra=' +
      (props.NomMotivoEntrada===9 ? props.row[0].ClaArticuloCompra : props.NomMotivoEntrada===3 && props.row[0].ClaMaterialRecibeTraspaso)+
      '"}',
    tipoEstructura: 0,
  };
  /* eslint-enable */
  callApi(urlKrakenService, 'POST', data481, (res) => {
    setBollas2(res.Result0.length ? (res.Result0[0].Cantidad !==null ? res.Result0[0].Cantidad : 0) : 0)
    setCilindro2(res.Result0.length ? (res.Result0[1].Cantidad !==null ? res.Result0[1].Cantidad : 0) : 0)
    setTanque2(res.Result0.length ? (res.Result0[2].Cantidad !==null ? res.Result0[2].Cantidad : 0) : 0)
    setLlantasChico2(res.Result0.length ? (res.Result0[3].Cantidad !==null ? res.Result0[3].Cantidad : 0) : 0)
    setLlantasMediano2(res.Result0.length ? (res.Result0[4].Cantidad !==null ? res.Result0[4].Cantidad : 0) : 0)
    setLlantasGrande2(res.Result0.length ? (res.Result0[5].Cantidad !==null ? res.Result0[5].Cantidad : 0) : 0)
  })}

  if(props.row.length===2 && props.row[1].ClaArticuloCompra>0){
    /* eslint-disable */
  const data482 = {
    parameters:
      '{"ClaUbicacion":' +
      props.editBoxValue +
      ',"ClaServicioJson":' +
      48 +
      ',"Parametros":"@pnClaUbicacion=' +
      props.editBoxValue +
      ''+config.Separador+'@pnIdBoleta=' +
        props.placadato[0].IdBoleta +
      ''+config.Separador+'@pnClaArticuloCompra=' +
      (props.NomMotivoEntrada===9 ? props.row[1].ClaArticuloCompra : props.NomMotivoEntrada===3 && props.row[1].ClaMaterialRecibeTraspaso) +
      '"}',
    tipoEstructura: 0,
  };
  /* eslint-enable */
  callApi(urlKrakenService, 'POST', data482, (res) => {
    setBollas3(res.Result0.length ? (res.Result0[0].Cantidad !==null ? res.Result0[0].Cantidad : 0) : 0)
    setCilindro3(res.Result0.length ? (res.Result0[1].Cantidad !==null ? res.Result0[1].Cantidad : 0) : 0)
    setTanque3(res.Result0.length ? (res.Result0[2].Cantidad !==null ? res.Result0[2].Cantidad : 0) : 0)
    setLlantasChico3(res.Result0.length ? (res.Result0[3].Cantidad !==null ? res.Result0[3].Cantidad : 0) : 0)
    setLlantasMediano3(res.Result0.length ? (res.Result0[4].Cantidad !==null ? res.Result0[4].Cantidad : 0) : 0)
    setLlantasGrande3(res.Result0.length ? (res.Result0[5].Cantidad !==null ? res.Result0[5].Cantidad : 0) : 0)
  })
}}, [])

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
    if(props.NomMotivoEntrada===9){
    if (idmaterialr > 0) {
      callApi(urlKrakenService, 'POST', data6, (res) => {
        setDatosmaterial(res.Result0);
      });

      callApi(urlKrakenService, 'POST', data7, (res) => {
        setsubalmacenes(res.Result0);
      });
    }
  }
  if(props.NomMotivoEntrada===3){
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
    const data8 = {
      parameters:
        '{"ClaUbicacion":' +
        props.editBoxValue +
        ',"ClaServicioJson":8,"Parametros":"@pnClaUbicacion=' +
        props.editBoxValue +
        ''+config.Separador+'@pnClaArticuloCompra=' +
        idmaterialr +
        ''+config.Separador+'@pnClaSubAlmacenCompra=' +
        subalmacen +
        ''+config.Separador+'@psNomSubAlmacenCompra=' +
        (nomsubalmacen && nomsubalmacen.includes('"') ? '':nomsubalmacen)+
        ''+config.Separador+'@pnIdBoleta=' +
        props.placadato[0].IdBoleta +
        '"}',
      tipoEstructura: 0,
    };

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
        ''+config.Separador+'@psNomSubAlmacenTraspaso=' +
        (nomsubalmacen && nomsubalmacen.includes('"') ? '':nomsubalmacen)+
        ''+config.Separador+'@pnIdBoleta=' +
        props.placadato[0].IdBoleta +
        '"}',
      tipoEstructura: 0,
    };
    /* eslint-enable */
    if (subalmacen > 0 && nomsubalmacen) {
      if(props.NomMotivoEntrada===9){
        callApi(urlKrakenService, 'POST', data8, (res) => {
          setReferencia(res.Result0[0].ClaReferenciaCompra);
          setalmacen(res.Result0[0].ClaAlmacen);
        });
      }
        else if(props.NomMotivoEntrada===3){
        callApi(urlKrakenService, 'POST', data33, (res) => {
          setReferencia(res.Result0[0].ClaReferenciaTraspaso);
          setalmacen(res.Result0[0].ClaAlmacen);
        });
      }
    }
  }, [nomsubalmacen, subalmacen, subalmacenes]);

  // Función que pone valor determinado de subalmacén si es único

  useEffect(() => {
    if (subalmacenes.length === 1) {
      if(props.NomMotivoEntrada===9){
      setsubalmacen(subalmacenes[0].ClaSubAlmacenCompra);
      setnomsubalmacen(subalmacenes[0].NomSubAlmacenCompra);
    }
    else if(props.NomMotivoEntrada===3){
      setsubalmacen(subalmacenes[0].ClaSubAlmacenTraspaso);
      setnomsubalmacen(subalmacenes[0].NomSubAlmacenTraspaso);
    }
  }
  }, [subalmacenes]);

  useEffect(() => {
    const urlKrakenVal = `${config.KrakenService}/${24}/${config.Servicio}`;
     /* eslint-disable */
     if(props.NomMotivoEntrada===3 && props.Materialviaje && props.placadato && idmaterialviaje !==0){
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
        '' + ((props.placadato[0].IdFabDefault !== null) ? (''+config.Separador+'@pnClaFabricacionViaje='+props.placadato[0].IdFabDefault+'') : '') +
        // '@pnClaFabricacionViaje=' +
        // idFabricacion+
        '"}',
      tipoEstructura: 0,
    };
     /* eslint-enable */

      callApi(urlKrakenVal, 'POST', data49, (res) => {
        console.log(res.Result0,'hola')
        setIdfabricacionDet(res.Result0[0].IdFabricacionDet)
        setcantremisionada(res.Result0[0].CantRemisionada)
        setpesoremisionado(res.Result0[0].PesoRemisionado)
        setunidadRemisionado(res.Result0[0].NomUnidadRemisionado)
      })
    }
  }, [idmaterialviaje])

  // Función para cambio de material en el wizard
  const onValueChangedr = (e) => {
    setidmaterialr(e.value);
    setsubalmacen(0);
    setalmacen(0)
    setnombrematerialr(e.component.option('text').split('-').pop());
  };

  const onValueChangede = (e) => {
    props.setidmaterialviaje(e.value);
    setidmaterialviaje(e.value)
    setnombrematerialviaje(e.component.option('text').split('-').pop());
    setidFabricacion(e.component.option("selectedItem").idFabricacion)
  };

  const onValueChangedes = (e) => {
    props.setidmaterialviaje(e.component.option("selectedItem").ClaArticuloRemisionado);
    setidmaterialviaje(e.component.option("selectedItem").ClaArticuloRemisionado)
    setnombrematerialviaje(e.component.option('text').split('-').pop());
    setidFabricacion(e.value)
  };

  // Operaciones para obtener los kilos de botes/electrodomésticos

  const electrodomestico =
    50 * srefri +
    100 * mrefri +
    150 * refri +
    50 * lavadora +
    100 * boiler +
    50 * secadora +
    50 * estufa +
    20 * microondas +
    50 * otros;
  const botes = (25 * costal) + (250 * saco) + (150 * contenedor);

  const kilosbotes = botes + electrodomestico;

  // Funciones para obtener las cantidades/opciones individuales que el usuario ingrese

  const handlecantidadr = (event) => {
    setcantidadr(event.target.value);
  };

  const handlerazoncont = (event) => {
    setrazoncont(event.value);
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

  const handleMensaje= () => {
    swal('Error', ('Almacen y/o Referencia se está mandando como nulo. Favor de revisar con encargado de Aplicación Web'), 'error', {
      buttons: {
        confirm: {
          text: 'Aceptar',
          className: 'animation-on-hover btn btn-success',
        },
      },
    });
   }

   if(ElectBotecheck===1 && ((idmaterialr===config.idBote) || (idmaterialr===config.idElect))) {
    swal('warning', ('No es posible seleccionar electrodoméstico/bote como material a clasificar porque ya fue declarado en alguno de los materiales previamente clasificado.'), 'warning', {
      buttons: {
        confirm: {
          text: 'Aceptar',
          className: 'animation-on-hover btn btn-success',
        },
      },
    });
    setidmaterialr(0)
    setnombrematerialr('')
   }

  const handlesubalmacen = (event) => {
    setsubalmacen(event.value);
    setnomsubalmacen(event.component.option('text'));
  };

  // Funciones para sumar/restar las cantidades de botes/electrodomésticos con límite de 50 piezas

  const handleSum1 = () => {
    if (srefri < 50 ) {
      setsrefri(srefri + 1);
    }
  };

  const handleSum2 = () => {
    if (mrefri < 50 ) {
      setmrefri(mrefri + 1);
    }
  };
  const handleSum3 = () => {
    if (refri < 50 ) {
      setrefri(refri + 1);
    }
  };
  const handleSum4 = () => {
    if (lavadora < 50 ) {
      setlavadora(lavadora + 1);
    }
  };
  const handleSum5 = () => {
    if (boiler < 50 ) {
      setboiler(boiler + 1);
    }
  };
  const handleSum6 = () => {
    if (secadora < 50 ) {
      setsecadora(secadora + 1);
    }
  };
  const handleSum7 = () => {
    if (estufa < 50 ) {
      setestufa(estufa + 1);
    }
  };
  const handleSum8 = () => {
    if (microondas < 50 ) {
      setmicroondas(microondas + 1);
    }
  };
  const handleSum9 = () => {
    if (otros < 50) {
      setotros(otros + 1);
    }
  };
  const handleSum10 = () => {
    if (costal < 50 ) {
      setcostal(costal + 1);
    }
  };
  const handleSum11 = () => {
    if (saco < 50 ) {
      setsaco(saco + 1);
    }
  };
  const handleSum12 = () => {
    if (contenedor < 50) {
      setcontenedor(contenedor + 1);
    }
  };

  const handleRest1 = () => {
    if (srefri > 0 ) {
      setsrefri(srefri - 1);
    }
  };
  const handleRest2 = () => {
    if (mrefri > 0 ) {
      setmrefri(mrefri - 1);
    }
  };
  const handleRest3 = () => {
    if (refri > 0) {
      setrefri(refri - 1);
    }
  };
  const handleRest4 = () => {
    if (lavadora > 0 ) {
      setlavadora(lavadora - 1);
    }
  };
  const handleRest5 = () => {
    if (boiler > 0 ) {
      setboiler(boiler - 1);
    }
  };
  const handleRest6 = () => {
    if (secadora > 0 ) {
      setsecadora(secadora - 1);
    }
  };
  const handleRest7 = () => {
    if (estufa > 0 ) {
      setestufa(estufa - 1);
    }
  };
  const handleRest8 = () => {
    if (microondas > 0) {
      setmicroondas(microondas - 1);
    }
  };
  const handleRest9 = () => {
    if (otros > 0 ) {
      setotros(otros - 1);
    }
  };
  const handleRest10 = () => {
    if (costal > 0 ) {
      setcostal(costal - 1);
    }
  };
  const handleRest11 = () => {
    if (saco > 0 ) {
      setsaco(saco - 1);
    }
  };
  const handleRest12 = () => {
    if (contenedor > 0 ) {
      setcontenedor(contenedor - 1);
    }
  };

  const togglePopup0 = () => {
    setIsNext(0);
  };

  const togglePopup1 = () => {
    setIsNext(1);
  };

  const togglePopup2 = () => {
    setIsNext(2);
  };

  const closebote = () => {
    setidmaterialr(0);
  };

  const safebote = () => {
    setkilosr(kilosbotes);
    setcantidadr(kilosbotes);
    setidmaterialr(0);
    setIsNext(1);
  };

  // Función para cambiar del paso 1 (Clasificación de Material) & paso 2 (Contaminación)

  const handleBack = () => {
    // props.setpoppesaje(true);
    props.setmodaladdOpen(false);
  };

  useEffect(() => {
    props.NomMotivoEntrada===9 && props.row && props.row.forEach(electros => {

  const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    /* eslint-disable */
    const data70 = {
      parameters:
        '{"ClaUbicacion":' +
        props.editBoxValue +
        ',"ClaServicioJson":' +
        70 +
        ',"Parametros":"@pnClaUbicacion=' +
        props.editBoxValue +
        ''+config.Separador+'@pnIdBoleta=' +
          props.placadato[0].IdBoleta +
        // ',@pnClaArticuloCompra=' +
        // (props.NomMotivoEntrada===9 ? props.ro.ClaArticuloCompra : props.NomMotivoEntrada===3 && props.ro.ClaMaterialRecibeTraspaso)+
        '"}',
      tipoEstructura: 0,
    };
    /* eslint-enable */
    
    callApi(urlKrakenService, 'POST', data70, (res) => {
      if(res.Result0.length>0){
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
      

      if(props.row.length===1 || props.row.length===2){
        setelectrobots((`${isrefri}|${imrefri}|${irefri}|${ilavadora}|${iboiler}|${isecadora}|${iestufa}|${imicroondas}|${iotros}|${icostal}|${isaco}|${icontenedor}|`).toString())
      }

      else if(props.row.length===2){
        setelectrobots2((`${isrefri}|${imrefri}|${irefri}|${ilavadora}|${iboiler}|${isecadora}|${iestufa}|${imicroondas}|${iotros}|${icostal}|${isaco}|${icontenedor}|`).toString())
      }
    }
    })
  })
  }, [])

  // console.log(electrobots)
  // Función que guarda los cambios efectuados en el material
  // Servicio JSON 11 --> SP= BasSch.BasGuardarClasEntCompraMatPrimaProc <Guarda clasificación>
  // Servicio JSON 12 --> SP= BasSch.BasRegistraMaterialClasEntCompraMatPrimaProc <Registra material a clasificar>

  const handleSubmit = () => {
    // props.setpoppesaje(true);
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    const urlKrakenBloque = `${config.KrakenService}/${24}/${config.Bloque}`;
    /* eslint-disable */

    if(props.NomMotivoEntrada===9){
    const data11 = 
       [ `@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@psObservaciones='${(props.placadato[0].Observaciones ? props.placadato[0].Observaciones.replace('#', '%23'): '')}'${config.Separador}@pnEsRevisionEfectuada=${props.placadato[0].EsRevisionEfectuada}${config.Separador}@pnClaTipoClasificacion=${props.placadato[0].ClaTipoClasificacion}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@psOrigen='WEB'`];

    const data12 = 
        [`@@TransactionSAMP:@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaArticuloCompra=${idmaterialr}${config.Separador} @pnCantidadMaterial=${((kilosr > 0 ? kilosr /(Datosmaterial!==0 ? Datosmaterial[0].PesoTeoricoKgs : 1) : ((cantidadr === '' || cantidadr === null ) ? 0 : cantidadr )))}${config.Separador}@pnKilosMaterial=${((cantidadr > 0 ? cantidadr * (Datosmaterial!==0 ? Datosmaterial[0].PesoTeoricoKgs:1) : (kilosr === '' ? 0 : kilosr)))}${config.Separador} @pnKilosReales=0${config.Separador}@pnKilosContaminados=${(+Totales + +kiloscont)}${config.Separador}@pnKilosDocumentados=0${config.Separador}@pnPorcentajeMaterial=${(porcentajer ==='' ? 0 : pesajeparcial===1 ? 0 : porcentajer)}${config.Separador}@pnEsPesajeParcial=${pesajeparcial}${config.Separador}@pnClaAlmacen=${almacen}${config.Separador}@pnClaSubAlmacenCompra=${subalmacen}${config.Separador}@pnClaMotivoContaminacion=${(Totales>0 && kiloscont<1 ? 6 : razoncont)}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@pnClaProveedor=${props.placadato[0].ClaProveedor}${config.Separador}@pnIdListaPrecio=${props.placadato[0].IdListaPrecio}${config.Separador}@pnClaTipoOrdenCompra=''${config.Separador}@pnClaOrdenCompra=''${config.Separador}@pnClaUbicacionProveedor=${props.placadato[0].ClaUbicacionProveedor}${config.Separador}@psClaReferenciaCompra='${Referencia}'${config.Separador}@psClaContaminantes='1|2|3|4|5|6|'${config.Separador}@psValorContaminantes='${Bollas}|${Cilindro}|${Tanque}|${LlantasChico}|${LlantasMediano}|${LlantasGrande}|'${config.Separador}@psClaArtSupTipo='1|2|3|4|5|6|7|8|9|10|11|12|'${config.Separador}@psValorArtSupTipo='${srefri}|${mrefri}|${refri}|${lavadora}|${boiler}|${secadora}|${estufa}|${microondas}|${otros}|${costal}|${saco}|${contenedor}|'${config.Separador}@pnIdRenglon=${(props.row.length + 1)}${config.Separador}@pnKilosElectrodomesticos=${(electrodomestico)}${config.Separador}@pnKilosBote=${(botes)}${config.Separador}@pnObservaciones='${(observaciones)}'${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]

    const data13 =
    [`@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaTipoClasificacion=1${config.Separador}@pnClaUbicacionProveedor=${props.placadato[0].ClaUbicacionProveedor}${config.Separador}@pnClaOrdenCompra=''${config.Separador}@pnClaTipoOrdenCompra=''${config.Separador}@pnIdListaPrecio=${props.placadato[0].IdListaPrecio}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@pnEsPesajeParcial=${pesajeparcial}`]
  
    const data12g= props.row && props.row.map((element,index)=>{
      if(element.ClaArticuloCompra){
        if(props.TipoPatio ===4 && index<2){
      const data = [`@@TransactionSAMP:@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaArticuloPreReg=${element.ClaArticuloPreReg ? element.ClaArticuloPreReg: 0}${config.Separador}@pnClaArticuloCompra=${element.ClaArticuloCompra}${config.Separador}@pnCantidadMaterial=${(element.CantidadMaterial)}${config.Separador}@pnKilosMaterial=${element.KilosMaterial}${config.Separador} @pnKilosReales=${(element.KilosReales)}${config.Separador}@pnKilosContaminados=${element.KilosContaminados}${config.Separador}@pnKilosDocumentados=${(element.KilosDocumentados)}${config.Separador}@pnPorcentajeMaterial=${(element.PorcentajeMaterial)}${config.Separador}@pnEsPesajeParcial=${(element.EsPesajeParcial)}${config.Separador}@pnClaAlmacen=${element.ClaAlmacen}${config.Separador}@pnClaSubAlmacenCompra=${element.ClaSubAlmacenCompra}${config.Separador}@pnClaMotivoContaminacion=${element.ClaMotivoContaminacion ? element.ClaMotivoContaminacion : 0}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@pnClaProveedor=${props.placadato[0].ClaProveedor}${config.Separador}@pnIdListaPrecio=${props.placadato[0].IdListaPrecio}${config.Separador}@pnClaTipoOrdenCompra=''${config.Separador}@pnClaOrdenCompra=''${config.Separador}@pnClaUbicacionProveedor=${props.placadato[0].ClaUbicacionProveedor}${config.Separador}@psClaReferenciaCompra='${element.ClaReferenciaCompra}'${config.Separador}@psClaArtSupTipo='1|2|3|4|5|6|7|8|9|10|11|12|'${config.Separador}@psValorArtSupTipo='${((index + 1) === 1 ? electrobots: electrobots2)}'${config.Separador}@pnIdRenglon=${(element.IdRenglon)}${config.Separador}@pnKilosElectrodomesticos=${(element.KilosElectrodomesticos ? element.KilosElectrodomesticos : 0)}${config.Separador}@pnKilosBote=${(element.KilosBote ? element.KilosBote : 0)}${config.Separador}@pnObservaciones='${(element.Observaciones)}'${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]
  
        return data
        }
        if(props.TipoPatio ===9 && index<14){
      const data = [`@@TransactionSAMP:@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaArticuloPreReg=${element.ClaArticuloPreReg ? element.ClaArticuloPreReg: 0}${config.Separador}@pnClaArticuloCompra=${element.ClaArticuloCompra}${config.Separador}@pnCantidadMaterial=${(element.CantidadMaterial)}${config.Separador}@pnKilosMaterial=${element.KilosMaterial}${config.Separador} @pnKilosReales=${(element.KilosReales)}${config.Separador}@pnKilosContaminados=${element.KilosContaminados}${config.Separador}@pnKilosDocumentados=${(element.KilosDocumentados)}${config.Separador}@pnPorcentajeMaterial=${(element.PorcentajeMaterial)}${config.Separador}@pnEsPesajeParcial=${(element.EsPesajeParcial)}${config.Separador}@pnClaAlmacen=${element.ClaAlmacen}${config.Separador}@pnClaSubAlmacenCompra=${element.ClaSubAlmacenCompra}${config.Separador}@pnClaMotivoContaminacion=${element.ClaMotivoContaminacion ? element.ClaMotivoContaminacion : 0}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@pnClaProveedor=${props.placadato[0].ClaProveedor}${config.Separador}@pnIdListaPrecio=${props.placadato[0].IdListaPrecio}${config.Separador}@pnClaTipoOrdenCompra=''${config.Separador}@pnClaOrdenCompra=''${config.Separador}@pnClaUbicacionProveedor=${props.placadato[0].ClaUbicacionProveedor}${config.Separador}@psClaReferenciaCompra='${element.ClaReferenciaCompra}'${config.Separador}@psClaArtSupTipo='1|2|3|4|5|6|7|8|9|10|11|12|'${config.Separador}@psValorArtSupTipo='${((index + 1) === 1 ? electrobots: electrobots2)}'${config.Separador}@pnIdRenglon=${(element.IdRenglon)}${config.Separador}@pnKilosElectrodomesticos=${(element.KilosElectrodomesticos ? element.KilosElectrodomesticos : 0)}${config.Separador}@pnKilosBote=${(element.KilosBote ? element.KilosBote : 0)}${config.Separador}@pnObservaciones='${(element.Observaciones)}'${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]
  
        return data 
        }
      }
      })
      const PorcentajeSum =props.row &&  props.row.reduce((acc, val) => acc + val.PorcentajeMaterial, 0) + +porcentajer;
      const CantidadSum=props.row &&  props.row.reduce((acc, val) => acc + val.CantidadMaterial, 0) + +cantidadr;

      const data83 ={ parameters: `{"ClaUbicacion":${props.editBoxValue},"Token":"${Token}","ClaServicioJson":"83","IdBoleta":"${props.placadato[0].IdBoleta}","EnBloque":"${1}","Encabezado":"${data11}","Detalle":"${data12}${data12g ? data12g.join("") : null}","Validacion":"${(((PorcentajeSum !== null && (PorcentajeSum === 100)) || (PorcentajeSum === 0 && CantidadSum>0) || (props.ValidaCargo===1 && props.row && props.row.length>0 && (props.row[0].CantidadMaterial !==null || props.row[0].KilosMaterial!==null || props.row[0].PorcentajeMaterial!==null)&& (PorcentajeSum !== null && PorcentajeSum === 100) || (PorcentajeSum === 0 && CantidadSum>0)))|| pesajeparcial===1) ? data13 : ''}"}`,
      tipoEstructura: 0}
    async function GuardaCompra(){
      console.log(data83)
      callApi(urlKrakenBloque, 'POST', data83, (res) => {
        res.Mensaje !== undefined &&
        swal('Error', (`${res.Mensaje}`), 'error', {
          buttons: {
            confirm: {
              text: 'Aceptar',
              className: 'animation-on-hover btn btn-success',
            },
          },
        });
        props.setcambioGuardar(1);
        props.setActualizar(true);
        setTimeout(() =>{
        props.setActualizar(false)
        }, 50);
      })
    }

    if(props.NomMotivoEntrada===9){
      GuardaCompra()
  }

    props.setpesajeparcial(pesajeparcial);
    props.setmodaladdOpen(false);
    props.setrow('');

    }



        else if (props.NomMotivoEntrada===3){
        const data36 = 
        [ `@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaViajeOrigen=${props.ClaViajeOrigen}${config.Separador}@pnClaUbicacionOrigen=${props.ClaUbicacionOrigen}${config.Separador}@pnClaTransporte=${props.placadato[0].ClaTransporte}${config.Separador}@pnClaTransportista=${ClaTransportista}${config.Separador}@psNomTransportista='${NomTransportista}'${config.Separador}@psNomChofer='${(props.placadato[0].NomChofer !== null ? props.placadato[0].NomChofer: 0)}'${config.Separador}@psPlacas='${props.placadato[0].Placas}'${config.Separador}@pnPesoDocumentado=${props.placadato[0].PesoDocumentado}${config.Separador}@psObservaciones='${(props.placadato[0].Observaciones ? props.placadato[0].Observaciones.replace('#', '%23'): '')}'${config.Separador}@pnEsRevisionEfectuada=${(props.placadato[0].EsRevisionEfectuada ? props.placadato[0].EsRevisionEfectuada : 0)}${config.Separador}@pnClaTipoClasificacion=${props.placadato[0].ClaTipoClasificacion}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@psOrigen='WEB'`];
 
        const data37 = 
        [ `@@TransactionSAMP:@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaViajeOrigen=${props.ClaViajeOrigen}${config.Separador}@pnClaUbicacionOrigen=${props.ClaUbicacionOrigen}${config.Separador}@pnIdRenglonRecepcion=${(props.row.length + 1)}${config.Separador}@pnIdFabricacion=${idFabricacion}${config.Separador}@pnIdFabricacionDet=${IdFabricacionDet}${config.Separador}@pnClaArticuloRemisionado=${(idmaterialviaje ? idmaterialviaje : 0)}${config.Separador}@pnCantRemisionada=${cantremisionada}${config.Separador}@pnClaMaterialRecibeTraspaso=${idmaterialr}${config.Separador}@pnCantRecibida=${((kilosr > 0 ? kilosr /(Datosmaterial!==0 ? Datosmaterial[0].PesoTeoricoRecibido : 1) : ((cantidadr === '' || cantidadr === null ) ? 0 : cantidadr )))}${config.Separador}@pnPesoRecibido=${((cantidadr > 0 ? cantidadr * (Datosmaterial!==0 ? Datosmaterial[0].PesoTeoricoRecibido:1) : (kilosr === '' ? 0 : kilosr)))}${config.Separador}@pnPorcentajeMaterial=${(porcentajer ==='' ? 0 : pesajeparcial===1 ? 100 : porcentajer)}${config.Separador}@pnPesoTaraRecibido=0${config.Separador}@pnClaAlmacen=${almacen}${config.Separador}@pnClaSubAlmacenTraspaso=${(subalmacen)}${config.Separador}@pnAccionSp=1${config.Separador}@pnClaSeccion=0${config.Separador}@psReferencia1=${Referencia}${config.Separador}@psReferencia2=0${config.Separador}@psReferencia3=0${config.Separador}@psReferencia4=0${config.Separador}@psReferencia5=0${config.Separador}@pnEsPesajeParcial=${pesajeparcial}${config.Separador}@pnKilosReales=0${config.Separador}@pnKilosContaminados=${((+kiloscont + +Totales))}${config.Separador}@pnClaMotivoContaminacion=${(Totales>0 && kiloscont<1 ? 6 : razoncont)}${config.Separador}@pnClaReferenciaTraspaso=${Referencia}${config.Separador}@psClaContaminantes='1|2|3|4|5|6|'${config.Separador}@psValorContaminantes='${Bollas}|${Cilindro}|${Tanque}|${LlantasChico}|${LlantasMediano}|${LlantasGrande}|'${config.Separador}@pnEsNoCargoDescargoMaterial=${props.placadato[0].EsNoCargoDescargoMaterial}${config.Separador}@pnObservaciones='${(observaciones)}'${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`];
 

        const data37g= props.row && props.row.map((element,index)=>{
          if(element.ClaMaterialRecibeTraspaso){
            if(props.TipoPatio ===4 && index<2){
          const data = [ `@@TransactionSAMP:@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaViajeOrigen=${props.ClaViajeOrigen}${config.Separador}@pnClaUbicacionOrigen=${props.ClaUbicacionOrigen}${config.Separador}@pnIdRenglonRecepcion=${(element.IdRenglonRecepcion ? element.IdRenglonRecepcion : '')}${config.Separador}@pnIdFabricacion=${(element.IdFabricacion ? element.IdFabricacion : 0)}${config.Separador}@pnIdFabricacionDet=${(element.IdFabricacionDet ? element.IdFabricacionDet : 0)}${config.Separador}@pnClaArticuloRemisionado=${(element.ClaArticuloRemisionado ? element.ClaArticuloRemisionado : 0)}${config.Separador}@pnCantRemisionada=${(element.CantRemisionada ? element.CantRemisionada : 0)}${config.Separador}@pnClaMaterialRecibeTraspaso=${element.ClaMaterialRecibeTraspaso}${config.Separador}@pnCantRecibida=${element.CantRecibida}${config.Separador}@pnPesoRecibido=${element.PesoRecibido}${config.Separador}@pnPorcentajeMaterial=${element.PorcentajeMaterial}${config.Separador}@pnPesoTaraRecibido=${(element.PesoTaraRecibido !== null ? element.PesoTaraRecibido : 0)}${config.Separador}@pnClaAlmacen=${(element.ClaAlmacen ? element.ClaAlmacen : 1)}${config.Separador}@pnClaSubAlmacenTraspaso=${(element.ClaSubAlmacenTraspaso)}${element.ClaSubSubAlmacen !== null   && element.ClaSubSubAlmacen !== 0 ? (config.Separador+'@pnClaSubSubAlmacen='+element.ClaSubSubAlmacen) : ''}${config.Separador}@pnClaSeccion=${(element.ClaSeccion !== null ? element.ClaSeccion : 0)}${config.Separador}@psReferencia1=${(element.Referencia1 !== null ? element.Referencia1 : 0)}${config.Separador}@psReferencia2=${(element.Referencia2 !== null ? element.Referencia2 : 0)}${config.Separador}@psReferencia3=${(element.Referencia3 !== null ? element.Referencia3 : 0)}${config.Separador}@psReferencia4=${(element.Referencia4 !== null ? element.Referencia4 : 0)}${config.Separador}@psReferencia5=${(element.Referencia5 !== null ? element.Referencia5 : 0)}${config.Separador}@pnEsPesajeParcial=${element.EsPesajeParcial}${config.Separador}@pnKilosReales=${(element.KilosReales ? element.KilosReales : 0)}${config.Separador}@pnKilosContaminados=${(element.KilosContaminados ? element.KilosContaminados : 0)}${config.Separador}@pnClaMotivoContaminacion=${(element.ClaMotivoContaminacion ? element.ClaMotivoContaminacion : 0)}${config.Separador}@pnClaReferenciaTraspaso=${element.ClaReferenciaTraspaso}${config.Separador}@psClaContaminantes='1|2|3|4|5|6|'${config.Separador}@psValorContaminantes='${Bollas2}|${Cilindro2}|${Tanque2}|${LlantasChico2}|${LlantasMediano2}|${LlantasGrande2}|'${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@pnObservaciones='${(element.observaciones)}'${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`];
 
            return data
            }
            if(props.TipoPatio ===9 && index<14){
          const data = [ `@@TransactionSAMP:@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaViajeOrigen=${props.ClaViajeOrigen}${config.Separador}@pnClaUbicacionOrigen=${props.ClaUbicacionOrigen}${config.Separador}@pnIdRenglonRecepcion=${(element.IdRenglonRecepcion ? element.IdRenglonRecepcion : '')}${config.Separador}@pnIdFabricacion=${(element.IdFabricacion ? element.IdFabricacion : 0)}${config.Separador}@pnIdFabricacionDet=${(element.IdFabricacionDet ? element.IdFabricacionDet : 0)}${config.Separador}@pnClaArticuloRemisionado=${(element.ClaArticuloRemisionado ? element.ClaArticuloRemisionado : 0)}${config.Separador}@pnCantRemisionada=${(element.CantRemisionada ? element.CantRemisionada : 0)}${config.Separador}@pnClaMaterialRecibeTraspaso=${element.ClaMaterialRecibeTraspaso}${config.Separador}@pnCantRecibida=${element.CantRecibida}${config.Separador}@pnPesoRecibido=${element.PesoRecibido}${config.Separador}@pnPorcentajeMaterial=${element.PorcentajeMaterial}${config.Separador}@pnPesoTaraRecibido=${(element.PesoTaraRecibido !== null ? element.PesoTaraRecibido : 0)}${config.Separador}@pnClaAlmacen=${(element.ClaAlmacen ? element.ClaAlmacen : 1)}${config.Separador}@pnClaSubAlmacenTraspaso=${(element.ClaSubAlmacenTraspaso)}${element.ClaSubSubAlmacen !== null  && element.ClaSubSubAlmacen !== 0  ? (config.Separador+'@pnClaSubSubAlmacen='+element.ClaSubSubAlmacen) : ''}${config.Separador}@pnClaSeccion=${(element.ClaSeccion !== null ? element.ClaSeccion : 0)}${config.Separador}@psReferencia1=${(element.Referencia1 !== null ? element.Referencia1 : 0)}${config.Separador}@psReferencia2=${(element.Referencia2 !== null ? element.Referencia2 : 0)}${config.Separador}@psReferencia3=${(element.Referencia3 !== null ? element.Referencia3 : 0)}${config.Separador}@psReferencia4=${(element.Referencia4 !== null ? element.Referencia4 : 0)}${config.Separador}@psReferencia5=${(element.Referencia5 !== null ? element.Referencia5 : 0)}${config.Separador}@pnEsPesajeParcial=${element.EsPesajeParcial}${config.Separador}@pnKilosReales=${(element.KilosReales ? element.KilosReales : 0)}${config.Separador}@pnKilosContaminados=${(element.KilosContaminados ? element.KilosContaminados : 0)}${config.Separador}@pnClaMotivoContaminacion=${(element.ClaMotivoContaminacion ? element.ClaMotivoContaminacion : 0)}${config.Separador}@pnClaReferenciaTraspaso=${element.ClaReferenciaTraspaso}${config.Separador}@psClaContaminantes='1|2|3|4|5|6|'${config.Separador}@psValorContaminantes='${Bollas2}|${Cilindro2}|${Tanque2}|${LlantasChico2}|${LlantasMediano2}|${LlantasGrande2}|'${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@pnObservaciones='${(element.observaciones)}'${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`];
 
            return data 
            }
          }
          })

          const data38 =
          [`@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaUbicacionOrigen=${props.ClaUbicacionOrigen}${config.Separador}@pnClaViajeOrigen=${props.ClaViajeOrigen}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]
        
          const PorcentajeSum =props.row &&  props.row.reduce((acc, val) => acc + val.PorcentajeMaterial, 0) + +porcentajer;
          const CantidadSum=props.row &&  props.row.reduce((acc, val) => acc + val.CantidadMaterial, 0) + +cantidadr;

          const data84 ={ parameters: `{"ClaUbicacion":${props.editBoxValue},"Token":"${Token}","ClaServicioJson":"84","IdBoleta":"${props.placadato[0].IdBoleta}","EnBloque":"${1}","Encabezado":"${data36}","Detalle":"${data37}${data37g ? data37g.join("") : ''}","Validacion":"${(((PorcentajeSum !== null && (PorcentajeSum === 100)) || (PorcentajeSum === 0 && CantidadSum>0) || (props.ValidaCargo===1 && props.row && props.row.length>0 && (props.row[0].CantidadMaterial !==null || props.row[0].KilosMaterial!==null || props.row[0].PorcentajeMaterial!==null)&& (PorcentajeSum !== null && PorcentajeSum === 100) || (PorcentajeSum === 0 && CantidadSum>0)))|| pesajeparcial===1) ? data38 : ''}"}`,
        tipoEstructura: 0}


        async function FuncionData()  {
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
                  props.setcambioGuardar(1);
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
    }
    // usage
    /* eslint-enable */
};


  // Componente de botes y electrodomésticos para el respectivo material
  function Contelements({ contaminante }) {
    const [valor, setvalor] = useState(0);
    const Kilos = valor * contaminante.peso;

    const handlesum = (event) => {
      event.preventDefault();
      if (contaminante.id === 4) {
        if (LlantasChico < 50) {
          setLlantasChico(LlantasChico + 1);
        }
      } else if (contaminante.id === 1) {
        if (Bollas < 50) {
          setBollas(Bollas + 1);
        }
      } else if (contaminante.id === 2) {
        if (Cilindro < 50) {
          setCilindro(Cilindro + 1);
        }
      } else if (contaminante.id === 3) {
        if (Tanque < 50) {
          setTanque(Tanque + 1);
        }
      } else if (contaminante.id === 5) {
        if (LlantasMediano < 50) {
          setLlantasMediano(LlantasMediano + 1);
        }
      } else if (contaminante.id === 6) {
        if (LlantasGrande < 50) {
          setLlantasGrande(LlantasGrande + 1);
        }
      }
    };

    const handleChange = (event) => {
      if (event.target.value === '') {
        if (contaminante.id === 4) {
          setLlantasChico(0);
        } else if (contaminante.id === 1) {
          setBollas(0);
        } else if (contaminante.id === 2) {
          setCilindro(0);
        } else if (contaminante.id === 3) {
          setTanque(0);
        } else if (contaminante.id === 5) {
          setLlantasMediano(0);
        } else if (contaminante.id === 6) {
          setLlantasGrande(0);
        }
      } else if (event.target.value.length > 2) {
        if (contaminante.id === 4) {
          setLlantasChico(event.target.value.slice(0, 2));
        } else if (contaminante.id === 1) {
          setBollas(event.target.value.slice(0, 2));
        } else if (contaminante.id === 2) {
          setCilindro(event.target.value.slice(0, 2));
        } else if (contaminante.id === 3) {
          setTanque(event.target.value.slice(0, 2));
        } else if (contaminante.id === 5) {
          setLlantasMediano(event.target.value.slice(0, 2));
        } else if (contaminante.id === 6) {
          setLlantasGrande(event.target.value.slice(0, 2));
        }
      } else if (event.target.value !== '') {
        if (contaminante.id === 4) {
          setLlantasChico(event.target.value);
        } else if (contaminante.id === 1) {
          setBollas(event.target.value);
        } else if (contaminante.id === 2) {
          setCilindro(event.target.value);
        } else if (contaminante.id === 3) {
          setTanque(event.target.value);
        } else if (contaminante.id === 5) {
          setLlantasMediano(event.target.value);
        } else if (contaminante.id === 6) {
          setLlantasGrande(event.target.value);
        }
      }
    };

    const handlerest = (event) => {
      event.preventDefault();
      if (contaminante.id === 4) {
        if (LlantasChico > 0) {
          setLlantasChico(LlantasChico - 1);
        }
      } else if (contaminante.id === 1) {
        if (Bollas > 0) {
          setBollas(Bollas - 1);
        }
      } else if (contaminante.id === 2) {
        if (Cilindro > 0) {
          setCilindro(Cilindro - 1);
        }
      } else if (contaminante.id === 3) {
        if (Tanque > 0) {
          setTanque(Tanque - 1);
        }
      } else if (contaminante.id === 5) {
        if (LlantasMediano > 0) {
          setLlantasMediano(LlantasMediano - 1);
        }
      } else if (contaminante.id === 6) {
        if (LlantasGrande > 0) {
          setLlantasGrande(LlantasGrande - 1);
        }
      }
    };
    return (
      <div key={contaminante.id}>
        <Col>
          <div className="popup-column">
            <div>
              <img src={contaminante.imagen} alt="dryer" className="popup-image" />
              <span className="popups-kgs">{contaminante.comentario}</span>
            </div>
            <div className="popup-bote">{contaminante.nombre}</div>
            <div>
              <button type="button" className="popup-adder sum" onClick={handlesum}>
                +
              </button>
              <button type="button" className="popup-adder rest" onClick={handlerest}>
                -
              </button>
              <input
                value={
                  contaminante.id === 4
                    ? LlantasChico === 0
                      ? ''
                      : LlantasChico
                    : contaminante.id === 1
                    ? Bollas === 0
                      ? ''
                      : Bollas
                    : contaminante.id === 2
                    ? Cilindro === 0
                      ? ''
                      : Cilindro
                    : contaminante.id === 3
                    ? Tanque === 0
                      ? ''
                      : Tanque
                    : contaminante.id === 5
                    ? LlantasMediano === 0
                      ? ''
                      : LlantasMediano
                    : LlantasGrande === 0
                    ? ''
                    : LlantasGrande
                }
                className="popup-number"
                onChange={handleChange}
                type="number"
              />
            </div>
          </div>
        </Col>
      </div>
    );
  }

  function Botes() {
    return (
      <div className="boxbot">
        <span className="close-icon" onClick={handleBack}>
          x
        </span>
        <CardHeader>
          Clasificación
          <div className="bote-elect">
            <Row>
              <Col>Electrodoméstico:</Col>
              <Col>{electrodomestico.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Kg</Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>Bote:</Col>
              <Col>{botes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Kg</Col>
              <Col></Col>
            </Row>
          </div>
        </CardHeader>
        <Container fluid={true}>
          <Row className="popup-row">
            <Col>
              <div className="popup-column">
                <div>
                  <img src={smfreezer} alt="dryer" className="popup-image" />
                  <span className="popups-kgs">50kgs</span>
                </div>
                <div className="popup-bote">
                  Refrigerador
                  <br />
                  Chico
                </div>
                <div>
                  <button type="button" className="popup-adder sum" onClick={handleSum1}>
                    +
                  </button>
                  <button onClick={handleRest1} type="button" className="popup-adder rest">
                    -
                  </button>
                  <input
                    value={srefri === 0 ? '' : srefri}
                    defaultValue=""
                    className="popup-number"
                    onChange={(e)=> setsrefri(e.target.value)}
                  />
                </div>
              </div>
            </Col>
            <Col>
              <div className="popup-column">
                <div>
                  <img src={mdfreezer} alt="dryer" className="popup-image" />
                  <span className="popups-kgs">100kgs</span>
                </div>
                <div className="popup-bote">
                  Refrigerador <br />
                  Mediano
                </div>
                <div>
                  <button type="button" className="popup-adder sum" onClick={handleSum2}>
                    +
                  </button>
                  <button onClick={handleRest2} type="button" className="popup-adder rest">
                    -
                  </button>
                  <input
                    value={mrefri === 0 ? '' : mrefri}
                    defaultValue=""
                    className="popup-number"
                    onChange={(e)=> setmrefri(e.target.value)}
                  />
                </div>
              </div>
            </Col>
            <Col>
              <div className="popup-column">
                <div>
                  <img src={freezer} alt="dryer" className="popup-image" />
                  <span className="popups-kgs">150kgs</span>
                </div>
                <div className="popup-bote">
                  Refrigerador <br /> Grande
                </div>
                <div>
                  <button type="button" className="popup-adder sum" onClick={handleSum3}>
                    +
                  </button>
                  <button onClick={handleRest3} type="button" className="popup-adder rest">
                    -
                  </button>
                  <input
                    value={refri === 0 ? '' : refri}
                    defaultValue=""
                    className="popup-number"
                    onChange={(e)=> setrefri(e.target.value)}
                  />
                </div>
              </div>
            </Col>
            <Col>
              <div className="popup-column">
                <div>
                  <img src={washer} alt="dryer" className="popup-image" />
                  <span className="popups-kgs">50kgs</span>
                </div>
                <div className="popup-bote">Lavadora</div>
                <div>
                  <button type="button" className="popup-adder sum" onClick={handleSum4}>
                    +
                  </button>
                  <button onClick={handleRest4} type="button" className="popup-adder rest">
                    -
                  </button>
                  <input
                    value={lavadora === 0 ? '' : lavadora}
                    defaultValue=""
                    className="popup-number"
                    onChange={(e)=> setlavadora(e.target.value)}
                  />
                </div>
              </div>
            </Col>
          </Row>

          <Row className="popup-row">
            <Col>
              <div className="popup-column">
                <div>
                  <img src={heater} alt="dryer" className="popup-image" />
                  <span className="popups-kgs">100kgs</span>
                </div>
                <div className="popup-bote">Boiler</div>
                <div>
                  <button type="button" className="popup-adder sum" onClick={handleSum5}>
                    +
                  </button>
                  <button onClick={handleRest5} type="button" className="popup-adder rest">
                    -
                  </button>
                  <input
                    value={boiler === 0 ? '' : boiler}
                    defaultValue=""
                    className="popup-number"
                    onChange={(e)=> setboiler(e.target.value)}
                  />
                </div>
              </div>
            </Col>
            <Col>
              <div className="popup-column">
                <div>
                  <img src={dryer} alt="dryer" className="popup-image" />
                  <span className="popups-kgs">50kgs</span>
                </div>
                <div className="popup-bote">Secadora</div>
                <div>
                  <button type="button" className="popup-adder sum" onClick={handleSum6}>
                    +
                  </button>
                  <button onClick={handleRest6} type="button" className="popup-adder rest">
                    -
                  </button>
                  <input
                    value={secadora === 0 ? '' : secadora}
                    defaultValue=""
                    className="popup-number"
                    onChange={(e)=> setsecadora(e.target.value)}
                  />
                </div>
              </div>
            </Col>
            <Col>
              <div className="popup-column">
                <div>
                  <img src={oven} alt="dryer" className="popup-image" />
                  <span className="popups-kgs">50kgs</span>
                </div>
                <div className="popup-bote">Estufa</div>
                <div>
                  <button type="button" className="popup-adder sum" onClick={handleSum7}>
                    +
                  </button>
                  <button onClick={handleRest7} type="button" className="popup-adder rest">
                    -
                  </button>
                  <input
                    value={estufa === 0 ? '' : estufa}
                    defaultValue=""
                    className="popup-number"
                    onChange={(e)=> setestufa(e.target.value)}
                  />
                </div>
              </div>
            </Col>
            <Col>
              <div className="popup-column">
                <div>
                  <img src={microwave} alt="dryer" className="popup-image" />
                  <span className="popups-kgs">20kgs</span>
                </div>
                <div className="popup-bote">Microondas</div>
                <div>
                  <button type="button" className="popup-adder sum" onClick={handleSum8}>
                    +
                  </button>
                  <button onClick={handleRest8} type="button" className="popup-adder rest">
                    -
                  </button>
                  <input
                    value={microondas === 0 ? '' : microondas}
                    defaultValue=""
                    className="popup-number"
                    onChange={(e)=> setmicroondas(e.target.value)}
                  />
                </div>
              </div>
            </Col>
          </Row>

          <Row className="popup-row">
            <Col>
              <div className="popup-column">
                <div>
                  <img src={others} alt="dryer" className="popup-image" />
                  <span className="popups-kgs">50kgs</span>
                </div>
                <div className="popup-bote">Otros</div>
                <div>
                  <button type="button" className="popup-adder sum" onClick={handleSum9}>
                    +
                  </button>
                  <button onClick={handleRest9} type="button" className="popup-adder rest">
                    -
                  </button>
                  <input
                    value={otros === 0 ? '' : otros}
                    defaultValue=""
                    className="popup-number"
                    onChange={(e)=> setotros(e.target.value)}
                  />
                </div>
              </div>
            </Col>
            <Col>
              <div className="popup-column">
                <div>
                  <img src={smbag} alt="dryer" className="popup-image" />
                  <span className="popups-kgs">25kgs</span>
                </div>
                <div className="popup-bote">Costal de Bote</div>
                <div>
                  <button type="button" className="popup-adder sum" onClick={handleSum10}>
                    +
                  </button>
                  <button onClick={handleRest10} type="button" className="popup-adder rest">
                    -
                  </button>
                  <input
                    value={costal === 0 ? '' : costal}
                    defaultValue=""
                    className="popup-number"
                    onChange={(e)=> setcostal(e.target.value)}
                  />
                </div>
              </div>
            </Col>
            <Col>
              <div className="popup-column">
                <div>
                  <img src={bag} alt="dryer" className="popup-image" />
                  <span className="popups-kgs">250kgs</span>
                </div>
                <div className="popup-bote">Mega Saco de Bote</div>
                <div>
                  <button type="button" className="popup-adder sum" onClick={handleSum11}>
                    +
                  </button>
                  <button onClick={handleRest11} type="button" className="popup-adder rest">
                    -
                  </button>
                  <input
                    value={saco === 0 ? '' : saco}
                    defaultValue=""
                    className="popup-number"
                    onChange={(e)=> setsaco(e.target.value)}
                  />
                </div>
              </div>
            </Col>
            <Col>
              <div className="popup-column">
                <div>
                  <img src={contenedors} alt="dryer" className="popup-image" />
                  <span className="popups-kgs">150kgs</span>
                </div>
                <div className="popup-bote">Contenedor de Bote</div>
                <div>
                  <button type="button" className="popup-adder sum" onClick={handleSum12}>
                    +
                  </button>
                  <button onClick={handleRest12} type="button" className="popup-adder rest">
                    -
                  </button>
                  <input
                    value={contenedor === 0 ? '' : contenedor}
                    defaultValue=""
                    className="popup-number"
                    onChange={(e)=> setcontenedor(e.target.value)}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <div>
          <button
            style={{ marginRight: '30px' }}
            type="button"
            className="popup-button"
            onClick={
               togglePopup0
            }
          >
            &#60; OK
          </button>
        </div>
      </div>
    );
  }

  // Componente final de Wizard para editar material

  return (
    <div>
      {isNext===1 ? 
        (
          <Botes />
        ) : isNext===0 ? (
          <div className="box">
            <span className="close-icon" onClick={handleBack}>
              x
            </span>
            <CardHeader style={{ paddingTop: '25px', color: '#002c6f' }}>
              <Row style={{marginLeft:"0px"}}>[1] Clasificación Material</Row>
              {Todos===1 && <Row style={{marginLeft:"0px"}}><span className="Todos-materiales"><WarningIcon /> Seleccionar material fuera de lista autorizada, requiere autorización de Jefe de Operación para dar salida.</span></Row>}
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
                    <span style={{ color: 'red !important', marginTop: '2px' }}>
                      {idmaterialviaje < 1 && props.NomMotivoEntrada=== 3 ? 'Seleccionar material del Viaje' : null}
                    </span>
                  </Row>
                  <Row className="popup-title">Material Enviado</Row>
                  {props.NomMotivoEntrada=== 9 ? <Row> No aplica</Row> :props.NomMotivoEntrada=== 3 ? 
                    (
                      <Row> 
                        {props.Materialviaje && props.Materialviaje.every( v => v.idFabricacion === props.Materialviaje[0].idFabricacion) ?
                        (
                          <SelectBox
                            searchEnabled={true}
                            dataSource={props.Materialviaje ? props.Materialviaje:''}
                            defaultValue={idmaterialviaje}
                            displayExpr="NomArticuloRemisionado"
                            valueExpr="ClaArticuloRemisionado"
                            placeholder="Seleccionar Material.."
                            onValueChanged={onValueChangede}
                          />
                        ):
                        (
                          <SelectBox
                            searchEnabled={true}
                            dataSource={props.Materialviaje ? props.Materialviaje:''}
                            defaultValue={idFabricacion}
                            displayExpr="NomArticuloRemisionado"
                            valueExpr="idFabricacion"
                            placeholder="Seleccionar Material.."
                            onValueChanged={onValueChangedes}
                          />
                          )}
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
                    {props.NomMotivoEntrada===3 ? idmaterialviaje > 1 && idmaterialr<1 && 'Seleccionar material' :idmaterialr<1 ? 'Seleccionar material':null}
                  </span>
                </Row>
                <Col className="selector">
                  <Row className="popup-title" style={{ marginLeft: '0px' }}>
                    <Col style={{paddingLeft:"0px", paddingRight: "0px"}}>Material Recibido</Col>
                    <Col>
                      <FormGroup>
                        {props.NomMotivoEntrada===3 && <FormControlLabel style={{height: "22px"}} control={<IOSSwitch checked={Todos === 1} onChange={handleTodos} name="checkedB" />} label="Ver Todos" />}
                      </FormGroup>
                    </Col>
                  </Row>
                  { (props.material || props.materialtodos) &&
                  (
                  <SelectBox
                    searchEnabled={true}
                    dataSource={props.NomMotivoEntrada=== 9 ? props.material ? props.material : '':props.NomMotivoEntrada=== 3 ? Todos===1 ? props.materialtodos : props.material : ''}
                    defaultValue={idmaterialr}
                    displayExpr={props.NomMotivoEntrada=== 9 ? "NomArticuloCompra": props.NomMotivoEntrada=== 3 ? Todos===1 ? "NomMaterialRecibeTraspaso":"NomArticuloCompra" :''}
                    valueExpr={props.NomMotivoEntrada=== 9 ? "ClaArticuloCompra": props.NomMotivoEntrada=== 3 ? Todos===1 ?"ClaMaterialRecibeTraspaso": "ClaArticuloCompra" :''}
                    placeholder="Seleccionar Material.."
                    onValueChanged={onValueChangedr}
                    disabled={props.idmaterialviaje<1 && props.NomMotivoEntrada=== 3}
                  />
                  )}
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
                          ? kilosr * (props.NomMotivoEntrada===9 ? Datosmaterial=== 0 ? 1 :Datosmaterial[0].PesoTeoricoKgs: props.NomMotivoEntrada===3 ? Datosmaterial=== 0 ? 1 :Datosmaterial[0].PesoTeoricoRecibido: 1)
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
                        {props.NomMotivoEntrada===9 ? Datosmaterial ? Datosmaterial[0].NomUnidad : ' ':props.NomMotivoEntrada===3 ? Datosmaterial ? Datosmaterial[0].NomUnidadRecibido : ' ' : ''}
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </Row>

              <Row className="popup-row">
                <Col>
                  <Row className="popup-title">Kilos Enviados</Row>
                  <Row>{pesoremisionado !==null && unidadRemisionado !== null ?`${pesoremisionado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}  ${unidadRemisionado}` : '-'}</Row>
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
                          ? cantidadr / (props.NomMotivoEntrada===9 ? Datosmaterial=== 0 ? 1 : Datosmaterial[0].PesoTeoricoKgs: props.NomMotivoEntrada===3 ? Datosmaterial=== 0 ? 1 : Datosmaterial[0].PesoTeoricoRecibido: 1)
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
                      <InputGroupText>Kg</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
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
                  {/* <Row className="popup-title" style={{ marginLeft: '0px' }}>
                    Zona de Descarga
                  </Row> */}
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
                    <Input className="popup-recibidos" onChange={handleobservaciones} defaultValue={observaciones} type="text" />
                  </Row>
                </Col>
              </Row>
              <Row className="popup-row">
                <Col>
                  {/* En desarrollo */}

                  <Row className="popup-title" style={{paddingTop:'10px'}}>
                    <div className="opcion" onClick={togglePopup2} style={{marginLeft:'7%',marginRight:'7%',marginBottom:'0%',backgroundColor: 'white',borderRadius: '50%',border: '1px solid grey',padding: '10px'}}><img src={Cilinder} alt="dryer" style={{width:'40px'}} /><br /><span style={{fontWeight: '400'}}></span></div>
                    {props.NomMotivoEntrada===9 && Materialescheck===0 ? (<div className="opcion" onClick={togglePopup1} style={{marginLeft:'7%',marginRight:'7%',marginBottom:'0%',backgroundColor: 'white',borderRadius: '50%',border: '1px solid grey',padding: '10px'}}><img src={microwave} alt="dryer" style={{width:'40px'}} /></div>):''}
                    {props.NomMotivoEntrada===9 && Materialescheck===0 ? (<div className="opcion" onClick={togglePopup1} style={{marginLeft:'7%',marginRight:'7%',marginBottom:'0%',backgroundColor: 'white',borderRadius: '50%',border: '1px solid grey',padding: '10px'}}><img src={bag} alt="dryer" style={{width:'40px'}} /></div>):''}
                  </Row>
                  <Row>
                    <div className="opcion-titulo" style={{marginLeft:'6%',marginTop:'0%',fontSize:'10px'}}>Contaminantes</div>
                    {props.NomMotivoEntrada===9 && Materialescheck===0 ? (<div className="opcion-titulo" style={{marginLeft:'9%',marginTop:'0%',fontSize:'10px'}}>Electrodomésticos</div>) : ''}
                    {props.NomMotivoEntrada===9 && Materialescheck===0 ? (<div className="opcion-titulo" style={{marginLeft:'16%',marginTop:'0%',fontSize:'10px'}}>Botes</div>):''}
                  </Row>
                  <Row>
                    <div className="opcion-titulo" style={{width:'31%',textAlign:'center',marginTop:'0%',fontSize:'14px'}}>{(+Totales + +kiloscont).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Kg</div>
                    {props.NomMotivoEntrada===9 && Materialescheck===0 ? (<div className="opcion-titulo" style={{width:'31%',textAlign:'center',marginTop:'0%',fontSize:'14px'}}>{electrodomestico.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Kg</div>) : ''}
                    {props.NomMotivoEntrada===9 && Materialescheck===0 ? (<div className="opcion-titulo" style={{width:'31%',textAlign:'center',marginTop:'0%',fontSize:'14px'}}>{botes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Kg</div>):''}
                  </Row>
                  {/* Fin desarrollo */}
                </Col>
                <Col className="ajuste-subalmacen">
                  <Row className="popup-title" style={{ marginLeft: '0px' }}>Subalmacén</Row>
                  <SelectBox
                    dataSource={props.material ? subalmacenes : ''}
                    value={subalmacenes.length===1 ? (props.NomMotivoEntrada===9? subalmacenes[0].ClaSubAlmacenCompra : subalmacenes[0].ClaSubAlmacenTraspaso):subalmacen}
                    displayExpr={props.NomMotivoEntrada===9 ? "NomSubAlmacenCompra": props.NomMotivoEntrada===3 ? "NomSubAlmacenTraspaso":0}
                    valueExpr={props.NomMotivoEntrada===9 ? "ClaSubAlmacenCompra": props.NomMotivoEntrada===3 ? "ClaSubAlmacenTraspaso":0}
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
                    <span style={{ color: 'red !important'}}>
                      {idmaterialr > 1 && subalmacen === 0 ? 'Selecciona subalmacen' : null}
                    </span>
                  </Row>
                </Col>
              </Row>
            </Container>
            {/* Liberado */}

            {/* <div>
              <button
                style={{ marginRight: '30px' }}
                type="button"
                className="popup-button"
                onClick={
                  (PorcentajeSum > 100 && (pesajeparcial===0)) || idmaterialr < 1 || subalmacen < 1 || (props.NomMotivoEntrada=== 3 && idmaterialviaje < 1) || ((kilosr===0 || kilosr==='' || kilosr==='0' ) && (cantidadr===0 || cantidadr==='' || cantidadr==='0') && (porcentajer===0 || porcentajer==='' || porcentajer==='0') && (pesajeparcial===0)) || ((Datosmaterial=== 0) || (ElectBotecheck===1 && Electcheck===1)) ? null :((idmaterialr !== config.idElect) && (idmaterialr !==config.idBote) && Electcheck===0 && Materialescheck===0) ? togglePopup2 : togglePopup2
                }
              >
                Siguiente &gt;
              </button>
              <button type="button" className="popup-button" onClick={handleBack}>
                &#9447; Cancelar
              </button>
            </div> */}

            {/* Fin Liberado */}

            {/* En desarrollo */}
            <div>
              <button
                style={{ marginRight: '30px' }}
                type="button"
                className="popup-button"
                onClick={(PorcentajeSum > 100 && (pesajeparcial===0)) || idmaterialr < 1 || subalmacen < 1 || (props.NomMotivoEntrada=== 3 && idmaterialviaje < 1) || ((kilosr===0 || kilosr==='' || kilosr==='0' ) && (cantidadr===0 || cantidadr==='' || cantidadr==='0') && (porcentajer===0 || porcentajer==='' || porcentajer==='0') && (pesajeparcial===0)) || ((Datosmaterial=== 0) || (ElectBotecheck===1 && Electcheck===1)) ? null : (Referencia !==0 && Referencia!==null && Referencia !=='0') ? handleSubmit:handleMensaje}
              >
                Guardar &#43;
              </button>
            </div>
            {/* Fin desarrollo */}

          </div>  
        )
        : isNext===2 && (
        <div className="box Contabox">
          <span className="close-icon" onClick={handleBack}>
            x
          </span>
          <CardHeader style={{ paddingTop: '25px', color: '#002c6f' }}>
            [2] Contaminación
            <div className="bote-elect">
              <Row>
                <Col>Llanta:</Col>
                <Col>{Llantas.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Kg</Col>
                <Col>Total:</Col>
                <Col>{(+Totales + +kiloscont).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Kg</Col>
                <Col></Col>
              </Row>
              <Row>
                <Col>Tanque:</Col>
                <Col>{Tanques.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Kg</Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
              <Row>
                <Col>Otros:</Col>
                <Col>{Otros.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Kg</Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
            </div>
          </CardHeader>
          <Container fluid={true}>

            {/* Liberado */}
            {/* <Row className="popup-row" style={{ marginTop: '40px',height:'80px',marginLeft:"7%"}}>
              <Col>
                <Row className="popup-title">Material Recibido</Row>
                <Row>{nombrematerialr}</Row>
              </Col>
              <Col style={{height:"100%"}}>
                <Row className="popup-title" style={{ marginLeft: '0px' }}>
                  Cantidad Recibida
                </Row>
                <Row className="popup-elem" style={{ marginLeft: '0px' }}>
                  {pesajeparcial === 1 || props.placadato[0].EsPesajeParcial === 1
                    ? '--'
                    : cantidadr === ''
                    ? 0
                    : kilosr > 0
                    ? (kilosr / (props.NomMotivoEntrada===9 ? Datosmaterial=== 0 ? 1 : Datosmaterial[0].PesoTeoricoKgs: props.NomMotivoEntrada===3 ? Datosmaterial=== 0 ? 1 : Datosmaterial[0].PesoTeoricoRecibido: 1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : cantidadr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  &nbsp; {Datosmaterial ? (Datosmaterial[0].NomUnidad || Datosmaterial[0].NomUnidadRecibido) : ' '}
                </Row>
              </Col>
              <Col style={{height:"100%"}}>
                <Row className="popup-title" style={{ marginLeft: '0px' }}>
                  Kilos Recibidos
                </Row>
                <Row className="popup-elem" style={{ marginLeft: '0px' }}>
                  {pesajeparcial === 1 || props.placadato[0].EsPesajeParcial === 1
                    ? '--'
                    : kilosr === ''
                    ? 0
                    : cantidadr > 0
                    ? (cantidadr * (props.NomMotivoEntrada===9 ? Datosmaterial=== 0 ? 1 : Datosmaterial[0].PesoTeoricoKgs: props.NomMotivoEntrada===3 ? Datosmaterial=== 0 ? 1 : Datosmaterial[0].PesoTeoricoRecibido: 1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : kilosr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  &nbsp; Kg
                </Row>
              </Col>
              <Col style={{height:"100%"}}>
                <Row className="popup-title" style={{ marginLeft: '0px' }}>
                  Porcentaje
                </Row>
                <Row className="popup-elem" style={{ marginLeft: '0px' }}>
                  {pesajeparcial===1 ? 0 : porcentajer} &nbsp;%
                </Row>
              </Col>
            </Row> */}

            {/* Fin Liberado */}
            <Row className="popup-row">
              <Col>
                <Row className="popup-title" style={{ marginLeft: '50%', marginTop: '20px' }}>
                  Kilos Contaminados
                </Row>
                <InputGroup style={{ width: '50%',marginLeft: '50%' }}>
                  <Input
                    className="popup-recibidos"
                    type="number"
                    onChange={handlekiloscont}
                    defaultValue={kiloscont}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>Kg</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Col>
              <Col>
                <Row className="popup-title" style={{ marginLeft: '0px', marginTop: '20px' }}>
                  Motivo Contaminación
                </Row>
                {props.contaminacion &&
                (
                <SelectBox
                  style={{width:'60%'}}
                  searchEnabled={true}
                  dataSource={props.contaminacion ? props.contaminacion : ''}
                  defaultValue=""
                  displayExpr="NomMotivoContaminacion"
                  valueExpr={kiloscont < 1 ? '0' : 'ClaMotivoContaminacion'}
                  placeholder="Seleccionar Material.."
                  onValueChanged={handlerazoncont}
                  disabled={kiloscont < 1}
                />
                )}
                <Row
                  style={{
                    color: 'red',
                    position: 'absolute',
                    marginTop: '0px',
                    marginLeft: '0%',
                  }}
                  className="warning"
                >
                  <span style={{ color: 'red !important' }}>
                    {kiloscont > 0 && razoncont < 1 ? 'Seleccionar Motivo' : null}
                  </span>
                </Row>
              </Col>
            </Row>
            <div className="mapeo-contaminantes" style={{marginTop:"40px"}}>
              {Contaminantes.map((contaminantegrupo,index) => (
                <Row key={index}>
                  {contaminantegrupo.map((contaminante) => (
                    <Contelements key={contaminante.id} contaminante={contaminante} />
                  ))}
                </Row>
              ))}
            </div>
            <div style={{marginTop: "50px",position: "absolute"}}>
              <span style={{ color: 'red' }}>
                {ContTotal > 500 ? 'El máximo de Kilos es de 500kgs' : null}
              </span>
            </div>
          </Container>
          
          {/* Liberado */}

          {/* <div style={{ marginTop: '70px' }}>
            <button
              style={{ marginRight: '30px' }}
              type="button"
              className="popup-button"
              onClick={(kiloscont > 0 && razoncont < 1) || (+Llantas + +Tanques >500) || (ContTotal) > 500 ? null :almacen !==0 && (Referencia !==0 || Referencia!==null)? handleSubmit:handleMensaje}
            >
              Guardar &#43;
            </button>
            <button type="button" className="popup-button" onClick={((idmaterialr !== config.idElect) && (idmaterialr !==config.idBote) && Electcheck===0) ? togglePopup0 : togglePopup0}>
              &#60; Regresar
            </button>
          </div>

           */}
          {/* Fin Liberado */}

          {/* En desarrollo */}
          <div style={{ marginTop: '70px' }}>
            <button
              style={{ marginRight: '30px' }}
              type="button"
              className="popup-button"
              onClick={(kiloscont > 0 && razoncont < 1) || (+Llantas + +Tanques >500) || (ContTotal) > 500 ? null : togglePopup0}
            >
              &#60; OK
            </button>
          </div>
          {/* Fin desarrollo */}

        </div>
      )}
    </div>
  );
};

export default NuevoMaterial;
