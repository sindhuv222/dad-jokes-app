import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-joke-pagination',
  templateUrl: './joke-pagination.component.html',
  styleUrls: ['./joke-pagination.component.scss']
})
export class JokePaginationComponent {
  // Input properties to receive data from the parent component
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() totalJokes: number = 0;
  @Input() pageSize: number = 10;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() showEntries: boolean = false;

  // Method triggered when a page button is clicked
  onPageButtonClick(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }

  // Method to generate an array of page numbers for pagination buttons
  generatePageNumbers(): number[] {
    const pageNumbers = [];
    const totalPages = this.totalPages;

    // Always include the first page button
    pageNumbers.push(1);

    // Generate the intermediate page buttons based on the current page and total pages
    const maxButtons = 5;
    const displayedButtons = Math.min(maxButtons - 2, totalPages - 2);

    // Calculate the start and end of the range for the intermediate buttons
    let start = Math.max(2, this.currentPage - Math.floor(displayedButtons / 2));
    let end = start + displayedButtons - 1;

    // Ensure the range does not exceed the total number of pages
    if (end >= totalPages - 1) {
      end = totalPages - 1;
      start = Math.max(2, end - displayedButtons + 1);
    }

    // Add the intermediate buttons with ellipsis before and after
    if (start > 2) {
      pageNumbers.push(-1);
    }
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    if (end < totalPages - 1) {
      pageNumbers.push(-1);
    }

    // Always include the last page button
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  }

  // Method to calculate the start entry number shown on the page
  calculateStartEntry(): number {
    if (this.totalJokes === 0) {
      return 0;
    }
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  // Method to calculate the end entry number shown on the page
  calculateEndEntry(): number {
    const endEntry = this.currentPage * this.pageSize;
    return endEntry > this.totalJokes ? this.totalJokes : endEntry;
  }

}
