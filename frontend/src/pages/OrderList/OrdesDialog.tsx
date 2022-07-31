import React, { useEffect, useState } from 'react';
import { CommonDialog } from 'ui-kit';
import Form from '@common/Form';
import FormDialog from '@common/FormDialog';
import MyAutoComplete from '@common/MyAutoComplete';
import { TextField } from '@mui/material';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import { Roles } from '@services/Auth.service';
import { SnackType } from '../../model/Notifications/PageNotification';
import NotificationManager from '../../helpers/NotificationManager';

function OrdersDialog({
  dialogType, setDialogType, order, ...rest
}) {
  const [dialogState, setDialogState] = useState({});
  const { priorityList } = rest.TicketStore;
  const { claimTypesList } = rest.TicketStore;

  useEffect(() => {
    if (order.claim_type?.id) {
      rest.services.ticketService.getUsersClaimType(order.claim_type?.id);
    }
  }, [order.claim_type?.id]);
  const executorList = rest.TicketStore.usersClaimType;

  useEffect(() => {
    if (!dialogType) setDialogState({});
  }, [dialogType]);

  const editSchema = {
    type: 'object',
    required: ['claimType', 'priority'],
    properties: {
      claimType: {
        type: 'number',
        title: 'Тип заявки',
      },
      priority: {
        type: 'number',
        title: 'Приоритет заявки'
      }
    },
  };
  if (!dialogType) return null;
  if (dialogType === 'info') {
    return (
      <CommonDialog
        width={500}
        isOpen={!!dialogType}
        onChange={() => setDialogType(null)}
        cfg={{
          title: 'Информация',
          body: <div />,
        }}
      />
    );
  }
  if (dialogType === 'edit') {
    return (
      <FormDialog
        width={500}
        mode="update"
        title="Заявки"
        onUpdate={async (e) => {
          const processing = rest.TicketStore.stateList.find(s => s.name_state === 'in_processing');
          await rest.services.ticketService.updateTicket({
            id: order.id,
            id_type_claim: e.claimType,
            id_priority: e.priority,
            id_state: processing.id
          });
          await rest.services.ticketService.getTicketList();
          NotificationManager.Snack.open({
            message: 'Данные сохранены',
            snacktype: SnackType.Success,
          });
          setDialogType(null);
        }}
        autocompletes={{
          claimType: { options: claimTypesList.map(c => ({ name: c.caption_claim, value: c.id })) },
          priority: { options: priorityList.map(p => ({ name: p.caption_priority, value: p.id })) },
        }}
        defaultValues={{
          claimType: order.claim_type?.id,
          priority: order.priority_of_claims?.id
        }}
        close={() => setDialogType(null)}
        schema={editSchema}
      />
    );
  }

  console.log(executorList);

  if (dialogType === 'executor') {
    return (
      <CommonDialog
        isOpen={!!dialogType}
        onChange={() => setDialogType(null)}
        width={500}
        cfg={{
          title: 'Назначить исполнителя',
          body: <div>
            <MyAutoComplete
              required
              options={executorList.map((e) => ({ name: `${e.surname || ''} ${e.email}`, value: e.userId }))}
              onChange={(e) => setDialogState({ ...dialogState, executor: e })}
              label="Исполнитель"
              value={dialogType.executor}
            />
                </div>,
          buttons: {
            cancel: true,
            continue: true,
          }
        }}
        onSubmit={async () => {
          const pending = rest.TicketStore.stateList.find(s => s.name_state === 'pending_execution');
          console.log({
            id: order.id,
            id_executor: dialogState.executor.userId,
            id_state: pending.id,
          })
          // return;
          await rest.services.ticketService.updateTicket({
            id: order.id,
            id_executor: dialogState.executor.value,
            id_state: pending.id,
          });
          await rest.services.ticketService.getTicketList();
          NotificationManager.Snack.open({
            message: 'Исполнитель добавлен',
            snacktype: SnackType.Success,
          });
          setDialogType(null);
        }}
      />
    );
  }
  if (dialogType === 'clarify') {
    return (
      <CommonDialog
        width={500}
        isOpen={!!dialogType}
        onChange={() => setDialogType(null)}
        cfg={{
          title: 'Уточнение информации',
          body: <div>
            <TextField
              value={dialogState.clarify || ''}
              onChange={(e) => setDialogState({ ...dialogState, clarify: e.target.value })}
              multiline
              fullWidth
              required
              rows={4}
            />
                </div>,
          buttons: {
            cancel: true,
            continue: true,
          },
          continueButtonText: 'Отправить'
        }}
        onSubmit={async () => {
          console.log(order, dialogState.clarify);
          rest.services.ticketService.sendMail({
            userId: order.id_autor,
            text: dialogState.clarify,
            subject: "Требуются уточнения для выполнения заявки",
          });
  
          const pending_clarification = rest.TicketStore.stateList.find(s => s.name_state === 'pending_clarification');
          console.log(pending_clarification);
          await rest.services.ticketService.updateTicket({
            id: order.id,
            id_state: pending_clarification.id,
          });
          await rest.services.ticketService.getTicketList();

          setDialogType(null);
        }}
      />
    );
  }
  if (dialogType === 'rejected') {
    return (
      <CommonDialog
        width={500}
        isOpen={!!dialogType}
        onChange={() => setDialogType(null)}
        cfg={{
          title: 'Отклонение заявки',
          body: <div>
            <TextField
              value={dialogState.reject || ''}
              onChange={(e) => setDialogState({ ...dialogState, reject: e.target.value })}
              multiline
              fullWidth
              required
              rows={4}
              label="Коментарий"
            />
                </div>,
          buttons: {
            cancel: true,
            continue: true,
          },
          continueButtonText: 'Отклонить'
        }}
        onSubmit={async () => {
          const rejected = rest.TicketStore.stateList.find(s => s.name_state === 'rejected');
          const comment = dialogState.reject;
          await rest.services.ticketService.updateTicket({
            id: order.id,
            id_state: rejected.id,
            comment,
          });
  
          rest.services.ticketService.sendMail({
            userId: order.id_autor,
            text: comment,
            subject: "Заявка отклонена",
          });
          await rest.services.ticketService.getTicketList();
          NotificationManager.Snack.open({
            message: 'Заявка отклонена',
            snacktype: SnackType.Success,
          });
          setDialogType(null);
        }}
      />
    );
  }
}

export default MobXRouterDecorator(OrdersDialog);
