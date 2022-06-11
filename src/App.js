import React from "react";
import {Header} from './components/Header.js';
import {Converter} from './components/Converter.js';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      rates: {usd: 0, eur: 0},
      areRatesLoaded: false
    };
  }

  componentDidMount() {
    this.fetchCurrentRates();
    this.timer = setInterval(() => this.fetchCurrentRates(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  fetchCurrentRates() {
    console.log(123);
    fetch("https://api.exchangerate.host/latest?base=UAH")
      .then((res) => res.json())
      .then((resJson) => {
          this.setState({
            rates: resJson.rates,
            areRatesLoaded: true
          });
      });
  }

  render() {
    return (
      <div className="App">
        <Header rates = {this.state.rates} areRatesLoaded = {this.state.areRatesLoaded}/>
        <Converter rates = {this.state.rates} areRatesLoaded = {this.state.areRatesLoaded}/>
      </div>
    );
  }
}

export default App;
