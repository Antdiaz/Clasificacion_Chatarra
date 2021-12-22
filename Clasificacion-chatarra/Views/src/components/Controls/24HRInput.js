import React from "react";

import DateBox from 'devextreme-react/date-box';

function CheckInput({currVal, onValueChanged}) {
  return (
    <>
      <div>
        <DateBox
          value={currVal}
          displayFormat="HH:mm"
          interval={15}
          type="time"
          onValueChanged={onValueChanged}
        />
      </div>
    </>
  );
}

export default CheckInput;