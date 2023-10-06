import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})


export class NewsComponent implements OnInit {

  loadedNews: any[] = [];

  constructor() { }

  async ngOnInit(): Promise<void> {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    try {
      let url = 'https://newsapi.org/v2/everything?' +
        'q=Apple&' +
        'from=2022-07-06' +
        'sortBy=popularity&' +
        'apiKey=f88c081bf50049828d366ad46d43e1c3';
      let response = await fetch(url);
      let data = await response.json();
  
      // Initialize loadedNews as an empty array
      this.loadedNews = [];
  
      // Populate loadedNews with the first four articles if they exist
      if (data && Array.isArray(data.articles)) {
        for (let i = 0; i < 4 && i < data.articles.length; i++) {
          this.loadedNews.push(data.articles[i]);
        }
      } else {
        console.error('Articles not found in data:', data);
      }
  
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }
}