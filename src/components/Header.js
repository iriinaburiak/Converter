import React from "react";

export class Header extends React.Component {

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