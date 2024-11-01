import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../constants/colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  paymentContainer: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomColor: colors.black4,
    borderBottomWidth: 1,
    backgroundColor: colors.grey,
  },

  modal: {
    flex: 1,
  },

  modalContainer: {
    padding: 20,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    width: Dimensions.get('window').width * 0.8,
    padding: 20,
    borderRadius: 12,
    backgroundColor: colors.white,
  },
});
