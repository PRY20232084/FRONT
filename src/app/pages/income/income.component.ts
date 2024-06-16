import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent, ModalConfig } from 'src/app/_metronic/partials';
import { Movement } from 'src/app/models/Movement';
import { AuthService } from 'src/app/services/auth.service';
import { MovementService } from 'src/app/services/movement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit{
  movements: Movement[] = [];
  selectedMovement: Movement | null = null;
  isLoading: boolean = false;
  loggedUser: any;

  modalConfig: ModalConfig = {
    modalTitle: '¿Está seguro de que quiere eliminar el ingreso?',
    dismissButtonLabel: 'Sí, eliminar',
    closeButtonLabel: 'Cancelar',
    onDismiss: () => this.deleteMovement(),
  };
  @ViewChild('modal') private modalComponent: ModalComponent;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private movementService: MovementService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => {
      this.loggedUser = x;
      if (!this.loggedUser || Object.keys(this.loggedUser).length === 0) {
        this.router.navigate(['login']);
      } else {
        this.loadMovements();
      }
    });
  }

  loadMovements(): void {
    this.isLoading = true; // Inicia la carga
    this.movementService.getIncomeMovements().subscribe({
      next: (movementsResponse) => {
        this.movements = movementsResponse;
        this.isLoading = false; // Finaliza la carga
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading movements', error);
      },
      complete: () => {
        this.isLoading = false; // Finaliza la carga
      }
    });
  }

  sendSuccess(): void{
    Swal.fire('Eliminado', 'El ingreso se eliminó de manera correcta', 'success');
  }

  async openModal(movement: Movement) {
    this.selectedMovement = movement;
    return await this.modalComponent.open();
  }

  async deleteMovement(): Promise<boolean> {
    if (!this.selectedMovement) return false;
    try {
      await this.movementService
        .deleteMovement(this.selectedMovement.id)
        .toPromise();
      // Recargar los movimientos después de la eliminación.
      await this.loadMovements();
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    } finally {
      this.selectedMovement = null;
      // Forzar la detección de cambios después de eliminar el movimiento.
      this.cdr.detectChanges();
      this.sendSuccess();
    }
  }

  goCreate() {
    this.router.navigate(['income/create']);
  }
}
