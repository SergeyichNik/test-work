import './styles.css';
import { type CardItem } from '../../shared/types';
import { type FunctionComponent } from 'react';

interface ListItemProps {
  data: CardItem
  equalizeCount: number
}

export const ListItem: FunctionComponent<ListItemProps> = ({ data, equalizeCount }) => {
  const { header, text, options } = data;
  return (
    <div className={'list-item__container'}>
      <h3>{header}</h3>

      <ul>
        {options.map((option, i) => <li key={i}>{option}</li>)}

        {equalizeCount > 0 && Array(equalizeCount)
          .fill('')
          .map((_, i) => <li className={'list-item-empty'} key={`empty-${i}`}/>)}
      </ul>

      <p>{text}</p>
    </div>
  );
};
