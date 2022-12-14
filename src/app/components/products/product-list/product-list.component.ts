import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/shared/models/IProduct';
import { ProductsService } from 'src/app/shared/services/app/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Product List';
  products: IProduct[] = [];
  sub: Subscription;
  errorMessage = '';


  constructor(private productsService: ProductsService,
  ) { }


  ngOnInit(): void {
    this.getProducts();
  }


  // Get All Products
  getProducts() {
    this.sub = this.productsService.getProducts().subscribe({
      next: products => {
        this.products = products;
      },
      error: err => this.errorMessage = err
    });
  }

  // Delete Produt
  deleteProduct(productId: any) {
    this.productsService.DeleteProducts(productId).subscribe({
      next: product => {
        console.log(product)
      },
      error: err => this.errorMessage = err
    })
  }

  // unsubscribe when component destroy
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
