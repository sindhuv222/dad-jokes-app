import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JokesService {

  private apiURL = 'https://icanhazdadjoke.com/search';

  constructor() { }
  // Method to fetch jokes from the API
  async getJokes(searchTerm: string, page: number, pageSize: number = 10): Promise<any> {
    const headers = new Headers({
      'Accept': 'application/json'
    });
    // Creating URL parameters to pass search term, page, and page size
    const params = new URLSearchParams({
      term: searchTerm,
      page: page.toString(),
      limit: pageSize.toString()
    });
    // Creating the request object with URL and headers
    const request = new Request(`${this.apiURL}?${params.toString()}`, {
      method: 'GET',
      headers
    });
    // Sending the API request using fetch and waiting for the response
    const response = await fetch(request);
    // Handling network errors
    if (!response.ok) {
      throw new Error('Network response Error.');
    }
    // Parsing the JSON response and returning the results and total jokes count
    const data = await response.json();
    return {
      results: data.results,
      total_jokes: data.total_jokes
    };
  }

}
