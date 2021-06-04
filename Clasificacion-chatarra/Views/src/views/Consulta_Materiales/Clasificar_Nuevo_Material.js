import React, { useState, useEffect } from 'react';
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
  const [isNext, setIsNext] = useState(false);
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
  const [porcentajer, setporcentajer] = useState(pesajeparcial === 1 ? 100 : 0);
  const [observaciones, setobservaciones] = useState('Ninguna');
  const [pesajeparcial, setpesajeparcial] = useState(
    props.placadato[0].EsPesajeParcial === 1 ? props.placadato[0].EsPesajeParcial : 0
  );
  const ipadress = getSessionItem('Ipaddress');
  const NumbUsuario = getSessionItem('NumUsuario');
  const [idmaterialr, setidmaterialr] = useState(0);
  const [nombrematerialr, setnombrematerialr] = useState(0);
  const [idmaterialviaje, setidmaterialviaje] = useState(0);
  const [nombrematerialviaje, setnombrematerialviaje] = useState(0);
  const [subalmacen, setsubalmacen] = useState(0);
  const [nomsubalmacen, setnomsubalmacen] = useState(0);
  const [subalmacenes, setsubalmacenes] = useState(0);
  const [kiloscont, setkiloscont] = useState(0);
  const [razoncont, setrazoncont] = useState(0);
  const [Referencia, setReferencia] = useState(0);
  const PorcentajeSum = props.row
    ? +props.row.reduce((acc, val) => acc + val.PorcentajeMaterial, 0) + +porcentajer
    : 0;
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
  const Llantas = +LlantasChico * +25 + +LlantasMediano * +50 + +LlantasGrande * +100;
  const Tanques = +Tanque * 200;
  const Otros = +Cilindro * +100 + +Bollas * +50;
  const Totales = +Llantas + +Otros + +Tanques;
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
    const urlKrakenService = `${config.KrakenService}/${24}/${37}`;

    /* eslint-disable */
    const data6 = {
      parameters:
        '{"ClaUbicacion":' +
        props.editBoxValue +
        ',"ClaServicioJson":6,"Parametros":"@pnClaUbicacion=' +
        props.editBoxValue +
        ',@pnClaArticuloCompra=' +
        idmaterialr +
        ',@pnClaProveedor=' +
        props.placadato[0].ClaProveedor +
        ',@pnIdListaPrecio=' +
        props.placadato[0].IdListaPrecio +
        ',@pnClaOrdenCompra=,@pnClaTipoOrdenCompra="}',
      tipoEstructura: 0,
    };

    const data31 = {
      parameters:
        '{"ClaUbicacion":' +
        props.editBoxValue +
        ',"ClaServicioJson":31,"Parametros":"@pnClaUbicacion=' +
        props.editBoxValue +
        ',@pnClaMaterialRecibeTraspaso=' +
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
        ',@pnClaArticuloCompra=' +
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
        ',@pnClaMaterialRecibeTraspaso=' +
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
    const urlKrakenService = `${config.KrakenService}/${24}/${37}`;

    /* eslint-disable */
    const data8 = {
      parameters:
        '{"ClaUbicacion":' +
        props.editBoxValue +
        ',"ClaServicioJson":8,"Parametros":"@pnClaUbicacion=' +
        props.editBoxValue +
        ',@pnClaArticuloCompra=' +
        idmaterialr +
        ',@pnClaSubAlmacenCompra=' +
        subalmacen +
        ',@psNomSubAlmacenCompra=' +
        nomsubalmacen +
        ',@pnIdBoleta=' +
        props.placadato[0].IdBoleta +
        '"}',
      tipoEstructura: 0,
    };
    /* eslint-enable */
    if (subalmacen > 0 && nomsubalmacen) {
      callApi(urlKrakenService, 'POST', data8, (res) => {
        setReferencia(res.Result0[0].ClaReferenciaCompra);
      });
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

  // Función para cambio de material en el wizard
  const onValueChangedr = (e) => {
    setidmaterialr(e.value);
    setsubalmacen(0);
    setnombrematerialr(e.component.option('text').split('-').pop());
  };

  const onValueChangede = (e) => {
    setidmaterialviaje(e.value);
    setnombrematerialviaje(e.component.option('text').split('-').pop());
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
  const botes = 35 * costal + 250 * saco + 150 * contenedor;

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

  const handlealmacen = (event) => {
    setalmacen(event.target.value);
  };

  const handlesubalmacen = (event) => {
    setsubalmacen(event.value);
    setnomsubalmacen(event.component.option('text'));
  };

  // Funciones para sumar/restar las cantidades de botes/electrodomésticos con límite de 50 piezas

  const handleSum1 = () => {
    if (srefri < 50) {
      setsrefri(srefri + 1);
    }
  };

  const handleSum2 = () => {
    if (mrefri < 50) {
      setmrefri(mrefri + 1);
    }
  };
  const handleSum3 = () => {
    if (refri < 50) {
      setrefri(refri + 1);
    }
  };
  const handleSum4 = () => {
    if (lavadora < 50) {
      setlavadora(lavadora + 1);
    }
  };
  const handleSum5 = () => {
    if (boiler < 50) {
      setboiler(boiler + 1);
    }
  };
  const handleSum6 = () => {
    if (secadora < 50) {
      setsecadora(secadora + 1);
    }
  };
  const handleSum7 = () => {
    if (estufa < 50) {
      setestufa(estufa + 1);
    }
  };
  const handleSum8 = () => {
    if (microondas < 50) {
      setmicroondas(microondas + 1);
    }
  };
  const handleSum9 = () => {
    if (otros < 50) {
      setotros(otros + 1);
    }
  };
  const handleSum10 = () => {
    if (costal < 50) {
      setcostal(costal + 1);
    }
  };
  const handleSum11 = () => {
    if (saco < 50) {
      setsaco(saco + 1);
    }
  };
  const handleSum12 = () => {
    if (contenedor < 50) {
      setcontenedor(contenedor + 1);
    }
  };

  const handleRest1 = () => {
    if (srefri > 0) {
      setsrefri(srefri - 1);
    }
  };
  const handleRest2 = () => {
    if (mrefri > 0) {
      setmrefri(mrefri - 1);
    }
  };
  const handleRest3 = () => {
    if (refri > 0) {
      setrefri(refri - 1);
    }
  };
  const handleRest4 = () => {
    if (lavadora > 0) {
      setlavadora(lavadora - 1);
    }
  };
  const handleRest5 = () => {
    if (boiler > 0) {
      setboiler(boiler - 1);
    }
  };
  const handleRest6 = () => {
    if (secadora > 0) {
      setsecadora(secadora - 1);
    }
  };
  const handleRest7 = () => {
    if (estufa > 0) {
      setestufa(estufa - 1);
    }
  };
  const handleRest8 = () => {
    if (microondas > 0) {
      setmicroondas(microondas - 1);
    }
  };
  const handleRest9 = () => {
    if (otros > 0) {
      setotros(otros - 1);
    }
  };
  const handleRest10 = () => {
    if (costal > 0) {
      setcostal(costal - 1);
    }
  };
  const handleRest11 = () => {
    if (saco > 0) {
      setsaco(saco - 1);
    }
  };
  const handleRest12 = () => {
    if (contenedor > 0) {
      setcontenedor(contenedor - 1);
    }
  };

  const togglePopup2 = () => {
    setIsNext(!isNext);
  };

  const closebote = () => {
    setidmaterialr(0);
  };

  const safebote = () => {
    setkilosr(kilosbotes);
    setcantidadr(kilosbotes);
    setidmaterialr(0);
    setIsNext(!isNext);
  };

  // Función para cambiar del paso 1 (Clasificación de Material) & paso 2 (Contaminación)

  const handleBack = () => {
    props.setpoppesaje(true);
    props.setmodaladdOpen(false);
  };

  // Función que guarda los cambios efectuados en el material
  // Servicio JSON 11 --> SP= BasSch.BasGuardarClasEntCompraMatPrimaProc <Guarda clasificación>
  // Servicio JSON 12 --> SP= BasSch.BasRegistraMaterialClasEntCompraMatPrimaProc <Registra material a clasificar>

  const handleSubmit = () => {
    props.setpoppesaje(true);
    const urlKrakenService = `${config.KrakenService}/${24}/${37}`;

    /* eslint-disable */

    const data11 = {
      parameters:
        '{"ClaUbicacion":' +
        props.editBoxValue +
        ',"ClaServicioJson":' +
        11 +
        ',"Parametros":"@pnClaUbicacion=' +
        props.editBoxValue +
        ',@pnIdBoleta=' +
        props.placadato[0].IdBoleta +
        ',@psObservaciones=,@pnEsRevisionEfectuada=' +
        props.placadato[0].EsRevisionEfectuada +
        ',@pnClaTipoClasificacion=' +
        props.placadato[0].ClaTipoClasificacion +
        ',@pnEsNoCargoDescargoMaterial=' +
        props.placadato[0].EsNoCargoDescargoMaterial +
        ',@psNombrePcMod=' +
        ipadress +
        ',@pnClaUsuarioMod=' +
        NumbUsuario +
        '"}',
      tipoEstructura: 0,
    };

    const data12 = {
      parameters:
        '{"ClaUbicacion":' +
        props.editBoxValue +
        ',"ClaServicioJson":12,"Parametros":"@pnClaUbicacion=' +
        props.editBoxValue +
        ',@pnIdBoleta=' +
        props.placadato[0].IdBoleta +
        ',@pnClaArticuloCompra=' +
        idmaterialr +
        ',@pnCantidadMaterial=' +
        (cantidadr === '' ? 0 : kilosr > 0 ? kilosr / Datosmaterial[0].PesoTeoricoKgs : cantidadr) +
        ',@pnKilosMaterial=' +
        (kilosr === '' ? 0 : cantidadr > 0 ? cantidadr * Datosmaterial[0].PesoTeoricoKgs : kilosr) +
        ',@pnKilosReales=0,@pnKilosContaminados=' +
        (+kiloscont + +Totales) +
        ',@pnKilosDocumentados=0,@pnPorcentajeMaterial=' +
        porcentajer +
        ',@pnEsPesajeParcial=' +
        pesajeparcial +
        ',@pnClaAlmacen=1,@pnClaSubAlmacenCompra=' +
        subalmacen +
        ',@pnClaMotivoContaminacion=' +
        razoncont +
        ',@pnEsNoCargoDescargoMaterial=0,@pnClaProveedor=' +
        props.placadato[0].ClaProveedor +
        ',@pnIdListaPrecio=' +
        props.placadato[0].IdListaPrecio +
        ',@pnClaTipoOrdenCompra=,@pnClaOrdenCompra=,@pnClaUbicacionProveedor=' +
        props.placadato[0].ClaUbicacionProveedor +
        ',@psClaReferenciaCompra=' +
        Referencia +
        ',@pnIdRenglon=1,@psNombrePcMod=' +
        ipadress +
        ',@pnClaUsuarioMod=' +
        NumbUsuario +
        ',@pnAccionSp="}',
      tipoEstructura: 0,
    };
  
    const data36 = {
      parameters:
        '{"ClaUbicacion":' +
        props.editBoxValue +
        ',"ClaServicioJson":' +
        36 +
        ',"Parametros":"@pnClaUbicacion=' +
        props.editBoxValue +
        ',@pnIdBoleta=' +
        props.placadato[0].IdBoleta +
        ',@pnClaViajeOrigen='+
        props.ClaViajeOrigen +
        ',@pnClaUbicacionOrigen=' +
        props.ClaUbicacionOrigen +
        ',@pnClaTransporte=' +
        props.placadato[0].ClaTransporte +
        ',@pnClaTransportista=' +
        props.placadato[0].ClaTransportista +
        ',@psNomTransportista=' +
        props.placadato[0].NomTransportista +
        ',@psNomChofer=' +
        (props.placadato[0].NomChofer !== null ? props.placadato[0].NomChofer: 0)+
        ',@psPlacas=' +
        props.placadato[0].Placas +
        ',@pnPesoDocumentado=' +
        props.placadato[0].PesoDocumentado +
        ',@psObservaciones=' +
        props.placadato[0].Observaciones +
        ',@pnEsRevisionEfectuada=' +
        props.placadato[0].EsRevisionEfectuada +
        ',@pnClaTipoClasificacion=' +
        props.placadato[0].ClaTipoClasificacion +
        ',@pnEsNoCargoDescargoMaterial=' +
        props.placadato[0].EsNoCargoDescargoMaterial +
        ',@psNombrePcMod=' +
        ipadress +
        ',@pnClaUsuarioMod=' +
        NumbUsuario +
        ',@pnAccionSp="}',
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
        props.ClaViajeOrigen +
        ',@pnClaUbicacionOrigen='+
        props.ClaUbicacionOrigen +
        ',@pnIdRenglonRecepcion=,@pnIdFabricacion=' +
        (props.placadato[0].IdFabDefault) +
        ',@pnIdFabricacionDet=' +
        (1) +
        ',@pnClaArticuloRemisionado=' +
        (idmaterialviaje ? idmaterialviaje : 0) +
        ',@pnCantRemisionada=' +
        (0)+
        ',@pnClaMaterialRecibeTraspaso=' +
        (idmaterialr) +
        ',@pnCantRecibida=' +
        (cantidadr === '' ? 0 : kilosr > 0 ? kilosr / 1 : cantidadr) +
        ',@pnPesoRecibido=' +
        (kilosr === '' ? 0 : cantidadr > 0 ? cantidadr * 1: kilosr) +
        ',@pnPorcentajeMaterial=' +
        (porcentajer === '' ? 0 : porcentajer) +
        ',@pnPesoTaraRecibido=' +
        (0) +
        ',@pnClaAlmacen=' +
        (1) +
        ',@pnClaSubAlmacenTraspaso=' +
        (subalmacen) +
        ',@pnClaSubSubAlmacen=' +
        ( 0) +
        ',@pnClaSeccion=' +
        (0) +
        ',@psReferencia1='+(0)+
        ',@psReferencia2='+(0)+
        ',@psReferencia3='+(0)+
        ',@psReferencia4='+(0)+
        ',@psReferencia5='+(0)+
        ',@pnEsPesajeParcial=' +
        pesajeparcial  +
        ',@pnKilosReales='+(0)+
        ',@pnKilosContaminados='+
        ((+kiloscont + +Totales))+
        ',@pnClaMotivoContaminacion='+
        razoncont +
        ',@pnClaReferenciaTraspaso=' +
        Referencia +
        ',@pnEsNoCargoDescargoMaterial=' +
        props.placadato[0].EsNoCargoDescargoMaterial +
        ',@psNombrePcMod=' +
        ipadress +
        ',@pnClaUsuarioMod=' +
        NumbUsuario +
        ',@pnAccionSp="}',
      tipoEstructura: 0,
    };
    // usage
    /* eslint-enable */
    if(props.NomMotivoEntrada===9){
    callApi(urlKrakenService, 'POST', data11, (res) => {
      // console.log(res);
    });

    callApi(urlKrakenService, 'POST', data12, (res) => {
      // console.log(res);
    });
  }

  if(props.NomMotivoEntrada===3){
   callApi(urlKrakenService, 'POST', data36, (res) => {
     // console.log(res);
   });
   console.log(data37)
   callApi(urlKrakenService, 'POST', data37, (res) => {
     // console.log(res);
   });
 }

    props.setrow(null);
    props.setpesajeparcial(pesajeparcial);
    props.setmodaladdOpen(false);
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
      <div className="box">
        <span className="close-icon" onClick={closebote}>
          x
        </span>
        <CardHeader>
          Clasificación
          <div className="bote-elect">
            <Row>
              <Col>Electrodoméstico:</Col>
              <Col>{electrodomestico} Kgs</Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>Bote:</Col>
              <Col>{botes} Kgs</Col>
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
                    disabled="disabled"
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
                    disabled="disabled"
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
                    disabled="disabled"
                  />
                </div>
              </div>
            </Col>
          </Row>

          <Row className="popup-row">
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
                    disabled="disabled"
                  />
                </div>
              </div>
            </Col>
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
                    disabled="disabled"
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
                    disabled="disabled"
                  />
                </div>
              </div>
            </Col>
          </Row>

          <Row className="popup-row">
            <Col>
              <div className="popup-column">
                <div>
                  <img src={oven} alt="dryer" className="popup-image" />
                  <span className="popups-kgs">50kgs</span>
                </div>
                <div className="popup-bote">Oven</div>
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
                    disabled="disabled"
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
                    disabled="disabled"
                  />
                </div>
              </div>
            </Col>
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
                    disabled="disabled"
                  />
                </div>
              </div>
            </Col>
          </Row>

          <Row className="popup-row">
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
                    disabled="disabled"
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
                    disabled="disabled"
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
                    disabled="disabled"
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
            onClick={safebote}
          >
            GUARDAR
          </button>
        </div>
      </div>
    );
  }

  // Componente final de Wizard para editar material

  return (
    <div>
      {!isNext ? (
        idmaterialr === 10000 ? (
          <Botes />
        ) : (
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
                      {idmaterialviaje < 1 ? 'Seleccionar material del Viaje' : null}
                    </span>
                  </Row>
                  <Row className="popup-title">Material Enviado</Row>
                  {props.NomMotivoEntrada=== 9 ? <Row> No aplica</Row> :props.NomMotivoEntrada=== 3 ? 
                    (
                      <Row> 
                        <SelectBox
                          searchEnabled={true}
                          dataSource={props.Materialviaje}
                          defaultValue={idmaterialviaje}
                          displayExpr="NomArticuloRemisionado"
                          valueExpr="ClaArticuloRemisionado"
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
                    {idmaterialviaje >1 && idmaterialr < 1 ? 'Seleccionar material' : null}
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
                  <SelectBox
                    searchEnabled={true}
                    dataSource={props.NomMotivoEntrada=== 9 ? props.material ? props.material : null:props.NomMotivoEntrada=== 3 ? Todos===1 ? props.materialtodos : props.material : ''}
                    defaultValue={idmaterialr}
                    displayExpr={props.NomMotivoEntrada=== 9 ? "NomArticuloCompra": props.NomMotivoEntrada=== 3 ? Todos===1 ? "NomMaterialRecibeTraspaso":"NomArticuloCompra" :''}
                    valueExpr={props.NomMotivoEntrada=== 9 ? "ClaArticuloCompra": props.NomMotivoEntrada=== 3 ? Todos===1 ?"ClaMaterialRecibeTraspaso": "ClaArticuloCompra" :''}
                    placeholder="Seleccionar Material.."
                    onValueChanged={onValueChangedr}
                    disabled={idmaterialviaje<1}
                  />
                </Col>
              </Row>
              <Row className="popup-row">
                <Col>
                  <Row className="popup-title">Cantidad Enviada</Row>
                  <Row>{cantidade}</Row>
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
                          ? kilosr * (props.NomMotivoEntrada===9 ? Datosmaterial[0].PesoTeoricoKgs: props.NomMotivoEntrada===3 ? Datosmaterial[0].PesoTeoricoRecibido: 1)
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
                  <Row>{kilose}</Row>
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
                          ? cantidadr / (props.NomMotivoEntrada===9 ? Datosmaterial[0].PesoTeoricoKgs: props.NomMotivoEntrada===3 ? Datosmaterial[0].PesoTeoricoRecibido: 1)
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
                            ? 100
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
                  <Row className="popup-title" style={{ marginLeft: '0px' }}>
                    Zona de Descarga
                  </Row>
                  <Input className="popup-recibidos" type="text" />
                </Col>
              </Row>

              <Row className="popup-row">
                <Col></Col>
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
                  {PorcentajeSum > 100 ? 'El porcentaje no puede exceder el 100%' : null}
                </span>
              </Row>
              <Row className="popup-row">
                <Col>
                  <Row className="popup-title">Observaciones</Row>
                  <Row>
                    <Input className="popup-recibidos" onChange={handleobservaciones} type="text" />
                  </Row>
                </Col>
              </Row>
              <Row className="popup-row">
                <Col>
                  <Row className="popup-title">
                    <Col>Almacén</Col>
                    <Col>
                      <Row>1</Row>
                    </Col>
                  </Row>
                </Col>
                <Col className="ajuste-subalmacen">
                  <Row className="popup-title">
                    <Col>Subalmacén</Col>
                    <Col>
                      <Row>
                        <SelectBox
                          dataSource={props.material ? subalmacenes : null}
                          defaultValue={subalmacen}
                          displayExpr={props.NomMotivoEntrada===9 ? "NomSubAlmacenCompra": props.NomMotivoEntrada===3 ? "NomSubAlmacenTraspaso":0}
                          valueExpr={props.NomMotivoEntrada===9 ? "ClaSubAlmacenCompra": props.NomMotivoEntrada===3 ? "ClaSubAlmacenTraspaso":0}
                          placeholder="Seleccionar Subalmacen.."
                          onValueChanged={handlesubalmacen}
                          noDataText="Selecciona Material"
                          disabled={subalmacenes.length === 1}
                        />
                      </Row>
                      <Row
                        style={{
                          color: 'red',
                          position: 'absolute',
                          marginTop: '0px',
                          marginLeft: '-5%',
                        }}
                        className="warning"
                      >
                        <span style={{ color: 'red !important' }}>
                          {idmaterialr > 1 && subalmacen === 0 ? 'Selecciona subalmacen' : null}
                        </span>
                      </Row>
                    </Col>
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
                  PorcentajeSum > 100 || idmaterialr < 1 || subalmacen < 1 || idmaterialviaje < 1 ? null : togglePopup2
                }
              >
                Siguiente &gt;
              </button>
              <button type="button" className="popup-button" onClick={handleBack}>
                &#9447; Cancelar
              </button>
            </div>
          </div>
        )
      ) : (
        <div className="box">
          <span className="close-icon" onClick={handleBack}>
            x
          </span>
          <CardHeader style={{ paddingTop: '25px', color: '#002c6f' }}>
            [2] Contaminación
            <div className="bote-elect">
              <Row>
                <Col>Llanta:</Col>
                <Col>{Llantas}</Col>
                <Col>Total:</Col>
                <Col>{Totales}</Col>
                <Col></Col>
              </Row>
              <Row>
                <Col>Tanque:</Col>
                <Col>{Tanques}</Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
              <Row>
                <Col>Otros:</Col>
                <Col>{Otros}</Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
            </div>
          </CardHeader>
          <Container fluid={true}>
            <Row className="popup-row" style={{ marginTop: '40px' }}>
              <Col>
                <Row className="popup-title">Material Recibido</Row>
                <Row>{nombrematerialr}</Row>
              </Col>
              <Col>
                <Row className="popup-title" style={{ marginLeft: '0px' }}>
                  Cantidad Recibida
                </Row>
                <Row className="popup-elem" style={{ marginLeft: '0px' }}>
                  {pesajeparcial === 1 || props.placadato[0].EsPesajeParcial === 1
                    ? '--'
                    : cantidadr === ''
                    ? 0
                    : kilosr > 0
                    ? kilosr / (props.NomMotivoEntrada===9 ? Datosmaterial[0].PesoTeoricoKgs: props.NomMotivoEntrada===3 ? Datosmaterial[0].PesoTeoricoRecibido: 1)
                    : cantidadr}
                  &nbsp; {Datosmaterial ? Datosmaterial[0].NomUnidad : ' '}
                </Row>
              </Col>
              <Col>
                <Row className="popup-title" style={{ marginLeft: '0px' }}>
                  Kilos Recibidos
                </Row>
                <Row className="popup-elem" style={{ marginLeft: '0px' }}>
                  {pesajeparcial === 1 || props.placadato[0].EsPesajeParcial === 1
                    ? '--'
                    : kilosr === ''
                    ? 0
                    : cantidadr > 0
                    ? cantidadr * (props.NomMotivoEntrada===9 ? Datosmaterial[0].PesoTeoricoKgs: props.NomMotivoEntrada===3 ? Datosmaterial[0].PesoTeoricoRecibido: 1)
                    : kilosr}
                  &nbsp; kgs
                </Row>
              </Col>
              <Col>
                <Row className="popup-title" style={{ marginLeft: '0px' }}>
                  Porcentaje
                </Row>
                <Row className="popup-elem" style={{ marginLeft: '0px' }}>
                  {porcentajer} &nbsp;%
                </Row>
              </Col>
            </Row>
            <Row className="popup-row">
              <Col>
                <Row className="popup-title" style={{ marginLeft: '0px', marginTop: '20px' }}>
                  Kilos Contaminados
                </Row>
                <InputGroup style={{ width: '35%' }}>
                  <Input
                    className="popup-recibidos"
                    type="number"
                    onChange={handlekiloscont}
                    defaultValue={kiloscont}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>kgs</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Col>
            </Row>

            <Row className="popup-row">
              <Col>
                <Row className="popup-title" style={{ marginLeft: '0px', marginTop: '20px' }}>
                  Motivo Contaminacion
                </Row>
                <SelectBox
                  searchEnabled={true}
                  dataSource={props.contaminacion}
                  defaultValue=""
                  displayExpr="NomMotivoContaminacion"
                  valueExpr={kiloscont < 1 ? '0' : 'ClaMotivoContaminacion'}
                  placeholder="Seleccionar Material.."
                  onValueChanged={handlerazoncont}
                  disabled={kiloscont < 1}
                />
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
            <div className="mapeo-contaminantes">
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
                {Totales > 500 ? 'El máximo de Kilos es de 500kgs' : null}
              </span>
            </div>
          </Container>
          <div style={{ marginTop: '70px' }}>
            <button
              style={{ marginRight: '30px' }}
              type="button"
              className="popup-button"
              onClick={(kiloscont > 0 && razoncont < 1) || Totales > 500 ? null : handleSubmit}
            >
              Guardar &#43;
            </button>
            <button type="button" className="popup-button" onClick={togglePopup2}>
              &#60; Regresar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NuevoMaterial;