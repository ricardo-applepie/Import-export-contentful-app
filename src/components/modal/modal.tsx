import React from 'react';
import {
  Modal,
  Button,
  Paragraph,
} from '@contentful/forma-36-react-components';

function ModalExample() {
  const [isShown, setShown] = React.useState(false);

  function showModal() {
    setShown(true);
  }
  function hideModal() {
    setShown(false);
  }

  return (
    <React.Fragment>
      <Button onClick={() => showModal()}>Show centered modal</Button>
      <Modal
        onClose={() => hideModal()}
        title="Centered modal"
        isShown={isShown}
      >
        {() => (
          <React.Fragment>
            <Modal.Header title="Title" />
            <Modal.Content>Hello from controlled modal window</Modal.Content>
            <Modal.Controls>
              <Button buttonType="positive" onClick={() => setShown(false)}>
                Confirm
              </Button>
              <Button buttonType="muted" onClick={() => setShown(false)}>
                Close
              </Button>
            </Modal.Controls>
          </React.Fragment>
        )}
      </Modal>
    </React.Fragment>
  );
}
