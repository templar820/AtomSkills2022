import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Redirect, Route, Switch } from 'react-router';
import WindowFactory, { WindowType } from '@components/HOC/WindowFactory';
import Page from '@components/system/Page/Page';
import ErrorBoundary from '@components/system/ErrorBoundary';
import { MOBXDefaultProps } from '@globalTypes';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import Tickets from '@pages/Tickets';
import NotificationWindow from './NotificationWindow';
import AuthorizationPage from "@pages/AuthorizationPage/AuthorizationPage";
import Auth from "@components/system/Auth";
import {Roles} from "@services/Auth.service";
import OrderList from "@pages/OrderList";
import Users from "@pages/Users";
import Analytics from "@pages/Analytics";
import TicketPage from "@pages/Ticket";
import Documents from "@pages/Documents";

function Router(props: MOBXDefaultProps) {
  const userStore = props.UserStore;

  const getPage = (routerProps, Component, allowedRoles?: Roles[]) => {
    if (allowedRoles && !allowedRoles.includes(userStore.user?.role)) {
      return <WindowFactory type={WindowType.NotFoundPage} />;
    }
    return (
      <Page>
        <Component {...routerProps} />
      </Page>
    );
  };

  const mainPagePaths = {
    [Roles.ADMIN]: '/users',
    [Roles.USER]: '/tickets',
    [Roles.OPERATOR]: '/order-list',
    [Roles.OPERATOR2]: '/order-list',
    [Roles.SERVICEMANAGER]: '/analytics',
  };

  return (
    <BrowserRouter>
      <NotificationWindow />
      <ErrorBoundary throwError={props.services.appService.errorListener}>
        <Auth>
          <Switch>
            {
              userStore.isLogin
              && <Redirect from="/authorization" to="/" />
            }
            <Route path="/authorization">
              <AuthorizationPage />
            </Route>
            {
              !userStore.isLogin
              && <Redirect to="/authorization" />
            }
            <Route
              exact
              path="/order-list"
              render={p => getPage(p, OrderList, [Roles.OPERATOR, Roles.OPERATOR2])}
            />
            <Route
              exact
              path="/tickets"
              render={p => getPage(p, Tickets)}
            />

            <Route
              exact
              path="/tickets/me"
              render={p => getPage(p, TicketPage)}
            />

            <Route
              exact
              path="/users"
              render={p => getPage(p, Users, [Roles.ADMIN])}
            />
            <Route
              exact
              path="/analytics"
              render={p => getPage(p, Analytics, [Roles.SERVICEMANAGER])}
            />
            <Route
              exact
              path="/docs"
              render={p => getPage(p, Documents, [Roles.SERVICEMANAGER])}
            />
            <Route exact path="/">
              <Redirect to={mainPagePaths[userStore.user?.role]} />
            </Route>
            <Route exact path="*" render={p => <WindowFactory type={WindowType.NotFoundPage} />} />
          </Switch>
        </Auth>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
export default MobXRouterDecorator(Router, false);
