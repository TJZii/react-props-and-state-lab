import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  petsFetcher = () => {
    let limiter = '/api/pets';

    if(this.state.filters.type != 'all'){
      limiter = `${limiter}` + `?type=${this.state.filters.type}`;
    }
    fetch(limiter)
      .then(results => results.json())
      .then(petList => this.setState({pets: petList}))
  }

  onAdoptPet = (petID) => {
    const pets = this.state.pets.map(pet =>{
      return pet.id == petID ? {...pet, isAdopted: true} : pet;
    })
    this.setState({pets: pets})
  }

  changeType = ({target: {value}}) => {
    this.setState({ filters: {...this.state.filters, type: value }})
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
                onFindPetsClick={this.petsFetcher}
                onChangeType={this.changeType}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
