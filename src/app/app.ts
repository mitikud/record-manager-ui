import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { RecordTable } from './components/record-table/record-table';

@Component({
  selector: 'app-root',
  imports: [ RecordTable],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
