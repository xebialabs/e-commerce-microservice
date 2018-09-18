import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './notification.reducer';
import { INotification } from 'app/shared/model/notification/notification.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INotificationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class NotificationDetail extends React.Component<INotificationDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { notificationEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="storeApp.notificationNotification.detail.title">Notification</Translate> [<b>{notificationEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="date">
                <Translate contentKey="storeApp.notificationNotification.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={notificationEntity.date} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="details">
                <Translate contentKey="storeApp.notificationNotification.details">Details</Translate>
              </span>
            </dt>
            <dd>{notificationEntity.details}</dd>
            <dt>
              <span id="sentDate">
                <Translate contentKey="storeApp.notificationNotification.sentDate">Sent Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={notificationEntity.sentDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="format">
                <Translate contentKey="storeApp.notificationNotification.format">Format</Translate>
              </span>
            </dt>
            <dd>{notificationEntity.format}</dd>
            <dt>
              <span id="userId">
                <Translate contentKey="storeApp.notificationNotification.userId">User Id</Translate>
              </span>
            </dt>
            <dd>{notificationEntity.userId}</dd>
            <dt>
              <span id="productId">
                <Translate contentKey="storeApp.notificationNotification.productId">Product Id</Translate>
              </span>
            </dt>
            <dd>{notificationEntity.productId}</dd>
          </dl>
          <Button tag={Link} to="/entity/notification" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/notification/${notificationEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ notification }: IRootState) => ({
  notificationEntity: notification.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationDetail);
