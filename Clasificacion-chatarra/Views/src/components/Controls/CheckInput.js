import React from "react";

// reactstrap components
import { CheckBox } from 'devextreme-react/check-box';

function CheckInput({label, currVal, onValueChanged}) {
  return (
    <>
      <div>
        <CheckBox
          value={currVal} 
          onValueChanged={onValueChanged}
          text={label}
        />
      </div>
    </>
  );
}

export default CheckInput;