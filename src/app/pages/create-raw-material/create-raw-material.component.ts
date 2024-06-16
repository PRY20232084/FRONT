import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { createRawMaterial } from 'src/app/models/CreateRawMaterial';
import { MeasurementUnit } from 'src/app/models/MeasurementUnit';
import { AuthService } from 'src/app/services/auth.service';
import { MeasurementUnitService } from 'src/app/services/measurement-unit.service';
import { RawMaterialService } from 'src/app/services/raw-material.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-raw-material',
  templateUrl: './create-raw-material.component.html',
  styleUrls: ['./create-raw-material.component.scss'],
})
export class CreateRawMaterialComponent implements OnInit {
  createRawMaterial: createRawMaterial = new createRawMaterial();
  measurementUnits: MeasurementUnit[] = [];
  loggedUser: any;
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private rawMaterialService: RawMaterialService,
    private measurementService: MeasurementUnitService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.formBuilder.group({
      name: [
        '',
        [Validators.required, Validators.pattern("[a-zA-Z0-9. áéíóúÁÉÍÓÚ]*")],
      ],
      brandName: [
        '',
        [Validators.required, Validators.pattern("[a-zA-Z0-9. áéíóúÁÉÍÓÚ]*")],
      ],
      color: [
        '',
        [Validators.required, Validators.pattern("^(?=.*[a-zA-Z])[a-zA-Z0-9. áéíóúÁÉÍÓÚ]*$")],
      ],
      description: [
        '',
        [Validators.required, Validators.pattern("[a-zA-Z0-9., áéíóúÁÉÍÓÚ]*")],
      ],
      stock: ['', [Validators.required, Validators.min(1)]],
      measurementUnit_ID: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((x) => {
      this.loggedUser = x;
      if (!this.loggedUser || Object.keys(this.loggedUser).length === 0) {
        this.router.navigate(['login']);
      } else {
        this.loadData();
      }
    });
  }

  insertRawMaterial(): void {
    this.createRawMaterial.createdBy = this.loggedUser.id;
    this.rawMaterialService.createRawMaterial(this.createRawMaterial).subscribe(
      (datos) => {
        this.router.navigate(['raw-materials']);
      },
      (error: any) => console.log(error)
    );
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.sendRequired();
    } else {
      this.createRawMaterial = this.form.value;
      this.insertRawMaterial();
      this.sendSuccess();
    }
  }

  loadData(): void {
    this.measurementService
      .getMeasurementUnits()
      .subscribe((rawMaterialsResponse) => {
        this.measurementUnits = rawMaterialsResponse;
      });
  }

  sendRequired(): void {
    Swal.fire('Error', 'Ingresar datos válidos. Revisar el formulario', 'error');
  }

  sendSuccess(): void {
    Swal.fire(
      'Registro exitoso',
      'La materia prima se registró exitosamente',
      'success'
    );
  }

  goBack(): void {
    this.router.navigate(['raw-materials']);
  }
}
