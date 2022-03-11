import React, { useState, useEffect,useContext } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import SelectBox from 'devextreme-react/select-box';
import AppContext from 'context/AppContext';
import { config } from '../../utils/config';
import { callApi, getSessionItem  } from 'utils/utils';



function Seleccion ({setClaArticulo,setNomArticulo}) {
  const [materiales, setmateriales] = useState([])
  const [focusValue, setfocusValue] = useState('')
  const [first, setfirst] = useState(0)
  const escribiendo = 1500;
  let escribiendoTimer
  const editBoxValue= getSessionItem('PatioEscogido');
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }));

  const UpSelectBox = () => {
    if(escribiendoTimer){
      clearTimeout(escribiendoTimer)
    }
    escribiendoTimer = setTimeout(terminado, escribiendo)
    
    }

    const focusSelectBox = (e) => {
        if (e.fullName === "text") {
          setfocusValue(e.value)
      }
    
    };

    const DownSelectBox = () => {
        clearTimeout(escribiendoTimer)
      }

  // const [age, setAge] = React.useState("");

  const terminado = () => {
      const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    /* eslint-disable */

    const data109 = {
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"ClaServicioJson":' +
        109 +
        ',"Parametros":"@psValor='+ focusValue.replace('"', '%22') +'"}',
      tipoEstructura: 0,
    };

  /* eslint-enable */
  if(focusValue!=='' && focusValue.length>2 ){
      callApi(urlKrakenService, 'POST', data109, (res) => {
        setmateriales(res.Result0);
        });
  }};

  const handleChange = 
    (event) => {
      setfirst(event.value)
      setClaArticulo(event.value)
      setNomArticulo(event.component.option('text'))
    }

  return (
    <FormControl className="zonas-mat" style={{border: '1px solid #a7a5a5',margin: '0.6vw',borderRadius:'3px'}}>
      <SelectBox
        searchEnabled={true}
        noDataText="Escribe mínimo 3 dígitos.."
        onValueChanged={handleChange}
        value={first}
        displayExpr="NomMaterial"
        valueExpr="ClaMaterial"
        dataSource={materiales}
        onOptionChanged={focusSelectBox}
        onKeyUp={UpSelectBox}
        onKeyDown={DownSelectBox}
        placeholder="ClaMaterial"
      >

      </SelectBox>
    </FormControl>
  );
};

export default Seleccion;
