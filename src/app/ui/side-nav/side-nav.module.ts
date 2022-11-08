import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SideNavComponent } from './side-nav.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SideNavComponent],
  exports: [SideNavComponent],
  imports: [CommonModule, MatSidenavModule, MatButtonModule, FlexLayoutModule, RouterModule],
})
export class SideNavModule {}
