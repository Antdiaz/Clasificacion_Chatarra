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
import MaterialesXCargar from './Clasificar_Material_CamionxCargar';

function Materiales({
  setSavemat,
  Savemat,
  placadato,
  editBoxValue,
  TipoPatio,
  id,
  row,
  setrow,
  EsValido,
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
  PlanCarga,
  TipoTraspaso,
  setBoxPlanCarga,
  BoxPlanCarga,
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
  

  function List({ ro, index, editOpen, seteditOpen,BoxPlanCarga }) {
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
            {ro.IdFabricacion}
          </TableCell>
          <TableCell className="table-content">
            {ro.NomArticuloPlanCarga ? ro.NomArticuloPlanCarga.split('-').pop(): 0}{' '}
            <br /> <span style={{whiteSpace: 'pre-wrap'}}>Observaciones:&nbsp;<span style={{fontSize: "13px"}}>{placadato[0].Observaciones}</span></span>
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center', fontWeight: '600' }}>
            {ro.Porcentaje ? ro.Porcentaje : ro.EsPesajeParcial ? 100 : ro.CantEmbarcada===null && ro.KilogramosEmbarcados===null ? 0 : 'NA'}&nbsp;%
          </TableCell>
          <TableCell className="table-content">
            A embarcar:&nbsp;{ro.CantEmbarcar ? ro.CantEmbarcar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}&nbsp;{ro.NomUnidad ? ro.NomUnidad: ''} 
            <br /> {ro.Porcentaje===null || ro.Porcentaje===0 ? 'Embarcado:':''}&nbsp;{ro.Porcentaje===null || ro.Porcentaje===0 ? ro.CantEmbarcada ? ro.CantEmbarcada.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 :''}
            &nbsp; {ro.Porcentaje===null || ro.Porcentaje===0 ? ro.NomUnidad ? ro.NomUnidad: '' : ''}
          </TableCell>
          <TableCell className="table-content">
            A embarcar:&nbsp;{ro.KilogramosEmbarcar ? ro.KilogramosEmbarcar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}&nbsp; Kgs <br />{' '}
            {ro.Porcentaje===null || ro.Porcentaje===0 ? 'Embarcado:':''}&nbsp;{ro.Porcentaje===null || ro.Porcentaje===0 ? ro.KilogramosEmbarcados ? ro.KilogramosEmbarcados.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0:''}&nbsp;{ro.Porcentaje===null || ro.Porcentaje===0 ? 'Kgs':''}
          </TableCell>
          <TableCell className="table-content">
            Embarcado:&nbsp;{ro.PesoTaraRecibido ? ro.PesoTaraRecibido.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}
            &nbsp; Kgs
          </TableCell>
          <TableCell className="table-content">
            Sub-Almacen:&nbsp;{ro.ClaSubAlmacen ? ro.ClaSubAlmacen : ''}
          </TableCell>
          <TableCell className="table-content">
            <div
              onClick={
                row &&
                ro.EsPesajeParcial ===1 ? 
                () => {
                  setpoppesaje(true);
                }
              :(row.every(ro => (ro.KilogramosEmbarcados === 0 && ro.EsPesajeParcial ===1))) ? (() =>{ setpoppesaje(true)}) : () => {
                setmodaledit(true);
              }
              }
            >
              <EditIcon style={{ color: ro.EsPesajeParcial===1  ? 'grey':'#ff6a00' , cursor: 'pointer' }} />
            </div>
          </TableCell>
          {/* Pop up para editar un material */} 
          <Modal
            isOpen={modaledit}
            onClose={() => modaledit(true)}
            ariaHideApp={false}
            style={customStyles}
          >
            <MaterialesXCargar
              setSavemat={setSavemat}
              BoxPlanCarga={BoxPlanCarga}
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
          </Modal>
        </TableRow>
      </>
    );
  }


    // Función que corre servicios antes del render cada que haya un cambio de material y cada que se cierra un wizard
  // Servicio JSON 3 --> SP= AmpSch.AmpClaConsultaVehiculoMaterialClasificacionSel <Consultar Materiales Clasificados>
  useEffect(() => {
    if (placadato &&  Todos !==1 && PlanCarga){
      const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
  
      /* eslint-disable */
  
        const data68={
          parameters:
          '{"ClaUbicacion":' +
          editBoxValue +
          ',"ClaServicioJson":' +
          68 +
          ',"Parametros":"@pnClaUbicacion=' +
          editBoxValue +
          ',@psPlanCarga=' +
          (PlanCarga ===null ? 0: PlanCarga ) +
          ',@pnClaTransporte='+
          placadato[0].ClaTransporte +
          ',@pnClaTransportista='+
          placadato[0].ClaTransportista +'"}',
        tipoEstructura: 0,
        }
  
        
  
      async function SelectPlanCarga(){
        await callApi(urlKrakenService, 'POST', data68, (res) => {
          setBoxPlanCarga(res.Result0.length===1 ? res.Result0[0].ClaPlanCarga : '')
        });
      }
  
  
      /* eslint-enable */
      if ( NomMotivoEntrada>0 && NomMotivoEntrada===1 && BoxPlanCarga===null ) {
      SelectPlanCarga();
      }
    }
  }, [])


  
  
  useEffect(() => {
    let isCancelled = false;
    const timeout = setTimeout(() => {
      const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
      /* eslint-disable */

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
          ',@pnIdPlanCarga='+
          (PlanCarga ===null ? 0: PlanCarga ) +'"}',
        tipoEstructura: 0,
      };
      /* eslint-enable */

       if (!isCancelled  && NomMotivoEntrada>0 && NomMotivoEntrada===1 && placadato && ((EsValido !==null && EsValido=== 1)||(Savemat===1)) && row===null) {
        callApi(urlKrakenService, 'POST', data63, (res) => {
          setrow(res.Result0);
        });
        seteditOpen(true);
        setSavemat(0)
      }
      return()=> {
        isCancelled = true
      }
    }, 1600);
  }, [Actualizar, EsValido]);


   // Función que corre servicios antes del render cada que haya un material, solo si el porcentaje total es 100% o si se maneja por cantidad
  // Servicio JSON 13 --> SP=BasSch.BasValidacionClasEntCompraMatPrimaProc <Valida clasificación>
  useEffect(() => {
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    if ((row && row.length>0) || (ValidaCargo===1)) {
      const PorcentajeSum =row &&  row.reduce((acc, val) => acc + val.Porcentaje, 0);
      const CantidadSum=row && row.reduce((acc, val) => acc + val.CantEmbarcada, 0);

      if ((PorcentajeSum !== null && PorcentajeSum === 100) || (PorcentajeSum === 0 && CantidadSum>0) || (ValidaCargo===1 && row && row.length>0 && (row[0].CantEmbarcada !==null || row[0].KilogramosEmbarcados!==null || row[0].Porcentaje!==null))) {
        /* eslint-disable */
        const data66 = {
          parameters:
            '{"ClaUbicacion":' +
            editBoxValue +
            ',"ClaServicioJson":66,"Parametros":"@pnClaUbicacion=' +
            editBoxValue +
            ',@pnIdBoleta=' +
            placadato[0].IdBoleta +
            ',@pnClaPlanCarga='+
            (placadato[0].ClaPlanCarga !== null ? placadato[0].ClaPlanCarga : BoxPlanCarga)+
            ',@psClaVehiculoPorClasificar=' +
            placadato[0].Placas +
            ',@psPlacas='+
            placadato[0].Placas+
            ',@pnEsNoCargoDescargoMaterial='+
            placadato[0].EsNoCargoDescargoMaterial +
            ',@pnPesoAtrilesTarimas=' +
            (placadato[0].PesoAtrilesTarimas !== null ? placadato[0].PesoAtrilesTarimas : 0) +
            ',@pnClaUsuarioMod=' +
            NumbUsuario +
            ',@psNombrePcMod=' +
            ipadress +
            ',@pnIdMensaje=,@psMensaje="}',
          tipoEstructura: 0,
        };

        /* eslint-enable */
        callApi(urlKrakenService, 'POST', data66, (res) => {
          // console.log(res);
        });
      }
    }
    setValidaCargo(0)
    if(Nocargo===1){
    setNocargo(0)
    }
  }, [row]);

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
                <List ro={ro} key={index} editOpen={editOpen} seteditOpen={seteditOpen} BoxPlanCarga={BoxPlanCarga} />
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
