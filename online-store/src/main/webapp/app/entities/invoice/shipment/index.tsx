import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Shipment from './shipment';
import ShipmentDetail from './shipment-detail';
import ShipmentUpdate from './shipment-update';
import ShipmentDeleteDialog from './shipment-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ShipmentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ShipmentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ShipmentDetail} />
      <ErrorBoundaryRoute path={match.url} component={Shipment} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ShipmentDeleteDialog} />
  </>
);

export default Routes;
