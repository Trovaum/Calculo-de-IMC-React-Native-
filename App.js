
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props)
  }

  state = {
    peso: '',
    altura: '',
    showResult: false,
    imc: '',
    classificacao: '',
    grauObesidade: ''
  }

  submit = () => {

    if (!this.state.peso || !this.state.altura) return 

    let altura = 0
    if (this.state.altura) {
      altura = parseFloat(this.state.altura)
    }

    let peso = 0
    if (this.state.peso) {
      peso = parseFloat(this.state.peso)
    }

    const imc = peso / ( altura * altura)
    const classificacao = this.getClassificacao(imc)
    const grauObesidade = this.getGrauObesidade(imc)

    this.setState({
      showResult: true,
      imc: imc.toFixed(2),
      classificacao: classificacao,
      grauObesidade: grauObesidade
    })
    
  }

  getClassificacao = imc => {
    if ( imc < 18.5) {
      return 'Magreza'
    } else if ( imc >= 18.5 && imc <= 24.9) {
      return 'Normal'
    } else if ( imc >= 25 & imc <= 29.9) {
      return 'Sobrepeso'
    } else if ( imc >= 30 && imc <= 39.9) {
      return 'Obesidade'
    } else {
      return 'Obesidade Grave'
    }
  }

  getGrauObesidade = imc => {
    if ( imc < 18.5) {
      return '0'
    } else if ( imc >= 18.5 && imc <= 24.9) {
      return '0'
    } else if ( imc >= 25 & imc <= 29.9) {
      return 'I'
    } else if ( imc >= 30 && imc <= 39.9) {
      return 'II'
    } else {
      return 'III'
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Calcular IMC</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Altura</Text>
          <TextInput style={styles.input}
          keyboardType={'numeric'}
          placeholder='Altura (ex: 1.70)'
          onChangeText={altura => this.setState({altura})}
          value={this.state.altura} ></TextInput>
          <Text style={styles.label}>Peso</Text>
          <TextInput style={styles.input}
          keyboardType={'numeric'}
          placeholder='peso (ex: 65)'
          onChangeText={peso => this.setState({peso})}
          value={this.state.peso} ></TextInput>
          <TouchableOpacity onPress={this.submit}
          style={styles.button} >
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>
        </View>
        {this.state.showResult && (
          <View>
          <Text style={styles.resultTitle}>IMC: {this.state.imc}</Text>
          <Text style={styles.resultDescription}>Classificação: {this.state.classificacao}</Text>
          <Text style={styles.resultDescription}>Grau de Obesidade: {this.state.grauObesidade}</Text>
        </View>
        )}
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  title: {
    fontSize: 24,
    fontStyle: "italic",
    fontWeight: '600',
    textAlign: 'center',
    textDecorationLine:"underline"
  },
  form: {
    paddingTop: 30
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: '#212529'
  },
  input: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    fontSize: 16,
    fontWeight: '400',
    backgroundColor: '#ffffff',
    marginBottom: 16
  },
   button: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    fontSize: 16,
    fontWeight: '400',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginTop: 20
   },
   buttonText: {      
    textAlign: 'center',
    color: '#fff'
   },
   resultTitle: {
     fontSize: 20,
     fontWeight: '400',
     textAlign: 'center',
     marginTop: 20,
     marginBottom: 10
   },
   resultDescription: {
     fontSize: 16,
     fontWeight: '400',
     textAlign: 'center',
     color: '#333333'
   }

});

