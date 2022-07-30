import { IClaimsType } from '../api/api';

export default class TicketModel {
  id: string;

  create_date: string;

  type: IClaimsType;

  text: string;

  time_according_sla: number;

  place_of_service: string;

  date_time_edit_state: string;

  date_time_close_claim: string;

  comment: string;

  constructor(obj) {
    this.id = obj.id;
    this.type = obj.type;
    this.text = obj.text;
    this.create_date = obj.create_date;
    this.time_according_sla = obj.time_according_sla;
    this.place_of_service = obj.place_of_service;
    this.date_time_close_claim = obj.date_time_close_claim;
    this.date_time_edit_state = obj.date_time_edit_state;
  }
}
