import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleActionsDialogService {

  public closeDialog$ = new BehaviorSubject<boolean>(false);
  public confirmDialog$ = new BehaviorSubject<boolean>(false);

  constructor() { }


}
