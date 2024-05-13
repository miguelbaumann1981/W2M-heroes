import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { W2mNotificationComponent } from './components/w2m-notification/w2m-notification.component';
import { W2mDefaultButtonComponent } from './components/w2m-default-button/w2m-default-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [
      W2mNotificationComponent,
      W2mDefaultButtonComponent,
    ],
    imports: [
      CommonModule,
      MatButtonModule,
      MatProgressSpinnerModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      ReactiveFormsModule
    ],
    exports: [
      W2mNotificationComponent,
      W2mDefaultButtonComponent,
    ]
  })
  export class SharedModule { }