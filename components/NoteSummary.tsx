import React, { useMemo, useCallback } from 'react';
import { StyleSheet, Text, View, ViewProps, Image, TouchableOpacity, TouchableOpacityProps, Alert } from 'react-native';
import { Note } from '../lib/note';
import { CircularButton } from './CircularButton';
import { storage } from '../lib/storage';

interface NoteSummaryProps extends TouchableOpacityProps {
  note: Note;
  showDeleteButton?: boolean;
  onDelete?: () => any;
}

const deleteIcon = require('../assets/img/trashbox.png');

export const NoteSummary: React.FC<NoteSummaryProps> = ({note, style, ...props}) => {
  const threshold = 60;
  const summary = useMemo(
    () => note.body.length > threshold ? note.body.slice(0, threshold) + '…' : note.body
  , [note]);

  const onDelete = useCallback(() => {
    const deleteFunc = () => {
      storage.removeNote(note.id)
      .then(() => {
        if(props.onDelete) {
          props.onDelete();
        }
      });
    };


    Alert.alert('確認', 'このノートを削除しますか？', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: deleteFunc},
    ]);
  }, [props.onDelete])

  return (
    <TouchableOpacity style={[styles.container, style]} {...props} disabled={props.showDeleteButton}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.body}>{summary}</Text>
      </View>
      {props.showDeleteButton ? <CircularButton style={styles.deleteIcon} icon={deleteIcon} onPress={onDelete}/> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.00,
    elevation: 1,
    padding: 10
  },

  contentContainer: {
    flex: 1
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10
  },

  body: {
    fontSize: 18,
    padding: 10
  },

  deleteIcon: {
    backgroundColor: 'red'
  }
});
