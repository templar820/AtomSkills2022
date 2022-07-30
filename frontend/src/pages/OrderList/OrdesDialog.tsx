import React, {useEffect, useState} from 'react';
import {CommonDialog} from "ui-kit";
import Form from "@common/Form";
import FormDialog from "@common/FormDialog";
import NotificationManager from "../../helpers/NotificationManager";
import {SnackType} from "../../model/Notifications/PageNotification";
import MyAutoComplete from "@common/MyAutoComplete";
import {TextField} from "@mui/material";
import MobXRouterDecorator from "@components/HOC/MobXRouterDecorator";

const OrdersDialog = ({dialogType, setDialogType, order, ...rest}) => {
  const [dialogState, setDialogState] = useState({});
  const priorityList = rest.TicketStore.priorityList;
  const claimTypesList = rest.TicketStore.claimTypesList;

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
          title: "Информация",
          body: <div></div>,
        }}
      />
    );
  }
  if (dialogType === 'edit') {
    return (
      <FormDialog
        width={500}
        mode={"update"}
        title={"Заявки"}
        onUpdate={async (e) => {
          await rest.services.ticketService.updateTicket({
            id: order.id,
            id_type_claim: e.claimType,
            id_priority: e.priority
          });
          await rest.services.ticketService.getTicketList();
          NotificationManager.Snack.open({
            message: 'Данные сохранены',
            snacktype: SnackType.Success,
          });
          setDialogType(null);
        }}
        autocompletes={{
          claimType: {options: claimTypesList.map(c => ({name: c.caption_claim, value: c.id}))},
          priority: {options: priorityList.map(p => ({name: p.caption_priority, value: p.id}))},
        }}
        defaultValues={{
          claimType: order.claim_type.id,
          priority: order.priority_of_claims.id
        }}
        close={() => setDialogType(null)}
        schema={editSchema}
      />
    );
  }
  if (dialogType === 'executor') {
    return (
      <CommonDialog
        isOpen={!!dialogType}
        onChange={() => setDialogType(null)}
        width={500}
        cfg={{
          title: "Назначить исполнителя",
          body: <div>
            <MyAutoComplete
              required={true}
              options={[{name: 'Исполнитель1', value: 1}, {name: 'Исполнитель2', value: 2}]}
              onChange={(e) => setDialogState({...dialogState, executor: e})}
              label={"Исполнитель"}
              value={dialogType.executor}
            />
          </div>,
          buttons: {
            cancel: true,
            continue: true,
          }
        }}
        onSubmit={async () => {
          console.log(order.id, dialogState.executor.value);
          // await rest.services.ticketService.updateTicket({
          //   id: order.id,
          //   id_executer: dialogState.executor.value,
          // });
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
          title: "Уточнение информации",
          body: <div>
            <TextField
              value={dialogState.clarify || ''}
              onChange={(e) => setDialogState({...dialogState, clarify: e.target.value})}
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
        onSubmit={() => {
          console.log(order.id, dialogState.clarify);
          NotificationManager.Snack.open({
            message: 'Письмо отправлено',
            snacktype: SnackType.Success,
          });
          setDialogType(null);
        }}
      />
    );
  }
};

export default MobXRouterDecorator(OrdersDialog);