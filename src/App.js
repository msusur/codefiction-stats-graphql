import React, { Component } from 'react';
import EpisodesChart from './components/EpisodesChart';
import { Grid, Row, Panel, Col } from 'react-bootstrap';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { Typeahead } from 'react-bootstrap-typeahead';

import Header from './components/Header';
import Loading from './components/Loading';
import TopEpisodesChart from './components/TopEpisodesChart';
import TopBottom10Episodes from './components/TopBottom10Episodes';
import OverallValue from './components/OverallValue';

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
												<OverallValue
													valueKey = {'twitter_overall'}
													text = {'Twitter Takipci Sayisi'}
												  value = {result.data.twitter ? result.data.twitter.followersCount : null} />
											</Panel.Body>
										</Panel>
									</Col>
									<Col md={4}>
										<Panel>
											<Panel.Body>
												<OverallValue
													valueKey = {'youtube_overall'}
													text = {'Toplam Youtube Takipcisi'}
												  value = {result.data.youtube.statistics ? result.data.youtube.statistics.subscriberCount : null} />
											</Panel.Body>
										</Panel>
									</Col>
									<Col md={4}>
										<Panel>
											<Panel.Body>
													<OverallValue
														valueKey = {'podcast_overall'}
														text = {'Toplam Podcast Dinleme'}
														value = {result.data.podcasts ? result.data.podcasts[0].overallStats.total_listens : null} />
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
										<TopBottom10Episodes episodes={result.data.podcasts[0].episodes} />
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
