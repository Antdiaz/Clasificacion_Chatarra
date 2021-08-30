import React, { useState } from 'react';
import 'devextreme-react/text-area';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Detalles from './Detalle_Contaminantes';
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
    const [Open, setOpen] = useState(false);
    return (
      <>
        <TableRow>
          <Modal
            isOpen={Open}
            ariaHideApp={false}
            onClose={() => setOpen(true)}
            style={customStyles}
          >
            <Detalles editOpen={Open} seteditOpen={setOpen} report={report} />
          </Modal>
          {editBoxValue=== 6 ? (
            <TableCell className="table-content" style={{ textAlign: 'center', fontWeight: '600' }}>
              {report.NombreUbicacion.split(/\s+/).slice(1, 2)}
            </TableCell>
          ):null}
          <TableCell className="table-content" style={{ textAlign: 'center', fontWeight: '600' }}>
            {report.IdBoleta}
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center', padding: '0px' }}>
            {report.FechaGeneracion.split("T").slice(0, 1)}
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center', minWidth: '16vw' }}>
            {report.ClaProveedor}-{report.NombreCompleto}
          </TableCell>
          <TableCell
            className="table-content"
            style={{ textAlign: 'center', padding: '0px', minWidth: '10vw' }}
          >
            {report.Materiales ? report.Materiales.split('/').slice(0, 1) : ''}
            <br />
            {report.Materiales ? report.Materiales.split('/').slice(1, 2) : ''}
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center' }}>
            {report.PesoNeto && report.PesoNeto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}&nbsp;kgs
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center',minWidth: '7vw' }}>
            {report.KilosContaminados > 0 || report.LlantasCh>0 || report.LlantasM>0 || report.Cilindro>0 || report.Boyas>0 || report.Tanque>0? (
              <div>
                {report.KilosContaminados && report.KilosContaminados.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}&nbsp;kgs
                <br />
                <i className="far fa-file fa-2x" style={{ color: 'gray' }} onClick={() => setOpen(true)}></i>
                &nbsp;&nbsp;
                <i className="fas fa-camera" style={{ color: '#ff6a00' }}></i>
              </div>
            ) : (
              '-'
            )}
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center',minWidth: '7vw'  }}>
            -
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center' }}>
            {report.LlantasCh > 0 || report.LlantasM > 0 || report.LlantasG > 0 ? (
              <div>
                {+report.LlantasCh + +report.LlantasM + +report.LlantasG }
                &nbsp;
                {'kgs'}
                <br />
                {+report.LlantasCh/+25 + +report.LlantasM/+50 + +report.LlantasG/+100}
                &nbsp;
                {'pieza(s)'}
              </div>
            ) : (
              '-'
            )}
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center' }}>
            {report.Tanque > 0 || report.Boyas > 0 || report.Cilindro > 0 ? (
              <div>
                {+report.Tanque + +report.Boyas + +report.Cilindro}&nbsp;{'kgs'}
                <br />
                {+report.Tanque/+200 + +report.Boyas/+50 + +report.Cilindro/+100}&nbsp;{'pieza(s)'}
              </div>
            ) : (
              '-'
            )}
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center'}}>
            {+report.KilosContaminados -
              (+report.Boyas * +50 +
                +report.Tanque * +200 +
                +report.Cilindro * +100 +
                +report.LlantasCh * +25 +
                +report.LlantasM * +50 +
                +report.LlantasG * +100) >
            0
              ? +report.KilosContaminados -
                (+report.Boyas * +50 +
                  +report.Tanque * +200 +
                  +report.Cilindro * +100 +
                  +report.LlantasCh * +25 +
                  +report.LlantasM * +50 +
                  +report.LlantasG * +100)
              : ''}
            &nbsp;
            {+report.KilosContaminados -
              (+report.Boyas * +50 +
                +report.Tanque * +200 +
                +report.Cilindro * +100 +
                +report.LlantasCh * +25 +
                +report.LlantasM * +50 +
                +report.LlantasG * +100) >
            0
              ? 'kgs'
              : '-'}
          </TableCell>
          {/* Pop up para editar un material */}
        </TableRow>
      </>
    );
  }

  // Componente cascarón de cada material mostrado
  return (
    <>
      {Reportes ? (
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
      ) : null}
      {/* {Reportes.map((report, index) => (
        <Contaminantes report={report} index={index} />
      ))} */}
    </>
  );
}

export default Listas;
