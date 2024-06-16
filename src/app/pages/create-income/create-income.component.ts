import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CreateMovement } from 'src/app/models/CreateMovement';
import { createProductMovementDetail } from 'src/app/models/CreateProductMovementDetail';
import { createRawMaterialMovementDetail } from 'src/app/models/CreateRawMaterialMovementDetail';
import { Product } from 'src/app/models/Product';
import { RawMaterial } from 'src/app/models/RawMaterial';
import { AuthService } from 'src/app/services/auth.service';
import { MovementService } from 'src/app/services/movement.service';
import { ProductMovementDetailService } from 'src/app/services/product-movement-detail.service';
import { ProductService } from 'src/app/services/product.service';
import { RawMaterialMovementDetailService } from 'src/app/services/raw-material-movement-detail.service';
import { RawMaterialService } from 'src/app/services/raw-material.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-income',
  templateUrl: './create-income.component.html',
  styleUrls: ['./create-income.component.scss'],
})
export class CreateIncomeComponent implements OnInit {
  loggedUser: any;
  isLoading: boolean = false;
  movementForm: FormGroup;
  products: Product[] = [];
  rawMaterials: RawMaterial[] = [];
  isProduct: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private movementService: MovementService,
    private productService: ProductService,
    private rawMaterialService: RawMaterialService,
    private productMovementDetailService: ProductMovementDetailService,
    private rawMaterialMovementDetailService: RawMaterialMovementDetailService,
    private cdr: ChangeDetectorRef
  ) {
    this.movementForm = this.fb.group({
      selectedProductId: [0, [this.requiredIfProduct.bind(this)]],
      selectedRawMaterialId: [0, [this.requiredIfRawMaterial.bind(this)]],
      boughtDate: ['', [Validators.required, this.dateValidator]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => {
      this.loggedUser = x;
      if (!this.loggedUser || Object.keys(this.loggedUser).length === 0) {
        this.router.navigate(['login']);
      } else {
        this.isProduct = false;
        this.cdr.detectChanges();
        this.loadData();
      }
    });
  }

  // Custom date validator
  dateValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    const date = new Date(value);
    const today = new Date();
    if (isNaN(date.getTime()) || date > today) {
      return { 'invalidDate': true };
    }
    return null;
  }

  // Custom validator to check if product is selected when isProduct is true
  requiredIfProduct(control: AbstractControl): { [key: string]: any } | null {
    if (this.isProduct && control.value <= 0) {
      return { 'requiredIfProduct': true };
    }
    return null;
  }

  // Custom validator to check if raw material is selected when isProduct is false
  requiredIfRawMaterial(control: AbstractControl): { [key: string]: any } | null {
    if (!this.isProduct && control.value <= 0) {
      return { 'requiredIfRawMaterial': true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.movementForm.invalid) {
      this.sendRequired();
    } else {
      this.insertMovement();
    }
  }

  insertMovement() {
    if (this.movementForm.invalid) {
      this.movementForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.cdr.detectChanges();

    const formValue = this.movementForm.value;

    const movement: CreateMovement = {
      ...new CreateMovement(),
      createdBy: this.loggedUser.id,
      movementType: true,
      boughtDate: formValue.boughtDate,
      description: formValue.description,
    };

    const productMovement: createProductMovementDetail = {
      ...new createProductMovementDetail(),
      productID: formValue.selectedProductId,
      quantity: formValue.quantity,
    };

    const rawMaterialMovement: createRawMaterialMovementDetail = {
      ...new createRawMaterialMovementDetail(),
      rawMaterial_ID: formValue.selectedRawMaterialId,
      quantity: formValue.quantity,
    };

    if (this.isProduct) {
      movement.registerType = false;
    }else{
      movement.registerType = true;
    }

    this.movementService.createMovement(movement).subscribe(
      (datos: any) => {
        if (this.isProduct) {
          productMovement.movementID = datos.id;
          this.productMovementDetailService.createProductMovementDetail(productMovement).subscribe(
            () => {
              this.sendSuccess();
              this.router.navigate(['income']);
            },
            (error: any) => {
              this.sendError();
              this.isLoading = false;
              this.cdr.detectChanges();
              console.error(error);
            }
          );
        } else {
          rawMaterialMovement.movement_ID = datos.id;
          this.rawMaterialMovementDetailService.createRawMaterialMovementDetail(rawMaterialMovement).subscribe(
            () => {
              this.sendSuccess();
              this.router.navigate(['income']);
            },
            (error: any) => {
              this.sendError();
              this.isLoading = false;
              this.cdr.detectChanges();
              console.error(error);
            }
          );
        }
      },
      (error: any) => {
        this.sendError();
        this.isLoading = false;
        this.cdr.detectChanges();
        console.error(error);
      }
    );
  }

  loadData(): void {
    this.productService.getProducts().subscribe((productsResponse) => {
      this.products = productsResponse;
      this.cdr.detectChanges();
    });

    this.rawMaterialService.getRawMaterials().subscribe((rawMaterialsResponse) => {
      this.rawMaterials = rawMaterialsResponse;
      this.cdr.detectChanges();
    });
  }

  onRadioChange(value: boolean) {
    this.isProduct = value;
    this.movementForm.get('selectedProductId')?.updateValueAndValidity();
    this.movementForm.get('selectedRawMaterialId')?.updateValueAndValidity();
    this.cdr.detectChanges();
  }

  goBack() {
    this.router.navigate(['income']);
  }

  sendSuccess(): void {
    Swal.fire('Exito', 'Registro exitoso', 'success');
  }

  sendError(): void {
    Swal.fire('Error', 'Vuelve a intentar, algo salió mal', 'error');
  }

  
  sendRequired(): void {
    Swal.fire('Error', 'Ingresar datos válidos. Revisar el formulario', 'error');
  }
}
