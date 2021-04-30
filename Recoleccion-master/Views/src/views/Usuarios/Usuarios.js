import React, { useState, useEffect } from 'react';
import DataGrid from 'devextreme-react/data-grid';
import { config } from '../../utils/config';
import { callApi, callKrakenApi } from '../../utils/utils';
import { Card, CardText, CardHeader, CardBody, CardTitle, Button, Row, Col } from 'reactstrap';
import { useParams } from 'react-router';
import PlacaInfo from './PlacaInfo';
import Popup from './Popup';
import Material from './Material';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from 'react-modal';
import Popupadd from './Popupadd';

function Usuarios({
  Valores,
  editBoxValue,
  row,
  setrow,
  material,
  setmaterial,
  setmaterialr,
  setcantidadr,
  setkilosr,
  setobservaciones,
  setalmacen,
  setsubalmacen,
  materialr,
  cantidadr,
  kilosr,
  observaciones,
  almacen,
  subalmacen,
  kiloscont,
  setkiloscont
}) {
  const delay = 5;
  const { placa, id } = useParams();
  const [show, setShow] = useState(false);
  const buttonOptions = {
    text: 'Siguiente \u2192',
  };
  const [placadato, setplacadato] = useState(0);
  const [modaladdOpen, setmodaladdOpen] = useState(false);
  const [addarreglo, setaddarreglo] = useState(0);

  

  const customStyles = {
    content: {
      background: 'rgba(128, 128, 128, 0.212)',
      top: '0%',
      right: '-.5%',
      bottom: '0%',
    },
  };

  useEffect(() => {
    const urlKrakenVal = `${config.KrakenService}/${24}/${5}`;

    /* eslint-disable */
    const data5 = {
      parameters: '{"ClaUbicacion":' + editBoxValue + ',"ClaVehiculoPorClasificar":' + placa + '}',
      tipoEstructura: 1,
    };
    /* eslint-enable */
    callApi(urlKrakenVal, 'POST', data5, (res) => {
      setplacadato(res.Result0);
    });

    const timer1 = setTimeout(() => setShow(true), delay * 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <>
      <div className="content" style={{ marginTop: '20px' }}>
        <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Card className="placa-imagenes">
            <CardHeader>
              <CardTitle>Foto Placa</CardTitle>
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
          <Card className="placa-imagenes">
            <CardHeader>
              <CardTitle>Material Superior</CardTitle>
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
          <Card className="placa-imagenes">
            <CardHeader>
              <CardTitle>Pre-registro</CardTitle>
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
              <Modal
                isOpen={modaladdOpen}
                onClose={() => setmodaladdOpen(true)}
                ariaHideApp={false}
                style={customStyles}
              >
                <Popupadd
                  material={material}
                  addarreglo={addarreglo}
                  setaddarreglo={setaddarreglo}
                  modaladdOpen={modaladdOpen}
                  setmodaladdOpen={setmodaladdOpen}
                />
              </Modal>
              <CardHeader>
                <CardTitle style={{ margin: '10px' }}>
                  <i onClick={() => setmodaladdOpen(true)} style={{ cursor: 'pointer' }} className="fa fa-plus" aria-hidden="true"></i>
                  <span style={{ marginLeft: '3vw' }}>Clasificar Material</span>
                  <span style={{ marginLeft: '3vw' }}>Placa:&nbsp;{placa}</span>
                  <span style={{ marginLeft: '3vw' }}>Boleta:{id}</span>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={{ size: 12, offset: 0 }}>
                    <TableContainer component={Paper}>
                      {!placadato ? (
                        <div style={{ textAlign: 'center', paddingTop: '40px' }}>
                          {show ? 'No hay informacion' : <CircularProgress />}
                        </div>
                      ) : (
                        <Material
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
                          setalmacen={setalmacen}
                          setsubalmacen={setsubalmacen}
                          materialr={materialr}
                          cantidadr={cantidadr}
                          kilosr={kilosr}
                          observaciones={observaciones}
                          almacen={almacen}
                          subalmacen={subalmacen}
                          kiloscont={kiloscont}
                          setkiloscont={setkiloscont}
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
                    {!placadato ? (
                      <div
                        style={{ textAlign: 'center', paddingTop: '40px', marginBottom: '40px' }}
                      >
                        {show ? 'No hay informacion' : <CircularProgress color="primary" />}
                      </div>
                    ) : (
                      <PlacaInfo listas={placadato} />
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

export default Usuarios;
