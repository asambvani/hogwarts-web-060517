import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav'
import Hogs from './porkers_data'
import Pig from './components/Pig'
import Filter from './components/Filter'

class App extends Component {

  constructor(){
    let idCount = 0
    super()
    let visibleHogs = Hogs.map(hog=>{
      hog['id'] = ++idCount
      hog['display'] = 'inline'
      return hog
    })

    this.state = {
      pigs: visibleHogs,
      filterBy: 'All',
      sortBy: 'Name',
      showGifs: false,
      pigGifs: []
    }
  }

  hidePig = (e) =>{
    let id = parseInt(e.target.attributes.name.value)
    let newPigs = this.state.pigs.map(pig => {
      if(pig.id === id){
        pig.display = 'none'
      }
      return pig
    })
    this.setState({
      pigs: newPigs
    })
    console.log(this.state)
  }

  sortPigs = (e) => {
    this.setState({
      sortBy: e.target.innerHTML
    })
  }

  filterPigs = (e) => {
    this.setState({
      filterBy: e.target.innerHTML
    })
  }

  showPigs = (e) => {
    let resetPigs = this.state.pigs.map( pig => {
      pig.display = 'inline'
      return pig
    })
    this.setState({
      pigs: resetPigs
    })
  }

  showGifs = (e) => {
    this.setState({
      pigGifs: []
    }, () => {
      let words = ['pigs', 'porky+pig', 'thatll+do+pig', 'miss+piggy']
      let num = [Math.floor(Math.random() * words.length) + 1]
      let url = `http://api.giphy.com/v1/gifs/search?q=` + `${words[num]}` + `&api_key=f2d65e9d48754d739f8eabee2f011f0c`
      let  headers = new Headers
      headers.set('Content-Type', 'application/json')

      let config = {
        method: "GET",
        headers: headers
      }

      let request = fetch(url, config)
      return request
      .then(resp => resp.json())
      .then(data => {
        return data.data.forEach(obj => {
          if(obj.images.downsized){
            this.setState({
              pigGifs: [...this.state.pigGifs, obj.images.downsized.url]
            })
          }
        })
      })
      .then(() => {console.log(this.state.pigGifs)})
      .then(() => {
        this.setState({
          showGifs: !this.state.showGifs
        })
      })
    })
  }

  render() {

    let filteredPigs = this.state.pigs.filter(pig => {
      if (this.state.filterBy === "Greased") {
        return pig.greased === true
      }
      else if(this.state.filterBy === "Not Greased") {
        return pig.greased === false
      }
      else {
        return true
      }
    })

    let sortedPigs = filteredPigs.sort((pig1,pig2) => {

      const weight = `weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water`

      if(this.state.sortBy === 'Name'){
        if(pig1.name < pig2.name){
          return -1;
        }
        else {
          return 1;
        }
      }
      else {
        return pig1[weight] - pig2[weight]
      }
    })

    const pigs = sortedPigs.map( (pig, index) => {
      return (
        <Pig pig={pig} key={index} index={index} onHidePig={this.hidePig} display={pig.display} />
      )
    })



    return (
      <div className="App">
          < Nav />
          <Filter onSort={this.sortPigs} onFilter={this.filterPigs} filterMode={this.state.filterBy} sortMode={this.state.sortBy} showAllPigs={this.showPigs} showPigGifs={this.showGifs} gifButtonTitle={this.state.showGifs}/>
          {this.state.showGifs && <div>
            <img src={this.state.pigGifs[Math.floor(Math.random() * this.state.pigGifs.length) + 1]} alt="pig gif" />
          </div>}
          <p></p>
          <div className="ui grid container" style={{'paddingLeft': '80px'}}>{pigs}</div>
      </div>
    )
  }
}

export default App;
