import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateProductStyle } from 'src/app/models/CreateProductStyle';
import { AuthService } from 'src/app/services/auth.service';
import { ProductStyleService } from 'src/app/services/product-style.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product-style',
  templateUrl: './edit-product-style.component.html',
  styleUrls: ['./edit-product-style.component.scss'],
})
export class EditProductStyleComponent implements OnInit {
  editProductStyle: CreateProductStyle = new CreateProductStyle();
  productStyleId: number | null = null;
  loggedUser: any;
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private productStyleService: ProductStyleService,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9. áéíóúÁÉÍÓÚ]*")]],
      description: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9., áéíóúÁÉÍÓÚ]*")]]
    });
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => {
      this.loggedUser = x;
      if (!this.loggedUser || Object.keys(this.loggedUser).length === 0) {
        this.router.navigate(['login']);
      } else {
        this.productStyleId = this.route.snapshot.paramMap.get('id') as
          | number
          | null;
        if (this.productStyleId) {
          this.loadProductStyleDetails(this.productStyleId);
        }
      }
    });
  }

  loadProductStyleDetails(productStyleId: number): void {
    this.productStyleService
      .getProductStyleById(productStyleId)
      .subscribe((productStyle) => {
        this.editProductStyle = productStyle;
        console.log(this.editProductStyle);
        this.form.patchValue({
          name: this.editProductStyle.name,
          description: this.editProductStyle.description,
        });
        this.cdr.detectChanges();
      });
  }

  updateProductStyle(): void {
    this.editProductStyle.createdBy = this.loggedUser.id;
    this.editProductStyle.name = this.form.value.name; // Update edited fields
    this.editProductStyle.description = this.form.value.description
    // Update other fields as needed
    this.productStyleService
      .updateProductStyle(this.productStyleId!, this.editProductStyle)
      .subscribe((response) => {
        this.router.navigate(['product-styles']);
        this.sendSuccess();
      });
  }

  sendRequired(): void {
    Swal.fire('Error', 'Ingresar datos válidos. Revisar el formulario', 'error');
  }

  sendSuccess(): void {
    Swal.fire('Edición exitosa', 'Se editó exitosamente', 'success');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.sendRequired();
    } else {
      this.updateProductStyle();
    }
  }

  goBack(): void {
    this.router.navigate(['product-styles']);
  }
}
