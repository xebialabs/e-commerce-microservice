import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Notification from './notification';
import NotificationDetail from './notification-detail';
import NotificationUpdate from './notification-update';
import NotificationDeleteDialog from './notification-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NotificationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NotificationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NotificationDetail} />
      <ErrorBoundaryRoute path={match.url} component={Notification} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={NotificationDeleteDialog} />
  </>
);

export default Routes;
