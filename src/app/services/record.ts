import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecordItem, RecordNote } from '../models/record.model';

@Injectable({
  providedIn: 'root',
})
export class RecordService {

  private readonly apiUrl = '/api/records';

  constructor(private http: HttpClient) {}

  // Load all records
  getRecords(): Observable<RecordItem[]> {
    return this.http.get<RecordItem[]>(
      this.apiUrl
    );
  }

  // Load notes for one record
  getNotes(recordId: number): Observable<RecordNote[]> {
    return this.http.get<RecordNote[]>(
      `${this.apiUrl}/${recordId}/notes`
    );
  }

  // Save note to PostgreSQL
  addNote(
    recordId: number,
    content: string
  ): Observable<RecordNote> {

    return this.http.post<RecordNote>(
      `${this.apiUrl}/${recordId}/notes`,
      { content }
    );
  }
}


