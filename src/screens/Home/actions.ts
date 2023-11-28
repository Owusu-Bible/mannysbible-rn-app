import { useGetPrecepts } from "@hooks/.";
import { getHolyDaysOfTheYear } from "@utils/holydays";
import { Precepts } from "lib_cloud/parse";
import { useCallback, useState } from "react";

export const actions = () => {
  const { precepts, navigateToPreceptPage, refresh } = useGetPrecepts();
  const holyDays = getHolyDaysOfTheYear(new Date(), true);
  const upcomingHolyDays = Object.values(holyDays)?.filter(
    (holyDay) => holyDay?.dates?.[0] >= new Date() && !holyDay.isWeeklySabbath
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }, []);

  return {
    precepts: precepts.sort(() => Math.random() - Math.random()).slice(0, 3),
    upcomingHolyDays,
    navigateToPreceptPage,
    refreshing,
    onRefresh
  };
};
