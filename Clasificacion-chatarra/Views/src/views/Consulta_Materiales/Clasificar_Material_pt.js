import React, { useState, useEffect, useRef } from 'react';
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
import { callApi, getSessionItem } from '../../utils/utils';
import { config } from '../../utils/config';
import SelectBox from 'devextreme-react/select-box';
import WarningIcon from '@material-ui/icons/Warning';

const Material = (props) => {
  const [Todos, setTodos] = useState(0);

  // Valores dinámicos locales al editar material
  const [cantidad, setcantidad] = useState(props.ro.CantRecibida? props.ro.CantRecibida : 0);
  const [Referencia, setReferencia] = useState(0);
  const [kilos, setkilos] = useState(props.ro.KilosReales !== null ? props.ro.KilosReales : 0);
  const [observaciones, setobservaciones] = useState(props.placadato[0].Observaciones ? props.placadato[0].Observaciones : 'Ninguna');
  const [kilosTara, setkilosTara] = useState(props.ro.PesoTaraRecibido !== null ? props.ro.PesoTaraRecibido : 0);
  const [idmaterial, setidmaterial] = useState(props.ro.ClaMaterialRecibeTraspaso ? props.ro.ClaMaterialRecibeTraspaso : 0);
  const [nombrematerial, setnombrematerial] = useState(props.ro.NomMaterialRecibeTraspaso ? props.ro.NomMaterialRecibeTraspaso: '');
  const [kiloscont, setkiloscont] = useState(0);
  const [razoncont, setrazoncont] = useState(props.ro.ClaMotivoContaminacion ? props.ro.ClaMotivoContaminacion : 0);
  const [porcentajer, setporcentajer] = useState(props.ro.PorcentajeMaterial ? props.ro.PorcentajeMaterial : 0);
  const [pesajeparcial, setpesajeparcial] = useState(props.ro.EsPesajeParcial ? props.ro.EsPesajeParcial : 0);
  const ipadress = getSessionItem('Ipaddress');
  const NumbUsuario = getSessionItem('NumUsuario');
  const [almacen, setalmacen] = useState(props.ro.ClaAlmacen ? props.ro.ClaAlmacen :0)
  const [subalmacen, setsubalmacen] = useState( props.ro.ClaSubAlmacenTraspaso? props.ro.ClaSubAlmacenTraspaso: 0 );
  const [nomsubalmacen, setnomsubalmacen] = useState( props.ro.NomSubAlmacenTraspaso ? props.ro.NomSubAlmacenTraspaso: 0);
  const [subalmacenes, setsubalmacenes] = useState(0);
  const Diferencia = props.ro.PorcentajeMaterial;
  const PorcentajeSum = props.row
    ? +props.row.reduce((acc, val) => acc + val.PorcentajeMaterial, 0) + +porcentajer - +Diferencia
    : 0;
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
        ',@pnClaMaterialRecibeTraspaso=' +
        idmaterial +
        ',@pnClaAlmacen='+
        almacen +
        ',@pnClaSubAlmacenTraspaso=' +
        subalmacen +
        ',@psReferencia="}',
      tipoEstructura: 0,
    };
    /* eslint-enable */
    if (almacen!==0) {
    callApi(urlKrakenService, 'POST', data34, (res) => {
      setReferencia(res.Result0[0].ClaReferencia);
      setTipoReferencia(res.Result0[0].ClaTipoReferencia)
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
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    /* eslint-disable */

    const data37 = {
      parameters:
        '{"ClaUbicacion":' +
        props.editBoxValue +
        ',"ClaServicioJson":37,"Parametros":"@pnClaUbicacion=' +
        props.editBoxValue +
        ',@pnIdBoleta=' +
        props.placadato[0].IdBoleta +
        ',@pnClaViajeOrigen=' +
        props.ClaViajeOrigen +
        ',@pnClaUbicacionOrigen=' +
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
        (props.ro.CantRemisionada ? props.ro.CantRemisionada : 0) +
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
        (props.ro.ClaSubSubAlmacen !== null ? props.ro.ClaSubSubAlmacen : 0) +
        ',@pnClaSeccion=' +
        (props.ro.ClaSeccion !== null ? props.ro.ClaSeccion : 0) +
        ',@psReferencia1=' +
        (props.ro.Referencia1 !== null ? props.ro.Referencia1 : 0) +
        ',@psReferencia2=' +
        (props.ro.Referencia2 !== null ? props.ro.Referencia2 : 0) +
        ',@psReferencia3=' +
        (props.ro.Referencia3 !== null ? props.ro.Referencia3 : 0) +
        ',@psReferencia4=' +
        (props.ro.Referencia4 !== null ? props.ro.Referencia4 : 0) +
        ',@psReferencia5=' +
        (props.ro.Referencia5 !== null ? props.ro.Referencia5 : 0) +
        ',@pnEsPesajeParcial=' +
        pesajeparcial +
        ',@pnKilosReales=' +
        (props.ro.KilosReales ? props.ro.KilosReales : 0) +
        ',@pnKilosContaminados=0,@pnClaMotivoContaminacion=0,@pnClaReferenciaTraspaso=' +
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


      callApi(urlKrakenService, 'POST', data37, (res) => {
        // console.log(res);
      });

    props.setpoppesaje(true);
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
    props.setpoppesaje(true);
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;

    /* eslint-disable */

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
        ',@pnClaViajeOrigen=' +
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
        (props.placadato[0].NomChofer !== null ? props.placadato[0].NomChofer : 0) +
        ',@psPlacas=' +
        props.placadato[0].Placas +
        ',@pnPesoDocumentado=' +
        (props.placadato[0].PesoDocumentado ? props.placadato[0].PesoDocumentado : 0) +
        ',@psObservaciones=' +
        observaciones +
        ',@pnEsRevisionEfectuada=' +
        (props.placadato[0].EsRevisionEfectuada ? props.placadato[0].EsRevisionEfectuada : 0) +
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
        ',@pnClaViajeOrigen=' +
        props.ClaViajeOrigen +
        ',@pnClaUbicacionOrigen=' +
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
        (props.ro.CantRemisionada ? props.ro.CantRemisionada : 0) +
        ',@pnClaMaterialRecibeTraspaso=' +
        idmaterial +
        ',@pnCantRecibida=' +
        (kilos > 0 ? kilos / props.ro.PesoTeoricoRecibido :cantidad === '' ? 0 : cantidad) +
        ',@pnPesoRecibido=' +
        (cantidad > 0 ? cantidad * props.ro.PesoTeoricoRecibido :kilos === '' ? 0 : kilos) +
        ',@pnPorcentajeMaterial=' +
        (porcentajer === '' ? 0 : porcentajer) +
        ',@pnPesoTaraRecibido=' +
        kilosTara +
        ',@pnClaAlmacen=' +
        (almacen) +
        ',@pnClaSubAlmacenTraspaso=' +
        (props.ro.ClaSubAlmacenTraspaso !== null ? props.ro.ClaSubAlmacenTraspaso : subalmacen) +
        ',@pnClaSubSubAlmacen=' +
        (props.ro.ClaSubSubAlmacen !== null ? props.ro.ClaSubSubAlmacen : 0) +
        ',@pnClaSeccion=' +
        (props.ro.ClaSeccion !== null ? props.ro.ClaSeccion : 0) +
        ',@psReferencia1=' +
        (props.ro.Referencia1 !== null ? props.ro.Referencia1 : 0) +
        ',@psReferencia2=' +
        (props.ro.Referencia2 !== null ? props.ro.Referencia2 : 0) +
        ',@psReferencia3=' +
        (props.ro.Referencia3 !== null ? props.ro.Referencia3 : 0) +
        ',@psReferencia4=' +
        (props.ro.Referencia4 !== null ? props.ro.Referencia4 : 0) +
        ',@psReferencia5=' +
        (props.ro.Referencia5 !== null ? props.ro.Referencia5 : 0) +
        ',@pnEsPesajeParcial=' +
        pesajeparcial +
        ',@pnKilosReales=' +
        (props.ro.KilosReales ? props.ro.KilosReales : 0) +
        ',@pnKilosContaminados=0,@pnClaMotivoContaminacion=0,@pnClaReferenciaTraspaso=' +
        Referencia +
        ',@psClaContaminantes=1|2|3|4|5|6|,@psValorContaminantes=0|0|0|0|0|0|,@pnEsNoCargoDescargoMaterial=' +
        props.placadato[0].EsNoCargoDescargoMaterial +
        ',@psNombrePcMod=' +
        ipadress +
        ',@pnClaUsuarioMod=' +
        NumbUsuario +
        ',@pnAccionSp="}',
      tipoEstructura: 0,
    };
    /* eslint-enable */


    async function FuncionData() {
      await callApi(urlKrakenService, 'POST', data36, (res) => {
        // console.log(res);
      });

     
      callApi(urlKrakenService, 'POST', data37, (res) => {
        // console.log(res);
      });

      /* eslint-disable */
      if ((Rowies.length === 1 || Rowies.length === 2) && Rowies[0].ClaMaterialRecibeTraspaso) {
        const data371 = {
          parameters:
            '{"ClaUbicacion":' +
            props.editBoxValue +
            ',"ClaServicioJson":37,"Parametros":"@pnClaUbicacion=' +
            props.editBoxValue +
            ',@pnIdBoleta=' +
            props.placadato[0].IdBoleta +
            ',@pnClaViajeOrigen=' +
            props.ClaViajeOrigen +
            ',@pnClaUbicacionOrigen=' +
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
            (Rowies[0].CantRemisionada ? Rowies[0].CantRemisionada : 0) +
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
            (Rowies[0].ClaSubSubAlmacen !== null ? Rowies[0].ClaSubSubAlmacen : 0) +
            ',@pnClaSeccion=' +
            (Rowies[0].ClaSeccion !== null ? Rowies[0].ClaSeccion : 0) +
            ',@psReferencia1=' +
            (Rowies[0].Referencia1 !== null ? Rowies[0].Referencia1 : 0) +
            ',@psReferencia2=' +
            (Rowies[0].Referencia2 !== null ? Rowies[0].Referencia2 : 0) +
            ',@psReferencia3=' +
            (Rowies[0].Referencia3 !== null ? Rowies[0].Referencia3 : 0) +
            ',@psReferencia4=' +
            (Rowies[0].Referencia4 !== null ? Rowies[0].Referencia4 : 0) +
            ',@psReferencia5=' +
            (Rowies[0].Referencia5 !== null ? Rowies[0].Referencia5 : 0) +
            ',@pnEsPesajeParcial=' +
            Rowies[0].EsPesajeParcial +
            ',@pnKilosReales=' +
            (Rowies[0].KilosReales ? Rowies[0].KilosReales : 0) +
            ',@pnKilosContaminados=' +
            Rowies[0].KilosContaminados +
            ',@pnClaMotivoContaminacion=' +
            (Rowies[0].ClaMotivoContaminacion ? Rowies[0].ClaMotivoContaminacion : '') +
            ',@pnClaReferenciaTraspaso=' +
            Rowies[0].ClaReferenciaTraspaso +
            ',@psClaContaminantes=1|2|3|4|5|6|,@psValorContaminantes=' +
            Bollas2 +
            '|' +
            Cilindro2 +
            '|' +
            Tanque2 +
            '|' +
            LlantasChico2 +
            '|' +
            LlantasMediano2 +
            '|' +
            LlantasGrande2 +
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
      if (Rowies.length === 2 && Rowies[1].ClaMaterialRecibeTraspaso) {
        const data372 = {
          parameters:
            '{"ClaUbicacion":' +
            props.editBoxValue +
            ',"ClaServicioJson":37,"Parametros":"@pnClaUbicacion=' +
            props.editBoxValue +
            ',@pnIdBoleta=' +
            props.placadato[0].IdBoleta +
            ',@pnClaViajeOrigen=' +
            props.ClaViajeOrigen +
            ',@pnClaUbicacionOrigen=' +
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
            (Rowies[1].CantRemisionada ? Rowies[1].CantRemisionada : 0) +
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
            (Rowies[1].ClaSubSubAlmacen !== null ? Rowies[1].ClaSubSubAlmacen : 0) +
            ',@pnClaSeccion=' +
            (Rowies[1].ClaSeccion !== null ? Rowies[1].ClaSeccion : 0) +
            ',@psReferencia1=' +
            (Rowies[1].Referencia1 !== null ? Rowies[1].Referencia1 : 0) +
            ',@psReferencia2=' +
            (Rowies[1].Referencia2 !== null ? Rowies[1].Referencia2 : 0) +
            ',@psReferencia3=' +
            (Rowies[1].Referencia3 !== null ? Rowies[1].Referencia3 : 0) +
            ',@psReferencia4=' +
            (Rowies[1].Referencia4 !== null ? Rowies[1].Referencia4 : 0) +
            ',@psReferencia5=' +
            (Rowies[1].Referencia5 !== null ? Rowies[1].Referencia5 : 0) +
            ',@pnEsPesajeParcial=' +
            Rowies[1].EsPesajeParcial +
            ',@pnKilosReales=' +
            (Rowies[1].KilosReales ? Rowies[1].KilosReales : 0) +
            ',@pnKilosContaminados=' +
            Rowies[1].KilosContaminados +
            ',@pnClaMotivoContaminacion=' +
            (Rowies[1].ClaMotivoContaminacion ? Rowies[1].ClaMotivoContaminacion : '') +
            ',@pnClaReferenciaTraspaso=' +
            Rowies[1].ClaReferenciaTraspaso +
            ',@psClaContaminantes=1|2|3|4|5|6|,@psValorContaminantes=' +
            Bollas2 +
            '|' +
            Cilindro2 +
            '|' +
            Tanque2 +
            '|' +
            LlantasChico2 +
            '|' +
            LlantasMediano2 +
            '|' +
            LlantasGrande2 +
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
    if (props.NomMotivoEntrada === 3) {
      FuncionData();
    }

    props.seteditOpen(false);
    props.setpesajeparcial(pesajeparcial);
    props.setmodaledit(false);

    props.setActualizar(true);
    setTimeout(() => {
      props.setActualizar(false);
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
              {(materiales || materialtodos) && (
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
                    ? props.ro.CantRemisionada.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
                    ? props.ro.PesoRemisionado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : '0'
                  : '0'}
                &nbsp; kgs
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
            <Col>
              <Row className="popup-title">
                Tara enviada
              </Row>
              <Row>
                {props.ro.PesoTaraRemisionado === null || props.ro.PesoTaraRemisionado === 0
                  ? '0'
                  : props.roPesoTaraRemisionado}
              </Row>
            </Col>
            <Col>
              <Row className="popup-title" style={{ marginLeft: '0px'}}>
                Kilos Tara Recibidos
              </Row>
              <Input
                className="popup-recibidos"
                onChange={handletara}
                value={pesajeparcial === 1 || props.ro.EsPesajeParcial === 1 ? 0 : kilosTara}
                disabled={pesajeparcial === 1 || props.ro.EsPesajeParcial === 1}
                type="number"
              />
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
              <Row className="popup-title">
                <Col>Subalmacén</Col>
                <Col>
                  <Row>
                    {subalmacenes && (
                      <SelectBox
                        dataSource={subalmacenes}
                        defaultValue={subalmacen}
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
              PorcentajeSum > 100 ||
              idmaterial < 1 ||
              subalmacen < 1 ||
              Datosmaterial === 0 ||
              ((kilos === 0 || kilos === '') &&
                (cantidad === 0 || cantidad === '') &&
                (porcentajer === 0 || porcentajer === '') &&
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
