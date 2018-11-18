import React, { Component } from 'react';
import TopEpisodesChart from '../TopEpisodesChart';
import { Grid, Row, Col } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

export class TotalListensTabView extends Component {
    state = { selectedItem: {} };
    render() {
        const episodes = this.props.episodes;
        const youtubeVideos = this.props.youtubeVideos;
        return (
            <Grid>
                <Row md={12}>
                    <Col md={8}>
                        <label>Bolum adi girin</label>
                        <Typeahead
                            labelKey="title"
                            options={episodes}
                            onChange={selectedItem =>
                                this.setState({ selectedItem })
                            }
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
