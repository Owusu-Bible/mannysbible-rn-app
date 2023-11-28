import {
  Home,
  Calendar,
  Precepts,
  Breakdowns,
  Bible,
  Settings,
} from '../screens';
import {NavigationStructure, setupNavigation} from 'lib_navigation';
import PreceptPage from '@modals/PreceptPage';
export const Navigation = () => {
  const navigationStructure: NavigationStructure = {
    stackScreens: [
      {
        name: 'Main',
        drawerScreens: [
          {
            name: 'Home',
            component: Home,
          },
          {
            name: 'Bible',
            component: Bible,
          },
          {
            name: 'Precepts',
            component: Precepts,
          },
          {
            name: 'Breakdowns',
            component: Breakdowns,
          },
          {
            name: 'Calendar',
            component: Calendar,
          },
          {
            name: 'Settings',
            component: Settings,
          },
        ],
      },
    ],
    modals: [
      {
        name: 'PreceptPage',
        component: PreceptPage,
      },
    ],
  };
  return setupNavigation(navigationStructure);
};
