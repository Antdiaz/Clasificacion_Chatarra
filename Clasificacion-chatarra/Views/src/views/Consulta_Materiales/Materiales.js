import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import { config } from '../../utils/config';
import { callApi, getSessionItem } from '../../utils/utils';
import Modal from 'react-modal';
import Material from './Clasificar_Material';

function Materiales({
  placadato,
  editBoxValue,
  id,
  row,
  setrow,
  material,
  setmaterial,
  setmaterialr,
  setcantidadr,
  setkilosr,
  setobservaciones,
  observaciones,
  setkiloscont,
  kiloscont,
  pesajeparcial,
  setpesajeparcial,
  poppesaje,
  setpoppesaje,
  warning,
  setwarning,
  contaminacion,
  modaladdOpen,
  editOpen,
  seteditOpen,
}) {
  const NumbUsuario = getSessionItem('NumUsuario');
  const ipadress = getSessionItem('Ipaddress');

  function List({ ro, index, editOpen, seteditOpen }) {
    const [modaledit, setmodaledit] = useState(false);
    const customStyles = {
      content: {
        background: 'rgba(128, 128, 128, 0.212)',
        top: '0%',
        right: '-.5%',
        bottom: '0%',
      },
    };

    return (
      <>
        {ro.ClaArticuloPreReg ? <span className="pre-registro">Pre-registro</span> : null}
        <TableRow key={index}>
          <TableCell
            className="table-content"
            component="th"
            scope="row"
            style={{ textAlign: 'center', fontWeight: '600' }}
          >
            {ro.ClaveArticulo}
          </TableCell>
          <TableCell className="table-content">
            Enviado:&nbsp;{ro.NomArticuloPreReg ? ro.NomArticuloPreReg.split('-').pop() : '0'}{' '}
            <br /> Recibido:&nbsp;{ro.NomArticuloCompra ? ro.NomArticuloCompra.split('-').pop() : 0}{' '}
            <br /> Observaciones:&nbsp;{observaciones}
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center', fontWeight: '600' }}>
            {ro.PorcentajeMaterial ? ro.PorcentajeMaterial : ro.EsPesajeParcial ? 100 : 0}&nbsp;%
          </TableCell>
          <TableCell className="table-content">
            Enviado:&nbsp;{0} &nbsp;{ro.NomUnidad} <br /> Recibido:&nbsp;
            {ro.CantidadMaterial ? ro.CantidadMaterial : 0}
            &nbsp; {ro.NomUnidad}
          </TableCell>
          <TableCell className="table-content">
            Enviado:&nbsp;{ro.KgsMaterialPrereg ? ro.KgsMaterialPrereg : 0}&nbsp; Kg <br />{' '}
            Recibido:&nbsp;{ro.KilosReales ? ro.KilosReales : 0}&nbsp; Kg
          </TableCell>
          <TableCell className="table-content">
            Enviado:&nbsp;{kiloscont}&nbsp; Kg <br /> Recibido:&nbsp;{0}
            &nbsp; Kg
          </TableCell>
          <TableCell className="table-content">
            Almacen:&nbsp;{ro.ClaAlmacen}
            <br />
            Sub-Almacen:&nbsp;{ro.ClaSubAlmacenCompra}
          </TableCell>
          <TableCell className="table-content">
            <div
              onClick={
                ro.EsPesajeParcial !==1 ? 
                () => {
                  setmodaledit(true);
                }
              : () =>{ setpoppesaje(true)}
              }
            >
              <EditIcon style={{ color: ro.EsPesajeParcial ? 'grey':'#ff6a00' , cursor: 'pointer' }} />
            </div>
          </TableCell>

          <Modal
            isOpen={modaledit}
            onClose={() => modaledit(true)}
            ariaHideApp={false}
            style={customStyles}
          >
            <Material
              row={row}
              seteditOpen={seteditOpen}
              editOpen={editOpen}
              key={index}
              ro={ro}
              material={material}
              setmaterialr={setmaterialr}
              setcantidadr={setcantidadr}
              setkilosr={setkilosr}
              setobservaciones={setobservaciones}
              observaciones={observaciones}
              contaminacion={contaminacion}
              setkiloscont={setkiloscont}
              pesajeparcial={pesajeparcial}
              setpesajeparcial={setpesajeparcial}
              setpoppesaje={setpoppesaje}
              poppesaje={poppesaje}
              warning={warning}
              setwarning={setwarning}
              editBoxValue={editBoxValue}
              placadato={placadato}
              setmodaledit={setmodaledit}
            />
          </Modal>
        </TableRow>
      </>
    );
  }

  useEffect(() => {
    const urlKrakenService = `${config.KrakenService}/${24}/${37}`;

    /* eslint-disable */

    const data5 = {
      // parameters: "{\"IdListaPrecio\":"+ placadato[0].IdListaPrecio +",\"ClaOrdenCompra\":"+ placadato[0].ClaOrdenCompra+",\"IdAcuerdo\":"+ placadato[0].IdAcuerdo +",\"IdPedidoImportacion\":"+ placadato[0].IdPedidoImportacion +",\"IdBoleta\":"+ placadato[0].IdBoleta +"}",
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"ClaServicioJson":' +
        5 +
        ',"Parametros":"@pnClaUbicacion=' +
        editBoxValue +
        ',@pnIdListaPrecio=' +
        placadato[0].IdListaPrecio +
        ',@pnIdBoleta=' +
        placadato[0].IdBoleta +
        '"}',
      tipoEstructura: 0,
    };
    /* eslint-enable */
    callApi(urlKrakenService, 'POST', data5, (res) => {
      setmaterial(res.Result0);
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const urlKrakenService = `${config.KrakenService}/${24}/${37}`;
      /* eslint-disable */
      const data3 = {
        parameters:
          '{"ClaUbicacion":' +
          editBoxValue +
          ',"ClaServicioJson":' +
          3 +
          ',"Parametros":"@pnClaUbicacion=' +
          editBoxValue +
          ',@pnIdBoleta=' +
          id +
          ',@pnClaProveedor=' +
          placadato[0].ClaProveedor +
          ',@pnIdListaPrecio=' +
          placadato[0].IdListaPrecio +
          ',@pnClaUbicacionProveedor=' +
          placadato[0].ClaUbicacionProveedor +
          '"}',
        tipoEstructura: 0,
      };
      /* eslint-enable */
      callApi(urlKrakenService, 'POST', data3, (res) => {
        setrow(res.Result0);
      });
      seteditOpen(true);
    }, 1500);
  }, [!modaladdOpen, !editOpen,!poppesaje]);

  useEffect(() => {
    if (row) {
      const PorcentajeSum = row.reduce((acc, val) => acc + val.PorcentajeMaterial, 0);
      if (PorcentajeSum !== null && PorcentajeSum === 100) {
        const urlKrakenService = `${config.KrakenService}/${24}/${37}`;
        /* eslint-disable */
        const data13 = {
          parameters:
            '{"ClaUbicacion":' +
            editBoxValue +
            ',"ClaServicioJson":13,"Parametros":"@pnClaUbicacion=' +
            editBoxValue +
            ',@pnIdBoleta=' +
            placadato[0].IdBoleta +
            ',@pnClaTipoClasificacion=1,@pnClaUbicacionProveedor=' +
            placadato[0].ClaUbicacionProveedor +
            ',@pnClaOrdenCompra=,@pnClaTipoOrdenCompra=,@pnIdListaPrecio=' +
            placadato[0].IdListaPrecio +
            ',@pnEsNoCargoDescargoMaterial=0,@pnClaUsuarioMod=' +
            NumbUsuario +
            ',@psNombrePcMod=' +
            ipadress +
            ',@pnIdMensaje=,@psMensaje=,@pnEsPesajeParcial="}',
          tipoEstructura: 0,
        };
        /* eslint-enable */

        callApi(urlKrakenService, 'POST', data13, (res) => {
          console.log(res);
        });
      }
    }
  }, [row]);

  function Clasificacion() {
    return (
      <div>
        <Table className="table" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className="table-header" style={{ paddingRight: '0px' }}>
                Fabricación
              </TableCell>
              <TableCell className="table-header">Material</TableCell>
              <TableCell
                className="table-header"
                style={{ paddingLeft: '0px', paddingRight: '0px' }}
              >
                Porcentaje
              </TableCell>
              <TableCell className="table-header">Cantidad</TableCell>
              <TableCell className="table-header">Kilos</TableCell>
              <TableCell className="table-header">Atril/Tarima</TableCell>
              <TableCell className="table-header">Inventario</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row
              ? row.map((ro, index) => (
                <List ro={ro} key={index} editOpen={editOpen} seteditOpen={seteditOpen} />
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div>
      <Clasificacion />
    </div>
  );
}

export default Materiales;
