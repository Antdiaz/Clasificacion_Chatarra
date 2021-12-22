import React, { useState, useEffect, useRef } from 'react';
import {
  CardHeader,
  Row,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { callApi, getSessionItem } from '../../utils/utils';
import { config } from '../../utils/config';
import SelectBox from 'devextreme-react/select-box';
import WarningIcon from '@material-ui/icons/Warning';

// imagenes de Electros
import dryer from '../../assets/img/dryer.png';
import freezer from '../../assets/img/freezer.png';
import heater from '../../assets/img/heater.png';
import microwave from '../../assets/img/microwave.png';
import oven from '../../assets/img/oven.png';
import washer from '../../assets/img/washer.png';
import smfreezer from '../../assets/img/mini-freezer.png';
import mdfreezer from '../../assets/img/md-freezer.png';
import others from '../../assets/img/no-image.png';
import smbag from '../../assets/img/little-bag.png';
import bag from '../../assets/img/bag.png';
import contenedors from '../../assets/img/contenedor.png';

const Elebotes = (props) => {
  // Valores dinámicos locales al editar material
  // Arreglo valores Contaminantes
  const [refriCh, setrefriCh] = useState(props.report.RefriCh)
  const [refriM, setrefriM] = useState(props.report.RefriM)
  const [refriG, setrefriG] = useState(props.report.RefriG)
  const [lavadora, setlavadora] = useState(0)
  const [boiler, setboiler] = useState(0)
  const [secadora, setsecadora] = useState(0)
  const [Oven, setOven] = useState(0)
  const [microondas, setmicroondas] = useState(0)
  const [otros, setotros] = useState(0)
  const [costal, setcostal] = useState(0)
  const [megasaco, setmegasaco] = useState(0)
  const [contenedor, setcontenedor] = useState(0)
  const [Contaminantes, setContaminantes] = useState([
    [
      { nombre: 'Refrigerador Chico', comentario: '50kgs', imagen: smfreezer, id: 1 },
      { nombre: 'Refrigerador Mediano', comentario: '100kgs', imagen: mdfreezer, id: 2 },
      { nombre: 'Refrigerador Grande',comentario: '150kgs',imagen: freezer,id: 3},
      { nombre: 'Lavadora',peso: '200',comentario: '50kgs',imagen: washer,id: 4}
    ],
    [
      { nombre: 'Boiler', comentario: '100kgs', imagen:heater, id: 5 },
      { nombre: 'Secadora', comentario: '50kgs', imagen: dryer, id: 6 },
      { nombre: 'Oven', comentario: '50kgs', imagen: oven, id: 7 },
      { nombre: 'Microondas', comentario: '20kgs', imagen: microwave, id: 8 },
    ],
    [
      { nombre: 'Otros', comentario: '50kgs', imagen: others, id: 9 },
      { nombre: 'Costal de Bote', comentario: '25kgs', imagen: smbag, id: 10 },
      { nombre: 'Mega Saco de Bote', comentario: '250kgs', imagen: bag, id: 11 },
      { nombre: 'Contenedor de Bote', comentario: '150kgs', imagen: contenedors, id: 12 },
    ]
  ]);
  
  // Componente de botes y electrodomésticos para el respectivo material
  function Electros({ contaminante }) {
    const [valor, setvalor] = useState(0);
    const Kilos = valor * contaminante.peso;

    return (
      <div key={contaminante.id}>
        <Col>
          <div className="popup-columnel">
            <div>
              <img src={contaminante.imagen} alt="dryer" className="popup-image" />
              <span className="popups-kgs">{contaminante.comentario}</span>
            </div>
            <div className="popup-bote">{contaminante.nombre}</div>
            <div>
              <input
                value={
                  contaminante.id === 1
                    ? props.report.RefriCh === 0 || props.report.RefriCh === null
                      ? ''
                      : props.report.RefriCh/50
                    : contaminante.id === 2
                    ? props.report.RefriM === 0 || props.report.RefriM === null
                      ? ''
                      : props.report.RefriM/100
                    : contaminante.id === 3
                    ? props.report.RefriG === 0 || props.report.RefriG === null
                      ? ''
                      : props.report.RefriG/150
                    : contaminante.id === 4
                    ? props.report.Lavadora === 0 || props.report.Lavadora === null
                      ? ''
                      : props.report.Lavadora/50
                    : contaminante.id === 5
                    ? props.report.Boiler === 0 || props.report.Boiler === null
                      ? ''
                      : props.report.Boiler/100
                      : contaminante.id === 6
                    ? props.report.Secadora === 0 || props.report.Secadora === null
                      ? ''
                      : props.report.Secadora/50
                      : contaminante.id === 7
                    ? props.report.Oven === 0 || props.report.Oven === null
                      ? ''
                      : props.report.Oven/50
                      : contaminante.id === 8
                    ? props.report.Micro === 0 || props.report.Micro === null
                      ? ''
                      : props.report.Micro/20
                      : contaminante.id === 9
                    ? props.report.Otros === 0 || props.report.Otros === null
                      ? ''
                      : props.report.Otros/50
                      : contaminante.id === 10
                    ? props.report.Costal === 0 || props.report.Costal === null
                      ? ''
                      : props.report.Costal/25
                      : contaminante.id === 11
                    ? props.report.MegaSaco === 0 || props.report.MegaSaco === null
                      ? ''
                      : props.report.MegaSaco/250
                    : props.report.Contenedor === 0 || props.report.Contenedor === null
                    ? ''
                    
                    : props.report.Contenedor/150
              }
                className="popup-number"
                style={{margin:'0px'}}
                type="number"
                disabled={true}
              />
            </div>
          </div>
        </Col>
      </div>
    );
  }

    return (
      <div>
        <div className="boxbot">
          <span className="close-icon" onClick={()=> props.seteditOpenel(false)}>x</span>
          <CardHeader style={{ paddingTop: '25px', color: '#002c6f' }}>
            Contaminación
            <div className="bote-elect">
              <Row>
                <Col>Electrodomésticos:</Col>
                <Col>{0} Kg</Col>
                <Col>Total:</Col>
                <Col>{0} Kg</Col>
                <Col></Col>
              </Row>
              <Row>
                <Col>Botes:</Col>
                <Col>{0} Kg</Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
            </div>
          </CardHeader>
          <Container fluid={true}>
            <div className="mapeo-electros" style={{ marginTop: '40px' }}>
              {Contaminantes.map((contaminantegrupo,index) => (
                <Row className="popup-rowel" key={index}>
                  {contaminantegrupo.map((contaminante) => (
                    <Electros key={contaminante.id} contaminante={contaminante} />
                  ))}
                </Row>
              ))}
            </div>
          </Container>
          <div style={{ marginTop: '70px' }}></div>
        </div>
      </div>
    );
  };

export default Elebotes;
