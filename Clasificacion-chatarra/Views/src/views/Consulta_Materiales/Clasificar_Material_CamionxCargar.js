import React, { useState, useEffect } from 'react';
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

const MaterialesXCargar = (props) => {
  const [Todos, setTodos] = useState(0);
  // Valores dinámicos locales al editar material
  const [Datosmaterial, setDatosmaterial] = useState(0);
  const [cantidade, setcantidade] = useState(0);
  const [cantidadr, setcantidadr] = useState(props.ro.CantEmbarcada ? props.ro.CantEmbarcada : 0);
  const [kilose, setkilose] = useState(0);
  const [kilosr, setkilosr] = useState(0);
  const [porcentajer, setporcentajer] = useState(pesajeparcial === 1 ? 100 : props.ro.Porcentaje ? props.ro.Porcentaje : 0);
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
  const [nombrematerialr, setnombrematerialr] = useState(0);
  const [idmaterialviaje, setidmaterialviaje] = useState(0);
  const [nombrematerialviaje, setnombrematerialviaje] = useState(0);
  const [almacen, setalmacen] = useState(0)
  const [subalmacen, setsubalmacen] = useState(0);
  const [nomsubalmacen, setnomsubalmacen] = useState(0);
  const [subalmacenes, setsubalmacenes] = useState(0);
  const [kiloscont, setkiloscont] = useState(0);
  const [razoncont, setrazoncont] = useState(0);
  const [Referencia, setReferencia] = useState(0);
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
        ',@pnClaMaterialRecibeTraspaso=' +
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
        ',@pnClaMaterialRecibeTraspaso=' +
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
        props.ro.ClaArticuloPlanCarga +
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
        props.ro.ClaArticuloPlanCarga +
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

    const data64 = {
      parameters:
        '{"ClaUbicacion":' +
        props.editBoxValue +
        ',"ClaServicioJson":64,"Parametros":"@pnClaUbicacion=' +
        props.editBoxValue +
        ',@pnIdBoleta=' +
        props.placadato[0].IdBoleta +
        ',@psPlacas='+
        props.placadato[0].Placas +
        ',@pnIdPlanCarga='+ 
        (props.BoxPlanCarga ? props.BoxPlanCarga : props.placadato[0].ClaPlanCarga )+
        ',@psObservaciones=' +
        observaciones +
        ',@pnEsRevisionEfectuada=' +
        props.placadato[0].EsRevisionEfectuada +
        ',@pnEsNoCargoDescargoMaterial=' +
        0 +
        ',@psNombrePcMod=' +
        ipadress +
        ',@pnClaUsuarioMod=' +
        NumbUsuario +'"}',
        tipoEstructura: 0,
    };


    const data65 = {
      parameters:
        '{"ClaUbicacion":' +
        props.editBoxValue +
        ',"ClaServicioJson":65,"Parametros":"@pnClaUbicacion=' +
        props.editBoxValue +
        ',@pnIdBoleta=' +
        props.placadato[0].IdBoleta +
        ',@psClaVehiculoPorClasificar=' +
        props.placadato[0].IdTagVehiculoPorClasificar +
        ',@psPlacas=' +
        props.placadato[0].Placas +
        ',@pnClaPlanCarga=' + (props.BoxPlanCarga ? props.BoxPlanCarga : props.placadato[0].ClaPlanCarga ) + ',@pnOrdenAcomodo=' +
        props.ro.OrdenAcomodo +
        ',@pnIdFabricacion=' +
        props.ro.IdFabricacion +
        ',@pnIdFabricacionDet=' +
        props.ro.IdFabricacionDet +
        ',@pnIdRenglon=1,@pnClaArticuloPlanCarga=' +
        props.ro.ClaArticuloPlanCarga +
        ',@pnClaAlmacen='+
        almacen +
        ',@pnClaSubAlmacen='+ subalmacen +',@psClaReferencia='+ Referencia +',@pnClaTipoReferencia=' +TipoReferencia + ',@pnCantEmbarcada=' +
        (kilosr > 0 && Datosmaterial
        ? kilosr /Datosmaterial[0].PesoTeoricoRecibido
            : cantidadr==='' ? 0 : cantidadr) +
        ',@pnKilogramosEmbarcados=' +
        (cantidadr > 0 && Datosmaterial
        ? cantidadr *  Datosmaterial[0].PesoTeoricoRecibido
            : kilosr==='' ? 0 : kilosr) +
        ',@pnPorcentaje=' +
        (porcentajer==='' ? 0 : porcentajer) +
        ',@pnCantEmbarcar='+
        props.ro.CantEmbarcar+
        ',@pnKilogramosEmbarcar='+
        props.ro.KilogramosEmbarcar+
        ',@pnEsPesajeParcial=' +
        pesajeparcial +
        ',@pnEsOrdenMaquilaInterna=' +
        0 +
        ',@pnIdOrdenMaquila=0,@pnKilogramosReales=0,@psComentarios=' + observaciones + ',@pnEsNoCargoDescargoMaterial=0,@pnPesoAtriles=' + kilosTara +',@psNombrePcMod=' +
        ipadress +
        ',@pnClaUsuarioMod=' +
        NumbUsuario +
        ',@pnAccionSp=2"}',
      tipoEstructura: 0,
    };
    // usage
    /* eslint-enable */


    async function FuncionData() {
      await callApi(urlKrakenService, 'POST', data64, (res) => {
        // console.log(res);
      });
      callApi(urlKrakenService, 'POST', data65, (res) => {
        // console.log(res);
      });

      /* eslint-disable */
    }
    if (props.NomMotivoEntrada === 1) {
      FuncionData();
    }

    props.setrow('');
    props.setpesajeparcial(pesajeparcial);
    props.setSavemat(1)
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
                    props.placadato[0].EsPesajeParcial === 1 || pesajeparcial === 1
                      ? 0
                      : kilosr > 0 && Datosmaterial
                      ? kilosr /Datosmaterial[0].PesoTeoricoRecibido
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
                    props.placadato[0].EsPesajeParcial === 1 || pesajeparcial === 1
                      ? 0
                      : cantidadr > 0 && Datosmaterial
                      ? cantidadr *  Datosmaterial[0].PesoTeoricoRecibido
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
              <Row className="popup-title" style={{ marginLeft: '0px'}}>
                Kilos Tarima
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
              <Row className="popup-title">
              </Row>
            </Col>
            <Col className="ajuste-subalmacen">
              <Row className="popup-title">
                <Col>Subalmacén</Col>
                <Col>
                  <Row>
                    <SelectBox
                      dataSource={props.ro ? subalmacenes : ''}
                      defaultValue={subalmacen}
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
            onClick={PorcentajeSum>100 ||  subalmacen<1 || Datosmaterial===0 || ((kilosr===0 || kilosr==='')&& (cantidadr===0 || cantidadr==='') && (porcentajer===0 || porcentajer==='') && (pesajeparcial===0)) ? null: almacen !==0 ? handleSubmit:null} 
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
