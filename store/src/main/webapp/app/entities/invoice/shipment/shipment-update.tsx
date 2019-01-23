import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IInvoice } from 'app/shared/model/invoice/invoice.model';
import { getEntities as getInvoices } from 'app/entities/invoice/invoice/invoice.reducer';
import { getEntity, updateEntity, createEntity, reset } from './shipment.reducer';
import { IShipment } from 'app/shared/model/invoice/shipment.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IShipmentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IShipmentUpdateState {
  isNew: boolean;
  invoiceId: string;
}

export class ShipmentUpdate extends React.Component<IShipmentUpdateProps, IShipmentUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      invoiceId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getInvoices();
  }

  saveEntity = (event, errors, values) => {
    values.date = new Date(values.date);

    if (errors.length === 0) {
      const { shipmentEntity } = this.props;
      const entity = {
        ...shipmentEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/shipment');
  };

  render() {
    const { shipmentEntity, invoices, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="storeApp.invoiceShipment.home.createOrEditLabel">
              <Translate contentKey="storeApp.invoiceShipment.home.createOrEditLabel">Create or edit a Shipment</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : shipmentEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="shipment-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="trackingCodeLabel" for="trackingCode">
                    <Translate contentKey="storeApp.invoiceShipment.trackingCode">Tracking Code</Translate>
                  </Label>
                  <AvField id="shipment-trackingCode" type="text" name="trackingCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateLabel" for="date">
                    <Translate contentKey="storeApp.invoiceShipment.date">Date</Translate>
                  </Label>
                  <AvInput
                    id="shipment-date"
                    type="datetime-local"
                    className="form-control"
                    name="date"
                    value={isNew ? null : convertDateTimeFromServer(this.props.shipmentEntity.date)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="detailsLabel" for="details">
                    <Translate contentKey="storeApp.invoiceShipment.details">Details</Translate>
                  </Label>
                  <AvField id="shipment-details" type="text" name="details" />
                </AvGroup>
                <AvGroup>
                  <Label for="invoice.code">
                    <Translate contentKey="storeApp.invoiceShipment.invoice">Invoice</Translate>
                  </Label>
                  <AvInput
                    id="shipment-invoice"
                    type="select"
                    className="form-control"
                    name="invoice.id"
                    value={isNew ? invoices[0] && invoices[0].id : shipmentEntity.invoice.id}
                  >
                    {invoices
                      ? invoices.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.code}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/shipment" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  invoices: storeState.invoice.entities,
  shipmentEntity: storeState.shipment.entity,
  loading: storeState.shipment.loading,
  updating: storeState.shipment.updating,
  updateSuccess: storeState.shipment.updateSuccess
});

const mapDispatchToProps = {
  getInvoices,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipmentUpdate);
