import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heading1',
  templateUrl: './heading1.component.html',
  styleUrls: ['./heading1.component.scss']
})
export class Heading1Component {
  @Input() text: string = '';
}