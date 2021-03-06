import React, { Component } from 'react';
import axios from 'axios';
import Map from './GoogleMaps';
import './App.css';

class App extends Component {
  state = { address: '', location: null}

  onAddressSubmit = () => {
    axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=APIKEY&input=${this.state.address}&inputtype=textquery`)
    .then(response => {
      let place_id = null;
      try {
        place_id = response.data.candidates[0].place_id;
      } catch(e) {
        console.error(e);
      }
      if (place_id !== null) {
        axios.get(`https://maps.googleapis.com/maps/api/place/details/json?key=APIKEY&placeid=${place_id}&fields=geometry`)
        .then(response => {
          console.log(response.data.result.geometry.location);
          this.setState({
            location: response.data.result.geometry.location
          })
        })
      }
    })
  }

  handleKeyPress = (event) => {
    console.log('called', event.key);
    if (event.key == 'Enter') {
      this.onAddressSubmit();
    }
  }

  onAddressChange = (event) => {
    this.setState({ address: event.target.value });
    
  }

  render() {
    return (
      <div className="App">
        <input type="text" value={this.state.address} onChange={this.onAddressChange} name="search" placeholder="Search..." onKeyPress={this.handleKeyPress}/>
        <Map 
          location={this.state.location}
        />
      </div>

    );
  }
}

export default App;
