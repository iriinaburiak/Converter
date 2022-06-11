import React from "react";

export class RateInput extends React.Component {
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
