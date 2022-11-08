import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CardDetailsComponent } from './card-details.component';

@NgModule({
  declarations: [CardDetailsComponent],
  exports: [CardDetailsComponent],
  imports: [CommonModule, MatCardModule],
})
export class CardDetailsModule {}
