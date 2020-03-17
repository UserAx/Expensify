import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import numeral from 'numeral';
import selectExpensesTotal from '../selectors/expenses-total';
import selectExpenses from '../selectors/expenses';

export const ExpensesSummary = ({expensesCount, expensesTotal}) => {
    const expenseWord = expensesCount === 1 ? 'expense' : 'expenses';
    const formatedTotals = numeral(expensesTotal/100).format('$0,0.00');
    return (
        <div className="page-header">
            <div className="content-container">
                <h3 className="page-header-title">Viewing <span>{expensesCount}</span> {expenseWord}, 
                a total of <span>{formatedTotals}</span>. </h3>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    );
};

//we need this because our expenses exist in the redux store state object.
const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    return {
        expensesCount: visibleExpenses.length,
        expensesTotal: selectExpensesTotal(visibleExpenses)
    };
};

export default connect(mapStateToProps)(ExpensesSummary);