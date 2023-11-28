import {useGetPrecepts} from '@hooks/.';
import {useCallback, useState} from 'react';

export default () => {
  const {precepts, navigateToPreceptPage, refresh} = useGetPrecepts();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }, [refresh]);
  return {precepts, navigateToPreceptPage, refreshing, onRefresh};
};
