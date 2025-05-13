import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiKey='6c9e1f73f0f54d67a4414ce22c97d8fe'
  private apiUrl = `https://newsapi.org/v2/everything?q=news&sortBy=publishedAt&apiKey=${this.apiKey}`;


  constructor(private http:HttpClient ) {}

  getNews():Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }

  getNewsByCategory(category: string):Observable<any>{
    return this.http.get<any>(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${this.apiKey}`)
  }

  getRandomBannerImage(count: number): Observable<any[]> {
    return this.http.get<any>( `https://newsapi.org/v2/everything?q=news&sortBy=publishedAt&pageSize=40&apiKey=${this.apiKey}`)
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

