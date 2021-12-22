import React from "react";

// reactstrap components
import SelectBox from 'devextreme-react/select-box';
import { Input } from 'reactstrap';

function Select({label, data, currVal, dataid, caption, onValueChanged, disabled}) {
  return (
    <>
      <div style={{display: 'inherit'}}>
        <span className="formlabel">{label}</span>
        <div className="formcontent">
          <SelectBox
            dataSource={data}
            displayExpr={caption}
            value={currVal}
            searchEnabled={true}
            disabled={disabled}
            valueExpr={dataid}
            onValueChanged={onValueChanged}
            placeholder="Selecciona..."
            width="100%"
          />
        </div>
      </div>
    </>
  );
}

export default Select;