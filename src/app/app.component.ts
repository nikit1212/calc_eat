import { Component, ViewChild, OnInit } from '@angular/core';

interface ICalc {
  date: string;
  title: string;
  kal: number;
  type: string;
  ogr: string;
  check: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('date') date!: any;
  @ViewChild('title') title!: any;
  @ViewChild('kal') kal!: any;
  @ViewChild('ogr') ogr!: any;

  calcList: ICalc[] = [];
  typeEat: string = '';

  ngOnInit(): void {
    this.getCache();
  }

  addCalcElem(): void {
    const data = {
      date: this.date.nativeElement.value,
      title: this.title.nativeElement.value,
      kal: this.kal.nativeElement.value,
      type: this.typeEat,
      ogr: this.calcList[0]?.ogr,
      check: true,
    }
    this.calcList.push(data);
    this.checkOgr(data.date);
    this.setCache();
  }

  isDisableAdd(): boolean {
    return !this.date?.nativeElement.value || !this.title?.nativeElement.value || !this.kal?.nativeElement.value || !this.typeEat;
  }

  delCalcElem(delTitle: string, delDate: string): void {
    this.calcList = this.calcList.filter((el) => el.title !== delTitle);
    this.checkOgr(delDate);
    this.setCache();
  }

  onChange(e: any): void {
    this.typeEat = e.value;
  }

  addOgr(): void {
    this.calcList = this.calcList.map((el) => {
      return {...el, ogr: this.ogr.nativeElement.value}
    });
  }

  checkOgr(date: string): void {
    let sum = 0;
    this.calcList.forEach(el => { 
      if (el.date === date) {
        sum += +el.kal;
      }
    });
    this.calcList = this.calcList.map((el) => {
      return {...el, check: el.date === date && sum < +el.ogr ? false : el.check};
    })
  }

  private setCache(): void {
    localStorage.setItem('list', JSON.stringify(this.calcList));
  }

  private getCache(): void {
    const list = localStorage.getItem('list');
    if (list) {
      this.calcList = JSON.parse(list);
    }
  }
}