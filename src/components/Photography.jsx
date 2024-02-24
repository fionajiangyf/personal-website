import React, { useState, useEffect } from 'react';
import {
  Container, Row, Modal, Image,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  photoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  imageStyle: {
    width: 'auto',
    height: '250px',
    objectFit: 'contain',
    padding: 0,
    margin: 0,
  },
  modalImage: {
    maxWidth: '100%', // Ensures the image does not exceed the modal width
    maxHeight: '80vh', // Limits the image height to 80% of the viewport height to ensure it fits in the modal
    objectFit: 'contain', // Ensures the image is scaled correctly to fit within the constraints without cropping
    display: 'block', // Ensures the image is a block-level element to center it horizontally
    margin: 'auto', // Centers the image horizontally within the modal
  },
  modalBody: {
    display: 'flex', // Enables flexbox for the modal body
    justifyContent: 'center', // Centers the image horizontally
    alignItems: 'center', // Centers the image vertically
    height: '90vh', // Sets a maximum height for the modal body
    padding: '10px', // Adds some padding around the image
  },
};

function Photography(props) {
  const { header } = props;
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState('');

  useEffect(() => {
    fetch(endpoints.photography, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res.photography))
      .catch((err) => err);
  }, []);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data
            ? (
              <Fade>
                <Row>
                  {data.map((photo) => (
                    <Image
                      src={photo.image}
                      thumbnail
                      onClick={() => openModal(`${photo.image}`)}
                      fluid
                      style={styles.imageStyle}
                    />
                  ))}
                </Row>
              </Fade>
            )
            : <FallbackSpinner />}
        </Container>
        <Modal show={showModal} onHide={closeModal} centered size="lg">
          <Modal.Header closeButton />
          <Modal.Body style={styles.modalBody}>
            <Image src={selectedPhoto} style={styles.modalImage} fluid />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

Photography.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Photography;
