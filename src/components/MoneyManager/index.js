import {Component} from 'react'
import {v4 as uniqueId} from 'uuid'

import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const updatedTransactionList = transactionsList.filter(
      eachTransaction => id !== eachTransaction.id,
    )
    this.setState({
      transactionsList: updatedTransactionList,
    })
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: uniqueId(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeOption = event => {
    this.setState({optionId: event.target.value})
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })
    return expensesAmount
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount
  }

  render() {
    const {titleInput, amountInput, optionId, transactionsList} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="header-container">
            <h1 className="heading"> Hi ,Richard</h1>
            <p className="header-text">
              {' '}
              Welcome back to your <span className="text"> Money Manger</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
          />
          <div className="transaction-container">
            <form className="form" onSubmit={this.onAddTransaction}>
              <h1 className="form-head"> Add Transaction</h1>
              <label htmlFor="title" className="label">
                {' '}
                TITLE
              </label>
              <input
                className="input"
                type="text"
                placeholder="title"
                id="title"
                value={titleInput}
                onChange={this.onChangeTitle}
              />{' '}
              <label htmlFor="title" className="label">
                {' '}
                AMOUNT
              </label>
              <input
                className="input"
                type="text"
                placeholder="amount"
                id="amount"
                value={amountInput}
                onChange={this.onChangeAmount}
              />{' '}
              <label className="label" htmlFor="select">
                {' '}
                TYPE
              </label>
              <select
                id="select"
                className="input"
                onChange={this.onChangeOption}
                value={optionId}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {' '}
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="button">
                {' '}
                Add{' '}
              </button>
            </form>
            <div className="history-container">
              <h1 className="history-heading"> History</h1>
              <div className="table-container">
                <ul className="table">
                  <li className="table-header">
                    <p className="cell"> Title</p>
                    <p className="cell"> Amount</p>
                    <p className="cell"> Type</p>
                  </li>
                  {transactionsList.map(eachTransaction => (
                    <TransactionItem
                      key={eachTransaction.id}
                      transactionDetails={eachTransaction}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
