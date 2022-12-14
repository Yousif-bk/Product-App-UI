import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiRoutes } from '../../models/ApiRoutes';
import { IProduct } from '../../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl + ApiRoutes.product.getProdects)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
      );
  }

  getProductDetails(productId: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl + ApiRoutes.product.detail + productId);
  }

  createProducts(product: IProduct) {
    return this.http.post(this.apiUrl + ApiRoutes.product.create, product);
  }


  updateProducts(product: IProduct,productId: string) {
    return this.http.put(this.apiUrl + ApiRoutes.product.edit + productId, product);
  }

  DeleteProducts(productId: string) {
    return this.http.delete(this.apiUrl + ApiRoutes.product.delete + productId);
  }
}
