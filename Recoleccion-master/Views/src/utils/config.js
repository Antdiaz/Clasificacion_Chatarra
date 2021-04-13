const config = {
  LoginMensaje: 'Powered by Deacero',
  LoginLogoTamanio: '48px',
  ApiKey: 'A70F5BA0-3541-492C-802F-087FE810184A',

  // ** Desarrollo
  UrlLoginServer: 'https://sweetsrv.azurewebsites.net/LoginSandbox/authenticate',
  UrlApiProject: 'http://localhost:5000/',

  // ** Kraken Desarrollo
  KrakenService: 'https://krakenapi.deacero.com/SandboxServices',

  // Debugging mode
  DebuggingMode: true,
};

function GetToken() {
  return sessionStorage.getItem('Token');
}

export { config, GetToken };
