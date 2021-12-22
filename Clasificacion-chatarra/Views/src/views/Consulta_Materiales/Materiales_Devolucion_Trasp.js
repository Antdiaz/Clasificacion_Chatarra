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
import ClasificarDev from './Clasificar_Material_Devolucion';
// Wizard editar material

function MaterialesDevolucion({
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
  

  function List({ ro, index, editOpen, seteditOpen}) {
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
        <TableRow key={index}>
          <TableCell
            className="table-content"
            component="th"
            scope="row"
            style={{ textAlign: 'center', fontWeight: '600' }}
          >
            
          </TableCell>
          <TableCell className="table-content">
            {ro.NomArticulo ? ro.NomArticulo.split('-').pop(): 0}{' '}
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center', fontWeight: '600' }}>
            {ro.PorcentajeRecibido ? ro.PorcentajeRecibido : ro.EsPesajeParcial ? 100 : ro.CantidadRecibida===null && ro.KilosRecibidos===null ? 0 : 'NA'}&nbsp;%
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center' }}>
            Devuelta:&nbsp;{ro.CantidadDevuelta ? ro.CantidadDevuelta.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}&nbsp;{ro.NomUnidad ? ro.NomUnidad: ''} 
            <br /> {ro.PorcentajeRecibido===null || ro.PorcentajeRecibido===0 ? 'Recibida:':''}&nbsp;{ro.PorcentajeRecibido===null || ro.PorcentajeRecibido===0 ? ro.CantidadRecibida ? ro.CantidadRecibida.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0 :''}
            &nbsp; {ro.PorcentajeRecibido===null || ro.PorcentajeRecibido===0 ? ro.NomUnidad ? ro.NomUnidad: '' : ''}
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center' }}> 
            Devueltos:&nbsp;{ro.KilosDevueltos ? ro.KilosDevueltos.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}&nbsp; Kg <br />{' '}
            {ro.PorcentajeRecibido===null || ro.PorcentajeRecibido===0 ? 'Recibidos:':''}&nbsp;{ro.PorcentajeRecibido===null || ro.PorcentajeRecibido===0 ? ro.KilogramosEmbarcados ? ro.KilogramosEmbarcados.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0:''}&nbsp;{ro.PorcentajeRecibido===null || ro.PorcentajeRecibido===0 ? 'Kg':''}
          </TableCell>
          <TableCell className="table-content" style={{ textAlign: 'center'}}>
            Sub-Almacen:&nbsp;{ro.ClaSubAlmacenCompra ? ro.ClaSubAlmacenCompra : ''}
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
            <ClasificarDev
              id={id}
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




  
  
  useEffect(() => {
    let isCancelled = false;

      const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
      /* eslint-disable */

      const data71 = {
        parameters:
          '{"ClaUbicacion":' +
          editBoxValue +
          ',"ClaServicioJson":' +
          71 +
          ',"Parametros":"@pnClaUbicacion=' +
          editBoxValue +
          ''+config.Separador+'@pnIdBoleta=' +
          id +'"}',
        tipoEstructura: 0,
      };
      /* eslint-enable */

      const timeout = setTimeout(() => {
       if (!isCancelled && NomMotivoEntrada===110 && placadato) {
        callApi(urlKrakenService, 'POST', data71, (res) => {
          setrow(res.Result0);
        });
        seteditOpen(true);
        setSavemat(0)
      }
      return()=> {
        isCancelled = true
      }
    }, 500);

  }, [Actualizar]);


  //  Función que corre servicios antes del render cada que haya un material, solo si el porcentaje total es 100% o si se maneja por cantidad
  // Servicio JSON 13 --> SP=BasSch.BasValidacionClasEntCompraMatPrimaProc <Valida clasificación>
  useEffect(() => {
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    if (((row && row.length>0) || (ValidaCargo===1)) && NomMotivoEntrada===110) {
      const PorcentajeSum =row &&  row.reduce((acc, val) => acc + val.PorcentajeRecibido, 0);
      const CantidadSum=row && row.reduce((acc, val) => acc + val.CantidadRecibida, 0);
      const KilosSum=row && row.reduce((acc, val) => acc + val.KilosRecibidos, 0);
      if ((PorcentajeSum !== null && PorcentajeSum === 100) || (PorcentajeSum === 0 && (CantidadSum>0 || KilosSum>0)) || (ValidaCargo===1 && row && row.length>0 && (row[0].CantidadRecibida !==null || row[0].KilosRecibidos!==null || row[0].PorcentajeRecibido!==null))) {
        /* eslint-disable */
        const data74 = {
          parameters:
            '{"ClaUbicacion":' +
            editBoxValue +
            ',"ClaServicioJson":74,"Parametros":"@pnClaUbicacion=' +
            editBoxValue +
            ''+config.Separador+'@pnIdBoleta=' +
            placadato[0].IdBoleta +
            ''+config.Separador+'@pnEsNoCargoDescargoMaterial='+
            placadato[0].EsNoCargoDescargoMaterial +
           ''+config.Separador+'@pnClaUsuarioMod=' +
            NumbUsuario +
            ''+config.Separador+'@psNombrePcMod=' +
            ipadress +
            '"}',
          tipoEstructura: 0,
        };
        /* eslint-enable */
        callApi(urlKrakenService, 'POST', data74, (res) => {
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
              <TableCell className="table-header"></TableCell>
              <TableCell className="table-header">Material</TableCell>
              <TableCell
                className="table-header"
              >
                Porcentaje
              </TableCell>
              <TableCell className="table-header">Cantidad</TableCell>
              <TableCell className="table-header">Kilos</TableCell>
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

   // Componente visual final
  return (
    <div>
      <Clasificacion />
    </div>
  );
}

export default MaterialesDevolucion;
