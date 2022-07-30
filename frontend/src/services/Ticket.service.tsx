import AppService from '@services/App.service';
import TicketStore from '@stores/Ticket.store';
import { Typography } from '@mui/material';
import RootStore from '@stores/Root.store';
import { Api, IClaims } from '../api/api';
import { SnackType } from '../model/Notifications/PageNotification';
import NotificationManager from '../helpers/NotificationManager';

export default class TicketService {
  private apiService: Api<any>;

  private ticketStore: TicketStore;

  private appService: AppService;

  constructor(apiService: Api<any>, ticketStore: TicketStore) {
    this.apiService = apiService;
    this.ticketStore = ticketStore;
  }

  async getTicketList() {
    try {
      const list = (await this.apiService.claims.getAll()).data.data;
      this.ticketStore.setTicketList(list);
    } catch (err) {
      console.log(err);
    }
  }

  async getTicketById(id: number) {
    return (await this.apiService.claims.getOne(id)).data.data as IClaims;
  }

  async createTicket(ticket) {
    try {
      const data = ticket;
      data.id_type_claim = ticket.ticket_types;

      const claim = (await this.apiService.claims.create({ ...data, id_autor: RootStore.UserStore.user.id })).data.data;
      const response = await this.getTicketById(claim.id);
      await this.getTicketList();
      NotificationManager.Success.open({
        title: 'Заявка создана успешно',
        message: (
          <div className="d-flex flex-column">
            <div className="d-flex flex-row align-items-center gap-2">
              <Typography variant="body2">Номер вашей заявки: </Typography>
              <Typography variant="h5">
                {response.id}
                .
              </Typography>
            </div>
            <div className="d-flex flex-row align-items-center gap-2">
              <Typography variant="body2">Тип заявки: </Typography>
              <Typography variant="h5">
                {response?.claim_type?.caption_claim}
                .
              </Typography>
            </div>
            <div className="d-flex flex-row align-items-center gap-2">
              <Typography variant="body2">Планируемое время выполнения: </Typography>
              <Typography variant="h5">
                {data.text}
                .TODO
              </Typography>
            </div>
          </div>
        ),
      });
    } catch (err) {
      NotificationManager.Snack.open({ snacktype: SnackType.Error, message: err.error.message });
    }
  }

  async updateTicket(ticket) {
    try {
      this.apiService.claims.update(ticket);
    } catch (err) {
      NotificationManager.Snack.open({ snacktype: SnackType.Error, message: `Ошибка авторизации: ${err.error.message}` });
    }
  }

  async getClaimTypes() {
    try {
      const list = (await this.apiService.claimType.getAll()).data.data;
      this.ticketStore.setClaimTypesList(list);
    } catch (err) {
      NotificationManager.Snack.open({ snacktype: SnackType.Error, message: `Ошибка авторизации: ${err.error.message}` });
    }
  }

  async getPriority() {
    try {
      const list = (await this.apiService.priority.getAll()).data.data;
      this.ticketStore.setPriorityList(list);
    } catch (err) {
      NotificationManager.Snack.open({ snacktype: SnackType.Error, message: `Ошибка авторизации: ${err.error.message}` });
    }
  }

  async getState() {
    try {
      const list = (await this.apiService.state.getAll()).data.data;
      this.ticketStore.setStateList(list);
    } catch (err) {
      NotificationManager.Snack.open({ snacktype: SnackType.Error, message: `Ошибка авторизации: ${err.error.message}` });
    }
  }
}
