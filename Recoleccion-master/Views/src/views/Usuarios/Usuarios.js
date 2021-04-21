import React,{useState} from 'react';
import DataGrid from 'devextreme-react/data-grid';
import { config } from '../../utils/config';
import { callApi, callKrakenApi } from '../../utils/utils';
import { Card, CardText, CardHeader, CardBody, CardTitle, Button, Row, Col} from 'reactstrap';
import { useParams } from 'react-router';
import PlacaInfo from './PlacaInfo';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import Popup from './Popup';

function Usuarios({Valores}) {
    const {id} = useParams();
    const Val= localStorage.getItem(Valores)
    const buttonOptions = {
      text: 'Siguiente \u2192',
  };

  

function createData(Fabricacion,MaterialE,MaterialR,Porcentaje,CantidadE,CantidadR,KilosE,KilosR,AtrilE,AtrilR,InventarioA,InventarioS) {
  return {Fabricacion,MaterialE,MaterialR,Porcentaje,CantidadE,CantidadR,KilosE,KilosR,AtrilE,AtrilR,InventarioA,InventarioS};
  }
const rows = [
  createData('123456','Mixto para procesar','Mixto para procesar', 24,15000,14500,36000,25000,0,0,'X','Y'),
  createData('223456','Mixto para procesar','Mixto para procesar', 24,15000,14500,36000,25000,0,0,'X','Y'),
  ];

const [isOpen, setIsOpen] = useState(false);
 
const togglePopup = () => {
  setIsOpen(!isOpen);
  }


    return (
      <>
      
        <div className="content" style={{marginTop: "20px"}}>
          <Row style={{alignItems:"center", justifyContent:"center"}}>
            <Card className="placa-imagenes">
              <CardHeader>
                <CardTitle>Foto Placa</CardTitle>
              </CardHeader>
              <CardBody className="p-2">
                <img style={{ width: '100%' }} src="https://www.supraciclaje.com/wp-content/uploads/2017/06/precio-compra-metales-no-ferrosos-reciclados-mexico.jpg" alt="" />
                <CardText className="mb-2 text-center">
                </CardText>
                <div className="text-center mt-2">
                </div>
              </CardBody>
            </Card>
            <Card className="placa-imagenes">
              <CardHeader>
                <CardTitle>Material Superior</CardTitle>
              </CardHeader>
              <CardBody className="p-2">
                <img style={{ width: '100%' }} src="https://www.supraciclaje.com/wp-content/uploads/2017/06/precio-compra-metales-no-ferrosos-reciclados-mexico.jpg" alt="" />
                <CardText className="mb-2 text-center">
                </CardText>
                <div className="text-center mt-2">
                </div>
              </CardBody>
            </Card>
            <Card className="placa-imagenes">
              <CardHeader>
                <CardTitle>Proveedor / Pre-registro</CardTitle>
              </CardHeader>
              <CardBody className="p-2">
                <img style={{ width: '100%' }} src="https://www.supraciclaje.com/wp-content/uploads/2017/06/precio-compra-metales-no-ferrosos-reciclados-mexico.jpg" alt="" />
                <CardText className="mb-2 text-center">
                </CardText>
                <div className="text-center mt-2">
                </div>
              </CardBody>
            </Card>
            <Card className="placa-imagenes">
              <CardHeader>
                <CardTitle>Manual Oficial</CardTitle>
              </CardHeader>
              <CardBody className="p-2">
                <img style={{ width: '100%' }} src="https://www.supraciclaje.com/wp-content/uploads/2017/06/precio-compra-metales-no-ferrosos-reciclados-mexico.jpg" alt="" />
                <CardText className="mb-2 text-center">
                </CardText>
                <div className="text-center mt-2">
                </div>
              </CardBody>
            </Card>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <CardTitle style={{margin:"10px"}}>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                    <span style={{marginLeft:"50px"}}>Clasificar Material</span>
                    <span style={{marginLeft:"50px"}}>Placa: Plac-323</span>
                    <span style={{marginLeft:"50px"}}>Boleta:{id}</span>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md={{ size: 12, offset: 0 }}>
                      <TableContainer component={Paper}>
                        <Table className="table" aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <TableCell className="table-header">Fabricación</TableCell>
                              <TableCell className="table-header">Material</TableCell>
                              <TableCell className="table-header">Porcentaje</TableCell>
                              <TableCell className="table-header">Cantidad</TableCell>
                              <TableCell className="table-header">Kilos</TableCell>
                              <TableCell className="table-header">Atril/Tarima</TableCell>
                              <TableCell className="table-header">Inventario</TableCell>
                              <TableCell>          </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {rows.map((row) => (
                              <TableRow key={row.Fabricacion}>
                                <TableCell className="table-content" component="th" scope="row">{row.Fabricacion}<br /> Renglon: 5</TableCell>
                                <TableCell className="table-content">Enviado:&nbsp;{row.MaterialE} <br /> Recibido:&nbsp;{row.MaterialR}</TableCell>
                                <TableCell className="table-content" style={{paddingLeft:"70px", fontWeight: "600"}}>{row.Porcentaje}&nbsp;%</TableCell>
                                <TableCell className="table-content">Enviado:&nbsp;{row.CantidadE}&nbsp;lb<br /> Recibido:&nbsp;{row.CantidadR}&nbsp;lb</TableCell>
                                <TableCell className="table-content">Enviado:&nbsp;{row.KilosE}&nbsp;kgs<br />Recibido:&nbsp;{row.KilosR}&nbsp;kgs</TableCell>
                                <TableCell className="table-content">Enviado:&nbsp;{row.AtrilE}&nbsp;kgs<br />Recibido:&nbsp;{row.AtrilR}&nbsp;kgs</TableCell>
                                <TableCell className="table-content">Almacen:&nbsp;{row.InventarioA}<br />Sub-Almacen:&nbsp;{row.InventarioS}</TableCell>
                                <TableCell className="table-content"><div onClick={togglePopup}><EditIcon style={{color:"#ff6a00",cursor:"pointer"}} /></div></TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
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
                  <CardTitle style={{margin:"10px"}}>
                    <span>Datos de la Unidad</span>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md={{ size: 12, offset: 0 }}>
                      <PlacaInfo listas={Valores && Valores.filter((lista) =>lista.ClaVehiculoPorClasificar === id)} />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {isOpen && <Popup handleClose={togglePopup} /> }
        </div>
      </>
    );
}

export default Usuarios