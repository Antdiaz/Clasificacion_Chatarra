import React, { useState, useEffect, useRef,useMemo,useCallback } from 'react';
import DataSource from "devextreme/data/data_source";
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
import { callApi,showSweetAlert, getSessionItem } from '../../utils/utils';
import { config } from '../../utils/config';
import SelectBox from 'devextreme-react/select-box';
import WarningIcon from '@material-ui/icons/Warning';
import swal from 'sweetalert';

const Material = (props) => {
  const [Todos, setTodos] = useState(0);

  // Valores dinámicos locales al editar material
  const [cantidad, setcantidad] = useState(props.ro.CantRecibida? props.ro.CantRecibida : 0);
  const [Referencia, setReferencia] = useState(0);
  const [idFabricacion, setidFabricacion] = useState(props.ro.IdFabricacion)
  const [kilos, setkilos] = useState(props.ro.KilosReales !== null ? props.ro.KilosReales : 0);
  const [observaciones, setobservaciones] = useState(props.ro.Observaciones && props.ro.Observaciones !=='undefined' ? props.ro.Observaciones:'');
  const [kilosTara, setkilosTara] = useState(props.ro.PesoTaraRecibido !== null ? props.ro.PesoTaraRecibido : 0);
  const [idmaterial, setidmaterial] = useState(props.ro.ClaMaterialRecibeTraspaso ? props.ro.ClaMaterialRecibeTraspaso : 0);
  const [nombrematerial, setnombrematerial] = useState(props.ro.NomMaterialRecibeTraspaso ? props.ro.NomMaterialRecibeTraspaso: '');
  const [kiloscont, setkiloscont] = useState(0);
  const [razoncont, setrazoncont] = useState(props.ro.ClaMotivoContaminacion ? props.ro.ClaMotivoContaminacion : 0);
  const [porcentajer, setporcentajer] = useState(props.ro.PorcentajeMaterial ? props.ro.PorcentajeMaterial : 0);
  const [pesajeparcial, setpesajeparcial] = useState(props.ro.EsPesajeParcial ? props.ro.EsPesajeParcial : 0);
  const ipadress = getSessionItem('Ipaddress');
  const NumbUsuario = getSessionItem('NumUsuario');
  const Token = getSessionItem('Token');
  const [almacen, setalmacen] = useState(props.ro.ClaAlmacen ? props.ro.ClaAlmacen :0)
  const [subalmacen, setsubalmacen] = useState( props.ro.ClaSubAlmacenTraspaso? props.ro.ClaSubAlmacenTraspaso: 0 );
  const [nomsubalmacen, setnomsubalmacen] = useState( props.ro.NomSubAlmacenTraspaso ? props.ro.NomSubAlmacenTraspaso: '');
  const [subalmacenes, setsubalmacenes] = useState(0);
  const Diferencia = props.ro.PorcentajeMaterial;
  const Diferenciacant = (props.NomMotivoEntrada===9 ? props.ro.CantidadMaterial : props.ro.CantRecibida)
  const PorcentajeSum = props.row
    ? +props.row.reduce((acc, val) => acc + val.PorcentajeMaterial, 0) + +porcentajer - +Diferencia
    : 0;
  const CantidadSum=props.row &&  props.row.reduce((acc, val) => acc + (props.NomMotivoEntrada===9 ? val.CantidadMaterial: val.CantRecibida), 0) + +cantidad - +Diferenciacant;
  const [materiales, setmateriales] = useState(props.material);
  const [Datosmaterial, setDatosmaterial] = useState(0);
  // Valores dinámicos contaminantes
  const productsDataSource = new DataSource({
    store: {
      data: props.materialpt ? props.materialpt : null,
      type: 'array',
      key: 'ID'
    },
    paginate: true,
    pageSize: 10
  });

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
  const Rowies = props.row.filter((rox) =>
    props.NomMotivoEntrada === 9
      ? rox.ClaArticuloCompra !== props.ro.ClaArticuloCompra
      : props.NomMotivoEntrada === 3 &&
        rox.ClaMaterialRecibeTraspaso !== props.ro.ClaMaterialRecibeTraspaso
  );

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
        ''+config.Separador+'@pnClaArticuloCompra=' +
        idmaterial +
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
        ''+config.Separador+'@pnClaArticuloCompra=' +
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
        ''+config.Separador+'@pnClaMaterialRecibeTraspaso=' +
        idmaterial +
        '"}',
      tipoEstructura: 0,
    };

    async function FuncionData() {

      await callApi(urlKrakenService, 'POST', data6, (res) => {
        setDatosmaterial(res.Result0);
      });

      callApi(urlKrakenService, 'POST', data7, (res) => {
        setsubalmacenes(res.Result0);
      });
    }
    /* eslint-enable */
    if (props.NomMotivoEntrada === 9) {
      if (idmaterial > 0) {
        FuncionData();
      }
    }

    if (props.NomMotivoEntrada === 3) {
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
    setalmacen(0);
    setnombrematerial(e.component.option('text').split('-').pop());
  };

  const handleTodos = (event) => {
    setTodos(event.target.checked ? 1 : 0);
    setidmaterial(0);
    setalmacen(0)
    setsubalmacen(0);
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

  // Funciones para obtener las cantidades/opciones individuales que el usuario ingrese
  const handlecantidad = (event) => {
    setcantidad(event.target.value);
  };

  const handletara = (event) => {
    setkilosTara(event.target.value);
  };

  const handlekilos = (event) => {
    setkilos(event.target.value);
  };

  const handleporcentajer = (event) => {
    setporcentajer(event.target.value);
  };

  const handlecont = (event) => {
    setkiloscont(event.target.value);
    setNantCont(0);
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
        idmaterial +
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
        idmaterial +
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
  // Función que pone valor determinado de subalmacén si es único
  
  useEffect(() => {
    if (subalmacenes.length === 1) {
      if (props.NomMotivoEntrada === 9) {
        setsubalmacen(subalmacenes[0].ClaSubAlmacenCompra);
        setnomsubalmacen(subalmacenes[0].NomSubAlmacenCompra);
      } else if (props.NomMotivoEntrada === 3) {
        setsubalmacen(subalmacenes[0].ClaSubAlmacenTraspaso);
        setnomsubalmacen(subalmacenes[0].NomSubAlmacenTraspaso);
      }
    }
  }, [subalmacenes]);

  // Función que elimina material que el usuario desee (Se usa el parámetro de AccionSP = 3 para eliminar)
  // Servicio JSON 12 --> SP= BasSch.BasRegistraMaterialClasEntCompraMatPrimaProc <Registra material a clasificar>

  const handledelete = () => {
    props.setcambio(-1)
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    const urlKrakenBloque = `${config.KrakenService}/${24}/${config.Bloque}`;
    /* eslint-disable */

    const data36 = 
    [ `@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaViajeOrigen=${props.ClaViajeOrigen}${config.Separador}@pnClaUbicacionOrigen=${props.ClaUbicacionOrigen}${config.Separador}@pnClaTransporte=${props.placadato[0].ClaTransporte}${config.Separador}@pnClaTransportista=${props.placadato[0].ClaTransportista}${config.Separador}@psNomTransportista='${props.placadato[0].NomTransportista}'${config.Separador}@psNomChofer='${(props.placadato[0].NomChofer !== null ? props.placadato[0].NomChofer: 0)}'${config.Separador}@psPlacas='${props.placadato[0].Placas}'${config.Separador}@pnPesoDocumentado=${(props.placadato[0].PesoDocumentado ? props.placadato[0].PesoDocumentado :0)}${config.Separador}@psObservaciones='${(props.placadato[0].Observaciones ? props.placadato[0].Observaciones.replace('#', '%23'): '')}'${config.Separador}@pnEsRevisionEfectuada=${(props.placadato[0].EsRevisionEfectuada ? props.placadato[0].EsRevisionEfectuada : 0)}${config.Separador}@pnClaTipoClasificacion=${props.placadato[0].ClaTipoClasificacion}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@psOrigen='WEB'`];

    const data37 = 
    [ `@@TransactionSAMP:@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaViajeOrigen=${props.ClaViajeOrigen}${config.Separador}@pnClaUbicacionOrigen=${props.ClaUbicacionOrigen}${config.Separador}@pnIdRenglonRecepcion=${(props.ro.IdRenglonRecepcion ? props.ro.IdRenglonRecepcion : '')}${config.Separador}@pnIdFabricacion=${(props.ro.IdFabricacion ? props.ro.IdFabricacion : 0)}${config.Separador}@pnIdFabricacionDet=${(props.ro.IdFabricacionDet ? props.ro.IdFabricacionDet : 0)}${config.Separador}@pnClaArticuloRemisionado=${(props.ro.ClaArticuloRemisionado ? props.ro.ClaArticuloRemisionado : 0)}${config.Separador}@pnCantRemisionada=${(props.ro.CantRemisionada ? props.ro.CantRemisionada : 0)}${config.Separador}@pnClaMaterialRecibeTraspaso=${(props.ro.ClaMaterialRecibeTraspaso ? props.ro.ClaMaterialRecibeTraspaso : idmaterial)}${config.Separador}@pnCantRecibida=${((pesajeparcial === 1 || props.ro.EsPesajeParcial === 1) && props.ro.CantRecibida >0 ?(props.ro.CantRecibida):kilos > 0 ? kilos / (Datosmaterial !==0 ? Datosmaterial[0].PesoTeoricoRecibido: 1 ):((cantidad === '' || cantidad === null ) ? 0 : cantidad))}${config.Separador}@pnPesoRecibido=${((pesajeparcial === 1 || props.ro.EsPesajeParcial === 1) && props.ro.PesoRecibido >0 ?(props.ro.PesoRecibido):cantidad > 0 ? (cantidad * (Datosmaterial !==0 ? Datosmaterial[0].PesoTeoricoRecibido:1)):(kilos === '' ? 0 : kilos))}${config.Separador}@pnPorcentajeMaterial=${porcentajer === '' ? 0 : porcentajer}${config.Separador}@pnPesoTaraRecibido=${(props.ro.PesoTaraRecibido !== null ? props.ro.PesoTaraRecibido : 0)}${config.Separador}@pnClaAlmacen=${(props.ro.ClaAlmacen ? props.ro.ClaAlmacen : 1)}${config.Separador}@pnClaSubAlmacenTraspaso=${(props.ro.ClaSubAlmacenTraspaso !== null ? props.ro.ClaSubAlmacenTraspaso : subalmacen)}${props.ro.ClaSubSubAlmacen !== null && props.ro.ClaSubSubAlmacen !== 0 ? (config.Separador+'@pnClaSubSubAlmacen='+props.ro.ClaSubSubAlmacen) : ''}${config.Separador}@pnClaSeccion=${(props.ro.ClaSeccion !== null ? props.ro.ClaSeccion : 0)}${config.Separador}@psReferencia1=${(props.ro.Referencia1 !== null ? props.ro.Referencia1 : 0)}${config.Separador}@psReferencia2=${(props.ro.Referencia2 !== null ? props.ro.Referencia2 : 0)}${config.Separador}@psReferencia3=${(props.ro.Referencia3 !== null ? props.ro.Referencia3 : 0)}${config.Separador}@psReferencia4=${(props.ro.Referencia4 !== null ? props.ro.Referencia4 : 0)}${config.Separador}@psReferencia5=${(props.ro.Referencia5 !== null ? props.ro.Referencia5 : 0)}${config.Separador}@pnEsPesajeParcial=${pesajeparcial}${config.Separador}@pnKilosReales=${(props.ro.KilosReales ? props.ro.KilosReales : 0)}${config.Separador}@pnKilosContaminados=0${config.Separador}@pnClaMotivoContaminacion=0${config.Separador}@pnClaReferenciaTraspaso=${Referencia}${config.Separador}@psClaContaminantes='1|2|3|4|5|6|'${config.Separador}@psValorContaminantes='0|0|0|0|0|0|'${config.Separador}@pnEsNoCargoDescargoMaterial=${props.placadato[0].EsNoCargoDescargoMaterial}${config.Separador}@pnObservaciones='${(observaciones)}'${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnAccionSp=3${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`];

    
    const data38 =
    [`@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaUbicacionOrigen=${props.ClaUbicacionOrigen}${config.Separador}@pnClaViajeOrigen=${props.ClaViajeOrigen}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]
  

    const data84 ={ parameters: `{"ClaUbicacion":${props.editBoxValue},"Token":"${Token}","ClaServicioJson":"84","IdBoleta":"${props.placadato[0].IdBoleta}","EnBloque":"${1}","Encabezado":"${data36}","Detalle":"${data37}","Validacion":"${CantidadSum>0 || pesajeparcial===1 ? data38: ''}"}`,
  tipoEstructura: 0}

    /* eslint-enable */


    console.log(data84)
    callApi(urlKrakenBloque, 'POST', data84, (res) => {
      // console.log(res);
    });

    // props.setpoppesaje(true);
    props.setmodaledit(false);
    props.seteditOpen(false);

    props.setActualizar(true);
    setTimeout(() => {
      props.setActualizar(false);
    }, 50);
  };

  // Función que guarda los cambios efectuados en el material
  // Servicio JSON 11 --> SP= BasSch.BasGuardarClasEntCompraMatPrimaProc <Guarda clasificación>
  // Servicio JSON 12 --> SP= BasSch.BasRegistraMaterialClasEntCompraMatPrimaProc <Registra material a clasificar>
  const handleClose = () => {
    props.setcambio(-1)
    // props.setpoppesaje(true);
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    const urlKrakenBloque = `${config.KrakenService}/${24}/${config.Bloque}`;

    /* eslint-disable */
    const data36 = 
    [ `@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaViajeOrigen=${props.ClaViajeOrigen}${config.Separador}@pnClaUbicacionOrigen=${props.ClaUbicacionOrigen}${config.Separador}@pnClaTransporte=${props.placadato[0].ClaTransporte}${config.Separador}@pnClaTransportista=${props.placadato[0].ClaTransportista}${config.Separador}@psNomTransportista='${props.placadato[0].NomTransportista}'${config.Separador}@psNomChofer='${(props.placadato[0].NomChofer !== null ? props.placadato[0].NomChofer: 0)}'${config.Separador}@psPlacas='${props.placadato[0].Placas}'${config.Separador}@pnPesoDocumentado=${(props.placadato[0].PesoDocumentado ? props.placadato[0].PesoDocumentado :0)}${config.Separador}@psObservaciones='${(props.placadato[0].Observaciones ? props.placadato[0].Observaciones.replace('#', '%23'): '')}'${config.Separador}@pnEsRevisionEfectuada=${(props.placadato[0].EsRevisionEfectuada ? props.placadato[0].EsRevisionEfectuada : 0)}${config.Separador}@pnClaTipoClasificacion=${props.placadato[0].ClaTipoClasificacion}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@psOrigen='WEB'`];

    const data37 = 
    [ `@@TransactionSAMP:@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaViajeOrigen=${props.ClaViajeOrigen}${config.Separador}@pnClaUbicacionOrigen=${props.ClaUbicacionOrigen}${config.Separador}@pnIdRenglonRecepcion=${(props.ro.IdRenglonRecepcion ? props.ro.IdRenglonRecepcion : '')}${config.Separador}@pnIdFabricacion=${(props.ro.IdFabricacion ? props.ro.IdFabricacion : 0)}${config.Separador}@pnIdFabricacionDet=${(props.ro.IdFabricacionDet ? props.ro.IdFabricacionDet : 0)}${config.Separador}@pnClaArticuloRemisionado=${(props.ro.ClaArticuloRemisionado ? props.ro.ClaArticuloRemisionado : 0)}${config.Separador}@pnCantRemisionada=${(props.ro.CantRemisionada ? props.ro.CantRemisionada : 0)}${config.Separador}@pnClaMaterialRecibeTraspaso=${idmaterial}${config.Separador}@pnCantRecibida=${((pesajeparcial === 1 || props.ro.EsPesajeParcial === 1) && props.ro.CantRecibida >0 ?(props.ro.CantRecibida):kilos > 0 ? kilos / (Datosmaterial !==0 ? Datosmaterial[0].PesoTeoricoRecibido: 1 ):((cantidad === '' || cantidad === null ) ? 0 : cantidad))}${config.Separador}@pnPesoRecibido=${((pesajeparcial === 1 || props.ro.EsPesajeParcial === 1) && props.ro.PesoRecibido >0 ?(props.ro.PesoRecibido):cantidad > 0 ? (cantidad * (Datosmaterial !==0 ? Datosmaterial[0].PesoTeoricoRecibido:1)):(kilos === '' ? 0 : kilos))}${config.Separador}@pnPorcentajeMaterial=${porcentajer === '' ? 0 : porcentajer}${config.Separador}@pnPesoTaraRecibido=${(props.ro.PesoTaraRecibido !== null ? props.ro.PesoTaraRecibido : 0)}${config.Separador}@pnClaAlmacen=${almacen}${config.Separador}@pnClaSubAlmacenTraspaso=${(subalmacen)}${config.Separador}@pnClaSeccion=${(props.ro.ClaSeccion !== null ? props.ro.ClaSeccion : 0)}${config.Separador}@psReferencia1=${(props.ro.Referencia1 !== null ? props.ro.Referencia1 : 0)}${config.Separador}@psReferencia2=${(props.ro.Referencia2 !== null ? props.ro.Referencia2 : 0)}${config.Separador}@psReferencia3=${(props.ro.Referencia3 !== null ? props.ro.Referencia3 : 0)}${config.Separador}@psReferencia4=${(props.ro.Referencia4 !== null ? props.ro.Referencia4 : 0)}${config.Separador}@psReferencia5=${(props.ro.Referencia5 !== null ? props.ro.Referencia5 : 0)}${config.Separador}@pnEsPesajeParcial=${pesajeparcial}${config.Separador}@pnKilosReales=${(props.ro.KilosReales ? props.ro.KilosReales : 0)}${config.Separador}@pnKilosContaminados=0${config.Separador}@pnClaMotivoContaminacion=0${config.Separador}@pnClaReferenciaTraspaso=${Referencia}${config.Separador}@psClaContaminantes='1|2|3|4|5|6|'${config.Separador}@psValorContaminantes='0|0|0|0|0|0|'${config.Separador}@pnEsNoCargoDescargoMaterial=${props.placadato[0].EsNoCargoDescargoMaterial}${config.Separador}@pnObservaciones='${(observaciones)}'${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`];


    const data37g= Rowies && Rowies.map((element,index)=>{
      if(element.ClaMaterialRecibeTraspaso){
      const data = [ `@@TransactionSAMP:@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaViajeOrigen=${props.ClaViajeOrigen}${config.Separador}@pnClaUbicacionOrigen=${props.ClaUbicacionOrigen}${config.Separador}@pnIdRenglonRecepcion=${(element.IdRenglonRecepcion ? element.IdRenglonRecepcion : '')}${config.Separador}@pnIdFabricacion=${(element.IdFabricacion ? element.IdFabricacion : 0)}${config.Separador}@pnIdFabricacionDet=${(element.IdFabricacionDet ? element.IdFabricacionDet : 0)}${config.Separador}@pnClaArticuloRemisionado=${(element.ClaArticuloRemisionado ? element.ClaArticuloRemisionado : 0)}${config.Separador}@pnCantRemisionada=${(element.CantRemisionada ? element.CantRemisionada : 0)}${config.Separador}@pnClaMaterialRecibeTraspaso=${element.ClaMaterialRecibeTraspaso}${config.Separador}@pnCantRecibida=${element.CantRecibida}${config.Separador}@pnPesoRecibido=${element.PesoRecibido}${config.Separador}@pnPorcentajeMaterial=${element.PorcentajeMaterial}${config.Separador}@pnPesoTaraRecibido=${(element.PesoTaraRecibido !== null ? element.PesoTaraRecibido : 0)}${config.Separador}@pnClaAlmacen=${(element.ClaAlmacen ? element.ClaAlmacen : 1)}${config.Separador}@pnClaSubAlmacenTraspaso=${(element.ClaSubAlmacenTraspaso)}${config.Separador}@pnClaSeccion=${(element.ClaSeccion !== null ? element.ClaSeccion : 0)}${config.Separador}@psReferencia1=${(element.Referencia1 !== null ? element.Referencia1 : 0)}${config.Separador}@psReferencia2=${(element.Referencia2 !== null ? element.Referencia2 : 0)}${config.Separador}@psReferencia3=${(element.Referencia3 !== null ? element.Referencia3 : 0)}${config.Separador}@psReferencia4=${(element.Referencia4 !== null ? element.Referencia4 : 0)}${config.Separador}@psReferencia5=${(element.Referencia5 !== null ? element.Referencia5 : 0)}${config.Separador}@pnEsPesajeParcial=${element.EsPesajeParcial}${config.Separador}@pnKilosReales=${(element.KilosReales ? element.KilosReales : 0)}${config.Separador}@pnKilosContaminados=${(element.KilosContaminados ? element.KilosContaminados : 0)}${config.Separador}@pnClaMotivoContaminacion=${(element.ClaMotivoContaminacion ? element.ClaMotivoContaminacion : 0)}${config.Separador}@pnClaReferenciaTraspaso=${element.ClaReferenciaTraspaso}${config.Separador}@psClaContaminantes='1|2|3|4|5|6|'${config.Separador}@psValorContaminantes='0|0|0|0|0|0|'${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@pnObservaciones='${(element.Observaciones)}'${config.Separador}@pnAccionSp=2${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`];

        return data
      }
      })

      const data38 =
      [`@pnClaUbicacion=${props.editBoxValue}${config.Separador}@pnIdBoleta=${props.placadato[0].IdBoleta}${config.Separador}@pnClaUbicacionOrigen=${props.ClaUbicacionOrigen}${config.Separador}@pnClaViajeOrigen=${props.ClaViajeOrigen}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]
    
      const data84 ={ parameters: `{"ClaUbicacion":${props.editBoxValue},"Token":"${Token}","ClaServicioJson":"84","IdBoleta":"${props.placadato[0].IdBoleta}","EnBloque":"${1}","Encabezado":"${data36}","Detalle":"${data37}${data37g ? data37g.join("") : ''}","Validacion":"${(((PorcentajeSum !== null && (PorcentajeSum === 100)) || (PorcentajeSum === 0 && CantidadSum>0) || (props.ValidaCargo===1 && props.row && props.row.length>0 && (props.row[0].CantidadMaterial !==null || props.row[0].KilosMaterial!==null || props.row[0].PorcentajeMaterial!==null)&& (PorcentajeSum !== null && PorcentajeSum === 100) || (PorcentajeSum === 0 && CantidadSum>0))) || pesajeparcial===1) ? data38 : ''}"}`,
      tipoEstructura: 0}

    /* eslint-enable */


    async function FuncionData() {


      /* eslint-disable */
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
      props.setActualizar(true);
          setTimeout(() =>{
            props.setActualizar(false)
          }, 50);
        })
        }
    if (props.NomMotivoEntrada === 3) {
      FuncionData();
    }

    props.seteditOpen(false);
    props.setpesajeparcial(pesajeparcial);
    props.setmodaledit(false);
    props.setrow('');
  };

  // Función para cambiar del paso 1 (Clasificación de Material) & paso 2 (Contaminación)
  const handleBack = () => {
    // props.setpoppesaje(true);
    props.setcambio(-1)
    props.setmodaledit(false);
  };

  // Componente de botes y electrodomésticos para el respectivo material
  function Contelements({ contaminante }) {
    const [valor, setvalor] = useState(0);
    const Kilos = valor * contaminante.peso;
  }

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
            <Col>
              <Row className="popup-title">Material Enviado</Row>
              <Row>
                {props.NomMotivoEntrada === 9
                  ? props.ro.NomArticuloPreReg
                    ? props.ro.NomArticuloPreReg.split('-').pop()
                    : 0
                  : props.NomMotivoEntrada === 3
                  ? props.ro.NomArticuloRemisionado
                    ? props.ro.NomArticuloRemisionado.split('-').pop()
                    : 0
                  : 0}
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
                <Col style={{ paddingLeft: '0px', paddingRight: '0px' }}>Material Recibido</Col>
              </Row>
              {(materiales || props.materialtodos) && (
                <SelectBox
                  dataSource={productsDataSource}
                  searchEnabled={true}
                  defaultValue={idmaterial}
                  displayExpr='NomMaterialRecibeTraspaso'
                  valueExpr='ClaMaterialRecibeTraspaso'
                  placeholder="Seleccionar Material.."
                  onValueChanged={onValueChanged}
                  disabled={props.ro.EsPesajeParcial === 1 && props.ro.KilosMaterial !== 0}
                  minSearchLength={4}
                />
              )}
            </Col>
          </Row>
          <Row className="popup-row">
            <Col>
              <Row className="popup-title">Cantidad Enviada</Row>
              <Row>
                {props.NomMotivoEntrada === 9
                  ? props.ro.KgsMaterialPrereg
                    ? props.ro.KgsMaterialPrereg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : '0'
                  : props.NomMotivoEntrada === 3
                  ? props.ro.CantRemisionada
                    ? `${props.ro.CantRemisionada.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${props.ro.NomUnidadRecibido}`
                    : '0'
                  : '0'}
                &nbsp;{Datosmaterial ? Datosmaterial[0].NomUnidad : ' '}
              </Row>
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
                    ((pesajeparcial === 1 || props.ro.EsPesajeParcial === 1) && (props.roCantRecibida>0))?
                    (CantRecibida):
                    pesajeparcial === 1 || props.ro.EsPesajeParcial === 1
                      ? 0
                      : kilos > 0 && Datosmaterial
                      ? kilos *
                        (props.NomMotivoEntrada === 9
                          ? Datosmaterial !== 0
                            ? Datosmaterial[0].PesoTeoricoKgs
                            : 1
                          : props.NomMotivoEntrada === 3
                          ? Datosmaterial !== 0
                            ? Datosmaterial[0].PesoTeoricoRecibido
                            : 1
                          : 1)
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
              <Row>
                {props.NomMotivoEntrada === 9
                  ? props.ro.KgsMaterialPrereg
                    ? props.ro.KgsMaterialPrereg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : '0'
                  : props.NomMotivoEntrada === 3
                  ? props.ro.PesoRemisionado
                    ? `${props.ro.PesoRemisionado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Kg`
                    : '0'
                  : '0'}
              </Row>
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
                    ((pesajeparcial === 1 || props.ro.EsPesajeParcial === 1) && (props.ro.PesoRecibido >0))?
                    (PesoRecibido):
                    pesajeparcial === 1 || props.ro.EsPesajeParcial === 1
                      ? 0
                      : cantidad > 0 && Datosmaterial
                      ? cantidad /
                        (props.NomMotivoEntrada === 9
                          ? Datosmaterial === 0
                            ? 1
                            : Datosmaterial[0].PesoTeoricoKgs
                          : props.NomMotivoEntrada === 3
                          ? Datosmaterial === 0
                            ? 1
                            : Datosmaterial[0].PesoTeoricoRecibido
                          : 1)
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
                  <InputGroupText>Kg</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>

          <Row className="popup-row">
            <Col>
              <Row className="popup-title">Fabricación</Row>
              <Row>{props.NomMotivoEntrada === 3 && idFabricacion ? `${idFabricacion}`: '-' }</Row>
            </Col>
            <Col>
              <Row className="popup-title" style={{ marginLeft: '0px'}}>
                Kilos Tara Recibidos
              </Row>
              <Input
                className="popup-recibidos"
                onChange={handletara}
                value={pesajeparcial === 1 || props.ro.EsPesajeParcial === 1 ? 0 : kilosTara}
                // disabled={pesajeparcial === 1 || props.ro.EsPesajeParcial === 1}
                type="number"
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
                  <Row>{props.ro.ClaAlmacen ? props.ro.ClaAlmacen : almacen}</Row>
                </Col> */}
              </Row>
            </Col>
            <Col>
              <Row className="popup-title" style={{ marginLeft: '0px'}}>Subalmacén</Row>
              {subalmacenes && (
                <SelectBox
                  dataSource={subalmacenes}
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
                  disabled={
                    subalmacenes.length === 1 ||
                    (props.ro.EsPesajeParcial === 1 && props.ro.KilosMaterial !== 0)
                  }
                />
              )}
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
                  {idmaterial > 1 && subalmacen === 0 ? 'Selecciona subalmacen' : null}
                </span>
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
              PorcentajeSum > 100 ||
              idmaterial < 1 ||
              subalmacen < 1 ||
              Datosmaterial === 0 ||
              ((kilos === 0 || kilos === '' || kilos === '0') &&
                (cantidad === 0 || cantidad === '' || cantidad === '0') &&
                (porcentajer === 0 || porcentajer === '' || porcentajer === '0') &&
                pesajeparcial === 0)
                ? null
                :almacen !==0 ? handleClose : null
            }
          >
            GUARDAR
          </button>
          <button type="button" className="popup-button" onClick={() => props.setmodaledit(false)}>
            &#9447; Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Material;
