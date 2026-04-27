import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { QuotesService } from '../../../services/quotes.service';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  templateUrl: 'tabConfiguracion.page.html',
  styleUrls: ['tabConfiguracion.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonText, CommonModule, IonButton],
})
export class ConfiguracionPage {
  constructor(private quotesService: QuotesService) {}

  async clearAll() {
    await this.quotesService.clearQuotes();
  }
}
