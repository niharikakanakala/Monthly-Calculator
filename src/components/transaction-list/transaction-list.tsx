import { TransactionItemProps, TransactionListType } from '../../types';
import { TransactionItem } from './transaction-item/transaction-item';
import './styles.scss';

type Props = {
    list: TransactionListType;
    onDeleteClick: TransactionItemProps['onDeleteClick'];
  };
  
  function TransactionList({ list, onDeleteClick }: Props) {
    return (
      <ul className="transaction-list">
        {list.map(({ id, description, value, type }) => (
          <TransactionItem
            key={id}
            id={id}
            type={type}
            value={value}
            description={description}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </ul>
    );
  }
  
  export { TransactionList };
  