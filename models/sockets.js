const TicketList = require("./ticket-list");

class Sockets {

    constructor( io ) {
        this.io = io;

        // Crear la instancia de TicketList
        this.ticketList = new TicketList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            // Creación del ticket
            socket.on('solicitar-ticket', ( data, callback ) => {
                const nuevoTicket = this.ticketList.crearTicket();
                callback( nuevoTicket );
            });

            // Asignar ticket
            socket.on('siguiente-ticket-trabajar', ( usuario, callback ) => {
                const suTicket = this.ticketList.asignarTicket( usuario.agente, usuario.escritorio );
                this.io.emit('ticket-asignado', this.ticketList.ultimos13 );
                callback( suTicket );
            });
            
        });
    }
}

module.exports = Sockets;