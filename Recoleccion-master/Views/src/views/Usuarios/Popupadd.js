import React, { useState, useEffect } from 'react';
import {
  Card,
  CardText,
  CardHeader,
  CardBody,
  CardTitle,
  Button,
  Row,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import SelectBox from 'devextreme-react/select-box';
import Form, { Item } from 'devextreme-react/form';
import KitchenIcon from '@material-ui/icons/Kitchen';
import LocalLaundryServiceIcon from '@material-ui/icons/LocalLaundryService';
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
import {
  callApi,
  callKrakenApi,
  showSweetAlert,
  getCliente,
  getSessionItem,
} from '../../utils/utils';
import { config } from '../../utils/config';
import { string } from 'prop-types';

const Popupadd = (props) => {
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
  const [cantidade, setcantidade] = useState(0);
  const [cantidadr, setcantidadr] = useState(0);
  const [kilose, setkilose] = useState(0);
  const [kilosr, setkilosr] = useState(0);
  const [porcentajer, setporcentajer] = useState(pesajeparcial===1 ? 100:0);
  const [observaciones, setobservaciones] = useState('Ninguna');
  const [idmateriale, setidmateriale] = useState(0);
  const [pesajeparcial, setpesajeparcial] = useState(0);
  const ipadress = getSessionItem('Ipaddress');
  const NumbUsuario = getSessionItem('NumUsuario');
  const [idmaterialr, setidmaterialr] = useState(0);
  const [nombrematerialr, setnombrematerialr] = useState(0);
  const [nombremateriale, setnombremateriale] = useState(0);
  const [subalmacen, setsubalmacen] = useState(0);
  const [nomsubalmacen, setnomsubalmacen] = useState(0);
  const [subalmacenes, setsubalmacenes] = useState(0);
  const [kiloscont, setkiloscont] = useState(0);
  const [razoncont, setrazoncont] = useState(0);
  const [Referencia, setReferencia] = useState(0);
  const PorcentajeSum = props.row ?
    +props.row.reduce((acc, val) => acc + val.PorcentajeMaterial, 0) + +porcentajer : 0;



  const useCheckbox = (e) => {
    if (props.pesajeparcial === 1) {
      false;
    } else {
      setpesajeparcial(e.target.checked ? 1 : 0);
      setkilosr(0);
      setcantidadr(0);
    }
  };

  const handlerazoncont = (event) => {
    setrazoncont(event.value);
  };

  useEffect(() => {
    const urlKrakenService = `${config.KrakenService}/${24}/${34}`;

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

    /* eslint-enable */
    callApi(urlKrakenService, 'POST', data6, (res) => {
      console.log(res.Result0);
    });

    callApi(urlKrakenService, 'POST', data7, (res) => {
      setsubalmacenes(res.Result0);
    });
  }, [idmaterialr]);

  useEffect(() => {
  
    if(subalmacenes.length===1){
      setsubalmacen(subalmacenes[0].ClaSubAlmacenCompra)
    }
  }, [subalmacenes])

  useEffect(() => {
    const urlKrakenService = `${config.KrakenService}/${24}/${34}`;

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
    if (subalmacen > 0) {
      callApi(urlKrakenService, 'POST', data8, (res) => {
        setReferencia(res.Result0[0].ClaReferenciaCompra);
      });
    }
  }, [nomsubalmacen]);

  const onValueChangedr = (e) => {
    setidmaterialr(e.value);
    setsubalmacen(0)
    setnombrematerialr(e.component.option('text').split('-').pop());
  };

  const handlekiloscont = (e) => {
    setkiloscont(e.target.value);
  };

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

  const handlecantidadr = (event) => {
    setcantidadr(event.target.value);
  };

  const handlekilosr = (event) => {
    setkilosr(event.target.value);
  };

  const handleobservaciones = (event) => {
    setobservaciones(event.target.value);
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

  const handleBack = () => {
    props.setmodaladdOpen(false);
  };

  const handleSubmit = () => {
    const urlKrakenService = `${config.KrakenService}/${24}/${34}`;

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
        cantidadr +
        ',@pnKilosMaterial=0,@pnKilosReales=0,@pnKilosContaminados=' +
        kiloscont +
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

    // usage
    /* eslint-enable */

    callApi(urlKrakenService, 'POST', data11, (res) => {
      console.log(res);
    });

    callApi(urlKrakenService, 'POST', data12, (res) => {
      console.log(res);
    });

    props.setrow(null)
    props.setpesajeparcial(pesajeparcial);
    props.setmodaladdOpen(false);
    props.setpoppesaje(true);
  };

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
              [1] Clasificación Material
            </CardHeader>
            <Container fluid={true}>
              <Row className="popup-row" style={{ marginTop: '10px' }}>
                <Col className="selector">
                  <Row className="popup-title">Material Enviado</Row>
                  <Row> No aplica</Row>
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
                  <span style={{ color: 'red !important' }}>
                    {idmaterialr < 1 ? 'Seleccionar material' : null}
                  </span>
                </Row>
                <Col className="selector">
                  <Row className="popup-title" style={{ marginLeft: '0px' }}>
                    Material Recibido
                  </Row>
                  <SelectBox
                    dataSource={props.material}
                    defaultValue={idmaterialr}
                    displayExpr="NomArticuloCompra"
                    valueExpr="ClaArticuloCompra"
                    placeholder="Seleccionar Material.."
                    onValueChanged={onValueChangedr}
                  />
                </Col>
              </Row>
              <Row className="popup-row">
                <Col>
                  <Row className="popup-title">Cantidad Enviada</Row>
                  <Row>{cantidade} lbs</Row>
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
                          ? ''
                          : cantidadr
                      }
                      disabled={
                        props.placadato[0].EsPesajeParcial === 1 || pesajeparcial === 1
                          ? 'disabled'
                          : porcentajer > 0
                          ? 'disabled'
                          : ''
                      }
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>lbs</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              </Row>

              <Row className="popup-row">
                <Col>
                  <Row className="popup-title">Kilos Enviados</Row>
                  <Row>{kilose} kgs</Row>
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
                          ? ''
                          : kilosr
                      }
                      disabled={
                        props.placadato[0].EsPesajeParcial === 1 || pesajeparcial === 1
                          ? 'disabled'
                          : ''
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
                          props.placadato[0].EsPesajeParcial === 1 || pesajeparcial === 1
                            ? 'disabled'
                            : cantidadr > 0
                            ? 'disabled'
                            : ''
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
                <Col>
                  <Row className="popup-title">
                    <Col>Subalmacén</Col>
                    <Col>
                      <Row>
                        <SelectBox
                          dataSource={subalmacenes}
                          defaultValue={subalmacen}
                          displayExpr="NomSubAlmacenCompra"
                          valueExpr="ClaSubAlmacenCompra"
                          placeholder="Seleccionar Subalmacen.."
                          onValueChanged={handlesubalmacen}
                          noDataText="Selecciona Material"
                          disabled={subalmacenes.length===1 ? "disabled":''}
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
                          {idmaterialr>1 && subalmacen===0 ? "Selecciona subalmacen":null}
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
                onClick={PorcentajeSum > 100 || idmaterialr<1 || subalmacen<1? null : togglePopup2}
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
                    : cantidadr}
                  &nbsp; lbs
                </Row>
              </Col>
              <Col>
                <Row className="popup-title" style={{ marginLeft: '0px' }}>
                  Kilos Recibidos
                </Row>
                <Row className="popup-elem" style={{ marginLeft: '0px' }}>
                  {pesajeparcial === 1 || props.placadato[0].EsPesajeParcial === 1 ? '--' : kilosr}
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
                <Row className="popup-title" style={{ marginLeft: '0px', marginTop: '50px' }}>
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
                <Row className="popup-title" style={{ marginLeft: '0px', marginTop: '50px' }}>
                  Motivo Contaminacion
                </Row>
                <SelectBox
                  dataSource={props.contaminacion}
                  defaultValue=''
                  displayExpr="NomMotivoContaminacion"
                  valueExpr={kiloscont < 1 ? "0":"ClaMotivoContaminacion"}
                  placeholder="Seleccionar Material.."
                  onValueChanged={handlerazoncont}
                  disabled={kiloscont< 1 ? "disabled":''}
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
                    {kiloscont > 0 && razoncont<1 ? 'Seleccionar Motivo' : null}
                  </span>
                </Row>
              </Col>
            </Row>
          </Container>
          <div style={{ marginTop: '70px' }}>
            <button
              style={{ marginRight: '30px' }}
              type="button"
              className="popup-button"
              onClick={kiloscont>0 && razoncont<1 ?'': handleSubmit}
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

export default Popupadd;
