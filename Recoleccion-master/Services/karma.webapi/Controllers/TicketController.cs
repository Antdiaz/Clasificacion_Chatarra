using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using karma.domain.Models.Entity;
using karma.domain.Models.Global;
using karma.domain.Services.Interfaces;
using karma.webapi.Binders;
using karma.webapi.DTOs;
using karma.webapi.Filters;
using Microsoft.AspNetCore.Mvc;

namespace karma.webapi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private ITicketService _ticketService;

        public TicketController(ITicketService ticketService)
        {
            _ticketService = ticketService;
        }

        [HttpGet("getTipoTicket")]
        [AuthorizeFilterAttribute]
        public IActionResult GetTipoTicket()
        {
            return Ok(this._ticketService.GetTipoTicket());
        }

        [HttpGet("getDatosAdicionales/{claTipoTicket}")]
        [AuthorizeFilterAttribute]
        public IActionResult GetDatosAdicionales([Required] int claTipoTicket)
        {
            return Ok(this._ticketService.GetDatosAdicionales(claTipoTicket));
        }

        [HttpPost("addTicketSimple")]
        [AuthorizeFilterAttribute]
        public IActionResult AddTicketSimple(
            [ModelBinder(typeof(ClientBinder))] ClientToken client,
            [FromBody] TicketDTO ticket)
        {
            var ticketModel = new Ticket
            {
                ClaTipoTicket = ticket.ClaTipoTicket,
                NomTicket = ticket.NomTicket,
                NombrePcMod = client.NombrePc,
                ClaUsuarioMod = client.ClaUsuario
            };

            var ticketDetModel = new List<TicketDet>();

            foreach (var item in ticket.TicketDet)
            {
                ticketDetModel.Add(new TicketDet
                {
                    ClaDatoAdicional = item.ClaDatoAdicional,
                    ValDatoAdicional = item.ValDatoAdicional,
                    NombrePcMod = client.NombrePc,
                    ClaUsuarioMod = client.ClaUsuario
                });
            }

            return Ok(this._ticketService.AddTicket(ticketModel, ticketDetModel));
        }

        [HttpPost("addTicket")]
        [AuthorizeFilterAttribute]
        public IActionResult AddTicket(
            [ModelBinder(typeof(ClientBinder))] ClientToken client,
            [FromBody] TicketDTO ticket)
        {
            var ticketModel = new Ticket
            {
                ClaTipoTicket = ticket.ClaTipoTicket,
                NomTicket = ticket.NomTicket
            };

            var ticketDetModel = new List<TicketDet>();

            foreach (var item in ticket.TicketDet)
            {
                ticketDetModel.Add(new TicketDet
                {
                    ClaDatoAdicional = item.ClaDatoAdicional,
                    ValDatoAdicional = item.ValDatoAdicional
                });
            }

            return Ok(this._ticketService.AddTicket(ticketModel, ticketDetModel));
        }
    }
}