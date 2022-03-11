import React, { useState } from 'react';
import 'devextreme-react/text-area';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Detalles from './Detalle_Contaminantes';
import DetallesEl from './Detalle_Electros';
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
    const [Openel, setOpenel] = useState(false);
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
          <Modal
            isOpen={Openel}
            ariaHideApp={false}
            onClose={() => setOpenel(true)}
            style={customStyles}
          >
            <DetallesEl editOpenel={Openel} seteditOpenel={setOpenel} report={report} />
          </Modal>
          {editBoxValue=== 6 ? (
            <TableCell className="table-content" style={{ textAlign: 'center', fontWeight: '600',minWidth: '5vw' }}>
              {report.NombreUbicacion ? report.NombreUbicacion.split(/\s+/).slice(1, 2): ''}
            </TableCell>
          ):null}
          <TableCell className="table-content" style={{ textAlign: 'center', fontWeight: '600' }}>
            {report.IdBoleta}
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center', padding: '0px',minWidth: '6vw' }}>
            {report.FechaGeneracion ? report.FechaGeneracion.split("T").slice(0, 1): ''}
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center', minWidth: '18vw' }}>
            {report.ClaProveedor}-{report.NombreCompleto}
          </TableCell>
          <TableCell
            className="table-content"
            style={{ textAlign: 'center', padding: '0px', minWidth: '12vw' }}
          >
            {report.Materiales ? report.Materiales.split('/').slice(0, 1) : ''}
            <br />
            {report.Materiales ? report.Materiales.split('/').slice(1, 2) : ''}
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center', minWidth: '8vw' }}>
            {report.PesoNeto && report.PesoNeto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}&nbsp;Kg
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center',minWidth: '9vw' }}>
            {report.KilosContaminados > 0 || report.LlantasCh>0 || report.LlantasM>0 || report.Cilindro>0 || report.Boyas>0 || report.Tanque>0? (
              <div>
                {report.KilosContaminados && report.KilosContaminados.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}&nbsp;Kg
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
          <TableCell className="table-content" style={{ textAlign: 'center',minWidth: '6vw' }}>
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
          <TableCell className="table-content" style={{ textAlign: 'center',minWidth: '6vw'  }}>
            {report.Tanque > 0 || report.Boyas > 0 || report.Cilindro > 0 ? (
              <div>
                {+report.Tanque + +report.Boyas + +report.Cilindro}&nbsp;{'Kg'}
                <br />
                {+report.Tanque/+200 + +report.Boyas/+50 + +report.Cilindro/+100}&nbsp;{'pieza(s)'}
              </div>
            ) : (
              '-'
            )}
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center',minWidth: '6vw' }}>
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
          <TableCell className="table-content" style={{ textAlign: 'center',minWidth: '7vw' }}>
            {report.KilosElecbot > 0 ? (
              <div>
                {report.KilosElecbot && report.KilosElecbot}&nbsp;{report.KilosElecbot && 'Kg'}
                <br />
                <i className="far fa-file fa-2x" style={{ color: 'gray' }} onClick={() => setOpenel(true)}></i>
                &nbsp;&nbsp;
                <i className="fas fa-camera" style={{ color: '#ff6a00' }}></i>
              </div>
            ) : (
              '-'
            )}
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center',minWidth: '7vw' }}>
            {report.RefriCh > 0 || report.RefriM > 0 || report.RefriG > 0 || report.Oven>0 || report.Otros>0 || report.Micro>0 || report.Boiler>0 || report.Secadora>0 || report.Lavadora>0 ? (
              <div>
                {+report.RefriCh + +report.RefriM + +report.RefriG + +report.Oven + +report.Otros + +report.Micro + +report.Boiler + +report.Secadora + +report.Lavadora}
                &nbsp;
                {'kgs'}
                <br />
                {+report.RefriCh/+50 + +report.RefriM/+100 + +report.RefriG/+150 + +report.Oven/+50 + +report.Otros/+50 + +report.Micro/+20 + +report.Boiler/+100 + +report.Secadora/+50 + +report.Lavadora/+50}
                &nbsp;
                {'pieza(s)'}
              </div>
            ) : (
              '-'
            )}
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center' }}>
            {report.Costal > 0 || report.MegaSaco > 0 || report.Contenedor> 0 ? (
              <div>
                {+report.Costal + +report.MegaSaco + +report.Contenedor}
                &nbsp;
                {'kgs'}
                <br />
                {+report.Costal/+25 + +report.MegaSaco/+250 + +report.Contenedor/+150}
                &nbsp;
                {'pieza(s)'}
              </div>
            ) : (
              '-'
            )}
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
