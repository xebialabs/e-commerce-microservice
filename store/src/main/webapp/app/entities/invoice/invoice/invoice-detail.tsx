import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './invoice.reducer';
import { IInvoice } from 'app/shared/model/invoice/invoice.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInvoiceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class InvoiceDetail extends React.Component<IInvoiceDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { invoiceEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="storeApp.invoiceInvoice.detail.title">Invoice</Translate> [<b>{invoiceEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="code">
                <Translate contentKey="storeApp.invoiceInvoice.code">Code</Translate>
              </span>
            </dt>
            <dd>{invoiceEntity.code}</dd>
            <dt>
              <span id="date">
                <Translate contentKey="storeApp.invoiceInvoice.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={invoiceEntity.date} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="details">
                <Translate contentKey="storeApp.invoiceInvoice.details">Details</Translate>
              </span>
            </dt>
            <dd>{invoiceEntity.details}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="storeApp.invoiceInvoice.status">Status</Translate>
              </span>
            </dt>
            <dd>{invoiceEntity.status}</dd>
            <dt>
              <span id="paymentMethod">
                <Translate contentKey="storeApp.invoiceInvoice.paymentMethod">Payment Method</Translate>
              </span>
            </dt>
            <dd>{invoiceEntity.paymentMethod}</dd>
            <dt>
              <span id="paymentDate">
                <Translate contentKey="storeApp.invoiceInvoice.paymentDate">Payment Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={invoiceEntity.paymentDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="paymentAmount">
                <Translate contentKey="storeApp.invoiceInvoice.paymentAmount">Payment Amount</Translate>
              </span>
            </dt>
            <dd>{invoiceEntity.paymentAmount}</dd>
          </dl>
          <Button tag={Link} to="/entity/invoice" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/invoice/${invoiceEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ invoice }: IRootState) => ({
  invoiceEntity: invoice.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoiceDetail);
