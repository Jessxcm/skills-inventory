import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() length_data = 0;
  @Input() page_index = 0;

  @Output() changeEventPage = new EventEmitter<PageEvent>();

  page_size_options: number[] = [5, 10, 20];

  pageEvent(event: PageEvent) {
    //console.log('✅ event', event);
    this.changeEventPage.emit(event);
  }
}
