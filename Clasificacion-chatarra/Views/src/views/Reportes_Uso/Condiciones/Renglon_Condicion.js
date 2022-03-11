import React, { useState } from 'react';
import 'devextreme-react/text-area';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Modal from 'react-modal';
import { FixedSizeList as Lists } from 'react-window';
import { List, AutoSizer} from 'react-virtualized';

function Listas({ Reportes,Headers,editBoxValue}) {
  const customStyles = {
    content: {
      background: 'rgba(128, 128, 128, 0.212)',
      top: '0%',
      right: '-.5%',
      bottom: '0%',
    },
  };

  function Contaminantes({ report,Headers }) {
    return (
      <>
        <TableRow>
          <TableCell className="table-content" style={{ textAlign: 'center', fontWeight: '600',minWidth: '15vw' }}>
            {report.NombreUbicacion.split(/\s+/).slice(1, 3)}
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center',minWidth: '15vw'  }}>
            <div className="toolip">
              <i className="fas fa-circle fa-2x" style={{color: report.TabletaRegistro > 7 ? 'green': (report.TabletaRegistro <= 7 && report.TabletaRegistro >= 5) ? 'yellow': 'red' }}></i>
              <span className="tooltiptext">{report.TabletaRegistro}</span>
            </div>
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center', padding: '0px',minWidth: '15vw' }}>
            <div className="toolip">
              <i className="fas fa-circle fa-2x" style={{color: report.CodigoQR > 7 ? 'green': (report.CodigoQR <= 7 && report.CodigoQR >= 5) ? 'yellow': 'red' }}></i>
              <span className="tooltiptext">{report.CodigoQR}</span>
            </div>
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center', minWidth: '15vw' }}>
            <div className="toolip">
              <i className="fas fa-circle fa-2x" style={{color: report.EvidenciaFotografica >7 ? 'green': (report.EvidenciaFotografica <= 7 && report.EvidenciaFotografica >= 5) ? 'yellow': 'red' }}></i>
              <span className="tooltiptext">{report.EvidenciaFotografica}</span>
            </div>
          </TableCell>
          <TableCell
            className="table-content"
            style={{ textAlign: 'center', padding: '0px', minWidth: '15vw' }}
          >
            <div className="toolip">
              <i className="fas fa-circle fa-2x" style={{color: report.Huella > 7 ? 'green': (report.Huella <= 7 && report.Huella >= 5) ? 'yellow': 'red' }}></i>
              <span className="tooltiptext">{report.Huella}</span>
            </div>
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center', minWidth: '15vw' }}>
            <div className="toolip">
              <i className="fas fa-circle fa-2x" style={{color: report.ClasifApp > 7 ? 'green': (report.ClasifApp <= 7 && report.ClasifApp >= 5) ? 'yellow': 'red' }}></i>
              <span className="tooltiptext">{report.ClasifApp}</span>
            </div>
          </TableCell>
          {/* Pop up para editar un material */}
        </TableRow>
      </>
    );
  }

  // Componente cascarón de cada material mostrado
  return (
    <>
      {
        <AutoSizer>
          {({height, width}) => (
            <List
              width={width}
              height={490}
              rowHeight={85}
              rowCount={Reportes.length}
              rowRenderer={({ key, index, style, parent }) => {
                const report = Reportes[index];

                return (
                  <div key={key} style={style}>
                    <Contaminantes report={report} />
                  </div>
                );
              }}
            />
          )}
        </AutoSizer>
      }
      {/* {Reportes.map((report, index) => (
        <Contaminantes report={report} index={index} />
      ))} */}
    </>
  );
}

export default Listas;
