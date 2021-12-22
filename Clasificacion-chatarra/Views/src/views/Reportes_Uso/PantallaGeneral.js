import React, { useState, useEffect }  from 'react'
import { Paper, makeStyles } from '@material-ui/core';
import CustomSelect from '../../components/Controls/Select';
import {reportes} from './data.js';
import Graficas from './Indicadores/Indicadores.js';
import Condiciones from './Condiciones/Condicion.js';

const useStyles = makeStyles(theme => ({
    paper: {
        margin: theme.spacing(3),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width:'20%'
    },
    clean: {
      position: 'relative'
  },
    divider:{
      width: 'max-content',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding:'2%',
    }
  }));
  

function PantallaGeneral() {
    const [currReporte, setCurrReporte] = useState(1);

    const handleReporte = (e) =>{
        setCurrReporte(e.value);
      }

    const classes = useStyles(); 

    
    return (
      <div className='pantalla-reportes'>
        <Paper className={classes.paper}>
          <div className='reportes_uso'>
            <CustomSelect
              label=""
              data={reportes}
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
          {currReporte===1 && <Graficas />}
          {currReporte===2 && <Condiciones />}

        </div>   
      </div>
    )
}

export default PantallaGeneral
