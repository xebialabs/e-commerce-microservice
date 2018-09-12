import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Invoice from './invoice';
import InvoiceDetail from './invoice-detail';
import InvoiceUpdate from './invoice-update';
import InvoiceDeleteDialog from './invoice-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={InvoiceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={InvoiceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={InvoiceDetail} />
      <ErrorBoundaryRoute path={match.url} component={Invoice} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={InvoiceDeleteDialog} />
  </>
);

export default Routes;
