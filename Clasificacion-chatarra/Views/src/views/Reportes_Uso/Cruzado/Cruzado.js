import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { useTheme } from '@material-ui/core/styles';
import TableCell from '@mui/material/TableCell';
import { CSVLink } from 'react-csv';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import TableContainer from '@mui/material/TableContainer';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import RestorePageIcon from '@mui/icons-material/RestorePage';
import { styled } from '@mui/material/styles';
import { callApi, getSessionItem } from '../../../utils/utils';
import { config } from '../../../utils/config';
import {CircularProgress, IconButton, InputAdornment, makeStyles, TextField} from '@material-ui/core';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ListItemText from '@material-ui/core/ListItemText';
import CustomSelect from '../../../components/Controls/Select';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import { months, years,turnos} from './data.js';
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

const useStyles = makeStyles(theme => ({
  paper: {
      margin: theme.spacing(3),
      padding: theme.spacing(3),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around'
  },
  clean: {
    position: 'relative'
},
  divider:{
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding:'2%'
  },
  chipArea:{
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
    width: '200px'
  },
  buttonArea:{
    display: 'flex',
    flexDirection: 'column',
    marginBottom:'2%',
    padding:'.5%'
  },
  label:{
    marginRight: '10px'
  },
  scheduler:{
    marginRight:'20px',
    marginLeft: '20px'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
    backgroundColor: "#ff6a00",
    color: "white"
  }
}));
const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 120,
  },
});

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

function getStyles(item, loc, theme) {
  return {
    fontWeight:
      loc.indexOf(item) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const columns =([
  {id: 'IdBoleta',key:0, label: 'Boleta',minWidth: 170,align: 'center' },
  {id: 'Placas',key:1, label: 'Placas',minWidth: 170,align: 'center',format: (value) => value.toFixed(2), },
  {id: 'NomChofer',key:2, label: 'Nom. Chofer',minWidth: 170,align: 'center',format: (value) => value.toFixed(2), },
  {id: 'NomProveedor',key:3, label: 'Nom. Proveedor',minWidth: 170,align: 'center',format: (value) => value.toFixed(2), },
  {id: 'NomTransporte',key:4, label: 'Nom. Transporte',minWidth: 170,align: 'center',format: (value) => value.toFixed(2), },
  {id: 'NomMotivoEntrada',key:5, label: 'Motivo Entrada',minWidth: 170,align: 'center',format: (value) => value.toFixed(2), },
  {id: 'PesoNeto',key:6, label: 'Peso Neto',minWidth: 170,align: 'center',format: (value) => `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Kg`},  
  {id: 'ClaCUP',key:7, label: 'CUP',minWidth: 170,align: 'center', },
  {id: 'FechaGeneracion',key:8, label: 'Fecha Generación',minWidth: 170,align: 'center',format: (value) => value.toString().split('T')[0] },
  {id: 'PreRegistro',key:9, label: 'Pre-Registro',minWidth: 300,align:'center',format: (value) => value.toFixed(2),tooltip:`Pre-Registro Proveedor` },
  {id: 'PreRegistroDate',key:10, label: 'Fecha Pre-Registro',minWidth: 170,align: 'center',format: (value) => value.toFixed(2), },
  {id: 'Registro',key:11, label: 'Registro',minWidth: 300,align: 'left',format: (value) => value.toFixed(2),tooltip:`Registro Control de Acceso` },
  {id: 'RegistroDate',key:12, label: 'Fecha Registro',minWidth: 170,align: 'center',format: (value) => value.toFixed(2), },
  {id: 'BasculaEntrada',key:13, label: 'Báscula Entrada',minWidth: 300,align: 'left',format: (value) => value.toFixed(2),tooltip:`Pesada al entrar a Patio` },
  {id: 'BasculaEntradaDate',key:14, label: 'Fecha Báscula Entrada',minWidth: 170,align: 'center',format: (value) => value.toFixed(2), },
  {id: 'Clasificacion',key:15, label: 'Clasificación',minWidth: 300,align: 'left',format: (value) => value.toFixed(2), },
  {id: 'ClasificacionDate',key:16, label: 'Fecha Clasificación',minWidth: 170,align: 'center',format: (value) => value.toFixed(2), },
  {id: 'Grua',key:17, label: 'Grúa',minWidth: 170,align: 'center',format: (value) => value.toFixed(2), },
  {id: 'GruaDate',key:18, label: 'Fecha Grúa',minWidth: 170,align: 'center',format: (value) => value.toFixed(2), },
  {id: 'BasculaSalida',key:19, label: 'Báscula Salida',minWidth: 300,align: 'left',format: (value) => value.toFixed(2),tooltip:`Pesada salida camión` },
  {id: 'BasculaSalidaDate',key:20, label: 'Fecha Báscula Salida',minWidth: 170,align: 'center',format: (value) => value.toFixed(2), },
  {id: 'Coincidencias',key:21, label: 'Total Coincidencias',minWidth: 170,align: 'center',format: (value) => value,tooltip:`Riesgo Alto: < 3 \xa0\xa0\xa0 Riesgo Medio: 3-4 \xa0\xa0\xa0\xa0 Bajo Riesgo: 4-5` },
  {id: 'Coincidencias',key:22, label: 'Semaforo',minWidth: 170,align: 'center',tooltip:`Riesgo Alto: < 3 \xa0\xa0\xa0 Riesgo Medio: 3-4 \xa0\xa0\xa0\xa0 Bajo Riesgo: 4-5` },
]);


export default function ColumnGroupingTable({editBoxValue}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [locations, setLocations] = useState(editBoxValue);
  const [currMonth, setCurrMonth] = useState(-1);
  const [currdias, setCurrdias] = useState(-1);
  const [currYear, setCurrYear] = useState(new Date().getFullYear());
  const [lastYear, setlastYear] = useState(0)
  const [currturno, setCurrturno] = useState(0);
  const [horainicio, sethorainicio] = useState(0)
  const [horafin, sethorafin] = useState(24)
  const [empleadosarray, setempleadosarray] = useState(0)
  const [empleados,setempleados] = useState([]);
  const [loading, setloading] = useState(false)
  const classes = useStyles(); 
  const [dummy, setdummy] = useState([])
  const [searchopen, setsearchopen] = useState(false)
  const [filtros, setfiltros] = useState()
  const [busqueda, setbusqueda] = useState("")
  const [dias,setdias] = useState([{id:-1,dia:"Todos"}])
  const theme = useTheme();

  const [HeaderTable, setHeaderTable] = useState([
    {key: 'ClaUbicacion', label: 'ClaUbicación'},
    {key: 'IdBoleta', label: 'Boleta'},
    {key: 'Placas', label: 'Placas'},
    {key: 'NomChofer', label: 'Nom. Chofer'},
    {key: 'NomProveedor', label: 'Nom. Proveedor'},
    {key: 'NomTransporte', label: 'Nom. Transporte'},
    {key: 'NomTransportista', label: 'Nom. Transportista'},
    {key: 'NomMotivoEntrada', label: 'Motivo Entrada'},
    {key: 'PesoNeto', label: 'Peso Neto'},
    {key: 'ClaCUP', label: 'CUP'},
    {key: 'FechaGeneracion', label: 'Fecha Generacion'},
    {key: 'PreRegistro', label: 'PreRegistro'},
    {key: 'PreRegistroDate', label: 'Fecha PreRegistro'},
    {key: 'Registro', label: 'Registro'},
    {key: 'RegistroDate', label: 'Fecha Registro'},
    {key: 'BasculaEntrada', label: 'Bascula Entrada'},
    {key: 'BasculaEntradaDate', label: 'Fecha Bascula Entrada'},
    {key: 'Grua', label: 'Grúa'},
    {key: 'Clasificacion', label: 'Clasificacion'},
    {key: 'ClasificacionDate', label: 'Fecha Clasificacion'},
    {key: 'BasculaSalida', label: 'Báscula Salida'},
    {key: 'BasculaSalidaDate', label: 'Fecha Báscula Salida'},
    {key: 'Coincidencias', label: 'Coincidencias'},
  ]);
  
  
    const csvReport = dummy.length>0
    ? {
        data: dummy,
        headers: HeaderTable,
        filename: 'Reporte.csv',
      }
    : 0;
  
    const onClearClick = () =>{
      setCurrMonth(null);
      setCurrturno(null)
    }

    const handlelimpiar = () =>{
      setfiltros("")
      setbusqueda("")
      setCurrMonth(-1);
      setCurrturno(0);
      setdummy([]);
      setsearchopen(false);
  }
  
    const handlebusqueda = (e) =>{
      console.log(e.target.value)
      if(e.keyCode === 13){
        setfiltros(dummy.filter(x => x.IdBoleta.toString().includes(e.target.value)||
        (x.NomProveedor ? x.NomProveedor.toLowerCase().includes(e.target.value.toLowerCase()): '') ||
        x.NomMotivoEntrada.toLowerCase().includes(e.target.value.toLowerCase())
        || ( x.NomTransportista ?  x.NomTransportista.includes(e.target.value.toUpperCase()): '')
        || (x.NomChofer ? x.NomChofer.includes(e.target.value.toUpperCase()) : '')
        || (x.Placas ? x.Placas.includes(e.target.value.toUpperCase()) : '')))
     }
    }

    const handlecambio = (e) =>{
      setbusqueda(e.target.value)
    }

    const handleerase = () =>{
      if(filtros!==""){
        setfiltros("")
        setbusqueda("")
      }
    }
  
    const handleSearch = () => {
  
      setdummy([])
      setloading(true)
      const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
      /* eslint-disable */
          const data107 = {
            // parameters:`{ClaUbicacion:${props.Patio},ClaServicioJson:90,Parametros:@pnClaUbicacion=${props.Patio}${config.Separador}@pnYear=${currYear}${config.Separador}@pnMonth=${currMonth}}`,
            // tipoEstructura: 0,
             parameters: '{"ClaUbicacion":'+ editBoxValue + ',"ClaServicioJson":107,"Parametros":"@pnYear='+ currYear + '' +config.Separador+'@pnMonth='+ currMonth +''+config.Separador+'@pnHorarioIn='+ horainicio +''+config.Separador+'@pnHorarioFin='+ horafin +''+config.Separador+'@pnDia='+ currdias +'"}',
             tipoEstructura: 0,
          };
        /* eslint-enable */
          callApi(urlKrakenService, 'POST', data107,(res) => {
            setdummy(res.Result0);
            setloading(false);
          })
      };
    
  

  const onTurnoChanged = (e) =>{
    setCurrturno(e.value);
  if(e.value===0){
    sethorafin(24)
    sethorainicio(0)
  }
  else if (e.value===1){
    sethorafin(14)
    sethorainicio(0)
  }
  else {
    sethorafin(24)
    sethorainicio(14)
  }
  }

  const ondiaChanged = (e) => {
    setCurrdias(e.value);
  }
  const onMonthChanged = (e) =>{
    setCurrMonth(e.value);
    if(e.value===(-1)){
      setdias([{id:-1,dia:"Todos"}])
    }
    else if(e.value=== 4 || e.value=== 6 || e.value=== 9  || e.value=== 11){
      setdias([...Array(30 - 1 + 1).keys()].map(x => { return {"id": x + 1,"dia": x + 1} }).concat({id:-1,dia:"Todos"}));
    }

    else if(e.value=== 1 || e.value=== 3 || e.value=== 5  || e.value=== 7 || e.value=== 8 || e.value=== 10 || e.value=== 12){
      setdias([...Array(31 - 1 + 1).keys()].map(x => { return {"id": x + 1,"dia": x + 1} }).concat({id:-1,dia:"Todos"}))
    }

    else {
      setdias([...Array(28 - 1 + 1).keys()].map(x => { return {"id": x + 1,"dia": x + 1} }).concat({id:-1,dia:"Todos"}))

    }
  }

  console.log(dias)
  const onYearChanged = (e) =>{
    setCurrYear(e.value);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Paper className={classes.paper}>
        <div className={classes.divider}>
          <CustomSelect
            label="Año: "
            data={years}
            currVal={currYear}
            dataid="yearID"
            caption="name"
            onValueChanged={onYearChanged}
            disabled={false}
          >
          </CustomSelect>
        </div>
        <div className={classes.divider}>
          <CustomSelect
            label="Mes: "
            data={months}
            currVal={currMonth}
            dataid="monthID"
            caption="name"
            onValueChanged={onMonthChanged}
            disabled={false}
          >
          </CustomSelect>
        </div>
        <div className={classes.divider}>
          <CustomSelect
            label="Turno: "
            data={turnos}
            currVal={currturno}
            dataid="turnoID"
            caption="name"
            onValueChanged={onTurnoChanged}
            disabled={false}
          >
          </CustomSelect>
        </div>
        <div className={classes.divider}>
          <CustomSelect
            label="Días: "
            data={dias}
            currVal={currdias}
            dataid="id"
            caption="dia"
            onValueChanged={ondiaChanged}
            disabled={false}
          >
          </CustomSelect>
        </div>
        
        <div className={classes.buttonArea}>
          <br />
          <Button
            onClick={!loading ? handleSearch : null}
            className={!loading ? "animation-on-hover float-right": "animation-on-hover float-right grey"}
            color="success"
          >
            <i className="fa fa-search" aria-hidden="true"></i>
          </Button>
        </div>
        <div className={classes.buttonArea}>
          <br />
          <Button
            // onClick={handleSearch}
            className="animation-on-hover float-right"
            color="danger"
            onClick={onClearClick}
          >
            <i className="fas fa-minus"></i>
          </Button>
        </div>
      </Paper>
      <Card style={{width:'95%',margin:'auto'}}>
        <CardHeader>
          <CardTitle style={{ margin: '10px', textAlign: 'end' }}>
            {searchopen && 
              (
                <TextField 
                  id="outlined-basic" 
                  label="Buscar.." 
                  variant="outlined" 
                  value={busqueda}
                  onChange={handlecambio}
                  onKeyDown={handlebusqueda} 
                  InputProps={{
                    endAdornment: <InputAdornment position="start"><IconButton><CloseIcon onClick={handleerase} /></IconButton></InputAdornment>,
                  }}
                />
              )}
            <Tooltip title="Filtrado">
              <IconButton style={{color:'white'}} onClick={() => setsearchopen(!searchopen)}>
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Limpiar">
              <IconButton style={{color:'white'}} onClick={handlelimpiar}>
                <RestorePageIcon />
              </IconButton>
            </Tooltip>
            {dummy.length>0 ? (
              <CSVLink {...csvReport} style={{ color: 'white' }}>
                <Tooltip title="Exportar a Excel">
                  <IconButton style={{color:'white'}}>
                    <i className="fas fa-file-download" style={{ cursor: 'pointer' }}></i>
                  </IconButton>
                </Tooltip>
              </CSVLink>
              ) : null} 
          </CardTitle>
        </CardHeader>
        <Paper sx={{ width: '100%' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={9} style={{backgroundColor:'#f4f3ff',color:'black'}}>
                    Datos Boleta
                  </TableCell>
                  <TableCell align="center" colSpan={12} style={{backgroundColor:'#f4f3ff',color:'black'}}>
                    Clasificación Cruzada
                  </TableCell>
                  <TableCell align="center" colSpan={2} style={{backgroundColor:'#f4f3ff',color:'black'}}>
                    Resultados
                  </TableCell>
                </TableRow>
                <TableRow>
                  {columns.map((column) => (
                    column.label==="Semaforo" ? 
                    (
                      <CustomWidthTooltip title={column.tooltip} placement="top" leaveDelay={200}>
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ top: 57, minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      </CustomWidthTooltip>
                    ):
                    (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ top: 57, minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    )
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <div style={{position:'absolute',left: '50%',marginLeft: '-50px',top:'300px'}}>
                    <CircularProgress />
                  </div>
                ): dummy.length===0 ? (
                  <div style={{position:'absolute',left: '50%',marginLeft: '-50px',top:'300px'}}>
                    No hay datos
                  </div>
                ):
                filtros && filtros !== "" ? filtros.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column,id) => {
                          const value = row[column.id];
                          const value2 = (id===9 ||id===11 ||id===13 ||id===15 ||id===17 ||id===19)&& row[column.id]
                          const value3 =value2 && value2.split("/")
                          return (
                            <Tooltip title={column.label==='Total Coincidencias' ? `${value}/6` : value} placement="bottom">
                              <TableCell style={{whiteSpace: "normal",wordWrap: "break-word"}} key={column.key} align={(id===9 ||id===11 ||id===13 ||id===15 ||id===17 ||id===19) && value3===null ? 'center':column.align}>
                                {column.id==='Clasificacion'  || column.id==='BasculaSalida' || column.id==='BasculaEntrada' || column.id==='Registro' || column.id==='PreRegistro'? 
                                  (
                                    <div>
                                      {value3 !==null ? value3.map((value, i) => (
                                        <div key={i}>{value}</div>
                                    )
                                    ):'-'}
                                    </div>
                                  )
                                    :column.label=== "Semaforo" ? 
                                      <i className="fas fa-circle fa-2x" style={{color: value > 3 ? 'green': (value <= 3 && value >= 2) ? 'yellow': 'red' }}></i> 
                                  : column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value===null ?  "-" :
                                  column.id==="FechaGeneracion" ?
                                  value.toString().split('T')[0]:
                                  value}
                              </TableCell>
                            </Tooltip>
                          );
                        })}
                      </TableRow>
                    );
                  }):
                dummy.length>0 ? dummy
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column,id) => {
                          const value = row[column.id];
                          const value2 = (id===9 ||id===11 ||id===13 ||id===15 ||id===17 ||id===19)&& row[column.id]
                          const value3 =value2 && value2.split("/")
                          return (
                            <Tooltip title={column.label==='Total Coincidencias' ? `${value}/6` : value} placement="bottom">
                              <TableCell style={{whiteSpace: "normal",wordWrap: "break-word"}} key={column.key} align={(id===9 ||id===11 ||id===13 ||id===15 ||id===17 ||id===19) && value3===null ? 'center':column.align}>
                                {column.id==='Clasificacion'  || column.id==='BasculaSalida' || column.id==='BasculaEntrada' || column.id==='Registro' || column.id==='PreRegistro'? 
                                  (
                                    <div>
                                      {value3 !==null ? value3.map((value, i) => (
                                        <div key={i}>{value}</div>
                                    )
                                    ):'-'}
                                    </div>
                                  )
                                    :column.label=== "Semaforo" ? 
                                      <i className="fas fa-circle fa-2x" style={{color: value >= 5 ? 'green': (value <= 4 && value >= 3) ? 'yellow': 'red' }}></i> 
                                  : column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value===null ?  "-" :
                                  column.id==="FechaGeneracion" ?
                                  value.toString().split('T')[0]:
                                  value}
                              </TableCell>
                            </Tooltip>
                          );
                        })}
                      </TableRow>
                    );
                  }):null}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            style={{top: "1000px !important"}}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={dummy.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Card> 
    </div>  
  );
}
