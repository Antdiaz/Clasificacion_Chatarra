import React, { useState, useEffect } from 'react';
import { config } from '../../utils/config';
import { callApi } from '../../utils/utils';
import { Card, CardText, CardHeader, CardBody, CardTitle, Button, Row, Col } from 'reactstrap';
import { useParams } from 'react-router';
import TableContainer from '@material-ui/core/TableContainer';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import Modal from 'react-modal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Imagenes({ id, editBoxValue, row, NomMotivoEntrada }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  // Valor que lee la foto placa
  const [Fotoplaca, setFotoplaca] = useState(0);
  // Valor que lee Material Superior
  const [Materialsuperior, setMaterialsuperior] = useState(0);
  // Valor que lee Material Superior
  const [Preregistro, setPreregistro] = useState(0);
  const [Manual, setManual] = useState(0);
  const [Origen, setOrigen] = useState(0);
  const [FrenteOrigen, setFrenteOrigen] = useState(0);

  const customStyles = {
    content: {
      backgroundColor: 'rgb(128 128 128 / 50%)',
      top: '0%',
      right: '-.5%',
      bottom: '0%',
    },
  };
  const [Modalplaca, setModalplaca] = useState(false);
  const [Modalmaterial, setModalmaterial] = useState(false);
  const [Modalregistro, setModalregistro] = useState(false);
  const [Modalmanual, setModalmanual] = useState(false);
  const [ModalOrigen, setModalOrigen] = useState(false);
  const [ModalFrenteOrigen, setModalFrenteOrigen] = useState(false);
  const [Zoom, setZoom] = useState(false);
  const Material =
    NomMotivoEntrada === 9
      ? row && row.length > 0 && row[0].ClaArticuloCompra > 0
        ? row[0].ClaArticuloCompra
        : 0
      : NomMotivoEntrada === 3
      ? row > 0 && row[0].ClaMaterialRecibeTraspaso > 0
        ? row[0].ClaMaterialRecibeTraspaso
        : 0
      : 0;
  // Función que guarda los cambios efectuados en el material
  // Servicio JSON 14 --> SP= BasSch.BasObtieneFotografiasMaterialPro <Obtiene fotos>
  // Servicio JSON 26 --> SP= BasSch.BasObtieneFotografiasMaterialPreRegProc <Material pre-registro>
  useEffect(() => {
    let isCancelled = false;
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    /* eslint-disable */
    const data14 = {
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"ClaServicioJson":' +
        14 +
        ',"Parametros":"@pnClaUbicacion=' +
        editBoxValue +
        ''+config.Separador+'@pnIdBoleta=' +
        id +
        ''+config.Separador+'@pnClaTipoCamaraVideo=1"}',
      tipoEstructura: 0,
    };

    const data26 = {
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"ClaServicioJson":' +
        26 +
        ',"Parametros":"@pnClaUbicacion=' +
        editBoxValue +
        ''+config.Separador+'@pnIdBoleta=' +
        id +
        ''+config.Separador+'@pnClaArticulo=-1"}',
      tipoEstructura: 0,
    };

    const data141 = {
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"ClaServicioJson":' +
        14 +
        ',"Parametros":"@pnClaUbicacion=' +
        editBoxValue +
        ''+config.Separador+'@pnIdBoleta=' +
        id +
        ''+config.Separador+'@pnClaTipoCamaraVideo=2"}',
      tipoEstructura: 0,
    };

    const data142 = {
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"ClaServicioJson":' +
        14 +
        ',"Parametros":"@pnClaUbicacion=' +
        editBoxValue +
        ''+config.Separador+'@pnIdBoleta=' +
        id +
        ''+config.Separador+'@pnClaTipoCamaraVideo=5"}',
      tipoEstructura: 0,
    };

    const data143 = {
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"ClaServicioJson":' +
        14 +
        ',"Parametros":"@pnClaUbicacion=' +
        editBoxValue +
        ''+config.Separador+'@pnIdBoleta=' +
        id +
        ''+config.Separador+'@pnClaTipoCamaraVideo=6"}',
      tipoEstructura: 0,
    };

    const data40 = {
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"ClaServicioJson":' +
        40 +
        ',"Parametros":"@pnClaArticulo=' +
        Material +
        '"}',
      tipoEstructura: 0,
    };
    /* eslint-enable */
    callApi(urlKrakenService, 'POST', data14, (res) => {
      setFotoplaca(res.Result0.length > 0 ? res.Result0[0].Fotografia : 0);
    });

    callApi(urlKrakenService, 'POST', data141, (res) => {
      setMaterialsuperior(res.Result0.length > 0 ? res.Result0[0].Fotografia : 0);
    });

    // callApi(urlKrakenService, 'POST', data142, (res) => {
    //   setOrigen(res.Result0.length > 0 ? res.Result0[0].Fotografia : 0);
    // });

    // callApi(urlKrakenService, 'POST', data143, (res) => {
    //   setFrenteOrigen(res.Result0.length > 0 ? res.Result0[0].Fotografia : 0);
    // });

    callApi(urlKrakenService, 'POST', data26, (res) => {
      setPreregistro(res.Result0.length > 0 ? res.Result0[0].FotoMaterial : 0);
    });

    if (Material !==false && Material > 0) {
      callApi(urlKrakenService, 'POST', data40, (res) => {
        setManual(res.Result0.length > 0 ? res.Result0[0].Imagen : 0);
      });
    }
    return () => {
      isCancelled = true;
    };
  }, [Material]);

  return (
    <div className="Imagenes" style={{ textAlign: 'center' }}>
      <Slider {...settings}>
        <div>
          <Card className="pt-imagenes">
            <CardHeader>
              <CardTitle>
                <span> Foto Placa</span>
                <span
                  onClick={() => {
                    setModalplaca(true);
                  }}
                >
                  {Fotoplaca ? <ZoomInIcon style={{ float: 'right', cursor: 'pointer' }} /> : null}
                </span>
              </CardTitle>
            </CardHeader>
            <CardBody className="p-2">
              <img
                style={{ width: '100%' }}
                src={
                  Fotoplaca !== 0 /* eslint-disable */
                    ? 'data:image/jpg;base64,' + Fotoplaca + ''
                    : /* eslint-enable */ ''
                }
                alt=""
              />
            </CardBody>
            <Modal isOpen={Modalplaca} onClose="" ariaHideApp={false} style={customStyles}>
              <div className="Completo_container">
                <span
                  className="close-image"
                  onClick={() => {
                    setModalplaca(false);
                  }}
                >
                  X
                </span>
                <div
                  onClick={() => {
                    setZoom(!Zoom);
                  }}
                >
                  <img
                    className="imagen_completa"
                    style={{
                      width: Zoom ? '100%' : '60%',
                      cursor: Zoom ? 'zoom-out' : 'zoom-in',
                      marginLeft: Zoom ? '0%' : '20%',
                    }}
                    src={
                      Fotoplaca !== 0 /* eslint-disable */
                        ? 'data:image/jpg;base64,' + Fotoplaca + ''
                        : /* eslint-enable */ ''
                    }
                    alt=""
                  />
                </div>
              </div>
            </Modal>
          </Card>
        </div>
        <div>
          <Card className="pt-imagenes">
            <CardHeader>
              <CardTitle>
                <span>Material Superior</span>
                <span
                  onClick={() => {
                    setModalmaterial(true);
                  }}
                >
                  {Fotoplaca ? <ZoomInIcon style={{ float: 'right', cursor: 'pointer' }} /> : null}
                </span>
              </CardTitle>
            </CardHeader>
            <CardBody className="p-2">
              <img
                style={{ width: '100%' }}
                src={
                  Materialsuperior !== 0 /* eslint-disable */
                    ? 'data:image/jpg;base64,' + Materialsuperior + ''
                    : /* eslint-enable */ ''
                }
                alt=""
              />
            </CardBody>
            <Modal isOpen={Modalmaterial} onClose="" ariaHideApp={false} style={customStyles}>
              <div className="Completo_container">
                <span
                  className="close-image"
                  onClick={() => {
                    setModalmaterial(false);
                  }}
                >
                  X
                </span>
                <div
                  onClick={() => {
                    setZoom(!Zoom);
                  }}
                >
                  <img
                    style={{
                      width: Zoom ? '100%' : '60%',
                      cursor: Zoom ? 'zoom-out' : 'zoom-in',
                      marginLeft: Zoom ? '0%' : '20%',
                    }}
                    src={
                      Materialsuperior !== 0 /* eslint-disable */
                        ? 'data:image/jpg;base64,' + Materialsuperior + ''
                        : /* eslint-enable */ ''
                    }
                    alt=""
                  />
                </div>
              </div>
            </Modal>
          </Card>
        </div>
        <div>
          <Card className="pt-imagenes">
            <CardHeader>
              <CardTitle>
                <span>Pre-registro</span>
                <span
                  onClick={() => {
                    setModalregistro(true);
                  }}
                >
                  {Fotoplaca ? <ZoomInIcon style={{ float: 'right', cursor: 'pointer' }} /> : null}
                </span>
              </CardTitle>
            </CardHeader>
            <CardBody className="p-2">
              <img
                className="imagen-pre-registro"
                style={{ width: '100%' }}
                src={
                  Preregistro !== 0 /* eslint-disable */
                    ? 'data:image/jpg;base64,' + Preregistro + ''
                    : /* eslint-enable */ ''
                }
                alt=""
              />
            </CardBody>
            <Modal isOpen={Modalregistro} onClose="" ariaHideApp={false} style={customStyles}>
              <div className="Completo_container">
                <span
                  className="close-image"
                  onClick={() => {
                    setModalregistro(false);
                  }}
                >
                  X
                </span>
                <div
                  onClick={() => {
                    setZoom(!Zoom);
                  }}
                >
                  <img
                    style={{
                      width: Zoom ? '100%' : '60%',
                      cursor: Zoom ? 'zoom-out' : 'zoom-in',
                      marginLeft: Zoom ? '0%' : '20%',
                    }}
                    src={
                      Preregistro !== 0 /* eslint-disable */
                        ? 'data:image/jpg;base64,' + Preregistro + ''
                        : /* eslint-enable */ ''
                    }
                    alt=""
                  />
                </div>
              </div>
            </Modal>
          </Card>
        </div>
        <div>
          <Card className="pt-imagenes">
            <CardHeader>
              <CardTitle>
                <span>Manual Oficial</span>
                <span
                  onClick={() => {
                    setModalmanual(true);
                  }}
                >
                  {Manual ? <ZoomInIcon style={{ float: 'right', cursor: 'pointer' }} /> : null}
                </span>
              </CardTitle>
            </CardHeader>
            <CardBody className="p-2">
              <img
                style={{ width: '100%' }}
                src={
                  Manual !== 0 /* eslint-disable */
                    ? 'data:image/jpg;base64,' + Manual + ''
                    : /* eslint-enable */ ''
                }
                alt=""
              />
            </CardBody>
            <Modal isOpen={Modalmanual} onClose="" ariaHideApp={false} style={customStyles}>
              <div className="Completo_container">
                <span
                  className="close-image"
                  onClick={() => {
                    setModalmanual(false);
                  }}
                >
                  X
                </span>
                <div
                  onClick={() => {
                    setZoom(!Zoom);
                  }}
                >
                  <img
                    style={{
                      width: Zoom ? '200%' : '150%',
                      cursor: Zoom ? 'zoom-out' : 'zoom-in',
                      marginLeft: Zoom ? '-40%' : '-40%',
                    }}
                    src={
                      Manual !== 0 /* eslint-disable */
                        ? 'data:image/jpg;base64,' + Manual + ''
                        : /* eslint-enable */ ''
                    }
                    alt=""
                  />
                </div>
              </div>
            </Modal>
          </Card>
        </div>

 
        <div>
          <Card className="pt-imagenes">
            <CardHeader>
              <CardTitle>
                <span>Salida en Ubicación Origen</span>
                <span
                  onClick={() => {
                    setModalOrigen(true);
                  }}
                >
                  {Origen ? <ZoomInIcon style={{ float: 'right', cursor: 'pointer' }} /> : null}
                </span>
              </CardTitle>
            </CardHeader>
            <CardBody className="p-2">
              <img
                style={{ width: '100%' }}
                src={
                  Origen !== 0 /* eslint-disable */
                    ? 'data:image/jpg;base64,' + Origen + ''
                    : /* eslint-enable */ ''
                }
                alt=""
              />
            </CardBody>
            <Modal isOpen={ModalOrigen} onClose="" ariaHideApp={false} style={customStyles}>
              <div className="Completo_container">
                <span
                  className="close-image"
                  onClick={() => {
                    setModalOrigen(false);
                  }}
                >
                  X
                </span>
                <div
                  onClick={() => {
                    setZoom(!Zoom);
                  }}
                >
                  <img
                    style={{
                      width: Zoom ? '150%' : '70%',
                      cursor: Zoom ? 'zoom-out' : 'zoom-in',
                      marginLeft: Zoom ? '-40%' : '15%',
                      marginTop: Zoom ? '30%' : '0%',
                    }}
                    src={
                      Origen !== 0 /* eslint-disable */
                        ? 'data:image/jpg;base64,' + Origen + ''
                        : /* eslint-enable */ ''
                    }
                    alt=""
                  />
                </div>
              </div>
            </Modal>
          </Card>
        </div>

        <div>
          <Card className="pt-imagenes">
            <CardHeader>
              <CardTitle>
                <span>Fotos Origen 1</span>
                <span
                  onClick={() => {
                    setModalFrenteOrigen(true);
                  }}
                >
                  {FrenteOrigen ? <ZoomInIcon style={{ float: 'right', cursor: 'pointer' }} /> : null}
                </span>
              </CardTitle>
            </CardHeader>
            <CardBody className="p-2">
              <img
                style={{ width: '100%' }}
                src={
                  FrenteOrigen !== 0 /* eslint-disable */
                    ? 'data:image/jpg;base64,' + FrenteOrigen + ''
                    : /* eslint-enable */ ''
                }
                alt=""
              />
            </CardBody>
            <Modal isOpen={ModalFrenteOrigen} onClose="" ariaHideApp={false} style={customStyles}>
              <div className="Completo_container">
                <span
                  className="close-image"
                  onClick={() => {
                    setModalFrenteOrigen(false);
                  }}
                >
                  X
                </span>
                <div
                  onClick={() => {
                    setZoom(!Zoom);
                  }}
                >
                  <img
                    style={{
                      width: Zoom ? '150%' : '70%',
                      cursor: Zoom ? 'zoom-out' : 'zoom-in',
                      marginLeft: Zoom ? '0%' : '15%',
                    }}
                    src={
                      FrenteOrigen !== 0 /* eslint-disable */
                        ? 'data:image/jpg;base64,' + FrenteOrigen + ''
                        : /* eslint-enable */ ''
                    }
                    alt=""
                  />
                </div>
              </div>
            </Modal>
          </Card>
        </div>
      </Slider>
    </div>
  );
}

export default Imagenes;
