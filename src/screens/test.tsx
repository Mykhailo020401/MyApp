import {
  Switch,
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';

interface Form {
  name: string;
  surname: string;
  age: number;
  hasJob: boolean;
}

const humanInitValue: Form = {
  name: 'Arthur',
  surname: 'Gavaga',
  age: 18,
  hasJob: false,
};

export default function Test() {
  //ПОЛЯ
  const [formName, setFormName] = useState('');
  const [formSurname, setFormSurname] = useState('');
  const [formAge, setFormAge] = useState('');
  const [hasJobForm, sethasJobForm] = useState(false);

  //ПОЛЯ ДОТИКИ
  const [dirthyName, setDirthyName] = useState(false);
  const [dirthySurname, setDirthySurname] = useState(false);
  const [dirtyAge, setDirtyAge] = useState(false);

  //ПОМИЛКИ
  const [errorName, setErrorName] = useState('Поле ім`я не може бути путсим');
  const [errorSurname, setErrorSurname] = useState(
    'Поле прізвище не може бути путсим',
  );
  const [errorAge, setErrorAge] = useState('Поле вік не може бути пустим');

  //Стан основного об`єкту
  const [human, setHuman] = useState<Form>(humanInitValue);

  //Cтан поля робота
  const onOffSwitch = () => sethasJobForm(prev => !prev);

  const changeHuman = () => {
    const newUser: Form = {
      name: formName,
      surname: formSurname,
      age: Number(formAge),
      hasJob: hasJobForm,
    };

    setHuman(newUser);
  };

  const [isFormValid, setIsFormValid] = useState(false);

  const validateName = (name: string) => {
    if (name.length === 0) {
      setErrorName('Ім`я не може бути путсим');
      return false;
    }
    if (/\s/.test(name)) {
      setErrorName('Ім`я не може містити пробіли');
      return false;
    }
    if (name.length > 20) {
      setErrorName('Ім`я має містити не більше 20 символів');
      return false;
    }
    setErrorName('');
    return true;
  };

  const validateSurname = (surname: string) => {
    if (surname.length === 0) {
      setErrorSurname('Прізвище не може бути путсим');
      return false;
    }
    if (/\s/.test(surname)) {
      setErrorSurname('Прізвище не може містити пробіли');
      return false;
    }
    if (surname.length > 20) {
      setErrorSurname('Прізвище має містити не більше 20 символів');
      return false;
    }
    setErrorSurname('');
    return true;
  };

  const validateAge = (age: string) => {
    if (!/^\d+$/.test(age)) {
      setErrorAge('Вік повинен містити лише числа');
      return false;
    }
    if (age.length > 3) {
      setErrorAge('Вік не може бути більшим за 3 цифри');
      return false;
    }
    setErrorAge('');
    return true;
  };

  const validateForm = (
    name = formName,
    surname = formSurname,
    age = formAge,
  ) => {
    const nameValid = validateName(name);
    const surnameValid = validateSurname(surname);
    const ageValid = validateAge(age);
    setIsFormValid(nameValid && surnameValid && ageValid);
  };

  const onNameChange = (text: string) => {
    setFormName(text);
    validateName(text);
  };
  const onSurnameChange = (text: string) => {
    setFormSurname(text);
    validateSurname(text);
  };

  const onAgeChange = (text: string) => {
    setFormAge(text);
    validateAge(text);
    validateForm(text, formName, formSurname);
  };

  useEffect(() => {
    validateForm();
  }, [formName, formSurname, formAge]);

  const [history, setHistory] = useState<Form[]>([]);
  const saveToHistory = () => {
    setHistory(prev => [...prev, human]);
  };

  return (
    <SafeAreaView style={style.contaner}>
      <ScrollView contentContainerStyle={style.scroll}>
        <View>
          <Text style={style.human}>Ім`я</Text>
          <TextInput
            onBlur={() => setDirthyName(true)}
            style={style.input}
            onChangeText={onNameChange}
            value={formName}
            placeholder="Введіть ваше ім`я"
          />

          <View>
            {
              dirthyName && errorName ? (
                <Text style={style.error}>{errorName}</Text>
              ) : null

              //  (
              //   <Text style={style.error}>Все чотко</Text>
              // )
            }
          </View>

          {/* {dirthyName && errorName && (
          <Text style={style.error}>{errorName}</Text>
        )} */}
          <Text style={style.human}>Прізвище</Text>
          <TextInput
            onBlur={() => setDirthySurname(true)}
            style={style.input}
            onChangeText={onSurnameChange}
            value={formSurname}
            placeholder="Введіть ваше прізвище"
          />

          <View>
            {
              dirthySurname && errorSurname ? (
                <Text style={style.error}>{errorSurname}</Text>
              ) : null
              // (
              //   <Text style={style.error}>Все чотко</Text>
              // )
            }
          </View>
          {/* {dirthySurname && errorSurname && (
          <Text style={style.error}>{errorSurname}</Text>
        )} */}

          <Text style={style.human}>Вік</Text>
          <TextInput
            style={style.input}
            onChangeText={onAgeChange}
            onBlur={() => setDirtyAge(true)}
            value={formAge}
            keyboardType="numeric"
            placeholder="Введіть ваш вік"
          />
          {dirtyAge && errorAge ? (
            <Text style={style.error}>{errorAge}</Text>
          ) : null}

          <View>
            <Text style={style.human}>Навність роботи:</Text>
            <Switch
              trackColor={{ false: 'blue', true: 'white' }}
              onValueChange={onOffSwitch}
              value={hasJobForm}
            />
          </View>
        </View>

        <View>
          <Text style={style.head}>Test</Text>
          <Text style={style.human}>Ім`я: {human.name}</Text>
          <Text style={style.human}>Прізвище: {human.surname}</Text>
          <Text style={style.human}>Вік: {human.age}</Text>
          <Text style={style.human}>
            Навність роботи:{human.hasJob ? ' Працює' : ' Не працює'}
          </Text>
        </View>

        <View style={style.buttonRow}>
          <TouchableOpacity
            style={[
              style.button,
              !isFormValid && style.buttonDisabled,
              style.leftButton,
            ]}
            onPress={changeHuman}
            disabled={!isFormValid}
          >
            <Text style={style.buttonText}>ЗМІНИТИ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[style.button, style.saveButton]}
            onPress={saveToHistory}
          >
            <Text style={style.buttonText}>ЗБЕРЕГТИ В ІСТОРІЮ</Text>
          </TouchableOpacity>
        </View>

        <View style={style.historyWrapper}>
          <Text style={style.head}>Історія</Text>
          {history.map((person, index) => (
            <View key={index} style={style.historyItem}>
              <Text style={style.human}>Ім’я: {person.name}</Text>
              <Text style={style.human}>Прізвище: {person.surname}</Text>
              <Text style={style.human}>Вік: {person.age}</Text>
              <Text style={style.human}>
                Робота: {person.hasJob ? 'Працює' : 'Не працює'}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  contaner: {
    backgroundColor: '#DCDCDC',
  },
  error: {
    color: 'red',
  },
  input: {
    borderRadius: 5,

    backgroundColor: 'silver',
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 10,
    marginTop: 20,
  },

  button: {
    flex: 1,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonDisabled: {
    backgroundColor: '#A9A9A9',
  },

  saveButton: {
    backgroundColor: '#28a745',
    marginLeft: 10,
  },

  leftButton: {
    marginRight: 10,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },

  head: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
    textTransform: 'uppercase',
  },

  human: {
    color: 'black',
    padding: 5,
  },
  scroll: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  historyWrapper: {
    marginTop: 30,
    borderTopWidth: 1,
    borderColor: '#999',
    paddingTop: 10,
  },
  historyItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
});
