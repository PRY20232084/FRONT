import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent, ModalConfig } from 'src/app/_metronic/partials';
import { ProductStyleService } from 'src/app/services/product-style.service';
import { Style } from 'src/app/models/Style';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-styles',
  templateUrl: './product-styles.component.html',
  styleUrls: ['./product-styles.component.scss'],
})
export class ProductStylesComponent implements OnInit {
  productStyles: Style[] = [];
  selectedStyle: Style | null = null;
  isLoading: boolean = false;
  loggedUser: any;

  modalConfig: ModalConfig = {
    modalTitle: '¿Está seguro de que quiere eliminar el estilo?',
    dismissButtonLabel: 'Sí, eliminar',
    closeButtonLabel: 'Cancelar',
    onDismiss: () => this.deleteStyle(),
  };
  @ViewChild('modal') private modalComponent: ModalComponent;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private productStyleService: ProductStyleService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => {
      this.loggedUser = x;
      if (!this.loggedUser || Object.keys(this.loggedUser).length === 0) {
        this.router.navigate(['login']);
      } else {
        this.loadStyles();
      }
    });
  }

  async openModal(style: Style) {
    this.selectedStyle = style;
    return await this.modalComponent.open();
  }

  sendSuccess(): void{
    Swal.fire('Eliminación exitosa', 'Se eliminó el estilo exitosamente', 'success');
  }

  sendError(): void{
    Swal.fire('Error', 'Ocurrió un error, vuelve a intentarlo', 'error');
  }

  loadStyles(): void {
    this.isLoading = true;
    this.productStyleService.getProductStyles().subscribe({
      next: (styleResponse) => {
        this.productStyles = styleResponse;
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

  async deleteStyle(): Promise<boolean> {
    if (!this.selectedStyle) return false;
    try {
      await this.productStyleService
        .deleteProductStyle(this.selectedStyle.id)
        .toPromise();
      // Recargar las unidades de medida después de la eliminación.
      await this.loadStyles();
      return true;
    } catch (error) {
      console.error('Error deleting style:', error);
      this.sendError();
      return false;
    } finally {
      this.selectedStyle = null;
      // Forzar la detección de cambios después de eliminar la unidad de medida.
      this.cdr.detectChanges();
      this.sendSuccess();
    }
  }

  goEdit(id: number): void {
    this.router.navigate([`/product-styles/edit/${id}`]);
  }

  goCreate(): void {
    this.router.navigate(['/product-styles/create']);
  }
}
