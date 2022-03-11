import React from "react";

// reactstrap components
import SelectBox from 'devextreme-react/select-box';
import { Input } from 'reactstrap';

function Select({label, data, currVal, dataid, caption,onChange,onValueChanged,noDataText,onOptionChanged,onKeyUp,onKeyDown,disabled}) {
  return (
    <>
      <div style={{display: 'inherit'}}>
        <span className="formlabel">{label}</span>
        <div className="formcontent">
          <SelectBox
            dataSource={data}
            onKeyDown={onKeyDown}
            displayExpr={caption}
            value={currVal}
            onKeyUp={onKeyUp}
            searchEnabled={true}
            noDataText={noDataText}
            disabled={disabled}
            valueExpr={dataid}
            onChange={onchange}
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