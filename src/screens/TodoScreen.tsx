// src/screens/TodoScreen.tsx
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import PrimaryButton from "../components/PrimaryButton";
import Input from "../components/Input";
import { colors } from "../theme";
import { styles } from "./TodoScreen.styles";

interface TodoItem {
  id: string;
  text: string;
  date?: string;
  time?: string;
}

export default function TodoScreen() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [text, setText] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await AsyncStorage.getItem("todo_items_v1");
        if (data) setTodos(JSON.parse(data));
      } catch (e) {
        console.warn("load error", e);
      }
    })();
  }, []);

  const saveTodos = async (data: TodoItem[]) => {
    setTodos(data);
    try {
      await AsyncStorage.setItem("todo_items_v1", JSON.stringify(data));
    } catch (e) {
      console.warn("save error", e);
    }
  };

  const addTodo = () => {
    if (!text.trim()) return;
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: text.trim(),
      date: date ? date.toLocaleDateString() : undefined,
      time: date ? date.toLocaleTimeString() : undefined,
    };
    saveTodos([...todos, newTodo]);
    setText("");
    setDate(null);
  };

  const deleteSelected = () => {
    Alert.alert("Підтвердження", "Видалити вибрані записи?", [
      { text: "Скасувати", style: "cancel" },
      {
        text: "Так",
        style: "destructive",
        onPress: () => {
          const rest = todos.filter(t => !selectedIds.includes(t.id));
          saveTodos(rest);
          clearSelection();
        },
      },
    ]);
  };

  const editTodo = (id: string) => {
    const target = todos.find(t => t.id === id);
    if (!target) return;
    setText(target.text);
    saveTodos(todos.filter(t => t.id !== id));
  };

  const toggleSelection = (id: string) => {
    if (!selectionMode) return;
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleLongPress = (id: string) => {
    setSelectionMode(true);
    setSelectedIds([id]);
  };

  const clearSelection = () => {
    setSelectionMode(false);
    setSelectedIds([]);
  };

  const onChangeDate = (_: any, selected?: Date) => {
    if (Platform.OS === "android") setShowDatePicker(false);
    if (selected) {
      setDate(selected);
      setShowTimePicker(true);
    }
  };

  const onChangeTime = (_: any, selected?: Date) => {
    if (Platform.OS === "android") setShowTimePicker(false);
    if (selected && date) {
      const newDate = new Date(date);
      newDate.setHours(selected.getHours(), selected.getMinutes());
      setDate(newDate);
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: TodoItem }) => {
      const selected = selectedIds.includes(item.id);
      return (
        <Pressable
          onLongPress={() => handleLongPress(item.id)}
          onPress={() => toggleSelection(item.id)}
        >
          <View style={styles.card}>
            <View style={styles.todoRow}>
              <View style={styles.todoTextBlock}>
                <Text style={[styles.todoText, selected && styles.todoTextSelected]}>
                  {item.text}
                </Text>
                {(item.date || item.time) && (
                  <Text style={styles.todoDate}>
                    {item.date} {item.time}
                  </Text>
                )}
              </View>

              {!selectionMode && (
                <PrimaryButton
                  title="Редагувати"
                  variant="warning"
                  onPress={() => editTodo(item.id)}
                  style={styles.editBtn}
                  textStyle={styles.editBtnText}
                />
              )}
            </View>
          </View>
        </Pressable>
      );
    },
    [selectionMode, selectedIds, todos]
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          {selectionMode ? "Режим вибору" : "Мої завдання"}
        </Text>
        {selectionMode && (
          <View style={styles.selectionActions}>
            <PrimaryButton title="Видалити" variant="danger" onPress={deleteSelected} />
            <PrimaryButton title="Скасувати" onPress={clearSelection} />
          </View>
        )}
      </View>

      <Input
        placeholder="Нове завдання..."
        value={text}
        onChangeText={setText}
        onSubmitEditing={addTodo}
      />

      <PrimaryButton title="Обрати дату" onPress={() => setShowDatePicker(true)} />
      <PrimaryButton title="Додати" onPress={addTodo} />

      {showDatePicker && (
        <DateTimePicker value={date || new Date()} mode="date" onChange={onChangeDate} />
      )}
      {showTimePicker && (
        <DateTimePicker value={date || new Date()} mode="time" onChange={onChangeTime} />
      )}

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        extraData={[selectionMode, selectedIds]}
        contentContainerStyle={styles.list}
      />
    </KeyboardAvoidingView>
  );
}
