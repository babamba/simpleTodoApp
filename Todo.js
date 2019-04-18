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
`

const Title = styled.Text`
     font-weight:600;
     font-size:20px;
     margin:20px 0px;
`;

const Circle = styled.TouchableOpacity`
     width:30px;
     height:30px;
     border-radius:25px;
     border-color:red;
     margin-right:20px;
     border-width:3px;
     ${props =>  props.isComplete ? " border-color:red;" : "border-color:grey;" }
`;

const RadioButton = styled.View`
     background-color:white;
`

class Todo extends Component {

     state = {
          isEditing: false,
          isComplete: false
     }

     render(){
          const { isComplete } = this.state;
          return(
               <Container>
                    <Circle onPress={this._toggleComplete} isComplete={isComplete} >
                         <RadioButton />
                    </Circle>
                    <Title>Hello I'm Todo </Title>
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
}

export default Todo