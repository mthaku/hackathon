import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import PickerSelect from 'react-native-picker-select';
import {CheckedIcon, UncheckedIcon, RegisterIcon} from '../images/svg-icons';
import Geolocation from '@react-native-community/geolocation';

import {add, userID} from '../lib/utils';

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    padding: 22,
    backgroundColor: '#FFF',
  },
  splitView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeArea: {
    width: '40%',
    color: '#FFF',
  },
  label: {
    fontFamily: 'IBMPlexSans-Medium',
    color: '#000',
    fontSize: 14,
    paddingBottom: 5,
  },
  selector: {
    fontFamily: 'IBMPlexSans-Medium',
    borderColor: '#D0E2FF',
    borderWidth: 2,
    padding: 16,
    marginBottom: 25,
    color: "#FFF"
  },
  quantityArea: {
    width: '40%',
  },
  textInput: {
    fontFamily: 'IBMPlexSans-Medium',
    flex: 1,
    borderColor: '#D0E2FF',
    borderWidth: 2,
    padding: 14,
    marginBottom: 25,
    
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  checkboxLabel: {
    fontFamily: 'IBMPlexSans-Light',
    fontSize: 13,
  },
  textInputDisabled: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#f4f4f4',
    color: '#999',
    flex: 1,
    padding: 16,
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#1062FE',
    color: '#FFFFFF',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
    marginTop: 15,
  },
});

const Register = function({navigation}) {
  const clearItem = {
    userID: userID(),
    type: 'Event',
    userType: 'Beneficiary',
    name: '',
    description: '',
    pan: '',
    contact: '',
    quantity: '1',
  };
  const [item, setItem] = React.useState(clearItem);

  React.useEffect(() => {
    setItem({...clearItem});
  }, []);

  const sendItem = () => {
    const payload = {
      ...item,
    };

    add(payload)
      .then(() => {
        Alert.alert('Thank you!', 'Your item has been added.', [{text: 'OK'}]);
        setItem({...clearItem});
      })
      .catch(err => {
        console.log(err);
        Alert.alert(
          'ERROR',
          'Please try again. If the problem persists contact an administrator.',
          [{text: 'OK'}],
        );
      });
  };

  return (
    <ScrollView style={styles.outerView}>
      <View style={styles.splitView}>
        <View style={styles.typeArea}>
          <Text style={styles.label}>User Type</Text>
          <PickerSelect
            style={{inputIOS: styles.selector}}
            value={item.userType}
            onValueChange={t => setItem({...item, userType: t})}
            items={[
              {label: 'Beneficiary', value: 'Beneficiary'},
              {label: 'Volunteer', value: 'Volunteer'},
            ]}
          />
        </View>
        <View style={styles.typeArea}>
          <Text style={styles.label}>Register For</Text>
          <PickerSelect
            style={{inputIOS: styles.selector}}
            value={item.type}
            onValueChange={t => setItem({...item, type: t})}
            items={[
              {label: 'Event', value: 'Event'},
              {label: 'Food', value: 'Food'},
              {label: 'Help', value: 'Help'},
              {label: 'Other', value: 'Other'},
            ]}
          />
        </View>
      </View>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.textInput}
        value={item.name}
        onChangeText={t => setItem({...item, name: t})}
        onSubmitEditing={sendItem}
        returnKeyType="send"
        enablesReturnKeyAutomatically={true}
        placeholder="Name"
        blurOnSubmit={false}
      />
      <Text style={styles.label}>Contact</Text>
      <TextInput
        style={styles.textInput}
        value={item.contact}
        onChangeText={t => setItem({...item, contact: t})}
        onSubmitEditing={sendItem}
        returnKeyType="send"
        enablesReturnKeyAutomatically={true}
        placeholder="Contact"
      />
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.textInput}
        value={item.description}
        onChangeText={t => setItem({...item, description: t})}
        onSubmitEditing={sendItem}
        returnKeyType="send"
        enablesReturnKeyAutomatically={true}
        placeholder="Address"
      />

      <Text style={styles.label}>PAN Card Details</Text>
      <TextInput
        style={styles.textInput}
        value={item.pan}
        onChangeText={t => setItem({...item, pan: t})}
        onSubmitEditing={sendItem}
        returnKeyType="send"
        enablesReturnKeyAutomatically={true}
        placeholder="PAN ID"
      />
      {item.type !== '' &&
        item.name.trim() !== '' &&
        item.contact.trim() !== '' && (
          <TouchableOpacity onPress={sendItem}>
            <Text style={styles.button}>Register</Text>
          </TouchableOpacity>
        )}
    </ScrollView>
  );
};

export default Register;
