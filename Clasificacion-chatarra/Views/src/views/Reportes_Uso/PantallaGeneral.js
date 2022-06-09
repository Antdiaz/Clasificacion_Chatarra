import React, { useState, useEffect } from 'react';
import { Paper, makeStyles } from '@material-ui/core';
import CustomSelect from '../../components/Controls/Select';
import { reportes, reportes2 } from './data.js';
import Graficas from './Indicadores/Indicadores.js';
import Condiciones from './Condiciones/Condicion.js';
import Apego from './Apego/Apego';
import Immex from './Immex/Immex';
import Resultados from './Resultados/Resultados.js';
import Cruzado from './Cruzado/Cruzado.js';
import { callApi, getSessionItem } from '../../utils/utils';
import { config } from '../../utils/config';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(3),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '20%',
  },
  clean: {
    position: 'relative',
  },
  divider: {
    width: 'max-content',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '2%',
  },
}));

function PantallaGeneral({ editBoxValue, Valores }) {
  const [currReporte, setCurrReporte] = useState(editBoxValue === 6 ? 2 : 1);
  const [empleados, setempleados] = useState([]);

  useEffect(() => {
    if (Valores && editBoxValue !==6) {
      const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
      /* eslint-disable */
      const data105 = {
        // parameters:`{ClaUbicacion:${props.Patio},ClaServicioJson:90,Parametros:@pnClaUbicacion=${props.Patio}${config.Separador}@pnYear=${currYear}${config.Separador}@pnMonth=${currMonth}}`,
        // tipoEstructura: 0,
        parameters:
          '{"ClaUbicacion":' +
          editBoxValue +
          ',"ClaServicioJson":105,"Parametros":"@pnClaUbicacion=' +
          editBoxValue +
          '"}',
        tipoEstructura: 0,
      };
      /* eslint-enable */
      callApi(urlKrakenService, 'POST', data105, (res) => {
        setempleados(res.Result0);
      });
    }
  }, []);

  const handleReporte = (e) => {
    setCurrReporte(e.value);
  };

  const classes = useStyles();

  return Valores || editBoxValue ===6 ? (
    <div className="pantalla-reportes">
      <Paper className={classes.paper}>
        <div className="reportes_uso">
          <CustomSelect
            label=""
            data={editBoxValue === 6 ? reportes2 : reportes}
            currVal={currReporte}
            dataid="reporteID"
            caption="name"
            onValueChanged={handleReporte}
            disabled={false}
          >
          </CustomSelect>
        </div>
      </Paper>
      <div>
        {currReporte === 1 && <Graficas empleados={empleados} editBoxValue={editBoxValue} />}
        {currReporte === 2 && <Condiciones editBoxValue={editBoxValue} />}
        {currReporte === 3 && <Apego empleados={empleados} editBoxValue={editBoxValue} />}
        {currReporte === 4 && <Resultados empleados={empleados} editBoxValue={editBoxValue} />}
        {currReporte === 5 && <Cruzado editBoxValue={editBoxValue} />}
        {currReporte === 6 && <Immex editBoxValue={editBoxValue} />}
      </div>
    </div>
  ) : (
    <div style={{width:"100%",marginLeft:"auto",marginRight:"auto",minHeight:"480px"}}>
      <div style={{width:"40px",marginLeft:"auto",marginRight:"auto",paddingTop:"200px"}}><CircularProgress /></div>
    </div>
  );
}

export default PantallaGeneral;
