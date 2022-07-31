import React, {useEffect, useState} from 'react';
import {ToggleButton, ToggleButtonGroup, TextField} from "@mui/material";
import MobXRouterDecorator from "@components/HOC/MobXRouterDecorator";
import {MOBXDefaultProps} from "@globalTypes";
import Board from "@pages/Analytics/Board";
import Report from '@pages/Analytics/Report';
import {Roles} from "@services/Auth.service";
import './styles.scss';
import MyAutoComplete from "@common/MyAutoComplete";
import NotificationManager from "../../helpers/NotificationManager";
import {SnackType} from "../../model/Notifications/PageNotification";
import {CommonDialog} from "ui-kit";

const Analytics = (props: MOBXDefaultProps) => {
  const [viewType, setViewType] = useState('board');
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [dialogData, setDialogData] = useState(null);
  const [dialogState, setDialogState] = useState({});

  useEffect(() => {
    if (!dialogData?.ticket?.claim_type?.id) return;
    props.services.ticketService.getUsersClaimType(dialogData?.ticket?.claim_type?.id);
  }, [dialogData]);
  const executorList = props.TicketStore.usersClaimType;

  useEffect(() => {
    props.services.ticketService.getTicketList();
    props.services.ticketService.getState();
    const executor = props.UserStore.roles.find((r) => r.name_role === Roles.OPERATOR2);
    props.services.ticketService.getRoleUsers(executor.id, Roles.OPERATOR2);
  }, []);

  return (<div>
    <div className="d-flex align-items-end mb-5">
      <ToggleButtonGroup
        color="primary"
        value={viewType}
        exclusive
        onChange={(e, newType) => setViewType(newType)}
        className="me-3"

      >
        <ToggleButton value="board">Доска</ToggleButton>
        <ToggleButton value="report">Отчет</ToggleButton>
      </ToggleButtonGroup>
      <TextField
        type="date"
        label="Начало периода"
        value={dateStart}
        onChange={e => setDateStart(e.currentTarget.value)}
        className="me-3"
      />
      <TextField
        type="date"
        label="Конец периода"
        value={dateEnd}
        onChange={e => setDateEnd(e.currentTarget.value)}
        className="me-3"
      />
    </div>
    {
      viewType === 'board' && (<Board dateStart={dateStart} dateEnd={dateEnd} setDialogData={setDialogData}/>)
    }
    {
      viewType === 'report' && (<Report dateStart={dateStart} dateEnd={dateEnd} setDialogData={setDialogData}/>)
    }
    <CommonDialog
      isOpen={!!dialogData}
      onChange={() => {
        setDialogData(null);
        setDialogState({});
      }}
      width={500}
      cfg={{
        title: "Назначить исполнителя",
        body: <div>
          <MyAutoComplete
            required={true}
            options={executorList.map((e) => ({name: `${e.surname || ''} ${e.email}`, value: e.id}))}
            onChange={(e) => setDialogState({...dialogState, executor: e})}
            label={"Исполнитель"}
            value={dialogState.executor || {name: `${dialogData?.ticket?.executor_of_claims?.surname || ''} ${dialogData?.ticket?.executor_of_claims?.email}`, value: dialogData?.ticket?.executor_of_claims?.id}}
          />
        </div>,
        buttons: {
          cancel: true,
          continue: true,
        }
      }}
      onSubmit={async () => {
        await props.services.ticketService.updateTicket({
          id: dialogData.ticket.id,
          id_executor: dialogState.executor.value,
        });
        await props.services.ticketService.getTicketList();
        NotificationManager.Snack.open({
          message: 'Исполнитель изменен',
          snacktype: SnackType.Success,
        });
        setDialogData(null);
        setDialogState({});
      }}
    />
  </div>);
};

export default MobXRouterDecorator(Analytics)