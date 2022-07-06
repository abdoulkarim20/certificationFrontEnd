import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Administrateur } from 'src/app/models/administrateur.model';
import { Departement } from 'src/app/models/departement.model';
import { EtatCompte } from 'src/app/models/etat.model';
import { Profile } from 'src/app/models/profile.model';
import { AdminService } from 'src/app/services/admin.service';
import { DepartementService } from 'src/app/services/departement.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-formulaire-user',
  templateUrl: './formulaire-user.component.html',
  styleUrls: ['./formulaire-user.component.css']
})
export class FormulaireUserComponent implements OnInit {
  errorMessage!:string
  administrateurs!:Administrateur[];
  profiles!:Profile[];
  departements!:Departement[];

  constructor(
              private serviceAdmin:AdminService,
              private departementService:DepartementService,
              private profileService:ProfileService,
              private fb:FormBuilder
            ) { }

  ngOnInit(): void {
    this.getAllDepartement();
    this.getAllProfile();
  }
  getAllDepartement(){
    this.departementService.getAllDepartement().subscribe({
      next:(data)=>{
        this.departements=data
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
  getAllProfile(){
    this.profileService.getAllProfiles()
    .subscribe({
      next:(data)=>{
        this.profiles=data;
      },
      error:(error)=>{
        this.errorMessage=error;
      }
    })
  }
  dateFormate = {
    dateNaissance:new Date(Date.now())
  }
  // etatCompte!:EtatCompte
  saveAdministrateur=this.fb.group({
    nom:[''],
    prenoms:[''],
    dateNaissance:[formatDate(this.dateFormate.dateNaissance, 'yyyy-MM-dd', 'en')],
    email:[''],
    etatCompte:[EtatCompte.Man],
    telephone:[''],
    posteOccupe:[''],
    profileDTO:[''],
    departementDTO:[''],
    username:[],
    password:[],
    
  })

  save(){
    this.serviceAdmin.saveAdmin(this.saveAdministrateur.value).subscribe({
      next:(data)=>{
        console.log(this.saveAdministrateur.value);
        
      },
      error:(error)=>{
        this.errorMessage=error;
        console.log(error);
        
      }
    })
  }

}
