import { Component, OnInit } from '@angular/core';
import { JokesService } from '../../services/jokes.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})
export class JokeComponent implements OnInit {
  jokes: any[] = []; // Array to store the fetched jokes
  currentPage: number = 1; // Current page number for pagination
  pageSize: number = 10; // Number of jokes to display per page
  totalJokes: number = 0; // Total number of jokes available
  searchTerm: string = ''; // Current search term
  lastSearchedTerm: string = ''; // Last searched search term
  searchResultMessage: string = ''; // Message to display search result information
  searchForm: FormGroup; // Angular form group to handle the search input

  constructor(private jokeService: JokesService, private formBuilder: FormBuilder) {
    // Initialize the search form with a single form control for the search term
    this.searchForm = this.formBuilder.group({
      searchTerm: ['', [Validators.pattern(/^[A-Za-z\s]*$/)]]
    });
  }

  async ngOnInit() {
    // Fetch jokes on component initialization
    await this.getJokes('');
  }

  async getJokes(searchTerm: string) {
    try {
      // Call the JokesService to fetch jokes from the API based on the search term and pagination
      const response = await this.jokeService.getJokes(searchTerm, this.currentPage, this.pageSize);
      this.jokes = response.results;
      this.totalJokes = response.total_jokes;
    } catch (error) {
      console.error('Error fetching jokes:', error);
    }
  }
  // Calculate the total number of pages
  get totalPages(): number {
    return Math.ceil(this.totalJokes / this.pageSize);
  }
  // Handler for pagination button clicks
  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      const searchTerm = this.lastSearchedTerm; // Use the last searched term for API request
      this.getJokes(this.lastSearchedTerm);
    }
  }

  // Getter for the search term form control
  get searchTermControl(): FormControl {
    return this.searchForm.get('searchTerm') as FormControl;
  }

  // Handler for individual page number buttons
  onPageButtonClick(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getJokes(this.lastSearchedTerm); // Use the last searched term for API request
    }
  }

  // Handler for the search button click
  onSearch() {
    const searchTerm = this.searchTermControl.value;
    this.currentPage = 1; // Reset the current page when a new search is performed
    this.lastSearchedTerm = searchTerm; // Update the last searched term
    this.getJokes(this.lastSearchedTerm);
    this.searchResultMessage = `Displaying results for: ${searchTerm}`;
  }

}
