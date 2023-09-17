import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.css']
})
export class FormAddComponent implements OnInit{

    @Output() addItemEvent = new EventEmitter<object>();
    formAdd!: FormGroup<any>;

    ngOnInit(): void {
        this.initForm();
    }
    
    private initForm() {
        this.formAdd = new FormGroup({
          date: new FormControl(''),
          title: new FormControl(''),
          kal: new FormControl(0),
          type: new FormControl(''),
        });
    }

    isDisableAdd(): boolean {
        return !this.formAdd?.value.date || !this.formAdd?.value.title || !this.formAdd?.value.kal || !this.formAdd?.value.type;
    }

    addCalcElem(): void {
        const data = {
          date: new Date(this.formAdd?.value.date).toLocaleDateString(),
          title: this.formAdd?.value.title,
          kal: this.formAdd?.value.kal,
          type: this.formAdd?.value.type,
        }
        this.addItemEvent.emit(data);
    }
}
