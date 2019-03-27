import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Typeahead } from 'react-bootstrap-typeahead';
import { TopEpisodesChart } from '../TopEpisodesChart';
import 'react-bootstrap-typeahead/css/Typeahead.css';

export class TotalListensTabView extends Component {
  constructor() {
    super();
    this.state = { selectedItem: {} };
  }

  render() {
    const { episodes, youtubeVideos } = this.props;
    return (
      <Grid>
        <Row md={12}>
          <Col md={10}>
            <Typeahead
              clearButton
              selectHintOnEnter
              labelKey="title"
              placeholder="Bölüm adı girin"
              options={episodes}
              onChange={selectedItem => this.setState({ selectedItem })}
            />
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <TopEpisodesChart
              episode={this.state.selectedItem}
              videos={youtubeVideos}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}
TotalListensTabView.propTypes = {
  episodes: PropTypes.array,
  youtubeVideos: PropTypes.array,
};

export default TotalListensTabView;
