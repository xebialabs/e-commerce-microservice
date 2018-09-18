import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './product-order.reducer';
import { IProductOrder } from 'app/shared/model/product-order.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductOrderDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ProductOrderDetail extends React.Component<IProductOrderDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { productOrderEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="storeApp.productOrder.detail.title">ProductOrder</Translate> [<b>{productOrderEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="placedDate">
                <Translate contentKey="storeApp.productOrder.placedDate">Placed Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={productOrderEntity.placedDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="status">
                <Translate contentKey="storeApp.productOrder.status">Status</Translate>
              </span>
            </dt>
            <dd>{productOrderEntity.status}</dd>
            <dt>
              <span id="code">
                <Translate contentKey="storeApp.productOrder.code">Code</Translate>
              </span>
            </dt>
            <dd>{productOrderEntity.code}</dd>
            <dt>
              <span id="invoiceId">
                <Translate contentKey="storeApp.productOrder.invoiceId">Invoice Id</Translate>
              </span>
            </dt>
            <dd>{productOrderEntity.invoiceId}</dd>
            <dt>
              <Translate contentKey="storeApp.productOrder.customer">Customer</Translate>
            </dt>
            <dd>{productOrderEntity.customer ? productOrderEntity.customer.email : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/product-order" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/product-order/${productOrderEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ productOrder }: IRootState) => ({
  productOrderEntity: productOrder.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductOrderDetail);
