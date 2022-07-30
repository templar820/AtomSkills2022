import React from 'react';
import { PopupMenu, PopupMenuItem, TableAs } from 'ui-kit';
import { ColumnDef } from '@tanstack/react-table';
import { makeData, Person } from '@components/ui-kit/table/makeData';
import { fuzzyFilter, fuzzySort } from '@components/ui-kit/table/utils';
import { Button, IconButton } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import NotificationManager from '../../helpers/NotificationManager';
import { SnackType } from '../../model/Notifications/PageNotification';

function TablePage(props) {
  const columns1 = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        header: 'Name',
        footer: props => props.column.id,
        columns: [
          {
            accessorKey: 'firstName',
            cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            accessorFn: row => row.lastName,
            id: 'lastName',
            cell: info => info.getValue(),
            header: () => <span>Last Name</span>,
            footer: props => props.column.id,
          },
          {
            accessorFn: row => `${row.firstName} ${row.lastName}`,
            id: 'fullName',
            header: 'Full Name',
            cell: info => info.getValue(),
            footer: props => props.column.id,
            filterFn: fuzzyFilter,
            sortingFn: fuzzySort,
          },
        ],
      },
      {
        header: 'Info',
        footer: props => props.column.id,
        columns: [
          {
            accessorKey: 'age',
            header: () => 'Age',
            footer: props => props.column.id,
          },
          {
            header: 'More Info',
            columns: [
              {
                accessorKey: 'visits',
                header: () => <span>Visits</span>,
                footer: props => props.column.id,
              },
              {
                accessorKey: 'status',
                header: 'Status',
                footer: props => props.column.id,
              },
              {
                accessorKey: 'progress',
                header: 'Profile Progress',
                footer: props => props.column.id,
              },
            ],
          },
        ],
      },
    ],
    []
  );

  const columns2 = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        enableColumnFilter: false,
        accessorKey: 'firstName',
        cell: info => info.getValue(),
        footer: props => props.column.id,
      },
      {
        enableColumnFilter: false,
        accessorFn: row => row.lastName,
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: props => props.column.id,
      },
      {
        enableColumnFilter: false,
        accessorKey: 'age',
        header: () => 'Age',
        footer: props => props.column.id,
      },
      {
        enableColumnFilter: false,
        accessorKey: 'status',
        header: 'Status',
        footer: props => props.column.id,
      },
      {
        enableColumnFilter: false,
        accessorKey: 'progress',
        header: 'Profile Progress',
        footer: props => props.column.id,
      },
      {
        id: '1',
        header: '',
        enableColumnFilter: false,
        cell: (info) => (
          <PopupMenu button={(<IconButton onClick={() => console.log(info.row.original)}><MoreHoriz /></IconButton>)}>
            <PopupMenuItem onClick={() => {}} children="Редактировать" />
            <PopupMenuItem
              onClick={() => {
                NotificationManager.Confirm.open({
                  message: 'Вы уверены, что хотите удалить запись?',
                  title: 'Удалить',
                  onSubmit: () => {
                    NotificationManager.Snack.open({
                      message: 'Запись удалена',
                      snacktype: SnackType.Success,
                    });
                  }
                });
              }}
              children="Удалить"
            />
          </PopupMenu>
        )
      },
    ],
    []
  );

  const data1 = makeData(10000);
  const data2 = makeData(100);

  return (
    <>
      <div className="mb-5">
        <TableAs columns={columns1} data={data1} />
      </div>

      <TableAs columns={columns2} data={data2} />
    </>
  );
}

export default TablePage;
