import React, { useEffect, useState } from 'react';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import { MOBXDefaultProps } from '@globalTypes';
import Form from '@common/Form';
import { ColumnDef } from '@tanstack/react-table';
import {
  makeData, Person
} from '@components/ui-kit/table/makeData';
import { PopupMenu, PopupMenuItem } from 'ui-kit';
import { IconButton } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import NotificationManager from '../../helpers/NotificationManager';
import { SnackType } from '../../model/Notifications/PageNotification';
import { TableAs } from '../../components/ui-kit/table';
import { IClaims } from '../../api/api';
import TicketModel from "../../model/Ticket.model";
import {Roles} from "@services/Auth.service";
import OrdersDialog from "@pages/OrderList/OrdesDialog";

function TicketPage(props: MOBXDefaultProps) {
  const [claim, setClaim] = useState<IClaims>(null);

  const url = new URL(window.location.href);
  const id = url.searchParams.get('id');

  useEffect(() => {
    props.services.ticketService.getTicketById(id).then((ticket) => {
      setClaim(ticket);
    });
  }, []);
  
  const [dialogType, setDialogType] = useState(null);
  const [dialogOrder, setDialogOrder] = useState({});
  
  const ticketList = props.TicketStore.ticketList;
  const userRole = props.UserStore.user?.role;
  
  useEffect(() => {
    props.services.ticketService.getTicketList();
  }, []);
  console.log(ticketList);
  
  const columns = React.useMemo<ColumnDef<TicketModel>[]>(
    () => [
      {
        accessorFn: row => row.state_of_claims.caption_state,
        header: 'Статус',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'id',//
        header: 'Исполнитель',
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.create_date,
        header: 'Время заявки',
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.claim_type.caption_claim,
        header: 'Тип заявки',
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.text,
        header: 'Текст заявки',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'place_of_service',
        header: 'Место указания услуги',
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.priority_of_claims.caption_priority,
        header: 'Приоритет',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'time_according_sla',
        header: 'Время выполнения',
        footer: props => props.column.id,
      },

      {
        accessorFn: row => row.date_time_edit_state,
        header: 'Время изменения статуса',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'date_time_close_claim',
        header: 'Время закрытия заявки',
        footer: props => props.column.id,
      },

      {
        accessorFn: row => `${row.executor_of_claims.name} ${row.executor_of_claims.surname}`,
        header: 'Инициатор',
        footer: props => props.column.id,
      },
      {
        id: '1',
        header: '',
        enableColumnFilter: false,
        size: 30,
        cell: (info) => (<>
          {
            userRole === Roles.OPERATOR && (
              <PopupMenu button={(<IconButton><MoreHoriz/></IconButton>)}>
                <PopupMenuItem onClick={() => {
                  setDialogOrder(info.row.original);
                  setDialogType('info');
                }} children="Информация"/>
                <PopupMenuItem onClick={() => {
                  setDialogOrder(info.row.original);
                  setDialogType('edit');
                }} children="Редактировать тип и приоритет"/>
                <PopupMenuItem onClick={() => {
                  setDialogOrder(info.row.original);
                  setDialogType('executor');
                }} children="Назначить исполнителя"/>
              </PopupMenu>
            )
          }
          {
            userRole === Roles.OPERATOR2 && (
              <PopupMenu button={(<IconButton><MoreHoriz/></IconButton>)}>
                <PopupMenuItem onClick={() => {
                  setDialogOrder(info.row.original);
                  setDialogType('info');
                }} children="Информация"/>
                <PopupMenuItem onClick={() => {
                  NotificationManager.Snack.open({
                    message: 'Заявка принята',
                    snacktype: SnackType.Success,
                  });
                }} children="Принять"/>
                <PopupMenuItem onClick={() => {
                  setDialogOrder(info.row.original);
                  setDialogType('clarify');
                }} children="Уточнить"/>
                <PopupMenuItem variant="red" onClick={() => {
                  NotificationManager.Snack.open({
                    message: 'Заявка отклонена',
                    snacktype: SnackType.Success,
                  });
                }} children="Отклонить"/>
              </PopupMenu>
            )
          }
        </>)
      },
    ],[]);
  
  if (!claim) return null;
  
  
  const mySchema = {
    type: 'object',
    readOnly: true,
    properties: {
      ticket_types: {
        type: 'string',
        title: 'Тип заявки',
      },
      text: {
        title: 'Текст заявки',
        type: 'string',
        format: 'textarea'
      },
      place_of_service: {
        type: 'string',
        title: 'Место оказания услуги'
      },
    }
  };
  
  
  return (
    <div>
      <Form
        schema={mySchema}
        defaultValues={{
          ticket_types: claim?.claim_type.caption_claim,
          text: claim?.text,
          place_of_service: claim?.place_of_service || ''
        }}
      >
        <div />
      </Form>
      <TableAs columns={columns} data={ticketList}/>
      <OrdersDialog dialogType={dialogType} setDialogType={setDialogType} order={dialogOrder}/>

    </div>
  );
}

export default MobXRouterDecorator(TicketPage);
