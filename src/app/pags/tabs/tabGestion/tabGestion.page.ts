import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonInput, IonLabel, IonButton, IonList, IonItem } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Quote, QuotesService } from '../../../services/quotes.service';
import { QuoteItemComponent } from '../../../components/quote-item/quote-item.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-gestion',
  templateUrl: 'tabGestion.page.html',
  standalone: true,
  styleUrls: ['tabGestion.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    FormsModule,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonText,
    IonInput,
    IonLabel,
    IonButton,
    IonList,
    CommonModule,
    QuoteItemComponent,
    ReactiveFormsModule,
    IonItem
  ]
})
export class GestionPage implements OnInit {

  quotes: Quote[] = [];

  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private quotesService: QuotesService,
    private cdr: ChangeDetectorRef
  ) {}

  async ionViewWillEnter() {
    await this.quotesService.init();
    this.quotes = await this.quotesService.getQuotesAsync();
  }

  ngOnInit() {
    this.form = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(5)]],
      author: ['', [Validators.required, Validators.minLength(2)]]
    });
  }
  
  async addQuote() {
    if (this.form.invalid) return;

    await this.quotesService.addQuote(this.form.value);

    this.form.reset();

    this.quotes = await this.quotesService.getQuotesAsync();
    this.cdr.detectChanges()
  }

  async deleteQuote(id: number) {
    await this.quotesService.deleteQuote(id);
  
    this.quotes = await this.quotesService.getQuotesAsync();
    this.cdr.detectChanges()
  }

}
