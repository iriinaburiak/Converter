import React, { useState } from "react";
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

class Header extends React.Component {

  roundRate(rate) {
    return Math.round(1/rate * 1000) / 1000;
  }
 
  getUsdEurRates() {
    return (<div className="header__current-rates">
      <span className="header__dollar-rate">
        <b>USD: </b>
        <a className="header__link"
          href="https://charts.finance.ua/ua/currency/interbank/-/1/usd#table"
          target="_blank"
          rel="noreferrer">
          {this.roundRate(this.props.rates.USD)}
        </a>
      </span>
      <b className="header__divider"> | </b>
      <span className="header__euro-rate">
        <b>EUR: </b>
        <a className="header__link"
          href="https://charts.finance.ua/ua/currency/interbank/-/1/eur#table"
          target="_blank"
          rel="noreferrer">
          {this.roundRate(this.props.rates.EUR)}
        </a>
      </span>
    </div>);
  }

  render() {
    const areRatesLoaded = this.props.areRatesLoaded;
    const rates = areRatesLoaded ? this.getUsdEurRates() : (
      <div className="header__current-rates">Loading...</div>
    );

    return (
      <header className="header">
        <h1 className='header__title'>Currency exchange</h1>
        {rates}
      </header>
    )
  }
}

class Converter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstAmount: 0,
      firstCurrency: 'UAH',

      secondAmount: 0,
      secondCurrency: 'USD'
    };
  }

  roundAmount(amount) {
    return Math.round(amount * 1000) / 1000;
  }

  onFirstAmountChange(firstAmount) {
    const rates = this.props.rates;
    this.setState({firstAmount});

    const secondAmount = this.roundAmount(firstAmount * rates[this.state.secondCurrency] / rates[this.state.firstCurrency])
    this.setState({secondAmount});
  }

  onFirstCurrencyChange(firstCurrency) {
    const rates = this.props.rates;
    this.setState({firstCurrency});

    const secondAmount = this.roundAmount(this.state.firstAmount * rates[this.state.secondCurrency] / rates[firstCurrency])
    this.setState({secondAmount});
  }

  onSecondAmountChange(secondAmount) {
    const rates = this.props.rates;
    this.setState({secondAmount});

    const firstAmount = this.roundAmount(secondAmount * rates[this.state.firstCurrency] / rates[this.state.secondCurrency]);
    this.setState({firstAmount});
  }

  onSecondCurrencyChange(secondCurrency) {
    const rates = this.props.rates;
    this.setState({secondCurrency});

    const firstAmount = this.roundAmount(this.state.secondAmount * rates[this.state.firstCurrency] / rates[secondCurrency]);
    this.setState({firstAmount});
  }

  render() {
    return (
      <section className="main-area">
        <div className="main-area__converter">
          <RateInput
            rates = {this.props.rates}
            currency={this.state.firstCurrency}
            amount = {this.state.firstAmount}
            onAmountChange = {this.onFirstAmountChange.bind(this)}
            onCurrencyChange = {this.onFirstCurrencyChange.bind(this)}
          />
          <RateInput
            isSecond={true}
            rates = {this.props.rates}
            currency={this.state.secondCurrency}
            amount = {this.state.secondAmount}
            onAmountChange = {this.onSecondAmountChange.bind(this)}
            onCurrencyChange = {this.onSecondCurrencyChange.bind(this)}
          />
        </div>
      </section>
    )
  }
}

class RateInput extends React.Component {
  getAmountInput() {
    return (
      <input type="number" name="amount" id="amount"
          className="converter__input"
          value={this.props.amount}
          onChange={event => this.props.onAmountChange(event.target.value)}/>
    );
  }

  render() {
    return (
      <div className="converter__rate">
        {this.props.isSecond && this.getAmountInput()}
        <select name="currency" id="currency" className="converter__select"
          value={this.props.currency}
          onChange={event => this.props.onCurrencyChange(event.target.value)}>
          {Object.entries(this.props.rates).map(([rateName]) => {
            return <option value={rateName}>{rateName}</option>
          })}
        </select>

        {!this.props.isSecond && this.getAmountInput()}
      </div>
    )
  }
}

export default App;
