import React from "react";

// reactstrap components
import { NumberBox } from 'devextreme-react/number-box';

function NumberInput({label, value, onChange}) {
    const onValueChanged = (e) =>{
        onChange(e.value)
    }
  return (
    <>
      <div className="">
        <div className="formlabel">{label}</div>
        <div className="formcontent">
          <NumberBox
            showClearButton={true}
            defaultValue={value}
            min={0}
            max={999}
            showSpinButtons={true}
            onValueChanged={onValueChanged}
          />
        </div>
      </div>
    </>
  );
}

export default NumberInput;