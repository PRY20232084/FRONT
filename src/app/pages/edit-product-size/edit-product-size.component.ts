import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProductSize } from 'src/app/models/CreateProductSize';
import { AuthService } from 'src/app/services/auth.service';
import { ProductSizeService } from 'src/app/services/product-size.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product-size',
  templateUrl: './edit-product-size.component.html',
  styleUrls: ['./edit-product-size.component.scss']
})
export class EditProductSizeComponent implements OnInit {
  editProductSize: CreateProductSize = new CreateProductSize();
  productSizeId: number | null = null;
  loggedUser: any;
  form: FormGroup;
  isLoading: boolean = true;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private productSizeService: ProductSizeService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("^[A-Z]{1,4}$")]]
    });
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => {
      this.loggedUser = x;
      if (!this.loggedUser || Object.keys(this.loggedUser).length === 0) {
        this.router.navigate(['login']);
      } else {
        this.productSizeId = this.route.snapshot.paramMap.get('id') as number | null;
        if (this.productSizeId) {
          this.loadProductSizeDetails(this.productSizeId);
        }
      }
    });
  }

  loadProductSizeDetails(productSizeId: number): void {
    this.isLoading = true
    this.productSizeService.getProductSizeById(productSizeId).subscribe(
      productSize => {
        this.editProductSize = productSize;
        console.log(this.editProductSize);
        this.populateForm();
      }
    );
    this.isLoading = false
  }

  populateForm(): void {
    this.form.patchValue({
      name: this.editProductSize.name,
    });
  }

  updateProductSize(): void {
    if (this.form.invalid) {
      return;
    }
    this.editProductSize = { ...this.editProductSize, ...this.form.value };
    this.editProductSize.createdBy = this.loggedUser.id;
    this.productSizeService.updateProductSize(this.productSizeId!, this.editProductSize).subscribe(
      response => {
        this.router.navigate(['product-sizes']);
        this.sendSuccess()
      }
    );
  }

  sendRequired(): void {
    Swal.fire('Error', 'Ingresar datos válidos. Revisar el formulario', 'error');
  }

  sendSuccess(): void{
    Swal.fire('Edición exitosa', 'Se editó exitosamente', 'success');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.sendRequired();
    } else {
      this.updateProductSize();
    }
  }

  goBack(): void {
    this.router.navigate(['product-sizes']);
  }
}
