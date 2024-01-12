import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FormsModule } from '@angular/forms';



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, HeaderComponent,FormsModule]
})



export class AppComponent  implements OnInit{
  rates: any = {};
  fromCurrency: string = 'UAN';
  toCurrency: string = 'USD';
amount: number | null = null;
  result: number | null = null;

  ngOnInit(): void {
    this.getCurrencies();
  }

  async getCurrencies() {
    const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
    const data = await response.json();
    const result = await data;

    this.rates = {
      UAN: 1,
      USD: result[24].rate,
      EUR: result[31].rate,
      AND: result[0].rate,
    };
  }

  convertCurrency() {
    if (this.amount === null) {
      this.result = null;
      return;
    }

    const fromRate = this.rates[this.fromCurrency];
    const toRate = this.rates[this.toCurrency];

    if (fromRate && toRate) {
      this.result = (this.amount * fromRate) / toRate;
    } else {
      console.error('Invalid currency codes');
    }
  }

  reverseConvertCurrency() {
    if (this.result === null) {
      this.amount = null;
      return;
    }

    const fromRate = this.rates[this.toCurrency];
    const toRate = this.rates[this.fromCurrency];

    if (fromRate && toRate) {
      this.amount = (this.result * fromRate) / toRate;
    } else {
      console.error('Invalid currency codes');
    }
  }


  onAmountChange() {
    this.convertCurrency();
  }

  onResultChange() {
    this.reverseConvertCurrency();
  }

  onCurrencyChange() {
    // Вызывается при изменении выбранной валюты
    this.convertCurrency();
  }
}
