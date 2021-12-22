import React, { useEffect } from "react";

import DateBox from 'devextreme-react/date-box';


function DateTimeInput({label, placeholder, currVal, onValueChanged, minValue, maxValue}) {
  
  return (
    <>
      <div style={{marginRight: '10px'}}>
        {label}
        <DateBox
          type="datetime"
          value={currVal}
          placeholder={placeholder}
          onValueChanged={onValueChanged}
          width="200px"
          stylingMode="outlined"
          applyButtonText="Elegir"
          cancelButtonText="Cancelar"
          max={maxValue}
          min={minValue}
        />
      </div>
    </>
  );
}

export default DateTimeInput;