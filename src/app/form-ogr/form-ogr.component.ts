import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'form-ogr',
  templateUrl: './form-ogr.component.html',
  styleUrls: ['./form-ogr.component.css']
})
export class FormOgrComponent implements OnInit {

  @Output() ogrItemEvent = new EventEmitter<object>();

  formOgr!: FormGroup<any>;

  ngOnInit(): void {
      this.initForm();
  }
  
  private initForm() {
      this.formOgr = new FormGroup({
        date: new FormControl(''),
        ogr: new FormControl(0)
      });
  }

  ogrCalcElem(): void {
    const data = {
      dateOgr: new Date(this.formOgr?.value.date).toLocaleDateString(),
      ogr: this.formOgr?.value.ogr,
    }
    this.ogrItemEvent.emit(data);
  }
}