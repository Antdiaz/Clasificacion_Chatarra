
<p  align="center">

# Karma

</p>

Interface guía, código estandarizado y plataforma colaborativa para desarrollo de nuevos productos tecnológicos de DEACERO

## Version 1.1.0
Versión que se encuentra actualmente publicada en el [sitio](http://karma.deacero.com) y se considera estable.

## Requisitos Previos
* [Visual Studio Code](https://code.visualstudio.com/)
* [NodeJs](https://nodejs.org/es/)
* [Git](https://git-scm.com/download/win)
* [Powershell](https://docs.microsoft.com/en-us/powershell)
* [SQL Server Management Studio](https://www.microsoft.com/es-mx/download/details.aspx?id=29062)

## Instalación

1. Crear una carpeta en el directorio que desee.
2. Abrir esta con Visual Studio Code.
3. Abrir una nueva terminal apuntando al directorio creado (Terminal => New Terminal) y ejecutar los siguientes comandos

```bash
git clone https://github.com/DeAceroDLabs/Karma.git
```

4. Apuntar a directorio Views en la terminal y ejecutar los siguientes comandos

```bash
cd Views
npm install
```

5. Una vez instalado ejecutar los sig. componentes para el correcto funcionamiento:

Instalar compilador sass para la funcionalidad del tema visual
```bash
npm install node-sass
```

Instalar React Router Dom
```bash
npm install react-router-dom
```

Instalar Perfect Scroll
```bash
npm install perfect-scrollbar -s
```

Instalar ReactStrap
 ```bash
npm install reactstrap
```

Instalar DevExtreme
```bash
npm install devextreme@20.1 devextreme-react@20.1 --save --save-exact
```

Instalar HighCharts
```bash
npm install highcharts highcharts-react-official
```

Instalar SweetAlert(DLABS)
```bash
npm install react-bootstrap-sweetalert
```

6. Una vez terminado lo anterior ejecutar el sig. comando para visualizar en http://localhost:

```bash
npm start
```


## Estructura de archivos

### Views
  Contiene el código referente a la parte grafica de Karma.
  
  - **src/**
	En esta carpeta se encuentran todos las carpetas con archivos js que componen la interfaz gráfica

    - **assets/**
    Contiene los archivos consumidos por la interfaz gráfica, tales como los estilos o imagenes cargadas.
    
    - **components/**
    En esta carpeta se encuentran componentes prefabricados en react js para poder consumir desde cualquier parte de la página, estos componentes formaran parte de la mayoría de las pantallas.

    - **layout/**
    Contiene el archivo responsable de ser todo el marco de trabajo en donde se despliegan todas las pantallas, es decir, la pantalla padre.
    
    - **utils/**
    Contiene archivos js que son llamadas regularmente desde los componentes, además de archivos con configuraciones pre establecidas para el correcto funcionamiento de la interfaz.

    - **views/**
    En esta carpeta se encuentran las vistas que conforman la interfaz gráfica

```bash
Views:.
├───public 					//archivos publicos(iconos,metadata,imagenes de Karma)
└───src						//codigo Fuente
    ├───assets					//especificamente los archivos de modificaciones puramente visuales
    │   ├───css					//archivos css
    │   ├───fonts				//archivos de fuentes tipograficas
    │   ├───img					//archivos de imagen de todo el proyecto
    │   └───scss				//archivos .sass precompilados
    │       └───black-dashboard-pro-react       //especificamente los archivos de modificaciones puramente visuales de la Plantilla Principal
    ├───components								
    │   └───core				//componentes genericos y codigo reutilizable
    ├───layout					//contenedor principal o MasterPage 
    ├───utils					//archivos de codigo que contienen funciones (peticiones a Apis,manejo de errores) 
    └───views					//contiene las vistas, ejemplos y todo lo relacionado a entornos graficos desarrollados

```

### Como agregar una nueva pantalla?

En la carpeta views de la estructura anterior crear una nueva carpeta
- Nombrarla referente al nuevo desarrollo 
- Crear los archivos (.js) necesarios para esa pantalla (clic derecho/menú/Nuevo Archivo -> Nombrar y colocar extensión (.js))
- Estructura base de componente react (Componente.js)

 ```javascript
import React from 'react'

class MyComponent extends React.Component {
  constructor () {
   super()
  }

render () {
   return (
    	<div>
    		<span>Hola!, soy un componente</span>
    	</div>
    	)
 }
}
```
 Para más referencias sobre React | [Documentación - React](https://reactjs.org/docs/hello-world.html)

### Como agregar nueva opción en el menú?

En la carpeta Views existe un archivo llamado menu.js
Para agregar o quitar un nuevo componente al menu usamos el sig. ejemplo

### Como correr en pruebas y producción

En la carpeta Views > src > utils > config.js
Quitar los comentarios de las configuraciones a utilizar y comentar la que no se quiera activa

Producción ->
UrlLoginServer: 'https://sweetsrv.azurewebsites.net/Login/authenticate'
KrakenService: 'https://krakenapi.deacero.com/KrakenServices/'
Servicio:34
Bloque:48

Pruebas ->
UrlLoginServer: 'https://sweetsrv.azurewebsites.net/LoginSandbox/authenticate'
KrakenService: 'https://krakenapi.deacero.com/SandboxServices'
Servicio:37
Bloque:50


**- Opción no colapsable o anidada:**
```javascript
	
	import NuevoComponente from "./views/NuevaCarpeta/NuevoComponente.js";

	export var menu = [
	  {
		  path: "/NuevoComponente",		//Ruta que hace referencia al componente creado
		  name: "NuevoComponente",		//Nombre que aparece en el menú
		  icon: "tim-icons icon-components",	//Icono default (https://demos.creative-tim.com/marketplace/black-dashboard-pro/examples/components/icons.html)
		  component: NuevoComponente,		//Objeto Importado que hace referencia a un componente de React	
		  layout: "/Layout",			//Layout , página principal o MasterPage al que se encuentra asociado
	  }
```
**- Opción colapsable o anidada:**

```javascript
	import NuevoComponente from "./views/NuevaCarpeta/NuevoComponente.js";
	import NuevoComponente2 from "./views/NuevaCarpeta/NuevoComponente2.js";

	export var menu = [
	 {
	   collapse: true,			//Estado inicial true: cerrado false: abierto
       	path: "/Componentes",			//Ruta que hace referencia al componentes creados
       	name: "NuevosComponentes",		//Nombre que aparece en el menú
       	state: "openComponentesNuevos",		//Estado para el control (Funcionalidad Interna)
       	icon: "tim-icons icon-app",		//Icono default(https://demos.creative-tim.com/marketplace/black-dashboard-pro/examples/components/icons.html)
       	views: [				//Contenedor de Opciones
	  {
		  path: "/NuevoComponente",		//Ruta que hace referencia al componente creado
		  name: "NuevoComponente",		//Nombre que aparece en el menu
		  icon: "tim-icons icon-components",	//Icono default (https://demos.creative-tim.com/marketplace/black-dashboard-pro/examples/components/icons.html)
		  component: NuevoComponente,		//Objeto Importado que hace referencia a un componente de React	
		  layout: "/Layout",			//Layout , página principal o MasterPage al que se encuentra asociado
	  },
	  {
		  path: "/NuevoComponente2",		//Ruta que hace referencia al componente creado
		  name: "NuevoComponente2",		//Nombre que aparece en el menú
		  icon: "tim-icons icon-components",	//Icono default (https://demos.creative-tim.com/marketplace/black-dashboard-pro/examples/components/icons.html)
		  component: NuevoComponente2,		//Objeto Importado que hace referencia a un componente de React	
		  layout: "/Layout",			//Layout , página principal o MasterPage al que se encuentra asociado
	  }
	}
```

### Como consumir una api de net Core desde React?

Se utiliza un método propio de utils.js que se muestra a continuación:

```javascript
/**
* Realiza una petición a una URL especificada.
 *
 * @param {String} url Dirección donde se realizara la petición
 * @param {String} method Tipo de petición a ejecutar (POST, GET, PUT, DELETE)
 * @param {JSON} [data={}] Objeto que se adjuntará al body de la petición
 * @returns
 */
 async function callApi(url, method, data = {})
```
 y el modo de utilizarlo es el siguiente:

```javascript
const url = UrlAPI + "controlador/método/parámetros";
const data ={parametro1:"",parametroN:""};

callApi(url, method, data)
 .then((res) => {
      //Si la respuesta es exitosa
      if (res.success) {
         //Hacer pre proceso necesario
      }
   })
   .catch((err) => {
	//Manejar un mensaje de error
   });
```



#### Tecnología y lenguajes

| Referencias| Versión | Descripción| Url |
| -- | --: | -- |  :--: |
| Javascript | 2015  | Lenguaje utilizado. | [Ver](https://developer.mozilla.org/es/docs/Web/JavaScript)
| React | 16.13 | Framework utilizado como base para toda la aplicación  |[Ver](https://es.reactjs.org/)
| Reactstrap | 8.4.1 | Wrapper de bootstrap para React | [Ver](https://reactstrap.github.io/)
| Highcharts | 8.1.2 | Genera todas las graficas mostradas por la aplicación | [Ver](https://www.highcharts.com/blog/tutorials/highcharts-wrapper-for-react-101/)
| DevExpress | 20.1.8 | Utilizado para el manejo de contoles/componentes de una manera mas intuitiva  | [Ver](https://js.devexpress.com/Demos/WidgetsGallery/)
____


## Dudas y comentarios.
Todas las dudas y comentarios son recibidas en el canal de [Slack](https://deacerolabs.slack.com/archives/CK76L7430) donde buscamos tener una comunicación activa con todos los miembros del equipo de desarrollo.

## Copyright
[DEACERO-DLabs](https://www.deacero.com/acerca-de/dlabs)

## Dudas y comentarios.
Todas las dudas y comentarios son recibidas en el canal de [Slack](https://deacerolabs.slack.com/archives/CK76L7430) donde buscamos tener una comunicación activa con todos los miembros del equipo de desarrollo.

## Copyright
[DEACERO-DLabs](https://www.deacero.com/acerca-de/dlabs)
