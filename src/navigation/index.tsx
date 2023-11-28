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
import Icon from 'react-native-vector-icons/FontAwesome5';

const getTabIcon =
  (iconName: string) =>
  ({color, size}: any) => {
    return <Icon name={iconName} color={color} size={size} />;
  };

export const Navigation = () => {
  const navigationStructure: NavigationStructure = {
    stackScreens: [
      {
        name: 'Main',
        tabScreens: [
          {
            name: 'Bible',
            component: Bible,
            options: {
              tabBarIcon: getTabIcon('bible'),
            },
          },
          {
            name: 'Precepts',
            component: Precepts,
            options: {
              tabBarIcon: getTabIcon('list-ul'),
            },
          },
          {
            name: 'Home',
            component: Home,
            initialRoute: true,
            options: {
              tabBarIcon: getTabIcon('home'),
            },
          },
          {
            name: 'Calendar',
            component: Calendar,
            options: {
              tabBarIcon: getTabIcon('calendar-alt'),
            },
          },
          {
            name: 'Settings',
            component: Settings,
            options: {
              tabBarIcon: getTabIcon('user-circle'),
            },
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
