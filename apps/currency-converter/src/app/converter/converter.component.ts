import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConverterService } from './converter.service';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [ConverterService],
  templateUrl: './converter.component.html',
})
export class ConverterComponent implements OnInit {
  
  @Output() newCalculationEvent = new EventEmitter();

   supportedCurrencies = ['EUR', 'GBP', 'USD'];

   sourceAmount = 1;
   sourceCurrency = this.supportedCurrencies[0];
   targetCurrency = this.supportedCurrencies[1];
   targetAmount?: number;
   exchangeRate?: number;
   
   constructor(private converterService: ConverterService) { }

   ngOnInit(): void {
    this.converterService.convertCurrency(this.sourceCurrency, this.targetCurrency, this.sourceAmount).subscribe(result => {
      
    });
  }

   getCurrencySymbolIfSupported(currency: string): string {
    switch(currency) {
      case 'EUR': 
        return '€';
      case 'GBP': 
        return '£';
      case 'USD': 
        return '$';
      default: 
        return currency;
    }
  }

  setSourceCurrency(event: Event) {
    this.sourceCurrency = (event.target as HTMLSelectElement).value;
  }

  setTargetCurrency(event: Event) {
    this.targetCurrency = (event.target as HTMLSelectElement).value;
  }

  calculate() {
    this.converterService.convertCurrency(this.sourceCurrency, this.targetCurrency, this.sourceAmount)
      .subscribe({
        next: (data) => {
          this.targetAmount = data.result;
          this.exchangeRate = data.rate;
          console.log('Conversion result:', data);

          this.newCalculationEvent.emit({
            "timestamp": new Date(),
            "from": this.sourceCurrency,
            "to": this.targetCurrency,
            "amount": this.sourceAmount,
            "result": this.targetAmount,
            "rate": this.exchangeRate
          },
        );
        },
        error: (error) => console.error('Error converting currency:', error),
        complete: () => console.log('Conversion completed')
      });
  }
}
