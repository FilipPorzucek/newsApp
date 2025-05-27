import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { AuthService } from './auth.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiKey='6c9e1f73f0f54d67a4414ce22c97d8fe'
  private apiUrl = `https://newsapi.org/v2/everything?q=news&sortBy=publishedAt&apiKey=${this.apiKey}`;
  private favorites: { title: string; url: string }[] = [];
private favoritesStorageKey = 'favorites';


  constructor(private http:HttpClient,private authService:AuthService ) {
     this.loadFavorites();
  }

  getFavoritesFromBackend(): Observable<any[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>('http://localhost:8000/favorite/list', { headers });
}

addToFavoritesBackend(title: string, url: string, urlToImage: string): void {
    let token = this.authService.getToken();

    if (!token) {
        console.warn('🔴 User is not logged in when trying to add favorite!');
        return;
    }

    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    });

    const body = { title, url,urlToImage};

    console.log('📦 Sending to backend:', body,token);

    this.http.post('http://localhost:8000/favorite', body, { headers })
        .subscribe({
            next: () => console.log('✅ Favorite added successfully!'),
            error: (err) => console.error('❌ Error adding favorite:', err)
        });
}



removeFromFavorites(url: string): void {
  this.favorites = this.favorites.filter(item => item.url !== url);
  this.saveFavorites();
}


getFavorites(): { title: string; url: string }[] {
  return [...this.favorites]; 
}


private saveFavorites(): void {
  localStorage.setItem(this.favoritesStorageKey, JSON.stringify(this.favorites));
}


private loadFavorites(): void {
  const data = localStorage.getItem(this.favoritesStorageKey);
  if (data) {
    this.favorites = JSON.parse(data);
  }
}

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

