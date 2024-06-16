import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProduct } from 'src/app/models/CreateProduct';
import { Size } from 'src/app/models/Size';
import { Style } from 'src/app/models/Style';
import { AuthService } from 'src/app/services/auth.service';
import { ProductSizeService } from 'src/app/services/product-size.service';
import { ProductStyleService } from 'src/app/services/product-style.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  productStyles: Style[] = [];
  productSizes: Size[] = [];
  editProduct: CreateProduct = new CreateProduct(); // Consider renaming CreateProduct to Product for better clarity
  productId: number | null = null;
  loggedUser: any;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private productStyleService: ProductStyleService,
    private productSizeService: ProductSizeService,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => {
      this.loggedUser = x;
      if (!this.loggedUser || Object.keys(this.loggedUser).length === 0) {
        this.router.navigate(['login']);
      } else {
        this.productId = this.route.snapshot.paramMap.get('id') as number | null;
        this.loadData();
        if (this.productId) {
          this.loadProductDetails(this.productId);
        }
      }
    });
  }

  loadData(): void {
    this.productStyleService.getProductStyles().subscribe(
      productStylesResponse => {
        this.productStyles = productStylesResponse;
        this.cdr.detectChanges();
      }
      );
    this.productSizeService.getProductSizes().subscribe(
      productSizesResponse => {
        this.productSizes = productSizesResponse;
        this.isLoading = false
        this.cdr.detectChanges();
      }
      );
  }

  loadProductDetails(productId: number): void {
    this.isLoading = true
    this.productService.getProductById(productId).subscribe(
      product => {
        this.editProduct = product;
        this.isLoading = false
        this.cdr.detectChanges();
      }
    );
  }

  updateProduct(): void {
    this.productService.updateProduct(this.productId!, this.editProduct).subscribe(
      response => {
        this.router.navigate(['products']);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['products']);
  }
}
