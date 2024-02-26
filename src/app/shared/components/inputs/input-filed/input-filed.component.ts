import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

type ClassesProps = {
  label?: string,
  base?: string,
  input?: string,
  labelColor?: string
}
@Component({
  selector: 'app-input-filed',
  templateUrl: './input-filed.component.html',
  styleUrl: './input-filed.component.scss'
})
export class InputFiledComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() isFloating: boolean = false;
  @Input() name: string = "";
  @Input() DefaultName: boolean = false;

  @Input() value: string = "";
  @Input() classes?: ClassesProps;
  @Input() error: string = "";

  @Input() type: 'text' | 'number' = 'text'

  @Output() nameChanged: EventEmitter<string> = new EventEmitter<string>();
  isUserNameAvailable: boolean = false;

  constructor() { }
  ngOnInit(): void {

  }

  onNameChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.nameChanged.emit(inputValue);
  }

}
