import React, { Component } from 'react';
import { Table, Glyphicon,Grid, Col, Row } from 'react-bootstrap';
import './TopBottom10Episodes.scss';

export class TopBottom10Episodes extends Component {
	state = { up: false };

	render() {
		const episodes = this.props.episodes;

		return (
			<Grid>
				<Row className="dashboard--head-row">
					<Col sm={8}>
						<label>Top/Bottom 10 Podcast bolumu</label>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
					<Table striped bordered condensed hover>
					<thead>
						<tr>
							<th>Bolum Adi</th>
							<th>Toplam Dinleme <Glyphicon className="dashboard--up-down-button" onClick={(event) => this.setState({ up: !this.state.up })} glyph={this.state.up ? 'chevron-up' : 'chevron-down'} /></th>
						</tr>
					</thead>
					<tbody>
						{episodes
							.sort(
								(ep1, ep2) =>
									this.state.up
										? ep1.stats.total_listens - ep2.stats.total_listens
										: ep2.stats.total_listens - ep1.stats.total_listens
							)
							.slice(0, 10)
							.map((episode) => {
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

export default TopBottom10Episodes;
