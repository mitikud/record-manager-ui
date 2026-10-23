import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { RecordItem, RecordNote } from '../../models/record.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-section-b',
  imports: [CommonModule, FormsModule],
  templateUrl: './section-b.html',
  styleUrl: './section-b.scss',
})
export class SectionB {

  @Input({ required: true })
  record!: RecordItem;

   @Output()
  noteAdded = new EventEmitter<RecordNote>();


  // Add OnChanges to the class declaration:
// export class SectionB implements OnChanges

@Input() saving = false;
@Input() saveError = '';

  // Normal TypeScript variable
  noteText: string = '';

  @Input() set savedNote(note: RecordNote | null) {
  if (note && note.recordId === this.record?.id) {
    this.noteText = '';
  }
}

ngOnChanges(changes: SimpleChanges): void {
  if (changes['record']) {
    this.noteText = '';
  }
}

onNoteKeydown(event: KeyboardEvent): void {

  if (event.key !== 'Enter' || event.shiftKey) {
    return;
  }

  event.preventDefault();

  const content = this.noteText.trim();

  if (!content || this.saving) {
    return;
  }

  const note: RecordNote = {
    id: 0,
    recordId: this.record.id,
    content,
    createdAt: new Date().toISOString()
  };

  this.noteAdded.emit(note);
}

    // // Create a note object
    // const newNote: RecordNote = {
    //   id: 0, // Temporary ID; backend will generate the real ID
    //   recordId: this.record.id,
    //   content: content,
    //   createdAt: new Date().toISOString()
    // };

    // Send the object to the parent
    // this.noteAdded.emit(newNote);

    // // Clear the text box
    // this.noteText = '';
  }

