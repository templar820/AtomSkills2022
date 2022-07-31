import React, { useState } from 'react';
import {
  Button, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField
} from 'ui-kit';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import { MOBXDefaultProps } from '@globalTypes';
import { Roles } from '@services/Auth.service';
import Form from '@common/Form';

const useStyles = makeStyles((theme) => ({
  input: {
    width: '100%',
    marginBottom: '12px !important',
  }
}));

function AuthorizationCard(props: MOBXDefaultProps) {
  const [cardState, setCardState] = useState<'authorization' | 'registration'>('authorization');
  const userStore = props.UserStore;
  const classes = useStyles();
  
  const onSubmit = async (formData) => {
    if (cardState === 'authorization') {
      await props.services.authService.login(formData);
      await props.services.authService.authentication();
    } else {
      await props.services.authService.register(formData);
      await props.services.authService.authentication();
    }
  };
  
  const changeView = (e) => {
    e.preventDefault();
    setCardState(cardState === 'authorization' ? 'registration' : 'authorization');
  };
  
  const loginSchema = {
    type: 'object',
    required: ['login', 'password'],
    properties: {
      login: {
        title: 'Логин',
        type: 'string',
      },
      password: {
        title: 'Пароль',
        type: 'string',
        format: 'password',
      },
    }
  };
  
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
    <>
      <h4 className="text-center mb-4">{cardState === 'authorization' ? 'Авторизация' : 'Регистрация'}</h4>
      <Form
        schema={cardState === 'authorization' ? loginSchema : authSchema}
        autocompletes={{
          role: { options: userStore.roles.map(el => ({ name: el.caption_role, value: String(el.id) })) }
        }}
        onSave={(value) => {
          console.log(value);
        }}
        onSubmit={(v) => {
          onSubmit(v.formData)
        }}
      >
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Button variant="contained" type="submit">
            {cardState === 'authorization' ? 'Войти' : 'Зарегистрироваться'}
          </Button>
          <button className="btn btn-link" onClick={(e) => changeView(e)}>
            {cardState === 'authorization' ? 'Регистрация' : 'Вход'}
          </button>
        </div>
      </Form>
    </>
  );
}

export default MobXRouterDecorator(AuthorizationCard);
