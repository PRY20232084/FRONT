import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateMeasurementUnit } from 'src/app/models/CreateMeasurementUnit';
import { AuthService } from 'src/app/services/auth.service';
import { MeasurementUnitService } from 'src/app/services/measurement-unit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-measurement-units',
  templateUrl: './edit-measurement-units.component.html',
  styleUrls: ['./edit-measurement-units.component.scss'],
})
export class EditMeasurementUnitsComponent implements OnInit {
  editMeasurementUnit: CreateMeasurementUnit = new CreateMeasurementUnit();
  measurementUnitId: number | null = null;
  loggedUser: any;
  form: FormGroup;
  isLoading: boolean = true;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private measurementService: MeasurementUnitService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("[a-zA-Z. áéíóúÁÉÍÓÚ]*")]],
      abbreviation: ['', [Validators.required, Validators.pattern("[a-zA-Z. áéíóúÁÉÍÓÚ]*")]]
    });
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      this.loggedUser = user;
      if (!this.loggedUser || Object.keys(this.loggedUser).length === 0) {
        this.router.navigate(['login']);
      } else {
        this.measurementUnitId = Number(this.route.snapshot.paramMap.get('id'));
        if (this.measurementUnitId) {
          this.isLoading = true
          this.loadMeasurementUnitDetails(this.measurementUnitId);
          this.isLoading = false
        }
      }
    });
  }

  loadMeasurementUnitDetails(measurementUnitId: number): void {
    this.isLoading = true
    this.measurementService
      .getMeasurementUnitById(measurementUnitId)
      .subscribe((measurementUnit) => {
        this.editMeasurementUnit = measurementUnit;
        this.form.patchValue({
          name: this.editMeasurementUnit.name,
          abbreviation: this.editMeasurementUnit.abbreviation,
        });
      });
      this.isLoading = false
  }

  updateMeasurementUnit(): void {
    if (this.form.valid) {
      this.editMeasurementUnit = {
        ...this.editMeasurementUnit,
        ...this.form.value,
      };
      this.measurementService
        .updateMeasurementUnit(
          this.measurementUnitId!,
          this.editMeasurementUnit
        )
        .subscribe((response) => {
          this.router.navigate(['measurement-units']);
        });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.sendRequired();
    } else {
      this.editMeasurementUnit = this.form.value;
      this.updateMeasurementUnit();
      this.sendSuccess();
    }
  }

  sendRequired(): void {
    Swal.fire('Error', 'Ingresar datos válidos. Revisar el formulario', 'error');
  }

  sendSuccess(): void {
    Swal.fire(
      'Edición exitosa',
      'La unidad de medida se editó exitosamente',
      'success'
    );
  }

  goBack(): void {
    this.router.navigate(['measurement-units']);
  }
}
