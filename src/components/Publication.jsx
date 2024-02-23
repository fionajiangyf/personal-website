import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import { Container, Button } from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  iconStyle: {
    height: 75,
    width: 75,
    margin: 10,
    marginBottom: 0,
  },
  introTextContainer: {
    whiteSpace: 'pre-wrap',
  },
  publicationItem: {
    marginBottom: '1rem',
  },
  linkStyle: {
    textDecoration: 'none',
    padding: 10,
  },
  titleStyle: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  contentStyle: {
    fontSize: '18px',
  },
  buttonStyle: {
    margin: 5,
  },
};

function Publication(props) {
  const { header } = props;
  const [data, setData] = useState(null);
  const theme = useContext(ThemeContext);

  const renderPublications = (publications) => (
    publications.map((publication) => (
      <div style={styles.publicationItem} key={publication.id}>
        <h5 style={styles.titleStyle}>{publication.title}</h5>
        <p style={styles.contentStyle}>
          {publication.conference}
        </p>
        <Button
          variant={'outline-' + theme.bsSecondaryVariant}
          style={styles.buttonStyle}
          onClick={() => window.open(publication.link, '_blank')}
        >
          Read More
        </Button>
      </div>
    ))
  );

  useEffect(() => {
    fetch(endpoints.publication, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <Fade>
          <div className="section-content-container">
            <Container>
              {data.publications && renderPublications(data.publications)}
            </Container>
          </div>
        </Fade>
      ) : <FallbackSpinner /> }
    </>
  );
}

Publication.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Publication;
