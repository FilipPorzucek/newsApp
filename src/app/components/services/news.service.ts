import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl = 'https://newsapi.org/v2/everything?q=news&sortBy=publishedAt&apiKey=6c9e1f73f0f54d67a4414ce22c97d8fe';

  constructor(private http:HttpClient ) {}

  getNews():Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }

  getRandomBannerImage(count: number = 5): Observable<any[]> {
    return this.http.get<any>('https://newsapi.org/v2/everything?q=news&sortBy=publishedAt&apiKey=6c9e1f73f0f54d67a4414ce22c97d8fe')
      .pipe(
        map(response => {
          const filtered = response.articles.filter((item: any) => item.urlToImage);
          return this.getRandomItems(filtered, count);
        })
      );
  }
  getRandomItems(array: any[], count: number): any[] {
   const shuffled=array.sort(()=>0.5-Math.random());
   return shuffled.slice(0,count);
  }

   }

