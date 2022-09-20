import { IncomeType, ExpensesType, BudgetType, PercentageType } from '../../types';
import { currencyFormat, percentFormat } from '../../utils';
import './styles.scss';


type Props = {
    income: IncomeType;
    expenses: IncomeType;
  };

  function Display({ income, expenses }: Props) {
    const budget = income - expenses;
    const expensesPercentage = income !== 0 ? expenses / income : 0;
  
    return (
      <div className="display">
        <Title />
        <Budget value={budget} />
        <Income value={income} />
        <Expenses value={expenses} percentage={expensesPercentage} />
      </div>
    );
  }
  
  // Title
  function Title() {
    const month = new Date().toLocaleString('default', { month: 'long' });
    const year = new Date().getFullYear();
  
    return (
      <h2 className="title">
        Budget available in {month} {year}:
      </h2>
    );
  }
  
  // Budget
  function Budget({ value }: { value: BudgetType }) {
    const sign = value > 0 ? '+ ' : value < 0 ? '- ' : '';
  
    return (
      <h1 className="budget">
        {sign}
        {currencyFormat(Math.abs(value))}
      </h1>
    );
  }
  
  // Income
  function Income({ value }: { value: IncomeType }) {
    return (
      <div className="income">
        <div className="text">Income</div>
        <div className="value">
          {value === 0 ? '' : '+ '}
          {currencyFormat(value)}
        </div>
        <div className="percentage hidden">&nbsp;</div>
      </div>
    );
  }
  
  // Expenses
  function Expenses({
    value,
    percentage,
  }: {
    value: ExpensesType;
    percentage: PercentageType;
  }) {
    return (
      <div className="expenses">
        <div className="text">Expenses</div>
        <div className="value">
          {value === 0 ? '' : '- '}
          {currencyFormat(value)}
        </div>
        <div className="percentage">{percentFormat(percentage)}</div>
      </div>
    );
  }
  
  export { Display };