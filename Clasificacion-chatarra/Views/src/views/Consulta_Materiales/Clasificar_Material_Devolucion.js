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

const ClasificarDev = (props) => {
  const [Todos, setTodos] = useState(0);
  // Valores dinámicos locales al editar material
  const [Datosmaterial, setDatosmaterial] = useState(0);
  const [cantidade, setcantidade] = useState(0);
  const [cantidadr, setcantidadr] = useState(props.ro.CantidadRecibida ? props.ro.CantidadRecibida : 0);
  const [kilose, setkilose] = useState(0);
  const [kilosr, setkilosr] = useState(0);
  const [porcentajer, setporcentajer] = useState(pesajeparcial === 1 ? 100 : props.ro.PorcentajeRecibido ? props.ro.PorcentajeRecibido : 0);
  const [observaciones, setobservaciones] = useState(
    props.placadato[0].Observaciones ? props.placadato[0].Observaciones : ''
  );
  const [pesajeparcial, setpesajeparcial] = useState(
    props.ro.EsPesajeParcial === 1 ? props.ro.EsPesajeParcial : 0
  );
  const ipadress = getSessionItem('Ipaddress');
  const NumbUsuario = getSessionItem('NumUsuario');
  const [idmaterialr, setidmaterialr] = useState(0);
  const [kilosTara, setkilosTara] = useState(0);
  const [almacen, setalmacen] = useState(props.ro.ClaAlmacen ? props.ro.ClaAlmacen :0)
  const [subalmacen, setsubalmacen] = useState(props.ro.ClaSubAlmacenCompra ? props.ro.ClaSubAlmacenCompra : 0);
  const [nomsubalmacen, setnomsubalmacen] = useState(props.ro.NomSubAlmacenCompra ? props.ro.NomSubAlmacenCompra : 0);
  const [subalmacenes, setsubalmacenes] = useState(0);
  const [Referencia, setReferencia] = useState(0);
  const [Referencia2, setReferencia2] = useState(0)
  const [TipoReferencia, setTipoReferencia] = useState(0)
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
        props.ro.ClaArticulo +
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
        props.ro.ClaArticulo +
        '"}',
      tipoEstructura: 0,
    };

    
    /* eslint-enable */
        callApi(urlKrakenService, 'POST', data31, (res) => {
          console.log(data31)
          setDatosmaterial(res.Result0);
        });

        callApi(urlKrakenService, 'POST', data32, (res) => {
          console.log(data32)
          setsubalmacenes(res.Result0);
        });
  }, []);



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
        props.ro.ClaArticulo +
        ''+config.Separador+'@pnClaSubAlmacenTraspaso=' +
        subalmacen +
        ''+config.Separador+'@psNomSubAlmacenTraspaso=' +
        (nomsubalmacen && nomsubalmacen.includes('"') ? '':nomsubalmacen) +
        ''+config.Separador+'@pnIdBoleta=' +
        props.placadato[0].IdBoleta +
        '"}',
      tipoEstructura: 0,
    };
    /* eslint-enable */
    if (subalmacen > 0 && nomsubalmacen) {
console.log(data33)
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
        props.ro.ClaArticulo +
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
    });
  }
  }, [almacen])
  // Función que pone valor determinado de subalmacén si es único

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
    props.setpoppesaje(true);
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
    props.setpoppesaje(true);
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;

    /* eslint-disable */

    const data72 = {
      parameters:
        '{"ClaUbicacion":' +
        props.editBoxValue +
        ',"ClaServicioJson":72,"Parametros":"@pnClaUbicacion=' +
        props.editBoxValue +
        ''+config.Separador+'@pnIdBoleta=' +
        props.placadato[0].IdBoleta +
        ''+config.Separador+'@pnClaUbicacionEntradaTraspaso='+
        props.placadato[0].ClaUbicacionEntradaTraspaso+
        ''+config.Separador+'@pnIdBoletaOrigenTrasRec='+
        props.placadato[0].IdBoletaOrigenTrasRec+
        ''+config.Separador+'@pnClaViajeDevolucionTraspaso='+ 
        props.placadato[0].ClaViajeDevolucionTraspaso+
        ''+config.Separador+'@psObservaciones=' +
        (observaciones ? observaciones.replace('#', '%23'):'') +
        ''+config.Separador+'@pnEsRevisionEfectuada=' +
        (props.placadato[0].EsRevisionEfectuada !==null ? props.placadato[0].EsRevisionEfectuada:0) +
        ''+config.Separador+'@pnEsNoCargoDescargoMaterial=' +
        0 +
        ''+config.Separador+'@psNombrePcMod=' +
        ipadress +
        ''+config.Separador+'@pnClaUsuarioMod=' +
        NumbUsuario +'"}',
        tipoEstructura: 0,
    };


    const data73 = {
      parameters:
        '{"ClaUbicacion":' +
        props.editBoxValue +
        ',"ClaServicioJson":73,"Parametros":"@pnClaUbicacion=' +
        props.editBoxValue +
        ''+config.Separador+'@pnIdBoleta=' +
        props.placadato[0].IdBoleta +
        ''+config.Separador+'@pnClaArticulo=' +
        props.ro.ClaArticulo +
        ''+config.Separador+'@pnClaUnidad=' +
        props.ro.ClaUnidad +
        ''+config.Separador+'@pnClaAlmacen='+
        almacen +
        ''+config.Separador+'@pnIdRenglon=1'+config.Separador+'@pnClaSubAlmacenCompra='+ subalmacen +''+config.Separador+'@psClaReferenciaDevTra='+ ((Referencia !==0 && Referencia !==null)? Referencia :Referencia2 )+''+config.Separador+'@pnCantidadRecibida=' +
        (kilosr > 0 && Datosmaterial
        ? kilosr /Datosmaterial[0].PesoTeoricoKgs
            : cantidadr==='' ? 0 : cantidadr) +
        ''+config.Separador+'@pnKilosRecibidos=' +
        (cantidadr > 0 && Datosmaterial
        ? cantidadr *  Datosmaterial[0].PesoTeoricoKgs
            : kilosr==='' ? 0 : kilosr) +
        ''+config.Separador+'@pnPorcentajeRecibido=' +
        (porcentajer==='' ? 0 : porcentajer) +
        ''+config.Separador+'@pnCantidadDevuelta='+
        props.ro.CantidadDevuelta+
        ''+config.Separador+'@pnKilosDevueltos='+
        props.ro.KilosDevueltos+
        ''+config.Separador+'@pnEsPesajeParcial=' +
        pesajeparcial +
        ''+config.Separador+'@pnKilosRealesRecibidos=0'+config.Separador+'@psNombrePcMod=' +
        ipadress +
        ''+config.Separador+'@pnClaUsuarioMod=' +
        NumbUsuario +
        ''+config.Separador+'@pnAccionSp=2"}',
      tipoEstructura: 0,
    };
    // usage
    /* eslint-enable */


    async function FuncionData() {
      props.setrow('');
      await callApi(urlKrakenService, 'POST', data72, (res) => {
        // console.log(res);
      });
      await callApi(urlKrakenService, 'POST', data73, (res) => {
        // console.log(res);
      });
      props.setActualizar(true);
    setTimeout(() => {
      props.setActualizar(false);
    }, 50);
    }
    if (props.NomMotivoEntrada === 110) {
      FuncionData();
    }

    props.setpesajeparcial(pesajeparcial);
    props.setSavemat(1)
  
  };

  // Componente final de Wizard para editar material

  return (
    <div>
      <div className="box">
        <span className="close-icon" onClick={handleBack}>
          x
        </span>
        <CardHeader style={{ paddingTop: '25px', color: '#002c6f' }}>
          <Row style={{ marginLeft: '0px' }}>Devolución Material</Row>
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
              <Row className="popup-title">Material:&nbsp; {props.ro.NomArticulo}</Row>
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
              <Row className="popup-title">Cantidad Devuelta</Row>
              <Row>{props.ro.CantidadDevuelta.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} &nbsp; {props.ro.NomUnidad}</Row>
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
                      ? kilosr /Datosmaterial[0].PesoTeoricoKgs
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
                    {Datosmaterial ? Datosmaterial[0].NomUnidad : ''}
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>

          <Row className="popup-row">
            <Col>
              <Row className="popup-title">Kilos Devueltos</Row>
              <Row>{props.ro.KilosDevueltos.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} &nbsp; Kg</Row>
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
                      ? cantidadr *  Datosmaterial[0].PesoTeoricoKgs
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
              <Row className="popup-title">
              </Row>
            </Col>
            <Col className="ajuste-subalmacen">
              <Row className="popup-title">
                <Col>Subalmacén</Col>
                <Col>
                  <Row className="subalmacen">
                    <SelectBox
                      dataSource={props.ro ? subalmacenes : ''}
                      value={subalmacenes.length===1 ? (subalmacenes[0].ClaSubAlmacenCompra):subalmacen}
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
                      marginLeft: '-5%',
                    }}
                    className="warning"
                  >
                    <span style={{ color: 'red !important' }}>
                      {idmaterialr > 1 && subalmacen === 0 && subalmacenes.length>1 ? 'Selecciona subalmacen' : null}
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
            onClick={PorcentajeSum>100 ||  subalmacen<1 || Datosmaterial===0 || ((kilosr===0 || kilosr==='')&& (cantidadr===0 || cantidadr==='') && (porcentajer===0 || porcentajer==='') && (pesajeparcial===0)) ? null: almacen !==0 && ((Referencia !==0 && Referencia!==null)||(Referencia2 !==0 && Referencia2!==null) ) ? handleSubmit:handleMensaje} 
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

export default ClasificarDev;
