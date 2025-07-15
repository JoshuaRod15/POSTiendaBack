import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { createTiketDto } from 'src/dtos/createTicket.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async newTicket(@Body() ticketData: createTiketDto, @Req() req) {
    const userId = req.user['userId'];
    return await this.ticketService.newTicket(ticketData, userId);
  }
}
