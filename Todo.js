import React, {Component} from "react";
import { StatusBar, SafeAreaView , Dimensions, Platform, StyleSheet} from 'react-native';
import styled from "styled-components"
import PropTypes from "prop-types"

const isIOS = Platform.OS === 'ios' ? true : false
const { height, width } = Dimensions.get("window")

const Container = styled.View`
     width: ${width - 50};
     border-bottom-color: #bbb;
     flex-direction: row;
     border-bottom-width:${StyleSheet.hairlineWidth};
     align-items:center;
     justify-content:space-between;
`;

const Title = styled.Text`
     font-weight:600;
     font-size:20px;
     margin:20px 0px;
     
     ${props =>  props.isComplete ? 
          "color:grey; text-decoration-line:line-through;" 
               : 
          "color:black;" 
     }   
`;

const CircleButton = styled.TouchableOpacity`
     width:30px;
     height:30px;
     border-radius:25px;
     border-color:red;
     margin-right:20px;
     border-width:3px;
     ${props =>  props.isComplete ? " border-color:grey;" : "border-color:red;" }
`;

const ColumnSection = styled.View`
     flex-direction: row;
     align-items: center;
     width : ${width / 2};
`;

const ActionButton = styled.TouchableOpacity`
`;

const RadioButton = styled.View`
     background-color:white;
`

const Actions = styled.View`
     flex-direction:row;
`;

const ActionContainer = styled.View`
     margin: 10px 10px;
`;

const ActionText = styled.Text`

`;


const EditInput = styled.TextInput`
     font-weight:600;
     font-size:20px;
     margin:15px 0px;
     padding:5px 0px;
     width: ${width / 2};
     ${props =>  props.isComplete ? 
          "color:grey; text-decoration-line:line-through;" 
               : 
          "color:black;" 
     }   
`;

class Todo extends Component {

     constructor(props){
          super(props);
          this.state = {
               isEditing: false,
               isComplete: props.isComplete,
               todoValue:props.text,
          }
     }

     static propTypes = {
          text:PropTypes.string.isRequired,
          isComplete : PropTypes.bool.isRequired,
          deleteTodo : PropTypes.func.isRequired,
          id : PropTypes.string.isRequired,
          completeTodo : PropTypes.func.isRequired,
          uncompleteTodo : PropTypes.func.isRequired,
          updateTodo : PropTypes.func.isRequired,
     }

     render(){
          const { isEditing , todoValue } = this.state;
          const { text, deleteTodo, id, isComplete } = this.props;
          return(
               <Container>
                    <ColumnSection>
                         <CircleButton onPress={this._toggleComplete} isComplete={isComplete} />
                         { isEditing ? (
                              <EditInput 
                                   multiline={true} 
                                   value={todoValue} 
                                   isComplete={isComplete}
                                   onChangeText={this._onChangeText}
                                   returnKeyType={"done"}
                                   onBlur={this._finishEditing}
                              />
                         ) : (
                              <Title isComplete={isComplete}>{text}</Title>
                         )
                              
                         }
                    </ColumnSection>

                    {isEditing ? (
                         <Actions>
                              <ActionButton onPressOut={this._finishEditing}>
                                   <ActionContainer>
                                        <ActionText>✅</ActionText>
                                   </ActionContainer>
                              </ActionButton>
                         </Actions>
                         ) : (
                         <Actions>
                              <ActionButton onPressOut={this._startEditing}>
                                   <ActionContainer>
                                        <ActionText>✏️</ActionText>
                                   </ActionContainer>
                              </ActionButton>

                              <ActionButton onPressOut={(event) => {
                                   event.stopPropagation; 
                                   deleteTodo(id)
                              }}>
                                   <ActionContainer>
                                        <ActionText>❌</ActionText>
                                   </ActionContainer>
                              </ActionButton>
                         </Actions>
                    )}
               </Container>
          )
     }

     _toggleComplete = (event) => {
          event.stopPropagation();
          //console.log(this.state.isComplete);
          const { isComplete, uncompleteTodo, completeTodo, id } = this.props;
          if(isComplete){
               uncompleteTodo(id)
          }else{
               completeTodo(id)
          }
     }

     _onChangeText = (text) => {
          this.setState({
               todoValue: text
          })
     }

     _startEditing = (event) => {
          event.stopPropagation();
          const { text } = this.props; 
          this.setState({
               isEditing: true,
               todoValue : text,
          })
     }

     _finishEditing = (event) => {
          event.stopPropagation();
          const { todoValue } = this.state;
          const { id, updateTodo } = this.props;
          updateTodo(id, todoValue);
          this.setState({
               isEditing: false
          })
     }

}

export default Todo