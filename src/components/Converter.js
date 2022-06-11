import React from "react";
import {RateInput} from './RateInput.js';

export class Converter extends React.Component {
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
