import {useNavigation} from '@react-navigation/native';
import {Precepts} from 'lib_cloud/parse';

import {ParseFunctions} from 'lib_cloud/parse/class/parseFunctions';
import {useEffect, useState} from 'react';

export const useGetPrecepts = () => {
  const navigator = useNavigation();
  const [precepts, setPrecepts] = useState<Precepts[]>([]);
  const getThePrecepts = async () => {
    const results = await ParseFunctions.getParseItems(Precepts as any).catch();
    setPrecepts(results);
  };

  useEffect(() => {
    getThePrecepts();
  }, []);

  const refresh = async () => {
    await getThePrecepts();
  };

  const navigateToPreceptPage = (precept: Precepts) => () => {
    navigator.navigate('PreceptPage', {
      precept,
    });
  };
  return {precepts, navigateToPreceptPage, refresh};
};
