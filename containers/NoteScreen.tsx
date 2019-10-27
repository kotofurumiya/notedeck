import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { Note } from '../lib/note';
import { storage } from '../lib/storage';
import uuidv4 from 'uuid/v4';

export interface NoteScreenProps extends NavigationInjectedProps {
  note?: Note;
}

export const NoteScreen = withNavigation((props: NoteScreenProps) => {
  const note = props.note || props.navigation.getParam('note');
  const [title, setTitle] = useState<string>(note ? note.title : '');
  const [body, setBody] = useState<string>(note ? note.body : '');

  const onPressCancel = useCallback(() => {
    props.navigation.goBack();
  }, [props.navigation]);

  const onPressSave = useCallback(async () => {
    if(note) {
      const newNote = { id: note.id, title, body }
      await storage.updateNote(newNote);
    } else {
      const newNote = { id: uuidv4(), title, body }
      await storage.addNote(newNote);
    }

    props.navigation.goBack();
  }, [title, body]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onPressCancel}><Text style={styles.cancel}>Cancel</Text></TouchableOpacity>
        <TouchableOpacity onPress={onPressSave}><Text style={styles.save}>Save</Text></TouchableOpacity>
      </View>
      <View>
        <TextInput
          style={styles.noteTitle}
          placeholder="タイトル"
          defaultValue={title}
          onChangeText={setTitle}
        />
      </View>
      <View style={styles.noteBodyContainer}>
        <TextInput
          placeholder="ノートの内容"
          multiline={true}
          textAlignVertical="top"
          style={styles.noteBody}
          defaultValue={body}
          onChangeText={setBody}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(250, 250, 250)'
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },

  cancel: {
    color: 'red'
  },

  save: {
    color: 'blue'
  },

  noteTitle: {
    fontSize: 28,
    padding: 20
  },

  noteBodyContainer: {
    flex: 1
  },

  noteBody: {
    flex: 1,
    fontSize: 18,
    padding: 20
  }
});
