import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
// import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import Header from './Header';
import endpoints from '../constants/endpoints';
import ProjectCard from './projects/ProjectCard';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  containerStyle: {
    marginBottom: 25,
  },
  showMoreStyle: {
    margin: 25,
  },
};

const Projects = (props) => {
  // const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  // const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(endpoints.projects, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        const ongoingProjects = res.projects.filter((project) => project.status === 'ongoing');
        const completedProjects = res.projects.filter((project) => project.status === 'completed');
        setData({ ongoing: ongoingProjects, completed: completedProjects });
      })
      .catch((err) => err);
  }, []);
  // const numberOfItems = showMore && data ? data.length : 6;
  return (
    <>
      <Header title={header} />
      {data ? (
        <div className="section-content-container">
          <Container style={styles.containerStyle}>
            <h2 style={{ textAlign: 'left', fontWeight: 'bold' }}>  Past Projects</h2>
            <Row xs={1} sm={1} md={2} lg={3} className="g-4">
              {data.completed?.map((project) => (
                <Fade key={project.title}>
                  <ProjectCard project={project} />
                </Fade>
              ))}
            </Row>
            <h2 style={{ textAlign: 'left', fontWeight: 'bold', marginTop: '5rem' }}> Ongoing Projects</h2>
            <Row xs={1} sm={1} md={2} lg={3} className="g-4">
              {data.ongoing?.map((project) => (
                <Fade key={project.title}>
                  <ProjectCard project={project} />
                </Fade>
              ))}
            </Row>
          </Container>
        </div>
      ) : <FallbackSpinner />}
    </>
  );
};

Projects.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Projects;
