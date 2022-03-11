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
import {IconButton} from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { CommonSeriesSettingsHoverStyle } from 'devextreme-react/chart';
import Modal from 'react-modal';
import { callApi, getSessionItem } from '../../../utils/utils';
import { config } from '../../../utils/config';
import SearchIcon from '@mui/icons-material/Search';
import Listas from './Renglon_Condicion';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

function Consulta({
  editBoxValue,
  Reportes,
  FiltroReporte,
}) {
  const [Headers, setstate] = useState([
    { label: 'Patio', key: 'Patio' },
    { label: 'Pesaje Blindado Tableta de Registro', key: 'IdBoleta' },
    { label: 'Entrada Código QR', key: 'Fecha' },
    { label: 'Evidencia Fotográfica', key: 'Proveedor' },
    { label: 'Huella Digital', key: 'Materiales' },
    { label: 'Clasificación Celular/App', key: 'Kilos' },
  ]);

  const [dummy, setdummy] = useState(0);
  const [loading, setloading] = useState(false);
  const handleOnclick = () =>{
    setdummy([])
    setloading(true)
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    /* eslint-disable */
    const data95 = {
      parameters: '{"ClaUbicacion":' + editBoxValue + ',"ClaServicioJson":' + 95 + ',"Parametros":"@pnClaUbicacion=' + editBoxValue +'"}',
      tipoEstructura: 0,
    };
    /* eslint-enable */
    callApi(urlKrakenService, 'POST', data95,(res) => {
    setdummy(res.Result0)
    setloading(false)
    });
    
  }


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


  
  return (
    <div className="content Reportes" style={{ minHeight: '450px' }}>
      <div className="titulo">Condiciones para Operaciones blindadas</div>
      {/* Filtros de tipo de tranporte y status */}
      {/* Placas de la Ubicación afectado por los filtros */}
      <Row className="detalle-condiciones">
        <Col>
          <Card
            style={{ marginTop: '10px', marginLeft: 'auto', marginRight: 'auto' }}
            className="condicion"
          >
            <CardHeader>
              <CardTitle style={{ margin: '10px', textAlign: 'end' }}>
                <Tooltip title="Mostrar Datos">
                  <IconButton style={{color:'white'}} onClick={!loading ? handleOnclick : null}>
                    <SearchIcon />
                  </IconButton>
                </Tooltip>             
              </CardTitle>
            </CardHeader>
            <CardBody>
              <TableContainer component={Paper}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell className="condicion-header">
                        {Headers[0].label}
                      </TableCell>
                      <TableCell className="condicion-header">
                        {Headers[1].label}
                      </TableCell>
                      <TableCell className="condicion-header">
                        {Headers[2].label}
                      </TableCell>
                      <TableCell className="condicion-header">
                        {Headers[3].label}
                      </TableCell>
                      <TableCell className="condicion-header">
                        {Headers[4].label}
                      </TableCell>
                      <TableCell className="condicion-header">{Headers[5].label}</TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
                <Table>
                  <TableBody>
                    {dummy !== 0 && dummy !== [] ? (
                      <Listas
                        editBoxValue={editBoxValue}
                        Reportes={dummy}
                      />
                    ):loading && (
                      <div style={{position:'absolute',left: '50%',marginLeft: '-50px',top:'300px'}}>
                        <CircularProgress />
                      </div>
                      )} 
                  </TableBody>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
          <div style={{display:'flex',justifyContent: 'center'}}>Ultimas 10 boletas</div>
          <ul style={{display:'flex',justifyContent: 'center'}}>
            <div style={{padding:'10px'}}><i className="fas fa-circle fa-x" style={{color:'red'}} />&nbsp;Bajo</div>
            <div style={{padding:'10px'}}><i className="fas fa-circle fa-x" style={{color:'yellow'}} />&nbsp;Regular</div>
            <div style={{padding:'10px'}}><i className="fas fa-circle fa-x" style={{color:'green'}} />&nbsp;Excelente</div>
          </ul>
        </Col>
      </Row>
    </div>
  );
}

export default Consulta;
