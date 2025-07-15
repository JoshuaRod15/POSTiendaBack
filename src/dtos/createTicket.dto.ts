import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { payType } from 'src/enum/payTape.enum';
import { ticketState } from 'src/enum/ticketState.enum';

interface productForTicket {
  productId: number;
  qty: number;
}

export class createTiketDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  total: number;

  @IsEnum(ticketState)
  @IsNotEmpty()
  state: ticketState;

  @IsEnum(payType)
  @IsNotEmpty()
  payType: payType;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsPositive()
  @IsNumber()
  recivedCash;

  @IsPositive()
  @IsNumber()
  returnedCash;

  @IsArray()
  @IsNotEmpty()
  products: productForTicket[];
}
