import React, { useState, useEffect } from 'react';
import { config } from '../../utils/config';
import { callApi,getSessionItem} from '../../utils/utils';
import { Card, CardText, CardHeader, CardBody, CardTitle, Button, Row, Col,Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { useParams } from 'react-router';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from 'react-modal';
// Wizard nuevo material
import NuevoMaterial from './Clasificar_Nuevo_Material';
import NuevoMaterialpt from './Clasificar_Nuevo_Material_pt';
// Mensaje pesaje parcial
import PesajeParcial from './PesajeParcial';
// Listado Clasificación material
import Materiales from './Materiales';
import MaterialesXCargar from './Materiales_CamionXCargar'
// Detalle de Boleta
import DetalleBoleta from './Detalle_Boleta';
// Imagenes placa,material, etc
import Imagenes from './Imagenes'
import Imagenespt from './Imagenes_pt'
import Preregistro from './Pre-registro_Mensaje';
import CargoNodescargo from './Cargo/NoDescargo/Cargo_Nodescargo';
import MaterialesDevolucion from './Materiales_Devolucion_Trasp';
import Observaciones from './Cargo/NoDescargo/Observaciones';


function Boleta({
  editBoxValue,
  TipoPatio,
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
  kiloscont,
  setkiloscont,
  pesajeparcial,
  setpesajeparcial,
  poppesaje,
  setpoppesaje,
  warning,
  setwarning,
  NomMotivoEntrada,
  setNomMotivoEntrada,
  ClaUbicacionOrigen,
  ClaViajeOrigen,
  ClaFabricacionViaje,
  setClaFabricacionViaje,
  Materialviaje,
  setMaterialviaje,
  Actualizar,
  setActualizar,
  placadato,
  setplacadato,
  TipoTraspaso,
  setTipoTraspaso
}) {
   // Valores obtenidos de URL de detalle de boleta
  const { placa, id } = useParams();
  // Valor que lee cuando se abre wizard de agregar Material
  const [modaladdOpen, setmodaladdOpen] = useState(false);
  const [Prereg, setPrereg] = useState(false)
  // Listado de servicio de Razón de Contaminación
  const [contaminacion, setcontaminacion] = useState();
  // Valor que lee cuando se abre wizard de editar Material
  const [editOpen, seteditOpen] = useState(false);
  const [idmaterialviaje, setidmaterialviaje] = useState(0);
  const [PlanCarga, setPlanCarga] = useState(null);
  const [cambioGuardar, setcambioGuardar] = useState(0)
  const [BoxPlanCarga,setBoxPlanCarga] = useState(null);
  const [EsValido, setEsValido] = useState(null);
  const [Todos, setTodos] = useState(0);
  const [TodosChange, setTodosChange] = useState(0);
  const [ValidaCargo, setValidaCargo] = useState(0);
  const [Nocargo, setNocargo] = useState(0);
  const [Savemat, setSavemat] = useState(0);
  const [ValidaTara, setValidaTara] = useState(0);
  const [Observacionesno, setObservacionesno] = useState('');
  const [cambionodesc, setcambionodesc] = useState(0);
  const ipadress = getSessionItem('Ipaddress');
  const NumbUsuario = getSessionItem('NumUsuario');
  const Token = getSessionItem('Token');
  const [enter, setenter] = useState(false)
 // Estilo de pop up/ wizard
  const customStyles = {
    content: {
      background: 'rgba(128, 128, 128, 0.212)',
      top: '0%',
      right: '-.5%',
      bottom: '0%',
    },
  };


  useEffect(() => {
    if(placadato && TodosChange===0){
      setTodos(placadato[0].EsNoCargoDescargoMaterial)
    }
    setmaterialpt('')
  }, [placadato])


  const handleCarga = (event) => {
    setPlanCarga(event.target.value);
  };

  const handlePlan = (event) => {
    if (placadato && event.charCode === 13 && Todos !==1){
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
      setenter(true)
    /* eslint-disable */

      const data68={
        parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"ClaServicioJson":' +
        68 +
        ',"Parametros":"@pnClaUbicacion=' +
        editBoxValue +
        ''+config.Separador+'@psPlanCarga=' +
        (PlanCarga ===null ? 0: PlanCarga ) +
        ''+config.Separador+'@pnClaTransporte='+
        placadato[0].ClaTransporte +
        ''+config.Separador+'@pnClaTransportista='+
        placadato[0].ClaTransportista +'"}',
      tipoEstructura: 0,
      }

      
    async function SelectPlanCarga(){
      await callApi(urlKrakenService, 'POST', data68, (res) => {
        setBoxPlanCarga(res.Result0.length===1 ? res.Result0[0].ClaPlanCarga : '')
      });
    }


    /* eslint-enable */
    if ( NomMotivoEntrada>0 && NomMotivoEntrada===1) {
    SelectPlanCarga();
    }
  }
  }


  useEffect(() => {

    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;

    /* eslint-disable */

    const data69={
      parameters:
      '{"ClaUbicacion":' +
      editBoxValue +
      ',"ClaServicioJson":' +
      69 +
      ',"Parametros":"@pnClaUbicacion=' +
      editBoxValue +
      ''+config.Separador+'@psClaVehiculoPorClasificar=' +
      placa +
      ''+config.Separador+'@pnIdBoleta='+
      id +
      ''+config.Separador+'@pnIdPlanCarga=' +
      (PlanCarga ===null ? 0: PlanCarga )+
      ''+config.Separador+'@pnClaPlanCarga=' + 
      (BoxPlanCarga ===null || BoxPlanCarga ==='' ? PlanCarga : BoxPlanCarga)+
      ''+config.Separador+'@pnEsTraspaso=1"}',
    tipoEstructura: 0,
    }

  /* eslint-enable */
    if(PlanCarga!==null && (PlanCarga!=='' && (Actualizar || enter===true))){
      console.log(data69)
    callApi(urlKrakenService, 'POST', data69, (res) => {
      setEsValido(res.Result0[0].EsPCValida);
     if(res.Result0[0].EsPCValida !==1 && res.Result0[0].Observaciones !== '' && res.Result0[0].Observaciones !== null) { 
        swal('Error', (`${res.Result0[0].Observaciones}`), 'error', {
          buttons: {
            confirm: {
              text: 'Aceptar',
              className: 'animation-on-hover btn btn-success',
            },
          },
        });
      }
      });
  }
  }, [BoxPlanCarga,Actualizar])

  const Refresh =() =>{
    setrow('')
    setActualizar(true);
    setTimeout(() => {
      setActualizar(false);
    }, 50);
  }

  useEffect(() => {
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
      ''+config.Separador+'@pnIdBoleta=' +
      id +
      ''+config.Separador+'@pnIdPlanCarga='+
      (PlanCarga ===null ? 0: PlanCarga ) +'"}',
    tipoEstructura: 0,
  };
  /* eslint-enable */
    if(EsValido !==null && EsValido=== 1 && (row==='' || row===0 || row===null)){
      const PorcentajeSum = row && row.reduce((acc, val) => acc + val.Porcentaje, 0);
      const CantidadSum=row &&  row.reduce((acc, val) => acc + val.CantEmbarcada, 0)
      const KilosSum=row && row.reduce((acc, val) => acc + val.KilogramosEmbarcados, 0);
    callApi(urlKrakenService, 'POST', data63, (res) => {
    setrow(res.Result0);
     /* eslint-disable */
     const urlKrakenBloque = `${config.KrakenService}/${24}/${config.Bloque}`;
     const data64 = [ `@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@psPlacas='${placadato[0].Placas}'${config.Separador}@pnIdPlanCarga=${PlanCarga}${config.Separador}@psObservaciones='${(Observacionesno ? Observacionesno.replace('#', '%23'): '')}'${config.Separador}@pnEsRevisionEfectuada=${placadato[0].EsRevisionEfectuada}${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@psOrigen='WEB'`];

     const data66 =
     [`@pnClaUbicacion=${editBoxValue}${config.Separador}@pnIdBoleta=${placadato[0].IdBoleta}${config.Separador}@pnClaPlanCarga=${PlanCarga}${config.Separador}@psClaVehiculoPorClasificar='${placadato[0].Placas}'${config.Separador}@psPlacas='${placadato[0].Placas}'${config.Separador}@pnEsNoCargoDescargoMaterial=0${config.Separador}@pnPesoAtrilesTarimas=${(placadato[0].PesoAtrilesTarimas !== null ? placadato[0].PesoAtrilesTarimas : 0)}${config.Separador}@psNombrePcMod='${ipadress}'${config.Separador}@pnClaUsuarioMod=${NumbUsuario}`]
   
     
    const data85 ={ parameters: `{"ClaUbicacion":${editBoxValue},"Token":"${Token}","ClaServicioJson":"85","IdBoleta":"${placadato[0].IdBoleta}","EnBloque":"${1}","Encabezado":"${data64}","Detalle":"","Validacion":"${(PorcentajeSum !== null && (PorcentajeSum === 100)) || (row && row.some(ro => ro.EsPesajeParcial) && (PorcentajeSum === 100 || PorcentajeSum > 100)) || (PorcentajeSum === 0 && (CantidadSum>0 || KilosSum>0)) || (ValidaCargo===1 && row && row.length>0 && (row.some(ro => ro.CantEmbarcada !==null)|| row.some(ro => ro.KilogramosEmbarcados!==null) || row.some(ro => ro.Porcentaje!==null))) || Todos===1 ? data66 : ''}"}`,
    tipoEstructura: 0}
 
    // /* eslint-enable */
    if(enter===true && EsValido !==null && EsValido=== 1 && (row==='' || row===0 || row===null)){
    callApi(urlKrakenBloque, 'POST', data85, (res) => {
      setenter(false)
     });
    }
    });
  }

  else if(EsValido !==null && EsValido=== 0){
    setrow('');
  }

  setEsValido(null)
  }, [EsValido,BoxPlanCarga])

  const handleReg = () =>{
    setPrereg(true);
    setTimeout(() =>{
setPrereg(false)
    }, 1500);
  }

  useEffect(() => {
    let isCancelled = false;
    // Servicio JSON 2 --> SP= AmpSch.AmpClaConsultaVehiculoAClasificarSel <Consultar datos placa>
    const urlKrakenVal = `${config.KrakenService}/${24}/${config.Servicio}`;

    /* eslint-disable */
    const data2 = {
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"ClaServicioJson":' +
        2 +
        ',"Parametros":"@pnClaUbicacion=' +
        editBoxValue +
        ''+config.Separador+'@psClaVehiculoPorClasificar=' +
        placa +
        '"}',
      tipoEstructura: 0,
    };

    const data67 = {
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"ClaServicioJson":' +
        67 +
        ',"Parametros":"@pnClaUbicacion=' +
        editBoxValue +
        ''+config.Separador+'@pnIdBoleta=' +
        id +
        '"}',
      tipoEstructura: 0,
    };

    /* eslint-enable */

    async function FuncionData(){
    if(cambionodesc===0 && cambioGuardar===0){
     await callApi(urlKrakenVal, 'POST', data2, (res) => {
        setplacadato(res.Result0);
        setObservacionesno(res.Result0[0].Observaciones)
      })
    }
      await setcambionodesc(0)
      await setcambioGuardar(0)
    };

    async function FuncionCarga(){
      await callApi(urlKrakenVal, 'POST', data67, (res) => {
         setplacadato(res.Result0);
         setcambionodesc(0)
         setObservacionesno(res.Result0[0].Observaciones)
       })
 
     };

    if((NomMotivoEntrada===3 || NomMotivoEntrada===9 || NomMotivoEntrada===110)){
      FuncionData()
    }

    else if(NomMotivoEntrada===1 ){
      FuncionCarga()
    }


     return()=> {
        isCancelled = true
      }
  }, [Actualizar]);



  useEffect(() => {
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    if(placadato && placadato[0].ClaPlanCarga && PlanCarga===null){
      setPlanCarga(placadato[0].ClaPlanCarga);

    /* eslint-disable */  
    const data69={
      parameters:
      '{"ClaUbicacion":' +
      editBoxValue +
      ',"ClaServicioJson":' +
      69 +
      ',"Parametros":"@pnClaUbicacion=' +
      editBoxValue +
      ''+config.Separador+'@psClaVehiculoPorClasificar=' +
      placa +
      ''+config.Separador+'@pnIdBoleta='+
      id +
      ''+config.Separador+'@pnIdPlanCarga=' +
      (placadato[0].ClaPlanCarga)+
      ''+config.Separador+'@pnClaPlanCarga=' + 
      (placadato[0].ClaPlanCarga)+
      ''+config.Separador+'@pnEsTraspaso=1"}',
    tipoEstructura: 0,
    }
    /* eslint-enable */
    if(placadato[0].ClaPlanCarga!==null && placadato[0].ClaPlanCarga!=='' && (row==='' || row===0 || row===null)){
      console.log('hola',data69)
    callApi(urlKrakenService, 'POST', data69, (res) => {
      setEsValido(res.Result0[0].EsPCValida);
      });
  }
    }
  }, [placadato])

  useEffect(() => {

    const urlKrakenVal = `${config.KrakenService}/${24}/${config.Servicio}`;
      // Servicio JSON 10 --> SP= AmpSch.AmpClaMotivoContaminacionCmb <Consultar motivo Contaminacion>
    /* eslint-disable */
    const data10 = {
      parameters:
        '{"ClaUbicacion":' +
        editBoxValue +
        ',"ClaServicioJson":' +
        10 +
        ',"Parametros":"@pnClaUbicacion=' +
        editBoxValue +
        '"}',
      tipoEstructura: 0,
    };
    /* eslint-enable */

    if(NomMotivoEntrada===9 || (NomMotivoEntrada===3 && TipoTraspaso===0)){
    callApi(urlKrakenVal, 'POST', data10, (res) => {
      setcontaminacion(res.Result0);
    })
  }
  }, [])

  return (
    <>
      <div className="content" style={{ marginTop: '20px' }}>

        {/* Pop up mensaje si material es pesaje parcial */} 
        {row && placadato && poppesaje && (pesajeparcial===1 || (row.every(ro => ro.EsPesajeParcial===1))) && (row.some(ro => (ro.KilosMaterial === 0 || ro.KilosMaterial === null))|| row.some(ro => (ro.PesoRecibido === 0 || ro.PesoRecibido === null)) || (row.some(ro => (ro.KilogramosEmbarcados === 0 || ro.KilogramosEmbarcados === null))))? (
          <PesajeParcial
            placadato={placadato}
            editBoxValue={editBoxValue}
            TipoPatio={TipoPatio}
            row={row}
            setrow={setrow}
            poppesaje={poppesaje}
            setpoppesaje={setpoppesaje}
            setpesajeparcial={setpesajeparcial}
            pesajeparcial={pesajeparcial}
            Actualizar={Actualizar}
            setActualizar={setActualizar}
            NomMotivoEntrada={NomMotivoEntrada}
          />
        ) : null}

        {/* Sección Imagenes */} 
        {NomMotivoEntrada=== 9 || NomMotivoEntrada=== 1?
        (<Imagenes id={id} editBoxValue={editBoxValue} row={row} NomMotivoEntrada={NomMotivoEntrada} />) :
        (<Imagenespt id={id} editBoxValue={editBoxValue} row={row} NomMotivoEntrada={NomMotivoEntrada} />)}
        {/* Pop up para clasificar un nuevo material */} 
        <Row>
          <Col>
            <Card>
              <Modal
                isOpen={modaladdOpen}
                onClose={() => setmodaladdOpen(true)}
                ariaHideApp={false}
                style={customStyles}

              >
                {(NomMotivoEntrada===9 || (NomMotivoEntrada===3 && TipoTraspaso===0) && placadato) ?
                  (
                    <NuevoMaterial
                      Materialviaje={Materialviaje}
                      material={material}
                      materialtodos={materialtodos}
                      materialpt={materialpt}
                      modaladdOpen={modaladdOpen}
                      setmodaladdOpen={setmodaladdOpen}
                      pesajeparcial={pesajeparcial}
                      setpesajeparcial={setpesajeparcial}
                      editBoxValue={editBoxValue}
                      TipoPatio={TipoPatio}
                      placadato={placadato}
                      setplacadato={setplacadato}
                      setpoppesaje={setpoppesaje}
                      contaminacion={contaminacion}
                      row={row}
                      setrow={setrow}
                      NomMotivoEntrada={NomMotivoEntrada}
                      ClaViajeOrigen={ClaViajeOrigen}
                      ClaUbicacionOrigen={ClaUbicacionOrigen}
                      idmaterialviaje={idmaterialviaje}
                      setidmaterialviaje={setidmaterialviaje}
                      Actualizar={Actualizar}
                      setActualizar={setActualizar}
                      cambioGuardar={cambioGuardar} 
                      setcambioGuardar={setcambioGuardar}
                      ValidaCargo={ValidaCargo}
                    />
                  ): ((NomMotivoEntrada===3 && TipoTraspaso===1) && placadato) &&
                  (
                    <NuevoMaterialpt
                      Materialviaje={Materialviaje}
                      material={material}
                      materialtodos={materialtodos}
                      materialpt={materialpt}
                      modaladdOpen={modaladdOpen}
                      setmodaladdOpen={setmodaladdOpen}
                      pesajeparcial={pesajeparcial}
                      setpesajeparcial={setpesajeparcial}
                      editBoxValue={editBoxValue}
                      TipoPatio={TipoPatio}
                      placadato={placadato}
                      setplacadato={setplacadato}
                      setpoppesaje={setpoppesaje}
                      contaminacion={contaminacion}
                      row={row}
                      setrow={setrow}
                      NomMotivoEntrada={NomMotivoEntrada}
                      ClaViajeOrigen={ClaViajeOrigen}
                      ClaUbicacionOrigen={ClaUbicacionOrigen}
                      idmaterialviaje={idmaterialviaje}
                      setidmaterialviaje={setidmaterialviaje}
                      Actualizar={Actualizar}
                      setActualizar={setActualizar}
                      setmaterialpt={setmaterialpt}
                      cambioGuardar={cambioGuardar} 
                      setcambioGuardar={setcambioGuardar}
                    />
                  )}
              </Modal>
              <CardHeader>
                <CardTitle className="Titulo_boleta" style={{ margin: '10px' }}>
                  {(NomMotivoEntrada !==1 && NomMotivoEntrada !==110) && (
                  <i
                    // onClick={handleReg}
                    onClick={row && (placadato[0].EsPesajeParcial!== undefined || placadato[0].EsPesajeParcial!== null) && placadato[0].EsPesajeParcial ===1  && ((NomMotivoEntrada ===9 && (row.every(ro => ro.KilosMaterial === 0) || row.some(ro => ro.KilosMaterial===0) && pesajeparcial===1))||(NomMotivoEntrada ===3 && (row.every(ro => ro.PesoRecibido === 0) || row.some(ro => ro.PesoRecibido===0) && pesajeparcial===1))) ? (()=> setpoppesaje(true)) : row && row.length>0 && row.some(ro=> ro.ClaArticuloPreReg)  && (row.every(ro => (NomMotivoEntrada===9 ? !ro.ClaArticuloCompra: NomMotivoEntrada===3 && !ro.ClaMaterialRecibeTraspaso)))? handleReg  : (() => row && setmodaladdOpen(true))}
                    style={{ cursor: 'pointer' }}
                    className="fa fa-plus"
                    aria-hidden="true"
                  >  
                  </i>
                  )}
                  {Prereg===true && <Preregistro />}
                  <span style={{ marginLeft: '3vw' }}>Clasificar Material</span>
                  <span style={{ marginLeft: '3vw' }}>Placa:&nbsp;{placa}</span>
                  <span style={{ marginLeft: '3vw' }}>Boleta:&nbsp;{id}</span>
                  {NomMotivoEntrada===1 && placadato &&(<><span style={{marginLeft: '3vw'}}>Plan de carga</span><Input className="plan-carga" onKeyPress={handlePlan} value={PlanCarga} type="number" onChange={handleCarga} style={{display:'inline-flex',marginLeft:'10px'}} /></>)}
                  {placadato ? (<i className="fas fa-redo" onClick={Refresh} style={{ marginLeft: '3vw',cursor: 'pointer'}} aria-hidden="true"></i>) :null}
                  {/* {(NomMotivoEntrada===9 && row && row.some(roc=>(roc.NomZonaDescarga !==null || roc.NomZonaDescarga !==""))) ? (<span style={{ marginLeft: '3vw' }}>Zonas:{row.filter(rol=>rol.NomZonaDescarga).map((rox,index)=>{return <span>&nbsp;{rox.NomZonaDescarga.substring(rox.NomZonaDescarga.indexOf(" ") + 1)}&nbsp;{index !== (row.length-1) && (<span>&#8594;</span>)}</span>})}</span>):null} */}
                  {placadato && placadato.length>0 && (<CargoNodescargo pesajeparcial={pesajeparcial} row={row} ClaUbicacionOrigen={ClaUbicacionOrigen} cambionodesc={cambionodesc} setcambionodesc={setcambionodesc} setrow={setrow} setBoxPlanCarga={setBoxPlanCarga} placadato={placadato} setplacadato={setplacadato} setActualizar={setActualizar} NomMotivoEntrada={NomMotivoEntrada} editBoxValue={editBoxValue} Todos={Todos} setTodos={setTodos} TodosChange={TodosChange} setTodosChange={setTodosChange} setValidaCargo={setValidaCargo} Nocargo={Nocargo} setNocargo={setNocargo} setPlanCarga={setPlanCarga} />)}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row className="detalle-materiales">
                  <Col md={{ size: 12, offset: 0 }}>
                    <TableContainer component={Paper}>

                      {/* Sección de Clasificación de materiales */} 

                      {(!placadato || Actualizar=== true) ? (
                        <div style={{ textAlign: 'center', paddingTop: '40px' }}>
                          <CircularProgress />
                        </div>
                      ) :NomMotivoEntrada===9 || NomMotivoEntrada===3 ? (
                        <Materiales
                          Nocargo={Nocargo}
                          setNocargo={setNocargo}
                          ValidaCargo={ValidaCargo}
                          setValidaCargo={setValidaCargo}
                          TipoTraspaso={TipoTraspaso}
                          setTipoTraspaso={setTipoTraspaso}
                          editOpen={editOpen}
                          seteditOpen={seteditOpen}
                          contaminacion={contaminacion}
                          placadato={placadato}
                          editBoxValue={editBoxValue}
                          TipoPatio={TipoPatio}
                          id={id}
                          row={row}
                          setrow={setrow}
                          material={material}
                          setmaterial={setmaterial}
                          materialtodos={materialtodos}
                          setmaterialtodos={setmaterialtodos}
                          materialpt={materialpt}
                          setmaterialpt={setmaterialpt}
                          setmaterialr={setmaterialr}
                          setcantidadr={setcantidadr}
                          setkilosr={setkilosr}
                          setobservaciones={setobservaciones}
                          kiloscont={kiloscont}
                          setkiloscont={setkiloscont}
                          pesajeparcial={pesajeparcial}
                          setpesajeparcial={setpesajeparcial}
                          poppesaje={poppesaje}
                          setpoppesaje={setpoppesaje}
                          warning={warning}
                          setwarning={setwarning}
                          modaladdOpen={modaladdOpen}
                          NomMotivoEntrada={NomMotivoEntrada}
                          setNomMotivoEntrada={setNomMotivoEntrada}
                          ClaUbicacionOrigen={ClaUbicacionOrigen}
                          ClaViajeOrigen={ClaViajeOrigen}
                          Materialviaje={Materialviaje}
                          ClaFabricacionViaje={ClaFabricacionViaje}
                          setClaFabricacionViaje={setClaFabricacionViaje}
                          idmaterialviaje={idmaterialviaje}
                          Actualizar={Actualizar}
                          setActualizar={setActualizar}
                          Todos={Todos} 
                          setTodos={setTodos} 
                          TodosChange={TodosChange} 
                          setTodosChange={setTodosChange}
                          cambioGuardar={cambioGuardar} 
                          setcambioGuardar={setcambioGuardar}
                        />
                      ): NomMotivoEntrada===110 ? 
                      (
                        <MaterialesDevolucion 
                          Savemat={Savemat}
                          setSavemat={setSavemat}
                          EsValido={EsValido}
                          placa={placa}
                          setEsValido={setEsValido}
                          Nocargo={Nocargo}
                          setNocargo={setNocargo}
                          ValidaCargo={ValidaCargo}
                          setValidaCargo={setValidaCargo}
                          setBoxPlanCarga={setBoxPlanCarga}
                          BoxPlanCarga={BoxPlanCarga}
                          PlanCarga={PlanCarga}
                          editOpen={editOpen}
                          seteditOpen={seteditOpen}
                          contaminacion={contaminacion}
                          placadato={placadato}
                          editBoxValue={editBoxValue}
                          TipoPatio={TipoPatio}
                          id={id}
                          row={row}
                          setrow={setrow}
                          material={material}
                          setmaterial={setmaterial}
                          materialtodos={materialtodos}
                          setmaterialtodos={setmaterialtodos}
                          materialpt={materialpt}
                          setmaterialpt={setmaterialpt}
                          setmaterialr={setmaterialr}
                          setcantidadr={setcantidadr}
                          setkilosr={setkilosr}
                          setobservaciones={setobservaciones}
                          kiloscont={kiloscont}
                          setkiloscont={setkiloscont}
                          pesajeparcial={pesajeparcial}
                          setpesajeparcial={setpesajeparcial}
                          poppesaje={poppesaje}
                          setpoppesaje={setpoppesaje}
                          warning={warning}
                          setwarning={setwarning}
                          modaladdOpen={modaladdOpen}
                          NomMotivoEntrada={NomMotivoEntrada}
                          setNomMotivoEntrada={setNomMotivoEntrada}
                          ClaUbicacionOrigen={ClaUbicacionOrigen}
                          ClaViajeOrigen={ClaViajeOrigen}
                          Materialviaje={Materialviaje}
                          ClaFabricacionViaje={ClaFabricacionViaje}
                          setClaFabricacionViaje={setClaFabricacionViaje}
                          idmaterialviaje={idmaterialviaje}
                          Actualizar={Actualizar}
                          setActualizar={setActualizar}
                          TipoTraspaso={TipoTraspaso}
                          Todos={Todos} 
                          setTodos={setTodos} 
                          TodosChange={TodosChange} 
                          setTodosChange={setTodosChange}
                        />

                      ):(
                        <MaterialesXCargar
                          Savemat={Savemat}
                          setSavemat={setSavemat}
                          EsValido={EsValido}
                          placa={placa}
                          setEsValido={setEsValido}
                          Nocargo={Nocargo}
                          setNocargo={setNocargo}
                          ValidaCargo={ValidaCargo}
                          setValidaCargo={setValidaCargo}
                          setBoxPlanCarga={setBoxPlanCarga}
                          BoxPlanCarga={BoxPlanCarga}
                          PlanCarga={PlanCarga}
                          editOpen={editOpen}
                          seteditOpen={seteditOpen}
                          contaminacion={contaminacion}
                          placadato={placadato}
                          editBoxValue={editBoxValue}
                          TipoPatio={TipoPatio}
                          id={id}
                          row={row}
                          setrow={setrow}
                          material={material}
                          setmaterial={setmaterial}
                          materialtodos={materialtodos}
                          setmaterialtodos={setmaterialtodos}
                          materialpt={materialpt}
                          setmaterialpt={setmaterialpt}
                          setmaterialr={setmaterialr}
                          setcantidadr={setcantidadr}
                          setkilosr={setkilosr}
                          setobservaciones={setobservaciones}
                          kiloscont={kiloscont}
                          setkiloscont={setkiloscont}
                          pesajeparcial={pesajeparcial}
                          setpesajeparcial={setpesajeparcial}
                          poppesaje={poppesaje}
                          setpoppesaje={setpoppesaje}
                          warning={warning}
                          setwarning={setwarning}
                          modaladdOpen={modaladdOpen}
                          NomMotivoEntrada={NomMotivoEntrada}
                          setNomMotivoEntrada={setNomMotivoEntrada}
                          ClaUbicacionOrigen={ClaUbicacionOrigen}
                          ClaViajeOrigen={ClaViajeOrigen}
                          Materialviaje={Materialviaje}
                          ClaFabricacionViaje={ClaFabricacionViaje}
                          setClaFabricacionViaje={setClaFabricacionViaje}
                          idmaterialviaje={idmaterialviaje}
                          Actualizar={Actualizar}
                          setActualizar={setActualizar}
                          TipoTraspaso={TipoTraspaso}
                          Todos={Todos} 
                          setTodos={setTodos} 
                          TodosChange={TodosChange} 
                          setTodosChange={setTodosChange}
                          ValidaTara={ValidaTara}
                          setValidaTara={setValidaTara}
                        />
                      )}
                    </TableContainer>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row className="detalle-observaciones" style={{width:"100%",margin:"0px"}}>
                  <Col md={{ size: 12, offset: 0 }} style={{padding:"0px"}}>
                    <TableContainer component={Paper}> 
                      {/* Sección de detalles de la boleta/placa */} 
                      <Observaciones Observacionesno={Observacionesno} row={row} setObservacionesno={setObservacionesno} placadato={placadato} setplacadato={setplacadato} setActualizar={setActualizar} NomMotivoEntrada={NomMotivoEntrada} editBoxValue={editBoxValue} Todos={Todos} />
                    </TableContainer>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle style={{ margin: '10px' }}>
                  <span>Datos de la Unidad</span>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row className="detalle-boleta" style={{width:"100%",margin:"0px"}}>
                  <Col md={{ size: 12, offset: 0 }} style={{padding:"0px"}}>

                    {/* Sección de detalles de la boleta/placa */} 

                    {!placadato || Actualizar=== true ? (
                      <div
                        style={{ textAlign: 'center', paddingTop: '40px', marginBottom: '40px' }}
                      >
                        <CircularProgress color="primary" />
                      </div>
                    ) : (
                      <DetalleBoleta placadato={placadato} Todos={Todos} listas={placadato} editBoxValue={editBoxValue} TipoPatio={TipoPatio} Materialviaje={Materialviaje} setMaterialviaje={setMaterialviaje} TipoTraspaso={TipoTraspaso} setTipoTraspaso={setTipoTraspaso} setmaterial={setmaterial} material={material} NomMotivoEntrada={NomMotivoEntrada} ClaUbicacionOrigen={ClaUbicacionOrigen} ClaViajeOrigen={ClaViajeOrigen} ClaFabricacionViaje={ClaFabricacionViaje} />
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Boleta;
