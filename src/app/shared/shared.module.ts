import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { W2mInputComponent } from './components/w2m-input/w2m-input.component';
import { W2mNotificationComponent } from './components/w2m-notification/w2m-notification.component';
import { W2mSpinnerComponent } from './components/w2m-spinner/w2m-spinner.component';
import { W2mDefaultButtonComponent } from './components/w2m-default-button/w2m-default-button.component';
import { MatButtonModule } from '@angular/material/button';
import { W2mDialogComponent } from './components/w2m-dialog/w2m-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [
        W2mInputComponent,
        W2mNotificationComponent,
        W2mSpinnerComponent,
        W2mDefaultButtonComponent,
        W2mDialogComponent
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
        W2mInputComponent,
        W2mNotificationComponent,
        W2mSpinnerComponent,
        W2mDefaultButtonComponent,
        W2mDialogComponent
    ]
  })
  export class SharedModule { }