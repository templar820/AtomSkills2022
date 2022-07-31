import { MOBXDefaultProps } from '@globalTypes';
import { AddIcon, Tooltip } from 'ui-kit';
import { IconButton, Typography } from '@mui/material';
import FormDialog, { FormDialogMode } from '@common/FormDialog';
import React, { useState } from 'react';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';

function CreateTicket(props: MOBXDefaultProps) {
  const { claimTypesList, priorityList } = props.TicketStore;
  const [dialogMode, setDialogMode] = useState<FormDialogMode>(null);

  const mySchema = {
    type: 'object',
    required: ['ticket_types', 'text', 'id_priority', 'id_autor'],
    properties: {
      id_autor: {
        type: 'number',
        title: 'Email пользователя',
      },
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
  
  console.log(props.TicketStore.users);
  return (
    <>
      <Tooltip title="Создать Заявку">
        <IconButton
          onClick={() => {
            setDialogMode('create');
          }}
          className="mb-3"
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
          id_autor: { options: props.TicketStore.users.filter(el => el?.role?.name_role === "author").map(u => ({ name: u.email, value: u.id })) },
          ticket_types: { options: claimTypesList.map(el => ({ name: el.caption_claim, value: String(el.id) })) },
          id_priority: { options: priorityList.map(p => ({ name: p.caption_priority, value: p.id })) }
        }}
        onSave={(value) => {
          setDialogMode(null);
          props.services.ticketService.createTicket(value);
        }}
      />
    </>
  );
}

export default MobXRouterDecorator(CreateTicket);
