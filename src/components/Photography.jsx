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
    width: '80vw', // 80% of the viewport width
    height: '60vh', // 60% of the viewport height
    margin: 'auto', // Center the container on the page
  },
  imageStyle: {
    width: 'auto',
    height: '250px',
    objectFit: 'contain',
    padding: 0,
    margin: 0,
  },
  modalImage: {
    maxWidth: '100%',
    maxHeight: '80vh',
    objectFit: 'contain',
    display: 'block',
    margin: 'auto',
  },
  imageAndDescriptionContainer: {
    textAlign: 'center',
    maxWidth: '100%',
  },
  modalBody: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90vh',
    padding: '10px',
  },
  photoDescription: {
    marginTop: '15px',
    display: 'center',
    width: '100%',
    fontSize: '1rem',
  },
};

function Photography(props) {
  const { header } = props;
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState({ url: '', location: '' });

  useEffect(() => {
    fetch(endpoints.photography, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res.photography))
      .catch((err) => err);
  }, []);

  const openModal = (photo) => {
    setSelectedPhoto({ url: photo.image, location: photo.location });
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
                      onClick={() => openModal(photo)}
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
            <div style={styles.imageAndDescriptionContainer}>
              <Image src={selectedPhoto.url} style={styles.modalImage} fluid />
              <div style={styles.photoDescription}>{selectedPhoto.location}</div>
            </div>
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
