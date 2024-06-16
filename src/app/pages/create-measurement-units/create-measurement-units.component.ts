import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateMeasurementUnit } from 'src/app/models/CreateMeasurementUnit';
import { AuthService } from 'src/app/services/auth.service';
import { MeasurementUnitService } from 'src/app/services/measurement-unit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-measurement-units',
  templateUrl: './create-measurement-units.component.html',
  styleUrls: ['./create-measurement-units.component.scss']
})
export class CreateMeasurementUnitsComponent implements OnInit {
  createMeasurementUnit: CreateMeasurementUnit = new CreateMeasurementUnit();
  loggedUser: any;
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private measurementService: MeasurementUnitService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("[a-zA-Z. áéíóúÁÉÍÓÚ]*")]],
      abbreviation: ['', [Validators.required, Validators.pattern("[a-zA-Z. áéíóúÁÉÍÓÚ]*")]]
    });
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => {
      this.loggedUser = x;
      if (!this.loggedUser || Object.keys(this.loggedUser).length === 0) {
        this.router.navigate(['login']);
      }
    });
  }

  insertMeasurementUnit(): void {
    this.createMeasurementUnit.createdBy = this.loggedUser.id;
    this.measurementService.createMeasurementUnit(this.createMeasurementUnit)
      .subscribe(
        datos => {
          console.log(datos);
          this.router.navigate(['measurement-units']);
        },
        error => console.log(error)
      );
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.sendRequired();
    } else {
      this.createMeasurementUnit = this.form.value;
      this.insertMeasurementUnit();
      this.sendSuccess()
    }
  }

  sendRequired(): void {
    Swal.fire('Error', 'Ingresar datos válidos. Revisar el formulario', 'error');
  }

  sendSuccess(): void{
    Swal.fire('Registro exitoso', 'La unidad de medida se registró exitosamente', 'success');
  }

  goBack(): void {
    this.router.navigate(['measurement-units']);
  }
}
