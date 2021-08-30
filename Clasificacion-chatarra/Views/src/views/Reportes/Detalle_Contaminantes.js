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

// imagenes de Contaminantes
import LlantaC from '../../assets/img/LlantaC.png';
import LlantaG from '../../assets/img/LlantaG.png';
import LlantaM from '../../assets/img/LlantaM.png';
import Tank from '../../assets/img/Tanque.png';
import Boya from '../../assets/img/boya.png';
import Cilinder from '../../assets/img/Cilindro.png';
import { SkipPreviousRounded } from '@material-ui/icons';

const Detalles = (props) => {
  // Valores dinámicos locales al editar material
  const prev = useRef();
  // Arreglo valores Contaminantes
  const [Contaminantes, setContaminantes] = useState([
    [
      { nombre: 'Boyas', comentario: '50kgs', imagen: Boya, id: 1 },
      { nombre: 'Cilindro', comentario: '100kgs', imagen: Cilinder, id: 2 },
      {
        nombre: 'Tanque Estacionario',
        peso: '200',
        comentario: '200kgs',
        imagen: Tank,
        id: 3,
      },
    ],
    [
      { nombre: 'Llantas Chico', comentario: '25kgs', imagen: LlantaC, id: 4 },
      { nombre: 'Llantas Mediano', comentario: '50kgs', imagen: LlantaM, id: 5 },
      { nombre: 'Llantas Grande', comentario: '100kgs', imagen: LlantaG, id: 6 },
    ],
  ]);
  
  // Componente de botes y electrodomésticos para el respectivo material
  function Contelements({ contaminante }) {
    const [valor, setvalor] = useState(0);
    const Kilos = valor * contaminante.peso;

    return (
      <div key={contaminante.id}>
        <Col>
          <div className="popup-column">
            <div>
              <img src={contaminante.imagen} alt="dryer" className="popup-image" />
              <span className="popups-kgs">{contaminante.comentario}</span>
            </div>
            <div className="popup-bote">{contaminante.nombre}</div>
            <div>
              <input
                value={
                  contaminante.id === 4
                    ? props.report.LlantasCh === 0 || props.report.LlantasCh === null
                      ? ''
                      : props.report.LlantasCh/25
                    : contaminante.id === 1
                    ? props.report.Boyas === 0 || props.report.Boyas === null
                      ? ''
                      : props.report.Boyas/50
                    : contaminante.id === 2
                    ? props.report.Cilindro === 0 || props.report.Cilindro === null
                      ? ''
                      : props.report.Cilindro/100
                    : contaminante.id === 3
                    ? props.report.Tanque === 0 || props.report.Tanque === null
                      ? ''
                      : props.report.Tanque/200
                    : contaminante.id === 5
                    ? props.report.LlantasM === 0 || props.report.LlantasM === null
                      ? ''
                      : props.report.LlantasM/50
                    : props.report.LlantasG === 0 || props.report.LlantasG === null
                    ? ''
                    : props.report.LlantasG/100
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

  // Componente final de Wizard para editar material
  return (
    <div>
      <div className="box">
        <span className="close-icon" onClick={()=> props.seteditOpen(false)}>x</span>
        <CardHeader style={{ paddingTop: '25px', color: '#002c6f' }}>
          Contaminación
          <div className="bote-elect">
            <Row>
              <Col>Llanta:</Col>
              <Col>{+props.report.LlantasCh + +props.report.LlantasM + +props.report.LlantasG}</Col>
              <Col>Total:</Col>
              <Col>{+props.report.KilosContaminados ? +props.report.KilosContaminados : +props.report.Tanque + +props.report.Cilindro + +props.report.Boyas +props.report.LlantasCh + +props.report.LlantasM + +props.report.LlantasG}</Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>Tanque:</Col>
              <Col>{+props.report.Tanque + +props.report.Cilindro + +props.report.Boyas}</Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>Otros:</Col>
              <Col>{+props.report.KilosContaminados <0 ? (+props.report.KilosContaminados - (+props.report.Tanque + +props.report.Cilindro+ +props.report.Boyas + +props.report.LlantasCh + +props.report.LlantasM + +props.report.LlantasG)):0}</Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
            </Row>
          </div>
        </CardHeader>
        <Container fluid={true}>
          <Row className="popup-row">
            <Col>
              <Row className="popup-title" style={{ marginLeft: '50%', marginTop: '20px' }}>
                Kilos Contaminados
              </Row>
              <InputGroup style={{ width: '50%', marginLeft: '50%' }}>
                <Input
                  className="popup-recibidos"
                  type="number"
                  defaultValue={+props.report.KilosContaminados<0 ? +props.report.KilosContaminados - (+props.report.Tanque+ +props.report.Cilindro + +props.report.Boyas + +props.report.LlantasCh + +props.report.LlantasM + +props.report.LlantasG):0}
                  disabled={true}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>kgs</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>
            <Col>
              <Row className="popup-title" style={{ marginLeft: '0px', marginTop: '20px' }}>
                Motivo Contaminacion
              </Row>
              {props.report.MotivoContaminacion}
              <Row
                style={{
                  color: 'red',
                  position: 'absolute',
                  marginTop: '0px',
                  marginLeft: '0%',
                }}
                className="warning"
              >
              </Row>
            </Col>
          </Row>
          <div className="mapeo-contaminantes" style={{ marginTop: '40px' }}>
            {Contaminantes.map((contaminantegrupo,index) => (
              <Row key={index}>
                {contaminantegrupo.map((contaminante) => (
                  <Contelements key={contaminante.id} contaminante={contaminante} />
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

export default Detalles;
