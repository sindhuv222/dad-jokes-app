import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-joke-table',
  templateUrl: './joke-table.component.html',
  styleUrls: ['./joke-table.component.scss']
})
export class JokeTableComponent {
  // Input property to receive jokes data from the parent component
  @Input() jokes: any[] = [];
}
