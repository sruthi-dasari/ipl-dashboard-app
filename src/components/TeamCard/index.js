import {Component} from 'react'
import './index.css'

class TeamCard extends Component {
  render() {
    const {cardDetails} = this.props
    const {name, teamImageUrl} = cardDetails

    return (
      <li className="list-item-container">
        <img className="team-image" src={teamImageUrl} alt={name} />
        <p className="team-name">{name}</p>
      </li>
    )
  }
}

export default TeamCard
