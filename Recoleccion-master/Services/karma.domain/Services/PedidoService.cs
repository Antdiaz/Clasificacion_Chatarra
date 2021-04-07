using System;
using System.Collections.Generic;
using System.Linq;
using karma.domain.Models.Entity;
using karma.domain.Models.Global;
using karma.domain.Repository;
using karma.domain.Services.Interfaces;

namespace karma.domain.Services
{
    public class PedidoService : IPedidoService
    {
        readonly IPedidoRepository _pedidoRepository;
        readonly IDataRepository _dataRepository;

        public PedidoService(IPedidoRepository pedidoRepository, IDataRepository dataRepository)
        {
            _pedidoRepository = pedidoRepository;
            _dataRepository = dataRepository;
        }

        /// <summary>
        ///  Método que agrega un pedido
        /// </summary>
        /// <param name="pedido"></param>
        /// <returns>KarmaResponse con el pedido nuevo</returns>
        public KarmaResponse AddPedido(Pedido pedido)
        {
            var _pedido = _pedidoRepository.AddPedido(pedido);

            if (pedido.Archivos.Count > 0)
            {
                var parametros = new Dictionary<string, object>();
                foreach (PedidoArchivo archivo in pedido.Archivos)
                {
                    parametros.Add("@psNombre", archivo.Nombre);
                    parametros.Add("@pbArchivo", archivo.Archivo);
                    parametros.Add("@psTipo", archivo.Tipo);
                    parametros.Add("@pnClaPedido", _pedido.ClaPedido);
                    parametros.Add("@pnClaUsuarioMod", archivo.ClaUsuarioMod);
                    parametros.Add("@psNombrePcMod", archivo.NombrePcMod);

                    var _archivo = _dataRepository.AddStoreProcedureData<PedidoArchivo>("krmsch.KrmTraPedidoArcI", parametros);

                    parametros.Clear();
                }
            }

            KarmaResponse result = new KarmaResponse
            {
                Data = _pedido
            };

            return result;
        }

        /// <summary>
        /// Método que retorna los pedidos del usuario
        /// </summary>
        /// <param name="claUsuario"></param>
        /// <returns>KarmaResponse con los pedidos del usuario</returns>
        public KarmaResponse GetPedidosUsuario(int claUsuario)
        {
            var pedidos = _pedidoRepository.GetAll()
                            .Where(x => x.ClaUsuario == claUsuario)
                            .ToList();

            KarmaResponse result = new KarmaResponse
            {
                Data = pedidos
            };

            return result;
        }

        /// <summary>
        /// Método que retorna los pedidos del producto
        /// </summary>
        /// <param name="claProducto"></param>
        /// <returns>KarmaResponse con los pedidos del producto</returns>
        public KarmaResponse GetPedidosProducto(int claProducto)
        {
            var pedidos = _pedidoRepository.GetAll()
                            .Where(x => x.ClaProducto == claProducto)
                            .ToList();

            KarmaResponse result = new KarmaResponse
            {
                Data = pedidos
            };

            return result;
        }

        /// <summary>
        /// Método que retorna una gráfica con los pedidos del usuario
        /// </summary>
        /// <param name="claUsuario"></param>
        /// <returns>KarmaResponse con los pedidos del usuario</returns>
        public KarmaResponse GetPedidosUsuarioGrafica(int claUsuario)
        {
            var pedidos = _pedidoRepository.GetPedidosUsuarioGrafica(claUsuario).ToList();

            KarmaResponse result = new KarmaResponse
            {
                Data = pedidos
            };

            return result;
        }

        /// <summary>
        /// Método que retorna un pedido del usuario específico
        /// </summary>
        /// <param name="claUsuario"></param>
        /// <param name="claPedido"></param>
        /// <returns>KarmaResponse con el pedido del usuario</returns>
        public KarmaResponse GetPedidoUsuario(int claUsuario, int claPedido)
        {
            var pedido = _pedidoRepository.GetAll()
                            .Where(x => x.ClaUsuario == claUsuario && x.ClaPedido == claPedido)
                            .FirstOrDefault();

            KarmaResponse result = new KarmaResponse
            {
                Data = pedido
            };

            return result;
        }
    }
}