import { ChargerService } from './charger.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Historic } from './historic';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css']
})
export class HistoricComponent implements OnInit {

  public historics: Historic[];
  public editHistoric: Historic;
  public deleteHistoric: Historic;


  constructor(private chargerService: ChargerService){}

  ngOnInit() {
    this.getHistorics();
  }

  public getHistorics(): void {
    this.chargerService.getHistoric().subscribe(
      (response: Historic[]) =>{
        this.historics = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public onAddHistoricRandom(historic: Historic): void {
    this.chargerService.addHistoricRandom(historic).subscribe(
      (response: void) => {
        console.log(response);
        this.getHistorics();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddHistoric(addForm: NgForm): void {
    document.getElementById('add-historic-form').click();
    this.chargerService.addHistoric(addForm.value).subscribe(
      (response: Historic) => {
        console.log(response);
        this.getHistorics();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateHistoric(historic: Historic): void {
    this.chargerService.updateHistoric(historic).subscribe(
      (response: Historic) => {
        console.log(response);
        this.getHistorics();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteHistoric(historicId: number): void {
    this.chargerService.deleteHistoric(historicId).subscribe(
      (response: void) => {
        console.log(response);
        this.getHistorics();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onOpenModal(historic: Historic, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addHistoricModal');
    }
    if (mode === 'edit') {
      this.editHistoric = historic;
      button.setAttribute('data-target', '#updateHistoricModal');
    }
    if (mode === 'delete') {
      this.deleteHistoric = historic;
      button.setAttribute('data-target', '#deleteHistoricModal');
    }
    container.appendChild(button);
    button.click();
  }

}
