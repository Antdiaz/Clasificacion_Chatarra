import React, {useCallback,useState, useEffect,useRef} from 'react';
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
  const [cantidade, setcantidade] = useState(0);
  const [cantidadr, setcantidadr] = useState(0);
  const [kilose, setkilose] = useState(0);
  const [kilosr, setkilosr] = useState(0);
  const [porcentajer, setporcentajer] = useState(pesajeparcial === 1 ? 100 : 0);
  const [observaciones, setobservaciones] = useState(
    props.placadato[0].Observaciones ? props.placadato[0].Observaciones : 'Ninguna'
  );
  const [pesajeparcial, setpesajeparcial] = useState(
    props.placadato[0].EsPesajeParcial === 1 ? props.placadato[0].EsPesajeParcial : 0
  );
  const ipadress = getSessionItem('Ipaddress');
  const NumbUsuario = getSessionItem('NumUsuario');
  const [idmaterialr, setidmaterialr] = useState(0);
  const [kilosTara, setkilosTara] = useState(0);
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



  const focusSelectBox = (e) => {
    if (e.fullName === "text") {

      const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
       // Prints the current value of 'text' console.log(e.value);

  /* eslint-disable */
  const data58 = {
    parameters:
      '{"ClaUbicacion":' +
      props.editBoxValue +
      ',"ClaServicioJson":' +
      58 +
      ',"Parametros":"@psValor='+ e.value +'"}',
    tipoEstructura: 0,
  };
   /* eslint-enable */

  if(e.value && e.value.length>2 && e.value.length<10){
    callApi(urlKrakenService, 'POST', data58, (res) => {
      props.setmaterialpt(res.Result0);
      });
    }
  }

};


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
    if (props.NomMotivoEntrada === 9) {
      if (idmaterialr > 0) {
        callApi(urlKrakenService, 'POST', data6, (res) => {
          setDatosmaterial(res.Result0);
        });

        callApi(urlKrakenService, 'POST', data7, (res) => {
          setsubalmacenes(res.Result0);
        });
      }
    }
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
        ',"ClaServicioJson":34,"Parametros":"@pnClaUbicacion=' +
        props.editBoxValue +
        ',@pnClaMaterialRecibeTraspaso=' +
        idmaterialr +
        ',@pnClaAlmacen=1,@pnClaSubAlmacenTraspaso=' +
        subalmacen +
        ',@psReferencia="}',
      tipoEstructura: 0,
    };
    /* eslint-enable */
    if (subalmacen > 0 && nomsubalmacen) {
      callApi(urlKrakenService, 'POST', data33, (res) => {
        setReferencia(res.Result0[0].ClaReferencia);
      });
    }
  }, [nomsubalmacen, subalmacen, subalmacenes]);

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

  // Función para cambio de material en el wizard
  const onValueChangedr = (e) => {
    setidmaterialr(e.value);
    setsubalmacen(0);
    setnombrematerialr(e.component.option('text').split('-').pop());
  };

  const onValueChangede = (e) => {
    props.setidmaterialviaje(e.value);
    setidmaterialviaje(e.value);
    setnombrematerialviaje(e.component.option('text').split('-').pop());
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
    props.setpoppesaje(true);
    props.setmodaladdOpen(false);
  };

  const productsDataSource = new DataSource({
    store: {
      data: props.materialpt,
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
    props.setpoppesaje(true);
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;

    /* eslint-disable */

    const data36 = {
      parameters:
        '{"ClaUbicacion":' +
        props.editBoxValue +
        ',"ClaServicioJson":36,"Parametros":"@pnClaUbicacion=' +
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
        (props.placadato[0].PesoDocumentado !== null ? props.placadato[0].PesoDocumentado : 0) +
        ',@psObservaciones=' +
        observaciones +
        ',@pnEsRevisionEfectuada=' +
        (props.placadato[0].EsRevisionEfectuada ? props.placadato[0].EsRevisionEfectuada : 0)  +
        ',@pnClaTipoClasificacion=' +
        props.placadato[0].ClaTipoClasificacion +
        ',@pnEsNoCargoDescargoMaterial=0,@psNombrePcMod=' +
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
        ',@pnIdRenglonRecepcion=,@pnIdFabricacion=' +
        props.placadato[0].IdFabDefault +
        ',@pnIdFabricacionDet=' +
        1 +
        ',@pnClaArticuloRemisionado=' +
        props.Materialviaje[0].ClaArticuloRemisionado +
        ',@pnCantRemisionada=' +
        0 +
        ',@pnClaMaterialRecibeTraspaso=' +
        idmaterialr +
        ',@pnCantRecibida=' +
        (cantidadr === ''
          ? 0
          : kilosr > 0
          ? kilosr / Datosmaterial !== 0
            ? Datosmaterial[0].PesoTeoricoRecibido
            : 1
          : cantidadr) +
        ',@pnPesoRecibido=' +
        (kilosr === ''
          ? 0
          : cantidadr > 0
          ? cantidadr * Datosmaterial !== 0
            ? Datosmaterial[0].PesoTeoricoRecibido
            : 1
          : kilosr) +
        ',@pnPorcentajeMaterial=' +
        (pesajeparcial === 1 ? 100 : porcentajer === '' ? 0 : porcentajer) +
        ',@pnPesoTaraRecibido=' +
        kilosTara +
        ',@pnClaAlmacen=' +
        1 +
        ',@pnClaSubAlmacenTraspaso=' +
        subalmacen +
        ',@pnClaSubSubAlmacen=' +
        0 +
        ',@pnClaSeccion=' +
        0 +
        ',@psReferencia1=0,@psReferencia2=0,@psReferencia3=0,@psReferencia4=0,@psReferencia5=0,@pnEsPesajeParcial=' +
        pesajeparcial +
        ',@pnKilosReales=' +
        0 +
        ',@pnKilosContaminados=0,@pnClaMotivoContaminacion=0,@pnClaReferenciaTraspaso=' +
        Referencia +
        ',@psClaContaminantes=1|2|3|4|5|6|,@psValorContaminantes=0|0|0|0|0|0|,@pnEsNoCargoDescargoMaterial=' +
        props.placadato[0].EsNoCargoDescargoMaterial +
        ',@psNombrePcMod=' +
        ipadress +
        ',@pnClaUsuarioMod=' +
        NumbUsuario +
        ',@pnAccionSp=1"}',
      tipoEstructura: 0,
    };
    // usage
    /* eslint-enable */


    async function FuncionData() {
      
      await  callApi(urlKrakenService, 'POST', data36, (res) => {
        // console.log(res);
      });
      callApi(urlKrakenService, 'POST', data37, (res) => {
        // console.log(res);
      });

      /* eslint-disable */
      if (
        (props.row.length === 1 || props.row.length === 2) &&
        props.row[0].ClaMaterialRecibeTraspaso
      ) {
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
            ',@pnIdRenglonRecepcion=,@pnIdFabricacion=' +
            props.placadato[0].IdFabDefault +
            ',@pnIdFabricacionDet=' +
            2 +
            ',@pnClaArticuloRemisionado=' +
            props.row[0].ClaArticuloRemisionado +
            ',@pnCantRemisionada=' +
            props.row[0].CantRemisionada +
            ',@pnClaMaterialRecibeTraspaso=' +
            props.row[0].ClaMaterialRecibeTraspaso +
            ',@pnCantRecibida=' +
            props.row[0].CantRecibida +
            ',@pnPesoRecibido=' +
            props.row[0].PesoRecibido +
            ',@pnPorcentajeMaterial=' +
            props.row[0].PorcentajeMaterial +
            ',@pnPesoTaraRecibido=' +
            props.row[0].PesoTaraRecibido +
            ',@pnClaAlmacen=' +
            1 +
            ',@pnClaSubAlmacenTraspaso=' +
            props.row[0].ClaSubAlmacenTraspaso +
            ',@pnClaSubSubAlmacen=' +
            0 +
            ',@pnClaSeccion=' +
            0 +
            ',@psReferencia1=' +
            0 +
            ',@psReferencia2=' +
            0 +
            ',@psReferencia3=' +
            0 +
            ',@psReferencia4=' +
            0 +
            ',@psReferencia5=' +
            0 +
            ',@pnEsPesajeParcial=' +
            props.row[0].EsPesajeParcial +
            ',@pnKilosReales=' +
            0 +
            ',@pnKilosContaminados=' +
            (props.row[0].KilosContaminados ? props.row[0].KilosContaminados : 0) +
            ',@pnClaMotivoContaminacion=0,@pnClaReferenciaTraspaso=' +
            props.row[0].ClaReferenciaTraspaso +
            ',@pnEsNoCargoDescargoMaterial=' +
            props.placadato[0].EsNoCargoDescargoMaterial +
            ',@psNombrePcMod=' +
            ipadress +
            ',@pnClaUsuarioMod=' +
            NumbUsuario +
            ',@pnAccionSp=1"}',
          tipoEstructura: 0,
        }; /* eslint-enable */
        callApi(urlKrakenService, 'POST', data371, (res) => {
          // console.log(res);
        });
      }

      if (props.row.length === 2 && props.row[1].ClaMaterialRecibeTraspaso) {
        /* eslint-disable */
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
            ',@pnIdRenglonRecepcion=,@pnIdFabricacion=' +
            props.placadato[0].IdFabDefault +
            ',@pnIdFabricacionDet=' +
            2 +
            ',@pnClaArticuloRemisionado=' +
            props.row[1].ClaArticuloRemisionado +
            ',@pnCantRemisionada=' +
            props.row[1].CantRemisionada +
            ',@pnClaMaterialRecibeTraspaso=' +
            props.row[1].ClaMaterialRecibeTraspaso +
            ',@pnCantRecibida=' +
            props.row[1].CantRecibida +
            ',@pnPesoRecibido=' +
            props.row[1].PesoRecibido +
            ',@pnPorcentajeMaterial=' +
            props.row[1].PorcentajeMaterial +
            ',@pnPesoTaraRecibido=' +
            props.row[1].PesoTaraRecibido +
            ',@pnClaAlmacen=' +
            1 +
            ',@pnClaSubAlmacenTraspaso=' +
            props.row[1].ClaSubAlmacenTraspaso +
            ',@pnClaSubSubAlmacen=' +
            0 +
            ',@pnClaSeccion=' +
            0 +
            ',@psReferencia1=' +
            0 +
            ',@psReferencia2=' +
            0 +
            ',@psReferencia3=' +
            0 +
            ',@psReferencia4=' +
            0 +
            ',@psReferencia5=' +
            0 +
            ',@pnEsPesajeParcial=' +
            props.row[1].EsPesajeParcial +
            ',@pnKilosReales=' +
            0 +
            ',@pnKilosContaminados=' +
            props.row[1].KilosContaminados +
            ',@pnClaMotivoContaminacion=0,@pnClaReferenciaTraspaso=' +
            props.row[1].ClaReferenciaTraspaso +
            ',@pnEsNoCargoDescargoMaterial=' +
            props.placadato[0].EsNoCargoDescargoMaterial +
            ',@psNombrePcMod=' +
            ipadress +
            ',@pnClaUsuarioMod=' +
            NumbUsuario +
            ',@pnAccionSp=1"}',
          tipoEstructura: 0,
        }; /* eslint-enable */
        callApi(urlKrakenService, 'POST', data372, (res) => {
          // console.log(res);
        });
      }
    }
    if (props.NomMotivoEntrada === 3) {
      FuncionData();
    }

    props.setrow('');
    props.setpesajeparcial(pesajeparcial);
    props.setmodaladdOpen(false);

    props.setActualizar(true);
    setTimeout(() => {
      props.setActualizar(false);
    }, 50);
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
              <Row>{props.Materialviaje ? props.Materialviaje[0].NomArticuloRemisionado : ''}</Row>
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
                  showDataBeforeSearch={true}
                />
              </InputGroup>
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
            <Col>
              <Row className="popup-title">Tara Enviada</Row>
              <Row>No aplica</Row>
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
                disabled={props.placadato[0].EsPesajeParcial === 1 || pesajeparcial === 1}
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
              <Row className="popup-title">
                <Col>Subalmacén</Col>
                <Col>
                  <Row>
                    <SelectBox
                      dataSource={props.material ? subalmacenes : ''}
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
              PorcentajeSum > 100 ||
              idmaterialr < 1 ||
              subalmacen < 1 ||
              ((kilosr === 0 || kilosr === '') &&
                (cantidadr === 0 || cantidadr === '') &&
                (porcentajer === 0 || porcentajer === '') &&
                pesajeparcial === 0 &&
                Datosmaterial === 0)
                ? null
                : handleSubmit
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
