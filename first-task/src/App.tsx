import data from './data.json';
import './styles.css';
import { ListItem } from './components/ListItem';
import { type FunctionComponent, useMemo } from 'react';
import { type CardItem } from './shared/types';

const App: FunctionComponent = () => {
  const higherOptionsNum = useMemo(() => {
    return (data as CardItem[]).reduce((higher, { options }) => {
      if (higher < options.length) {
        return options.length;
      }
      return higher;
    }, 0);
  }, [data]);

  return (
    <div className={'container'}>
      {(data as CardItem[]).map((item, i) => {
        return (
          <ListItem
            equalizeCount={higherOptionsNum - item.options.length}
            key={`card-${i}`}
            data={item}
          />
        );
      })}
    </div>
  );
};

export default App;
