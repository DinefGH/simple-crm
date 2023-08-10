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
        'from=${formattedDate}&' +
        'sortBy=popularity&' +
        'apiKey=f88c081bf50049828d366ad46d43e1c3';
      let response = await fetch(url);
      let data = await response.json();
      this.loadedNews = data.articles.slice(0, 4);
    } catch (error) {
      console.error('Error fetching news:', error);
      
    }
  }
}