import React, { Component } from 'react';
import { Table, Glyphicon, Grid, Col, Row } from 'react-bootstrap';
import './TopBottomNEpisodes.scss';

export class TopBottomNEpisodes extends Component {
  constructor(props) {
    super(props);
    this.state = { up: false, count: this.props.maxItems };
  }
  render() {
    const episodes = this.props.episodes;

    return (
      <Grid>
        <Row className="dashboard--head-row">
          <Col sm={8}>
            <label>Kac tane gosterilecek</label>
            <input
              type="text"
              placeholder="Max. episodes to show"
              value={this.state.count}
              onChange={event => this.setState({ count: event.target.value })}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Table
              striped
              bordered
              condensed
              hover
              className="dashboard--fix-head"
            >
              <thead>
                <tr>
                  <th>Bolum Adi (Top {this.state.count})</th>
                  <th>Dinlenme</th>
                  <th>Youtube Izlenme</th>
                  <th>
                    Toplam{' '}
                    <Glyphicon
                      className="dashboard--up-down-button"
                      onClick={event => this.setState({ up: !this.state.up })}
                      glyph={this.state.up ? 'chevron-up' : 'chevron-down'}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {episodes
                  .sort((ep1, ep2) =>
                    this.state.up
                      ? ep1.grandTotal - ep2.grandTotal
                      : ep2.grandTotal - ep1.grandTotal
                  )
                  .slice(
                    0,
                    this.state.count === 0 ? episodes.length : this.state.count
                  )
                  .map(episode => {
                    return (
                      <tr key={episode.id}>
                        <td>
                          <a href={episode.audio_url}>{episode.title}</a>
                        </td>
                        <td>{episode.stats.total_listens}</td>
                        <td>
                          {episode.videoRef
                            ? episode.videoRef.statistics.viewCount
                            : 'N/A'}
                        </td>
                        <td>{episode.grandTotal}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default TopBottomNEpisodes;
