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
      row: null,
      material: null,
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
      status:'todos'
    };
  }

  setwarning =(Val) => this.setState(() => ({ warning: Val}))

  setpoppesaje = (Val) => this.setState(() => ({ poppesaje: Val}))

  setpesajeparcial = (Val) => this.setState(() => ({ pesajeparcial: Val}))

  setValores = (Val) => this.setState(() => ({ Valores: Val }));

  setPatio = (Val) => this.setState(() => ({ Patio: Val }));

  seteditBoxValue = (Val) => this.setState(() => ({ editBoxValue: Val }));

  setDatos = (Val) => this.setState(() => ({ Datos: Val }));

  setUsuario = (Val) => this.setState(() => ({ Usuario: Val }));

  setrow = (Val) => this.setState(() => ({ row: Val }));

  setmaterial = (Val) => this.setState(() => ({ material: Val }));

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


  async componentDidMount() {
    const urlKrakenService = `${config.KrakenService}/${24}/${37}`;
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
    await callApi(urlKrakenPlanta, 'POST', data2, (res) => {
      this.setPatio(res.Result0);
    });

    await callApi(urlKrakenService, 'POST', data,(res) => {
      this.setValores(res.Result0);
    });

      fetch('https://api.ipify.org?format=json')
      .then(results => results.json())
      .then(data => setSessionData({
        Ipaddress: data.ip
      }))
  }

  componentDidUpdate(e, prevState) {
    if (e.history.pathname !== e.location.pathname) {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainContent.scrollTop = 0;
    }

    if (prevState.editBoxValue !== this.state.editBoxValue) {
      const urlKrakenService = `${config.KrakenService}/${24}/${37}`;
      /* eslint-disable */
      const data = {
        parameters: '{"ClaUbicacion":' + this.state.editBoxValue + ',"ClaServicioJson":' + 1 + ',"Parametros":"@pnClaUbicacion=' + this.state.editBoxValue +',@psValor=,@pnEsParcial=0"}',
        tipoEstructura: 0,
      };

      /* eslint-enable */
      callApi(urlKrakenService, 'POST', data, (res) => {
        this.setValores(res.Result0);
      });
    }
  }

  getRoutes = (routes) =>
    routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === '/layout') {
        if (prop.path === '/Placas') {
          return (
            <Route
              path={prop.layout + prop.path}
              component={() => (
                <prop.component
                  Valores={this.state.Valores}
                  Datos={this.state.Datos}
                  setDatos={this.setDatos}
                  Usuario={this.state.Usuario}
                  editBoxValue={this.state.editBoxValue}
                  row={this.state.row}
                  setrow={this.setrow}
                  material={this.state.material}
                  setmaterial={this.setmaterial}
                  Patio={this.state.Patio}
                  filtropesaje={this.state.filtropesaje}
                  setfiltropesaje={this.setfiltropesaje}
                  showResults={this.state.showResults}
                  setshowResults={this.setshowResults}
                  transporte={this.state.transporte}
                  settransporte={this.settransporte}
                  status={this.state.status}
                  setstatus={this.setstatus}
                  poppesaje={this.state.poppesaje}
                  setpoppesaje={this.setpoppesaje}
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
            row={this.state.row}
            setrow={this.setrow}
          />
          <Switch>{this.getRoutes(routes)}</Switch>
          <Switch>
            <Route path="/Informacion/:placa/:id">
              <Sidebar
                {...this.props}
                routes={routes}
                toggleSidenav={this.toggleSidenav}
                sidenavOpen={this.state.sidenavOpen}
              />
              <Boleta
                warning={this.state.warning}
                setwarning={this.setwarning}
                Valores={this.state.Valores}
                editBoxValue={this.state.editBoxValue}
                row={this.state.row}
                setrow={this.setrow}
                material={this.state.material}
                setmaterial={this.setmaterial}
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
                Patio={this.state.Patio}
                kiloscont={this.state.kiloscont}
                setkiloscont={this.setkiloscont}
                pesajeparcial={this.state.pesajeparcial}
                setpesajeparcial={this.setpesajeparcial}
                poppesaje={this.state.poppesaje}
                setpoppesaje={this.setpoppesaje}
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
