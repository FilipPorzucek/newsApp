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


  private apiUrl = `http://localhost:8000/news`;
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

addToFavoritesBackend(id:number): void {
    let token = this.authService.getToken();

    if (!token) {
        console.warn('🔴 User is not logged in when trying to add favorite!');
        return;
    }

    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    });

    const body = {id};

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

  getNews():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }

  updateNews():Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8000/news/update`)
  }

  getNewsByCategory(category: string):Observable<any>{
    return this.http.get<any>(`http://localhost:8000/news/${category}`)
  }

getRandomBannerImage(count: number): Observable<any[]> {
  return this.http.get<any[]>(`http://localhost:8000/news/send/banner`)
    .pipe(
      map(response => {
        const filtered = (response || []).filter((item: any) => item.urlToImage);
        return this.getRandomItems(filtered, count);
      })
    );
}
  getRandomItems(array: any[], count: number): any[] {
   const shuffled=array.sort(()=>0.5-Math.random());
   return shuffled.slice(0,count);
  }

   }

