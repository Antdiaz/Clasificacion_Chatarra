
<p  align="center">

# Karma-Services

</p>

Interface guía, código estandarizado y plataforma colaborativa para desarrollo de nuevos productos tecnológicos de DEACERO. Esta es la parte de Karma de los servicios de netCore.

## Requisitos Previos
* [Netcore runtime](https://dotnet.microsoft.com/download/dotnet-core/current/runtime)
* [Netcore SDK](https://dotnet.microsoft.com/download/dotnet-core/thank-you/sdk-3.1.403-windows-x64-installer)

## Instalación

1. Crear una carpeta en el directorio que desee.
2. Abrir esta con Visual Studio Code.
3. Abrir una nueva terminal apuntando al directorio creado (Terminal => New Terminal) y ejecutar los siguientes comandos

```bash
git clone https://github.com/DeAceroDLabs/Karma.git
```

4. Apuntar a directorio Services en la terminal y ejecutar los siguientes comandos

```bash
cd Services
dotnet build
```

5. Una vez instalado debemos agregar las sig. extensiones para el correcto funcionamiento:

* [C# for Visual Studio Code (powered by OmniSharp)](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
* [C# IDE Extensions for VSCode](https://marketplace.visualstudio.com/items?itemName=jchannon.csharpextensions)
* [Generate C# XML documentation comments for ///](https://marketplace.visualstudio.com/items?itemName=k--kato.docomment)
* [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)





## Estructura de archivos

### Services
  Contiene el código referente a la parte de servicios de Karma.
  
  - **karma.domain/**
	En esta carpeta se encuentran todas las carpetas que conforman los servicios.

    - **karma.domain/Models**
    Carpeta donde encuentran los modelos para las clases de los servicios.
    - **karma.domain/Models/Entity**
    Carpeta donde se encuentran las entidades para todos los servicios de Karma.
    - **karma.domain/Models/Global**
    Carpeta donde se encuentran los archivos con configuración global para detallar errores, conexión con token que todos los servicios tienen y la respuesta que retorna la información como KarmaResponse.
    - **karma.domain/Repository**
    Carpeta que contiene los repositorios de las vistas, kraken y otros que permite la configuración de los servicios
    - **karma.domain/Services**
    Carpeta que contiene los archivos cs con los métodos de los servicios de Karma 
    - **karma.domain/Services/Interfaces**
    Carpeta que contiene los archivos para la interfaz de los servicios de Karma

- **karma.repository.kraken/Repository**
Carpeta que contiene la interface para obtener consumir la información de Kraken
    
- **karma.repository.sql/Repository**
En esta carpeta se encuentran los métodos de conexión con las tablas de SQL de los servicios de Karma

- **karma.webapi/**
Carpeta que contiene el binder, los controllers y los DTO's de los servicios de Karma
    
    - **karma.webapi/Binders**
Carpeta que contiene un ClientBinder que revisa las peticiones y trata de vincular el token del cliente con la petición al servicio que quiere hacer.

    - **karma.webapi/Controllers**
Carpeta que contiene los controladores de los servicios de Karma
    
    - **karma.webapi/DTOs**
Carpeta que contiene los DTO's de los servicios de karma
    

    

```bash
Services:.
├───karma.domain                			//Carpeta  con los archivos de todos los servicios
    ├───karma.domain/Models		          //modelos para las clases de los servicios.
    │   ├───karma.domain/Models/Entity   // entidades para todos los servicios de Karma.
    │   ├───karma.domain/Models/Global	// archivos con configuración global de los servicios
    ├───karma.domain/Repository			//  repositorios   para configuración de los servicios  
    ├───karma.domain/Services			//métodos de los servicios de Karma
    ├───karma.domain/Services/Interfaces      //interfaz de los servicios de Karma

├───karma.repository.kraken/Repository	//interface para obtener consumir la información de Kraken
├───karma.repository.sql/Repository     // conexión con las tablas de SQL de los servicios de Karma

├───karma.webapi            //Contiene binder, controllers y DTO's de los servicios
    ├───karma.webapi/Binders       //contiene un binder para los token's de los clientes
    │   ├───karma.webapi/Controllers //controladores de los servicios de Karma
    │   ├───karma.webapi/DTOs //contiene los DTO's de los servicios de karma

```

### ¿Cómo agregar un nuevo servicio?

1.- En la carpeta DTO's de la estructura anterior:

- Crear los archivos (.cs) necesarios para ese servicio (clic derecho/Nuevo Archivo -> Nombrar y colocar extensión (.cs)) siguiendo la nomenclatura: <Nombredelservicio>DTO

- Estructura base de un DTO para un servicio:

 ```cs
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace karma.webapi.DTOs
{
    public class ServicioDTO
    {
        /// <summary>
        /// nomSERVICIO requerido para hacer una petición de Servicio
        /// </summary>
        /// <value>string</value>
        [Required(ErrorMessage = "Por favor especifique el nombre del Servicio.")]
        [JsonProperty(propertyName: "nomServicio")]
        public string NomSERVICIO { get; set; }

        /// <summary>
        /// descripcion requerido para hacer una petición de Servicio
        /// </summary>
        /// <value>string</value>
        [Required(ErrorMessage = "Por favor especifique la descripción del Servicio.")]
        [JsonProperty(propertyName: "descripcion")]
        public string Descripcion { get; set; }

        /// <summary>
        /// precio requerido para hacer una petición de Servicio
        /// </summary>
        /// <value>decimal</value>
        [Required(ErrorMessage = "Por favor especifique el precio del Servicio.")]
        [JsonProperty(propertyName: "precio")]
        public decimal Precio { get; set; }

        /// <summary>
        /// claUnidad requerido para hacer una petición del Servicio
        /// </summary>
        /// <value>int</value>
        [Required(ErrorMessage = "Por favor especifique el claUnidad.")]
        [JsonProperty(propertyName: "claUnidad")]
        public int ClaUnidad { get; set; }
        
        /// <summary>
        /// Campo utilizado en dado caso de hacer una baja en un Servicio
        /// </summary>
        /// <value>int</value>
        [JsonProperty(propertyName: "bajaLogica")]
        public int BajaLogica { get; set; }
    }
}
```


2.- En la carpeta Controllers de la estructura anterior:

- Crear los archivos (.cs) necesarios para ese servicio (clic derecho/Nuevo Archivo -> Nombrar y colocar extensión (.cs)) siguiendo la nomenclatura: <Nombredelservicio>Controller

- Estructura base de un Controller para un servicio:

 ```cs
using System.ComponentModel.DataAnnotations;
using karma.domain.Models.Entity;
using karma.domain.Services.Interfaces;
using karma.webapi.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace karma.webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ServicioController : ControllerBase //Cambiar ServicioController por <Nombre del servicio deseado>Controller
    {
        private IServicioService _productoService;

        public ServicioController(IServicioService productoService)
        {
            _servicioService = servicioService;
        }
        /// <summary>
        /// API que retorna todos los productos
        /// </summary>
        [HttpGet("getProductos")]
        public IActionResult GetProductos()
        {
            return Ok(this._servicioService.GetProductos());
        }
        /// <summary>
        /// API que retorna un producto a partir del claProducto
        /// </summary>
        /// <param name="claProducto"></param>
        [HttpGet("getProducto/{claProducto}")]
        public IActionResult GetProducto([Required]int claProducto)
        {
            return Ok(this._servicioService.GetServicio(claProducto));
        }
        /// <summary>
        /// API que agrega un Producto nuevo
        /// </summary>
        /// <param name="producto"></param>
        [HttpPost("addProducto")]
        public IActionResult AddServicio([FromBody] ServicioDTO producto)
        {
            var productoModel = new Producto {
                NomProducto = producto.NomProducto,
                Descripcion = producto.Descripcion,
                Precio = producto.Precio,
                ClaUnidad = producto.ClaUnidad
            };
            return Ok(this._servicioService.AddServicio(servicioModel));
        }

        /// <summary>
        /// API que actualiza un Producto
        /// </summary>
        /// <param name="claProducto"></param>
        /// <param name="nomProducto"></param>
        /// <param name="producto"></param>
        [HttpPut("updateProducto/{claProducto}")]
        public IActionResult UpdateProducto([Required]int claProducto, [Required]string nomProducto, [FromBody] ProductoDTO producto)
        {
            var productoModel = new Producto {
                ClaProducto = claProducto,
                NomProducto = nomProducto,
                Descripcion = producto.Descripcion,
                Precio = producto.Precio,
                ClaUnidad = producto.ClaUnidad,
                BajaLogica = producto.BajaLogica
            };
            return Ok(this._servicioService.UpdateProducto(productoModel));
        }
    }
}
```

3.- En la carpeta Repository de karma.repository.sql de la estructura anterior:

- Crear los archivos (.cs) necesarios para ese servicio (clic derecho/Nuevo Archivo -> Nombrar y colocar extensión (.cs)) siguiendo la nomenclatura: <Nombredelservicio>Repository

- Tener listo el SP de SQL de donde se hará la petición de información

- Estructura base de un Repository para un servicio:

 ```cs
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using karma.domain.Models.Entity;
using karma.domain.Repository;
using karma.domain.Services.Interfaces;

namespace karma.repository.sql.Repository
{

    //Implementar interface en repository karma.domain
    public class ProductoRepository : IEntityRepository<Producto>
    {
        private const string PRODUCTO_IU = "krmsch.KrmProductoIU"; //SP de SQL
        private const string PRODUCTO_SEL = "krmsch.KrmProductoSel"; //SP de SQL
        private readonly IAppSettings _appSettings;
        public ProductoRepository(IAppSettings appSettings)
        {
            _appSettings = appSettings;
        }

        /// <summary>
        /// Método que hace conexión con la tabla SQL PRODUCTO_IU y añade un producto
        /// </summary>
        /// <param name="producto"></param>
        /// <returns>Regresa el producto añadido</returns>
        public Producto Add(Producto producto)
        {
            var _producto = new Producto();

            using (IDbConnection con = new SqlConnection(_appSettings.Section["ConnectionString"]))
            {
                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@pnClaProducto", 0);
                parameters.Add("@psNomProducto", producto.NomProducto);
                parameters.Add("@psDescripcion", producto.Descripcion);
                parameters.Add("@pnPrecio", producto.Precio);
                parameters.Add("@pnClaUnidad", producto.ClaUnidad);
                parameters.Add("@pnBajaLogica", 0);
                parameters.Add("@pnClaUsuarioMod", 0);
                parameters.Add("@psNombrePcMod", "DLABSDEV");

                _producto = con.Query<Producto>(
                    PRODUCTO_IU, 
                    parameters, 
                    commandType: CommandType.StoredProcedure
                    ).FirstOrDefault();
            }

            return _producto;
        }
        /// <summary>
        /// Método que hace conexión con la tabla de SQL PRODUCTO_IU y actualiza un producto 
        /// </summary>
        /// <param name="producto"></param>
        /// <returns>Regresa el producto actualizado</returns>
        public Producto Update(Producto producto)
        {
            var _producto = new Producto();

            using (IDbConnection con = new SqlConnection(_appSettings.Section["ConnectionString"]))
            {
                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@pnClaProducto", producto.ClaProducto);
                parameters.Add("@psNomProducto", producto.NomProducto);
                parameters.Add("@psDescripcion", producto.Descripcion);
                parameters.Add("@pnPrecio", producto.Precio);
                parameters.Add("@pnClaUnidad", producto.ClaUnidad);
                parameters.Add("@pnBajaLogica", producto.BajaLogica);
                parameters.Add("@pnClaUsuarioMod", 0);
                parameters.Add("@psNombrePcMod", "DLABSDEV");

                _producto = con.Query<Producto>(
                    PRODUCTO_IU, 
                    parameters, 
                    commandType: CommandType.StoredProcedure
                    ).FirstOrDefault();
            }

            return _producto;
        }
        /// <summary>
        /// Método que hace conexión con la tabla de SQL PRODUCTO_SEL y obtiene el producto
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Regresa el producto especificado</returns>
        public Producto Get(int id)
        {
            var _producto = new Producto();

            using (IDbConnection con = new SqlConnection(_appSettings.Section["ConnectionString"]))
            {
                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@pnClaProducto", id);

                _producto = con.Query<Producto>(
                    PRODUCTO_SEL, 
                    parameters, 
                    commandType: CommandType.StoredProcedure
                    ).FirstOrDefault();
            }

            return _producto;
        }

        /// <summary>
        /// Método que hace conexión con la tabla de SQL PRODUCTO_SEL y obtiene todos los productos
        /// </summary>
        /// <returns>Regresa todos los productos existentes</returns>
         public IQueryable<Producto> GetAll()
        {
            IQueryable<Producto> _productos = null;

            using (IDbConnection con = new SqlConnection(_appSettings.Section["ConnectionString"]))
            {
                if (con.State == ConnectionState.Closed)
                {
                    con.Open();
                }

                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@pnClaProducto", 0);

                _productos = con.Query<Producto>(
                    PRODUCTO_SEL, 
                    parameters, 
                    commandType: CommandType.StoredProcedure
                    ).AsQueryable<Producto>();
            }

            return _productos;
        }

    }
}
```

4.- En la carpeta Entity de la estructura anterior:

- Crear los archivos (.cs) necesarios para ese servicio (clic derecho/Nuevo Archivo -> Nombrar y colocar extensión (.cs)) siguiendo la nomenclatura: <Nombredelservicio>

- Estructura base de Entity para un servicio:

 ```cs
namespace karma.domain.Models.Entity
{
    public class Servicio : Base
    {
        public int ClaProducto { get; set; }
        public string NomProducto { get; set; }
        public decimal Precio { get; set; }
        public int ClaUnidad { get; set; }
        public string NomUnidad { get; set; }
        public string Descripcion { get; set; }
        public int Cantidad { get; set; }
    }
}
```


### ¿Cómo consumir una api de netCore desde Postman?

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



## Dudas y comentarios.
Todas las dudas y comentarios son recibidas en el canal de [Slack](https://deacerolabs.slack.com/archives/CK76L7430) donde buscamos tener una comunicación activa con todos los miembros del equipo de desarrollo.

## Copyright
[DEACERO-DLabs](https://www.deacero.com/acerca-de/dlabs)
