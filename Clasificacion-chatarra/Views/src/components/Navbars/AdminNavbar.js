import React,{useState} from 'react';
import SelectBox from 'devextreme-react/select-box';
// nodejs library that concatenates classes
import classnames from 'classnames';
// nodejs library to set properties for components
import { getSessionItem, logOut,setSessionData } from '../../utils/utils';
import PropTypes from 'prop-types';
// import images
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Navbar,
  Nav,
  Container,
  Col,
  Row,
} from 'reactstrap';
import team4 from '../../assets/img/default-avatar.png';
import logo from '../../assets/img/deaceroLogo.PNG';
import { Link,useLocation } from 'react-router-dom';
// reactstrap components

AdminNavbar.defaultProps = {
  toggleSidenav: () => {},
  sidenavOpen: false,
  theme: 'dark',
};

AdminNavbar.propTypes = {
  toggleSidenav: PropTypes.func,
  sidenavOpen: PropTypes.bool,
  theme: PropTypes.oneOf(['dark', 'light']),
};

function AdminNavbar({ theme, Patio, editBoxValue, seteditBoxValue,TipoPatio,setTipoPatio,setreValores }) {
  const [modalreport, setmodalreport] = useState(false)
  const customStyles = {
    content: {
      background: 'rgba(128, 128, 128, 0.212)',
      top: '0%',
      right: '-.5%',
      bottom: '0%',

    },
  };

  const location = useLocation();

  const onValueChanged = (e) => {
    seteditBoxValue(e.value);
    setTipoPatio(e.component.option("selectedItem").ClaTipoUbicacion)

    setSessionData({
      TipoPatio: e.component.option("selectedItem").ClaTipoUbicacion,
      PatioEscogido: e.value
    }
    )
  };


  return (
    <>
      <Navbar
        className={classnames('navbar-top navbar-expand border-bottom', {
          'navbar-dark bg-info': theme === 'dark',
        })}
      >
        <Container fluid>
          <Collapse navbar isOpen>
            <Nav className="align-items-left" navbar>
              <img src={logo} alt="deaceroLogo" />
              <div style={{verticalAlign:'center',paddingTop:'2.5%',width:'20vw',paddingLeft: '5%',fontWeight: '600',fontSize: '20px',color:'white',fontFamily: 'Roboto, RobotoFallback, "Noto Kufi Arabic", Helvetica, Arial, sans-serif'}}>{location.pathname === "/Clasificacion-Chatarra/Placas" ? "Clasificación Chatarra" : location.pathname === "/Clasificacion-Chatarra/Reportes" ? "Reporte Contaminación":location.pathname === "/Clasificacion-Chatarra/ZonaDescarga" ? "Zonas de Descarga" : "Reporte Indicadores"}</div>
            </Nav>
            <Nav className="align-items-center ml-md-auto " navbar />
            <Nav className="align-items-center ml-auto ml-md-0" navbar>
              <SelectBox
              /* eslint-disable */
                className="placa-style"
                placeholder="Seleccionar Patio:"
                dataSource={Patio}
                defaultValue={editBoxValue}
                displayExpr="NombreCorto"
                valueExpr="ClaUbicacion"
                onValueChanged={onValueChanged}
                /* eslint-enable */
              />
              <UncontrolledDropdown nav style={{ cursor: 'pointer' }}>
                <DropdownToggle className="nav-link pr-0" color="" tag="a">
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img alt="avatar" src={team4} />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {getSessionItem('NomUsuario', '')}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Bienvenido!</h6>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem href="/" onClick={logOut}>
                    <i className="ni ni-user-run" />
                    <span>Salir</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <Link onClick={() => setreValores(true)} to="/Clasificacion-Chatarra/Placas">
                <i className="fa fa-home fa-lg" aria-hidden="true"></i>
              </Link>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminNavbar;
