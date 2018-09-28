import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  imports: [CommonModule, HomeRoutingModule],
  declarations: [HomePageComponent],
})
export class HomeModule {}
