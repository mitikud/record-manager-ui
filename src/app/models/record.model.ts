export interface RecordNote {
  id: number;
  recordId: number;
  content: string;
  createdAt: string;
}

export interface RecordItem {
  id: number;
  name: string;
  status: string;
  category: string;
  priority: string;
  description: string;
  createdAt: string;
  notes: RecordNote[];
}