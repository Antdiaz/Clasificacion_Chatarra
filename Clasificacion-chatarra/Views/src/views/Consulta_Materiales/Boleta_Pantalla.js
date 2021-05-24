import React, { useState, useEffect } from 'react';
import { config } from '../../utils/config';
import { callApi} from '../../utils/utils';
import { Card, CardText, CardHeader, CardBody, CardTitle, Button, Row, Col } from 'reactstrap';
import { useParams } from 'react-router';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from 'react-modal';
// Wizard nuevo material
import NuevoMaterial from './Clasificar_Nuevo_Material';
// Mensaje pesaje parcial
import PesajeParcial from './PesajeParcial';
// Listado Clasificación material
import Materiales from './Materiales';
// Detalle de Boleta
import DetalleBoleta from './Detalle_Boleta';

function Boleta({
  editBoxValue,
  row,
  setrow,
  material,
  setmaterial,
  setmaterialr,
  setcantidadr,
  setkilosr,
  setobservaciones,
  kiloscont,
  setkiloscont,
  pesajeparcial,
  setpesajeparcial,
  poppesaje,
  setpoppesaje,
  warning,
  setwarning,
}) {
   // Valores obtenidos de URL de detalle de boleta
  const { placa, id } = useParams();
   // Valores de servicio sobre información de boleta
  const [placadato, setplacadato] = useState(0);
  // Valor que lee cuando se abre wizard de agregar Material
  const [modaladdOpen, setmodaladdOpen] = useState(false);
  // Listado de servicio de Razón de Contaminación
  const [contaminacion, setcontaminacion] = useState();
  // Valor que lee cuando se abre wizard de editar Material
  const [editOpen, seteditOpen] = useState(false);
 // Valor que lee la foto placa
  const [Fotoplaca, setFotoplaca] = useState(0)
  // Valor que lee Material Superior
  const [Materialsuperior, setMaterialsuperior] = useState(0)
   // Valor que lee Material Superior
   const [Preregistro, setPreregistro] = useState(0)
 // Estilo de pop up/ wizard
  const customStyles = {
    content: {
      background: 'rgba(128, 128, 128, 0.212)',
      top: '0%',
      right: '-.5%',
      bottom: '0%',
    },
  };

// Función que guarda los cambios efectuados en el material
  // Servicio JSON 14 --> SP= BasSch.BasObtieneFotografiasMaterialPro <Obtiene fotos>
  // Servicio JSON 26 --> SP= BasSch.BasObtieneFotografiasMaterialPreRegProc <Material pre-registro>
  useEffect(( ) => {
    const timerID = setTimeout(() => {
    const urlKrakenService = `${config.KrakenService}/${24}/${37}`;
/* eslint-disable */
    const data14 = {
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"ClaServicioJson":' +
        14 +
        ',"Parametros":"@pnClaUbicacion=' +
        editBoxValue +
        ',@pnIdBoleta=' +
        id +
        ',@pnClaTipoCamaraVideo=1"}',
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
        ',@pnIdBoleta=' +
        id +
        ',@pnClaArticulo=-1"}',
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
        ',@pnIdBoleta=' +
        id +
        ',@pnClaTipoCamaraVideo=2"}',
      tipoEstructura: 0,
    };
/* eslint-enable */
    callApi(urlKrakenService, 'POST', data14, (res) => {
      setFotoplaca(res.Result0.length>0 ? res.Result0[0].Fotografia : 0)
    });

    callApi(urlKrakenService, 'POST', data141, (res) => {
      setMaterialsuperior(res.Result0.length>0 ? res.Result0[0].Fotografia : 0)
    });

    callApi(urlKrakenService, 'POST', data26, (res) => {
      setPreregistro(res.Result0.length>0 ? res.Result0[0].Fotografia : 0)
    });
  },4000)
  },[])

  useEffect(() => {
    // Servicio JSON 2 --> SP= AmpSch.AmpClaConsultaVehiculoAClasificarSel <Consultar datos placa>
    // El timeout es para darle tiempo de respuesta
    setTimeout(()=>{
    const urlKrakenVal = `${config.KrakenService}/${24}/${37}`;

    /* eslint-disable */
    const data5 = {
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"ClaServicioJson":' +
        2 +
        ',"Parametros":"@pnClaUbicacion=' +
        editBoxValue +
        ',@psClaVehiculoPorClasificar=' +
        placa +
        '"}',
      tipoEstructura: 0,
    };
    /* eslint-enable */
    callApi(urlKrakenVal, 'POST', data5, (res) => {
      setplacadato(res.Result0);
    });

    // Servicio JSON 10 --> SP= AmpSch.AmpClaMotivoContaminacionCmb <Consultar motivo Contaminacion>
    /* eslint-disable */
    const data10 = {
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"ClaServicioJson":' +
        10 +
        ',"Parametros":"@pnClaUbicacion=' +
        editBoxValue +
        '"}',
      tipoEstructura: 0,
    };
    /* eslint-enable */
    callApi(urlKrakenVal, 'POST', data10, (res) => {
      setcontaminacion(res.Result0);
    });
  },1000)
  }, [poppesaje,!editOpen]);
  return (
    <>
      <div className="content" style={{ marginTop: '20px' }}>

        {/* Pop up mensaje si material es pesaje parcial */} 

        {placadato && poppesaje && placadato && placadato[0].EsPesajeParcial ===1? (
          <PesajeParcial
            placadato={placadato}
            editBoxValue={editBoxValue}
            row={row}
            poppesaje={poppesaje}
            setpoppesaje={setpoppesaje}
            setpesajeparcial={setpesajeparcial}
            pesajeparcial={pesajeparcial}
          />
        ) : null}

        {/* Sección Imagenes */} 

        <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Card className="placa-imagenes">
            <CardHeader>
              <CardTitle>Foto Placa</CardTitle>
            </CardHeader>
            <CardBody className="p-2">
              <img
                style={{ width: '100%' }}
                src={Fotoplaca !==0 ? /* eslint-disable */
                  'data:image/jpg;base64,'+ Fotoplaca +''
                /* eslint-enable */ : ''}
                alt=""
              />
              <CardText className="mb-2 text-center"></CardText>
              <div className="text-center mt-2"></div>
            </CardBody>
          </Card>
          <Card className="placa-imagenes">
            <CardHeader>
              <CardTitle>Material Superior</CardTitle>
            </CardHeader>
            <CardBody className="p-2">
              <img
                style={{ width: '100%' }}
                src={Materialsuperior !== 0 ? /* eslint-disable */
                'data:image/jpg;base64,'+ Materialsuperior +''
              /* eslint-enable */ : ''}
                alt=""
              />
              <CardText className="mb-2 text-center"></CardText>
              <div className="text-center mt-2"></div>
            </CardBody>
          </Card>
          <Card className="placa-imagenes">
            <CardHeader>
              <CardTitle>Pre-registro</CardTitle>
            </CardHeader>
            <CardBody className="p-2">
              <img
                style={{ width: '100%' }}
                src={Preregistro !== 0 ? /* eslint-disable */
                  'data:image/jpg;base64,'+ Preregistro +''
                /* eslint-enable */ : ''}
                alt=""
              />
              <CardText className="mb-2 text-center"></CardText>
              <div className="text-center mt-2"></div>
            </CardBody>
          </Card>
          <Card className="placa-imagenes">
            <CardHeader>
              <CardTitle>Manual Oficial</CardTitle>
            </CardHeader>
            <CardBody className="p-2">
              <img
                style={{ width: '100%' }}
                src="https://www.supraciclaje.com/wp-content/uploads/2017/06/precio-compra-metales-no-ferrosos-reciclados-mexico.jpg"
                alt=""
              />
              <CardText className="mb-2 text-center"></CardText>
              <div className="text-center mt-2"></div>
            </CardBody>
          </Card>
        </Row>
        <Row>
          <Col>
            <Card>

              {/* Pop up para clasificar un nuevo material */} 

              <Modal
                isOpen={modaladdOpen}
                onClose={() => setmodaladdOpen(true)}
                ariaHideApp={false}
                style={customStyles}
              >
                <NuevoMaterial
                  material={material}
                  modaladdOpen={modaladdOpen}
                  setmodaladdOpen={setmodaladdOpen}
                  pesajeparcial={pesajeparcial}
                  setpesajeparcial={setpesajeparcial}
                  editBoxValue={editBoxValue}
                  placadato={placadato}
                  setplacadato={setplacadato}
                  setpoppesaje={setpoppesaje}
                  contaminacion={contaminacion}
                  row={row}
                  setrow={setrow}
                />
              </Modal>
              <CardHeader>
                <CardTitle style={{ margin: '10px' }}>
                  <i
                    onClick={row && placadato[0].EsPesajeParcial ===1 && (row.every(ro => ro.KilosMaterial === 0) || row.some(ro => ro.KilosMaterial===0))? ()=> setpoppesaje(true) : () => row && setmodaladdOpen(true)}
                    style={{ cursor: 'pointer' }}
                    className="fa fa-plus"
                    aria-hidden="true"
                  >  
                  </i>
                  <span style={{ marginLeft: '3vw' }}>Clasificar Material</span>
                  <span style={{ marginLeft: '3vw' }}>Placa:&nbsp;{placa}</span>
                  <span style={{ marginLeft: '3vw' }}>Boleta:{id}</span>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={{ size: 12, offset: 0 }}>
                    <TableContainer component={Paper}>

                      {/* Sección de Clasificación de materiales */} 

                      {!placadato ? (
                        <div style={{ textAlign: 'center', paddingTop: '40px' }}>
                          <CircularProgress />
                        </div>
                      ) : (
                        <Materiales
                          editOpen={editOpen}
                          seteditOpen={seteditOpen}
                          contaminacion={contaminacion}
                          placadato={placadato}
                          editBoxValue={editBoxValue}
                          id={id}
                          row={row}
                          setrow={setrow}
                          material={material}
                          setmaterial={setmaterial}
                          setmaterialr={setmaterialr}
                          setcantidadr={setcantidadr}
                          setkilosr={setkilosr}
                          setobservaciones={setobservaciones}
                          kiloscont={kiloscont}
                          setkiloscont={setkiloscont}
                          pesajeparcial={pesajeparcial}
                          setpesajeparcial={setpesajeparcial}
                          poppesaje={poppesaje}
                          setpoppesaje={setpoppesaje}
                          warning={warning}
                          setwarning={setwarning}
                          modaladdOpen={modaladdOpen}
                        />
                      )}
                    </TableContainer>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle style={{ margin: '10px' }}>
                  <span>Datos de la Unidad</span>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={{ size: 12, offset: 0 }}>

                    {/* Sección de detalles de la boleta/placa */} 

                    {!placadato ? (
                      <div
                        style={{ textAlign: 'center', paddingTop: '40px', marginBottom: '40px' }}
                      >
                        <CircularProgress color="primary" />
                      </div>
                    ) : (
                      <DetalleBoleta listas={placadato} />
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Boleta;
