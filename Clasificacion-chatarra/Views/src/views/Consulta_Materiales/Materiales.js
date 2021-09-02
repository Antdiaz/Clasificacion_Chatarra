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
// Wizard editar material
import Material from './Clasificar_Material';
import Materialpt from './Clasificar_Material_pt';

function Materiales({
  placadato,
  editBoxValue,
  TipoPatio,
  id,
  row,
  setrow,
  material,
  setmaterial,
  materialtodos,
  setmaterialtodos,
  materialpt,
  setmaterialpt,
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
  NomMotivoEntrada,
  setNomMotivoEntrada,
  ClaUbicacionOrigen,
  ClaViajeOrigen,
  ClaFabricacionViaje,
  setClaFabricacionViaje,
  idmaterialviaje,
  Actualizar,
  setActualizar,
  TipoTraspaso,
  Todos,
  setTodos,
  TodosChange,
  setTodosChange,
  ValidaCargo,
  setValidaCargo,
  Nocargo,
  setNocargo
}) {
  const NumbUsuario = getSessionItem('NumUsuario');
  const ipadress = getSessionItem('Ipaddress');
  const [ClaArticuloRemisionado, setClaArticuloRemisionado] = useState(0)

  function List({ ro, index, editOpen, seteditOpen,ClaArticuloRemisionado,setClaArticuloRemisionado }) {
    // Valor de elemento individual al querer editar material
    
    
    const [modaledit, setmodaledit] = useState(false);

    // Estilo de pop up/ wizard para agregar material
    const customStyles = {
      content: {
        background: 'rgba(128, 128, 128, 0.212)',
        top: '0%',
        right: '-.5%',
        bottom: '0%',
      },
    };

    // Componente cascarón de cada material mostrado
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
            {NomMotivoEntrada===9 ? ro.ClaveArticulo: NomMotivoEntrada===3 ? ro.ClaFabricacionViaje:''}
          </TableCell>
          <TableCell className="table-content">
            Enviado:&nbsp;{NomMotivoEntrada===9 ? (ro.NomArticuloPreReg ? ro.NomArticuloPreReg.split('-').pop(): 0) : NomMotivoEntrada===3 ? ro.NomArticuloRemisionado ? ro.NomArticuloRemisionado.split('-').pop(): '0' : '0'}{' '}
            <br /> Recibido:&nbsp;{NomMotivoEntrada===9 ? (ro.NomArticuloCompra ? ro.NomArticuloCompra.split('-').pop() : 0) : NomMotivoEntrada===3 ? ro.NomMaterialRecibeTraspaso ? ro.NomMaterialRecibeTraspaso.split('-').pop(): '0' : '0'}{' '}
            <br /> <span style={{whiteSpace: 'pre-wrap'}}>Observaciones:&nbsp;<span style={{fontSize: "13px"}}>{placadato[0].Observaciones}</span></span>
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center', fontWeight: '600' }}>
            {ro.PorcentajeMaterial ? ro.PorcentajeMaterial : ro.EsPesajeParcial ? 100 : 0}&nbsp;%
          </TableCell>
          <TableCell className="table-content">
            Enviado:&nbsp;{NomMotivoEntrada===9 ? 0 : NomMotivoEntrada===3 && ro.CantRemisionada!==null? ro.CantRemisionada.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","):0 } &nbsp;{NomMotivoEntrada===9 ? ro.NomUnidad: NomMotivoEntrada===3 ? ro.NomUnidadRemisionado: ''} <br /> Recibido:&nbsp;
            { NomMotivoEntrada===9 ? ro.CantidadMaterial? ro.CantidadMaterial.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 :NomMotivoEntrada===3 ? ro.CantRecibida !==null ? ro.CantRecibida.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","): 0:0}
            &nbsp; {NomMotivoEntrada===9 ? ro.NomUnidad: NomMotivoEntrada===3 ? ro.NomUnidadRecibido: ''}
          </TableCell>
          <TableCell className="table-content">
            Enviado:&nbsp;{ro.KgsMaterialPrereg ? ro.KgsMaterialPrereg : 0}&nbsp; Kgs <br />{' '}
            Recibido:&nbsp;{NomMotivoEntrada===9 ? ro.KilosReales ? ro.KilosReales : ro.KilosMaterial :ro.PesoRecibido ? ro.PesoRecibido.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}&nbsp; Kgs
          </TableCell>
          <TableCell className="table-content">
            Enviado:&nbsp;{ro.PesoTaraRemisionado ? ro.PesoTaraRemisionado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}&nbsp; Kgs <br /> Recibido:&nbsp;{ro.PesoTaraRecibido ? ro.PesoTaraRecibido.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}
            &nbsp; Kgs
          </TableCell>
          <TableCell className="table-content">
            Sub-Almacen:&nbsp;{NomMotivoEntrada===9 ? ro.ClaSubAlmacenCompra : NomMotivoEntrada===3 ? ro.ClaSubAlmacenTraspaso : ''}
          </TableCell>
          <TableCell className="table-content">
            <div
              onClick={
                row &&
                ro.EsPesajeParcial !==1 ? 
                () => {
                  setmodaledit(true);
                }
              :(row.every(ro => ro.KilosMaterial === 0)|| row.every(ro => ro.PesoRecibido === 0)) ? (() =>{ setpoppesaje(true)}) : () => {
                setmodaledit(true);
              }
              }
            >
              <EditIcon style={{ color: ro.EsPesajeParcial && (row.every(ro => ro.KilosMaterial === 0)|| row.every(ro => ro.PesoRecibido === 0)) ? 'grey':'#ff6a00' , cursor: 'pointer' }} />
            </div>
          </TableCell>
          {/* Pop up para editar un material */} 
          <Modal
            isOpen={modaledit}
            onClose={() => modaledit(true)}
            ariaHideApp={false}
            style={customStyles}
          >
            {(NomMotivoEntrada===9 || (NomMotivoEntrada===3 && TipoTraspaso===0) && placadato) ?
              (
                <Material
                  row={row}
                  setrow={setrow}
                  seteditOpen={seteditOpen}
                  editOpen={editOpen}
                  key={index}
                  ro={ro}
                  material={material}
                  materialtodos={materialtodos}
                  materialpt={materialpt}
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
                  TipoPatio={TipoPatio}
                  placadato={placadato}
                  setmodaledit={setmodaledit}
                  NomMotivoEntrada={NomMotivoEntrada}
                  setmaterial={setmaterial}
                  ClaViajeOrigen={ClaViajeOrigen}
                  ClaUbicacionOrigen={ClaUbicacionOrigen}
                  Actualizar={Actualizar}
                  setActualizar={setActualizar}
                  setClaArticuloRemisionado={setClaArticuloRemisionado}
                  ClaArticuloRemisionado={ClaArticuloRemisionado}
                />
              ):
              (
                <Materialpt
                  row={row}
                  setrow={setrow}
                  seteditOpen={seteditOpen}
                  editOpen={editOpen}
                  key={index}
                  ro={ro}
                  material={material}
                  materialtodos={materialtodos}
                  materialpt={materialpt}
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
                  TipoPatio={TipoPatio}
                  placadato={placadato}
                  setmodaledit={setmodaledit}
                  NomMotivoEntrada={NomMotivoEntrada}
                  setmaterial={setmaterial}
                  ClaViajeOrigen={ClaViajeOrigen}
                  ClaUbicacionOrigen={ClaUbicacionOrigen}
                  Actualizar={Actualizar}
                  setActualizar={setActualizar}
                />
              )}
          </Modal>
        </TableRow>
      </>
    );
  }



    // Función que corre servicios antes del render cada que haya un cambio de material y cada que se cierra un wizard
  // Servicio JSON 3 --> SP= AmpSch.AmpClaConsultaVehiculoMaterialClasificacionSel <Consultar Materiales Clasificados>
  useEffect(() => {
    let isCancelled = false;
    const timeout = setTimeout(() => {
      const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
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

      const data27 = {
        parameters:
          '{"ClaUbicacion":' +
          editBoxValue +
          ',"ClaServicioJson":' +
          27 +
          ',"Parametros":"@pnClaUbicacion=' +
          editBoxValue +
          ',@pnIdBoleta=' +
          id +
          '"}',
        tipoEstructura: 0,
      };

      const data63 = {
        parameters:
          '{"ClaUbicacion":' +
          editBoxValue +
          ',"ClaServicioJson":' +
          63 +
          ',"Parametros":"@pnClaUbicacion=' +
          editBoxValue +
          ',@pnIdBoleta=' +
          id +
          '"}',
        tipoEstructura: 0,
      };
      /* eslint-enable */
      if (!isCancelled && NomMotivoEntrada>0 && NomMotivoEntrada===9) {
      callApi(urlKrakenService, 'POST', data3, (res) => {
        if(Todos===0){
         setrow(res.Result0);}
         else if(Todos===1){
           setrow('')
         }
      });
      seteditOpen(true);}
      else if (!isCancelled && NomMotivoEntrada>0 && NomMotivoEntrada===3) {
        callApi(urlKrakenService, 'POST', data27, (res) => {
          if(Todos===0){
            setrow(res.Result0);}
            else if(Todos===1){
              setrow('')
            }
        });
        seteditOpen(true);
      }

      else if (!isCancelled && NomMotivoEntrada>0 && NomMotivoEntrada===1) {
        callApi(urlKrakenService, 'POST', data63, (res) => {
          setrow(res.Result0);
        });
        seteditOpen(true);
      }
      return()=> {
        isCancelled = true
      }
    }, 1400);
  }, [Actualizar]);

   // Función que corre servicios antes del render cada que haya un material, solo si el porcentaje total es 100% o si se maneja por cantidad
  // Servicio JSON 13 --> SP=BasSch.BasValidacionClasEntCompraMatPrimaProc <Valida clasificación>
  useEffect(() => {
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    if (((row && row.length>0) || (ValidaCargo===1)) && NomMotivoEntrada===9) {
      const PorcentajeSum =row &&  row.reduce((acc, val) => acc + val.PorcentajeMaterial, 0);
      const CantidadSum=row &&  row.reduce((acc, val) => acc + val.CantidadMaterial, 0);
      if ((PorcentajeSum !== null && PorcentajeSum === 100) || (PorcentajeSum === 0 && CantidadSum>0) || (ValidaCargo===1 && row && row.length>0 && (row[0].CantidadMaterial !==null || row[0].KilosMaterial!==null || row[0].PorcentajeMaterial!==null)&& (PorcentajeSum !== null && PorcentajeSum === 100) || (PorcentajeSum === 0 && CantidadSum>0))) {
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
            ',@pnEsNoCargoDescargoMaterial='+ Todos +',@pnClaUsuarioMod=' +
            NumbUsuario +
            ',@psNombrePcMod=' +
            ipadress +
            ',@pnIdMensaje=,@psMensaje=,@pnEsPesajeParcial="}',
          tipoEstructura: 0,
        };

        /* eslint-enable */

        callApi(urlKrakenService, 'POST', data13, (res) => {
          // console.log(res);
        });
      }
    }

    if( ((row && row.length>0) || (ValidaCargo===1)) && NomMotivoEntrada===3){
     setClaFabricacionViaje(placadato[0].IdFabDefault)
      const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
        const PorcentajeSum = row && row.reduce((acc, val) => acc + val.PorcentajeMaterial, 0);
        const CantidadSum= row && row.reduce((acc, val) => acc + val.CantRecibida, 0);
        if (Todos===0 && (PorcentajeSum !== null && PorcentajeSum === 100) || (PorcentajeSum === 0 && CantidadSum>0)|| (ValidaCargo===1 && row && row.length>0 && (row[0].CantRecibida !==null || row[0].PesoRecibido!==null || row[0].Porcentaje!==null) && (PorcentajeSum !== null && PorcentajeSum === 100) || (PorcentajeSum === 0 && CantidadSum>0))) {
          /* eslint-disable */
      const data38 = {
        parameters:
          '{"ClaUbicacion":' +
          editBoxValue +
          ',"ClaServicioJson":38,"Parametros":"@pnClaUbicacion=' +
          editBoxValue +
          ',@pnIdBoleta=' +
          placadato[0].IdBoleta +
          ',@pnClaUbicacionOrigen='+ClaUbicacionOrigen+',@pnClaViajeOrigen=' +
          ClaViajeOrigen +
          ',@pnEsNoCargoDescargoMaterial='+ Todos +',@pnClaUsuarioMod=' +
          NumbUsuario +
          ',@psNombrePcMod=' +
          ipadress +
          '"}',
        tipoEstructura: 0,
      };
/* eslint-enable */
      callApi(urlKrakenService, 'POST', data38, (res) => {
        // console.log(res);
      });
    }}

    if(Nocargo===1){
    setNocargo(0)
    }
  }, [row]);

  useEffect(() => {

    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    /* eslint-disable */
    if(NomMotivoEntrada===3 && TipoTraspaso===0){
      console.log(data30)
    const data30 = {
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"ClaServicioJson":' +
        30 +
        ',"Parametros":"@pnClaArticuloOrigen=' +
        (idmaterialviaje !==0 ? idmaterialviaje:ClaArticuloRemisionado) +
        ',@EsIncluirArtOrigen=1"}',
      tipoEstructura: 0,
    };

    const data39 = {
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"ClaServicioJson":' +
        39 +
        ',"Parametros":"@psValor="}',
      tipoEstructura: 0,
    };

  /* eslint-enable */
  if(material===null || material.length<1)
      callApi(urlKrakenService, 'POST', data30, (res) => {
      setmaterial(res.Result0);
      });

      if(materialtodos ===null)
      callApi(urlKrakenService, 'POST', data39, (res) => {
        setmaterialtodos(res.Result0);
        });
    }
  }, [idmaterialviaje,ClaArticuloRemisionado])


   // Componente de sección de materiales con sus headers
  function Clasificacion() {
    return (
      <div>
        <Table className="table" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className="table-header">
                Fabricación
              </TableCell>
              <TableCell className="table-header">Material</TableCell>
              <TableCell
                className="table-header"
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
                <List ro={ro} key={index} editOpen={editOpen} ClaArticuloRemisionado={ClaArticuloRemisionado} setClaArticuloRemisionado={setClaArticuloRemisionado} seteditOpen={seteditOpen} />
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    );
  }

   // Componente visual final
  return (
    <div>
      <Clasificacion />
    </div>
  );
}

export default Materiales;
