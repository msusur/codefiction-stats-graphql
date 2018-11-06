import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export class EpisodesNeedsAttention extends Component {
	render() {
		const episodes = this.props.episodes;

		return (
			<div>
				<label>En az dinlenen 10 Podcast bolumu</label>
				<Table striped bordered condensed hover>
					<thead>
						<tr>
							<th>Title</th>
							<th>Total Listens</th>
							<th>Link</th>
						</tr>
					</thead>
					<tbody>
						{episodes
							.sort((ep1, ep2) => ep1.stats.total_listens - ep2.stats.total_listens)
							.slice(0, 10)
							.map((episode) => {
								return (
									<tr>
										<td>{episode.title.substring(0, 20)}...</td>
										<td>{episode.stats.total_listens}</td>
										<td>
											<a href={episode.audio_url}>{episode.title}</a>
										</td>
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
