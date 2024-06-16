import { Routes } from '@angular/router';
import { MovementsComponent } from './movements/movements.component';
import { CreateMovementsComponent } from './create-movements/create-movements.component';
import { RawMaterialsComponent } from './raw-materials/raw-materials.component';
import { CreateRawMaterialComponent } from './create-raw-material/create-raw-material.component';
import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EditRawMaterialComponent } from './edit-raw-material/edit-raw-material.component';
import { MeasurementUnitsComponent } from './measurement-units/measurement-units.component';
import { CreateMeasurementUnitsComponent } from './create-measurement-units/create-measurement-units.component';
import { EditMeasurementUnitsComponent } from './edit-measurement-units/edit-measurement-units.component';
import { ProductSizesComponent } from './product-sizes/product-sizes.component';
import { CreateProductSizeComponent } from './create-product-size/create-product-size.component';
import { EditProductSizeComponent } from './edit-product-size/edit-product-size.component';
import { ProductStylesComponent } from './product-styles/product-styles.component';
import { CreateProductStyleComponent } from './create-product-style/create-product-style.component';
import { EditProductStyleComponent } from './edit-product-style/edit-product-style.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { IncomeComponent } from './income/income.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { CreateIncomeComponent } from './create-income/create-income.component';
import { CreateWithdrawalComponent } from './create-withdrawal/create-withdrawal.component';

const Routing: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'movements',
    component: MovementsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'movements/create',
    component: CreateMovementsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'raw-materials',
    component: RawMaterialsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'raw-materials/create',
    component: CreateRawMaterialComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'raw-materials/edit/:id',
    component: EditRawMaterialComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products/create',
    component: CreateProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products/edit/:id',
    component: EditProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product-sizes',
    component: ProductSizesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product-sizes/create',
    component: CreateProductSizeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product-sizes/edit/:id',
    component: EditProductSizeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product-styles',
    component: ProductStylesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product-styles/create',
    component: CreateProductStyleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product-styles/edit/:id',
    component: EditProductStyleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'measurement-units',
    component: MeasurementUnitsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'measurement-units/create',
    component: CreateMeasurementUnitsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'measurement-units/edit/:id',
    component: EditMeasurementUnitsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    data: { layout: "dark-header" }, // Set the layout for the dashboard page
    component: CreateUserComponent
  },
  {
    path: 'login',
    data: { layout: "dark-header" }, // Set the layout for the dashboard page
    component: LoginComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'income',
    component: IncomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'income/create',
    component: CreateIncomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'withdrawal',
    component: WithdrawalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'withdrawal/create',
    component: CreateWithdrawalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
