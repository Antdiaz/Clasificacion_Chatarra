using System.Collections.Generic;
using karma.domain.Models.Entity;
using karma.domain.Models.Global;

namespace karma.domain.Services.Interfaces
{
    public interface ITicketService
    {
        KarmaResponse GetTipoTicket();
        KarmaResponse GetDatosAdicionales(int claTipoTicket);
        KarmaResponse AddTicket(Ticket ticket, List<TicketDet> ticketDet);
        KarmaResponse AddTicketSimple(Ticket ticket, List<TicketDet> ticketDet);
    }
}