import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonText } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { Quote, QuotesService } from '../../../services/quotes.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: 'tabInicio.page.html',
  styleUrls: ['tabInicio.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonText, CommonModule],
})
export class InicioPage {
  quote!: Quote;

  constructor(private quotesService: QuotesService) {}

  async ionViewWillEnter() {
    await this.quotesService.init(); 
    this.quote = await this.quotesService.getRandomQuote();
  }
}
