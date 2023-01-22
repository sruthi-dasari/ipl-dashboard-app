import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import TeamCard from '../TeamCard'

class Home extends Component {
  state = {
    isLoading: true,
    teamsData: {},
  }

  componentDidMount() {
    this.getTeamsData()
  }

  getTeamsData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const statusCode = await response.statusCode
    // console.log(statusCode)

    const data = await response.json()
    // console.log(data)

    const formattedData = data.teams.map(eachItem => ({
      name: eachItem.name,
      id: eachItem.id,
      teamImageUrl: eachItem.team_image_url,
    }))

    this.setState({teamsData: formattedData, isLoading: false})
  }

  render() {
    const {isLoading, teamsData} = this.state
    // console.log(isLoading)

    return (
      <div className="app-container">
        <div className="heading-container">
          <img
            className="app-logo"
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
          />
          <h1 className="main-heading">IPL Dashboard</h1>
        </div>

        {/* testid="loader" */}

        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <ul className="matches-list-container">
            {teamsData.map(item => (
              <TeamCard cardDetails={item} key={item.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default Home
