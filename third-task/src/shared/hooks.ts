import { useNavigate, useSearchParams } from 'react-router-dom';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../app/store';

export const useAppNavigate = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchParamsString = searchParams.toString();

  return (pathname: string | number) => {
    if (typeof pathname === 'string') {
      navigate({
        pathname,
        search: searchParamsString ? `?${searchParamsString}` : ''
      });
    } else {
      navigate(pathname);
    }
  };
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
