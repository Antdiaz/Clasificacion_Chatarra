import React,{useState} from "react";
import { Card, CardText, CardHeader, CardBody, CardTitle, Button, Row, Col,Container} from 'reactstrap';
import Form, { Item } from 'devextreme-react/form';
import KitchenIcon from '@material-ui/icons/Kitchen';
import LocalLaundryServiceIcon from '@material-ui/icons/LocalLaundryService';
import dryer from "../../assets/img/dryer.png"
import freezer from "../../assets/img/freezer.png"
import heater from "../../assets/img/heater.png"
import microwave from "../../assets/img/microwave.png"
import oven from "../../assets/img/oven.png"
import washer from "../../assets/img/washer.png"
import smfreezer from "../../assets/img/mini-freezer.png"
import mdfreezer from "../../assets/img/md-freezer.png"
import others from "../../assets/img/no-image.png"
import smbag from "../../assets/img/little-bag.png"
import bag from "../../assets/img/bag.png"
import contenedors from "../../assets/img/contenedor.png"

const Popup = props => {

  const [isNext, setIsNext] = useState(false);
  const [srefri, setsrefri] = useState(0)
  const [mrefri, setmrefri] = useState(0)
  const [refri, setrefri] = useState(0)
  const [lavadora, setlavadora] = useState(0)
  const [boiler, setboiler] = useState(0)
  const [secadora, setsecadora] = useState(0)
  const [estufa, setestufa] = useState(0)
  const [microondas, setmicroondas] = useState(0)
  const [otros, setotros] = useState(0)
  const [costal, setcostal] = useState(0)
  const [saco, setsaco] = useState(0)
  const [contenedor, setcontenedor] = useState(0)
  const [matrecibido, setmatrecibido] = useState(null)
  const [cantrecibida, setcantrecibida] = useState(null)
  const [Kilrecibidos, setKilrecibidos] = useState(null)
  const [Observaciones, setObservaciones] = useState(null)
  const [almacén, setalmacén] = useState(null)
  const [subalmacén, setsubalmacén] = useState(null)

  const electrodomestico = ((50*srefri) + (100*mrefri) + (150*refri) + (50*lavadora) + (100*boiler) + (50*secadora) + (50*estufa) + (20*microondas) + (50*otros))
  const botes = ((35*costal) + (250*saco) + (150*contenedor))


const handleSum1 = () => {
  if(srefri< 50){
  setsrefri(srefri + 1)
  }
}

const handleSum2 = () => {
  if(mrefri< 50){
  setmrefri(mrefri + 1)
  }
}
const handleSum3 = () => {
  if(refri< 50){
  setrefri(refri + 1)
  }
}
const handleSum4 = () => {
  if(lavadora< 50){
  setlavadora(lavadora + 1)
  }
}
const handleSum5 = () => {
  if(boiler< 50){
  setboiler(boiler + 1)
  }
}
const handleSum6 = () => {
  if(secadora< 50){
  setsecadora(secadora + 1)
  }
}
const handleSum7 = () => {
  if(estufa< 50){
  setestufa(estufa + 1)
  }
}
const handleSum8 = () => {
  if(microondas< 50){
  setmicroondas(microondas + 1)
  }
}
const handleSum9 = () => {
  if(otros< 50){
  setotros(otros + 1)
  }
}
const handleSum10 = () => {
  if(costal< 50){
  setcostal(costal + 1)
  }
}
const handleSum11 = () => {
  if(saco< 50){
  setsaco(saco + 1)
  }
}
const handleSum12 = () => {
  if(contenedor< 50){
  setcontenedor(contenedor + 1)
  }
}


const handleRest1 = () => {
  if(srefri> 0){
  setsrefri(srefri - 1)
  }
}
const handleRest2 = () => {
  if(mrefri> 0){
  setmrefri(mrefri - 1)
  }
}
const handleRest3 = () => {
  if(refri> 0){
  setrefri(refri - 1)
  }
}
const handleRest4 = () => {
  if(lavadora> 0){
  setlavadora(lavadora - 1)
  }
}
const handleRest5 = () => {
  if(boiler> 0){
  setboiler(boiler - 1)
  }
}
const handleRest6 = () => {
  if(secadora> 0){
  setsecadora(secadora - 1)
  }
}
const handleRest7 = () => {
  if(estufa> 0){
  setestufa(estufa - 1)
  }
}
const handleRest8 = () => {
  if(microondas> 0){
  setmicroondas(microondas - 1)
  }
}
const handleRest9 = () => {
  if(otros> 0){
  setotros(otros - 1)
  }
}
const handleRest10 = () => {
  if(costal> 0){
  setcostal(costal - 1)
  }
}
const handleRest11 = () => {
  if(saco> 0){
  setsaco(saco - 1)
  }
}
const handleRest12 = () => {
  if(contenedor> 0){
  setcontenedor(contenedor - 1)
  }
}

const togglePopup2 = () => {
  setIsNext(!isNext);
  }
  return (
    <div className="popup-box">
      {/* <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        <CardHeader>Clasificación
          <div className="bote-elect">
            <Row><Col>Electrodoméstico:</Col><Col>{electrodomestico} Kgs</Col><Col></Col></Row>
            <Row><Col>Bote:</Col><Col>{botes} Kgs</Col><Col></Col></Row>
          </div>
        </CardHeader>
        <Container fluid={true}>

          <Row className="popup-row">    
            <Col>
              <div className="popup-column">
                <div><img src={smfreezer} alt="dryer" className="popup-image" /><span className="popups-kgs">50kgs</span></div>
                <div className="popup-bote">Refrigerador<br />Chico</div>
                <div><button type="button" className="popup-adder sum" onClick={handleSum1}>+</button><button onClick={handleRest1} type="button" className="popup-adder rest">-</button><input value={srefri === 0 ? "" : srefri} defaultValue="" className="popup-number" disabled="disabled" /></div>
              </div>
            </Col>
            <Col>
              <div className="popup-column">
                <div><img src={mdfreezer} alt="dryer" className="popup-image" /><span className="popups-kgs">100kgs</span></div>
                <div className="popup-bote">Refrigerador <br />Mediano</div>
                <div><button type="button" className="popup-adder sum" onClick={handleSum2}>+</button><button onClick={handleRest2} type="button" className="popup-adder rest">-</button><input value={mrefri === 0 ? "" : mrefri} defaultValue="" className="popup-number" disabled="disabled" /></div>
              </div>
            </Col>
            <Col>
              <div className="popup-column">
                <div><img src={freezer} alt="dryer" className="popup-image" /><span className="popups-kgs">150kgs</span></div>
                <div className="popup-bote">Refrigerador <br /> Grande</div>
                <div><button type="button" className="popup-adder sum" onClick={handleSum3}>+</button><button onClick={handleRest3} type="button" className="popup-adder rest">-</button><input value={refri === 0 ? "" : refri} defaultValue="" className="popup-number" disabled="disabled" /></div>
              </div>
            </Col>
          </Row> 

          <Row className="popup-row">    
            <Col>
              <div className="popup-column">
                <div><img src={washer} alt="dryer" className="popup-image" /><span className="popups-kgs">50kgs</span></div>
                <div className="popup-bote">Lavadora</div>
                <div><button type="button" className="popup-adder sum" onClick={handleSum4}>+</button><button onClick={handleRest4} type="button" className="popup-adder rest">-</button><input value={lavadora === 0 ? "" : lavadora} defaultValue="" className="popup-number" disabled="disabled" /></div>
              </div>
            </Col>
            <Col>
              <div className="popup-column">
                <div><img src={heater} alt="dryer" className="popup-image" /><span className="popups-kgs">100kgs</span></div>
                <div className="popup-bote">Boiler</div>
                <div><button type="button" className="popup-adder sum" onClick={handleSum5}>+</button><button onClick={handleRest5} type="button" className="popup-adder rest">-</button><input value={boiler === 0 ? "" : boiler} defaultValue="" className="popup-number" disabled="disabled" /></div>
              </div>
            </Col>
            <Col>
              <div className="popup-column">
                <div><img src={dryer} alt="dryer" className="popup-image" /><span className="popups-kgs">50kgs</span></div>
                <div className="popup-bote">Secadora</div>
                <div><button type="button" className="popup-adder sum" onClick={handleSum6}>+</button><button onClick={handleRest6} type="button" className="popup-adder rest">-</button><input value={secadora === 0 ? "" : secadora} defaultValue="" className="popup-number" disabled="disabled" /></div>
              </div>
            </Col>
          </Row> 

          <Row className="popup-row">    
            <Col>
              <div className="popup-column">
                <div><img src={oven} alt="dryer" className="popup-image" /><span className="popups-kgs">50kgs</span></div>
                <div className="popup-bote">Oven</div>
                <div><button type="button" className="popup-adder sum" onClick={handleSum7}>+</button><button onClick={handleRest7} type="button" className="popup-adder rest">-</button><input value={estufa === 0 ? "" : estufa} defaultValue="" className="popup-number" disabled="disabled" /></div>
              </div>
            </Col>
            <Col>
              <div className="popup-column">
                <div><img src={microwave} alt="dryer" className="popup-image" /><span className="popups-kgs">20kgs</span></div>
                <div className="popup-bote">Microondas</div>
                <div><button type="button" className="popup-adder sum" onClick={handleSum8}>+</button><button onClick={handleRest8} type="button" className="popup-adder rest">-</button><input value={microondas === 0 ? "" : microondas} defaultValue="" className="popup-number" disabled="disabled" /></div>
              </div>
            </Col>
            <Col>
              <div className="popup-column">
                <div><img src={others} alt="dryer" className="popup-image" /><span className="popups-kgs">50kgs</span></div>
                <div className="popup-bote">Otros</div>
                <div><button type="button" className="popup-adder sum" onClick={handleSum9}>+</button><button onClick={handleRest9} type="button" className="popup-adder rest">-</button><input value={otros === 0 ? "" : otros} defaultValue="" className="popup-number" disabled="disabled" /></div>
              </div>
            </Col>
          </Row> 
          
          <Row className="popup-row">    
            <Col>
              <div className="popup-column">
                <div><img src={smbag} alt="dryer" className="popup-image" /><span className="popups-kgs">25kgs</span></div>
                <div className="popup-bote">Costal de Bote</div>
                <div><button type="button" className="popup-adder sum" onClick={handleSum10}>+</button><button onClick={handleRest10} type="button" className="popup-adder rest">-</button><input value={costal === 0 ? "" : costal} defaultValue="" className="popup-number" disabled="disabled" /></div>
              </div>
            </Col>
            <Col>
              <div className="popup-column">
                <div><img src={bag} alt="dryer" className="popup-image" /><span className="popups-kgs">250kgs</span></div>
                <div className="popup-bote">Mega Saco de Bote</div>
                <div><button type="button" className="popup-adder sum" onClick={handleSum11}>+</button><button onClick={handleRest11} type="button" className="popup-adder rest">-</button><input value={saco === 0 ? "" : saco} defaultValue="" className="popup-number" disabled="disabled" /></div>
              </div>
            </Col>
            <Col>
              <div className="popup-column">
                <div><img src={contenedors} alt="dryer" className="popup-image" /><span className="popups-kgs">150kgs</span></div>
                <div className="popup-bote">Contenedor de Bote</div>
                <div><button type="button" className="popup-adder sum" onClick={handleSum12}>+</button><button onClick={handleRest12} type="button" className="popup-adder rest">-</button><input value={contenedor === 0 ? "" : contenedor} defaultValue="" className="popup-number" disabled="disabled" /></div>
              </div>
            </Col>
          </Row> 
        </Container>
        <div>
          <button style={{marginRight:"30px"}} type="button" className="popup-button" onClick={togglePopup2}>GUARDAR</button>
        </div>
      </div>    */}
      
      {!isNext ? 
        (
          <div className="box">
            <span className="close-icon" onClick={props.handleClose}>x</span>
            <CardHeader style={{paddingTop: "25px", color: "#002c6f"}}>[1] Clasificación Material</CardHeader>
            <Container fluid={true}>
              <Row className="popup-row" style={{marginTop:"10px"}}>    
                <Col>
                  <Row className="popup-title">Material Enviado</Row>
                  <Row>Mixto para procesar</Row>
                </Col>
                <Col>
                  <Row className="popup-title" style={{marginLeft:"0px"}}>Material Recibido</Row>
                  <Form>
                    <Item
                      editorType="dxTextArea"
                    />
                  </Form>
                </Col>
              </Row>
              <Row className="popup-row">    
                <Col>
                  <Row className="popup-title">Cantidad Enviada</Row>
                  <Row>123</Row>
                </Col>
                <Col>
                  <Row className="popup-title" style={{marginLeft:"0px"}}>Cantidad Recibida</Row>
                  <Form>
                    <Item
                      editorType="dxTextArea"
                    />
                  </Form>
                </Col>
              </Row>

              <Row className="popup-row">    
                <Col>
                  <Row className="popup-title">Kilos Enviados</Row>
                  <Row>123</Row>
                </Col>
                <Col>
                  <Row className="popup-title" style={{marginLeft:"0px"}}>Kilos Recibidos</Row>
                  <Form>
                    <Item
                      editorType="dxTextArea"
                    />
                  </Form>
                </Col>
              </Row>

              <Row className="popup-row">    
                <Col>
                  <Row className="popup-title">Porcentaje Recibido</Row>
                  <Row>123</Row>
                </Col>
                <Col>
                  <Row className="popup-title" style={{marginLeft:"0px"}}>Zona de Descarga</Row>
                  <Row> </Row>
                </Col>
              </Row>
              <Row className="popup-row">   
                <Col>
                  <Row className="popup-title">Observaciones</Row>
                  <Form>
                    <Item
                      editorType="dxTextArea"
                    />
                  </Form>
                </Col>
              </Row>
              <Row className="popup-row">   
                <Col>
                  <Row className="popup-title"><Col>Almacén</Col><Col><Form><Item editorType="dxTextArea" /></Form></Col></Row>
                </Col>
                <Col>
                  <Row className="popup-title"><Col>Subalmacén</Col><Col><Form><Item editorType="dxTextArea" /></Form></Col></Row>
                </Col>
              </Row>
            </Container>
            <div>
              <button style={{marginRight:"30px"}} type="button" className="popup-button" onClick={togglePopup2}>Siguiente &gt;</button>
              <button type="button" className="popup-button" onClick={props.handleClose}>&#9447; Cancelar</button>
            </div>
          </div>
        ) : (
          <div className="box">
            <span className="close-icon" onClick={props.handleClose}>x</span>
            <CardHeader style={{paddingTop: "25px", color: "#002c6f"}}>[2] Contaminación</CardHeader>
            <Container fluid={true}>
              <Row className="popup-row" style={{marginTop:"40px"}}>    
                <Col>
                  <Row className="popup-title">Material Recibido</Row>
                  <Row>Mixto para procesar</Row>
                </Col>
                <Col>
                  <Row className="popup-title" style={{marginLeft:"0px"}}>Cantidad Recibida</Row>
                  <Row className="popup-title" style={{marginLeft:"0px"}}>123</Row>
                </Col>
                <Col>
                  <Row className="popup-title" style={{marginLeft:"0px"}}>Kilos Recibidos</Row>
                  <Row className="popup-title" style={{marginLeft:"0px"}}>123</Row>
                </Col>
                <Col>
                  <Row className="popup-title" style={{marginLeft:"0px"}}>Porcentaje</Row>
                  <Row className="popup-title" style={{marginLeft:"0px"}}>50%</Row>
                </Col>
              </Row>
              <Row className="popup-row">    
                <Col>
                  <Row className="popup-title" style={{marginLeft:"0px", marginTop: "50px"}}>Kilos Contaminados</Row>
                  <Form>
                    <Item
                      editorType="dxTextArea"
                    />
                  </Form>
                </Col>
              </Row>

              <Row className="popup-row">    
                <Col>
                  <Row className="popup-title" style={{marginLeft:"0px", marginTop: "50px"}}>Motivo Contaminacion</Row>
                  <Form>
                    <Item
                      editorType="dxTextArea"
                    />
                  </Form>
                </Col>
              </Row>

            </Container>
            <div style={{marginTop:"70px"}}>
              <button style={{marginRight:"30px"}} type="button" className="popup-button" onClick={props.handleClose}>Guardar &#43;</button>
              <button type="button" className="popup-button" onClick={togglePopup2}>&#60; Regresar</button>
            </div>
          </div>
        )} 
    </div>
  );
};
 
export default Popup;