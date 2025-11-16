import {
  Switch,
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  //Alert,
  ScrollView,
  FlatList,
  //Pressable,
  TouchableOpacity,
} from 'react-native';
import uuid from 'react-native-uuid';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect, useCallback } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { formSchema, FormSchema } from './FormSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function TestCopy() {
  const [listOfUsers, setListOfUser] = useState<Form[]>([]);

  const [formHasJob, setFormHasJob] = useState(false);
  const onOffSwitch = () => setFormHasJob(prev => !prev);

  const renderItem = useCallback(
    ({ item }: { item: Form }) => {
      return (
        <View style={style.list}>
          <Text>ID: {item.id}</Text>
          <Text>Ім`я: {item.name}</Text>
          <Text>Прізвище: {item.lastname}</Text>
          <Text>Вік: {item.age}</Text>
          <Text>Робота: {item.hasJob ? 'Працює' : 'Не працює'}</Text>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              padding: 10,
            }}
          />
        </View>
      );
    },
    [listOfUsers],
  );

  interface Form {
    id: string;
    name: string;
    lastname: string;
    age: number;
    hasJob: boolean;
  }

  const userInformation: Form = {
    id: '',
    name: '',
    lastname: '',
    age: 0,
    hasJob: false,
  };

  //Стан основного об`єкту
  const [human, setHuman] = useState<Form>(userInformation);

  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitting, errors, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const saveUser = async (data: Form[]) => {
    setListOfUser(data);
    try {
      await AsyncStorage.setItem('todo_items_v1', JSON.stringify(data)); // і зберігаємо в AsyncStorage
    } catch (e) {
      console.warn('save error', e);
    }
  };
  const onSubmit = async (data: FormSchema) => {
    if (data) {
      const id: string = uuid.v4();

      const name: string = data.formName;
      const lastname: string = data.formSurname;
      const age: number = Number(data.formAge);
      const hasJob: boolean = formHasJob;
      const newUser: Form = {
        id: id,
        name: name,
        lastname: lastname,
        age: age,
        hasJob: hasJob,
      };

      saveUser([...listOfUsers, newUser]);
      console.log('МАСИВ ЗАГАЛЬНИЙ:', listOfUsers);
    } else {
      console.log('ПОМИЛКА');
    }
  };

  return (
    <SafeAreaView style={style.contaner}>
      <ScrollView contentContainerStyle={style.scroll}>
        <View>
          <Text style={style.human}>Ім`я</Text>
          <Controller
            name="formName"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                style={style.input}
                onChangeText={onChange}
                value={value}
                placeholder="Введіть ваше ім`я"
              />
            )}
          />
        </View>
        <View>
          {errors.formName && (
            <Text style={style.error}>{errors.formName.message}</Text>
          )}
        </View>
        <View>
          <Text style={style.human}>Прізвище</Text>
          <Controller
            name="formSurname"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                style={style.input}
                onChangeText={onChange}
                value={value}
                placeholder="Введіть ваше прізвище"
              />
            )}
          />
        </View>
        <View>
          {errors.formSurname && (
            <Text style={style.error}>{errors.formSurname.message}</Text>
          )}
        </View>
        <Text style={style.human}>Вік</Text>
        <Controller
          name="formAge"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              style={style.input}
              onChangeText={onChange}
              keyboardType="numeric"
              value={value}
              placeholder="Введіть ваш Вік"
            />
          )}
        />
        <View>
          {errors.formAge && (
            <Text style={style.error}>{errors.formAge.message}</Text>
          )}
        </View>

        <View>
          <Text style={style.human}>
            Навність роботи:
            <Switch
              trackColor={{ false: 'blue', true: 'white' }}
              onValueChange={onOffSwitch}
              value={formHasJob}
            />
          </Text>
        </View>
        <View style={style.upButton}></View>
        <TouchableOpacity
          style={[
            style.button,
            !isValid && style.buttonDisabled,
            style.leftButton,
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          <Text style={style.buttonText}>ЗБЕРЕГТИ</Text>
        </TouchableOpacity>

        <View>
          <FlatList
            data={listOfUsers}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={style.list}
          />
        </View>
        {/* <FlatList
          data={listOfUsers} // джерело даних
          keyExtractor={item => item.id} // унікальний ключ для кожного елемента
          renderItem={renderItem} // як рендерити один елемент
          // extraData={[selectionMode, selectedIds]} // змушує перерендер при зміні цих залежностей
          // contentContainerStyle={styles.list} // стилі контейнера списку (відступи тощо)
        /> */}
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
    borderRadius: 10,

    backgroundColor: 'silver',
    borderColor: 'black',
    borderWidth: 1,
  },
  upButton: {
    borderRadius: 10,
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
  scroll: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  list: {
    color: 'black',
    //paddingBottom: 100,
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
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
});
