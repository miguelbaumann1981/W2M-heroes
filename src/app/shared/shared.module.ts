import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { W2mInputComponent } from './components/w2m-input/w2m-input.component';
import { W2mNotificationComponent } from './components/w2m-notification/w2m-notification.component';
import { W2mSpinnerComponent } from './components/w2m-spinner/w2m-spinner.component';
import { W2mDefaultButtonComponent } from './components/w2m-default-button/w2m-default-button.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [
        W2mInputComponent,
        W2mNotificationComponent,
        W2mSpinnerComponent,
        W2mDefaultButtonComponent
    ],
    imports: [
      CommonModule,
      MatButtonModule,
    ],
    exports: [
        W2mInputComponent,
        W2mNotificationComponent,
        W2mSpinnerComponent,
        W2mDefaultButtonComponent
    ]
  })
  export class SharedModule { }