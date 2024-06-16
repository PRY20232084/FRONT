import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent, ModalConfig } from 'src/app/_metronic/partials';
import { Product } from 'src/app/models/Product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  isLoading: boolean = false;
  loggedUser: any;

  modalConfig: ModalConfig = {
    modalTitle: '¿Está seguro de que quiere eliminar el producto?',
    dismissButtonLabel: 'Sí, eliminar',
    closeButtonLabel: 'Cancelar',
    onDismiss: () => this.deleteProduct(),
  };
  @ViewChild('modal') private modalComponent: ModalComponent;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x => {
      this.loggedUser = x;
      if (!this.loggedUser || Object.keys(this.loggedUser).length === 0) {
        this.router.navigate(['login']);
      } else {
        this.loadProducts();
      }
    });
  }

  sendSuccess(): void{
    Swal.fire('Eliminación exitosa', 'Se eliminó el producto exitosamente', 'success');
  }

  sendError(): void{
    Swal.fire('Error', 'Ocurrió un error, vuelve a intentarlo', 'error');
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (productsResponse) => {
        this.products = productsResponse;
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

  async openModal(product: Product) {
    this.selectedProduct = product;
    return await this.modalComponent.open();
  }

  async deleteProduct(): Promise<boolean> {
    if (!this.selectedProduct) return false;
    try {
      await this.productService
        .deleteProduct(this.selectedProduct.id)
        .toPromise();
      // Recargar los productos después de la eliminación.
      await this.loadProducts();
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      this.sendError();
      return false;
    } finally {
      this.selectedProduct = null;
      // Forzar la detección de cambios después de eliminar el producto.
      this.cdr.detectChanges();
      this.sendSuccess();
    }
  }

  goEdit(id: number) {
    this.router.navigate([`products/edit/${id}`]);
  }

  goCreate() {
    this.router.navigate(['products/create']);
  }
}
