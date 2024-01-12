import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',

})


export class HeaderComponent implements OnInit {
  usd: any;
  eur: any;
  and: any;

  ngOnInit(): void {
    this.getCurrencies();
  }async getCurrencies() {
    const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
    const data = await response.json();
    const result = await data;

    this.usd = result[24].rate.toFixed(2);
    this.eur = result[31].rate.toFixed(2);
    this.and = result[0].rate.toFixed(2);
  }
}
