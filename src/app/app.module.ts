import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UsersService } from './users.service';
import { UserComponent } from './user/user.component';
import { CityValidators } from './user/city.validators';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CityValidators, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
