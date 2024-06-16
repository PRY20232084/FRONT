import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent, ModalConfig } from 'src/app/_metronic/partials';
import { Size } from 'src/app/models/Size';
import { AuthService } from 'src/app/services/auth.service';
import { ProductSizeService } from 'src/app/services/product-size.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-sizes',
  templateUrl: './product-sizes.component.html',
  styleUrls: ['./product-sizes.component.scss'],
})
export class ProductSizesComponent implements OnInit {
  productSizes: Size[] = [];
  selectedSize: Size | null = null;
  isLoading: boolean = false;
  loggedUser: any;

  modalConfig: ModalConfig = {
    modalTitle: '¿Está seguro de que quiere eliminar la talla?',
    dismissButtonLabel: 'Sí, eliminar',
    closeButtonLabel: 'Cancelar',
    onDismiss: () => this.deleteSize(),
  };
  @ViewChild('modal') private modalComponent: ModalComponent;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private productSizeService: ProductSizeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => {
      this.loggedUser = x;
      if (!this.loggedUser || Object.keys(this.loggedUser).length === 0) {
        this.router.navigate(['login']);
      } else {
        this.loadSizes();
      }
    });
  }

  async openModal(size: Size) {
    this.selectedSize = size;
    return await this.modalComponent.open();
  }

  sendSuccess(): void{
    Swal.fire('Eliminación exitosa', 'Se eliminó la talla exitosamente', 'success');
  }

  sendError(): void{
    Swal.fire('Error', 'Ocurrió un error, vuelve a intentarlo', 'error');
  }

  loadSizes(): void {
    this.isLoading = true;
    this.productSizeService.getProductSizes().subscribe({
      next: (productSizeResponse) => {
        this.productSizes = productSizeResponse;
        this.isLoading = false; // Finaliza la carga
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading movements', error);
        this.sendError();
      },
      complete: () => {
        this.isLoading = false; // Finaliza la carga
      }
    });
  }

  async deleteSize(): Promise<boolean> {
    if (!this.selectedSize) return false;
    try {
      await this.productSizeService
        .deleteProductSize(this.selectedSize.id)
        .toPromise();
      // Recargar las unidades de medida después de la eliminación.
      await this.loadSizes();
      return true;
    } catch (error) {
      console.error('Error deleting size:', error);
      this.sendError();
      return false;
    } finally {
      this.selectedSize = null;
      // Forzar la detección de cambios después de eliminar la unidad de medida.
      this.cdr.detectChanges();
      this.sendSuccess();
    }
  }

  goEdit(id: number) {
    this.router.navigate([`product-sizes/edit/${id}`]);
  }

  goCreate() {
    this.router.navigate(['product-sizes/create']);
  }
}
