import { Component, ViewChild } from '@angular/core';
import { ConverterComponent } from "./converter/converter.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { HistoryComponent } from "./history/history.component";

@Component({
  standalone: true,
  imports: [FooterComponent, HeaderComponent, HistoryComponent, ConverterComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  @ViewChild(HistoryComponent) historyComponent: any;

  forward(conversion: any) {
    this.historyComponent.add(conversion.from, conversion.to, conversion.amount, conversion.result, conversion.rate);
  }
}
