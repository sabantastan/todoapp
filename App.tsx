import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './src/home';
import React, { useState } from "react";
import { TextInput, View, Dimensions, Image, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
const Stack = createStackNavigator();

interface ItemData {
  id: number;
  title: string;
  done:boolean;
}
function App() {
  const [input, setInput] = useState<string>("");
  const [toDoList, setToDoList] = useState<ItemData[]>([]);
  const handleOnChangeText = (text: string) => {
    setInput(text);
  };
  const handleAddTodo = () => {
    if (input.trim()) {
      const newTodo: ItemData = {
        id: toDoList.length + 1, 
        title: input, 
        done:false,
      };
      setToDoList([...toDoList, newTodo]);
      setInput("");
    }
  };

  const handleToggleDone = (id: number) => {
    setToDoList(toDoList.map(item =>
      item.id === id ? { ...item, done: !item.done } : item
    ));
  };

  const Item: React.FC<{ item: ItemData }> = ({ item }) => (
    <TouchableOpacity onPress={() => handleToggleDone(item.id)}>
      <View style={[styles.item, styles.fullWidthItem, item.done && styles.itemDone]}>
        <Text style={[styles.title, item.done && styles.titleDone]}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.mainView}>
      <View style={styles.subViewTop}>
        <View style= {styles.innerView}>
          <Text style={styles.innerViewTitle}>Yapılacaklar</Text>
          <Text style={styles.innerViewCount}>{toDoList.filter(x=>x.done == false).length}</Text>
        </View>
        <FlatList
          data={toDoList}
          renderItem={({ item, index }) => (
            <Item 
              item={item} 
            />
          )}
          keyExtractor={item => item.id.toString()}
          numColumns={1}
          contentContainerStyle={styles.container}
        />
      </View>
      <View style={styles.subViewBottom}>
      <TextInput
          style={styles.textInput}
          placeholder="Yapılacak..."
          value={input}
          onChangeText={handleOnChangeText}
        />
        <TouchableOpacity
          onPress={handleAddTodo}
          style={input.trim() ? styles.saveButtonActive : styles.saveButton}

        >
          <Text style={styles.saveButtonText}>Kaydet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainView: {
    backgroundColor:'#102027',
    flex:1
  },
  subViewTop: {
    flex:82,
  },
  innerView: {
    flexDirection:"row",
    marginTop:15,
    marginLeft:10,
    marginRight:10,
    marginBottom:10,
    justifyContent:"space-between"
  },
  innerViewTitle: {
    fontSize:32,
    fontWeight:"bold",
    color:"#FFA500",
  },
  innerViewCount: {
    fontSize:32,
    color:"#FFA500"
  },
  subViewBottom: {
    flex:18,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor:"#37474f"
  },
  container: {
    padding: 7,
  },
  item: {
    backgroundColor: '#7DA453',
    padding: 10,
    marginTop: 10,
    marginBottom:10,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemDone: {
    backgroundColor: '#6D6E70',
  },
  fullWidthItem: {
    width: '100%',
    height: 40,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    marginTop:-5,
    fontSize: 20,
    color:"white"
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: '#B0BEC5',
  },
  textInput: {
    margin: 10,
    backgroundColor: "#d7dbd8",
    width: Dimensions.get('window').width - 20,
    height: 50,
    borderRadius: 10,
    paddingLeft: 14,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#808080",
    borderRadius: 10,
    width: 9*Dimensions.get('window').width/10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonActive: {
    backgroundColor: "#FFA500",
    borderRadius: 10,
    width: 9*Dimensions.get('window').width/10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    color: "#fff",
  },
});
export default App;
