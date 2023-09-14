import { Component, ViewChild, OnInit } from '@angular/core';

interface ICalc {
  date: Date;
  title: string;
  kal: number;
  type: string;
  ogr: string;
  check: string;
}

function unique(arr: any[]) {
  let result: ICalc[] = [];

  for (let str of arr) {
    if (!result.includes(str.date)) {
      result.push(str.date);
    }
  }

  return result;
}

function updList(calcList: any[], date: Date) {
  let preparedCalcList: ICalc[] = [];
  calcList.forEach(el => { 
    if (el.date === date) {
      preparedCalcList.push(el);
    }
  });
  return preparedCalcList;
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
  preparedCalcList: ICalc[] = [];
  uniqueMas: ICalc[] = [];
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
      check: 'Нет превышения',
    }
    this.calcList.push(data);
    this.uniqueMas = unique(this.calcList);
    this.checkOgr(data.date);
    this.setCache();
    this.preparedCalcList = updList(this.calcList, data.date);
  }

  isDisableAdd(): boolean {
    return !this.date?.nativeElement.value || !this.title?.nativeElement.value || !this.kal?.nativeElement.value || !this.typeEat;
  }

  delCalcElem(delTitle: string, delDate: Date): void {
    this.calcList = this.calcList.filter((el) => el.title !== delTitle);
    this.uniqueMas = unique(this.calcList);
    this.checkOgr(delDate);
    this.setCache();
    this.preparedCalcList = updList(this.calcList, delDate);
  }

  onChange(e: any): void {
    this.typeEat = e.value;
  }

  listSelectedDate(event: any): void {
    this.preparedCalcList = updList(this.calcList, event.value)
  }

  addOgr(): void {
    this.calcList = this.calcList.map((el) => {
      return {...el, ogr: this.ogr.nativeElement.value}
    });
  }

  checkOgr(date: Date): void {
    let sum = 0;
    this.calcList.forEach(el => { 
      if (el.date === date) {
        sum += +el.kal;
      }
    });
    this.calcList = this.calcList.map((el) => {
      return {...el, check: el.date === date && sum > +el.ogr ? 'Превышение' : 'Нет превышения'};
    })
  }

  private setCache(): void {
    localStorage.setItem('list', JSON.stringify(this.calcList));
  }

  private getCache(): void {
    const list = localStorage.getItem('list');
    if (list) {
      this.calcList = JSON.parse(list);
      this.uniqueMas = unique(this.calcList);
    }
  }
}
