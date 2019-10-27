import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { CircularButton } from '../components/CircularButton';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { Note } from '../lib/note';
import { storage } from '../lib/storage';
import { NoteSummary } from '../components/NoteSummary';

export const HomeScreen = withNavigation((props: NavigationInjectedProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  
  const refresh = () => storage.getNotes().then((n) => setNotes(n));

  const onPressEditButton = useCallback(() => {
    setIsEditMode(!isEditMode);
  }, [isEditMode, setIsEditMode]);

  const onPressAddButton = useCallback(() => {
    props.navigation.navigate('Note');
  }, [props.navigation]);

  const onAfterDeleteNote = useCallback(() => {
    refresh();
  }, []);

  useEffect(() => {
    const subscription = props.navigation.addListener('willFocus', refresh);
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.editButtonContainer}>
          <TouchableOpacity onPress={onPressEditButton}>
            <Text style={styles.editButton}>{isEditMode ? 'Done' : 'Edit'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={styles.noteList}
        data={notes}
        extraData={isEditMode}
        renderItem={({item}) => {
          const gotoEdit = () => {
            props.navigation.navigate('Note', {note: item});
          }

          return <NoteSummary
            style={styles.noteSummary}
            note={item}
            showDeleteButton={isEditMode}
            onDelete={onAfterDeleteNote}
            onPress={gotoEdit}
            disabled={isEditMode}
          />}
        }
        keyExtractor={(item) => item.id}
      />
      {isEditMode ?
        null :
        <CircularButton
          style={styles.addNote}
          icon={require('../assets/img/pencil.png')}
          onPress={onPressAddButton}
        />
      }
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(250, 250, 250)'
  },

  header: {
    padding: 25
  },

  editButtonContainer: {
    alignSelf: 'flex-end'
  },

  editButton: {
    color: 'blue',
    fontSize: 18
  },

  noteList: {
    flex: 1,
    padding: 15
  },

  noteSummary: {
    margin: 10
  },

  addNote: {
    position: 'absolute',
    right: 30,
    bottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3.00,
    elevation: 1
  }
});
