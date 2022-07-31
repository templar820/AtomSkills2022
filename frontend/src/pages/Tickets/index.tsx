import React, { useEffect, useMemo, useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import { AddIcon, Tooltip } from 'ui-kit';
import FormDialog, { FormDialogMode } from '@common/FormDialog';
import ProductCard from '@components/MyCard';
import { MOBXDefaultProps } from '@globalTypes';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';

function Tickets(props: MOBXDefaultProps) {
  const [dialogMode, setDialogMode] = useState<FormDialogMode>(null);
  
  
  
  const ticketList = useMemo(() => {
    return props.TicketStore.ticketList.filter(t => t?.id_autor === props.UserStore.user.id);
  }, [props.TicketStore.ticketList]);

  const { claimTypesList, priorityList } = props.TicketStore;

  useEffect(() => {
    props.services.ticketService.getClaimTypes();
    props.services.ticketService.getTicketList();
    props.services.ticketService.getPriority();
  }, []);

  const mySchema = {
    type: 'object',
    required: ['ticket_types', 'text'],
    properties: {
      ticket_types: {
        type: 'string',
        title: 'Тип заявки',
      },
      id_priority: {
        type: 'number',
        title: 'Приоритет',
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
    <div className="d-flex flex-column flex-wrap justify-content-start align-items-start">
      <Tooltip title="Создать Заявку">
        <IconButton onClick={() => {
          setDialogMode('create');
        }}
        >
          <AddIcon />
          <Typography className="ms-2" variant="subtitle1">Создать заявку</Typography>
        </IconButton>
      </Tooltip>
      <FormDialog
        showErrorList={false}
        title="Форма создания заявки"
        mode={dialogMode}
        close={() => setDialogMode(null)}
        schema={mySchema}
        autocompletes={{
          ticket_types: { options: claimTypesList.map(el => ({ name: el.caption_claim, value: String(el.id) })) },
          id_priority: {options: priorityList.map(p => ({name: p.caption_priority, value: p.id}))}
        }}
        onSave={(value) => {
          setDialogMode(null);
          props.services.ticketService.createTicket(value);
        }}
      />
      <div className="d-flex flex-row flex-wrap gap-3 myList">
        {ticketList.map((ticket) => {
          return (
            <ProductCard
              subtitle1={ticket.text}
              subtitle2={ticket?.state_of_claims?.caption_state}
              title={ticket.place_of_service}
              onEdit={() => {
                setDialogMode('update');
              }}
              onClick={() => {
                props.history.push('/tickets/me?id=' + ticket.id);
              }}
            />
          );
        })}
      </div>
    </div>

  );
}

export default MobXRouterDecorator(Tickets);
