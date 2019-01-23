import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './notification.reducer';
import { INotification } from 'app/shared/model/notification/notification.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INotificationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface INotificationUpdateState {
  isNew: boolean;
}

export class NotificationUpdate extends React.Component<INotificationUpdateProps, INotificationUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    values.date = new Date(values.date);
    values.sentDate = new Date(values.sentDate);

    if (errors.length === 0) {
      const { notificationEntity } = this.props;
      const entity = {
        ...notificationEntity,
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
    this.props.history.push('/entity/notification');
  };

  render() {
    const { notificationEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="storeApp.notificationNotification.home.createOrEditLabel">
              <Translate contentKey="storeApp.notificationNotification.home.createOrEditLabel">Create or edit a Notification</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : notificationEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="notification-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="dateLabel" for="date">
                    <Translate contentKey="storeApp.notificationNotification.date">Date</Translate>
                  </Label>
                  <AvInput
                    id="notification-date"
                    type="datetime-local"
                    className="form-control"
                    name="date"
                    value={isNew ? null : convertDateTimeFromServer(this.props.notificationEntity.date)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="detailsLabel" for="details">
                    <Translate contentKey="storeApp.notificationNotification.details">Details</Translate>
                  </Label>
                  <AvField id="notification-details" type="text" name="details" />
                </AvGroup>
                <AvGroup>
                  <Label id="sentDateLabel" for="sentDate">
                    <Translate contentKey="storeApp.notificationNotification.sentDate">Sent Date</Translate>
                  </Label>
                  <AvInput
                    id="notification-sentDate"
                    type="datetime-local"
                    className="form-control"
                    name="sentDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.notificationEntity.sentDate)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="formatLabel">
                    <Translate contentKey="storeApp.notificationNotification.format">Format</Translate>
                  </Label>
                  <AvInput
                    id="notification-format"
                    type="select"
                    className="form-control"
                    name="format"
                    value={(!isNew && notificationEntity.format) || 'EMAIL'}
                  >
                    <option value="EMAIL">
                      <Translate contentKey="storeApp.NotificationType.EMAIL" />
                    </option>
                    <option value="SMS">
                      <Translate contentKey="storeApp.NotificationType.SMS" />
                    </option>
                    <option value="PARCEL">
                      <Translate contentKey="storeApp.NotificationType.PARCEL" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="userIdLabel" for="userId">
                    <Translate contentKey="storeApp.notificationNotification.userId">User Id</Translate>
                  </Label>
                  <AvField
                    id="notification-userId"
                    type="string"
                    className="form-control"
                    name="userId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="productIdLabel" for="productId">
                    <Translate contentKey="storeApp.notificationNotification.productId">Product Id</Translate>
                  </Label>
                  <AvField
                    id="notification-productId"
                    type="string"
                    className="form-control"
                    name="productId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/notification" replace color="info">
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
  notificationEntity: storeState.notification.entity,
  loading: storeState.notification.loading,
  updating: storeState.notification.updating,
  updateSuccess: storeState.notification.updateSuccess
});

const mapDispatchToProps = {
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
)(NotificationUpdate);
