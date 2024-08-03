import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
})
export class HistoryComponent implements OnInit {
  history = [
    {"timestamp": new Date(),"from":"USD","to":"EUR","amount":100,"result":93453453453453452.66601292,"rate":0.9266601292},
  ];

  ngOnInit(): void {
    this.history = [];
  }

  add(from: string, to: string, amount: number, result: number, rate: number) {
    this.history = [
      {
        "timestamp": new Date(),
        "from":from,
        "to": to,
        "amount": amount,
        "result": result,
        "rate": rate
      },
      ...this.history
    ];
  }
}
