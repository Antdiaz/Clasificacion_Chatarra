import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import swal from 'sweetalert';
import Modal from 'react-modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CSVLink } from 'react-csv';
import {
  Card,
  CardText,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Button,
  Col,
  Input as Inputs,
} from 'reactstrap';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import {
  randomCreatedDate,
  randomEmail,
  randomTraderName,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator';
import { callApi, getSessionItem } from '../../utils/utils';
import { config } from '../../utils/config';
import { Fab, IconButton, makeStyles } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import { CellWifi } from '@material-ui/icons';
import CheckInput from 'components/Controls/CheckInput';
import Select from 'components/Controls/Select';
import Input from 'components/Controls/Input';
import AppContext from 'context/AppContext';
import Seleccion from './SelectField';

export default function ValidateRowModelControlGrid({ editBoxValue, Valores }) {
  const customStyles = {
    content: {
      background: 'transparent',
      top: '0%',
      right: '-.5%',
      bottom: '0%',
    },
  };
  const [Zonas, setZonas] = useState(null);
  const [CurrArticulo, setCurrArticulo] = useState('');
  const [CurrClaZona, setCurrClaZona] = useState('');
  const [CurrNomZona, setCurrNomZona] = useState('');
  const [loading, setloading] = useState(false);
  const [Agregando, setAgregando] = useState(false);
  const [BajaLogica, setBajaLogica] = useState(false);
  const [editRowsModel, setEditRowsModel] = React.useState();
  const [modals, setmodals] = useState(false);
  const [ClaArticulo, setClaArticulo] = useState(0);
  const [NomArticulo, setNomArticulo] = useState('');
  const [ClaveZona, setClaveZona] = useState('');
  const [NomZona, setNomZona] = useState('');
  const [NomZonaedit, setNomZonaedit] = useState('');
  const [ClaArticuloedit, setClaArticuloedit] = useState('');
  const [ClaveZonaedit, setClaveZonaedit] = useState('');
  const [NomZonaeditnew, setNomZonaeditnew] = useState('');
  const [ClaveZonaeditnew, setClaveZonaeditnew] = useState('');
  const ipadress = getSessionItem('Ipaddress');
  const NumbUsuario = getSessionItem('NumUsuario');
  const [filtroclamat, setfiltroclamat] = useState([]);
  const [filtroclazona, setfiltroclazona] = useState([]);
  const [filtronomzona, setfiltronomzona] = useState([]);
  const [index, setindex] = useState('');

  const handleBlur = React.useCallback((params, event) => {
    event.stopPropagation();
  }, []);

  const [HeaderTable, setHeaderTable] = useState([
    {key: 'ClaArticulo', label: 'ClaArticulo'},
    {key: 'ClaveArticulo', label: 'ClaveArticulo'},
    {key: 'NomArticulo', label: 'NomArticulo'},
    {key: 'ClaZonaDescarga', label: 'ClaZonaDescarga'},
    {key: 'ClaveZonaDescarga', label: 'ClaveZonaDescarga'},
    {key: 'NomZonaDescarga', label: 'NomZonaDescarga'},

  ]);
  
    const csvReport = Zonas !== null
    ? {
        data: Zonas,
        headers: HeaderTable,
        filename: 'ZonasDescarga.csv',
      }
    : 0;

  console.log(NomZonaedit, NomZonaeditnew, ClaveZonaedit, ClaArticuloedit);
  useEffect(() => {
    if (editBoxValue !== 6) {
      setloading(true);
      const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
      /* eslint-disable */
      const data108 = {
        parameters: `{"ClaUbicacion":${editBoxValue},"ClaServicioJson":108,"Parametros":"@pnClaUbicacion=${editBoxValue}${
          CurrArticulo !== '' && CurrArticulo !== null ? config.Separador + '@pnClaArticulo=' + CurrArticulo : ''
        }${CurrClaZona !== '' && CurrClaZona !== null ? config.Separador + '@pnClaZona=' + CurrClaZona : ''}${
          CurrNomZona !== '' && CurrNomZona !== null ? config.Separador + '@psNomZonaDescarga=' + `${CurrNomZona}` : ''
        }"}`,
        tipoEstructura: 0,
      };
      /* eslint-enable */
      callApi(urlKrakenService, 'POST', data108, (res) => {
        setfiltronomzona(res.Result0.filter((v,i) => {
          return res.Result0.map((val)=> val.NomZonaDescarga).indexOf(v.NomZonaDescarga) === i
        }));
        setfiltroclamat(res.Result0.map(row => { return {NomArticulo:`${row.ClaveArticulo} - ${row.NomArticulo}`,ClaArticulo:row.ClaArticulo}}));
        setfiltroclazona(res.Result0.filter((v,i) => {
          return res.Result0.map((val)=> val.ClaveZonaDescarga).indexOf(v.ClaveZonaDescarga) === i
        }));
        setloading(false);
      });
    }
  }, []);

  const handleSave = () => {
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    /* eslint-disable */
    const data110 = {
      parameters: `{"ClaUbicacion":${editBoxValue},"ClaServicioJson":110,"Parametros":"@pnClaUbicacion=${editBoxValue}${
        config.Separador
      }@pnClaArticulo=${ClaArticulo}${config.Separador}@pnClaveZonaDescarga=${ClaveZona}${
        config.Separador
      }@psNomZonaDescarga=${NomZona}${config.Separador}@pnBajaLogica=${0}${
        config.Separador
      }@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@psNombrePcMod=${ipadress}${
        config.Separador
      }@pnAccionSp=${1}"}`,
      tipoEstructura: 0,
    };
    /* eslint-enable */
    callApi(urlKrakenService, 'POST', data110, (res) => {
      setmodals(false);
      const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
      /* eslint-disable */
      const data108 = {
        parameters: `{"ClaUbicacion":${editBoxValue},"ClaServicioJson":108,"Parametros":"@pnClaUbicacion=${editBoxValue}${
          CurrArticulo !== '' && CurrArticulo !== null ? config.Separador + '@pnClaArticulo=' + CurrArticulo : ''
        }${CurrClaZona !== '' && CurrClaZona !== null ? config.Separador + '@pnClaZona=' + CurrClaZona : ''}${
          CurrNomZona !== ''  && CurrNomZona !== null ? config.Separador + '@psNomZonaDescarga=' + `${CurrNomZona}` : ''
        }"}`,
        tipoEstructura: 0,
      };
      /* eslint-enable */
      callApi(urlKrakenService, 'POST', data108, (res) => {
        setZonas(res.Result0);
      });
    });
  };

  const handleeditstart = (e) => {
    setNomZonaedit(e.row.NomZonaDescarga);
    setClaveZonaedit(e.row.ClaveZonaDescarga);
    setClaArticuloedit(e.row.ClaArticulo);
    setindex(e.row.id);
  };

  const handleclose = () => {
  setClaArticulo('')
  setNomArticulo('')
  setClaveZona('')
  setNomZona('')
  setmodals(false)
  }

  const handleDelete = (e) => {
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    /* eslint-disable */
    const data110 = {
      parameters: `{"ClaUbicacion":${editBoxValue},"ClaServicioJson":110,"Parametros":"@pnClaUbicacion=${editBoxValue}${
        config.Separador
      }@pnClaArticulo=${e.row.ClaArticulo}${config.Separador}@pnClaveZonaDescarga=${
        e.row.ClaveZonaDescarga
      }${config.Separador}@psNomZonaDescarga=${e.row.NomZonaDescarga}${
        config.Separador
      }@pnBajaLogica=${1}${config.Separador}@pnClaUsuarioMod=${NumbUsuario}${
        config.Separador
      }@psNombrePcMod=${ipadress}${config.Separador}@pnAccionSp=${3}"}`,
      tipoEstructura: 0,
    };
    /* eslint-enable */
    console.log(data110)
    callApi(urlKrakenService, 'POST', data110, (res) => {
      setmodals(false);
      const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
      /* eslint-disable */
      const data108 = {
        parameters: `{"ClaUbicacion":${editBoxValue},"ClaServicioJson":108,"Parametros":"@pnClaUbicacion=${editBoxValue}${
          CurrArticulo !== '' && CurrArticulo !== null ? config.Separador + '@pnClaArticulo=' + CurrArticulo : ''
        }${CurrClaZona !== '' && CurrClaZona !== null ? config.Separador + '@pnClaZona=' + CurrClaZona : ''}${
          CurrNomZona !== ''  && CurrNomZona !== null ? config.Separador + '@psNomZonaDescarga=' + `${CurrNomZona}` : ''
        }"}`,
        tipoEstructura: 0,
      };
      /* eslint-enable */
      callApi(urlKrakenService, 'POST', data108, (res) => {
        setZonas(res.Result0);
      });
    });
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      margin: theme.spacing(5),
      padding: theme.spacing(0),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    paper2: {
      width: '80%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '20vw',
      padding: theme.spacing(0),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    clean: {
      position: 'relative',
    },
    divider: {
      width: 'fit-content',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '2%',
    },
    chipArea: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '20px',
      width: '200px',
    },
    buttonArea: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '2%',
      padding: '.5%',
    },
    label: {
      marginRight: '10px',
    },
    scheduler: {
      marginRight: '20px',
      marginLeft: '20px',
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
      backgroundColor: '#ff6a00',
      color: 'white',
    },
  }));
  const classes = useStyles();
  const handleSearch = () => {
    document.querySelector('.MuiDataGrid-virtualScroller').scrollTop = 0;
    if (editBoxValue !== 6) {
      setloading(true);
      const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
      /* eslint-disable */
      const data108 = {
        parameters: `{"ClaUbicacion":${editBoxValue},"ClaServicioJson":108,"Parametros":"@pnClaUbicacion=${editBoxValue}${
          CurrArticulo !== '' && CurrArticulo !== null ? config.Separador + '@pnClaArticulo=' + CurrArticulo : ''
        }${CurrClaZona !== ''  && CurrClaZona !== null? config.Separador + '@pnClaZona=' + CurrClaZona : ''}${
          CurrNomZona !== ''  && CurrNomZona !== null? config.Separador + '@psNomZonaDescarga=' + `${CurrNomZona}` : ''
        }"}`,
        tipoEstructura: 0,
      };
      /* eslint-enable */
      console.log(data108)
      callApi(urlKrakenService, 'POST', data108, (res) => {
        setZonas(res.Result0);
        setloading(false);
      });
    }
  };

  const handlezona = (event) => {
    setNomZona(event.target.value);
  };

  const handleclazona = (event) => {
    setClaveZona(event.target.value);
  };

  const handleBaja = () => {
    setBajaLogica(!BajaLogica);
  };

  const handleEdit = (e) => {
    const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
    /* eslint-disable */
    const data110 = {
      parameters: `{"ClaUbicacion":${editBoxValue},"ClaServicioJson":110,"Parametros":"@pnClaUbicacion=${editBoxValue}${
        config.Separador
      }@pnClaArticulo=${ClaArticuloedit}${config.Separador}@pnClaveZonaDescarga=${
        ClaveZonaeditnew !== '' ? ClaveZonaeditnew : ClaveZonaedit
      }${config.Separador}${ClaveZonaedit !== null ? '@pnClaZonaDescargaAnterior=' : ''}${
        ClaveZonaedit !== null ? ClaveZonaedit : ''
      }${ClaveZonaedit !== null ? config.Separador : ''}@psNomZonaDescarga=${
        NomZonaeditnew !== '' ? NomZonaeditnew : NomZonaedit
      }${config.Separador}${NomZonaedit !== null ? '@psNomZonaDescargaAnterior=' : ''}${
        NomZonaedit !== null ? NomZonaedit : ''
      }${NomZonaedit !== null ? config.Separador : ''}@pnBajaLogica=${0}${
        config.Separador
      }@pnClaUsuarioMod=${NumbUsuario}${config.Separador}@psNombrePcMod=${ipadress}${
        config.Separador
      }@pnAccionSp=${2}"}`,
      tipoEstructura: 0,
    };
    console.log(data110);
    /* eslint-enable */
    callApi(urlKrakenService, 'POST', data110, (res) => {
      setindex('');
      const urlKrakenService = `${config.KrakenService}/${24}/${config.Servicio}`;
      /* eslint-disable */
      const data108 = {
        parameters: `{"ClaUbicacion":${editBoxValue},"ClaServicioJson":108,"Parametros":"@pnClaUbicacion=${editBoxValue}${
          CurrArticulo !== '' ? config.Separador + '@pnClaArticulo=' + CurrArticulo : ''
        }${CurrClaZona !== '' ? config.Separador + '@pnClaZona=' + CurrClaZona : ''}${
          CurrNomZona !== '' ? config.Separador + '@psNomZonaDescarga=' + `${CurrNomZona}` : ''
        }"}`,
        tipoEstructura: 0,
      };
      /* eslint-enable */
      callApi(urlKrakenService, 'POST', data108, (res) => {
        setZonas(res.Result0);
      });
    });
  };

  const handleAdd = () => {
    if (editBoxValue !== 6 && Zonas !== null) {
      setmodals(true);
      setAgregando(true);
      setAgregando(false);
    }
  };

  const handleEditRowModelChange = React.useCallback(
    (model) => {
      console.log(model);
      setNomZonaeditnew(
        index !== '' && model[index] !== undefined ? model[index].NomZonaDescarga.value : ''
      );
      setClaveZonaeditnew(
        index !== '' && model[index] !== undefined ? model[index].ClaveZonaDescarga.value : ''
      );
      setEditRowsModel(model);
    },
    [index]
  );

  const onClearClick = () => {
    setCurrArticulo('');
    setCurrClaZona('');
    setCurrNomZona('');
    setZonas([]);
  };

  const onArtChanged = (e) => {
    setCurrArticulo(e.value);
  };

  const onClaChanged = (e) => {
    setCurrClaZona(e.value);
  };

  const onNomChanged = (e) => {
    setCurrNomZona(e.value);
  };

  return Valores ? (
    <div className="Descarga">
      <Modal isOpen={modals} style={customStyles}>
        <Paper className={classes.paper2}>
          <Seleccion setClaArticulo={setClaArticulo} setNomArticulo={setNomArticulo} />
          <Input
            label={NomArticulo === '' ? 'Nombre Material' : null}
            value={NomArticulo && NomArticulo.split('-')[1]}
            disabled
            style={{ backgroundColor: '#d3d3d3' }}
          />
          <Input type="number" onChange={handleclazona} value={ClaveZona} label="Clave Zona" />
          <Input value={NomZona} onChange={handlezona} label="Nombre Zona" />
          <i
            className="fas fa-paper-plane fa-lg"
            onClick={ClaArticulo=== '' || NomArticulo === '' || ClaveZona === '' || NomZona === '' ? null :handleSave}
            style={{ color: 'blue', cursor: 'pointer', marginTop: 'auto', marginBottom: 'auto' }}
          >
          </i>
          <i
            className="fas fa-window-close fa-lg"
            onClick={handleclose}
            style={{ color: 'red', cursor: 'pointer', marginTop: 'auto', marginBottom: 'auto' }}
          >
          </i>
        </Paper>
      </Modal>
      <Paper className={classes.paper}>
        <div className={classes.divider}>
          <Select
            label="Articulo: &nbsp;"
            currVal={CurrArticulo}
            onValueChanged={onArtChanged}
            data={filtroclamat}
            caption="NomArticulo"
            dataid="ClaArticulo"
          >
          </Select>
        </div>
        <div className={classes.divider}>
          <Select
            label="Clave Zona:&nbsp;&nbsp; "
            currVal={CurrClaZona}
            data={filtroclazona.filter((filtro) => filtro.ClaveZonaDescarga !== null)}
            onValueChanged={onClaChanged}
            caption="ClaveZonaDescarga"
            dataid="ClaveZonaDescarga"
          >
          </Select>
        </div>
        <div className={classes.divider}>
          <Select
            label="Nombre Zona:&nbsp;&nbsp;"
            currVal={CurrNomZona}
            data={filtronomzona.filter((filtro) => filtro.NomZonaDescarga !== null)}
            onValueChanged={onNomChanged}
            caption="NomZonaDescarga"
            dataid="NomZonaDescarga"
          >
          </Select>
        </div>
        <div className={classes.buttonArea}>
          <br />
          <Button
            onClick={!loading ? handleSearch : null}
            className={
              !loading ? 'animation-on-hover float-right' : 'animation-on-hover float-right grey'
            }
            color="success"
          >
            <i className="fa fa-search" aria-hidden="true"></i>
          </Button>
        </div>
        <div className={classes.buttonArea}>
          <br />
          <Button className="animation-on-hover float-right" color="danger" onClick={onClearClick}>
            <i className="fas fa-minus"></i>
          </Button>
        </div>
      </Paper>
      {Zonas !== null && (
        <Fab
          size="small"
          color="primary"
          aria-label="add"
          onClick={Agregando !== true ? handleAdd : null}
          style={{ position: 'fixed', marginLeft: '4%' }}
        >
          <AddIcon />
        </Fab>
      )}
      <Card style={{ width: '84%', margin: 'auto', marginTop: '50px' }}>
        <CardHeader>
          <div style={{display: "inline-flex",float:"right"}}>
            {Zonas !== null ? (
              <CSVLink {...csvReport} style={{ color: 'white' }}>
                <Tooltip title="Exportar a Excel">
                  <IconButton style={{color:'white'}}>
                    <i className="fas fa-file-download" style={{ cursor: 'pointer' }}></i>
                  </IconButton>
                </Tooltip>
              </CSVLink>
              ) : null}  
            <div>
              <input
                value={BajaLogica}
                onClick={handleBaja}
                type="checkbox"
                style={{marginTop:"21px",marginRight:"2px"}}
              />
              <span style={{ color: 'white', fontSize: '12px', float: 'right',marginTop:"20px"}}>
                Bajas Lógicas{' '}
              </span>
            </div>
          </div>
        </CardHeader>
        <Paper sx={{ width: '100%' }}>
          <Box
            sx={{
              height: 400,
              width: 1,
              '& .MuiDataGrid-cell--editing': {
                bgcolor: 'rgb(255,215,115, 0.19)',
                color: '#1a3e72',
                '& .MuiInputBase-root': {
                  height: '100%',
                },
              },
              '& .Mui-error': {
                bgcolor: (theme) => `rgb(126,10,15, ${theme.palette.mode === 'dark' ? 0 : 0.1})`,
                color: (theme) => (theme.palette.mode === 'dark' ? '#ff4343' : '#750f0f'),
              },
            }}
          >
            <DataGrid
              editMode="row"
              rows={
                Zonas && BajaLogica
                  ? Zonas.filter((zona) => zona.BajaLogica === 1)
                  : Zonas && Zonas.filter((zona) => zona.BajaLogica === 0)
              }
              columns={columns}
              onRowEditStart={(e) => handleeditstart(e)}
              onRowEditCommit={(e) => handleEdit(e)}
              onCellClick={(e) => (e.field === 'Accion' ? handleDelete(e) : null)}
              editRowsModel={editRowsModel}
              onEditRowsModelChange={handleEditRowModelChange}
              onCellBlur={handleBlur}
            />
          </Box>
        </Paper>
      </Card>
    </div>
  ) : (
    <div style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', minHeight: '480px' }}>
      <div style={{ width: '40px', marginLeft: 'auto', marginRight: 'auto', paddingTop: '200px' }}>
        <CircularProgress />
      </div>
    </div>
  );
}

const columns = [
  {
    field: 'Accion',
    headerName: '',
    sortable: false,
    width: 100,
    disableClickEventBubbling: true,
    headerAlign: 'center',
    renderCell: (rows) => {
      return (
        <div style={{ display: 'flex', marginLeft: 'auto', marginRight: 'auto' }}>
          <div style={{ cursor: 'pointer', margin: '1vw' }}>
            <i className="fas fa-trash fa-md fa-s"></i>
          </div>
        </div>
      );
    },
  },
  {
    field: 'ClaveArticulo',
    headerName: 'Clave Artículo',
    width: 180,
    editable: false,
    headerAlign: 'center',
  },
  {
    field: 'NomArticulo',
    headerName: 'Descripción',
    width: 300,
    editable: false,
    headerAlign: 'center',
  },
  {
    field: 'ClaveZonaDescarga',
    headerName: 'Clave Zona Descarga',
    width: 200,
    editable: true,
    headerAlign: 'center',
  },
  {
    field: 'NomZonaDescarga',
    headerName: 'Nombre Zona Descarga',
    width: 200,
    editable: true,
    headerAlign: 'center',
  },
];
