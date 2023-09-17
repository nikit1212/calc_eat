import { Component } from '@angular/core';

export interface ICalc {
  id: number;
  date: Date;
  title: string;
  kal: number;
  type: string;
  ogr: number;
  check: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  preparedCalcList: ICalc[] = [];
  displayedColumns: String[] = ['date','title','kal','type','ogr','check','delButton'];

  ngOnInit(): void {
    this.getCache();
  }

  addCalcElem(item: any): void {
    let maxInd: number = 0;
    let sumK: number = 0;
    let dayOgr: number = 0;
    this.preparedCalcList.forEach(element => {
      if (element.id > maxInd) maxInd = element.id;
      if (element.date === item.date) {
        dayOgr = element.ogr;
        sumK += element.kal;
      }
    });
    this.preparedCalcList.push({...item, id:maxInd+1, ogr: dayOgr, check: (sumK > dayOgr) ? false: true});
    this.checkOgr(item.date);
    this.setCache();
  }

  ogrCalcElem(item: any): void {
    this.preparedCalcList.forEach(el => {
      if (el.date === item.dateOgr) {
        el.ogr = item.ogr;
      }
    })
    this.checkOgr(item.dateOgr);
    this.setCache();
  }

  public setCache(): void {
    localStorage.setItem('list', JSON.stringify(this.preparedCalcList));
  }

  private getCache(): void {
    const list = localStorage.getItem('list');
    if (list) {
      this.preparedCalcList = JSON.parse(list);
    }
  }

  delCalcElem(id: number, date: Date): void {
    this.preparedCalcList = this.preparedCalcList.filter((el) => el.id !== id);
    this.checkOgr(date);
    this.setCache();
  }

  checkOgr(date: Date): void {
    let sum = 0;
    this.preparedCalcList.forEach(el => { 
      if (el.date === date) {
        sum += +el.kal;
      }
    });
    this.preparedCalcList = this.preparedCalcList.map((el) => {
      return {...el, check: el.date === date ? (sum > el.ogr) ? false : true : el.check};
    })

  }  

}


