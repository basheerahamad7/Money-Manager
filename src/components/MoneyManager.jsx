import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TransactionItem from './TransactionItem';
import MoneyDetails from './MoneyDetails';
import './MoneyManager.css'



const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
];

function MoneyManager() {
  const [transactionsList, setTransactionsList] = useState([]);
  const [titleInput, setTitleInput] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [optionId, setOptionId] = useState(transactionTypeOptions[0].optionId);

  

  const deleteTransaction = (id) => {
    setTransactionsList((prevList) => prevList.filter((transaction) => transaction.id !== id));
  };

  const onAddTransaction = (event) => {
    event.preventDefault();
    const typeOption = transactionTypeOptions.find((option) => option.optionId === optionId);
    const { displayText } = typeOption;

    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput, 10),
      type: displayText,
    };

    setTransactionsList((prevList) => [...prevList, newTransaction]);
    setTitleInput('');
    setAmountInput('');
    setOptionId(transactionTypeOptions[0].optionId);
  };

 

  const getIncome = () =>
    transactionsList.reduce((acc, transaction) =>
      transaction.type === 'Income' ? acc + transaction.amount : acc, 0);

  const getExpenses = () =>
    transactionsList.reduce((acc, transaction) =>
      transaction.type === 'Expenses' ? acc + transaction.amount : acc, 0);

  const getBalance = () => getIncome() - getExpenses();

  return (
    <div className="app-container">
      <div className="responsive-container">
        <div className="header-container">
          <h1 className="heading">Hi, Basheer</h1>
          <p className="header-content">
            Welcome back to your
            <span className="money-manager-text"> Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          balanceAmount={getBalance()}
          incomeAmount={getIncome()}
          expensesAmount={getExpenses()}
        />
        <div className="transaction-details">
          <form className="transaction-form" onSubmit={onAddTransaction}>
            <h1 className="transaction-header">Add Transaction</h1>
            <label className="input-label" htmlFor="title">
              TITLE
            </label>
            <input
              type="text"
              id="title"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              className="input"
              placeholder="TITLE"
            />
            <label className="input-label" htmlFor="amount">
              AMOUNT
            </label>
            <input
              type="number"
              id="amount"
              className="input"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              placeholder="AMOUNT"
            />
            <label className="input-label" htmlFor="select">
              TYPE
            </label>
            <select
              id="select"
              className="input"
              value={optionId}
              onChange={(e) => setOptionId(e.target.value)}
            >
              {transactionTypeOptions.map((option) => (
                <option key={option.optionId} value={option.optionId}>
                  {option.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="button">
              Add
            </button>
          </form>
          <div className="history-transactions">
            <h1 className="transaction-header">History</h1>
            <div className="transactions-table-container">
              <ul className="transactions-table">
                <li className="table-header">
                  <p className="table-header-cell">Title</p>
                  <p className="table-header-cell">Amount</p>
                  <p className="table-header-cell">Type</p>
                  
                </li>
                {transactionsList.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transactionDetails={transaction}
                    deleteTransaction={deleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoneyManager;
