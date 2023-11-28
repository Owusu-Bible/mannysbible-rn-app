import { StyleSheet } from "react-native";

export const theme = {
    'stylesheet.calendar.header': {
      dayHeader: {
        fontWeight: '600',
        color: '#48BFE3'
      }
    },
    'stylesheet.day.basic': {
      today: {
        borderColor: '#48BFE3',
        borderWidth: 0.8
      },
      todayText: {
        color: '#5390D9',
        fontWeight: '800'
      }
    }
  };
export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10
  },
  month: {
    marginLeft: 5
  },
  year: {
    marginRight: 5
  }
});