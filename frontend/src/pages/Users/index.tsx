import React, {useState} from 'react';
import MobXRouterDecorator from "@components/HOC/MobXRouterDecorator";
import {ColumnDef} from "@tanstack/react-table";
import TicketModel from "../../model/Ticket.model";
import {CommonDialog, TableAs} from "ui-kit";
import {IconButton} from "@mui/material";
import {Edit} from "@mui/icons-material";
import MyAutoComplete from "@common/MyAutoComplete";
import NotificationManager from "../../helpers/NotificationManager";
import {SnackType} from "../../model/Notifications/PageNotification";
import FormDialog from "@common/FormDialog";
import {Roles} from "@services/Auth.service";

const Users = (props) => {
  const roles = props.UserStore.roles;
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [dialogUser, setDialogUser] = useState({});

  const operator2Id = roles.find(r => r.name_role === Roles.OPERATOR2);

  const dialogSchema = {
    type: 'object',
    properties: {
      role: {
        title: 'Роль',
        type: "number",
        enum: roles.map(r => r.id),
        enumNames: roles.map(r => r.caption_role),
      },
    },
    dependencies: {
      role: {
        oneOf: [{
          properties: {
            role: {
              enum: [operator2Id?.id]
            },
            types: {
              type: 'array',
              title: 'Типы ИТ-услуг',
              items: {
                type: 'object',
                properties: {
                  role: {
                    title: 'Тип услуги',
                    type: 'number',
                    enumNames: ['Тип 1', 'Тип 2', 'Тип 3'],
                    enum: [1, 2, 3]
                  },
                }
              }
            }
          }
        }]
      }
    }
  };

  const columns = React.useMemo<ColumnDef<TicketModel>[]>(
    () => [
      {
        accessorKey: 'id',
        enableColumnFilter: false,
        footer: props => props.column.id,
        size: 50,
      },
      {
        accessorKey: 'surname',
        header: 'Фамилия',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'name',
        header: 'Имя',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'patronymic',
        header: 'Отчество',
        footer: props => props.column.id,
      },
      {
        accessorKey: 'role',
        header: 'Роль',
        footer: props => props.column.id,
      },
      {
        id: '1',
        header: '',
        enableColumnFilter: false,
        size: 10,
        cell: (info) => (<IconButton onClick={() => {
          setDialogUser(info.row.original);
          setDialogIsOpen(true);
        } }><Edit/></IconButton>)
      },
    ], []);

  return (<div style={{width: '900px'}}>
    <TableAs columns={columns} data={[{
      "id": 1,
      "surname": "Иванов",
      "name": "Иван",
      "patronymic": "Иванович",
      "role": "OPERATOR"
    }]}/>
    <FormDialog
      mode={dialogIsOpen ? "update" : null}
      width={500}
      close={() => {
        setDialogIsOpen(false);
        setDialogUser({});
      }}
      schema={dialogSchema}
      defaultValues={dialogUser}
      title={"Пользователя"}
      onUpdate={(e) => {
        console.log(dialogUser, e);
        NotificationManager.Snack.open({
          message: 'Пользователь сохранен',
          snacktype: SnackType.Success,
        });

        setDialogIsOpen(false);
        setDialogUser({});
      }}
    />
  </div>);
};

export default MobXRouterDecorator(Users);