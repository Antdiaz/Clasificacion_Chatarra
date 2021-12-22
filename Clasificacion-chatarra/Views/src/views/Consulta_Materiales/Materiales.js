import React, { useState, useEffect,useRef } from 'react';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import {DragDropContext,Droppable,Draggable} from 'react-beautiful-dnd'


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
  setNocargo,
  cambioGuardar,
  setcambioGuardar
}) {
  const NumbUsuario = getSessionItem('NumUsuario');
  const ipadress = getSessionItem('Ipaddress');
  const Token = getSessionItem('Token');
  const [electrobots, setelectrobots] = useState('0|0|0|0|0|0|0|0|0|0|0|0|')
  const [electrobots2, setelectrobots2] = useState('0|0|0|0|0|0|0|0|0|0|0|0|')
  const [ClaArticuloRemisionado, setClaArticuloRemisionado] = useState(0)
  const [observacion, setobservacion] = useState(placadato[0].Observaciones ? placadato[0].Observaciones:'');
  const [newdrop, setnewdrop] = useState(false);
  const prevnewdrop = usePrevious(newdrop)
  const PorcentajeSum = row
  ? +row.reduce((acc, val) => acc + val.PorcentajeMaterial, 0) : 0;
  const CantidadSum=row ? row.reduce((acc, val) => acc + val.CantidadMaterial, 0): 0;
  const KilosSum=row && NomMotivoEntrada===9 ? row.reduce((acc, val) => acc + val.KilosMaterial, 0): 0;
  const KilosSumt=row && NomMotivoEntrada===3 ? row.reduce((acc, val) => acc + val.PesoRecibido, 0): 0;
  const CantidadSumt=row ? row.reduce((acc, val) => acc + val.CantRecibida, 0): 0;
  function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
  }

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
      <Draggable key={index} draggableId={index.toString()} index={index}>
        {provided => (
          <>
            {ro.ClaArticuloPreReg ? <tr><td className="pre-registro">Pre-registro</td></tr> : null}
            <TableRow ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <TableCell
                className="table-content"
                component="th"
                scope="row"
                style={{ textAlign: 'center'}}
              >
                <span style={{fontWeight: '600'}}>{NomMotivoEntrada===9 ? ro.ClaveArticulo: NomMotivoEntrada===3 ? ro.ClaFabricacionViaje:''}</span>
                <br /><span style={{fontWeight: '400'}}>{ro.NomZonaDescarga}</span>
              </TableCell>
              <TableCell className="table-content">
                Enviado:&nbsp;{NomMotivoEntrada===9 ? (ro.NomArticuloPreReg ? ro.NomArticuloPreReg.split('-').pop(): 0) : NomMotivoEntrada===3 ? ro.NomArticuloRemisionado ? ro.NomArticuloRemisionado.split('-').pop(): '0' : '0'}{' '}
                <br /> Recibido:&nbsp;{NomMotivoEntrada===9 ? (ro.NomArticuloCompra ? ro.NomArticuloCompra.split('-').pop() : 0) : NomMotivoEntrada===3 ? ro.NomMaterialRecibeTraspaso ? ro.NomMaterialRecibeTraspaso.split('-').pop(): '0' : '0'}{' '}
                <br />{ro.Observaciones !== 'null' && ro.Observaciones !=='undefined' && ro.Observaciones !=='' ?'Comentarios:':null}&nbsp;{ro.Observaciones !== 'null' && ro.Observaciones !=='undefined' && ro.Observaciones !=='' ? ro.Observaciones :null}
              </TableCell>
              <TableCell className="table-content" style={{ textAlign: 'center', fontWeight: '600' }}>
                {ro.PorcentajeMaterial ? ro.PorcentajeMaterial : ro.EsPesajeParcial ? 0 : 0}&nbsp;%
              </TableCell>
              <TableCell className="table-content">
                Enviado:&nbsp;{NomMotivoEntrada===9 ? 0 : NomMotivoEntrada===3 && ro.CantRemisionada!==null? ro.CantRemisionada.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","):0 } &nbsp;{NomMotivoEntrada===9 ? ro.NomUnidad: NomMotivoEntrada===3 ? ro.NomUnidadRemisionado: ''} <br /> Recibido:&nbsp;
                { NomMotivoEntrada===9 ? ro.CantidadMaterial? ro.CantidadMaterial.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 :NomMotivoEntrada===3 ? ro.CantRecibida !==null ? ro.CantRecibida.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","): 0:0}
                &nbsp; {NomMotivoEntrada===9 ? ro.NomUnidad: NomMotivoEntrada===3 ? ro.NomUnidadRecibido: ''}
              </TableCell>
              <TableCell className="table-content">
                Enviado:&nbsp;{ NomMotivoEntrada===9 && ro.KgsMaterialPrereg ? ro.KgsMaterialPrereg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","):NomMotivoEntrada===3 ? ro.PesoRemisionado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","): 0}&nbsp; Kg <br />{' '}
                Recibido:&nbsp;{NomMotivoEntrada===9 ? ro.KilosReales ? ro.KilosReales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ro.KilosMaterial ? ro.KilosMaterial.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","):0 :ro.PesoRecibido ? ro.PesoRecibido.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}&nbsp; Kg
              </TableCell>
              <TableCell className="table-content">
                Enviado:&nbsp;{ro.PesoTaraRemisionado ? ro.PesoTaraRemisionado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}&nbsp; Kg <br /> Recibido:&nbsp;{ro.PesoTaraRecibido ? ro.PesoTaraRecibido.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}
                &nbsp; Kg
              </TableCell>
              {NomMotivoEntrada=== 9 ?
                (
                  <TableCell className="table-content">
                    Elect:&nbsp;{ro.ELECTRODOMESTICOS ? ro.ELECTRODOMESTICOS.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","): 0}&nbsp; Kg <br />{' '}
                    Botes:&nbsp;{ro.Bote ? ro.Bote.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}&nbsp; Kg<br />{' '}
                    Contam:&nbsp;{ro.KilosContaminados ? ro.KilosContaminados.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}&nbsp; Kg
                  </TableCell>
                ): 
                (
                  <TableCell className="table-content">
                    Contam:&nbsp;{ro.KilosContaminados !==null ? (+ro.KilosContaminados + +ro.Llantas + +ro.Tanques).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}&nbsp; Kg
                  </TableCell>
                  )}
              <TableCell className="table-content">
                Sub-Almacen:&nbsp;{NomMotivoEntrada===9 ? ro.ClaSubAlmacenCompra : NomMotivoEntrada===3 ? ro.ClaSubAlmacenTraspaso : ''}
              </TableCell>
              <TableCell className="table-content">
                <div
                  onClick={
                    row &&
                    (row.every(ro => ro.EsPesajeParcial !==1)) ? 
                    () => {
                      setmodaledit(true)
                    }
                  :(ro.EsPesajeParcial &&(row.every(ro => (ro.KilosMaterial === 0 || ro.KilosMaterial === null))|| row.every(ro => (ro.PesoRecibido === 0 || ro.PesoRecibido === null))) || (row.some(ro => ro.EsPesajeParcial) && (row.every(ro => (ro.KilosMaterial === 0 || ro.KilosMaterial === null))|| row.every(ro => ro.PesoRecibido === 0 || ro.PesoRecibido === null)) && (NomMotivoEntrada===9 ? !ro.ClaArticuloCompra: NomMotivoEntrada===3 && !ro.ClaveMaterialRecibeTraspaso))|| (row.every(ro=> ro.EsPesajeParcial===1) && (row.some(ro => (ro.KilosMaterial === 0 || ro.KilosMaterial === null))|| row.some(ro => ro.PesoRecibido === 0 || ro.PesoRecibido === null)))) ? (() =>{ setpoppesaje(true)}) : () => {
                    setmodaledit(true);
                  }
                  }
                >
                  <EditIcon style={{ color: (ro.EsPesajeParcial && (row.every(ro => (ro.KilosMaterial === 0 || ro.KilosMaterial === null)|| row.every(ro => (ro.PesoRecibido === 0 || ro.PesoRecibido === null))) || row.some(ro => ro.PesoRecibido === 0 || ro.PesoRecibido === null))|| (row.some(ro => ro.EsPesajeParcial) && (row.every(ro => (ro.KilosMaterial === 0 || ro.KilosMaterial === null))|| row.every(ro => ro.PesoRecibido === 0 || ro.PesoRecibido === null)) && (NomMotivoEntrada===9 ? !ro.ClaArticuloCompra: NomMotivoEntrada===3 && !ro.ClaveMaterialRecibeTraspaso)) || (row.every(ro=> ro.EsPesajeParcial===1) && (row.some(ro => (ro.KilosMaterial === 0 || ro.KilosMaterial === null))|| row.some(ro => ro.PesoRecibido === 0 || ro.PesoRecibido === null))))? 'grey':'#ff6a00' , cursor: 'pointer' }} />
                </div>
              </TableCell>
              {/* Pop up para editar un material */} 
              <Modal
                isOpen={modaledit}
                onClose={() => modaledit(false)}
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
                      cambioGuardar={cambioGuardar} 
                      setcambioGuardar={setcambioGuardar}
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
                      cambioGuardar={cambioGuardar} 
                      setcambioGuardar={setcambioGuardar}
                    />
                  )}
              </Modal>
            </TableRow>
          </>
        )}
      </Draggable>
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
          ''+config.Separador+'@pnIdBoleta=' +
          id +
          ''+config.Separador+'@pnClaProveedor=' +
          placadato[0].ClaProveedor +
          ''+config.Separador+'@pnIdListaPrecio=' +
          placadato[0].IdListaPrecio +
          ''+config.Separador+'@pnClaUbicacionProveedor=' +
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
          ''+config.Separador+'@pnIdBoleta=' +
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
          ''+config.Separador+'@pnIdBoleta=' +
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
    }, 800);
  }, [Actualizar]);

   // Función que corre servicios antes del render cada que haya un material, solo si el porcentaje total es 100% o si se maneja por cantidad
  // Servicio JSON 13 --> SP=BasSch.BasValidacionClasEntCompraMatPrimaProc <Valida clasificación>
  useEffect(() => {
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;


    if((newdrop===false) && (((row && row.length>0) || (ValidaCargo===1)) && NomMotivoEntrada===3)){
      const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
        const PorcentajeSum = row && row.reduce((acc, val) => acc + val.PorcentajeMaterial, 0);
        const CantidadSum= row && row.reduce((acc, val) => acc + val.CantRecibida, 0);
        if ((Todos===0 && ((PorcentajeSum !== null && (PorcentajeSum === 100 || (pesajeparcial===1 && (PorcentajeSum === 100 || PorcentajeSum > 100)))) || (PorcentajeSum === 0 && CantidadSum>0)|| (ValidaCargo===1 && row && row.length>0 && (row[0].CantRecibida !==null || row[0].PesoRecibido!==null || row[0].Porcentaje!==null) && (PorcentajeSum !== null && PorcentajeSum === 100) || (PorcentajeSum === 0 && CantidadSum>0))))) {
          /* eslint-disable */
      
    }}

    if(Nocargo===1){
    setNocargo(0)
    }
  }, [row,!newdrop]);

  useEffect(() => {

    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    /* eslint-disable */
    if(NomMotivoEntrada===3 && TipoTraspaso===0){
    const data30 = {
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"ClaServicioJson":' +
        30 +
        ',"Parametros":"@pnClaArticuloOrigen=' +
        (idmaterialviaje !==0 ? idmaterialviaje:ClaArticuloRemisionado) +
        ''+config.Separador+'@EsIncluirArtOrigen=1"}',
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
    const handleDragEnd = (result) => {
      
      if(!result.destination) return;
      const materiales = Array.from(row);
      const [reordenados]= materiales.splice(result.source.index,1);
      materiales.splice(result.destination.index,0,reordenados);
      setrow(materiales);
      setnewdrop(true);
   
    }

    useEffect(() => {
      if(newdrop===true){
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    const urlKrakenBloque = `${config.KrakenService}/${24}/${config.Bloque}`;
/* eslint-disable */
    row && NomMotivoEntrada===9 && row.map(electros => {
    
      const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
        const data70 = {
          parameters:
            '{"ClaUbicacion":' +
            editBoxValue +
            ',"ClaServicioJson":' +
            70 +
            ',"Parametros":"@pnClaUbicacion=' +
            editBoxValue +
            ''+config.Separador+'@pnIdBoleta=' +
              placadato[0].IdBoleta +
            // ',@pnClaArticuloCompra=' +
            // (props.NomMotivoEntrada===9 ? props.ro.ClaArticuloCompra : props.NomMotivoEntrada===3 && props.ro.ClaMaterialRecibeTraspaso)+
            '"}',
          tipoEstructura: 0,
        };
        /* eslint-enable */
        callApi(urlKrakenService, 'POST', data70, (res) => {
          if(res.Result0.length>0 && electros.ClaArticuloCompra){
          const isrefri= res.Result0.filter(electrobotes => electrobotes.ClaArticulo === electros.ClaArticuloCompra && electrobotes.ClaArtSupTipo===1)[0].Cantidad
          const imrefri =res.Result0.filter(electrobotes => electrobotes.ClaArticulo === electros.ClaArticuloCompra && electrobotes.ClaArtSupTipo===2)[0].Cantidad
          const irefri =res.Result0.filter(electrobotes => electrobotes.ClaArticulo === electros.ClaArticuloCompra && electrobotes.ClaArtSupTipo===3)[0].Cantidad
          const ilavadora = res.Result0.filter(electrobotes => electrobotes.ClaArticulo === electros.ClaArticuloCompra && electrobotes.ClaArtSupTipo===4)[0].Cantidad
          const iboiler = res.Result0.filter(electrobotes => electrobotes.ClaArticulo === electros.ClaArticuloCompra && electrobotes.ClaArtSupTipo===5)[0].Cantidad
          const isecadora = res.Result0.filter(electrobotes => electrobotes.ClaArticulo === electros.ClaArticuloCompra && electrobotes.ClaArtSupTipo===6)[0].Cantidad
          const iestufa= res.Result0.filter(electrobotes => electrobotes.ClaArticulo === electros.ClaArticuloCompra && electrobotes.ClaArtSupTipo===7)[0].Cantidad
          const imicroondas = res.Result0.filter(electrobotes => electrobotes.ClaArticulo === electros.ClaArticuloCompra && electrobotes.ClaArtSupTipo===8)[0].Cantidad
          const iotros = res.Result0.filter(electrobotes => electrobotes.ClaArticulo === electros.ClaArticuloCompra && electrobotes.ClaArtSupTipo===9)[0].Cantidad
          const icostal= res.Result0.filter(electrobotes => electrobotes.ClaArticulo === electros.ClaArticuloCompra && electrobotes.ClaArtSupTipo===10)[0].Cantidad
          const isaco = res.Result0.filter(electrobotes => electrobotes.ClaArticulo === electros.ClaArticuloCompra && electrobotes.ClaArtSupTipo===11)[0].Cantidad
          const icontenedor = res.Result0.filter(electrobotes => electrobotes.ClaArticulo === electros.ClaArticuloCompra && electrobotes.ClaArtSupTipo===12)[0].Cantidad
          if(row.length===1 || row.length===2){
            setelectrobots((`${isrefri}|${imrefri}|${irefri}|${ilavadora}|${iboiler}|${isecadora}|${iestufa}|${imicroondas}|${iotros}|${icostal}|${isaco}|${icontenedor}|`).toString())
          }
    
          else if(row.length===2){
            setelectrobots2((`${isrefri}|${imrefri}|${irefri}|${ilavadora}|${iboiler}|${isecadora}|${iestufa}|${imicroondas}|${iotros}|${icostal}|${isaco}|${icontenedor}|`).toString())
          }
        }})
      })
    
      /* eslint-disable */
      const data11 = 
      [ `@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@psObservaciones='${(placadato[0].Observaciones ? placadato[0].Observaciones.replace('#', '%23'): '')}'${config.Separador}@pnEsRevisionEfectuada=${placadato[0].EsRevisionEfectuada}${config.Separador}@pnClaTipoClasificacion=${placadato[0].ClaTipoClasificacion}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@psOrigen='WEB'`];

      const data12g= 
      row && row.map((element,index)=>{
        if(element.ClaArticuloCompra){
      const data = [`@@TransactionSAMP:@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@pnClaArticuloPreReg=${element.ClaArticuloPreReg ? element.ClaArticuloPreReg: 0}${config.Separador}@pnClaArticuloCompra=${element.ClaArticuloCompra}${config.Separador}@pnCantidadMaterial=${(element.CantidadMaterial)}${config.Separador}@pnKilosMaterial=${element.KilosMaterial}${config.Separador}@pnOrden=${(index + 1)}${config.Separador}@pnKilosReales=${(element.KilosReales)}${config.Separador}@pnKilosContaminados=${element.KilosContaminados}${config.Separador}@pnKilosDocumentados=${(element.KilosDocumentados)}${config.Separador}@pnPorcentajeMaterial=${(element.PorcentajeMaterial)}${config.Separador}@pnEsPesajeParcial=${(element.EsPesajeParcial)}${config.Separador}@pnClaAlmacen=${element.ClaAlmacen}${config.Separador}@pnClaSubAlmacenCompra=${element.ClaSubAlmacenCompra}${config.Separador}@pnClaMotivoContaminacion=${element.ClaMotivoContaminacion ? element.ClaMotivoContaminacion : 0}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@pnClaProveedor=${placadato[0].ClaProveedor}${config.Separador}@pnIdListaPrecio=${placadato[0].IdListaPrecio}${config.Separador}@pnClaTipoOrdenCompra=${placadato[0].ClaTipoOrdenCompra ? placadato[0].ClaTipoOrdenCompra : 0}${config.Separador}@pnClaOrdenCompra=${placadato[0].ClaArticuloCompra ? placadato[0].ClaArticuloCompra : 0}${config.Separador}@pnClaUbicacionProveedor=${placadato[0].ClaUbicacionProveedor}${config.Separador}@psClaReferenciaCompra='${element.ClaReferenciaCompra}'${config.Separador}@psClaArtSupTipo='1|2|3|4|5|6|7|8|9|10|11|12|'${config.Separador}@psValorArtSupTipo='${((index + 1) === 1 ? electrobots: electrobots2)}'${config.Separador}@pnIdRenglon=${(element.IdRenglon)}${config.Separador}@pnKilosElectrodomesticos=${(element.KilosElectrodomesticos ? element.KilosElectrodomesticos : 0)}${config.Separador}@pnKilosBote=${(element.KilosBote ? element.KilosBote : 0)}${config.Separador}@pnObservaciones='${(element.Observaciones)}'${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]
        return data 
        }
      })
      

      const data13 =
      [`@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@pnClaTipoClasificacion=1${config.Separador}@pnClaUbicacionProveedor=${placadato[0].ClaUbicacionProveedor}${config.Separador}@pnClaOrdenCompra=${placadato[0].ClaArticuloCompra ? placadato[0].ClaArticuloCompra : 0}${config.Separador}@pnClaTipoOrdenCompra=${placadato[0].ClaTipoOrdenCompra ? placadato[0].ClaTipoOrdenCompra : 0}${config.Separador}@pnIdListaPrecio=${placadato[0].IdListaPrecio}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@pnEsPesajeParcial=${pesajeparcial}`];
    
      const PorcentajeSum = row
      ? +row.reduce((acc, val) => acc + val.PorcentajeMaterial, 0) : 0;
      const CantidadSum=row && row.reduce((acc, val) => acc + val.CantidadMaterial, 0);
      const KilosSum=row && NomMotivoEntrada===9 && row.reduce((acc, val) => acc + val.KilosMaterial, 0);
      const KilosSumt=row && NomMotivoEntrada===3 && row.reduce((acc, val) => acc + val.PesoRecibido, 0);
      const CantidadSumt=row && row.reduce((acc, val) => acc + val.CantRecibida, 0);
  
      const data83 ={ parameters: `{"ClaUbicacion":${editBoxValue},"Token":"${Token}","ClaServicioJson":"83","IdBoleta":"${placadato[0].IdBoleta}","EnBloque":"${1}","Encabezado":"${data11}","Detalle":"${data12g.join("")}","Validacion":"${(((PorcentajeSum !== null && (PorcentajeSum === 100)) || (PorcentajeSum === 0 && CantidadSum>0) || (ValidaCargo===1 && row && row.length>0 && (row[0].CantidadMaterial !==null || row[0].KilosMaterial!==null || row[0].PorcentajeMaterial!==null) && (PorcentajeSum !== null && PorcentajeSum === 100) || (PorcentajeSum === 0 && CantidadSum>0)))|| Todos===1 || pesajeparcial===1) ? data13 : ''}"}`,
      tipoEstructura: 0}

    async function GuardaMateriales(){ 
      console.log(data83) 
      callApi(urlKrakenBloque, 'POST', data83, (res) => {

      });
    }

    const data36 = 
    [ `@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@pnClaViajeOrigen=${placadato[0].ClaViajeOrigen}${config.Separador}@pnClaUbicacionOrigen=${placadato[0].ClaUbicacionOrigen}${config.Separador}@pnClaTransporte=${placadato[0].ClaTransporte}${config.Separador}@pnClaTransportista=${placadato[0].ClaTransportista}${config.Separador}@psNomTransportista='${placadato[0].NomTransportista}'${config.Separador}@psNomChofer='${(placadato[0].NomChofer !== null ? placadato[0].NomChofer: 0)}'${config.Separador}@psPlacas='${placadato[0].Placas}'${config.Separador}@pnPesoDocumentado=${placadato[0].PesoDocumentado}${config.Separador}@psObservaciones='${(placadato[0].Observaciones ? placadato[0].Observaciones.replace('#', '%23'):'')}'${config.Separador}@pnEsRevisionEfectuada=${(placadato[0].EsRevisionEfectuada ? placadato[0].EsRevisionEfectuada : 0)}${config.Separador}@pnClaTipoClasificacion=${placadato[0].ClaTipoClasificacion}${config.Separador}@pnEsNoCargoDescargoMaterial=${Todos}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@psOrigen='WEB'`];


    const data37g= row && row.map((element,index)=>{
      if(element.ClaMaterialRecibeTraspaso){
      const data = [ `@@TransactionSAMP:@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@pnClaViajeOrigen=${placadato[0].ClaViajeOrigen}${config.Separador}@pnClaUbicacionOrigen=${placadato[0].ClaUbicacionOrigen}${config.Separador}@pnIdRenglonRecepcion=${(index + 1)}${config.Separador}@pnIdFabricacion=${(element.IdFabricacion ? element.IdFabricacion : 0)}${config.Separador}@pnIdFabricacionDet=${(element.IdFabricacionDet ? element.IdFabricacionDet : 0)}${config.Separador}@pnClaArticuloRemisionado=${(element.ClaArticuloRemisionado ? element.ClaArticuloRemisionado : 0)}${config.Separador}@pnCantRemisionada=${(element.CantRemisionada ? element.CantRemisionada : 0)}${config.Separador}@pnClaMaterialRecibeTraspaso=${element.ClaMaterialRecibeTraspaso}${config.Separador}@pnCantRecibida=${element.CantRecibida}${config.Separador}@pnPesoRecibido=${element.PesoRecibido}${config.Separador}@pnPorcentajeMaterial=${element.PorcentajeMaterial}${config.Separador}@pnPesoTaraRecibido=${(element.PesoTaraRecibido !== null ? element.PesoTaraRecibido : 0)}${config.Separador}@pnClaAlmacen=${(element.ClaAlmacen ? element.ClaAlmacen : 1)}${config.Separador}@pnClaSubAlmacenTraspaso=${(element.ClaSubAlmacenTraspaso)}${element.ClaSubSubAlmacen !== null && element.ClaSubSubAlmacen !== 0 ? (config.Separador+'@pnClaSubSubAlmacen='+element.ClaSubSubAlmacen) : ''}${config.Separador}@pnClaSeccion=${(element.ClaSeccion !== null ? element.ClaSeccion : 0)}${config.Separador}@psReferencia1=${(element.Referencia1 !== null ? element.Referencia1 : 0)}${config.Separador}@psReferencia2=${(element.Referencia2 !== null ? element.Referencia2 : 0)}${config.Separador}@psReferencia3=${(element.Referencia3 !== null ? element.Referencia3 : 0)}${config.Separador}@psReferencia4=${(element.Referencia4 !== null ? element.Referencia4 : 0)}${config.Separador}@psReferencia5=${(element.Referencia5 !== null ? element.Referencia5 : 0)}${config.Separador}@pnEsPesajeParcial=${element.EsPesajeParcial}${config.Separador}@pnOrden=${(index + 1)}${config.Separador}@pnKilosReales=${(element.KilosReales ? element.KilosReales : 0)}${config.Separador}@pnKilosContaminados=${(element.KilosContaminados ? element.KilosContaminados : 0)}${config.Separador}@pnClaMotivoContaminacion=${(element.ClaMotivoContaminacion ? element.ClaMotivoContaminacion : 0)}${config.Separador}@pnClaReferenciaTraspaso=${element.ClaReferenciaTraspaso}${config.Separador}@pnEsNoCargoDescargoMaterial=${Todos}${config.Separador}@pnObservaciones='${(element.observaciones)}'${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`];

        return data
      }
      })
       
      
      const data38 =
      [`@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@pnClaUbicacionOrigen=${placadato[0].ClaUbicacionOrigen}${config.Separador}@pnClaViajeOrigen=${placadato[0].ClaViajeOrigen}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]
      
      const data84 ={ parameters: `{"ClaUbicacion":${editBoxValue},"Token":"${Token}","ClaServicioJson":"84","IdBoleta":"${placadato[0].IdBoleta}","EnBloque":"${1}","Encabezado":"${data36}","Detalle":"${data37g.join("")}","Validacion":"${(((PorcentajeSum !== null && (PorcentajeSum === 100)) || (PorcentajeSum === 0 && CantidadSumt>0) || (ValidaCargo===1 && row && row.length>0 && (row[0].CantidadMaterial !==null || row[0].KilosMaterial!==null || row[0].PorcentajeMaterial!==null)&& (PorcentajeSum !== null && PorcentajeSum === 100) || (PorcentajeSum === 0 && CantidadSumt>0)))|| pesajeparcial===1) ? data38 : ''}}"}`,
      tipoEstructura: 0}
    
      async function GuardaMaterialestra(){ 
        console.log(data84) 
        callApi(urlKrakenBloque, 'POST', data84, (res) => {
  
        });
      }

      if(row && newdrop === true && NomMotivoEntrada===3 && row.every(ro => ro.ClaArticuloRemisionado != null)){
        GuardaMaterialestra()
    }

      if(row && newdrop === true && NomMotivoEntrada===9 && row.every(ro => ro.ClaArticuloCompra != null)){
        GuardaMateriales()
    }
    }}, [newdrop])

    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="list">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {row!==null && row!=='' && row!==0 && Todos ===0 ?
              (
                <Table className="table" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="table-header" style={{paddingLeft: '12px',paddingRight: '0px'}}>
                        Fabricación
                      </TableCell>
                      <TableCell className="table-header">Material</TableCell>
                      <TableCell
                        className={((NomMotivoEntrada==9 && CantidadSum>0) || (NomMotivoEntrada==3 && CantidadSumt>0)) || (CantidadSum===0 && PorcentajeSum===0) ? "table-header" : PorcentajeSum<100 ? "yellowporcentaje" :PorcentajeSum>100 && pesajeparcial===1 ? "redporcentaje" : "greenporcentaje"}
                      >
                        {PorcentajeSum>0 && ((NomMotivoEntrada===9 && CantidadSum===0) || (NomMotivoEntrada===3 && CantidadSumt===0)) && PorcentajeSum}% {(PorcentajeSum<100 && PorcentajeSum>0 && ((NomMotivoEntrada===9 && CantidadSum===0) || (NomMotivoEntrada===3 && CantidadSumt===0)))? (<i className="fas fa-exclamation-triangle" title="No se le podrá dar salida al material hasta que la suma de porcentaje sea 100%"></i>):null}
                      </TableCell>
                      <TableCell className="table-header">Cantidad</TableCell>
                      <TableCell className="table-header">Kilos</TableCell>
                      <TableCell className="table-header">Tara</TableCell>
                      <TableCell className="table-header">Otros</TableCell>
                      <TableCell className="table-header">Inventario</TableCell>
                      <TableCell> </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row
                      ? row.map((ro, index) => (
                        <List ro={ro} key={index} index={index} editOpen={editOpen} ClaArticuloRemisionado={ClaArticuloRemisionado} setClaArticuloRemisionado={setClaArticuloRemisionado} seteditOpen={seteditOpen} />
                        ))
                      : null}
                    {provided.placeholder}
                  </TableBody>
                </Table>
                ):
                Todos !==1 && (
                  <div style={{ textAlign: 'center', paddingTop: '40px' }}>
                    <CircularProgress />
                  </div>
                )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
