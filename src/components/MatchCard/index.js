import {Component} from 'react'
import './index.css'

class MatchCard extends Component {
  render() {
    const {matchCardDetails} = this.props
    const {
      umpires,
      result,
      manOfTheMatch,
      id,
      venue,
      competingTeam,
      competingTeamLogo,
      matchStatus,
    } = matchCardDetails

    let statusColor

    if (matchStatus === 'Won') {
      statusColor = 'green-status'
    } else {
      statusColor = 'red-status'
    }

    return (
      <li className="match-card-container">
        <img
          className="match-card-competing-team-logo"
          src={competingTeamLogo}
          alt={`competing team ${competingTeam}`}
        />
        <p className="match-card-competing-team">{competingTeam}</p>
        <p className="match-card-result">{result}</p>
        <p className={`match-status ${statusColor}`}>{matchStatus}</p>
      </li>
    )
  }
}

export default MatchCard
