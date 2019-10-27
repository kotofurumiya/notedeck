import { AsyncStorage } from 'react-native';
import { Note } from '../lib/note';

const defaultNotes: Note[] = [
  {
    id: 'default-1',
    title: 'ようこそ！',
    body: 'これはサンプルのノートです'
  },
  {
    id: 'default-2',
    title: 'ノートを追加しましょう',
    body: '右下のボタンから追加できます'
  },
  {
    id: 'default-3',
    title: 'Lorem Ipsum',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fermentum hendrerit libero nec pellentesque. Aenean tincidunt, lacus ac fringilla semper, orci purus aliquam mauris, quis molestie libero risus at lorem. Morbi rutrum, mi pretium dictum congue, enim quam laoreet sapien, at luctus leo urna eget tortor. Vivamus laoreet venenatis dolor ut feugiat. Suspendisse at venenatis nisi. Phasellus vitae sodales lorem. Sed semper nibh in venenatis cursus. Fusce at diam eu enim bibendum ullamcorper eget id metus. Cras rhoncus in ante in volutpat. Aenean ut ante erat. Praesent in ornare sem, nec varius leo. Duis arcu lorem, cursus sed tempus ut, gravida nec felis. Proin lacinia diam vitae sem facilisis, nec pulvinar erat volutpat. Aenean lobortis arcu ultrices, euismod libero et, volutpat nibh.'
  }
];

export class NoteStorage {
  async getNotes() {
    const notesJsonStr = await AsyncStorage.getItem('notedeck/notes');
    return notesJsonStr ? JSON.parse(notesJsonStr) as Note[] : defaultNotes;
  }

  async addNote(note: Note) {
    const currentNotes = await this.getNotes();
    const newNotes = [...currentNotes, note];
    return AsyncStorage.setItem('notedeck/notes', JSON.stringify(newNotes));
  }

  async removeNote(id: string) {
    const currentNotes = await this.getNotes();
    const newNotes = currentNotes.filter((n) => n.id !== id);
    return AsyncStorage.setItem('notedeck/notes', JSON.stringify(newNotes));
  }

  async updateNote(note: Note) {
    const currentNotes = await this.getNotes();
    const index = currentNotes.findIndex((n) => n.id === note.id);

    let newNotes = currentNotes;

    if(index >= 0) {
      newNotes.splice(index, 1, note);
    }

    return AsyncStorage.setItem('notedeck/notes', JSON.stringify(newNotes));
  }

  async clear() {
    return AsyncStorage.removeItem('notedeck/notes');
  }
}

export const storage = new NoteStorage();