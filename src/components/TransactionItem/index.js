import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {id, title, amount, type} = transactionDetails

  const onDelete = () => {
    deleteTransaction(id)
  }

  return (
    <li className="table-rows-container">
      <p className="transaction-text">{title}</p>
      <p className="transaction-text"> Rs {amount}</p>
      <p className="transaction-text"> {type}</p>
      <div className="delete-container">
        <button className="delete" type="button" onClick={onDelete}>
          <img
            className="img-delete"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
