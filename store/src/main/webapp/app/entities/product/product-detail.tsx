import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './product.reducer';
import { IProduct } from 'app/shared/model/product.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class ProductDetail extends React.Component<IProductDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { productEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="storeApp.product.detail.title">Product</Translate> [<b>{productEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="storeApp.product.name">Name</Translate>
              </span>
            </dt>
            <dd>{productEntity.name}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="storeApp.product.description">Description</Translate>
              </span>
            </dt>
            <dd>{productEntity.description}</dd>
            <dt>
              <span id="price">
                <Translate contentKey="storeApp.product.price">Price</Translate>
              </span>
            </dt>
            <dd>{productEntity.price}</dd>
            <dt>
              <span id="size">
                <Translate contentKey="storeApp.product.size">Size</Translate>
              </span>
            </dt>
            <dd>{productEntity.size}</dd>
            <dt>
              <span id="image">
                <Translate contentKey="storeApp.product.image">Image</Translate>
              </span>
            </dt>
            <dd>
              {productEntity.image ? (
                <div>
                  <a onClick={openFile(productEntity.imageContentType, productEntity.image)}>
                    <img src={`data:${productEntity.imageContentType};base64,${productEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {productEntity.imageContentType}, {byteSize(productEntity.image)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <Translate contentKey="storeApp.product.productCategory">Product Category</Translate>
            </dt>
            <dd>{productEntity.productCategory ? productEntity.productCategory.name : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/product" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/product/${productEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ product }: IRootState) => ({
  productEntity: product.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail);
