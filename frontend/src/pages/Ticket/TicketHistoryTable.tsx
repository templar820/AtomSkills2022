import React, { useEffect, useState } from 'react';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import { MOBXDefaultProps } from '@globalTypes';
import { ColumnDef } from '@tanstack/react-table';
import TicketModel from '../../model/Ticket.model';
import { IClaims } from '../../api/api';
import { TableAs } from '../../components/ui-kit/table';
import {Typography} from "@mui/material";

interface Interface extends MOBXDefaultProps{
  id: string
}

function TicketHistoryTable(props: Interface) {
  const [historyClaim, setHistoryClaim] = useState<IClaims>(null);

  useEffect(() => {
    props.services.ticketService.getHistoryClaimById(props.id).then((hist) => {
      setHistoryClaim(hist);
    });
  }, [props.id]);

  const columns = React.useMemo<ColumnDef<TicketModel>[]>(() => [
    {
      accessorFn: row => row?.state_of_history?.caption_state,
      header: 'Тип заявки',
      footer: props => props.column.id,
    },
    {
      accessorFn: row => row.date_start,
      header: 'Дата взятия в состояние',
      footer: props => props.column.id,
    },
    {
      accessorFn: row => row.date_end,
      header: 'Дата выхода из состояния',
      footer: props => props.column.id,
    },
    {
      accessorFn: row => row.claims_of_history.id_executor,
      header: 'Исполнитель',
      footer: props => props.column.id,
    },
    {
      accessorFn: row => row.comment,
      header: 'Комментарий исполнителя',
      footer: props => props.column.id,

    },

  ], []);

  if (!historyClaim) return null;
  return (
    <div className="d-flex w-100 h-100 flex-column">
      <Typography variant="subtitle1">Таблица статусов заявки</Typography>
      <TableAs columns={columns} data={historyClaim} />
    </div>

  );
}

export default MobXRouterDecorator(TicketHistoryTable);
