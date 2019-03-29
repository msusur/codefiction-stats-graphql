import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import TopEpisodesChart from '../TopEpisodesChart';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './TotalListensTabView.scss';

export class TotalListensTabView extends Component {
  constructor() {
    super();
    this.state = { selectedItem: {} };
  }

  render() {
    const { episodes, youtubeVideos } = this.props;
    return (
      <div>
        <Col md={12}>
          <Typeahead
            clearButton
            selectHintOnEnter
            labelKey="title"
            placeholder="Bölüm adı girin"
            options={episodes}
            onChange={selectedItem => this.setState({ selectedItem })}
          />
        </Col>
        <Col md={12}>
          <TopEpisodesChart
            episode={this.state.selectedItem}
            videos={youtubeVideos}
          />
        </Col>
      </div>
    );
  }
}

export default TotalListensTabView;
