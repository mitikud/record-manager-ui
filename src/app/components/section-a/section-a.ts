import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { RecordItem } from '../../models/record.model';

@Component({
  selector: 'app-section-a',
  imports: [],
  templateUrl: './section-a.html',
  styleUrl: './section-a.scss',
})
export class SectionA {

   @Input({ required: true })
  record!: RecordItem;
  @Input()
  saving = false;

  @Output()
  statusChanged = new EventEmitter<string>();

  onStatusChange(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.statusChanged.emit(select.value);
  }
}
