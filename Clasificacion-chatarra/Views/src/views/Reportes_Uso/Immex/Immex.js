import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { CSVLink } from 'react-csv';
import {CircularProgress, IconButton, InputAdornment, makeStyles, TextField} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import RestorePageIcon from '@mui/icons-material/RestorePage';
import Input from '@material-ui/core/Input';
import { callApi, getSessionItem } from '../../../utils/utils';
import { config } from '../../../utils/config';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import CustomSelect from '../../../components/Controls/Select';
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
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const useStyles = makeStyles(theme => ({
  paper: {
      margin: theme.spacing(3),
      padding: theme.spacing(3),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
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
  {id: 'IdBoleta', label: 'Boleta',minWidth: 170,align: 'center' },
  {id: 'Placas', label: 'Cupo',minWidth: 170,align: 'center',format: (value) => value.toFixed(2), },
  {id: 'NomChofer', label: 'Proveedor',minWidth: 170,align: 'center',format: (value) => value.toFixed(2), },
  {id: 'NomProveedor', label: 'Nom. Fracción',minWidth: 170,align: 'center',format: (value) => value.toFixed(2), },
  {id: 'NomTransporte', label: 'Tipo',minWidth: 170,align: 'center',format: (value) => value.toFixed(2), },
  {id: 'NomTransportista', label: 'Cantidad Original',minWidth: 170,align: 'center',format: (value) => value.toFixed(2), },
  {id: 'NomMotivoEntrada', label: 'Utilizado',minWidth: 170,align: 'center',format: (value) => value.toFixed(2), },
  {id: 'PesoNeto', label: 'Saldo',minWidth: 170,align: 'center',format: (value) => `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Kg`, },
  {id: 'ClaCUP', label: 'Unidad Medida',minWidth: 170,align: 'center', },
]);


function createData(boleta,datosboleta,basculaut,evidencia,codigoqr,huelladig,mobile,apego) {
  return {boleta,datosboleta,basculaut,evidencia,codigoqr,huelladig,mobile,apego};
}



export default function ColumnGroupingTable({editBoxValue,empleados}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [locations, setLocations] = useState(editBoxValue);
  const [currMonth, setCurrMonth] = useState(-1);
  const [currYear, setCurrYear] = useState(new Date().getFullYear());
  const [lastYear, setlastYear] = useState(0)
  const [currEmpleado, setcurrEmpleado] = useState(-1);
  const [currturno, setCurrturno] = useState(0);
  const [horainicio, sethorainicio] = useState(0)
  const [horafin, sethorafin] = useState(24)
  const [empleadosarray, setempleadosarray] = useState(0)
  const [loading, setloading] = useState(false)
  const classes = useStyles(); 
  const [dummy, setdummy] = useState([])
  const [searchopen, setsearchopen] = useState(false)
  const [filtros, setfiltros] = useState()
  const [busqueda, setbusqueda] = useState("")
  const theme = useTheme();

  
const [HeaderTable, setHeaderTable] = useState([
  {key: 'ClaUbicacion', label: 'ClaUbicación'},
  {key: 'IdBoleta', label: 'Boleta'},
  {key: 'Placas', label: 'Cupo'},
  {key: 'NomChofer', label: 'Proveedor'},
  {key: 'NomProveedor', label: 'Nom. Fracción'},
  {key: 'NomTransporte', label: 'Tipo'},
  {key: 'NomTransportista', label: 'Cantidad Original'},
  {key: 'NomMotivoEntrada', label: 'Utilizado'},
  {key: 'PesoNeto', label: 'Saldo'},
  {key: 'ClaCUP', label: 'Unidad Medida'},
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
    setcurrEmpleado(null);
    setCurrturno(null)
  }

  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 140,
    },
  });

  const handlelimpiar = () =>{
    setfiltros("")
    setbusqueda("")
    setCurrMonth(-1);
    setcurrEmpleado(-1);
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
      setfiltros("")
      setbusqueda("")
  }

  const handleSearch = () => {

    setdummy([])
    setloading(true)
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    /* eslint-disable */
        const data104 = {
          // parameters:`{ClaUbicacion:${props.Patio},ClaServicioJson:90,Parametros:@pnClaUbicacion=${props.Patio}${config.Separador}@pnYear=${currYear}${config.Separador}@pnMonth=${currMonth}}`,
          // tipoEstructura: 0,
           parameters: '{"ClaUbicacion":'+ editBoxValue + ',"ClaServicioJson":104,"Parametros":"@pnClaUbicacion='+ editBoxValue + ''+config.Separador+'@pnYear='+ currYear + '' +config.Separador+'@pnMonth='+ currMonth +''+config.Separador+'@pnHorarioIn='+ horainicio +''+config.Separador+'@pnHorarioFin='+ horafin +''+config.Separador+'@pnEmpleado='+ currEmpleado +'"}',
           tipoEstructura: 0,
        };
      /* eslint-enable */
        callApi(urlKrakenService, 'POST', data104,(res) => {
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

  const onMonthChanged = (e) =>{
    setCurrMonth(e.value);
  }

  const onYearChanged = (e) =>{
    setCurrYear(e.value);
  }

  const onEmpleadoChanged = (e) =>{
    setcurrEmpleado(e.value);
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
            label="Fecha: "
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
            label="Proveedor: "
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
            label="Fracción: "
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
            label="Cupo: "
            data={empleados}
            currVal={currEmpleado}
            dataid="IdUsuario"
            caption="NombreCompleto"
            onValueChanged={onEmpleadoChanged}
            disabled={false}
          >
          </CustomSelect>
        </div>
        {editBoxValue === 6 && locations !== null ? (
          <div className={classes.chipArea}>
            <span>Ubicaciones</span>
            <Select
              multiple
              value={loc}
              onChange={handleChange}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {locations.map((location) => (
                <MenuItem key={location.ClaUbicacion} value={location.ClaUbicacion}>
                  <Checkbox 
                    style={{
                    color: "#ff6a00",
                  }}
                    checked={loc.indexOf(location.ClaUbicacion) > -1}
                  />
                  <ListItemText primary={location.NombreCorto} />
                </MenuItem>
        ))}
            </Select>
          </div>
      ) : null}
        
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
                    endAdornment: <InputAdornment position="start"><IconButton onClick={handleerase}><CloseIcon style={{color:'white'}} /></IconButton></InputAdornment>,
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
        <Paper sx={{ width: '100%',margin:'auto'}}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={12} style={{backgroundColor:'#f4f3ff',color:'black'}}>
                    Consulta movimientos Saldo
                  </TableCell>
                </TableRow>
                <TableRow>
                  {columns.map((column) => (
                    column.label==="Báscula Automática" || column.label==="Evidencia Fotográfica" || column.label==="Codigo QR" || column.label==="Huella Digital" || column.label==="Clasificación en Móvil" || column.label==="En Apego"? 
                    (
                      <CustomWidthTooltip title={column.tooltip} placement="top" leaveDelay={200}>
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ top: 0, minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      </CustomWidthTooltip>
                    ):
                    (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ top: 0, minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    )
                  ))}
                </TableRow>
              </TableHead>
              <TableBody style={{minHeight: '400px'}}>
                {loading ? (
                  <div style={{position:'absolute',left: '50%',marginLeft: '-50px',top:'300px'}}>
                    <CircularProgress />
                  </div>
                ): dummy.length===0 
                ? (
                  <div style={{position:'absolute',left: '50%',marginLeft: '-50px',top:'300px'}}>
                    No hay Datos
                  </div>
                ):
                filtros && filtros !== "" ? filtros.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <Tooltip title={column.id==='EnApego' ? `${value}/5`: value} placement="bottom">
                              <TableCell style={{cursor:"pointer"}} key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : column.label==='En Apego' ? <i className="fas fa-circle fa-2x" style={{color: value===5  ? 'green':value===4 || value===3 ? 'yellow':'red' }}></i> : (value==='SI' || value==='NO')
                                  ? <i className="fas fa-circle fa-2x" style={{color: value==='SI' ? 'green': 'red' }}></i>:
                                    column.id==="FechaGeneracion" ?
                                    value.toString().split('T')[0]:value}
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
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <Tooltip title={column.id==='EnApego' ? `${value}/5`: value} placement="bottom">
                              <TableCell style={{cursor:"pointer"}} key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : column.label==='En Apego' ? <i className="fas fa-circle fa-2x" style={{color: value===5  ? 'green':value===4 || value===3 ? 'yellow':'red' }}></i> : (value==='SI' || value==='NO')
                                  ? <i className="fas fa-circle fa-2x" style={{color: value==='SI' ? 'green': 'red' }}></i>:
                                    column.id==="FechaGeneracion" ?
                                    value.toString().split('T')[0]:value}
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
