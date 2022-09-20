import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/dom';
import { sum } from './utils';
import { Display } from './components/display/display';
import { Form } from './components/form/form';
import { Transaction } from './types';
import { TransactionList } from './components/transaction-list/transaction-list';
import { TransactionItem } from './components/transaction-list/transaction-item/transaction-item';

//utils test cases

describe('sum', () => {
  it('correctly sums elements of array', () => {
    expect(sum([1, 2, 3])).toBe(6);
    expect(sum([])).toBe(0);
    expect(sum([-2, 3])).toBe(1);
  });
});

//Display tests
describe('<Display>', () => {
  describe('when `budget > 0`', () => {
    it('displays budget, income and expenses correctly', () => {
      render(<Display income={1000} expenses={250} />);

      expect(screen.getByText('+ $750.00')).toBeInTheDocument();
      expect(screen.getByText('+ $1,000.00')).toBeInTheDocument();
      expect(screen.getByText('- $250.00')).toBeInTheDocument();
      expect(screen.getByText('25%')).toBeInTheDocument();
    });
  });

  describe('when `budget === 0`', () => {
    it('displays budget, income and expenses correctly', () => {
      render(<Display income={500} expenses={500} />);

      expect(screen.getByText('$0.00')).toBeInTheDocument();
      expect(screen.getByText('+ $500.00')).toBeInTheDocument();
      expect(screen.getByText('- $500.00')).toBeInTheDocument();
    });
  });

  describe('when `budget < 0`', () => {
    it('displays budget, income and expenses correctly', () => {
      render(<Display income={250} expenses={500} />);

      expect(screen.getByText('- $250.00')).toBeInTheDocument();
      expect(screen.getByText('+ $250.00')).toBeInTheDocument();
      expect(screen.getByText('- $500.00')).toBeInTheDocument();
    });
  });

  describe('when `income === 0`', () => {
    it('displays budget, income and expenses correctly', () => {
      render(<Display income={0} expenses={500} />);

      expect(screen.getByText('$0.00')).toBeInTheDocument();
      expect(screen.getAllByText('- $500.00')).toHaveLength(2);
    });
  });
});

//Form
jest.mock('nanoid', () => ({
  nanoid: () => {
    let value = 0;
    return ++value;
  },
}));

describe('<Form>', () => {
  // it('renders correctly', () => {
  //   const { getByPlaceholderText } = render(<Form onSubmit={() => {}} />);

  //   expect(screen.getByPlaceholderText(/add description/i)).toBeInTheDocument();
  //   expect(screen.getByPlaceholderText(/value/i)).toBeInTheDocument();
  // });

  it('calls the onSubmit function with the form values', () => {
    const onSubmit = jest.fn();

    render(<Form onSubmit={onSubmit} />);

    const typeInput = screen.getByRole('combobox') as HTMLSelectElement;
    const descIpnut = screen.getByRole('textbox') as HTMLInputElement;
    const valueInput = screen.getByRole('spinbutton') as HTMLInputElement;
    const submitBtn = screen.getByRole('button');

    
    expect(typeInput.value).toBe('income');
    expect(descIpnut.value).toBe('');
    expect(valueInput.value).toBe('');
    expect(submitBtn).toHaveAttribute('disabled');

    fireEvent.change(typeInput, { target: { value: 'expense' } });
    fireEvent.change(descIpnut, { target: { value: 'Ticket to the Moon' } });
    fireEvent.change(valueInput, { target: { value: '9.99' } });
    fireEvent.click(submitBtn);

    
    expect(onSubmit).toBeCalledWith({
      id: 1,
      type: 'expense',
      description: 'Ticket to the Moon',
      value: 9.99,
    });

    // form should be reset after submitting
    expect(typeInput.value).toBe('expense');
    expect(descIpnut.value).toBe('');
    expect(valueInput.value).toBe('');
    expect(submitBtn).toHaveAttribute('disabled');

    // description input should have focus
    expect(descIpnut).toHaveFocus();
  });

  it(`doesn't call onSubmit when ref.current is null`, () => {
    jest.spyOn(React, 'useRef').mockReturnValue({
      get current() {
        return null;
      },
      set current(_) {},
    });
    const onSubmit = jest.fn();

    render(<Form onSubmit={onSubmit} />);

    fireEvent.submit(screen.getByTestId('form'));

    expect(onSubmit).toBeCalled();
  });
});

//transaction-list
const incomeList: Transaction[] = [
  { id: 'a', type: 'income', description: 'Salary', value: 999 },
  { id: 'b', type: 'income', description: 'Lottery', value: 10000 },
];

describe('<List>', () => {
  it('renders correctly', () => {
    render(<TransactionList list={incomeList} onDeleteClick={() => {}} />);

    expect(screen.getByText(/salary/i)).toBeInTheDocument();
    expect(screen.getByText(/lottery/i)).toBeInTheDocument();
  });
});

//TransactionItem
describe('<TransactionItem>', () => {
  it('renders correctly income type', () => {
    render(
      <TransactionItem
        id="1"
        description="Apple"
        value={10}
        type="income"
        onDeleteClick={jest.fn()}
      />
    );

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('+ $10.00')).toBeInTheDocument();
  });

  it('renders correctly expense type', () => {
    render(
      <TransactionItem
        id="1"
        description="Apple"
        value={10}
        type="expense"
        onDeleteClick={jest.fn()}
      />
    );

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('- $10.00')).toBeInTheDocument();
  });

  it('calls onDeleteClick with transaction id', () => {
    const onDeleteClick = jest.fn();
    render(
      <TransactionItem
        id="test-id"
        description="Apple"
        value={10}
        type="expense"
        onDeleteClick={onDeleteClick}
      />
    );

    userEvent.click(screen.getByRole('button'));

    expect(onDeleteClick).toBeCalledWith('test-id');
  });
});
