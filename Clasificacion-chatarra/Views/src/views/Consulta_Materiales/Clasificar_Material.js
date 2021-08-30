import React, { useState, useEffect, useRef} from 'react';
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
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { callApi, getSessionItem } from '../../utils/utils';
import { config } from '../../utils/config';
import SelectBox from 'devextreme-react/select-box';
import WarningIcon from '@material-ui/icons/Warning';
// imagenes de botes/Electrodomésticos
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

// imagenes de Contaminantes
import LlantaC from '../../assets/img/LlantaC.png';
import LlantaG from '../../assets/img/LlantaG.png';
import LlantaM from '../../assets/img/LlantaM.png';
import Tank from '../../assets/img/Tanque.png';
import Boya from '../../assets/img/boya.png';
import Cilinder from '../../assets/img/Cilindro.png';
import { SkipPreviousRounded } from '@material-ui/icons';

const Material = (props) => {
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
  const [contenedor, setcontenedor] = useState(0);
  const [Todos, setTodos] = useState(0);

  // Valores dinámicos locales al editar material
  const [cantidad, setcantidad] = useState(
    props.NomMotivoEntrada===9 ? props.ro.CantidadMaterial ? props.ro.CantidadMaterial : 0 : props.NomMotivoEntrada===3 ? props.ro.CantRecibida ? props.ro.CantRecibida : 0 : 0
  );
  const [Referencia, setReferencia] = useState(0);
  const [kilos, setkilos] = useState(0);
  const [observaciones, setobservaciones] = useState(props.placadato[0].Observaciones ? props.placadato[0].Observaciones:0);
  const [idmaterial, setidmaterial] = useState(
    props.NomMotivoEntrada===9 ? props.ro.ClaArticuloCompra ? props.ro.ClaArticuloCompra : 0 : props.NomMotivoEntrada===3 ? props.ro.ClaMaterialRecibeTraspaso ? props.ro.ClaMaterialRecibeTraspaso : 0 : 0
  );
  const [nombrematerial, setnombrematerial] = useState(props.NomMotivoEntrada===9 ? props.ro.NomArticuloCompra :props.NomMotivoEntrada===3 ? props.ro.NomMaterialRecibeTraspaso : '');
  const [kiloscont, setkiloscont] = useState(0);
  const [razoncont, setrazoncont] = useState(
    props.ro.ClaMotivoContaminacion ? props.ro.ClaMotivoContaminacion : 0
  );
  const [porcentajer, setporcentajer] = useState(
    props.ro.PorcentajeMaterial ? props.ro.PorcentajeMaterial : 0
  );
  const [pesajeparcial, setpesajeparcial] = useState(
    props.ro.EsPesajeParcial ? props.ro.EsPesajeParcial : 0
  );
  const ipadress = getSessionItem('Ipaddress');
  const NumbUsuario = getSessionItem('NumUsuario');
  const [subalmacen, setsubalmacen] = useState(
    props.NomMotivoEntrada===9 ? props.ro.ClaSubAlmacenCompra ? props.ro.ClaSubAlmacenCompra : 0 : props.NomMotivoEntrada===3 ? props.ro.ClaSubAlmacenTraspaso ? props.ro.ClaSubAlmacenTraspaso : 0 : 0
  );
  const [nomsubalmacen, setnomsubalmacen] = useState(
    props.NomMotivoEntrada===9 ? props.ro.NomSubAlmacenCompra ? props.ro.NomSubAlmacenCompra : 0 :props.NomMotivoEntrada===3 ? props.ro.NomSubAlmacenTraspaso ? props.ro.NomSubAlmacenTraspaso : 0 : 0
  );
  const [subalmacenes, setsubalmacenes] = useState(0);
  const Diferencia = props.ro.PorcentajeMaterial;
  const PorcentajeSum = props.row
    ? +props.row.reduce((acc, val) => acc + val.PorcentajeMaterial, 0) + +porcentajer - +Diferencia
    : 0;
  const almacen = 1;
  const [materiales, setmateriales] = useState(props.material);
  const [contaminaciones, setcontaminaciones] = useState(props.contaminacion);
  const disabled = true;
  const [Datosmaterial, setDatosmaterial] = useState(0);
  const prev = useRef()
  // Arreglo valores Contaminantes
  const [Contaminantes, setContaminantes] = useState([
    [
      { nombre: 'Boyas', comentario: '50kgs', imagen: Boya, id: 1 },
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
      { nombre: 'Llantas Grande', comentario: '100kgs', imagen: LlantaG, id: 6 },
    ],
  ]);
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
  const [NantCont, setNantCont] = useState()
  const Tanques = +Tanque * 200 +Cilindro * +100 + +Bollas * +50;
  const Otros =NantCont>0 ? NantCont : kiloscont;
  const Totales = +Llantas +Tanques;
  const ContaminacionTotal = +Totales
  const ContTotal= +Bollas*+50 + +Cilindro*+100 + +Tanque*+200 + +LlantasChico*+25 + +LlantasMediano*+50 + +LlantasGrande*+100 + +Bollas2*+50 + +Cilindro2*+100 + +Tanque2*+200 + +LlantasChico2*+25 + +LlantasMediano2*+50 + +LlantasGrande2*+100 + +Bollas3*+50 + +Cilindro3*+100 + +Tanque3*+200 + +LlantasChico3*+25 + +LlantasMediano3*+50 + +LlantasGrande3*+100 ;
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
  const Rowies = props.row.filter((rox)=> (props.NomMotivoEntrada===9 ? rox.ClaArticuloCompra !== props.ro.ClaArticuloCompra : props.NomMotivoEntrada===3 && rox.ClaMaterialRecibeTraspaso !== props.ro.ClaMaterialRecibeTraspaso))


  useEffect(() => {


    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    /* eslint-disable */
    if((Rowies.length===1 || Rowies.length===2) && (Rowies[0].ClaArticuloCompra || Rowies[0].ClaMaterialRecibeTraspaso)){
    const data481 = {
      parameters:
        '{"ClaUbicacion":' +
        props.editBoxValue +
        ',"ClaServicioJson":' +
        48 +
        ',"Parametros":"@pnClaUbicacion=' +
        props.editBoxValue +
        ',@pnIdBoleta=' +
          props.placadato[0].IdBoleta +
        ',@pnClaArticuloCompra=' +
       (props.NomMotivoEntrada===9 ? Rowies[0].ClaArticuloCompra : props.NomMotivoEntrada===3 && Rowies[0].ClaMaterialRecibeTraspaso)+
        '"}',
      tipoEstructura: 0,
    };
    /* eslint-enable */
    callApi(urlKrakenService, 'POST', data481, (res) => {
      setBollas2(res.Result0.length ? res.Result0[0].Cantidad : 0)
      setCilindro2(res.Result0.length ? res.Result0[1].Cantidad : 0)
      setTanque2(res.Result0.length ? res.Result0[2].Cantidad : 0)
      setLlantasChico2(res.Result0.length ? res.Result0[3].Cantidad : 0)
      setLlantasMediano2(res.Result0.length ? res.Result0[4].Cantidad : 0)
      setLlantasGrande2(res.Result0.length ? res.Result0[5].Cantidad : 0)
    })}
  
    if(Rowies.length===2 && (Rowies[1].ClaArticuloCompra || Rowies[1].ClaMaterialRecibeTraspaso)){
      /* eslint-disable */
    const data482 = {
      parameters:
        '{"ClaUbicacion":' +
        props.editBoxValue +
        ',"ClaServicioJson":' +
        48 +
        ',"Parametros":"@pnClaUbicacion=' +
        props.editBoxValue +
        ',@pnIdBoleta=' +
          props.placadato[0].IdBoleta +
        ',@pnClaArticuloCompra=' +
        (props.NomMotivoEntrada===9 ? Rowies[1].ClaArticuloCompra : props.NomMotivoEntrada===3 && Rowies[1].ClaMaterialRecibeTraspaso) +
        '"}',
      tipoEstructura: 0,
    };
    /* eslint-enable */
    callApi(urlKrakenService, 'POST', data482, (res) => {
      setBollas3(res.Result0.length ? res.Result0[0].Cantidad : 0)
      setCilindro3(res.Result0.length ? res.Result0[1].Cantidad : 0)
      setTanque3(res.Result0.length ? res.Result0[2].Cantidad : 0)
      setLlantasChico3(res.Result0.length ? res.Result0[3].Cantidad : 0)
      setLlantasMediano3(res.Result0.length ? res.Result0[4].Cantidad : 0)
      setLlantasGrande3(res.Result0.length ? res.Result0[5].Cantidad : 0)
    })
  }}, [])

  useEffect(() => {
    if(materiales.some(material => material.ClaArticuloCompra === idmaterial)){
      setTodos(0)
  }
  else{
    setTodos(1)
  }
  const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
  /* eslint-disable */
  const data48 = {
    parameters:
      '{"ClaUbicacion":' +
      props.editBoxValue +
      ',"ClaServicioJson":' +
      48 +
      ',"Parametros":"@pnClaUbicacion=' +
      props.editBoxValue +
      ',@pnIdBoleta=' +
        props.placadato[0].IdBoleta +
      ',@pnClaArticuloCompra=' +
      (props.NomMotivoEntrada===9 ? props.ro.ClaArticuloCompra : props.NomMotivoEntrada===3 && props.ro.ClaMaterialRecibeTraspaso) +
      '"}',
    tipoEstructura: 0,
  };
  /* eslint-enable */
  if(props.ro.ClaArticuloCompra || props.ro.ClaMaterialRecibeTraspaso){
  callApi(urlKrakenService, 'POST', data48, (res) => {
    setBollas(res.Result0.length ? res.Result0[0].Cantidad : 0)
    setCilindro(res.Result0.length ? res.Result0[1].Cantidad : 0)
    setTanque(res.Result0.length ? res.Result0[2].Cantidad : 0)
    setLlantasChico(res.Result0.length ? res.Result0[3].Cantidad : 0)
    setLlantasMediano(res.Result0.length ? res.Result0[4].Cantidad : 0)
    setLlantasGrande(res.Result0.length ? res.Result0[5].Cantidad : 0)
  })} 
  }, [])

  useEffect(() => {

    if(props.ro.KilosContaminados && NantCont!==0){
    setNantCont(+props.ro.KilosContaminados - (+Bollas*+50 + +Cilindro*+100 + +Tanque*+200 + +LlantasChico*+25 + +LlantasMediano*+50 + +LlantasGrande*+100))
  }
  else{
    setNantCont(0)
  }
}, [Bollas,LlantasMediano,LlantasChico,Cilindro,Tanque,LlantasGrande])
  // Función que corre servicios antes del render cada que haya un cambio de material
  // Servicio JSON 6 --> SP= AmpSch.AmpClaArticuloDatosSel <Consultar datos Material>
  // Servicio JSON 7 --> SP= AmpSch.AmpClaSubAlmacenArticuloCmb <Consultar listado Subalmacenes>
  useEffect(() => {
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    /* eslint-disable */
    const data6 = {
      parameters:
        '{"ClaUbicacion":' +
        props.editBoxValue +
        ',"ClaServicioJson":6,"Parametros":"@pnClaUbicacion=' +
        props.editBoxValue +
        ',@pnClaArticuloCompra=' +
        idmaterial +
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
        idmaterial +
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
        idmaterial +
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
        idmaterial +
        '"}',
      tipoEstructura: 0,
    };

    async function FuncionData()  {
      await callApi(urlKrakenService, 'POST', data6, (res) => {
        setDatosmaterial(res.Result0);
      });

      callApi(urlKrakenService, 'POST', data7, (res) => {
        setsubalmacenes(res.Result0);
      });
    }
    /* eslint-enable */
    if(props.NomMotivoEntrada===9){
    if (idmaterial > 0) {
      FuncionData()
    }
  }

  if(props.NomMotivoEntrada===3){
    if (idmaterial > 0) {
      callApi(urlKrakenService, 'POST', data31, (res) => {
        setDatosmaterial(res.Result0);
      });

      callApi(urlKrakenService, 'POST', data32, (res) => {
        setsubalmacenes(res.Result0);
      });
    }
  }
  }, [idmaterial]);

  // Función para cambio de material en el wizard
  const onValueChanged = (e) => {
    setidmaterial(e.value);
    setsubalmacen(0);
    setnombrematerial(e.component.option('text').split('-').pop());
  };


  const handleTodos = (event) => {
    setTodos(event.target.checked ? 1 : 0)
    setidmaterial(0)
    setsubalmacen(0)
  };

  // Función para cambio a pesaje parcial
  const useCheckbox = (e) => {
    if (props.ro.EsPesajeParcial === 1) {
      false;
    } else {
      setpesajeparcial(e.target.checked ? 1 : 0);
      setkilos(0);
      setcantidad(0);
    }
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
  const handlecantidad = (event) => {
    setcantidad(event.target.value);
  };
  

  const handlerazoncont = (event) => {
    setrazoncont(event.value);
  };

  const handlekilos = (event) => {
    setkilos(event.target.value);
  };

  const handleporcentajer = (event) => {
    setporcentajer(event.target.value);
  };

  const handlecont = (event) => {
    setkiloscont(event.target.value);
    setNantCont(0)
  };

  const handleobservaciones = (event) => {
    setobservaciones(event.target.value);
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
    setidmaterial(0);
  };

  const safebote = () => {
    setkilos(kilosbotes);
    setcantidad(kilosbotes);
    setidmaterial(0);
    setIsNext(!isNext);
  };



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
        ',@pnClaArticuloCompra=' +
        idmaterial +
        ',@pnClaSubAlmacenCompra=' +
        subalmacen +
        ',@psNomSubAlmacenCompra=' +
        nomsubalmacen +
        ',@pnIdBoleta=' +
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
        ',@pnClaMaterialRecibeTraspaso=' +
        idmaterial +
        ',@pnClaSubAlmacenTraspaso=' +
        subalmacen +
        ',@psNomSubAlmacenTraspaso=' +
        nomsubalmacen +
        ',@pnIdBoleta=' +
        props.placadato[0].IdBoleta +
        '"}',
      tipoEstructura: 0,
    };
    /* eslint-enable */

    if (subalmacen > 0 && nomsubalmacen) {
      if(props.NomMotivoEntrada===9){
      callApi(urlKrakenService, 'POST', data8, (res) => {
        setReferencia(res.Result0[0].ClaReferenciaCompra);
      });
    }
      else if(props.NomMotivoEntrada===3){
      callApi(urlKrakenService, 'POST', data33, (res) => {
        setReferencia(res.Result0[0].ClaReferenciaTraspaso);
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

  // Función que elimina material que el usuario desee (Se usa el parámetro de AccionSP = 3 para eliminar)
  // Servicio JSON 12 --> SP= BasSch.BasRegistraMaterialClasEntCompraMatPrimaProc <Registra material a clasificar>

  const handledelete = () => {
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;

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
        props.ro.ClaReferenciaCompra +
        ',@pnIdRenglon=' +
        props.ro.IdRenglon +
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
        props.ClaViajeOrigen +
        ',@pnClaUbicacionOrigen='+
        props.ClaUbicacionOrigen +
        ',@pnIdRenglonRecepcion=' +
        (props.ro.IdRenglonRecepcion ? props.ro.IdRenglonRecepcion : 0) +
        ',@pnIdFabricacion=' +
        (props.ro.IdFabricacion ? props.ro.IdFabricacion : 0) +
        ',@pnIdFabricacionDet=' +
        (props.ro.IdFabricacionDet ? props.ro.IdFabricacionDet : 0) +
        ',@pnClaArticuloRemisionado=' +
        (props.ro.ClaArticuloRemisionado ? props.ro.ClaArticuloRemisionado : 0) +
        ',@pnCantRemisionada=' +
        (props.ro.CantRemisionada ? props.ro.CantRemisionada : 0)+
        ',@pnClaMaterialRecibeTraspaso=' +
        (props.ro.ClaMaterialRecibeTraspaso ? props.ro.ClaMaterialRecibeTraspaso : idmaterial) +
        ',@pnCantRecibida=' +
        (cantidad === '' ? 0 : kilos > 0 ? kilos / props.ro.PesoTeoricoRecibido : cantidad) +
        ',@pnPesoRecibido=' +
        (kilos === '' ? 0 : cantidad > 0 ? cantidad * props.ro.PesoTeoricoRecibido : kilos) +
        ',@pnPorcentajeMaterial=' +
        (porcentajer === '' ? 0 : porcentajer) +
        ',@pnPesoTaraRecibido=' +
        (props.ro.PesoTaraRecibido !== null ? props.ro.PesoTaraRecibido : 0) +
        ',@pnClaAlmacen=' +
        (props.ro.ClaAlmacen ? props.ro.ClaAlmacen : 1) +
        ',@pnClaSubAlmacenTraspaso=' +
        (props.ro.ClaSubAlmacenTraspaso !== null ? props.ro.ClaSubAlmacenTraspaso : subalmacen) +
        ',@pnClaSubSubAlmacen=' +
        (props.ro.ClaSubSubAlmacen !==null ? props.ro.ClaSubSubAlmacen : 0) +
        ',@pnClaSeccion=' +
        (props.ro.ClaSeccion !== null ? props.ro.ClaSeccion : 0) +
        ',@psReferencia1='+(props.ro.Referencia1 !== null ? props.ro.Referencia1 : 0)+
        ',@psReferencia2='+(props.ro.Referencia2 !== null ? props.ro.Referencia2 : 0)+
        ',@psReferencia3='+(props.ro.Referencia3 !== null ? props.ro.Referencia3 : 0)+
        ',@psReferencia4='+(props.ro.Referencia4 !== null ? props.ro.Referencia4 : 0)+
        ',@psReferencia5='+(props.ro.Referencia5 !== null ? props.ro.Referencia5 : 0)+
        ',@pnEsPesajeParcial=' +
        pesajeparcial  +
        ',@pnKilosReales='+(props.ro.KilosReales ? props.ro.KilosReales : 0)+
        ',@pnKilosContaminados='+
        (+ContaminacionTotal)+
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
        ',@pnAccionSp=3"}',
      tipoEstructura: 0,
    };
    /* eslint-enable */

    if(props.NomMotivoEntrada===9){
    callApi(urlKrakenService, 'POST', data12, (res) => {
      // console.log(res);
    });
  }

  if(props.NomMotivoEntrada===3){
    callApi(urlKrakenService, 'POST', data37, (res) => {
      // console.log(res);
    });
  }

    props.setpoppesaje(true);
    props.setmodaledit(false);
    props.seteditOpen(false);
    props.setrow('')
    props.setActualizar(true);
    setTimeout(() =>{
props.setActualizar(false)
    }, 50);
  };

  // Función que guarda los cambios efectuados en el material
  // Servicio JSON 11 --> SP= BasSch.BasGuardarClasEntCompraMatPrimaProc <Guarda clasificación>
  // Servicio JSON 12 --> SP= BasSch.BasRegistraMaterialClasEntCompraMatPrimaProc <Registra material a clasificar>
  const handleClose = () => {
    props.setpoppesaje(true);
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;

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
        ',@psObservaciones='+ observaciones +',@pnEsRevisionEfectuada=' +
        (props.placadato[0].EsRevisionEfectuada ? props.placadato[0].EsRevisionEfectuada:0) +
        ',@pnClaTipoClasificacion=' +
        props.placadato[0].ClaTipoClasificacion +
        ',@pnEsNoCargoDescargoMaterial=' +
        props.placadato[0].EsNoCargoDescargoMaterial +
        ',@psNombrePcMod=' +
        ipadress +
        ',@pnClaUsuarioMod=' +
        NumbUsuario +
        ',@psOrigen=WEB"}',
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
        ( props.ro.ClaArticuloCompra ? props.ro.ClaArticuloCompra : idmaterial) +
        ',@pnCantidadMaterial=' +
        (cantidad === '' ? 0 : kilos > 0 ? kilos / Datosmaterial !==0 ? Datosmaterial[0].PesoTeoricoKgs: 1 : cantidad) +
        ',@pnKilosMaterial=' +
        (kilos === '' ? 0 : cantidad > 0 ? cantidad * Datosmaterial !==0 ? Datosmaterial[0].PesoTeoricoKgs:1 : kilos) +
        ',@pnKilosReales=' +
        (props.ro.KilosReales ? props.ro.KilosReales : 0) +
        ',@pnKilosContaminados=' +
         (+ContaminacionTotal + +kiloscont + +NantCont)+
        ',@pnKilosDocumentados=' +
        (props.ro.KilosDocumentados ? props.ro.KilosDocumentados : 0) +
        ',@pnPorcentajeMaterial=' +
        (porcentajer === '' ? 0 : porcentajer) +
        ',@pnEsPesajeParcial=' +
        (props.ro.EsPesajeParcial ? props.ro.EsPesajeParcial : pesajeparcial) +
        ',@pnClaAlmacen=' +
        (props.ro.ClaAlmacen ? props.ro.ClaAlmacen : 1) +
        ',@pnClaSubAlmacenCompra=' +
        (props.ro.ClaSubAlmacenCompra !== null ? props.ro.ClaSubAlmacenCompra : subalmacen) +
        ',@pnClaMotivoContaminacion=' +
        (ContaminacionTotal>0 && (kiloscont<1 &&NantCont<1) ? 6 : razoncont) +
        ',@pnEsNoCargoDescargoMaterial=' +
        props.placadato[0].EsNoCargoDescargoMaterial +
        ',@pnClaProveedor=' +
        props.placadato[0].ClaProveedor +
        ',@pnIdListaPrecio=' +
        props.placadato[0].IdListaPrecio +
        ',@pnClaTipoOrdenCompra=,@pnClaOrdenCompra=,@pnClaUbicacionProveedor=' +
        props.placadato[0].ClaUbicacionProveedor +
        ',@psClaReferenciaCompra=' +
        Referencia +
        ',@pnIdRenglon=' +
        (props.ro.IdRenglon ? props.ro.IdRenglon : 1) +
        ',@pnClaArticuloPreReg=' +
        (props.ro.ClaArticuloPreReg ? props.ro.ClaArticuloPreReg : '') +
        ',@psClaContaminantes=1|2|3|4|5|6|,@psValorContaminantes=' +
         Bollas +'|'+ Cilindro + '|' + Tanque + '|' +LlantasChico + '|' +LlantasMediano +  '|' +LlantasGrande +
        '|,@psNombrePcMod=' +
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
        (props.placadato[0].PesoDocumentado ? props.placadato[0].PesoDocumentado :0) +
        ',@psObservaciones=' +
        observaciones +
        ',@pnEsRevisionEfectuada=' +
        (props.placadato[0].EsRevisionEfectuada ? props.placadato[0].EsRevisionEfectuada:0) +
        ',@pnClaTipoClasificacion=' +
        props.placadato[0].ClaTipoClasificacion +
        ',@pnEsNoCargoDescargoMaterial=' +
        props.placadato[0].EsNoCargoDescargoMaterial +
        ',@psNombrePcMod=' +
        ipadress +
        ',@pnClaUsuarioMod=' +
        NumbUsuario +
        ',@pnAccionSp=,@psOrigen=WEB"}',
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
        ',@pnIdRenglonRecepcion=' +
        (props.ro.IdRenglonRecepcion ? props.ro.IdRenglonRecepcion : 0) +
        ',@pnIdFabricacion=' +
        (props.ro.IdFabricacion ? props.ro.IdFabricacion : 0) +
        ',@pnIdFabricacionDet=' +
        (props.ro.IdFabricacionDet ? props.ro.IdFabricacionDet : 0) +
        ',@pnClaArticuloRemisionado=' +
        (props.ro.ClaArticuloRemisionado ? props.ro.ClaArticuloRemisionado : 0) +
        ',@pnCantRemisionada=' +
        (props.ro.CantRemisionada ? props.ro.CantRemisionada : 0)+
        ',@pnClaMaterialRecibeTraspaso=' +
        (idmaterial) +
        ',@pnCantRecibida=' +
        (cantidad === '' ? 0 : kilos > 0 ? kilos / props.ro.PesoTeoricoRecibido : cantidad) +
        ',@pnPesoRecibido=' +
        (kilos === '' ? 0 : cantidad > 0 ? cantidad * props.ro.PesoTeoricoRecibido : kilos) +
        ',@pnPorcentajeMaterial=' +
        (porcentajer === '' ? 0 : porcentajer) +
        ',@pnPesoTaraRecibido=' +
        (props.ro.PesoTaraRecibido !== null ? props.ro.PesoTaraRecibido : 0) +
        ',@pnClaAlmacen=' +
        (props.ro.ClaAlmacen ? props.ro.ClaAlmacen : 1) +
        ',@pnClaSubAlmacenTraspaso=' +
        (props.ro.ClaSubAlmacenTraspaso !== null ? props.ro.ClaSubAlmacenTraspaso : subalmacen) +
        ',@pnClaSubSubAlmacen=' +
        (props.ro.ClaSubSubAlmacen !==null ? props.ro.ClaSubSubAlmacen : 0) +
        ',@pnClaSeccion=' +
        (props.ro.ClaSeccion !== null ? props.ro.ClaSeccion : 0) +
        ',@psReferencia1='+(props.ro.Referencia1 !== null ? props.ro.Referencia1 : 0)+
        ',@psReferencia2='+(props.ro.Referencia2 !== null ? props.ro.Referencia2 : 0)+
        ',@psReferencia3='+(props.ro.Referencia3 !== null ? props.ro.Referencia3 : 0)+
        ',@psReferencia4='+(props.ro.Referencia4 !== null ? props.ro.Referencia4 : 0)+
        ',@psReferencia5='+(props.ro.Referencia5 !== null ? props.ro.Referencia5 : 0)+
        ',@pnEsPesajeParcial=' +
        pesajeparcial  +
        ',@pnKilosReales='+(props.ro.KilosReales ? props.ro.KilosReales : 0)+
        ',@pnKilosContaminados='+
        (+ContaminacionTotal + +kiloscont +NantCont)+
        ',@pnClaMotivoContaminacion='+
        (ContaminacionTotal>0 && (kiloscont<1 &&NantCont<1) ? 6 : razoncont) +
        ',@pnClaReferenciaTraspaso=' +
        Referencia +
        ',@psClaContaminantes=1|2|3|4|5|6|,@psValorContaminantes=' +
        Bollas +'|'+ Cilindro + '|' + Tanque + '|' +LlantasChico + '|' +LlantasMediano +  '|' +LlantasGrande +
        '|,@pnEsNoCargoDescargoMaterial=' +
        props.placadato[0].EsNoCargoDescargoMaterial +
        ',@psNombrePcMod=' +
        ipadress +
        ',@pnClaUsuarioMod=' +
        NumbUsuario +
        ',@pnAccionSp=1"}',
      tipoEstructura: 0,
    };
    /* eslint-enable */

    if(props.NomMotivoEntrada===9){
    callApi(urlKrakenService, 'POST', data11, (res) => {
      // console.log(res);
    });
    callApi(urlKrakenService, 'POST', data12, (res) => {
      // console.log(res);
    })

      Rowies && Rowies.forEach((element,index)=> {
      /* eslint-disable */
      const data121 = {
        parameters:
          '{"ClaUbicacion":' +
          props.editBoxValue +
          ',"ClaServicioJson":12,"Parametros":"@pnClaUbicacion=' +
          props.editBoxValue +
          ',@pnIdBoleta=' +
          props.placadato[0].IdBoleta +
          ',@pnClaArticuloCompra=' +
          element.ClaArticuloCompra +
          ',@pnCantidadMaterial=' +
          element.CantidadMaterial+
          ',@pnKilosMaterial=' +
          element.KilosMaterial +
          ',@pnKilosReales=' +
          element.KilosReales +
          ',@pnKilosContaminados=' +
          element.KilosContaminados+
          ',@pnKilosDocumentados=' +
          element.KilosDocumentados +
          ',@pnPorcentajeMaterial=' +
          element.PorcentajeMaterial +
          ',@pnEsPesajeParcial=' +
          element.EsPesajeParcial +
          ',@pnClaAlmacen=' +
          element.ClaAlmacen +
          ',@pnClaSubAlmacenCompra=' +
          element.ClaSubAlmacenCompra +
          ',@pnClaMotivoContaminacion=' +
          (element.ClaMotivoContaminacion ? element.ClaMotivoContaminacion: '') +
          ',@pnEsNoCargoDescargoMaterial=' +
          props.placadato[0].EsNoCargoDescargoMaterial +
          ',@pnClaProveedor=' +
          props.placadato[0].ClaProveedor +
          ',@pnIdListaPrecio=' +
          props.placadato[0].IdListaPrecio +
          ',@pnClaTipoOrdenCompra=,@pnClaOrdenCompra=,@pnClaUbicacionProveedor=' +
          props.placadato[0].ClaUbicacionProveedor +
          ',@psClaReferenciaCompra=' +
          element.ClaReferenciaCompra +
          ',@pnIdRenglon=' +
          (element.IdRenglon ? element.IdRenglon : 1) +
          ',@pnClaArticuloPreReg=' +
          (element.ClaArticuloPreReg ? element.ClaArticuloPreReg : '') +
          ',@psNombrePcMod=' +
          ipadress +
          ',@pnClaUsuarioMod=' +
          NumbUsuario +
          ',@pnAccionSp="}',
        tipoEstructura: 0,
      };

    /* eslint-enable */
    if(props.TipoPatio ===4 && index<2){
    callApi(urlKrakenService, 'POST', data121, (res) => {
      // console.log(res);
    })
      }
    
    if(props.TipoPatio ===9 && index<14){
    callApi(urlKrakenService, 'POST', data121, (res) => {
      // console.log(res);
    })
      }
    })
    ;}


      async function FuncionData(){
      await
      console.log(data36)
       callApi(urlKrakenService, 'POST', data36, (res) => {
        // console.log(res);
      });

      callApi(urlKrakenService, 'POST', data37, (res) => {
        // console.log(res);
      });

        /* eslint-disable */
        if((Rowies.length===1 || Rowies.length===2) && Rowies[0].ClaMaterialRecibeTraspaso){
          const data371 = {
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
              ',@pnIdRenglonRecepcion=' +
              (Rowies[0].IdRenglonRecepcion ? Rowies[0].IdRenglonRecepcion : 0) +
              ',@pnIdFabricacion=' +
              (Rowies[0].IdFabricacion ? Rowies[0].IdFabricacion : 0) +
              ',@pnIdFabricacionDet=' +
              (Rowies[0].IdFabricacionDet ? Rowies[0].IdFabricacionDet : 0) +
              ',@pnClaArticuloRemisionado=' +
              (Rowies[0].ClaArticuloRemisionado ? Rowies[0].ClaArticuloRemisionado : 0) +
              ',@pnCantRemisionada=' +
              (Rowies[0].CantRemisionada ? Rowies[0].CantRemisionada : 0)+
              ',@pnClaMaterialRecibeTraspaso=' +
              Rowies[0].ClaMaterialRecibeTraspaso +
              ',@pnCantRecibida=' +
              Rowies[0].CantRecibida +
              ',@pnPesoRecibido=' +
              Rowies[0].PesoRecibido +
              ',@pnPorcentajeMaterial=' +
              Rowies[0].PorcentajeMaterial +
              ',@pnPesoTaraRecibido=' +
              (Rowies[0].PesoTaraRecibido !== null ? Rowies[0].PesoTaraRecibido : 0) +
              ',@pnClaAlmacen=' +
              (Rowies[0].ClaAlmacen ? Rowies[0].ClaAlmacen : 1) +
              ',@pnClaSubAlmacenTraspaso=' +
              Rowies[0].ClaSubAlmacenTraspaso +
              ',@pnClaSubSubAlmacen=' +
              (Rowies[0].ClaSubSubAlmacen !==null ? Rowies[0].ClaSubSubAlmacen : 0) +
              ',@pnClaSeccion=' +
              (Rowies[0].ClaSeccion !== null ? Rowies[0].ClaSeccion : 0) +
              ',@psReferencia1='+(Rowies[0].Referencia1 !== null ? Rowies[0].Referencia1 : 0)+
              ',@psReferencia2='+(Rowies[0].Referencia2 !== null ? Rowies[0].Referencia2 : 0)+
              ',@psReferencia3='+(Rowies[0].Referencia3 !== null ? Rowies[0].Referencia3 : 0)+
              ',@psReferencia4='+(Rowies[0].Referencia4 !== null ? Rowies[0].Referencia4 : 0)+
              ',@psReferencia5='+(Rowies[0].Referencia5 !== null ? Rowies[0].Referencia5 : 0)+
              ',@pnEsPesajeParcial=' +
              Rowies[0].EsPesajeParcial  +
              ',@pnKilosReales='+(Rowies[0].KilosReales ? Rowies[0].KilosReales : 0)+
              ',@pnKilosContaminados='+
                Rowies[0].KilosContaminados+
              ',@pnClaMotivoContaminacion='+
              (Rowies[0].ClaMotivoContaminacion ? Rowies[0].ClaMotivoContaminacion : '') +
              ',@pnClaReferenciaTraspaso=' +
              Rowies[0].ClaReferenciaTraspaso +
              ',@psClaContaminantes=1|2|3|4|5|6|,@psValorContaminantes=' +
              Bollas2 +'|'+ Cilindro2 + '|' + Tanque2 + '|' +LlantasChico2 + '|' +LlantasMediano2 +  '|' +LlantasGrande2 +
              '|,@pnEsNoCargoDescargoMaterial=' +
              props.placadato[0].EsNoCargoDescargoMaterial +
              ',@psNombrePcMod=' +
              ipadress +
              ',@pnClaUsuarioMod=' +
              NumbUsuario +
              ',@pnAccionSp=1"}',
            tipoEstructura: 0,
          };
             /* eslint-enable */
          callApi(urlKrakenService, 'POST', data371, (res) => {
            // console.log(res);
          });
        }

          /* eslint-disable */
      if(Rowies.length===2 && Rowies[1].ClaMaterialRecibeTraspaso){
        const data372 = {
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
            ',@pnIdRenglonRecepcion=' +
            (Rowies[1].IdRenglonRecepcion ? Rowies[1].IdRenglonRecepcion : 0) +
            ',@pnIdFabricacion=' +
            (Rowies[1].IdFabricacion ? Rowies[1].IdFabricacion : 0) +
            ',@pnIdFabricacionDet=' +
            (Rowies[1].IdFabricacionDet ? Rowies[1].IdFabricacionDet : 0) +
            ',@pnClaArticuloRemisionado=' +
            (Rowies[1].ClaArticuloRemisionado ? Rowies[1].ClaArticuloRemisionado : 0) +
            ',@pnCantRemisionada=' +
            (Rowies[1].CantRemisionada ? Rowies[1].CantRemisionada : 0)+
            ',@pnClaMaterialRecibeTraspaso=' +
            Rowies[1].ClaMaterialRecibeTraspaso +
            ',@pnCantRecibida=' +
            Rowies[1].CantRecibida +
            ',@pnPesoRecibido=' +
            Rowies[0].PesoRecibido +
            ',@pnPorcentajeMaterial=' +
            Rowies[0].PorcentajeMaterial +
            ',@pnPesoTaraRecibido=' +
            (Rowies[1].PesoTaraRecibido !== null ? Rowies[1].PesoTaraRecibido : 0) +
            ',@pnClaAlmacen=' +
            (Rowies[1].ClaAlmacen ? Rowies[1].ClaAlmacen : 1) +
            ',@pnClaSubAlmacenTraspaso=' +
            Rowies[1].ClaSubAlmacenTraspaso +
            ',@pnClaSubSubAlmacen=' +
            (Rowies[1].ClaSubSubAlmacen !==null ? Rowies[1].ClaSubSubAlmacen : 0) +
            ',@pnClaSeccion=' +
            (Rowies[1].ClaSeccion !== null ? Rowies[1].ClaSeccion : 0) +
            ',@psReferencia1='+(Rowies[1].Referencia1 !== null ? Rowies[1].Referencia1 : 0)+
            ',@psReferencia2='+(Rowies[1].Referencia2 !== null ? Rowies[1].Referencia2 : 0)+
            ',@psReferencia3='+(Rowies[1].Referencia3 !== null ? Rowies[1].Referencia3 : 0)+
            ',@psReferencia4='+(Rowies[1].Referencia4 !== null ? Rowies[1].Referencia4 : 0)+
            ',@psReferencia5='+(Rowies[1].Referencia5 !== null ? Rowies[1].Referencia5 : 0)+
            ',@pnEsPesajeParcial=' +
            Rowies[1].EsPesajeParcial  +
            ',@pnKilosReales='+(Rowies[1].KilosReales ? Rowies[1].KilosReales : 0)+
            ',@pnKilosContaminados='+
              Rowies[1].KilosContaminados+
            ',@pnClaMotivoContaminacion='+
            (Rowies[1].ClaMotivoContaminacion ? Rowies[1].ClaMotivoContaminacion : '') +
            ',@pnClaReferenciaTraspaso=' +
            Rowies[1].ClaReferenciaTraspaso +
            ',@psClaContaminantes=1|2|3|4|5|6|,@psValorContaminantes=' +
            Bollas2 +'|'+ Cilindro2 + '|' + Tanque2 + '|' +LlantasChico2 + '|' +LlantasMediano2 +  '|' +LlantasGrande2 +
            '|,@pnEsNoCargoDescargoMaterial=' +
            props.placadato[0].EsNoCargoDescargoMaterial +
            ',@psNombrePcMod=' +
            ipadress +
            ',@pnClaUsuarioMod=' +
            NumbUsuario +
            ',@pnAccionSp=1"}',
          tipoEstructura: 0,
        };
           /* eslint-enable */
        callApi(urlKrakenService, 'POST', data372, (res) => {
          // console.log(res);
        });
      }
    }
    if(props.NomMotivoEntrada===3){
      FuncionData()
    }

    props.seteditOpen(false);
    props.setpesajeparcial(pesajeparcial);
    props.setmodaledit(false);
    props.setrow('')
    props.setActualizar(true);
    setTimeout(() =>{
props.setActualizar(false)
    }, 50);
  };
 
  // Función para cambiar del paso 1 (Clasificación de Material) & paso 2 (Contaminación)
  const handleBack = () => {
    props.setpoppesaje(true);
    props.setmodaledit(false);
  };

  // Componente de botes y electrodomésticos para el respectivo material
  function Contelements({ contaminante }) {
    const [valor, setvalor] = useState(0);
    const Kilos = valor * contaminante.peso;

    const handlesum = (event) => {
      if(NantCont!==0){
        setNantCont(0)
        setkiloscont(NantCont)}
      event.preventDefault();
      if(NantCont>0){
      setNantCont(0)}
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
      if(NantCont!==0){
        setNantCont(0)
        setkiloscont(NantCont)}
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
      if(NantCont!==0){
      setNantCont(0)
      setkiloscont(NantCont)}
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
  // Componente de botes y electrodomésticos para el respectivo material
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
                    disabled={disabled}
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
                    disabled={disabled}
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
                    disabled={disabled}
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
                    disabled={disabled}
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
                    disabled={disabled}
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
                    disabled={disabled}
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
                    disabled={disabled}
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
                    disabled={disabled}
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
                    disabled={disabled}
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
                    disabled={disabled}
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
                    disabled={disabled}
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
                    disabled={disabled}
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
        idmaterial === 49838 ? (
          <Botes />
        ) : (
          <div className="box">
            <span className="close-icon" onClick={handleBack}>
              x
            </span>
            <CardHeader style={{ paddingTop: '25px', color: '#002c6f' }}>
              <Row style={{marginLeft:"0px"}}>[1] Clasificación Material</Row>
              {props.NomMotivoEntrada=== 3 && Todos===1 && <Row style={{marginLeft:"0px"}}><span className="Todos-materiales"><WarningIcon /> Seleccionar material fuera de lista autorizada, requiere autorización de Jefe de Operación para dar salida.</span></Row>}
            </CardHeader>
            <Container fluid={true}>
              <Row className="popup-row" style={{ marginTop: '10px' }}>
                <Col>
                  <Row className="popup-title">Material Enviado</Row>
                  <Row>
                    {props.NomMotivoEntrada=== 9 ? props.ro.NomArticuloPreReg ? props.ro.NomArticuloPreReg.split('-').pop() : 0 : props.NomMotivoEntrada=== 3 ? props.ro.NomArticuloRemisionado ? props.ro.NomArticuloRemisionado.split('-').pop() : 0 : 0}
                  </Row>
                </Col>
                <Row
                  style={{
                    color: 'red',
                    position: 'absolute',
                    marginTop: '68px',
                    marginLeft: '52%',
                  }}
                  className="warning"
                >
                  <span style={{ color: 'red !important' }}>
                    {idmaterial < 1 ? 'Seleccionar material' : null}
                  </span>
                </Row>
                <Col className="selector">
                  <Row className="popup-title" style={{ marginLeft: '0px' }}>
                    <Col style={{paddingLeft:"0px", paddingRight: "0px"}}>Material Recibido</Col>
                    <Col>
                      <FormGroup>
                        {props.NomMotivoEntrada===3 && <FormControlLabel style={{height: "27px"}} control={<IOSSwitch checked={Todos === 1} onChange={handleTodos} name="checkedB" />} label="Ver Todos" />}
                      </FormGroup>
                    </Col>
                  </Row>
                  {(materiales || materialtodos) &&
                  (
                  <SelectBox
                    dataSource={props.NomMotivoEntrada=== 9 ? materiales:props.NomMotivoEntrada=== 3 ? Todos===1 ? props.materialpt : materiales : ''}
                    searchEnabled={true}
                    defaultValue={idmaterial}
                    displayExpr={props.NomMotivoEntrada=== 9 ? "NomArticuloCompra": props.NomMotivoEntrada=== 3 ? Todos===1 ? "NomMaterialRecibeTraspaso":"NomArticuloCompra" :''}
                    valueExpr={props.NomMotivoEntrada=== 9 ? "ClaArticuloCompra": props.NomMotivoEntrada=== 3 ? Todos===1 ?"ClaMaterialRecibeTraspaso": "ClaArticuloCompra" :''}
                    placeholder="Seleccionar Material.."
                    onValueChanged={onValueChanged}
                    disabled={props.ro.EsPesajeParcial === 1 && props.ro.KilosMaterial !== 0}
                  />
                  )}
                </Col>
              </Row>
              <Row className="popup-row">
                <Col>
                  <Row className="popup-title">Cantidad Enviada</Row>
                  <Row>{props.NomMotivoEntrada=== 9 ? props.ro.KgsMaterialPrereg ? props.ro.KgsMaterialPrereg : '0':props.NomMotivoEntrada=== 3 ? props.ro.CantRemisionada ? props.ro.CantRemisionada : '0':'0'}&nbsp;{Datosmaterial ? Datosmaterial[0].NomUnidad : ' '}</Row>
                </Col>
                <Col>
                  <Row className="popup-title" style={{ marginLeft: '0px' }}>
                    Cantidad Recibida
                  </Row>
                  <InputGroup>
                    <Input
                      className="popup-recibidos"
                      onChange={handlecantidad}
                      value={
                        pesajeparcial === 1 || props.ro.EsPesajeParcial === 1
                          ? 0
                          : kilos > 0 && Datosmaterial
                          ? kilos /(props.NomMotivoEntrada===9 ? Datosmaterial!==0 ? Datosmaterial[0].PesoTeoricoKgs : 1 : props.NomMotivoEntrada===3 ? Datosmaterial!==0 ? Datosmaterial[0].PesoTeoricoRecibido: 1 : 1)
                          : cantidad
                      }
                      disabled={
                        pesajeparcial === 1 ||
                        props.ro.EsPesajeParcial === 1 ||
                        porcentajer > 0 ||
                        kilos > 0
                      }
                      type="number"
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
                  <Row>{props.NomMotivoEntrada=== 9 ? props.ro.KgsMaterialPrereg ? props.ro.KgsMaterialPrereg : '0':props.NomMotivoEntrada=== 3 ? props.ro.PesoRemisionado ? props.ro.PesoRemisionado : '0':'0'}&nbsp; kgs</Row>
                </Col>
                <Col>
                  <Row className="popup-title" style={{ marginLeft: '0px' }}>
                    Kilos Recibidos
                  </Row>
                  <InputGroup>
                    <Input
                      className="popup-recibidos"
                      onChange={handlekilos}
                      value={
                        pesajeparcial === 1 || props.ro.EsPesajeParcial === 1
                          ? 0
                          : cantidad > 0 && Datosmaterial
                          ? cantidad *(props.NomMotivoEntrada===9 ? Datosmaterial=== 0 ? 1 : Datosmaterial[0].PesoTeoricoKgs: props.NomMotivoEntrada===3 ? Datosmaterial=== 0 ? 1 : Datosmaterial[0].PesoTeoricoRecibido: 1)
                          : kilos
                      }
                      disabled={
                        pesajeparcial === 1 ||
                        props.ro.EsPesajeParcial === 1 ||
                        cantidad > 0 ||
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
                        onChange={handleporcentajer}
                        value={
                          pesajeparcial === 1 || props.ro.EsPesajeParcial === 1 ? 100 : porcentajer
                        }
                        disabled={
                          pesajeparcial === 1 ||
                          props.ro.EsPesajeParcial === 1 ||
                          cantidad > 0 ||
                          kilos > 0
                        }
                        type="number"
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>%</InputGroupText>
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
                      checked={pesajeparcial === 1 || props.ro.EsPesajeParcial === 1}
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
                    <Input className="popup-recibidos" onChange={handleobservaciones} defaultValue={observaciones} type="text" />
                  </Row>
                </Col>
              </Row>
              <Row className="popup-row">
                <Col>
                  <Row className="popup-title">
                    {/* <Col>Almacén</Col>
                    <Col>
                      <Row>{props.ro.ClaAlmacen ? props.ro.ClaAlmacen : almacen}</Row>
                    </Col> */}
                  </Row>
                </Col>
                <Col>
                  <Row className="popup-title">
                    <Col>Subalmacén</Col>
                    <Col>
                      <Row>
                        {subalmacenes &&
                        (
                        <SelectBox
                          dataSource={subalmacenes}
                          defaultValue={subalmacen}
                          displayExpr={props.NomMotivoEntrada===9 ? "NomSubAlmacenCompra": props.NomMotivoEntrada===3 ? "NomSubAlmacenTraspaso":0}
                          valueExpr={props.NomMotivoEntrada===9 ? "ClaSubAlmacenCompra": props.NomMotivoEntrada===3 ? "ClaSubAlmacenTraspaso":0}
                          placeholder="Seleccionar Subalmacen.."
                          onValueChanged={handlesubalmacen}
                          noDataText="Selecciona Material"
                          disabled={subalmacenes.length === 1 || props.ro.EsPesajeParcial === 1 && props.ro.KilosMaterial !== 0}
                        />
                        )}
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
                          {idmaterial > 1 && subalmacen === 0 ? 'Selecciona subalmacen' : null}
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
                className="popup-delete"
                onClick={handledelete}
              >
                <i className="fas fa-trash-alt"></i> Eliminar
              </button>
              <button
                style={{ marginRight: '30px' }}
                type="button"
                className="popup-button"
                onClick={
                  PorcentajeSum > 100 || idmaterial < 1 || subalmacen < 1 || Datosmaterial===0 || ((kilos===0 || kilos==='') && (cantidad===0 || cantidad==='') && (porcentajer===0 || porcentajer==='') && (pesajeparcial===0)) ? null : togglePopup2
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
                <Col>{+ContaminacionTotal + +kiloscont}</Col>
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
                <Col>{+Otros }</Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
            </div>
          </CardHeader>
          <Container fluid={true}>
            <Row className="popup-row" style={{ marginTop: '40px',height:'80px',marginLeft:"7%"}}>
              <Col>
                <Row className="popup-title">Material Recibido</Row>
                <Row>{nombrematerial}</Row>
              </Col>
              <Col>
                <Row className="popup-title" style={{ marginLeft: '0px' }}>
                  Cantidad Recibida
                </Row>
                <Row className="popup-elem" style={{ marginLeft: '0px' }}>
                  {props.ro.EsPesajeParcial === 1 || pesajeparcial === 1
                    ? '--'
                    : cantidad === ''
                    ? 0
                    : kilos > 0
                    ? kilos / (props.NomMotivoEntrada===9 ? Datosmaterial !== 0 ? Datosmaterial[0].PesoTeoricoKgs : 1 : props.NomMotivoEntrada===3 ? Datosmaterial !== 0 && Datosmaterial[0].PesoTeoricoRecibido: 1)
                    : cantidad}
                  &nbsp;
                  {props.NomMotivoEntrada===9 ? Datosmaterial!== 0 ? Datosmaterial[0].NomUnidad : ' ':props.NomMotivoEntrada===3 ? Datosmaterial!== 0 ? Datosmaterial[0].NomUnidadRecibido : ' ' : ''}
                </Row>
              </Col>
              <Col>
                <Row className="popup-title" style={{ marginLeft: '0px' }}>
                  Kilos Recibidos
                </Row>
                <Row className="popup-elem" style={{ marginLeft: '0px' }}>
                  {props.ro.EsPesajeParcial === 1 || pesajeparcial === 1
                    ? '--'
                    : kilos === ''
                    ? 0
                    : cantidad > 0
                    ? cantidad * (props.NomMotivoEntrada===9 ? Datosmaterial!== 0 ? Datosmaterial[0].PesoTeoricoKgs:1 : props.NomMotivoEntrada===3 ?  Datosmaterial!== 0 ? Datosmaterial[0].PesoTeoricoRecibido: 1: 1)
                    : kilos}
                  &nbsp; kgs
                </Row>
              </Col>
              <Col>
                <Row className="popup-title" style={{ marginLeft: '0px' }}>
                  Porcentaje
                </Row>
                <Row className="popup-elem" style={{ marginLeft: '0px' }}>
                  {props.ro.EsPesajeParcial === 1 || pesajeparcial === 1
                    ? '--'
                    : porcentajer === ''
                    ? 0
                    : porcentajer}
                  &nbsp;%
                </Row>
              </Col>
            </Row>
            <Row className="popup-row">
              <Col>
                <Row className="popup-title" style={{ marginLeft: '50%', marginTop: '20px' }}>
                  Kilos Contaminados
                </Row>
                <InputGroup style={{ width: '50%',marginLeft: '50%' }}>
                  <Input
                    className="popup-recibidos"
                    type="number"
                    defaultValue={NantCont}
                    onChange={handlecont}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>kgs</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Col>
              <Col>
                <Row className="popup-title" style={{ marginLeft: '0px', marginTop: '20px' }}>
                  Motivo Contaminacion
                </Row>
                {contaminaciones &&
                (
                <SelectBox
                  dataSource={contaminaciones}
                  searchEnabled={true}
                  defaultValue={props.ro.ClaMotivoContaminacion}
                  displayExpr="NomMotivoContaminacion"
                  valueExpr="ClaMotivoContaminacion"
                  onValueChanged={handlerazoncont}
                  disabled={kiloscont < 1 && NantCont<1}
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
          <div style={{ marginTop: '70px' }}>
            <button
              style={{ marginRight: '30px' }}
              type="button"
              className="popup-button"
              onClick={(kiloscont > 0 && razoncont < 1) || (+Llantas + +Tanques > 500)||(ContTotal >500) ? null : handleClose}
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

export default Material;
