import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';

const Footer = props => (
  <div className="footer page-content">
    <Row>
      <Col md="12">
        <p>
          <Translate contentKey="footer">Your footer</Translate>
          <a href="https://www.xebialabs.com/" target="_blank" rel="noopener noreferrer">
            XebiaLabs
          </a>
          <Translate contentKey="footer2">Your footer</Translate>
          <a href="https://www.jhipster.tech/" target="_blank" rel="noopener noreferrer">
            JHipster
          </a>
        </p>
      </Col>
    </Row>
  </div>
);

export default Footer;
