import React from 'react';
import { StyleSheet, Text, ScrollView, TextInput, Button, Modal, View, Pressable, Alert } from 'react-native';
import HabitosList from '../components/HabitosList';
import LedsList from '../components/LedsList';
import habitosJson from '../../habitos.json';
import * as firebase from 'firebase'
import 'firebase/firestore'


export default class HabitosPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      habitos: [],
      dataLeds: [],
      modalVisible: false,
      newLedName: "",
      qtdLeds: "",

    }
  }

  addHabito() {
    var db = firebase.database();
    db.ref('/users/habitos').push({ desc: "Caminhar" })
      .then(() => { console.log('Inserido com sucesso') })
      .catch(() => { console.log('ERRO') });
  }

  addNewLed() {

    const { newLedName, qtdLeds } = this.state;

    console.log(newLedName + qtdLeds)

    var db = firebase.database();
    db.ref('/users/LED').push({
      name: newLedName,
      qtd: qtdLeds
    })
      .then(() => { console.log('Inserido com sucesso') })
      .catch(() => { console.log('ERRO') });

    this.setModalVisible(false)
  }

  onChageHandler(field, value) {
    this.setState({ [field]: value });
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  getLedsFirebase() {



  }

  componentDidMount() {

    //this.getLedsFirebase();   
    console.log("componentDidMount");

    var db = firebase.database();
    db.ref('/users/LED').on('value', snapshot => {

      //var data = querySnapShot.val() ? querySnapShot.val() : {};   

      var data = snapshot.val();
      console.log('User data: ', data);
      //console.log(data);
      // this.setState({
      //   dataLeds: data,
      // });

    })

    this.setState({
      habitos: habitosJson
    });
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View>
        <Button title='Adicionar Fita LED'
          onPress={() => this.setModalVisible(true)}
        />

        <View style={styles.centeredView}>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              this.setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Adicionar Fita LED</Text>

                <Text >Nome da nova Fita LED</Text>
                <TextInput
                  placeholder="Nome"
                  value={this.state.newLedName}
                  onChangeText={value => this.onChageHandler('newLedName', value)}
                />

                <Text >Quantidade de LEDs</Text>
                <TextInput
                  placeholder="Quantidade"
                  keyboardType="numeric"
                  value={this.state.qtdLeds}
                  onChangeText={value => this.onChageHandler('qtdLeds', value)}
                />


                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => this.addNewLed()}
                >
                  <Text style={styles.textStyle}>Adicionar</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => this.setModalVisible(false)}
                >
                  <Text style={styles.textStyle}>Cancelar</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

        </View>



        <ScrollView>
          <HabitosList habitos={this.state.habitos} />
          {/* <LedsList leds={this.state.dataLeds} /> */}
        </ScrollView>
      </View >
    );
  }

}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    flex: 0.85,
    alignItems: 'center',
    height: 40,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    flexDirection: "row",

  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});