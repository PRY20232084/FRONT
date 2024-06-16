import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from 'src/app/_metronic/partials/layout/modals/modals.module'
// #fake-start#
import { FakeAPIService } from './_fake/fake-api.service';
import { SharedModule } from "./_metronic/shared/shared.module";
import { MovementsComponent } from './pages/movements/movements.component';
import { CreateMovementsComponent } from './pages/create-movements/create-movements.component';
import { RawMaterialsComponent } from './pages/raw-materials/raw-materials.component';
import { CreateRawMaterialComponent } from './pages/create-raw-material/create-raw-material.component';
import { ProductsComponent } from './pages/products/products.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { EditRawMaterialComponent } from './pages/edit-raw-material/edit-raw-material.component';
import { MeasurementUnitsComponent } from './pages/measurement-units/measurement-units.component';
import { CreateMeasurementUnitsComponent } from './pages/create-measurement-units/create-measurement-units.component';
import { EditMeasurementUnitsComponent } from './pages/edit-measurement-units/edit-measurement-units.component';
import { ProductSizesComponent } from './pages/product-sizes/product-sizes.component';
import { CreateProductSizeComponent } from './pages/create-product-size/create-product-size.component';
import { EditProductSizeComponent } from './pages/edit-product-size/edit-product-size.component';
import { ProductStylesComponent } from './pages/product-styles/product-styles.component';
import { CreateProductStyleComponent } from './pages/create-product-style/create-product-style.component';
import { EditProductStyleComponent } from './pages/edit-product-style/edit-product-style.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { IncomeComponent } from './pages/income/income.component';
import { WithdrawalComponent } from './pages/withdrawal/withdrawal.component';
import { CreateIncomeComponent } from './pages/create-income/create-income.component';
import { CreateWithdrawalComponent } from './pages/create-withdrawal/create-withdrawal.component';
// #fake-end#

function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      //@ts-ignore
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

@NgModule({
    declarations: [AppComponent, MovementsComponent, CreateMovementsComponent, RawMaterialsComponent, CreateRawMaterialComponent, ProductsComponent, CreateProductComponent, CreateUserComponent, EditProductComponent, EditRawMaterialComponent, MeasurementUnitsComponent, CreateMeasurementUnitsComponent, EditMeasurementUnitsComponent, ProductSizesComponent, CreateProductSizeComponent, EditProductSizeComponent, ProductStylesComponent, CreateProductStyleComponent, EditProductStyleComponent, LoginComponent, ProfileComponent, IncomeComponent, WithdrawalComponent, CreateIncomeComponent, CreateWithdrawalComponent],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializer,
            multi: true,
            deps: [AuthService],
        },
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
        ModalsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        ClipboardModule,
        // #fake-start#
        environment.isMockEnabled
            ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
                passThruUnknownUrl: true,
                dataEncapsulation: false,
            })
            : [],
        // #fake-end#
        InlineSVGModule.forRoot(),
        NgbModule,
        SharedModule,
        AppRoutingModule
      ]
})
export class AppModule {}
