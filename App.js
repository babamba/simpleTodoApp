import React from 'react';
import { StatusBar, SafeAreaView , Dimensions, Platform} from 'react-native';

import styled from "styled-components"

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
const Card = styled.View`
  background-color:white;
  flex: 1;
  width: ${width - 25};
  border-top-left-radius : 12px;
  border-top-right-radius : 12px;
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
`;

export default class App extends React.Component {
  render() {
    return (
        <Container>
          <SafeAreaView>
            <StatusBar barStyle="light-content" />
            <Title>TO DO</Title>
            <Card>
              <Input placeholder={"New To Do"} />
            </Card>
          </SafeAreaView>
        </Container>
    );
  }
}