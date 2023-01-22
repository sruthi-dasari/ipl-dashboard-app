import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    matchesData: {},
  }

  componentDidMount() {
    this.getMatchesData()
  }

  getMatchesData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    console.log(data)

    const latestMatchDetails = {
      umpires: data.latest_match_details.umpires,
      result: data.latest_match_details.result,
      manOfTheMatch: data.latest_match_details.man_of_the_match,
      id: data.latest_match_details.id,
      date: data.latest_match_details.date,
      venue: data.latest_match_details.venue,
      competingTeam: data.latest_match_details.competing_team,
      competingTeamLogo: data.latest_match_details.competing_team_logo,
      firstInnings: data.latest_match_details.first_innings,
      secondInnings: data.latest_match_details.second_innings,
      matchStatus: data.latest_match_details.match_status,
    }

    const recentMatches = data.recent_matches.map(eachItem => ({
      umpires: eachItem.umpires,
      result: eachItem.result,
      manOfTheMatch: eachItem.man_of_the_match,
      id: eachItem.id,
      date: eachItem.date,
      venue: eachItem.venue,
      competingTeam: eachItem.competing_team,
      competingTeamLogo: eachItem.competing_team_logo,
      firstInnings: eachItem.first_innings,
      secondInnings: eachItem.second_innings,
      matchStatus: eachItem.match_status,
    }))

    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails,
      recentMatches,
    }
    console.log(updatedData)

    this.setState({isLoading: false, matchesData: updatedData})
  }

  render() {
    const {isLoading, matchesData} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = matchesData
    const {match} = this.props
    const {params} = match
    const {id} = params

    let shade

    if (id === 'RCB') {
      shade = 'red-yellow-black'
    } else if (id === 'KKR') {
      shade = 'purple-yellow'
    } else if (id === 'KXP') {
      shade = 'red-grey'
    } else if (id === 'CSK') {
      shade = 'yellow-blue'
    } else if (id === 'RR') {
      shade = 'pink-blue'
    } else if (id === 'MI') {
      shade = 'blue-yellow'
    } else if (id === 'SH') {
      shade = 'orange-black'
    } else if (id === 'DC') {
      shade = 'red-darkblue'
    }

    return (
      <div className={`team-matches-container ${shade}`}>
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <>
            <img
              className="team-banner"
              src={teamBannerUrl}
              alt="team banner"
            />
            <h1 className="latest-matches-heading">Latest Matches</h1>
            <LatestMatch latestMatchDetails={latestMatchDetails} />

            <ul className="match-cards-container">
              {recentMatches.map(item => (
                <MatchCard matchCardDetails={item} key={item.id} />
              ))}
            </ul>
          </>
        )}
      </div>
    )
  }
}

export default TeamMatches
