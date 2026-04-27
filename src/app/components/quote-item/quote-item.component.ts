import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonItem, IonLabel, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

import { Quote } from '../../services/quotes.service';

@Component({
  selector: 'app-quote-item',
  standalone: true,
  imports: [CommonModule, IonItem, IonLabel, IonButton],
  templateUrl: './quote-item.component.html',
})
export class QuoteItemComponent {

  @Input() quote!: Quote;
  @Input() index!: number;

  @Output() delete = new EventEmitter<number>();

  onDelete() {
    this.delete.emit(this.quote.id!);
  }
}