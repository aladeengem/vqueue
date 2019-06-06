import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorComponent } from './administrator.component';
import { ClarityModule } from '@clr/angular';
import { AdministratorRouter } from './administrator-routing';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { ProfileComponent } from './profile/profile.component';
import { EventModule } from './event/event.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdministratorComponent, DashboardComponent, SideNavComponent, ProfileComponent ],
  imports: [
    CommonModule,
    ClarityModule,
    AdministratorRouter,
    CoreModule,
    EventModule, 
    SharedModule,
    FormsModule,
  ],
  exports: [AdministratorComponent]
})
export class AdministratorModule { }
