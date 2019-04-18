import React, {Component} from "react";
import { StatusBar, SafeAreaView , Dimensions, Platform, StyleSheet} from 'react-native';
import styled from "styled-components"

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
          "color:black;" 
               : 
          "color:grey; text-decoration-line:line-through;" 
     }   
`;

const CircleButton = styled.TouchableOpacity`
     width:30px;
     height:30px;
     border-radius:25px;
     border-color:red;
     margin-right:20px;
     border-width:3px;
     ${props =>  props.isComplete ? " border-color:red;" : "border-color:grey;" }
`;

const ColumnSection = styled.View`
     flex-direction: row;
     align-items: center;
     justify-content:space-between;
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
     margin-left:24px;
     padding:5px 0px;
     width: ${width / 2};
     ${props =>  props.isComplete ? 
          "color:black;" 
               : 
          "color:grey; text-decoration-line:line-through;" 
     }   
`;

class Todo extends Component {

     state = {
          isEditing: false,
          isComplete: false,
          todoValue:"",
     }

     render(){
          const { isEditing, isComplete, todoValue } = this.state;
          const { text } = this.props;
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

                              <ActionButton>
                                   <ActionContainer>
                                        <ActionText>❌</ActionText>
                                   </ActionContainer>
                              </ActionButton>
                         </Actions>
                    )}
               </Container>
          )
     }

     _toggleComplete = () => {
          console.log(this.state.isComplete);
          this.setState(prevState => {
               return ({
                    isComplete: !prevState.isComplete
               })
          })
     }

     _onChangeText = (text) => {
          this.setState({
               todoValue: text
          })
     }

     _startEditing = () => {
          const { text } = this.props; 
          this.setState({
               isEditing: true,
               todoValue : text,
          })
     }

     _finishEditing = () => {
          this.setState({
               isEditing: false
          })
     }
}

export default Todo