import React, { useEffect, useState } from 'react';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import { MOBXDefaultProps } from '@globalTypes';
import Form from '@common/Form';
import { ColumnDef } from '@tanstack/react-table';
import TicketHistoryTable from '@pages/Ticket/TicketHistoryTable';
import UserStore from '@stores/User.store';
import { Roles } from '@services/Auth.service';
import { TableAs } from '../../components/ui-kit/table';
import { IClaims } from '../../api/api';
import TicketModel from '../../model/Ticket.model';

function TicketPage(props: MOBXDefaultProps) {
  const [claim, setClaim] = useState<IClaims>(null);

  const url = new URL(window.location.href);
  const id = url.searchParams.get('id');
  const { role } = props.UserStore.user;
  useEffect(() => {
    props.services.ticketService.getTicketById(id).then((ticket) => {
      setClaim(ticket);
    });
  }, [id]);

  if (!claim) return null;

  console.log(claim);
  const options = {
    executor_of_claims_name: {
      title: 'Исполнитель заявки',
      type: 'string',
    },
    executor_of_claims_email: {
      title: 'Эл. почта исполнителя',
      type: 'string',
    },
  };

  const mySchema = {
    type: 'object',
    readOnly: true,
    properties: {
      ticket_types: {
        type: 'string',
        title: 'Тип заявки',
      },
      priority_of_claims: {
        type: 'string',
        title: 'Тип заявки',
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
      comment: {
        title: 'Комментарий при отклонении',
        type: 'string',
        format: 'textarea'
      },
      author_of_claims_name: {
        title: 'Инициатор заявки',
        type: 'string',
      },
      author_of_claims_email: {
        title: 'Эл. почта инициатора',
        type: 'string',
      },
    }
  };

  if (role !== Roles.USER) {
    mySchema.properties = {
      ...mySchema.properties,
      ...options
    };
  }

  return (
    <div>
      <Form
        schema={mySchema}
        defaultValues={{
          ticket_types: claim?.claim_type.caption_claim,
          text: claim?.text,
          priority_of_claims: claim.priority_of_claims.caption_priority,
          comment: claim.comment,
          author_of_claims_name: `${claim?.author_of_claims?.name} ${claim?.author_of_claims?.surname || ''} ${claim?.author_of_claims?.patronymic || ''}`,
          author_of_claims_email: claim.author_of_claims.email,
          executor_of_claims_name: `${claim?.executor_of_claims?.name} ${claim?.executor_of_claims?.surname || ''} ${claim?.executor_of_claims?.patronymic || ''}`,
          executor_of_claims_email: claim?.executor_of_claims?.email,
          place_of_service: claim?.place_of_service,
        }}
      >
        <div />
      </Form>
      {role !== Roles.USER && <TicketHistoryTable id={id} />}
    </div>
  );
}

export default MobXRouterDecorator(TicketPage);
