import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import PickerSelect from 'react-native-picker-select';

import {search} from '../lib/utils';
import {Card} from 'react-native-shadow-cards';

const styles = StyleSheet.create({
  outerView: {
    backgroundColor: '#FFF',
    width: '100%',
    height: '100%',
  },
  inputsView: {
    backgroundColor: '#F1F0EE',
    padding: 16,
    padding: 22,
  },
  label: {
    fontFamily: 'IBMPlexSans-Medium',
    color: '#000',
    fontSize: 14,
    paddingBottom: 5,
  },
  selector: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 10,
  },
  textInput: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#ff8c00',
    color: '#FFFFFF',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
    marginTop: 15,
  },
  searchResultText: {
    fontFamily: 'IBMPlexSans-Bold',
    padding: 5,
    color: 'gray',
  },
  flatListView: {
    backgroundColor: '#FFF',
  },
  itemTouchable: {
    flexDirection: 'column',
    padding: 15,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 0.25,
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 24,
    fontFamily: 'IBMPlexSans-Medium',
  },
  itemQuantity: {
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Medium',
    color: 'gray',
  },
  itemDescription: {
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Medium',
    color: 'gray',
  },
});

const SearchResources = function({route, navigation}) {
  const [query, setQuery] = React.useState({type: 'Food', name: ''});
  const [items, setItems] = React.useState([]);
  const [info, setInfo] = React.useState('');

  const Item = props => {
    return (
      <TouchableOpacity
        style={styles.itemTouchable}
        onPress={() => {
          navigation.navigate('Map', {item: props});
        }}>
        <View style={styles.itemView}>
          <Text style={styles.itemName}>{props.name}</Text>
          <Text style={styles.itemQuantity}> ( {props.quantity} ) </Text>
        </View>
        <Text style={styles.itemDescription}>{props.description}</Text>
      </TouchableOpacity>
    );
  };

  const searchItem = () => {
    const payload = {
      ...query,
    };

    search(payload)
      .then(results => {
        setInfo(`${results.length} result(s)`);
        setItems(results);
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
  const users = [
    {Name: 'Mayuri', Address: 'Mumbai', Contact: '12349585849'},
    {Name: 'Ankita', Address: 'Mumbai', Contact: '12349585849'},
  ];
  return (
    <View style={styles.outerView}>
      <View style={styles.inputsView}>
        <Text style={styles.label}>Type</Text>
        <PickerSelect
          style={{inputIOS: styles.selector}}
          value={query.type}
          onValueChange={t => setQuery({...query, type: t})}
          items={[
            {label: 'Beneficiary', value: 'beneficiary'},
            {label: 'Volunteers', value: 'volunteers'},
            {label: 'Events', value: 'events'},
          ]}
        />

        <TouchableOpacity onPress={searchItem}>
          <Text style={styles.button}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {Object.keys(users).map(key => {
          return (
            <Card style={{padding: 10, margin: 10}}>
              {Object.keys(users[key]).map((item, index) => {
                return (
                  <Text key={index} style={styles.searchResultText}>
                    {item} : {users[key][item]}
                  </Text>
                );
              })}
            </Card>
          );
        })}
      </View>

      <FlatList
        style={styles.flatListView}
        data={items}
        renderItem={({item}) => <Item {...item} />}
        keyExtractor={item => item.id || item['_id']}
      />
    </View>
  );
};

export default SearchResources;
