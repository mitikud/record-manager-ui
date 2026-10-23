import { Component, Input, input } from '@angular/core';
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
}
