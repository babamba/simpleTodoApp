import React from 'react';
import { StatusBar, SafeAreaView , Dimensions, Platform, StyleSheet, ScrollView , AsyncStorage} from 'react-native';
import { View, Text } from 'react-native-animatable';
import styled from "styled-components"
import Todo from "./Todo"
import uuid from "uuid";
import Lottie from "./Lotti";
import { AppLoading, SplashScreen } from "expo"

const isIOS = Platform.OS === 'ios' ? true : false
const { height, width } = Dimensions.get("window")

const Container = styled.View`
  display:flex;
  flex: 1;
  background-color: #dfe6e9;
  align-items: center;
`

const Title = styled.Text`
  align-self:center;
  color: white;
  font-size: 30px;
  margin-top:50px;
  font-weight:600;
  margin-bottom:30px;
  z-index:3;
`
const Card = styled(View)`
  background-color:white;
  flex: 1;
  width: ${width - 25};
  border-radius : 12px;
  /* box-shadow: 5px 55px 100px rgba(50, 50, 50, 0.3); */
  /* elevation:5; */
  ${isIOS ? 
    "box-shadow: 5px 55px 100px rgba(50, 50, 50, 0.3);"
  : 
    "elevation:3;"
  }
`;

const Input = styled.TextInput`
  padding:20px;
  border-bottom-color:#bbb;
  /* border-bottom-width: 1; */
  font-size:25px;
  border-bottom-width: ${StyleSheet.hairlineWidth};
`;

const TodoList = styled(ScrollView)`
  
`

const LottieContainer = styled.View`
  flex:1;
`;

export default class App extends React.Component {

  state = {
    newTodo : "",
    loadingTodo:false,
    appReady: false,
    todos : {},
  }

  componentDidMount = () => {
    this._loadTodo().then(() => {
      this.setState({ loadingTodo: true })

      setTimeout(() =>  {
        this.setState({
          appReady: true
        })
      },1500);
    })}

  render() {
    const { newTodo, loadingTodo,appReady, todos } = this.state;

    if(!loadingTodo){
      return <AppLoading />;
    }

    if(!appReady){
      return (
        <LottieContainer>
          <Lottie/>
        </LottieContainer>
      );
    }

    return (
        <Container>
          <SafeAreaView>
            <StatusBar barStyle="light-content" />
            <Title>TO DO</Title>
            <Card
              animation="fadeInDown"
              delay={10} 
              easing={"ease-in-out"} 
              useNativeDriver
            >
              <Input
                placeholder={"New To Do"} 
                value={newTodo} 
                onChangeText={this._onChangeNewTodo} 
                placeholderTextColor={"#999"}
                returnKeyType={"done"}
                autoCorrect={false}
                onSubmitEditing={this._addTodo}
              />
              <TodoList contentContainerStyle={{alignItems:"center"}}>
                  { Object.values(todos).reverse().map(todo => 
                    <Todo 
                      key={todo.id} 
                      deleteTodo={this._deleteTodo}
                      completeTodo={this._completeTodo}
                      uncompleteTodo={this._uncompleteTodo}
                      updateTodo={this._updateTodo}
                      {...todo} 
                    />
                  )}
                {/* <Todo text={"Hello I'm Todo "}></Todo> */}
              </TodoList>
            </Card>
          </SafeAreaView>
        </Container>
    );
  }

  _loadTodo = async() => {

    try {
      const todos = await AsyncStorage.getItem("todos");
      const parseTodo = JSON.parse(todos);
      console.log("todos storage", todos)
      this.setState({
        loadingTodo: true,
        todos: parseTodo || {}
      })
    } catch (error) {
      console.log(error)
    }
  }

  _onChangeNewTodo = (text) => {
    console.log(this.state.newTodo)
    this.setState({
      newTodo:text
    })
  }

  _uncompleteTodo = (id) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]:{
            ...prevState.todos[id],
              isComplete:false
          }
        }
      }
      this._saveState(newState.todos);
      return{ ...newState }
    })
  }

  _completeTodo = (id) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]:{
            ...prevState.todos[id],
              isComplete:true
          }
        }
      }
      this._saveState(newState.todos);
      return{ ...newState }
    })
  }

  _updateTodo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]:{
            ...prevState.todos[id],
            text,
          }
        }
      }
      this._saveState(newState.todos);
      return{ ...newState }
    })
  }


  _deleteTodo = (id) => {
    this.setState(prevState => {
        const todos = prevState.todos;

        delete todos[id];
        const newState = {
              ...prevState,
              ...todos
        }
        this._saveState(newState.todos);
        return{
              ...newState
        }
    })
  }

  _addTodo = () => {
    const { newTodo } = this.state;
    console.log(this.state.todos);
    if(newTodo !== ""){
      this.setState(prevState => {
        const ID = uuid();
        console.log("ID : ", ID)
        const newTodoObj = {
          [ID]:{
            id : ID,
            isComplete: false,
            text : newTodo,
            createdAt : Date.now()
          }
        };

        const newState = {
          ...prevState,
          newTodo:"",
          todos: {
            ...prevState.todos,
            ...newTodoObj
          }
        }
        this._saveState(newState.todos);
        return { ...newState };
      })
    }
  }

  _saveState = (newTodos) => {
    console.log(newTodos);
    const saveTodos = AsyncStorage.setItem("todos", JSON.stringify(newTodos));
  }




}