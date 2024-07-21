import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakService } from './services/keycloak/keycloak.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './services/http-interceptor/http-token.interceptor';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { MatCardModule } from '@angular/material/card';


import {ChartCommonModule} from "@swimlane/ngx-charts";

import { HttpClientModule } from '@angular/common/http'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PropertyListComponent } from './properties-list/properties-list.component';
import { AddPropertyComponent } from './add-properties/add-properties.component';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { UpdatePropertyComponent } from './update-properties/update-properties.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list'; // Import MatGridListModule here
import { MatTabsModule } from '@angular/material/tabs';
import { ContratComponent } from './contrat/contrat.component';
import { ContratListComponent } from './contrat-list/contrat-list.component';
import { ShowDetailsContratComponent } from './show-details-contrat/show-details-contrat.component';
import { UpdateContratComponent } from './update-contrat/update-contrat.component';
import { StatContratComponent } from './stat-contrat/stat-contrat.component';
import { ListToDoAgentComponent } from './list-to-do-agent/list-to-do-agent.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { CommonModule } from '@angular/common';

export function kcFactory(kcServcie: KeycloakService) {
  return () => kcServcie.init();
}

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PropertyListComponent,

    HomeComponent ,// Declare HomeComponent here


    AddPropertyComponent,
    UpdatePropertyComponent,
         ShowDetailsComponent,
         ContratComponent,
         ContratListComponent,
         ShowDetailsContratComponent,
         UpdateContratComponent,
         StatContratComponent,
         ListToDoAgentComponent,

  ],
  imports: [
    ChartCommonModule,
    NgxChartsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatOptionModule,
    NgxChartsModule,
    MatTabsModule,

    HttpClientModule, FormsModule, BrowserAnimationsModule,
    MatFormFieldModule, MatInputModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatCardModule, MatSelectModule, MatCheckboxModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    }, {
      provide: APP_INITIALIZER,

      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
