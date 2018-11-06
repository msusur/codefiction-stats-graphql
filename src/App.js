import React, { Component } from 'react';
import EpisodesChart from './components/EpisodesChart';
import { Grid, Row, Panel, Col } from 'react-bootstrap';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Typeahead } from 'react-bootstrap-typeahead';

import Header from './components/Header';
import Loading from './components/Loading';
import YoutubeOverall from './components/YoutubeOverall';
import { PodcastOverall } from './components/PodcastOverall';
import TwitterOverall from './components/TwitterOverall';
import TopEpisodesChart from './components/TopEpisodesChart';
import EpisodesNeedsAttention from './components/EpisodesNeedsAttention';

const QUERY_EPISODES = (title) => gql`
	{
		podcasts {
			overallStats(timeframe: year) {
				total_listens
			}
			title
			episodes {
				title
				id
				audio_url
				stats(timeframe: all) {
					data {
						date
						listens
					}
					total_listens
				}
			}
		}
		youtube {
			statistics {
				subscriberCount
			}
			videos {
				snippet {
					title
				}
				statistics {
					viewCount
				}
			}
		}
		twitter {
			followersCount
		}
	}
`;

export class App extends Component {
	state = { selectedItem: {} };
	render() {
		return (
			<Query query={QUERY_EPISODES()}>
				{(result) => {
					if (!result.data || !result.data.podcasts) {
						return <Loading />;
					}
					return (
						<div>
							<Header />
							<Grid>
								<Row md={12}>
									<Col md={4}>
										<Panel>
											<Panel.Body>
												<TwitterOverall value={result.data.twitter} />
											</Panel.Body>
										</Panel>
									</Col>
									<Col md={4}>
										<Panel>
											<Panel.Body>
												<YoutubeOverall value={result.data.youtube.statistics} />
											</Panel.Body>
										</Panel>
									</Col>
									<Col md={4}>
										<Panel>
											<Panel.Body>
												<PodcastOverall value={result.data.podcasts} />
											</Panel.Body>
										</Panel>
									</Col>
								</Row>
								<Row>
									<Col md={8}>
										<label>Bolum adi girin</label>
										<Typeahead
											labelKey="title"
											options={result.data.podcasts[0].episodes}
											onChange={(selectedItem) => this.setState({ selectedItem })}
										/>
									</Col>
								</Row>
								<Row>
									<Col md={8}>
										<TopEpisodesChart
											episode={this.state.selectedItem}
											videos={result.data.youtube.videos}
										/>
									</Col>
									<Col md={4}>
										<EpisodesChart podcast={result.data.podcasts[0]} />
									</Col>
								</Row>
								<Row>
									<Col md={12}>
										<EpisodesNeedsAttention episodes={result.data.podcasts[0].episodes} />
									</Col>
								</Row>
							</Grid>
						</div>
					);
				}}
			</Query>
		);
	}
}

export default App;
