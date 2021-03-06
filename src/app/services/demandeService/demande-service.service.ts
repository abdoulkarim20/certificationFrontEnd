import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Demande } from 'src/app/models/demande.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandeServiceService {
  host=environment.hostDemande

  constructor(private http:HttpClient) { }

  /*La methode pour recuperer toutes les demandes*/
  public getAllDemandes():Observable<Demande[]>{
    return this.http.get<Demande[]>(this.host).pipe(
      catchError(this.handleError)
    )
  }



//la gestion des erreur.
private handleError(error: HttpErrorResponse) {
  let messageError=''
  if (error.status === 0) {
    //errur coter client
    messageError=error.error.message;
  } else {
    //Erreur du backend
    // console.log(error.error.message)
    messageError=error.error.message
  }
  // Return return l'eurr sur l'interface utilisateur.

  return throwError(() => new Error(messageError));
}

}
