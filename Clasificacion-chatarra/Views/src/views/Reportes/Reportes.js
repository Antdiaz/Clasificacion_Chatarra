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
  Input as Inputs,
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
import { callApi, getSessionItem } from '../../utils/utils';
import { config } from '../../utils/config';
import Listas from './Renglon_Reporte';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

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
  editBoxValue,
  Reportes,
  setReportes,
  Patio,
  FiltroReporte,
  setFiltroReporte,
}) {
  const [Headers, setstate] = useState([
    { label: 'Patio', key: 'Patio' },
    { label: 'Boleta', key: 'IdBoleta' },
    { label: 'Fecha', key: 'Fecha' },
    { label: 'Proveedor', key: 'Proveedor' },
    { label: 'Materiales', key: 'Materiales' },
    { label: 'Kilos', key: 'Kilos' },
    { label: 'Contaminantes', key: 'Contaminantes' },
    { label: 'Rechazo', key: 'Rechazo' },
    { label: 'Llantas', key: 'Llantas' },
    { label: 'Tanque', key: 'Tanques' },
    { label: 'Otros', key: 'Otros' },
    { label: 'Electro/Botes', key: 'ElectroBotes' },
    { label: 'Electro', key: 'Electro' },
    { label: 'Botes', key: 'Botes' },
  ]);
  const [HeaderTable, setHeaderTable] = useState([
    { label: 'Patio', key: 'NombreUbicacion' },
    { label: 'Boleta', key: 'IdBoleta' },
    { label: 'Fecha', key: 'FechaGeneracion' },
    { label: 'Clave Proveedor', key: 'ClaProveedor' },
    { label: 'Proveedor', key: 'NombreCompleto' },
    { label: 'Materiales', key: 'Materiales' },
    { label: 'Kilos', key: 'PesoNeto' },
    { label: 'Contaminantes', key: 'KilosContaminados' },
    { label: 'NomMotivoContaminacion', key: 'NomMotivoContaminacion' },
    { label: 'Rechazo', key: 'Rechazo' },
    { label: 'LlantasChico (kgs)', key: 'LlantasCh' },
    { label: 'LlantasMediano (kgs)', key: 'LlantasM' },
    { label: 'LlantasGrande (kgs)', key: 'LlantasG' },
    { label: 'Cilindros (kgs)', key: 'Cilindro' },
    { label: 'Bollas (kgs)', key: 'Boyas' },
    { label: 'Tanques (kgs)', key: 'Tanque' },
    { label: 'Otros (kgs)', key: 'Otros' },
  ]);
  // Valor usado para el input de filtrado
  const [Filtro, setFiltro] = useState(FiltroReporte);

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: 0,
      minWidth: 120,
      maxWidth: 200,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const classes = useStyles();
  const [personName, setPersonName] = React.useState([]);

  const handlePatio = (event) => {
    setPersonName(event.target.value);
  };

  // Función para input de filtrado
  const handleChange = (event) => {
    setFiltro(event.target.value);
  };

  // Función para filtrado de Tipo de Transporte

  // Función para filtrado de Tipo de Status

  const handleShow = (e) => {
    setshowResults(!showResults);
  };

  const handleFiltro = (e) => {
    e.preventDefault();
    setFechaDesde(document.getElementById('desde').value);
    setFechaHasta(document.getElementById('hasta').value);
  };
  const handleKeypress = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Función para Filtrado que se agregó al input
  const handleSearch = () => {
    if (Filtro !== null) {
      setFiltroReporte(Filtro)
      setDatos(Filtro);
    } else if (Filtro === null) {
      setDatos(null);
    }
  };

  const Filtracion = Reportes
    ? Datos
      ? Reportes.filter(
          (report) =>
            (report.FechaGeneracion >= FechaDesde &&
              report.FechaGeneracion <= FechaHasta &&
              report.IdBoleta.toString().includes(Datos)) ||
            report.NombreCompleto.includes(Datos.toUpperCase()) ||
            report.ClaProveedor.toString().includes(Datos) ||
            (report.ListadoContaminante !== null
              ? report.ListadoContaminante.toString().includes(Datos)
              : null)
        )
      : !Datos &&
        Reportes.filter(
          (report) => report.FechaGeneracion >= FechaDesde && report.FechaGeneracion <= FechaHasta
        )
    : 0;


  const csvReport = Reportes
    ? {
        data: Filtracion,
        headers: HeaderTable,
        filename: 'Reporte.csv',
      }
    : 0;



  return (
    <div className="content Reportes" style={{ minHeight: '450px' }}>
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
            <Inputs
              onKeyPress={handleKeypress}
              onChange={handleChange}
              type="text"
              className="kar-input-login rpt-text"
              placeholder="Boleta / Proveedor / Contaminante"
              defaultValue={FiltroReporte}
            />
          </div>
        </Col>
        {editBoxValue === 6 ? (
          <Col className="Patios input-search" md={{ size: 0, offset: 0 }}>
            {Patio ? (
              <FormControl className={classes.formControl}>
                <InputLabel shrink={false} id="demo-mutiple-checkbox-label">
                  Patios
                </InputLabel>
                <Select
                  disableUnderline={true}
                  labelId="demo-mutiple-checkbox-label"
                  id="demo-mutiple-checkbox"
                  multiple
                  value={personName}
                  onChange={handlePatio}
                  input={<Input />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {Patio.map((name) => (
                    <MenuItem key={name.ClaUbicacion} value={name.ClaUbicacion}>
                      <Checkbox checked={personName.indexOf(name.ClaUbicacion) > -1} />
                      <ListItemText primary={name.NombreCorto} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              Headers[0].label
            )}
          </Col>
        ) : null}
        <Col className="input-search" md={{ size: 0, offset: 0 }}>
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
          <Col md={{ size: 2.9, offset: 0 }} style={{ marginLeft: '2%' }}>
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
                className="extra-select rpts"
                max={Hoy}
                defaultValue={FechaDesde}
              />
            </form>
          </Col>
          <Col md={{ size: 2.9, offset: 0 }} style={{ marginLeft: '1%' }}>
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
                className="extra-select rpts"
                max={Hoy}
                defaultValue={FechaHasta}
              />
            </form>
          </Col>
          <Col>
            <i className="fas fa-filter" onClick={handleFiltro} style={{ cursor: 'pointer' }}></i>
          </Col>
        </Row>
      )}
      {/* Placas de la Ubicación afectado por los filtros */}
      <Row className="detalle-reportes">
        <Col>
          <Card
            style={{ marginTop: '30px', marginLeft: 'auto', marginRight: 'auto' }}
            className="reportes"
          >
            <CardHeader>
              <CardTitle style={{ margin: '10px', textAlign: 'end' }}>
                {Reportes ? (
                  <CSVLink {...csvReport} style={{ color: 'white' }}>
                    <i className="fas fa-file-download" style={{ cursor: 'pointer' }}></i>
                    &nbsp;&nbsp;
                    <span style={{ cursor: 'pointer' }}>Exportar Excel</span>
                  </CSVLink>
                ) : null}
              </CardTitle>
            </CardHeader>
            <CardBody>
              <TableContainer component={Paper}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <div style={{ width:'1vw'}}>
                        <TableCell style={{ height:'51px'}}></TableCell>
                      </div>
                      {editBoxValue===6 ? (
                        <TableCell className="table-header" style={{ minWidth: '3vw' }}>
                          {Headers[0].label}
                        </TableCell>
                      ): null }
                      <TableCell className="table-header" style={{ minWidth: '2vw'}}>
                        {Headers[1].label}
                      </TableCell>
                      <TableCell className="table-header" style={{ minWidth: '8vw' }}>
                        {Headers[2].label}
                      </TableCell>
                      <TableCell className="table-header" style={{ minWidth: '17vw' }}>
                        {Headers[3].label}
                      </TableCell>
                      <TableCell className="table-header" style={{ minWidth: '12vw' }}>
                        {Headers[4].label}
                      </TableCell>
                      <TableCell className="table-header" style={{ minWidth: '5vw' }}>{Headers[5].label}</TableCell>
                      <TableCell className="table-header" style={{ minWidth: '10vw' }}>{Headers[6].label}</TableCell>
                      <TableCell className="table-header" style={{ minWidth: '3vw' }}>{Headers[7].label}</TableCell>
                      <TableCell className="table-header">{Headers[8].label}</TableCell>
                      <TableCell className="table-header">{Headers[9].label}</TableCell>
                      <TableCell className="table-header">{Headers[10].label}</TableCell>
                      <TableCell className="table-header">{Headers[11].label}</TableCell>
                      <TableCell className="table-header">{Headers[12].label}</TableCell>
                      <TableCell className="table-header">{Headers[13].label}</TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
                <Table>
                  <TableBody>
                    {Reportes ? (
                      <Listas
                        editBoxValue={editBoxValue}
                        Reportes={
                          Datos
                            ? Reportes.filter(
                                (report) =>
                                  (report.FechaGeneracion >= FechaDesde &&
                                    report.FechaGeneracion <= FechaHasta &&
                                    report.IdBoleta.toString().includes(Datos)) ||
                                  report.NombreCompleto.includes(Datos.toUpperCase()) ||
                                  report.ClaProveedor.toString().includes(Datos) ||
                                  (report.ListadoContaminante !== null
                                    ? report.ListadoContaminante.toString().includes(
                                        Datos[0].toUpperCase() + Datos.substring(1).toLowerCase()
                                      )
                                    : null) &&
                                    (personName.length!==0 ? personName.includes(report.ClaUbicacion):!personName.includes(report.ClaUbicacion))
                              )
                            : !Datos &&
                              Reportes.filter(
                                (report) =>
                                  report.FechaGeneracion >= FechaDesde &&
                                  report.FechaGeneracion <= FechaHasta &&
                                  (personName.length!==0 ? personName.includes(report.ClaUbicacion):!personName.includes(report.ClaUbicacion))
                              )
                        }
                      />
                    ) : (
                      ''
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Consulta;
