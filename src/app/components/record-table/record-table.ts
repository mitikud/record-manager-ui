import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordItem, RecordNote } from '../../models/record.model';
import { SectionA } from '../section-a/section-a';
import { SectionB } from '../section-b/section-b';
import { RecordService } from '../../services/record';

@Component({
  selector: 'app-record-table',
  imports: [CommonModule, SectionA, SectionB],
  templateUrl: './record-table.html',
  styleUrl: './record-table.scss',
})
export class RecordTable implements OnInit {

  // Normal TypeScript array
  // records: RecordItem[] = [
  //   {
  //     id: 101,
  //     name: 'John Smith',
  //     status: 'OPEN',
  //     category: 'General',
  //     priority: 'HIGH',
  //     description: 'Customer request',
  //     createdAt: '2026-10-21',
  //     notes: []
  //   },
  //   {
  //     id: 102,
  //     name: 'Sarah Wilson',
  //     status: 'PENDING',
  //     category: 'Technical',
  //     priority: 'MEDIUM',
  //     description: 'Technical issue',
  //     createdAt: '2026-10-20',
  //     notes: []
  //   }
  // ];
  

  // Selected object
  
  records: RecordItem[] = [];

  selectedRecord: RecordItem | null = null;

  // Active button
  activeSection: 'A' | 'B' | null = null;

  isSavingNote = false;

  errorMessage = '';

  lastSavedNote: RecordNote | null = null;


  selectRecord(record: RecordItem): void {
    this.selectedRecord = record;
    this.activeSection = null;

    this.errorMessage = '';

    this.lastSavedNote = null;
    // console.log('Selected record:', this.selectedRecord);
    console.log('Selected record:',  record);
  }


  constructor(
    private recordService: RecordService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords(): void {

    this.recordService.getRecords().subscribe({

      next: (data) => {
        console.log('API response:', data);
        this.records = data;
         console.log('Table records:', this.records);
        this.errorMessage = '';
        // Notify Angular that data has changed
      this.cdr.markForCheck();
      },

      error: (error) => {
        console.error('Failed to load records:', error);
        this.errorMessage = 'Unable to load records.';
        this.cdr.markForCheck();
      }

    });
  }

  onNoteAdded(note: RecordNote): void {

    if (this.isSavingNote) {
      return;
    }

    this.isSavingNote = true;
    this.errorMessage = '';

    this.lastSavedNote = null;

    this.recordService.addNote(
      note.recordId,
      note.content
    ).subscribe({

      next: (savedNote) => {

        // Update the matching record, not just
        // whichever record is currently selected.
        this.records = this.records.map(record => {

          if (record.id !== savedNote.recordId) {
            return record;
          }

          return {
            ...record,
            notes: [...record.notes, savedNote]
          };
        });

        // Refresh the selected object reference
        if (this.selectedRecord?.id === savedNote.recordId) {

          this.selectedRecord =
            this.records.find(
              r => r.id === savedNote.recordId
            ) ?? null;
        }

        this.isSavingNote = false;
        this.lastSavedNote = savedNote;
        this.cdr.markForCheck();
      },

      error: (error) => {
        console.error('Failed to save note:', error);
        console.error('Failed to save note:', error);
        console.log('Failed to save note:', error);

        this.errorMessage =
          'Unable to save note. Please try again.';

        this.isSavingNote = false;
      }

    });
  }


  showSectionA(): void {
    if (this.selectedRecord) {
      this.activeSection = 'A';
    }
  }

  showSectionB(): void {
    if (this.selectedRecord) {
      this.activeSection = 'B';
    }
  }
//   onNoteAdded(note: RecordNote): void {

//   // Find the record that owns this note
//   const record = this.records.find(
//     r => r.id === note.recordId
//   );

//   if (!record) {
//     return;
//   }

//   // Create a new notes array
//   record.notes = [...record.notes, note];

//   console.log('Note added:', note);
// }

}

