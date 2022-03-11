import React, { useState } from 'react';
import 'devextreme-react/text-area';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Modal from 'react-modal';
import { FixedSizeList as Lists } from 'react-window';
import { List, AutoSizer} from 'react-virtualized';

function Listas({Apego,Headers,editBoxValue}) {
  const customStyles = {
    content: {
      background: 'rgba(128, 128, 128, 0.212)',
      top: '0%',
      right: '-.5%',
      bottom: '0%',
    },
  };

  function ApegoBlindaje({apego,Headers }) {
    return (
      <>
        <TableRow>
          <TableCell className="table-content" style={{ textAlign: 'center', fontWeight: '600',width:'5vw'}}>
            {apego.Boleta}
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center',width:'12vw' }}>
            {apego.DatosBoleta}
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center',width:'18vw' }}>
            {apego.BasculaAutomatica}
          </TableCell>
          <TableCell
            className="table-content"
            style={{ textAlign: 'center',width:'24vw' }}
          >
            {apego.EvidenciaFotografica}
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center',width:'12vw' }}>
            {apego.CodigoQR}
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center',width:'12vw'}}>
            {apego.HuellaDigital}
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center',width:'26vw'}}>
            {apego.ClasifMob}
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center',width:'8vw'}}>
            {apego.EnApego}
          </TableCell>
          {/* Pop up para editar un material */}
        </TableRow>
      </>
    );
  }

  // Componente cascarón de cada material mostrado
  return (
    <>
      {Apego ? (
        <AutoSizer>
          {({height, width}) => (
            <List
              width={width}
              height={490}
              rowHeight={85}
              rowCount={Apego.length}
              rowRenderer={({ key, index, style, parent }) => {
                const apego = Apego[index];

                return (
                  <div key={key} style={style}>
                    <ApegoBlindaje apego={apego} />
                  </div>
                );
              }}
            />
          )}
        </AutoSizer>
      ) : null}
      {/* {Reportes.map((report, index) => (
        <Contaminantes report={report} index={index} />
      ))} */}
    </>
  );
}

export default Listas;
