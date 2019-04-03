import React, { Component } from 'react';
import {
  Table,
  Glyphicon,
  Col,
  Row,
  InputGroup,
  FormGroup,
} from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import './TopBottomNEpisodes.scss';

export class TopBottomNEpisodes extends Component {
  constructor(props) {
    super(props);
    this.state = { up: false, count: this.props.maxItems };
  }

  render() {
    const { episodes } = this.props;
    const episodeCountOptions = [
      '5',
      '10',
      '20',
      '30',
      '40',
      '50',
      '75',
      '85',
      '100',
    ];
    return (
      <div>
        <Row className="dashboard--head-row">
          <Col md={4}>
            <FormGroup>
              <InputGroup>
                <InputGroup.Addon className="input-group-prepend">
                  <span className="input-group-text">
                    Kaç bölüm vereyim abime?
                  </span>
                </InputGroup.Addon>
                <Typeahead
                  labelKey="episodeCount"
                  value={this.state.count.toString()}
                  onChange={event =>
                    this.setState({ count: parseInt(event[0], 10) || 20 })
                  }
                  options={episodeCountOptions}
                  placeholder="Kaç?"
                  clearButton
                  selectHintOnEnter
                />
              </InputGroup>
            </FormGroup>
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
                  <th className="w-65">
                    Bolum Adi (Top
                    {this.state.count})
                  </th>
                  <th>Dinlenme</th>
                  <th>Youtube Izlenme</th>
                  <th>
                    Toplam
                    <Glyphicon
                      className="dashboard--up-down-button"
                      onClick={() =>
                        this.setState(oldState => ({ up: !oldState.up }))
                      }
                      glyph={this.state.up ? 'chevron-up' : 'chevron-down'}
                    />
                  </th>
                  <th colSpan="2">Dinle</th>
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
                  .map(episode => (
                    <tr key={episode.id}>
                      <td>{episode.title}</td>
                      <td>{episode.stats.total_listens}</td>
                      <td>
                        {episode.videoRef
                          ? episode.videoRef.statistics.viewCount
                          : 'N/A'}
                      </td>
                      <td>{episode.grandTotal}</td>
                      <td className="align-center">
                        {' '}
                        <a
                          href={episode.sharing_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Simplecast'de dinle"
                        >
                          <Glyphicon glyph="play-circle" />
                        </a>
                      </td>
                      <td className="align-center">
                        {episode.videoRef ? (
                          <a
                            href={`https://www.youtube.com/watch?v=${
                              episode.videoRef.snippet.resourceId.videoId
                            }`}
                            title="Youtube'da izle"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Glyphicon glyph="play-circle" />
                          </a>
                        ) : (
                          '-'
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TopBottomNEpisodes;
