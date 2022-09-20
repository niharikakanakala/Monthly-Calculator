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
        {/* //map the dynamic props of list into TransactionItem component to renders correctly income type
  //Refer to type of list for the properties 
  */}
      </ul>
    );
  }
  
  export { TransactionList };
  