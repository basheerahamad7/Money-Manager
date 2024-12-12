import './TransactionItem.css'
import PropTypes from 'prop-types';

function TransactionItem({ transactionDetails: { id, title, amount, type }, deleteTransaction }) {
    const onDeleteTransaction = () => {
      deleteTransaction(id);
    };
  
    return (
      <li className="table-row">
        <p className="transaction-text">{title}</p>
        <p className="transaction-text">Rs {amount}</p>
        <p className="transaction-text">{type}</p>
        <div>
          <button
            className="delete-button"
            type="button"
            onClick={onDeleteTransaction}
          >
            <img
              className="delete-img"
              src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
              alt="delete"
            />
          </button>
        </div>
      </li>
    );
  }
  
  TransactionItem.propTypes = {
    transactionDetails: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired,
    deleteTransaction: PropTypes.func.isRequired,
  };

  export default TransactionItem;
  