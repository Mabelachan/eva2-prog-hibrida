import { Injectable } from '@angular/core';
import { SqliteService } from './sqlite.service';

export interface Quote {
  id?: number;
  text: string;
  author: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  private quotes: Quote[] = [];

  constructor(private sqliteService: SqliteService) {}

  async init() {
    try {
      await this.sqliteService.initDB();
      await this.loadQuotes();
    } catch (error) {
      console.warn('SQLite no disponible en este entorno');
    }
  }

  async loadQuotes() {
    const db = this.sqliteService.getDB();

    if (!db) {
      console.warn('DB no disponible (entorno web)');
      return;
    }

    const result = await db.query('SELECT * FROM quotes');
    this.quotes = result.values || [];

    if (this.quotes.length === 0) {
      await this.addQuote({ text: 'La vida es lo que pasa mientras haces otros planes', author: 'John Lennon' });
      await this.addQuote({ text: 'Pienso, luego existo', author: 'Descartes' });
    }
  }

  async getQuotesAsync(): Promise<Quote[]> {
    if (this.quotes.length === 0) {
      await this.loadQuotes();
    }
    return this.quotes;
  }

  async getRandomQuote(): Promise<Quote> {
    const quotes = await this.getQuotesAsync();
    const index = Math.floor(Math.random() * quotes.length);
    return quotes[index];
  }

  async addQuote(quote: Quote) {
    
    const db = this.sqliteService.getDB();

    await db.run(
      'INSERT INTO quotes (text, author) VALUES (?, ?)',
      [quote.text, quote.author]
    );

    await this.loadQuotes();
  }

  async deleteQuote(id: number) {
    const db = this.sqliteService.getDB();

    await db.run(
      'DELETE FROM quotes WHERE id = ?',
      [id]
    );

    await this.loadQuotes();
  }

  async clearQuotes() {
    const db = this.sqliteService.getDB();

    await db.run('DELETE FROM quotes');

    this.quotes = [];
  }
}