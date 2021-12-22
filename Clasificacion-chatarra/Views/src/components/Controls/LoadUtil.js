import React from "react";

// reactstrap components
import { LoadPanel } from 'devextreme-react/load-panel';

function LoadUtil({pos, visibleState}) {
  return (
    <>
      <div>
        <LoadPanel
          shadingColor="rgba(0,0,0,0.4)"
          position={pos}
          visible={visibleState}
          showIndicator={true}
          shading={true}
          showPane={true}
          closeOnOutsideClick={false}
        />
      </div>
    </>
  );
}

export default LoadUtil;