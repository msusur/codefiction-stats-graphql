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
import OverallStatsTimeSeries from './components/OverallStatsTimeSeries';

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
		overallTimeSeries {
			twitter
			youtube
			podcast
			createdOn
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
											<Panel.Body className="bg-primary text-white">
												<OverallValue
													valueKey = {'twitter'}
													text = {'Twitter Takipci Sayisi'}
													series={result.data.overallTimeSeries}
												  value = {result.data.twitter ? result.data.twitter.followersCount : null} />
											</Panel.Body>
										</Panel>
									</Col>
									<Col md={4}>
										<Panel>
											<Panel.Body className="bg-success text-white">
												<OverallValue
													valueKey = {'youtube'}
													text = {'Toplam Youtube Takipcisi'}
													series={result.data.overallTimeSeries}
												  value = {result.data.youtube.statistics ? result.data.youtube.statistics.subscriberCount : null} />
											</Panel.Body>
										</Panel>
									</Col>
									<Col md={4}>
										<Panel>
											<Panel.Body className="bg-info text-white">
													<OverallValue
														valueKey = {'podcast'}
														text = {'Toplam Podcast Dinleme'}
														series={result.data.overallTimeSeries}
														value = {result.data.podcasts ? result.data.podcasts[0].overallStats.total_listens : null} />
											</Panel.Body>
										</Panel>
									</Col>
								</Row>
								<Row>
									<Col md={3}></Col>
									<Col md={6}>
									<label>Gunlere gore genel veriler</label>
										<OverallStatsTimeSeries data={result.data.overallTimeSeries}></OverallStatsTimeSeries>
									</Col>
									<Col md={3}></Col>
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
