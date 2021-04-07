using System;
using System.Collections.Generic;
using System.Linq;
using karma.domain.Models.Entity;
using karma.domain.Models.Global;
using karma.domain.Repository;
using karma.domain.Services.Interfaces;

namespace karma.domain.Services
{
    public class TicketService : ITicketService
    {
        readonly IDataRepository _ticketRepository;
        public TicketService(IDataRepository ticketRepository)
        {
            _ticketRepository = ticketRepository;
        }

        public KarmaResponse GetDatosAdicionales(int claTipoTicket)
        {
            var parameters = new Dictionary<string, object>()
            {
                {"pnClaTipoTicket", claTipoTicket}
            };

            var _tiposticket = _ticketRepository.GetStoreProcedureData<DatoAdicional>("krmsch.KrmDatoAdicionalSel", parameters);

            var tiposticket = new Dictionary<string, object>();

            foreach (var item in _tiposticket)
            {
                tiposticket.Add(item.TagDatoAdicional, item);
            }

            KarmaResponse result = new KarmaResponse
            {
                Data = tiposticket
            };

            return result;
        }

        public KarmaResponse GetTipoTicket()
        {
            var tiposticket = _ticketRepository.GetStoreProcedureData<TipoTicket>("krmsch.KrmTipoTicketSel");

            KarmaResponse result = new KarmaResponse
            {
                Data = tiposticket
            };

            return result;
        }

        public KarmaResponse AddTicketSimple(Ticket ticket, List<TicketDet> ticketDet)
        {
            var parametersTicket = new Dictionary<string, object>()
            {
                {"pnClaTicket", 0},
                {"pnClaTipoTicket", ticket.ClaTipoTicket},
                {"psNomTicket", ticket.NomTicket}
            };

            var _ticket = _ticketRepository.AddStoreProcedureData<Ticket>("krmsch.KrmTicketIU", parametersTicket);

            var _ticketDet = new List<TicketDet>();

            foreach (var item in ticketDet)
            {
                var parametersTicketDet = new Dictionary<string, object>()
                {
                    {"pnClaTicketDet", 0},
                    {"pnClaTicket", _ticket.ClaTicket},
                    {"pnClaDatoAdicional", item.ClaDatoAdicional},
                    {"psValDatoAdicional", item.ValDatoAdicional}
                };

                _ticketDet.Add(_ticketRepository.AddStoreProcedureData<TicketDet>("krmsch.KrmTicketDetIU", parametersTicketDet));
            }

            KarmaResponse result = new KarmaResponse
            {
                Data = new
                {
                    _ticket,
                    _ticketDet
                }
            };

            return result;
        }

        public KarmaResponse AddTicket(Ticket ticket, List<TicketDet> ticketDet)
        {
            var parametersTicket = new Dictionary<string, object>()
            {
                {"pnClaTicket", 0},
                {"pnClaTipoTicket", ticket.ClaTipoTicket},
                {"psNomTicket", ticket.NomTicket},
                {"pnBajaLogica", 0},
                {"pnClaUsuarioMod", ticket.ClaUsuarioMod},
                {"psNombrePcMod", ticket.NombrePcMod}
            };

            var _ticket = _ticketRepository.AddStoreProcedureData<Ticket>("krmsch.KrmTicketIU", parametersTicket);

            var _ticketDet = new List<TicketDet>();

            foreach (var item in ticketDet)
            {
                var parametersTicketDet = new Dictionary<string, object>()
                {
                    {"pnClaTicketDet", 0},
                    {"pnClaTicket", _ticket.ClaTicket},
                    {"pnClaDatoAdicional", item.ClaDatoAdicional},
                    {"psValDatoAdicional", item.ValDatoAdicional},
                    {"pnBajaLogica", 0},
                    {"pnClaUsuarioMod", ticket.ClaUsuarioMod},
                    {"psNombrePcMod", ticket.NombrePcMod}
                };

                _ticketDet.Add(_ticketRepository.AddStoreProcedureData<TicketDet>("krmsch.KrmTicketDetIU", parametersTicketDet));
            }

            KarmaResponse result = new KarmaResponse
            {
                Data = new
                {
                    _ticket,
                    _ticketDet
                }
            };

            return result;
        }
    }
}