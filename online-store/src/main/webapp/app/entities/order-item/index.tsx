import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import OrderItem from './order-item';
import OrderItemDetail from './order-item-detail';
import OrderItemUpdate from './order-item-update';
import OrderItemDeleteDialog from './order-item-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={OrderItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={OrderItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={OrderItemDetail} />
      <ErrorBoundaryRoute path={match.url} component={OrderItem} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={OrderItemDeleteDialog} />
  </>
);

export default Routes;
