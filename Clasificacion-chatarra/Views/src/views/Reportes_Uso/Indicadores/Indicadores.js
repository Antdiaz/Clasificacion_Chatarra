import React, { useState, useEffect } from 'react';
import { Paper, makeStyles } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { config } from '../../../utils/config';
import { callApi, getSessionItem } from '../../../utils/utils';
import { LoadPanel } from 'devextreme-react/load-panel';
import CustomSelect from '../../../components/Controls/Select';
import DxButton from 'devextreme-react/button';
import { Row, Col, Button} from 'reactstrap';
import { months, years,turnos} from './data.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Chart,
  LoadingIndicator
  , ArgumentAxis
  , Label
  , Series
  ,CommonSeriesSettings
  , Legend
  , ValueAxis
  , Crosshair
  ,Tooltip
  , Export } from 'devextreme-react/chart';

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

const position = { of: '#charts' };

const App = (props) => {

  const classes = useStyles(); 
  const theme = useTheme();
const Todos = {BajaLogica: 0,
  ClaUbicacion: 0,
  ClaUsuarioMod:0,
  Claubicacion: 0,
  FechaBajaLogica: null,
  FechaFinal: null,
  FechaInicial: null,
  FechaUltimaMod: "2021-03-04T21:43:22.78",
  IdPerfilReferenciado: 260009,
  IdUsuario: -1,
  NombrePcMod: "Todos",
  Orden: 1,
  nombrecompleto: "Todos"}
  const [loc, setLoc] = useState([]);
  const [locations, setLocations] = useState(props.Patio);
  const [currMonth, setCurrMonth] = useState(-1);
  const [currYear, setCurrYear] = useState(new Date().getFullYear());
  const [lastYear, setlastYear] = useState(0)
  const [currEmpleado, setcurrEmpleado] = useState(-1);
  const [currturno, setCurrturno] = useState(0);
  const [horainicio, sethorainicio] = useState(0)
  const [horafin, sethorafin] = useState(24)
  const [loadPanelVisible, setLoadPanelVisible] = useState(false);
  const [currArr, setCurrArr] = useState([]);
  const [dataArr, setDataArr] = useState([]);
  const [dummy, setdummy] = useState(0)
  const [empleadosarray, setempleadosarray] = useState(0)
  const [loading, setloading] = useState(false)


  const onMonthChanged = (e) =>{
    setCurrMonth(e.value);
  }

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

  const onYearChanged = (e) =>{
    setCurrYear(e.value);
  }

  const onEmpleadoChanged = (e) =>{
    setcurrEmpleado(e.value);
  }



  useEffect(() => {
    if(currYear && currMonth !==-1 && dummy !==0){

  // constructing the resulting array containing objects with `year` totals


    const dataArray = dummy.map((item,index) => {
      return {
        Mes: index === 0 ? `Total ${item.Mes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`: `Semana ${index}\n(${item.Boletas.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Bol.)`,
        MuyBajoRiesgo: Math.round((item.MuyBajoRiesgo/item.Boletas)*100),
        BajoRiesgo: Math.round((item.BajoRiesgo/item.Boletas)*100),
        RiesgoMedio: Math.round((item.RiesgoMedio/item.Boletas)*100),
        RiesgoAlto: Math.round((item.AltoRiesgo/item.Boletas)*100),
      };
    });
    setDataArr(dataArray);
  }
  else if(currYear && currMonth===-1 && dummy !==0){
    const dataArray = dummy.map((item,index) => {
      return {
        Mes: `${item.Mes}\n(${item.Boletas.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Bol.)`,
        MuyBajoRiesgo: Math.round((item.MuyBajoRiesgo/item.Boletas)*100),
        BajoRiesgo: Math.round((item.BajoRiesgo/item.Boletas)*100),
        RiesgoMedio: Math.round((item.RiesgoMedio/item.Boletas)*100),
        RiesgoAlto: Math.round((item.AltoRiesgo/item.Boletas)*100),
      };
    });
    setDataArr(dataArray);
  }
  else{
    setDataArr([]);
  }
  }, [dummy]);


 const handleSearch = () => {

  setdummy([])
  setloading(true)
  console.log("hola")
  const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
  /* eslint-disable */
      const data103 = {
        // parameters:`{ClaUbicacion:${props.Patio},ClaServicioJson:90,Parametros:@pnClaUbicacion=${props.Patio}${config.Separador}@pnYear=${currYear}${config.Separador}@pnMonth=${currMonth}}`,
        // tipoEstructura: 0,
         parameters: '{"ClaUbicacion":'+ props.editBoxValue + ',"ClaServicioJson":103,"Parametros":"@pnClaUbicacion='+ props.editBoxValue + ''+config.Separador+'@pnYear='+ currYear + '' +config.Separador+'@pnMonth='+ currMonth +''+config.Separador+'@pnHorarioIn='+ horainicio +''+config.Separador+'@pnHorarioFin='+ horafin +''+config.Separador+'@pnEmpleado='+ currEmpleado +'"}',
         tipoEstructura: 0,
      };
    /* eslint-enable */
      callApi(urlKrakenService, 'POST', data103,(res) => {
        setdummy(res.Result0);
        setloading(false);
      })
  };


  const customizeTooltip= (pointInfo) =>{
    return {
      text:`${pointInfo.seriesName.split('\r\n')[0]}:&nbsp;${pointInfo.valueText}% Boletas`
    };
  }

  const handleChange = (event) => {
    setLoc(event.target.value);
    // console.log("Estas son las seleccionadas", loc);
  };


  const onClearClick = () =>{
    setCurrMonth(null);
    setcurrEmpleado(null);
    setCurrturno(null)
    setDataArr([])
  }
  

    return (
      <div id="charts">
        {loading===true ? (
          <div style={{position:'absolute',left: '50%',marginLeft: '-50px',top:'500px'}}>
            <CircularProgress />
          </div>
          ) : dataArr ===[] || dataArr.length===0 ? 
          (
            <div style={{position:'absolute',left: '50%',marginLeft: '-50px',top:'500px'}}>
              No hay Datos
            </div>
            ):null}
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
              label="Empleado: "
              data={props.empleados}
              currVal={currEmpleado}
              dataid="IdUsuario"
              caption="NombreCompleto"
              onValueChanged={onEmpleadoChanged}
              disabled={false}
            >
            </CustomSelect>
          </div>
          {props.editBoxValue === 6 && locations !== null && locations !== undefined ? (
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

        <LoadPanel
          shadingColor="rgba(0,0,0,0.4)"
          position={position}
          visible={loadPanelVisible}
        />

        <div className={classes.scheduler}>
          
          <Chart
            id="chart"
            title="Indicadores"
            dataSource={dataArr}
            palette="Harmony Light"
          >
            <Tooltip
              enabled={true}
              customizeTooltip={customizeTooltip}
            />
            <CommonSeriesSettings argumentField="Mes" type="stackedBar" />
            <Series
              name={`Muy Bajo Riesgo \r\n 90%-100%`}
              valueField="MuyBajoRiesgo"
              color="#78AF45"
            />
            <Series
              name={`Bajo Riesgo \r\n 80%-90%`}
              valueField="BajoRiesgo"
              color="#A9D08E"
            />
            <Series
              name={`Riesgo Medio \r\n 60%-80%`}
              valueField="RiesgoMedio"
              color="#FFD966"
            />
            <Series
              name={`Riesgo Alto \r\n < 60%`}
              valueField="RiesgoAlto"
              color="red"
            />
            <ArgumentAxis>
              <Label overlappingBehavior="stagger" />
            </ArgumentAxis>
            <ValueAxis
              name="percentage"
              position="left"
              tickInterval={10}
              showZero={true}
              valueMarginsEnabled={false}
              max="100"
            />
            <ValueAxis
              max="100"
              name="other"
              position="right"
              tickInterval={10}
              showZero={true}
              valueMarginsEnabled={false}
            >
            </ValueAxis>
            <Legend verticalAlignment="bottom" horizontalAlignment="center"></Legend>
            <Export enabled={true} />
          </Chart>
        </div>
      </div>
    );
}

export default App;
