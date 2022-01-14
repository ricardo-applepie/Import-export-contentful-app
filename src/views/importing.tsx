import React from 'react';
import { Link } from 'react-router-dom';
import {
  Spinner,
  Button,
  Paragraph,
} from '@contentful/forma-36-react-components';

function Importing() {
  return (
    <div className="page-wrapper">
      <div className="import-title-border">
        <Paragraph element="h1">Contentful Import</Paragraph>
      </div>
      <div>
        <div className="import-complete">
          <div className="import-complete__title">
            <div>
              <Paragraph>Import Complete </Paragraph>
            </div>
            <div>
              {' '}
              <Spinner />
            </div>
          </div>
          <div className="import-details">
            <div>
              <Paragraph>Finished ! </Paragraph>
            </div>
            <div>
              <Paragraph>Imported </Paragraph>
            </div>
            <div>
              <Paragraph>3 Content Types</Paragraph>
            </div>
            <div>
              <Paragraph>10 Content Entries</Paragraph>
            </div>
            <div className="import-details_ok-btn">
              <Link to="/">
                <Button>Ok</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Importing;
