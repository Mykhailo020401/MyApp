// src/screens/TodoScreen.tsx
import React, { useMemo, useState, useEffect } from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ===================== utils =====================
function formatDateTime(d?: Date | number | string) {
  if (!d) return '';
  const date = new Date(d);
  const datePart = date.toLocaleDateString();
  const timePart = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `${datePart}, ${timePart}`;
}

type Todo = {
  id: string;
  title: string;
  deadline?: string;
};

const COLOR = {
  bg: '#121416',
  card: '#1f2630',
  input: '#2b3442',
  text: '#ffffff',
  sub: '#aeb4be',
  ok: '#3aa76d',
  warn: '#ffd24d',
  danger: '#ff6b6b',
  ripple: '#00000033',
};

const STORAGE_KEY = 'todo_items_v1';

export default function TodoScreen() {
  const [items, setItems] = useState<Todo[]>([]);

  // збереження/завантаження
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setItems(JSON.parse(raw));
      } catch {}
    })();
  }, []);
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items)).catch(() => {});
  }, [items]);

  // створення
  const [newTitle, setNewTitle] = useState('');
  const [newDeadline, setNewDeadline] = useState<Date | undefined>();
  const [showCreateDate, setShowCreateDate] = useState(false);
  const [showCreateTime, setShowCreateTime] = useState(false);
  const [createTemp, setCreateTemp] = useState<Date>(new Date());

  // редагування (дедлайн)
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftDeadline, setDraftDeadline] = useState<Date | undefined>();
  const [showEditDate, setShowEditDate] = useState(false);
  const [showEditTime, setShowEditTime] = useState(false);
  const [editTemp, setEditTemp] = useState<Date>(new Date());

  // мультивибір
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const allSelected = items.length > 0 && selectedIds.size === items.length;

  const enterSelectionWith = (id: string) => {
    setSelectionMode(true);
    setSelectedIds(new Set([id]));
    // якщо випадково були відкриті поля редагування — закриємо
    setEditingId(null);
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      // автозавершення режиму, якщо нічого не вибрано
      if (next.size === 0) setSelectionMode(false);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
      setSelectionMode(false);
    } else {
      setSelectedIds(new Set(items.map(i => i.id)));
      setSelectionMode(true);
    }
  };

  const deleteSelected = () => {
    if (selectedIds.size === 0) return;
    Alert.alert(
      'Видалити вибрані?',
      `Ви впевнені, що хочете видалити ${selectedIds.size} нотатк${selectedIds.size === 1 ? 'у' : 'и'}?`,
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: () => {
            setItems(prev => prev.filter(x => !selectedIds.has(x.id)));
            setSelectedIds(new Set());
            setSelectionMode(false);
          },
        },
      ],
    );
  };

  // ====== CRUD ======
  const addTodo = () => {
    const title = newTitle.trim();
    if (!title) return;
    const todo: Todo = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      title,
      deadline: newDeadline ? newDeadline.toISOString() : undefined,
    };
    setItems(p => [todo, ...p]);
    setNewTitle('');
    setNewDeadline(undefined);
    Keyboard.dismiss();
  };

  const askDelete = (id: string) => {
    Alert.alert('Видалити нотатку?', 'Ви впевнені, що хочете видалити цю нотатку?', [
      { text: 'Скасувати', style: 'cancel' },
      { text: 'Видалити', style: 'destructive', onPress: () => setItems(p => p.filter(x => x.id !== id)) },
    ]);
  };

  const startEdit = (item: Todo) => {
    setEditingId(item.id);
    const dt = item.deadline ? new Date(item.deadline) : undefined;
    setDraftDeadline(dt);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraftDeadline(undefined);
    setShowEditDate(false);
    setShowEditTime(false);
  };

  const saveEdit = () => {
    if (!editingId) return;
    setItems(p => p.map(x => (x.id === editingId ? { ...x, deadline: draftDeadline?.toISOString() } : x)));
    cancelEdit();
  };

  // ====== Pickers logic (Android-safe) ======
  const openCreatePicker = () => setShowCreateDate(true);
  const onCreateDateChange = (e: DateTimePickerEvent, d?: Date) => {
    setShowCreateDate(false);
    if (e.type === 'dismissed' || !d) return;
    const base = new Date(d);
    setCreateTemp(base);
    if (Platform.OS === 'android') setShowCreateTime(true);
    else setNewDeadline(base);
  };
  const onCreateTimeChange = (e: DateTimePickerEvent, d?: Date) => {
    setShowCreateTime(false);
    if (e.type === 'dismissed') return;
    const time = d ?? createTemp;
    const final = new Date(createTemp);
    final.setHours(time.getHours(), time.getMinutes(), 0, 0);
    setNewDeadline(final);
  };

  const openEditPicker = () => {
    const base = draftDeadline ?? new Date();
    setEditTemp(base);
    setShowEditDate(true);
  };
  const onEditDateChange = (e: DateTimePickerEvent, d?: Date) => {
    setShowEditDate(false);
    if (e.type === 'dismissed' || !d) return;
    const base = new Date(d);
    setEditTemp(base);
    if (Platform.OS === 'android') setShowEditTime(true);
    else setDraftDeadline(base);
  };
  const onEditTimeChange = (e: DateTimePickerEvent, d?: Date) => {
    setShowEditTime(false);
    if (e.type === 'dismissed') return;
    const time = d ?? editTemp;
    const final = new Date(editTemp);
    final.setHours(time.getHours(), time.getMinutes(), 0, 0);
    setDraftDeadline(final);
  };

  // ====== UI ======
  const renderItem = ({ item }: { item: Todo }) => {
    const isEditing = editingId === item.id;
    const isSelected = selectedIds.has(item.id);

    return (
      <Pressable
        onLongPress={() => enterSelectionWith(item.id)}
        onPress={() => {
          if (selectionMode) toggleSelectOne(item.id);
        }}
        android_ripple={{ color: COLOR.ripple }}
        style={{
          backgroundColor: COLOR.card,
          borderRadius: 14,
          padding: 12,
          marginBottom: 10,
          gap: 6,
          borderWidth: selectionMode && isSelected ? 2 : 0,
          borderColor: selectionMode && isSelected ? COLOR.ok : 'transparent',
        }}
      >
        {/* Рядок заголовок + чекбокс (видно лише у режимі вибору) */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          {selectionMode && (
            <View style={{ padding: 6 }}>
              <Text style={{ fontSize: 18 }}>{isSelected ? '✅' : '⬜'}</Text>
            </View>
          )}
          <Text style={{ color: COLOR.text, flex: 1 }}>{item.title}</Text>
        </View>

        {!!item.deadline && <Text style={{ color: COLOR.sub }}>Дедлайн: {formatDateTime(item.deadline)}</Text>}

        {/* Індивідуальні дії приховані у режимі вибору */}
        {!selectionMode && (
          <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'flex-end' }}>
            <Pressable
              onPress={() => (isEditing ? cancelEdit() : startEdit(item))}
              style={{ backgroundColor: COLOR.warn, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 }}
              android_ripple={{ color: COLOR.ripple }}
            >
              <Text style={{ fontSize: 16 }}>✏️</Text>
            </Pressable>
            <Pressable
              onPress={() => askDelete(item.id)}
              style={{ backgroundColor: COLOR.danger, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 }}
              android_ripple={{ color: COLOR.ripple }}
            >
              <Text style={{ fontSize: 16 }}>🗑️</Text>
            </Pressable>
          </View>
        )}

        {isEditing && !selectionMode && (
          <View style={{ gap: 8, marginTop: 6 }}>
            <Pressable
              onPress={openEditPicker}
              style={{ backgroundColor: COLOR.input, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10 }}
            >
              <Text style={{ color: COLOR.text }}>
                {draftDeadline ? `Змінити дедлайн: ${formatDateTime(draftDeadline)}` : 'Додати дедлайн'}
              </Text>
            </Pressable>

            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Pressable
                onPress={saveEdit}
                style={{ backgroundColor: COLOR.ok, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10 }}
              >
                <Text style={{ color: COLOR.text }}>Зберегти</Text>
              </Pressable>
              <Pressable
                onPress={cancelEdit}
                style={{ backgroundColor: COLOR.input, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10 }}
              >
                <Text style={{ color: COLOR.text }}>Скасувати</Text>
              </Pressable>
              {!!draftDeadline && (
                <Pressable
                  onPress={() => setDraftDeadline(undefined)}
                  style={{ backgroundColor: COLOR.input, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10 }}
                >
                  <Text style={{ color: COLOR.text }}>Очистити</Text>
                </Pressable>
              )}
            </View>
          </View>
        )}
      </Pressable>
    );
  };

  const empty = useMemo(
    () => <Text style={{ color: COLOR.sub, textAlign: 'center', marginTop: 24 }}>Додайте перше завдання 👇</Text>,
    [],
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLOR.bg, padding: 16 }}>
      {/* Панель створення */}
      <View style={{ gap: 8, marginBottom: 12 }}>
        <TextInput
          placeholder="Нове завдання…"
          placeholderTextColor="#8b93a1"
          style={{
            backgroundColor: COLOR.input,
            color: COLOR.text,
            borderRadius: 12,
            paddingHorizontal: 12,
            paddingVertical: 10,
          }}
          value={newTitle}
          onChangeText={setNewTitle}
          returnKeyType="done"
          onSubmitEditing={addTodo}
        />

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Pressable
            onPress={openCreatePicker}
            style={{
              flex: 1,
              backgroundColor: COLOR.input,
              paddingHorizontal: 12,
              paddingVertical: 10,
              borderRadius: 10,
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: COLOR.text }}>
              {newDeadline ? `Дедлайн: ${formatDateTime(newDeadline)}` : 'Додати дедлайн (необов’язково)'}
            </Text>
          </Pressable>

          <Pressable
            onPress={addTodo}
            style={{ backgroundColor: COLOR.ok, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, justifyContent: 'center' }}
          >
            <Text style={{ color: COLOR.text, fontWeight: '600' }}>Додати</Text>
          </Pressable>
        </View>
      </View>

      {/* Панель мультивибору — тепер тільки у режимі вибору */}
      {selectionMode && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <Pressable
            onPress={toggleSelectAll}
            style={{ backgroundColor: COLOR.input, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 }}
          >
            <Text style={{ color: COLOR.text }}>{allSelected ? 'Зняти вибір усіх' : 'Вибрати всі'}</Text>
          </Pressable>

          <Pressable
            onPress={deleteSelected}
            disabled={selectedIds.size === 0}
            style={{
              backgroundColor: selectedIds.size === 0 ? '#404854' : COLOR.danger,
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: COLOR.text }}>Видалити вибрані ({selectedIds.size})</Text>
          </Pressable>
        </View>
      )}

      {/* Список */}
      <FlatList
        data={items}
        keyExtractor={x => x.id}
        renderItem={renderItem}
        ListEmptyComponent={empty}
        keyboardShouldPersistTaps="handled"
        extraData={{ selectionMode, selectedIds }}
      />

      {/* Пікери створення */}
      {showCreateDate && (
        <DateTimePicker value={newDeadline ?? new Date()} mode="date" onChange={onCreateDateChange} />
      )}
      {Platform.OS === 'android' && showCreateTime && (
        <DateTimePicker value={createTemp} mode="time" onChange={onCreateTimeChange} />
      )}

      {/* Пікери редагування */}
      {showEditDate && (
        <DateTimePicker value={draftDeadline ?? new Date()} mode="date" onChange={onEditDateChange} />
      )}
      {Platform.OS === 'android' && showEditTime && (
        <DateTimePicker value={editTemp} mode="time" onChange={onEditTimeChange} />
      )}
    </View>
  );
}
