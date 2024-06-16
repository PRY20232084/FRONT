import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProductSize } from 'src/app/models/CreateProductSize';
import { AuthService } from 'src/app/services/auth.service';
import { ProductSizeService } from 'src/app/services/product-size.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-product-size',
  templateUrl: './create-product-size.component.html',
  styleUrls: ['./create-product-size.component.scss']
})
export class CreateProductSizeComponent implements OnInit {
  form: FormGroup;
  loggedUser: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private productSizeService: ProductSizeService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => {
      this.loggedUser = x;
      if (!this.loggedUser || Object.keys(this.loggedUser).length === 0) {
        this.router.navigate(['login']);
      } else {
        this.initializeForm();
      }
    });
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("^[A-Z]{1,4}$")]]
    });
  }

  insertProductSize(): void {
    if (this.form.invalid) {
      // Manejar la validación del formulario si es necesario
      return;
    }

    const productSize: CreateProductSize = {
      ...this.form.value,
      createdBy: this.loggedUser.id
    };

    this.productSizeService.createProductSize(productSize)
      .subscribe(
        datos => {
          this.router.navigate(['product-sizes']);
          this.sendSuccess();
        },
        (error: any) => console.log(error)
      );
  }

  sendRequired(): void {
    Swal.fire('Error', 'Ingresar datos válidos. Revisar el formulario', 'error');
  }

  sendSuccess(): void{
    Swal.fire('Registro exitoso', 'Se registró exitosamente', 'success');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.sendRequired();
    } else {
      this.insertProductSize();
    }
  }

  goBack(): void {
    this.router.navigate(['product-sizes']);
  }
}
