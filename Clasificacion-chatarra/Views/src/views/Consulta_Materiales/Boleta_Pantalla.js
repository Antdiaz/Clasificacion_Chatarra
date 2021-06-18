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
// Imagenes placa,material, etc
import Imagenes from './Imagenes'

function Boleta({
  editBoxValue,
  row,
  setrow,
  material,
  setmaterial,
  materialtodos,
  setmaterialtodos,
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
  NomMotivoEntrada,
  setNomMotivoEntrada,
  ClaUbicacionOrigen,
  ClaViajeOrigen,
  ClaFabricacionViaje,
  setClaFabricacionViaje,
  Materialviaje,
  setMaterialviaje
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
  const [idmaterialviaje, setidmaterialviaje] = useState(0);
 // Estilo de pop up/ wizard
  const customStyles = {
    content: {
      background: 'rgba(128, 128, 128, 0.212)',
      top: '0%',
      right: '-.5%',
      bottom: '0%',
    },
  };

  useEffect(() => {
    let isCancelled = false;
    // Servicio JSON 2 --> SP= AmpSch.AmpClaConsultaVehiculoAClasificarSel <Consultar datos placa>
    const urlKrakenVal = `${config.KrakenService}/${24}/${config.Servicio}`;

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
    async function FuncionData(){
    callApi(urlKrakenVal, 'POST', data10, (res) => {
      setcontaminacion(res.Result0);
    });

    await callApi(urlKrakenVal, 'POST', data5, (res) => {
      setplacadato(res.Result0);
    })};

    if(NomMotivoEntrada===3 || NomMotivoEntrada===9){
      FuncionData()
    }

     return()=> {
        isCancelled = true
      }
  }, [poppesaje]);

  return (
    <>
      <div className="content" style={{ marginTop: '20px' }}>

        {/* Pop up mensaje si material es pesaje parcial */} 

        {row  && placadato && poppesaje && (placadato[0].EsPesajeParcial ===1 || pesajeparcial===1) && row.every(ro => ro.KilosMaterial === 0)? (
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
        <Imagenes id={id} editBoxValue={editBoxValue} row={row} NomMotivoEntrada={NomMotivoEntrada} />
        {/* Pop up para clasificar un nuevo material */} 
        <Row>
          <Col>
            <Card>
              <Modal
                isOpen={modaladdOpen}
                onClose={() => setmodaladdOpen(true)}
                ariaHideApp={false}
                style={customStyles}
              >
                <NuevoMaterial
                  Materialviaje={Materialviaje}
                  material={material}
                  materialtodos={materialtodos}
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
                  NomMotivoEntrada={NomMotivoEntrada}
                  ClaViajeOrigen={ClaViajeOrigen}
                  ClaUbicacionOrigen={ClaUbicacionOrigen}
                  idmaterialviaje={idmaterialviaje}
                  setidmaterialviaje={setidmaterialviaje}
                />
              </Modal>
              <CardHeader>
                <CardTitle style={{ margin: '10px' }}>
                  <i
                    onClick={row &&  placadato[0].EsPesajeParcial!== undefined && placadato[0].EsPesajeParcial ===1  && (row.every(ro => ro.KilosMaterial === 0) || row.some(ro => ro.KilosMaterial===0)) || pesajeparcial===1? ()=> setpoppesaje(true) : () => row && setmodaladdOpen(true)}
                    style={{ cursor: 'pointer' }}
                    className="fa fa-plus"
                    aria-hidden="true"
                  >  
                  </i>
                  <span style={{ marginLeft: '3vw' }}>Clasificar Material</span>
                  <span style={{ marginLeft: '3vw' }}>Placa:&nbsp;{placa}</span>
                  <span style={{ marginLeft: '3vw' }}>Boleta:&nbsp;{id}</span>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row className="detalle-materiales">
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
                          materialtodos={materialtodos}
                          setmaterialtodos={setmaterialtodos}
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
                          NomMotivoEntrada={NomMotivoEntrada}
                          setNomMotivoEntrada={setNomMotivoEntrada}
                          ClaUbicacionOrigen={ClaUbicacionOrigen}
                          ClaViajeOrigen={ClaViajeOrigen}
                          Materialviaje={Materialviaje}
                          ClaFabricacionViaje={ClaFabricacionViaje}
                          setClaFabricacionViaje={setClaFabricacionViaje}
                          idmaterialviaje={idmaterialviaje}
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
                <Row className="detalle-boleta" style={{width:"100%",margin:"0px"}}>
                  <Col md={{ size: 12, offset: 0 }} style={{padding:"0px"}}>

                    {/* Sección de detalles de la boleta/placa */} 

                    {!placadato ? (
                      <div
                        style={{ textAlign: 'center', paddingTop: '40px', marginBottom: '40px' }}
                      >
                        <CircularProgress color="primary" />
                      </div>
                    ) : (
                      <DetalleBoleta listas={placadato} editBoxValue={editBoxValue} Materialviaje={Materialviaje} setMaterialviaje={setMaterialviaje} setmaterial={setmaterial} NomMotivoEntrada={NomMotivoEntrada} ClaUbicacionOrigen={ClaUbicacionOrigen} ClaViajeOrigen={ClaViajeOrigen} ClaFabricacionViaje={ClaFabricacionViaje} />
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
