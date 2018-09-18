import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './order-item.reducer';
import { IOrderItem } from 'app/shared/model/order-item.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOrderItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class OrderItemDetail extends React.Component<IOrderItemDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { orderItemEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="storeApp.orderItem.detail.title">OrderItem</Translate> [<b>{orderItemEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="quantity">
                <Translate contentKey="storeApp.orderItem.quantity">Quantity</Translate>
              </span>
            </dt>
            <dd>{orderItemEntity.quantity}</dd>
            <dt>
              <span id="totalPrice">
                <Translate contentKey="storeApp.orderItem.totalPrice">Total Price</Translate>
              </span>
            </dt>
            <dd>{orderItemEntity.totalPrice}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="storeApp.orderItem.status">Status</Translate>
              </span>
            </dt>
            <dd>{orderItemEntity.status}</dd>
            <dt>
              <Translate contentKey="storeApp.orderItem.product">Product</Translate>
            </dt>
            <dd>{orderItemEntity.product ? orderItemEntity.product.name : ''}</dd>
            <dt>
              <Translate contentKey="storeApp.orderItem.order">Order</Translate>
            </dt>
            <dd>{orderItemEntity.order ? orderItemEntity.order.code : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/order-item" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/order-item/${orderItemEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ orderItem }: IRootState) => ({
  orderItemEntity: orderItem.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderItemDetail);
