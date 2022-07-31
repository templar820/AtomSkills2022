import React, { useEffect, useState } from 'react';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import { ColumnDef } from '@tanstack/react-table';
import {AddIcon, Button, CommonDialog, TableAs, Tooltip} from 'ui-kit';
import {IconButton, Typography} from '@mui/material';
import { Edit } from '@mui/icons-material';
import MyAutoComplete from '@common/MyAutoComplete';
import FormDialog, {FormDialogMode} from '@common/FormDialog';
import { Roles } from '@services/Auth.service';
import { MOBXDefaultProps } from '@globalTypes';
import { SnackType } from '../../model/Notifications/PageNotification';
import NotificationManager from '../../helpers/NotificationManager';
import TicketModel from '../../model/Ticket.model';
import Form from "@common/Form";

function Users(props: MOBXDefaultProps) {
  const { roles } = props.UserStore;
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<FormDialogMode>(null);
  
  const [dialogUser, setDialogUser] = useState({});
  const [usersList, setUsersList] = useState([]);

  const operator2Id = roles.find(r => r.name_role === Roles.OPERATOR2);
  const { claimTypesList } = props.TicketStore;

  useEffect(() => {
    props.services.ticketService.getUsers().then(list => {
      setUsersList(list);
    });
    props.services.ticketService.getClaimTypes();
  }, []);

  const dialogSchema = {
    type: 'object',
    properties: {
      role: {
        title: 'Роль',
        type: 'number',
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
                    enumNames: claimTypesList.map(v => v.caption_claim),
                    enum: claimTypesList.map(v => v.id)
                  },
                }
              }
            }
          }
        }]
      }
    }
  };

  const columns = React.useMemo<ColumnDef<TicketModel>[]>(() => [
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
      accessorFn: row => row.role.caption_role,
      header: 'Роль',
      footer: props => props.column.id,
    },
    {
      id: '1',
      header: '',
      enableColumnFilter: false,
      size: 10,
      cell: (info) => (
        <IconButton onClick={() => {
          setDialogUser(info.row.original);
          setDialogIsOpen(true);
        }}
        >
          <Edit />
        </IconButton>
      )
    },
  ], []);
  
  
  console.log(usersList);
  const authSchema = {
    type: 'object',
    required: ['role', 'password'],
    properties: {
      name: {
        type: 'string',
        title: 'Имя',
      },
      surname: {
        title: 'Фамилия',
        type: 'string',
      },
      patronymic: {
        type: 'string',
        title: 'Отчество'
      },
      login: {
        type: 'string',
        title: 'Логин'
      },
      password: {
        type: 'string',
        format: 'password',
        title: 'Пароль'
      },
      role: {
        type: 'string',
        title: 'Роль'
      },
    }
  };
  
  
  return (
    <div style={{ width: '900px' }}>
      <Tooltip title="Создать Пользователя">
        <IconButton onClick={() => {
          setDialogMode('create');
        }}
        >
          <AddIcon />
          <Typography className="ms-2" variant="subtitle1">Создать пользователя</Typography>
        </IconButton>
      </Tooltip>
      <FormDialog
        showErrorList={false}
        mode={dialogMode}
        close={() => setDialogMode(null)}

        title="Форма создания пользователя в системе"
        schema={authSchema}
        autocompletes={{
          role: { options: props.UserStore.roles.map(el => ({ name: el.caption_role, value: String(el.id) })) }
        }}
        onSave={(value) => {
          setDialogMode(null);
          props.services.authService.createUser(value)
        }}
      />
      
      
      <TableAs
        columns={columns}
        data={usersList}
      />
      <FormDialog
        mode={dialogIsOpen ? 'update' : null}
        width={500}
        close={() => {
          setDialogIsOpen(false);
          setDialogUser({});
        }}
        schema={dialogSchema}
        defaultValues={dialogUser}
        title="Пользователя"
        onUpdate={(e) => {
          console.log(dialogUser, e);
          props.services.ticketService.updateClaimTypes({ userId: dialogUser.id, claimTypeIds: e.types?.map(t => t.role) || [] });

          props.services.ticketService.updateUser({ id: dialogUser.id, id_role_user: e.role });
          props.services.ticketService.getUsers().then(list => {
            setUsersList(list);
          });
          // setDialogIsOpen(false);
          // setDialogUser({});
        }}
      />
    </div>
  );
}

export default MobXRouterDecorator(Users);
