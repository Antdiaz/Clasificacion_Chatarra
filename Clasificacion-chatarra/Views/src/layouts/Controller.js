import React from 'react';
// react library for routing
import { Route, Switch} from 'react-router-dom';
// core components
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import AdminFooter from 'components/Footers/AdminFooter.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import routes from 'routes.js';
import { config } from '../utils/config';
import { callApi, getSessionItem, setSessionData } from '../utils/utils';
import Boleta from 'views/Consulta_Materiales/Boleta_Pantalla';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidenavOpen: false,
      Valores: null,
      Datos: null,
      Usuario: null,
      NumbUsuario: getSessionItem('NumUsuario'),
      Patio: null,
      editBoxValue: getSessionItem('PatioEscogido'),
      TipoPatio: getSessionItem('TipoPatio'),
      row: null,
      material: null,
      materialtodos: null,
      materialpt:null,
      materialr: 0,
      cantidadr: 0,
      kilosr: 0,
      observaciones: 'Ninguna',
      almacen: 'x',
      subalmacen: 0,
      kiloscont: 0,
      pesajeparcial:0,
      poppesaje:true,
      warning:false,
      filtropesaje:false,
      showResults:false,
      transporte:'todos',
      status:'todos',
      NomMotivoEntrada:0,
      ClaUbicacionOrigen:0,
      ClaViajeOrigen:0,
      ClaFabricacionViaje:0,
      FechaDesde: /* eslint-disable */ getSessionItem('Año') + '-05-01'/* eslint-enable */,
      FechaHasta:getSessionItem('Hoy'),
      Hoy:getSessionItem('Dia'),
      ReporteFiltrado:0,
      Materialviaje:0,
      TipoTraspaso:0,
      Reportes:0,
      Refresh:false,
      Actualizar: false,
      FiltroReporte: null,
      FiltroPlacas: null,
      placadato: null
    };
    this.timer = null;
  }

  setplacadato=(Val) => this.setState(() =>({placadato: Val}))

  setFiltroReporte=(Val) => this.setState(() =>({FiltroReporte: Val}))

  setFiltroPlacas=(Val) => this.setState(() =>({FiltroPlacas: Val}))

  setActualizar=(Val) => this.setState(() =>({Actualizar: Val}))

  setRefresh=(Val) => this.setState(() =>({Refresh: Val}))

  setReportes=(Val) => this.setState(() =>({Reportes: Val}))
  
  setFechaDesde=(Val) => this.setState(() =>({FechaDesde: Val}))

  setMaterialviaje=(Val) => this.setState(() =>({Materialviaje: Val}))

  setTipoTraspaso=(Val) => this.setState(() =>({TipoTraspaso: Val}))

  setReporteFiltrado=(Val) => this.setState(() =>({ReporteFiltrado: Val}))

  setFechaHasta=(Val) => this.setState(() =>({FechaHasta: Val}))

  setClaUbicacionOrigen=(Val) => this.setState(() =>({ClaUbicacionOrigen: Val}))

  setClaViajeOrigen=(Val) => this.setState(() =>({ClaViajeOrigen: Val}))

  setClaFabricacionViaje=(Val) => this.setState(() =>({ClaFabricacionViaje: Val}))

  setNomMotivoEntrada= (Val) => this.setState(() =>({NomMotivoEntrada: Val}))

  setwarning =(Val) => this.setState(() => ({ warning: Val}))

  setpoppesaje = (Val) => this.setState(() => ({ poppesaje: Val}))

  setpesajeparcial = (Val) => this.setState(() => ({ pesajeparcial: Val}))

  setValores = (Val) => this.setState(() => ({ Valores: Val }));

  setPatio = (Val) => this.setState(() => ({ Patio: Val }));

  seteditBoxValue = (Val) => this.setState(() => ({ editBoxValue: Val }));

  setTipoPatio = (Val) => this.setState(() => ({ TipoPatio: Val }));

  setDatos = (Val) => this.setState(() => ({ Datos: Val }));

  setUsuario = (Val) => this.setState(() => ({ Usuario: Val }));

  setrow = (Val) => this.setState(() => ({ row: Val }));

  setmaterial = (Val) => this.setState(() => ({ material: Val }));

  setmaterialtodos = (Val) => this.setState(() => ({ materialtodos: Val }));

  setmaterialpt = (Val) => this.setState(() => ({ materialpt: Val }));

  setmaterialr = (Val) => this.setState(() => ({ materialr: Val }));

  setcantidadr = (Val) => this.setState(() => ({ cantidadr: Val }));

  setkilosr = (Val) => this.setState(() => ({ kilosr: Val }));

  setobservaciones = (Val) => this.setState(() => ({ observaciones: Val }));

  setalmacen = (Val) => this.setState(() => ({ almacen: Val }));

  setsubalmacen = (Val) => this.setState(() => ({ subalmacen: Val }));

  setkiloscont = (Val) => this.setState(() => ({ kiloscont: Val }));

  setfiltropesaje = (Val) => this.setState(() => ({ filtropesaje: Val }));

  setshowResults = (Val) => this.setState(() => ({showResults: Val }));

  settransporte = (Val) => this.setState(() => ({transporte: Val }));

  setstatus = (Val) => this.setState(() => ({status: Val }));


  abortController = new AbortController()

  async componentDidMount() {
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    const urlKrakenPlanta = `${config.KrakenService}/${24}/${36}`;
    const urlKrakenUsuario = `${config.KrakenService}/${24}/${35}`;

    /* eslint-disable */
    const data = {
      parameters: '{"ClaUbicacion":' + this.state.editBoxValue + ',"ClaServicioJson":' + 1 + ',"Parametros":"@pnClaUbicacion=' + this.state.editBoxValue +',@psValor=,@pnEsParcial=0"}',
      tipoEstructura: 0,
    };

    const data3 = {
      parameters: '{"Usuario":' + this.state.NumbUsuario + '}',
      tipoEstructura: 0,
    };

    const data50 = {
      parameters:
        '{"ClaUbicacion":' +
        this.state.editBoxValue +
        ',"ClaServicioJson":' +
        50 +
        ',"Parametros":"@pdFechaIni='+ this.state.FechaDesde + ',@pdFechaFin='+ this.state.FechaHasta +'"}',
      tipoEstructura: 0,
    };
    /* eslint-enable */

    await callApi(urlKrakenUsuario, 'POST', data3, (res) => {
      this.setUsuario(res.Result0[0].IdUsuario);
    });
    /* eslint-disable */
    const data2 = {
      parameters: '{"idClaUsuarioMod":' + this.state.Usuario + '}',
      tipoEstructura: 0,
    };
    /* eslint-enable */
    if(this.state.Patio===null){
    await this.state.Usuario && callApi(urlKrakenPlanta, 'POST', data2, (res) => {
      this.setPatio(res.Result0);
    });
  }
    callApi(urlKrakenService, 'POST', data50, (res) => {
      this.setReportes(res.Result0);
    });

    if(this.state.editBoxValue===26 || this.state.editBoxValue===96){
    await callApi(urlKrakenService, 'POST', data,(res) => {
      this.setValores(res.Result0);
    });
    }
      fetch('https://api.ipify.org?format=json')
      .then(results => results.json())
      .then(data => setSessionData({
        Ipaddress: data.ip
      }))
  }

  componentWillUnmount(){
    this.abortController.abort();
  }
  
  componentDidUpdate(e, prevState) {
    if (e.history.pathname !== e.location.pathname) {
      // document.documentElement. = 0;
      // document.scrollingElement.scrollTop = 0;
      // this.refs.mainContent.scrollTop = 0;
    }

    if (prevState.FechaDesde !== this.state.FechaDesde || prevState.FechaHasta !== this.state.FechaHasta) {

      this.setReportes(null);
      this.timer = setTimeout(() =>{
      const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
      /* eslint-disable */
      const data50 = {
        parameters:
          '{"ClaUbicacion":' +
          this.state.editBoxValue +
          ',"ClaServicioJson":' +
          50 +
          ',"Parametros":"@pdFechaIni='+ this.state.FechaDesde + ',@pdFechaFin='+ this.state.FechaHasta +'"}',
        tipoEstructura: 0,
      };

      /* eslint-enable */
      callApi(urlKrakenService, 'POST', data50, (res) => {
        this.setReportes(res.Result0);
      });
    },10);
    }

    if ((prevState.editBoxValue !== this.state.editBoxValue) || prevState.Refresh === false && this.state.Refresh=== true) {

      this.setValores(null);
      this.setmaterial(null)
      this.timer = setTimeout(() =>{
      const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
      /* eslint-disable */
      const data = {
        parameters: '{"ClaUbicacion":' + this.state.editBoxValue + ',"ClaServicioJson":' + 1 + ',"Parametros":"@pnClaUbicacion=' + this.state.editBoxValue +',@psValor=,@pnEsParcial=0"}',
        tipoEstructura: 0,
      };

      /* eslint-enable */
      if(this.state.editBoxValue===26 || this.state.editBoxValue===96){
      callApi(urlKrakenService, 'POST', data, (res) => {
        this.setValores(res.Result0);
      });
    }
  },50);
    }

    if ((prevState.editBoxValue !== this.state.editBoxValue) || prevState.Refresh === false && this.state.Refresh=== true) {

      this.setReportes(null);

      this.timer = setTimeout(() =>{
        const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
/* eslint-disable */
      const data50 = {
        parameters:
          '{"ClaUbicacion":' +
          this.state.editBoxValue +
          ',"ClaServicioJson":' +
          50 +
          ',"Parametros":"@pdFechaIni='+ this.state.FechaDesde + ',@pdFechaFin='+ this.state.FechaHasta +'"}',
        tipoEstructura: 0,
      };

      /* eslint-enable */
      callApi(urlKrakenService, 'POST', data50, (res) => {
        this.setReportes(res.Result0);
      });
  },50);
    }
  }

  getRoutes = (routes) =>
    routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === '/Clasificacion-Chatarra') {
        if (prop.path === '/Placas' || prop.path === '/Reportes') {
          return (
            <Route
              path={prop.layout + prop.path}
              component={() => (
                <prop.component
                  Valores={this.state.Valores}
                  Datos={this.state.Datos}
                  setDatos={this.setDatos}
                  row={this.state.row}
                  setrow={this.setrow}
                  material={this.state.material}
                  setmaterial={this.setmaterial}
                  pesajeparcial={this.state.pesajeparcial}
                  setpesajeparcial={this.setpesajeparcial}
                  filtropesaje={this.state.filtropesaje}
                  setfiltropesaje={this.setfiltropesaje}
                  showResults={this.state.showResults}
                  setshowResults={this.setshowResults}
                  transporte={this.state.transporte}
                  settransporte={this.settransporte}
                  status={this.state.status}
                  setstatus={this.setstatus}
                  setpoppesaje={this.setpoppesaje}
                  NomMotivoEntrada={this.state.NomMotivoEntrada}
                  setNomMotivoEntrada={this.setNomMotivoEntrada}
                  ClaUbicacionOrigen={this.state.ClaUbicacionOrigen}
                  ClaViajeOrigen={this.state.ClaViajeOrigen}
                  ClaFabricacionViaje={this.state.ClaFabricacionViaje}
                  setClaUbicacionOrigen={this.setClaUbicacionOrigen}
                  setClaViajeOrigen={this.setClaViajeOrigen}
                  setClaFabricacionViaje={this.setClaFabricacionViaje}
                  FechaDesde={this.state.FechaDesde}
                  FechaHasta={this.state.FechaHasta}
                  setFechaDesde={this.setFechaDesde}
                  setFechaHasta={this.setFechaHasta}
                  Hoy={this.state.Hoy}
                  ReporteFiltrado={this.state.ReporteFiltrado}
                  setReporteFiltrado={this.setReporteFiltrado}
                  editBoxValue={this.state.editBoxValue}
                  TipoPatio={this.state.TipoPatio}
                  Reportes={this.state.Reportes}
                  setReportes={this.setReportes}
                  Refresh={this.state.Refresh}
                  setRefresh={this.setRefresh}
                  Patio={this.state.Patio}
                  FiltroReporte={this.state.FiltroReporte}
                  setFiltroReporte={this.setFiltroReporte}
                  FiltroPlacas={this.state.FiltroPlacas}
                  setFiltroPlacas={this.setFiltroPlacas}
                  placadato={this.state.placadato}
                  setplacadato={this.setplacadato}
                />
              )}
              key={key}
            />
          );
        }
        return (
          <Route path={prop.layout + prop.path} component={prop.component} key={key}>
            {' '}
          </Route>
        );
      }

      return null;
    });

  getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (this.props.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };

  // toggles collapse between mini sidenav and normal
  toggleSidenav = (e) => {
    if (document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-pinned');
      document.body.classList.add('g-sidenav-hidden');
    } else {
      document.body.classList.add('g-sidenav-pinned');
      document.body.classList.remove('g-sidenav-hidden');
    }
    this.setState({
      sidenavOpen: !this.state.sidenavOpen,
    });
  };

  getNavbarTheme = () =>
    this.props.location.pathname.indexOf('admin/alternative-dashboard') === -1 ? 'dark' : 'light';

  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          toggleSidenav={this.toggleSidenav}
          sidenavOpen={this.state.sidenavOpen}
        />
        <div className="main-content" ref="mainContent" onClick={this.closeSidenav}>
          <AdminNavbar
            {...this.props}
            Patio={this.state.Patio}
            editBoxValue={this.state.editBoxValue}
            seteditBoxValue={this.seteditBoxValue}
            TipoPatio={this.state.TipoPatio}
            setTipoPatio={this.setTipoPatio}
            row={this.state.row}
            setrow={this.setrow}
          />
          <Switch>{this.getRoutes(routes)}</Switch>
          <Switch>
            <Route path="/Clasificacion-Chatarra/Placa::placa/Boleta::id">
              <Sidebar
                {...this.props}
                routes={routes}
                toggleSidenav={this.toggleSidenav}
                sidenavOpen={this.state.sidenavOpen}
              />
              <Boleta
                placadato={this.state.placadato}
                setplacadato={this.setplacadato}
                warning={this.state.warning}
                setwarning={this.setwarning}
                editBoxValue={this.state.editBoxValue}
                TipoPatio={this.state.TipoPatio}
                row={this.state.row}
                setrow={this.setrow}
                material={this.state.material}
                setmaterial={this.setmaterial}
                materialtodos={this.state.materialtodos}
                setmaterialtodos={this.setmaterialtodos}
                materialpt={this.state.materialpt}
                setmaterialpt={this.setmaterialpt}
                materialr={this.state.materialr}
                cantidadr={this.state.cantidadr}
                kilosr={this.state.kilosr}
                observaciones={this.state.observaciones}
                almacen={this.state.almacen}
                subalmacen={this.state.subalmacen}
                setmaterialr={this.setmaterialr}
                setcantidadr={this.setcantidadr}
                setkilosr={this.setkilosr}
                setobservaciones={this.setobservaciones}
                setalmacen={this.setalmacen}
                setsubalmacen={this.setsubalmacen}
                kiloscont={this.state.kiloscont}
                setkiloscont={this.setkiloscont}
                pesajeparcial={this.state.pesajeparcial}
                setpesajeparcial={this.setpesajeparcial}
                poppesaje={this.state.poppesaje}
                setpoppesaje={this.setpoppesaje}
                NomMotivoEntrada={this.state.NomMotivoEntrada}
                setNomMotivoEntrada={this.setNomMotivoEntrada}
                ClaUbicacionOrigen={this.state.ClaUbicacionOrigen}
                ClaViajeOrigen={this.state.ClaViajeOrigen}
                ClaFabricacionViaje={this.state.ClaFabricacionViaje}
                setClaUbicacionOrigen={this.setClaUbicacionOrigen}
                setClaViajeOrigen={this.setClaViajeOrigen}
                setClaFabricacionViaje={this.setClaFabricacionViaje}
                Materialviaje={this.state.Materialviaje}
                TipoTraspaso={this.state.TipoTraspaso}
                setTipoTraspaso={this.setTipoTraspaso}
                setMaterialviaje={this.setMaterialviaje}
                Actualizar={this.state.Actualizar}
                setActualizar={this.setActualizar}
              />
            </Route>
          </Switch>
          <AdminFooter />
        </div>
        {this.state.sidenavOpen ? (
          <div className="backdrop d-xl-none" onClick={this.toggleSidenav} />
        ) : null}
      </>
    );
  }
}

export default Admin;
