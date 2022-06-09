const config = {
  LoginMensaje: 'Powered by Deacero',
  LoginLogoTamanio: '48px',
  ApiKey: 'A70F5BA0-3541-492C-802F-087FE810184A',

  // ** Desarrollo
  UrlLoginServer: 
  //  'https://sweetsrv.azurewebsites.net/LoginSandbox/authenticate',
   'https://sweetsrv.azurewebsites.net/Login/authenticate',
  UrlApiProject: 'http://localhost:5000/',

  // ** Kraken Desarrollo
  KrakenService: 
  // 'https://krakenapi.deacero.com/SandboxServices',
   'https://krakenapi.deacero.com/KrakenServices/',
  
  // Debugging mode
  DebuggingMode: true,

  // Producción Servicio: 34
  // Pruebas Servicio:37
  Servicio:34,
  // Producción Bloque: 48
  // Pruebas Bloque:50
  Bloque:48,
  Separador:'<@@>',
  idBote:524225,
  idElect:301522
  
  // 3322376
};

function GetToken() {
  return sessionStorage.getItem('Token');
}

export { config, GetToken };
