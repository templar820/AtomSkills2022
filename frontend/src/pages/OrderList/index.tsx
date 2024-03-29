import React, {useEffect, useMemo, useState} from 'react';
import {CommonDialog, PopupMenu, PopupMenuItem, TableAs} from "ui-kit";
import {ColumnDef} from "@tanstack/react-table";
import {IconButton} from "@mui/material";
import {MoreHoriz} from "@mui/icons-material";
import NotificationManager from "../../helpers/NotificationManager";
import {SnackType} from "../../model/Notifications/PageNotification";
import TicketModel from "../../model/Ticket.model";
import OrdersDialog from "@pages/OrderList/OrdesDialog";
import MobXRouterDecorator from "@components/HOC/MobXRouterDecorator";
import './styles.scss';
import {Roles} from "@services/Auth.service";
import {MOBXDefaultProps} from "@globalTypes";
import {useHistory} from "react-router";
import CreateTicket from "@pages/OrderList/CreateTicket";


const OrderList = (props: MOBXDefaultProps) => {
  const history = useHistory();
  const [isReady, setIsReady] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [dialogOrder, setDialogOrder] = useState({});
  const ticketList = props.TicketStore.ticketList;
  const userRole = props.UserStore.user?.role;

  const init = async () => {
    await props.services.ticketService.getTicketList();
    await props.services.ticketService.getPriority();
    await props.services.ticketService.getClaimTypes();
    await props.services.ticketService.getState();
    const user = props.UserStore.roles.find((r) => r.name_role === Roles.USER);
    await props.services.ticketService.getRoleUsers(user.id, Roles.USER);
    setIsReady(true);
  };

  useEffect(() => {
    init();
  }, []);

  const filterTicketList = useMemo(() => {
    if (userRole === Roles.OPERATOR) return ticketList;
    return ticketList.filter(t => t.executor_of_claims?.id === props.UserStore.user?.id);
  }, [ticketList]);

  const columns = React.useMemo<ColumnDef<TicketModel>[]>(
    () => [
      {
        accessorKey: 'id',
        footer: props => props.column.id,
        size: 30,
      },
      {
        accessorFn: row => row.create_date || row.createdAt,
        header: 'Время заявки',
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.claim_type?.caption_claim,
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
        accessorFn: row => row.priority_of_claims?.caption_priority,
        header: 'Приоритет',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'time_according_sla',
        header: 'Время выполнения',
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.state_of_claims?.caption_state,
        header: 'Статус',
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.date_time_edit_state,
        header: 'Время изменения статуса',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'comment',
        header: 'Коментарий исполнителя',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'date_time_close_claim',
        header: 'Время закрытия заявки',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'id',//
        header: 'История исполнителей',
        footer: props => props.column.id,
      },
      {
        accessorFn: row => `${row.author_of_claims?.name || ''} ${row.author_of_claims?.surname || ''}`,
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
                  history.push(`/tickets/me?id=${info.row.original.id}`)
                }} children="Информация"/>
                <PopupMenuItem onClick={() => {
                  setDialogOrder(info.row.original);
                  setDialogType('edit');
                }} displayNone={info.row.original?.state_of_claims?.name_state !== 'pending_processing'} children="Подтвердить"/>
                <PopupMenuItem onClick={() => {
                  setDialogOrder(info.row.original);
                  setDialogType('executor');
                }} displayNone={info.row.original?.state_of_claims?.name_state !== 'in_processing'} children="Назначить исполнителя"/>
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
                <PopupMenuItem onClick={async () => {
                  const inWork = props.TicketStore.stateList.find(s => s.name_state === 'in_work');
                  await props.services.ticketService.updateTicket({
                    id: +info.row.original.id,
                    id_state: inWork.id,
                  });
                  await props.services.ticketService.getTicketList();
                  NotificationManager.Snack.open({
                    message: 'Заявка принята',
                    snacktype: SnackType.Success,
                  });
                }} displayNone={info.row.original?.state_of_claims?.name_state !== 'pending_execution' && info.row.original?.state_of_claims?.name_state !== 'pending_clarification'} children="Принять"/>
                <PopupMenuItem onClick={async () => {
                  const performed = props.TicketStore.stateList.find(s => s.name_state === 'performed');
                  await props.services.ticketService.updateTicket({
                    id: info.row.original.id,
                    id_state: performed.id,
                  });
                  await props.services.ticketService.getTicketList();
                  NotificationManager.Snack.open({
                    message: 'Заявка выполнена',
                    snacktype: SnackType.Success,
                  });
                }} displayNone={info.row.original?.state_of_claims?.name_state !== 'in_work'} children="Выполнено"/>
                <PopupMenuItem onClick={() => {
                  setDialogOrder(info.row.original);
                  setDialogType('clarify');
                }} displayNone={info.row.original?.state_of_claims?.name_state !== 'in_work'} children="Уточнить"/>
                <PopupMenuItem variant="red" onClick={async () => {
                  setDialogOrder(info.row.original);
                  setDialogType('rejected');
                }} children="Отклонить"/>
              </PopupMenu>
            )
          }
        </>)
      },
    ],[]);

  if (!isReady) return null;

  return (
    <div className="order-list">
      {
        userRole === Roles.OPERATOR && <CreateTicket/>
      }
      <TableAs columns={columns} data={filterTicketList} />
      <OrdersDialog dialogType={dialogType} setDialogType={setDialogType} order={dialogOrder}/>
    </div>
  );
};

export default MobXRouterDecorator(OrderList);