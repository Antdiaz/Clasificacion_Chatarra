import React, { useState, useEffect } from 'react';
import 'devextreme-react/text-area';
import { CSVLink } from 'react-csv';
import {
  Card,
  CardText,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  Input,
} from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { CommonSeriesSettingsHoverStyle } from 'devextreme-react/chart';
import Detalles from './Detalle_Contaminantes';
import Modal from 'react-modal';

function Consulta({
  Valores,
  Datos,
  setDatos,
  filtropesaje,
  setfiltropesaje,
  showResults,
  setshowResults,
  status,
  setstatus,
  transporte,
  settransporte,
  setpoppesaje,
  setrow,
  NomMotivoEntrada,
  setNomMotivoEntrada,
  setClaUbicacionOrigen,
  setClaViajeOrigen,
  setClaFabricacionViaje,
  setpesajeparcial,
  setFechaDesde,
  setFechaHasta,
  FechaDesde,
  FechaHasta,
  Hoy,
  ReporteFiltrado,
  setReporteFiltrado,
}) {
  const [Headers, setstate] = useState([
    { label: 'Boleta', key: 'Boleta' },
    { label: 'Fecha', key: 'Fecha' },
    { label: 'Proveedor', key: 'Proveedor' },
    { label: 'Materiales', key: 'Materiales' },
    { label: 'Kilos', key: 'Kilos' },
    { label: 'Contaminantes', key: 'Contaminantes' },
    { label: 'Llantas', key: 'Llantas' },
    { label: 'Cilindros', key: 'Cilindros' },
    { label: 'Bollas', key: 'Bollas' },
    { label: 'Tanques', key: 'Tanques' },
    { label: 'Otros', key: 'Otros' },
  ]);
  const [HeaderTable, setHeaderTable] = useState([
    { label: 'Boleta', key: 'Boleta' },
    { label: 'Fecha', key: 'Fecha' },
    { label: 'Proveedor', key: 'Proveedor' },
    { label: 'Materiales', key: 'Materiales' },
    { label: 'Kilos', key: 'Kilos' },
    { label: 'Contaminantes', key: 'Contaminantes' },
    { label: 'LlantasChico', key: 'LlantasChico' },
    { label: 'LlantasMediano', key: 'LlantasMediano' },
    { label: 'LlantasGrande', key: 'LlantasGrande' },
    { label: 'Cilindros', key: 'Cilindros' },
    { label: 'Bollas', key: 'Bollas' },
    { label: 'Tanques', key: 'Tanques' },
    { label: 'Otros', key: 'Otros' },
  ]);
  const [Reportes, setReportes] = useState([
    {
      Boleta: '123456',
      Fecha: '2021-03-01',
      Unidad: 'kgs',
      Proveedor: 'ANGEL',
      Materiales: 'Placas',
      Kilos: '1200',
      MotivoContaminacion: 'Tierra',
      Contaminantes: '600',
      LlantasChico: '0',
      LlantasMediano:'0',
      LlantasGrande:'0',
      Cilindros: '0',
      Bollas: '0',
      Tanques: '2',
      id: 1,
    },
    {
      Boleta: '789012',
      Fecha: '2021-02-01',
      Unidad: 'kgs',
      Proveedor: 'CARLOS',
      Materiales: 'Mixto',
      Kilos: '9000',
      MotivoContaminacion: 'Bicicleta',
      Contaminantes: '600',
      LlantasChico: '2',
      LlantasMediano:'1',
      LlantasGrande:'0',
      Cilindros: '1',
      Bollas: '2',
      Tanques: '0',
      id: 2,
    },
  ]);
  // Valor usado para el input de filtrado
  const [Filtro, setFiltro] = useState(null);
  const customStyles = {
    content: {
      background: 'rgba(128, 128, 128, 0.212)',
      top: '0%',
      right: '-.5%',
      bottom: '0%',
    },
  };
  // Función para input de filtrado
  const handleChange = (event) => {
    event.preventDefault();
    setFiltro(event.target.value);
  };

  // Función para filtrado de Tipo de Transporte

  // Función para filtrado de Tipo de Status

  const handleShow = (e) => {
    setshowResults(!showResults);
  };

  // Función para Filtrado que se agregó al input
  const handleSearch = (e) => {
    e.preventDefault();
    setFechaDesde(document.getElementById("desde").value)
    setFechaHasta(document.getElementById("hasta").value)

    if (Filtro !== null) {
      setDatos(Filtro);
    } else if (Filtro === null) {
      setDatos(null);
    }
  };
  

  const Filtracion =
    Reportes && Datos
      ? Reportes.filter(
          (report) =>
            (report.Fecha >= FechaDesde &&
              report.Fecha <= FechaHasta &&
              report.Boleta.includes(Datos)) ||
            report.Proveedor.includes(Datos.toUpperCase())
        )
      : !Datos &&
        Reportes.filter((report) => report.Fecha >= FechaDesde && report.Fecha <= FechaHasta);

  const csvReport = {
    data: Filtracion,
    headers: HeaderTable,
    filename: 'Reporte.csv',
  };
  function List({ Reportes }) {
    const [Open, setOpen] = useState(false);
    // Componente cascarón de cada material mostrado
    return (
      <>
        {Reportes !== undefined &&
          Reportes.map((report, index) => (
            <>
              <Modal
                isOpen={Open}
                ariaHideApp={false}
                onClose={() => setOpen(true)}
                style={customStyles}
                key={index}
              >
                <Detalles editOpen={Open} seteditOpen={setOpen} report={report} />
              </Modal>
              <TableRow key={index}>
                <TableCell className="table-content" style={{ textAlign: 'center' }}>
                  {report.Boleta}
                </TableCell>
                <TableCell className="table-content" style={{ textAlign: 'center' }}>
                  {report.Fecha}
                </TableCell>
                <TableCell
                  className="table-content"
                  style={{ textAlign: 'center', fontWeight: '600' }}
                >
                  {report.Proveedor}
                </TableCell>
                <TableCell className="table-content" style={{ textAlign: 'center' }}>
                  {report.Materiales}
                </TableCell>
                <TableCell className="table-content" style={{ textAlign: 'center' }}>
                  {report.Kilos}&nbsp;{report.Unidad}
                </TableCell>
                <TableCell className="table-content" style={{ textAlign: 'center' }}>
                  {report.Contaminantes}&nbsp;{report.Unidad}
                  <br />
                  <i className="far fa-file fa-2x" style={{ color: 'gray' }} onClick={() => setOpen(true)}></i>
                  &nbsp;&nbsp;
                  <i className="fas fa-camera" style={{ color: '#ff6a00' }}></i>
                </TableCell>
                <TableCell className="table-content" style={{ textAlign: 'center' }}>
                  {report.LlantasChico>0 || report.LlantasMediano>0 || report.LlantasGrande>0 ? +report.LlantasChico*25 + +report.LlantasMediano*50 + +report.LlantasGrande*100: ''}&nbsp;{report.LlantasChico>0 || report.LlantasMediano>0 || report.LlantasGrande>0 ? report.Unidad: ''}
                  <br />{report.LlantasChico>0 || report.LlantasMediano>0 || report.LlantasGrande>0 ? +report.LlantasChico + +report.LlantasMediano + +report.LlantasGrande : ''}&nbsp;{report.LlantasChico>0 || report.LlantasMediano>0 || report.LlantasGrande>0 ? "pieza(s)":''}
                </TableCell>
                <TableCell className="table-content" style={{ textAlign: 'center' }}>
                  {report.Cilindros>0 ? +report.Cilindros* +100: ''}&nbsp;{report.Cilindros>0 ? report.Unidad: ''}
                  <br />{report.Cilindros>0 ? +report.Cilindros:''}&nbsp;{report.Cilindros>0 ? "pieza(s)": ''}
                </TableCell>
                <TableCell className="table-content" style={{ textAlign: 'center' }}>
                  {report.Bollas>0 ? +report.Bollas*+50 : ''}&nbsp;{report.Bollas>0 ? report.Unidad: ''}
                  <br />{report.Bollas>0 ? +report.Bollas:''}&nbsp;{report.Bollas>0 ? "pieza(s)":''}
                </TableCell>
                <TableCell className="table-content" style={{ textAlign: 'center' }}>
                  {report.Tanques>0 ? +report.Tanques* +200: ''}&nbsp;{report.Tanques>0 ? report.Unidad:''}
                  <br />{report.Tanques>0 ? +report.Tanques: ''}&nbsp;{report.Tanques>0 ? "pieza(s)":''}
                </TableCell>
                <TableCell className="table-content" style={{ textAlign: 'center' }}>
                  {+report.Contaminantes - (+report.Bollas*+50 + +report.Tanques* +200 + +report.Cilindros* +100 + +report.LlantasChico*+25 + +report.LlantasMediano*+50 + +report.LlantasGrande*+100)}&nbsp;{report.Unidad}
                </TableCell>
                {/* Pop up para editar un material */}
              </TableRow>
            </>
          ))}
      </>
    );
  }

  return (
    <div className="content" style={{ minHeight: '450px' }}>
      <Row>
        <Col className="input-show" style={{ position: 'absolute' }}>
          {/* Símbolo ">" cuando no se muestran los filtros */}
          {!showResults && (
            <div className="extra-tab">
              <i className="fas fa-angle-down fa-2x" onClick={handleShow}></i>
            </div>
          )}
        </Col>
      </Row>

      <Row className="align-items-start" style={{ marginTop: '40px' }}>
        <Col className="input-search" md={{ size: 1, offset: 3 }}>
          <h2 style={{ marginTop: '8px' }}>Filtrar: </h2>
        </Col>
        <Col className="input-bar" md={{ size: 4, offset: 0 }}>
          <div className="popup-materiales">
            {/* Input para filtrar por lo que el usuario escriba */}
            <Input
              onChange={handleChange}
              type="text"
              className="kar-input-login"
              placeholder="Boleta / Proveedor / Contaminante"
              // value=""
            />
          </div>
        </Col>
        <Col className="input-search" md={{ size: 1, offset: 0 }}>
          <div id="formularioTickets">
            {/* Botón para hacer el filtrado */}
            <Button
              onClick={handleSearch}
              className="animation-on-hover float-right"
              color="success"
            >
              <i className="fa fa-search" aria-hidden="true"></i>
            </Button>
          </div>
        </Col>
      </Row>
      {/* Filtros de tipo de tranporte y status */}
      {showResults && (
        <Row className="extra-filter">
          <Col md={{ size: 0, offset: 3 }}>
            <i className="fas fa-angle-right fa-2x" onClick={handleShow}></i>
          </Col>
          <Col md={{ size: 3, offset: 0 }}>
            <form className="filtro-transporte">
              <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
              <label type="text" className="filtro-texto">
                Desde:
              </label>
              &nbsp;
              <input
                type="date"
                name="desde"
                id="desde"
                className="extra-select"
                max={Hoy}
                defaultValue={FechaDesde}
              />
            </form>
          </Col>
          <Col md={{ size: 3, offset: 0 }}>
            <form>
              <>{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}</>
              <label type="text" className="filtro-texto">
                {' '}
                Hasta:
              </label>
              &nbsp;
              <input
                type="date"
                name="hasta"
                id="hasta"
                className="extra-select"
                max={Hoy}
                defaultValue={FechaHasta}
              />
            </form>
          </Col>
        </Row>
      )}
      {/* Placas de la Ubicación afectado por los filtros */}
      <Row className="detalle-materiales">
        <Col>
          <Card
            style={{ marginTop: '30px', marginLeft: 'auto', marginRight: 'auto' }}
            className="reportes"
          >
            <CardHeader>
              <CardTitle style={{ margin: '10px', textAlign: 'end' }}>
                <CSVLink {...csvReport} style={{ color: 'white' }}>
                  <i className="fas fa-file-download" style={{ cursor: 'pointer' }}></i>
                  &nbsp;&nbsp;
                  <span style={{ cursor: 'pointer' }}>Exportar Excel</span>
                </CSVLink>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <TableContainer component={Paper}>
                <TableHead>
                  <TableRow>
                    {Headers.map((header, index) => (
                      <TableCell className="table-header" key={index}>
                        {header.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <List
                    Reportes={
                      Datos
                        ? Reportes.filter(
                            (report) =>
                              (report.Fecha >= FechaDesde &&
                                report.Fecha <= FechaHasta &&
                                report.Boleta.includes(Datos)) ||
                              report.Proveedor.includes(Datos.toUpperCase())
                          )
                        : !Datos &&
                          Reportes.filter(
                            (report) => report.Fecha >= FechaDesde && report.Fecha <= FechaHasta
                          )
                    }
                  />
                </TableBody>
              </TableContainer>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Consulta;
