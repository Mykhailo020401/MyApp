// src/screens/TodoScreen.tsx
import React, { useState, useEffect, useCallback } from 'react'; // Імпортуємо React і хуки: useState — для стану, useEffect — для побічних ефектів (завантаження/збереження), useCallback — для мемоізації функції рендера елемента списку
import {
  View, // Контейнерний компонент-блок
  Text, // Текстовий компонент
  FlatList, // Ефективний список для великих наборів даних
  Pressable, // Обгортка для кліків/тапів з підтримкою натискань і довгих натискань
  KeyboardAvoidingView, // Зсув контенту при появі клавіатури (особливо на iOS)
  Platform, // Доступ до інформації про платформу (iOS/Android)
  Alert, // Системні діалоги підтвердження/попередження
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Персистентне сховище ключ-значення на девайсі (локально)
import DateTimePicker from '@react-native-community/datetimepicker'; // Нативний пікер дати/часу
import PrimaryButton from '../components/PrimaryButton'; // Твоя кастомна кнопка з темою/стилем
import Input from '../components/Input'; // Твій кастомний інпут
import { colors } from '../theme'; // Тема з кольорами (для стилів)
import { styles } from './TodoScreen.styles'; // Окремий файл стилів для цього екрану

// Описуємо тип однієї нотатки (todo)
interface TodoItem {
  id: string; // Унікальний ідентифікатор нотатки
  text: string; // Текст (назва) завдання
  date?: string; // Опціонально — відформатована дата (рядок для відображення)
  time?: string; // Опціонально — відформатований час (рядок для відображення)
}

// Головний компонент екрана
export default function TodoScreen() {
  // ===== СТАНИ СПИСКУ =====
  const [todos, setTodos] = useState<TodoItem[]>([]); // Масив усіх нотаток
  const [text, setText] = useState<string>(''); // Текст нового завдання, яке вводить користувач
  const [date, setDate] = useState<Date>(); // Обрана дата/час для нового завдання (як Date), або null якщо не вибрано

  // ===== КЕРУВАННЯ ПІКЕРАМИ ДАТИ/ЧАСУ =====
  const [showDatePicker, setShowDatePicker] = useState(false); // Прапорець: чи показувати пікер дати (при створенні)
  const [showTimePicker, setShowTimePicker] = useState(false); // Прапорець: чи показувати пікер часу (після вибору дати)

  // ===== РЕЖИМ ВИБОРУ ДЛЯ МАСОВИХ ДІЙ =====
  const [selectionMode, setSelectionMode] = useState(false); // true — увімкнено режим мультивибору (довге натискання)
  const [selectedIds, setSelectedIds] = useState<string[]>([]); // Масив id вибраних нотаток (для видалення/інших групових дій)

  // Ефект монтування: один раз при старті читаємо дані зі сховища
  useEffect(() => {
    (async () => {
      try {
        const data = await AsyncStorage.getItem('todo_items_v1'); // читаємо JSON із ключа
        if (data) setTodos(JSON.parse(data)); // якщо є — парсимо та встановлюємо у стан
      } catch (e) {
        console.warn('load error', e); // у разі проблем — лог у консоль (не падаємо)
      }
    })();
  }, []); // порожній масив залежностей ⇒ запуститься один раз

  // Хелпер для збереження масиву нотаток і синхронного оновлення стану
  const saveTodos = async (data: TodoItem[]) => {
    setTodos(data); // одразу оновлюємо UI
    try {
      await AsyncStorage.setItem('todo_items_v1', JSON.stringify(data)); // і зберігаємо в AsyncStorage
    } catch (e) {
      console.warn('save error', e); // у разі помилки — лог
    }
  };

  // ДОДАВАННЯ НОВОГО ЗАВДАННЯ
  const addTodo = () => {
    if (!text.trim()) return; // якщо інпут порожній/з пробілами — нічого не робимо
    const newTodo: TodoItem = {
      id: Date.now().toString(), // простий ідентифікатор — мілісекунди часу
      text: text.trim(), // очищений текст
      date: date ? date.toLocaleDateString() : undefined, // якщо дата вибрана — зберігаємо «людяний» рядок дати
      time: date ? date.toLocaleTimeString() : undefined, // якщо дата вибрана — зберігаємо «людяний» рядок часу
    };
    saveTodos([...todos, newTodo]); // додаємо новий елемент у кінець масиву і зберігаємо
    setText(''); // очищаємо інпут
    setDate(undefined); // скидаємо обрану дату/час
  };

  // ВИДАЛЕННЯ ВИБРАНИХ (МАСОВО)
  const deleteSelected = () => {
    // Питаємо підтвердження перед масовим видаленням
    Alert.alert('Підтвердження', 'Видалити вибрані записи?', [
      { text: 'Скасувати', style: 'cancel' }, // кнопка відміни
      {
        text: 'Так',
        style: 'destructive', // червона кнопка (iOS)
        onPress: () => {
          const rest = todos.filter(t => !selectedIds.includes(t.id)); // залишаємо лише ті, яких нема у виборі
          saveTodos(rest); // зберігаємо оновлений список
          clearSelection(); // очищаємо режим вибору
        },
      },
    ]);
  };

  // РЕДАГУВАННЯ ОДНІЄЇ НОТАТКИ (простий сценарій: підвантажити текст у поле й видалити оригінал)
  const editTodo = (id: string) => {
    const target = todos.find(t => t.id === id); // знаходимо потрібну
    if (!target) return; // якщо нема — вихід
    setText(target.text); // переносимо текст у поле введення (щоб користувач відредагував)
    saveTodos(todos.filter(t => t.id !== id)); // прибираємо стару версію зі списку (нова додасться кнопкою «Додати»)
  };

  // ПЕРЕМИКАННЯ ВИБОРУ ОДНІЄЇ НОТАТКИ (тільки в режимі selectionMode)
  const toggleSelection = (id: string) => {
    if (!selectionMode) return; // якщо не в режимі мультивибору — нічого не робимо
    setSelectedIds(
      prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]), // додаємо або прибираємо id з масиву
    );
  };

  // ДОВГЕ НАТИСКАННЯ — УВІЙТИ В РЕЖИМ ВИБОРУ І ОДРАЗУ ВИБРАТИ ПОТОЧНИЙ ЕЛЕМЕНТ
  const handleLongPress = (id: string) => {
    setSelectionMode(true); // вмикаємо мультивибір
    setSelectedIds([id]); // виділяємо перший елемент
  };

  // ОЧИСТИТИ РЕЖИМ ВИБОРУ (вийти з мультивибору)
  const clearSelection = () => {
    setSelectionMode(false); // вимикаємо режим
    setSelectedIds([]); // очищаємо вибір
  };

  // ЗМІНА ДАТИ (колбек пікера дати під час створення)
  const onChangeDate = (_: any, selected?: Date) => {
    if (Platform.OS === 'android') setShowDatePicker(false); // на Android після вибору/закриття — сховати пікер дати вручну
    if (selected) {
      setDate(selected); // зберігаємо обрану дату
      setShowTimePicker(true); // відкриваємо пікер часу (ланцюжком після дати)
    }
  };

  // ЗМІНА ЧАСУ (колбек пікера часу під час створення)
  const onChangeTime = (_: any, selected?: Date) => {
    if (Platform.OS === 'android') setShowTimePicker(false); // на Android після вибору/закриття — сховати пікер часу вручну
    if (selected && date) {
      // якщо є новий час і вже обрана дата
      const newDate = new Date(date); // копіюємо попередню дату
      newDate.setHours(selected.getHours(), selected.getMinutes()); // переносимо години/хвилини з time-picker
      setDate(newDate); // зберігаємо фінальне значення (дата + час)
    }
  };

  // РЕНДЕР ОДНОГО ЕЛЕМЕНТА СПИСКУ — мемоізований useCallback, щоб не створювати функцію наново без потреби
  const renderItem = useCallback(
    ({ item }: { item: TodoItem }) => {
      const selected = selectedIds.includes(item.id); // чи вибраний цей елемент у мультивиборі
      return (
        <Pressable
          onLongPress={() => handleLongPress(item.id)} // довге натискання — увійти в режим мультивибору з цим елементом
          onPress={() => toggleSelection(item.id)} // звичайний тап — перемкнути вибір (спрацює лише коли selectionMode=true)
        >
          <View style={styles.card}>
            {' '}
            {/* карточка нотатки */}
            <View style={styles.todoRow}>
              {' '}
              {/* основний рядок елемента */}
              <View style={styles.todoTextBlock}>
                {' '}
                {/* блок ліворуч: текст + дата/час */}
                <Text
                  style={[styles.todoText, selected && styles.todoTextSelected]}
                >
                  {item.text} {/* сам текст завдання */}
                </Text>
                {(item.date || item.time) && ( // якщо є дата або час — показати рядок з ними
                  <Text style={styles.todoDate}>
                    {item.date} {item.time}
                  </Text>
                )}
              </View>
              {/* Кнопка редагування приховується у режимі мультивибору, щоб не плутати користувача */}
              {!selectionMode && (
                <PrimaryButton
                  title="Редагувати" // текст кнопки
                  variant="warning" // жовта/попереджувальна стилізація (залежить від твого компонента)
                  onPress={() => editTodo(item.id)} // при натисканні — завантажити текст у поле і видалити стару версію
                  style={styles.editBtn} // додаткові стилі кнопки
                  textStyle={styles.editBtnText} // стилі тексту кнопки
                />
              )}
            </View>
          </View>
        </Pressable>
      );
    },
    [selectionMode, selectedIds, todos], // залежності: якщо змінюються — оновити посилання на функцію (щоб FlatList перемалював елементи коректно)
  );

  // РОЗМІТКА ЕКРАНА
  return (
    <KeyboardAvoidingView
      style={styles.container} // загальний контейнер екрана
      behavior={Platform.OS === 'ios' ? 'padding' : undefined} // на iOS піднімаємо контент при появі клавіатури
    >
      {/* Шапка екрана */}
      <View style={styles.header}>
        <Text style={styles.title}>
          {selectionMode ? 'Режим вибору' : 'Мої завдання'}{' '}
          {/* динамічний заголовок залежно від режиму */}
        </Text>
        {selectionMode && ( // якщо увімкнено мультивибір — показати панель дій
          <View style={styles.selectionActions}>
            <PrimaryButton
              title="Видалити"
              variant="danger"
              onPress={deleteSelected}
            />{' '}
            {/* масове видалення */}
            <PrimaryButton title="Скасувати" onPress={clearSelection} />{' '}
            {/* вийти з режиму вибору */}
          </View>
        )}
      </View>
      {/* Поле введення нового завдання */}
      <Input
        placeholder="Нове завдання..." // підказка в інпуті
        value={text} // двостороння прив’язка до стану text
        onChangeText={setText} // оновлюємо state при вводі
        onSubmitEditing={addTodo} // Enter/Done — додати завдання
      />
      {/* Кнопка виклику пікера дати/часу та кнопка додавання */}
      <PrimaryButton
        title="Обрати дату"
        onPress={() => setShowDatePicker(true)}
      />{' '}
      {/* відкриває пікер дати */}
      <PrimaryButton title="Додати" onPress={addTodo} /> {/* додає нотатку */}
      {/* ПІКЕРИ: відображаються умовно, коли треба */}
      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()} // якщо дата ще не задана — показуємо поточну
          mode="date" // режим вибору дати
          onChange={onChangeDate} // колбек при виборі/закритті
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={date || new Date()} // використовуємо обрану дату або поточну
          mode="time" // режим вибору часу
          onChange={onChangeTime} // колбек при виборі/закритті
        />
      )}
      {/* Список нотаток */}
      <FlatList
        data={todos} // джерело даних
        keyExtractor={item => item.id} // унікальний ключ для кожного елемента
        renderItem={renderItem} // як рендерити один елемент
        extraData={[selectionMode, selectedIds]} // змушує перерендер при зміні цих залежностей
        contentContainerStyle={styles.list} // стилі контейнера списку (відступи тощо)
      />
    </KeyboardAvoidingView>
  );
}
