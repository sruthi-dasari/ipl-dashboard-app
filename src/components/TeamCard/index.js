import {Component} from 'react'
import './index.css'
import {Link} from 'react-router-dom'

class TeamCard extends Component {
  render() {
    const {cardDetails} = this.props
    const {id, name, teamImageUrl} = cardDetails

    return (
      <Link to={`/team-matches/${id}`} className="item-link">
        <li className="list-item-container">
          <img className="team-image" src={teamImageUrl} alt={name} />
          <p className="team-name">{name}</p>
        </li>
      </Link>
    )
  }
}

export default TeamCard
