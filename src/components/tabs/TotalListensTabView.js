import React, { Component } from 'react';
import TopEpisodesChart from '../TopEpisodesChart';
import { Grid, Row, Col } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

export class TotalListensTabView extends Component {
  state = { selectedItem: {} };
  render() {
    const episodes = this.props.episodes;
    const youtubeVideos = this.props.youtubeVideos;
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

export default TotalListensTabView;
