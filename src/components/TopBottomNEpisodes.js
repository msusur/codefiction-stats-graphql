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
					<label>
						Kac tane gosterilecek
					</label>
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
                  <th>
                    Toplam Dinleme
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
                      ? ep1.stats.total_listens - ep2.stats.total_listens
                      : ep2.stats.total_listens - ep1.stats.total_listens
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
