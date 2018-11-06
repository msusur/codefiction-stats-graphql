import React, { Component } from 'react';
import { Table, Button, Glyphicon } from 'react-bootstrap';
import './EpisodesNeedsAttention.scss';

export class EpisodesNeedsAttention extends Component {
	state = { up: false };

	render() {
		const episodes = this.props.episodes;

		return (
			<div>
				<div>
					<label>En az dinlenen 10 Podcast bolumu</label>
				</div>
				<div className="dashboard--button-container">
					<Button bsSize="small" onClick={(event) => this.setState({ up: !this.state.up })}>
						<Glyphicon glyph={this.state.up ? 'chevron-up' : 'chevron-down'} />{' '}
						{this.state.up ? 'Cok' : 'Az'}
					</Button>
				</div>
				<Table striped bordered condensed hover>
					<thead>
						<tr>
							<th>Title</th>
							<th>Total Listens</th>
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
			</div>
		);
	}
}

export default EpisodesNeedsAttention;
