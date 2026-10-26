import { 
  Component, 
  EventEmitter, 
  Input,
  input, 
  Output, OnChanges
 } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

 import { RecordItem } from '../../models/record.model';

@Component({
  selector: 'app-section-a',
  imports: [CommonModule, FormsModule],
  templateUrl: './section-a.html',
  styleUrl: './section-a.scss',
})
export class SectionA {

    
  // Original object received from parent
  @Input({ required: true })
  record!: RecordItem;

  // Indicates whether the API request is running
  @Input()
  saving = false;

  // Local editable copy
  editedRecord!: RecordItem;

  // Sends the complete edited record to parent
  @Output()
  recordSaved = new EventEmitter<RecordItem>();

  @Output()
  statusChanged = new EventEmitter<string>();

  ngOnChanges(): void {

    if (this.record) {

      // Copy the record to avoid changing parent data
      // before Save is clicked.
      this.editedRecord = {
        ...this.record
      };
    }
  }

  saveChanges(): void {

    // Emit the complete edited object
    this.recordSaved.emit({
      ...this.editedRecord
    });
  }

  cancelChanges(): void {

    // Restore original values
    this.editedRecord = {
      ...this.record
    };
  }

  onStatusChange(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.statusChanged.emit(select.value);
  }
}
