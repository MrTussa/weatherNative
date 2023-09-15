import { StatusBar } from 'expo-status-bar';
import { mainBg } from './assets/index'
import { StyleSheet, Text, View, Button, TextInput, ImageBackground } from 'react-native';
import { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components/native'
const ButtonsView = styled.View`
    width: 100px;
    background-color: aqua;
  `
const Container = styled.View`
padding: 60px 20px;
display: flex;
width: 100%;
height: 100%;
justify-content: space-between;
`
const Input = styled.TextInput`
width: 75%;
background-color: rgba(255,255,255, 0.25);
border-radius: 10px;
`
const SearchContainer = styled.View`
width: 100%;
flex-direction: row;
gap: 10px;
justify-content: space-between;
`
const GlassContainer = styled.View`
background: rgba(255, 255, 255, 0.22);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(7.6px);
-webkit-backdrop-filter: blur(7.6px);
border: 1px solid rgba(255, 255, 255, 0.26);
  `
const API = "dba7d7b658e0ea9699b67a8ae8aabb6a"
export default function App() {
  const [text, setText] = useState("Text");
  const [data, setData] = useState([])
  const getData = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${API}&units=metric`)
      .then(({ data }) => {
        const { main: { temp }, weather: { main } } = data
        setData({ temp: temp, weather: main })
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  const textChangeHandler = value => {
    setText(value)
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={mainBg} resizeMode="cover" style={styles.background}>
        <Container>
          <SearchContainer>
            <Input onChangeText={textChangeHandler} />
            <Button title="Search" onPress={getData} />
          </SearchContainer>
          <GlassContainer>
            <StatusBar style="auto" />
            <View>
              <Text>Temp is {data.temp}C</Text>
            </View>
            <ButtonsView>
              <Text>Search weather</Text>
            </ButtonsView>
          </GlassContainer>
        </Container>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  }
});
