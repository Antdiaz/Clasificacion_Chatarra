import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import { Card, CardText, CardHeader, CardBody, CardTitle, Button, Row, Col } from 'reactstrap';
import { config } from '../../utils/config';
import { callApi, callKrakenApi } from '../../utils/utils';
import Popup from './Popup';
import Modal from 'react-modal';

function Material({
  handleClose,
  placadato,
  editBoxValue,
  id,
  row,
  setrow,
  material,
  setmaterial,
  isOpen,
  setmaterialr,
  setcantidadr,
  setkilosr,
  setobservaciones,
  setalmacen,
  setsubalmacen,
  materialr,
  cantidadr,
  kilosr,
  observaciones,
  almacen,
  subalmacen,
}) {

const [claordencompra, setclaordencompra] = useState()
const [idacuerdo, setidacuerdo] = useState()
const [idpedidoimportacion, setidpedidoimportacion] = useState()
const [contaminacion, setcontaminacion] = useState()
  


  function List({ro,index}) {

    const [modalOpen, setmodalOpen] = useState(false);

    const customStyles = {
      content: {
        background: 'rgba(128, 128, 128, 0.212)',
        top: '0%',
        right: '-.5%',
        bottom: '0%',
      },
    };


    return (
      <TableRow key={index}>
        <TableCell className="table-content" component="th" scope="row" style={{textAlign: "center", fontWeight: "600"}}>
          {ro.ClaveArticulo}
        </TableCell>
        <TableCell className="table-content">
          Enviado:&nbsp;{ro.NomArticuloCompra} <br /> Recibido:&nbsp;{materialr} <br />{' '}
          Observaciones:&nbsp;{observaciones}
        </TableCell>
        <TableCell className="table-content" style={{textAlign: "center", fontWeight: "600"}}>{ro.PorcentajeMaterial}&nbsp;%</TableCell>
        <TableCell className="table-content">
          Enviado:&nbsp;{ro.KilosDocumentados} &nbsp; lbs <br /> Recibido:&nbsp;{cantidadr}
          &nbsp; lbs
        </TableCell>
        <TableCell className="table-content">
          Enviado:&nbsp;{ro.KilosDocumentados}&nbsp; kgs <br /> Recibido:&nbsp;{kilosr}&nbsp; kgs
        </TableCell>
        <TableCell className="table-content">
          Enviado:&nbsp;{ro.KilosContaminados}&nbsp; kgs <br /> Recibido:&nbsp;{0}
          &nbsp; kgs
        </TableCell>
        <TableCell className="table-content">
          Almacen:&nbsp;{almacen}
          <br />
          Sub-Almacen:&nbsp;{ro.ClaSubAlmacenCompra}
        </TableCell>
        <TableCell className="table-content">
          <div onClick={()=>setmodalOpen(true)}>
            <EditIcon style={{ color: '#ff6a00', cursor: 'pointer' }} />
          </div>
        </TableCell>
        <Modal isOpen={modalOpen} onClose={()=>setmodalOpen(true)} ariaHideApp={false} style={customStyles}>
          <Popup
            key={index}
            ro={ro}
            material={material}
            setmaterialr={setmaterialr}
            setcantidadr={setcantidadr}
            setkilosr={setkilosr}
            setobservaciones={setobservaciones}
            setalmacen={setalmacen}
            setsubalmacen={setsubalmacen}
            materialr={materialr}
            cantidadr={cantidadr}
            kilosr={kilosr}
            observaciones={observaciones}
            almacen={almacen}
            subalmacen={subalmacen}
            contaminacion={contaminacion}
          />
        </Modal>
      </TableRow>
    );
  }

  useEffect(() => {

    /* eslint-disable */

if (placadato[0].ClaOrdenCompra != null && placadato[0].ClaOrdenCompra > 0) {
  setclaordencompra = ',"ClaOrdenCompra":' + placadato[0].ClaOrdenCompra;
}

if (placadato[0].IdAcuerdo != null && placadato[0].IdAcuerdo > 0) {
  setidacuerdo = ',"IdAcuerdo":' + placadato[0].IdAcuerdo;
}

if (placadato[0].IdPedidoImportacion != null && placadato[0].IdPedidoImportacion > 0) {
  setidpedidoimportacion = ',"IdPedidoImportacion":' + placadato[0].IdPedidoImportacion;
}


/* eslint-enable */
    const urlKrakenMateriales = `${config.KrakenService}/${24}/${6}`;
    console.log(claordencompra)
    console.log(idacuerdo)
    console.log(idpedidoimportacion)
    /* eslint-disable */
    const data2 = {
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"IdBoleta":' +
        id +
        ',"ClaProveedor":' +
        placadato[0].ClaProveedor +
        ',"IdListaPrecio":' +
        placadato[0].IdListaPrecio +
        ',"ClaUbicacionProveedor":' +
        placadato[0].ClaUbicacionProveedor +
        '}',
      tipoEstructura: 1,
    };
    /* eslint-enable */
    callApi(urlKrakenMateriales, 'POST', data2, (res) => {
      setrow(res.Result0);
    });
    const urlKrakenPrueba = `${config.KrakenService}/${24}/${8}`;


     /* eslint-disable */

    const data8 = {
      // parameters: "{\"IdListaPrecio\":"+ placadato[0].IdListaPrecio +",\"ClaOrdenCompra\":"+ placadato[0].ClaOrdenCompra+",\"IdAcuerdo\":"+ placadato[0].IdAcuerdo +",\"IdPedidoImportacion\":"+ placadato[0].IdPedidoImportacion +",\"IdBoleta\":"+ placadato[0].IdBoleta +"}",
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"IdListaPrecio":' +
        placadato[0].IdListaPrecio +
        ',"IdBoleta":' +
        placadato[0].IdBoleta 
         +
        '}',
      tipoEstructura: 1,
    };
    /* eslint-enable */
    callApi(urlKrakenPrueba, 'POST', data8, (res) => {
      setmaterial(res.Result0);
    });

    const urlKrakenContaminacion = `${config.KrakenService}/${24}/${13}`;
/* eslint-disable */
    const data13 = {
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        '}',
      tipoEstructura: 1,
    };
    /* eslint-enable */
    callApi(urlKrakenContaminacion, 'POST', data13, (res) => {
      setcontaminacion(res.Result0);
    });
  }, []);

  function Clasificacion() {
    return (
      <div>
        <Table className="table" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className="table-header" style={{paddingRight:"0px"}}>Fabricación</TableCell>
              <TableCell className="table-header">Material</TableCell>
              <TableCell className="table-header" style={{paddingLeft:"0px",paddingRight:"0px"}}>Porcentaje</TableCell>
              <TableCell className="table-header">Cantidad</TableCell>
              <TableCell className="table-header">Kilos</TableCell>
              <TableCell className="table-header">Atril/Tarima</TableCell>
              <TableCell className="table-header">Inventario</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{row && row.map((ro, index) => <List ro={ro} key={index} />)}</TableBody>
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

export default Material;
