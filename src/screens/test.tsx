// import {
//   Switch,
//   View,
//   Text,
//   StyleSheet,
//   Button,
//   TextInput,
//   Alert,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useState } from 'react';
// import {
//   useForm,
//   Controller,
//   ControllerFieldState,
//   ControllerRenderProps,
//   FieldValues,
//   UseFormStateReturn,
// } from 'react-hook-form';

// interface Form {
//   name: string;
//   surname: string;
//   age: number;
//   hasJob: boolean;
// }

// const humanInitValue: Form = {
//   name: 'Arthur',
//   surname: 'Gavaga',
//   age: 18,
//   hasJob: false,
// };

// const errors = {
//   lenthSmall: 'не може бути путсим',
//   lenthBig: 'має містити не більше 20 символів',
// };

// export default function Test() {
//   //ПОЛЯ
//   const [formName, setFormName] = useState('');
//   const [formSurname, setFormSurname] = useState('');
//   const [formAge, setFormAge] = useState('');
//   const [hasJobForm, sethasJobForm] = useState(false);

//   //ПОЛЯ ДОТИКИ
//   // const [dirthyName, setDirthyName] = useState(false);
//   // const [dirthySurname, setDirthySurname] = useState(false);

//   //ПОМИЛКИ
//   const [errorName, setErrorName] = useState('Поле ім`я не може бути путсим');
//   const [errorSurname, setErrorSurname] = useState(
//     'Поле прізвище не може бути путсим',
//   );

//   //Стан основного об`єкту
//   const [human, setHuman] = useState<Form>(humanInitValue);

//   //
//   const onOffSwitch = () => sethasJobForm(prev => !prev);

//   const changeHuman = () => {
//     const newUser: Form = {
//       name: formName,
//       surname: formSurname,
//       age: Number(formAge),
//       hasJob: hasJobForm,
//     };

//     setHuman(newUser);
//     // validateName();
//     // validateSurname();
//   };

//   const validateName = () => {
//     if (formSurname.length === 0) {
//       setErrorSurname('Ім`я не може бути путсим');
//     } else if (formSurname.length > 20) {
//       setErrorSurname('Ім`я має містити не більше 20 символів');
//     } else {
//       setErrorSurname('');
//       changeHuman();
//     }
//   };
//   // const {
//   //   control,
//   //   register,
//   //   formState: { errors },
//   //   handleSubmit,
//   // } = useForm();

//   // const onSubmit = data => {
//   //   Alert(JSON.stringify(data));
//   // };

//   const { register, handleSubmit } = useForm({});

//   return (
//     <SafeAreaView>
//       <View>
//         <Text style={style.human}>Ім`я</Text>
//         {/* <Controller
//           control={control}
//           name="formName"
//           render={({ field: { value, onChange, onBlur } }) => (
//             <TextInput
//               value={value}
//               onChangeText={onChange}
//               onBlur={onBlur}
//               style={style.input}
//               placeholder="Введіть ваше ім`я"
//             />
//           )}
//         /> */}

//         {/* <TextInput
//           //onBlur={e => blurHandler(e)}
//           style={style.input}
//           onChangeText={setFormName}
//           value={formName}
//           placeholder="Введіть ваше ім`я"
//         ></TextInput> */}

//         {/* {error ? <Text>{error}</Text> : null} */}

//         {/* {dirthyName && errorName && (
//           <Text style={style.error}>{errorName}</Text>
//         )} */}
//         <Text style={style.human}>Прізвище</Text>
//         <TextInput
//           style={style.input}
//           onChangeText={setFormSurname}
//           value={formSurname}
//           placeholder="Введіть ваше прізвище"
//         ></TextInput>
//         {/* {dirthySurname && errorSurname && (
//           <Text style={style.error}>{errorSurname}</Text>
//         )} */}

//         <Text style={style.human}>Вік</Text>
//         <TextInput
//           style={style.input}
//           onChangeText={setFormAge}
//           value={formAge}
//           keyboardType="numeric"
//           placeholder="Введіть ваш вік"
//         ></TextInput>

//         <Text style={style.human}>Навність роботи:</Text>
//         <Switch
//           trackColor={{ false: 'blue', true: 'white' }}
//           onValueChange={onOffSwitch}
//           value={hasJobForm}
//         />
//       </View>

//       <View>
//         <Text style={style.head}>Test</Text>
//         <Text style={style.human}>Ім`я: {human.name}</Text>
//         <Text style={style.human}>Прізвище: {human.surname}</Text>
//         <Text style={style.human}>Вік: {human.age}</Text>
//         <Text style={style.human}>
//           Навність роботи:{human.hasJob ? ' Працює' : ' Не працює'}
//         </Text>
//       </View>

//       <View style={style.upButton}>
//         <Button title="Змінити" onPress={handleSubmit(validateName)} />
//       </View>
//     </SafeAreaView>
//   );
// }

// const style = StyleSheet.create({
//   error: {
//     color: 'red',
//   },
//   input: {
//     marginTop: 10,
//     backgroundColor: 'silver',
//     borderColor: 'red',
//     borderWidth: 1,
//   },
//   upButton: {
//     marginTop: 20,
//   },
//   head: {
//     color: 'red',
//     padding: 20,
//     marginTop: 50,
//   },

//   human: {
//     color: 'white',
//     padding: 5,
//   },
// });

import {
  Switch,
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
// import {
//   useForm,
//   Controller,
//   ControllerFieldState,
//   ControllerRenderProps,
//   FieldValues,
//   UseFormStateReturn,
// } from 'react-hook-form';

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

const errors = {
  lenthSmall: 'не може бути путсим',
  lenthBig: 'має містити не більше 20 символів',
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

  //ПОЛЯ
  const [hundlerName, setHundlerName] = useState(false);
  const [hundlerSurname, setHundlerSurname] = useState(false);

  //ПОМИЛКИ
  const [errorName, setErrorName] = useState('Поле ім`я не може бути путсим');
  const [errorSurname, setErrorSurname] = useState(
    'Поле прізвище не може бути путсим',
  );

  //Стан основного об`єкту
  const [human, setHuman] = useState<Form>(humanInitValue);

  //
  const onOffSwitch = () => sethasJobForm(prev => !prev);

  const changeHuman = () => {
    const newUser: Form = {
      name: formName,
      surname: formSurname,
      age: Number(formAge),
      hasJob: hasJobForm,
    };

    setHuman(newUser);
    // validateName();
    // validateSurname();
  };

  const validateName = () => {
    if (formName.length === 0) {
      setErrorName('Ім`я не може бути путсим');
    } else if (formName.length > 20) {
      setErrorName('Ім`я має містити не більше 20 символів');
    } else {
      setErrorName('');
      changeHuman();
    }
  };
  // const {
  //   control,
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  // } = useForm();

  // const onSubmit = data => {
  //   Alert(JSON.stringify(data));
  // };

  // const { register, handleSubmit } = useForm({});

  // const blurHandler = (e: any) => {
  //   switch (e) {
  //     case { formName }:
  //       setDirthyName(true);
  //       break;
  //     case { formSurname }:
  //       setDirthySurname(true);
  //       break;
  //   }
  //   //setDirthyName(true);
  // };
  //   const handlerFormName = (e: any) => {
  //     switch (e) {
  //       setFormName(e.target.value)
  // const re=

  return (
    <SafeAreaView style={style.contaner}>
      <View>
        <Text style={style.human}>Ім`я</Text>
        <TextInput
          onBlur={validateName}
          style={style.input}
          onChangeText={setFormName}
          value={formName}
          placeholder="Введіть ваше ім`я"
        />

        <View>
          {dirthyName && errorName ? (
            <Text style={style.error}>{errorName}</Text>
          ) : (
            <Text style={style.error}>Все чотко</Text>
          )}
        </View>

        {/* {dirthyName && errorName && (
          <Text style={style.error}>{errorName}</Text>
        )} */}
        <Text style={style.human}>Прізвище</Text>
        <TextInput
          onBlur={e => setDirthySurname(true)}
          style={style.input}
          onChangeText={setFormSurname}
          value={formSurname}
          placeholder="Введіть ваше прізвище"
        ></TextInput>

        <View>
          {dirthySurname && errorSurname ? (
            <Text style={style.error}>{errorSurname}</Text>
          ) : (
            <Text style={style.error}>Все чотко</Text>
          )}
        </View>
        {/* {dirthySurname && errorSurname && (
          <Text style={style.error}>{errorSurname}</Text>
        )} */}

        <Text style={style.human}>Вік</Text>
        <TextInput
          style={style.input}
          onChangeText={setFormAge}
          value={formAge}
          keyboardType="numeric"
          placeholder="Введіть ваш вік"
        ></TextInput>
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

      <View style={style.upButton}>
        <Button title="Змінити" />
      </View>
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
    borderRadius: 30,

    backgroundColor: 'silver',
    borderColor: 'black',
    borderWidth: 1,
  },
  upButton: {
    marginTop: 20,
  },
  head: {
    color: 'red',
    padding: 20,
    marginTop: 50,
  },

  human: {
    color: 'black',
    padding: 5,
  },
});
