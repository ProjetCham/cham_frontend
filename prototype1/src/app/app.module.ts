import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableModule } from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import {MenubarModule} from 'primeng/menubar';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CheckboxModule} from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { TextComponent } from './components/text/text/text.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CharsComponent } from './components/chars/chars.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    NavbarComponent,
    TextComponent,
    CharsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    MultiSelectModule,
    TagModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    ButtonModule,
    MenubarModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    CheckboxModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
