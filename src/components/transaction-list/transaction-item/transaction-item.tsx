import { BsXCircle as CrossIcon } from 'react-icons/bs';
import { TransactionItemProps } from '../../../types';
import { currencyFormat } from '../../../utils';
import './styles.scss';

function TransactionItem({
    id,
    type,
    description,
    value,
    onDeleteClick,
  }: TransactionItemProps) {
    return (
      <li className={`transaction-item ${type}`}>
        <div className="description">{description}</div>
  
        <div className="value">
          {type === 'income' ? '+ ' : '- '}
          {currencyFormat(value)}
        </div>
  
        {/* <button className="btn delete-btn" onClick={() => onDeleteClick(id)}>
          <CrossIcon />
        </button> */}
      </li>
    );
  }
  
  export { TransactionItem };