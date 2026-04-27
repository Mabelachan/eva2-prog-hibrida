import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;

  async initDB() {
    try {
      this.db = await this.sqlite.createConnection(
        'quotesDB',
        false,
        'no-encryption',
        1,
        false
      );
  
      await this.db.open();
  
      await this.db.execute(`
        CREATE TABLE IF NOT EXISTS quotes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          text TEXT NOT NULL,
          author TEXT NOT NULL
        );
      `);
  
    } catch (error) {
      console.warn('SQLite web fallback activo');
    }
  }

  getDB() {
    return this.db;
  }
}