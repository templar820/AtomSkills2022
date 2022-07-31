import React, {useMemo} from 'react';
import {ColumnDef} from "@tanstack/react-table";
import TicketModel from "../../model/Ticket.model";
import {PopupMenu, PopupMenuItem, TableAs} from "ui-kit";
import {IconButton} from "@mui/material";
import {MoreHoriz} from "@mui/icons-material";
import {MOBXDefaultProps} from "@globalTypes";
import MobXRouterDecorator from "@components/HOC/MobXRouterDecorator";

const Report = (props: MOBXDefaultProps) => {
  const filterTicketList = useMemo(() => {
    return props.TicketStore.ticketList.filter((t) => {
      const updateDate = new Date(t.date_time_edit_state || t.updatedAt);
      if (props.dateStart) {
        const dateStart = new Date(props.dateStart);
        if (dateStart.getTime() > updateDate.getTime()) return false;
      }
      if (props.dateEnd) {
        const dateEnd = new Date(props.dateEnd);
        dateEnd.setDate(dateEnd.getDate() + 1);
        if (dateEnd.getTime() < updateDate.getTime()) return false;
      }
      return true;
    });
  }, [props.dateStart, props.dateEnd]);

  const columns = React.useMemo<ColumnDef<TicketModel>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'id Заявки',
        footer: props => props.column.id,
        size: 30,
      },
      {
        accessorFn: row => row.state_of_claims?.caption_state,
        header: 'Статус',
        footer: props => props.column.id,
      },
      {
        accessorFn: row => `${row.executor_of_claims?.name || ''} ${row.executor_of_claims?.surname || ''}`,
        header: 'Исполнитель',
        footer: props => props.column.id,
      },
      {
        id: '1',
        header: '',
        enableColumnFilter: false,
        size: 30,
        cell: (info) => (<PopupMenu button={(<IconButton><MoreHoriz/></IconButton>)}>
          <PopupMenuItem onClick={() => {
            props.setDialogData({ticket: info.row.original});
          }} children="Назначить исполнителя"/>
        </PopupMenu>)
      },
    ],[]);

  return (<TableAs columns={columns} data={filterTicketList} />);
};

export default MobXRouterDecorator(Report);