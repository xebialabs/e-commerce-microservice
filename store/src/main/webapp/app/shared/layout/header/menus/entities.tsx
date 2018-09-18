import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    <DropdownItem tag={Link} to="/entity/product">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.product" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/product-category">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.productCategory" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/customer">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.customer" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/product-order">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.productOrder" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/order-item">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.orderItem" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/notification">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.notificationNotification" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/invoice">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.invoiceInvoice" />
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/shipment">
      <FontAwesomeIcon icon="asterisk" />&nbsp;<Translate contentKey="global.menu.entities.invoiceShipment" />
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
