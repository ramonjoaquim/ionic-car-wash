import { Component, OnInit} from '@angular/core';
import { LoadingController, ToastController, AlertController, NavController } from "@ionic/angular";
import { ListasService } from '../listas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  private marca : string;
  private placa : string;
  private cor : string;
  private msg : Array<string>;
 
  private static listaVeiculos : Array<string>;

  constructor(
    private loadingController : LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private ListasService : ListasService)
    
    {
    this.marca = "";
    this.placa = "";
    this.cor = "";
    this.msg = [];
    Tab1Page.listaVeiculos = [];
  }

  ngOnInit() {
  }

  salvar(){
    if(this.marca===""){
      this.showAlert("marca");
      return;
    }

    if(this.placa===""){
      this.showAlert("placa");
      return;
    }

    if(this.placa.length != 8){
      this,this.validaPlaca();
      return;
    }
    
    if(this.cor===""){
      this.showAlert("cor");
      return;
    }
    

    this.setMensagem(this.cor,this.marca, this.placa);

    this.marca = "";
    this.placa = "";
    this.cor = "";  
    this.msg = [];
    setTimeout(() => {
        this.showLoading();               
        },100);

        
  }

  setMensagem(cor : string, marca : string, placa : string) {
    let teste: string= "M: "+marca+", P: " + placa + ", C: "+ cor;
    Tab1Page.listaVeiculos.push(teste);

    if (placa != ""){
      this.ListasService.setListaVeiculo(placa);
    }

  }

  showLoading() {
    this.loadingController
      .create({
        message: 'Salvando...',
        spinner: "dots"
      })
      .then((loading) => {
        loading.present();
        setTimeout(() => loading.dismiss(), 2000);
        setTimeout(() => this.showToast(), 2000);
        setTimeout(() => this.msg = Tab1Page.listaVeiculos, 2500);
                
      });
  }

  showToast() {
    this.toastController
      .create({
        message: 'Veículo salvo com sucesso!',
        duration: 3000,
        color: "success",
        showCloseButton: false,
        position: 'bottom'
      })
      .then(toast => toast.present());
  }

  showAlert(msg : string) {
    this.alertController
      .create({ header: `Preecha o campo ${msg}!`,
      buttons: [{
        text: 'OK'
      }]    
    })
      .then(a => a.present());
      
  }


  validaPlaca() {
    this.alertController
      .create({ header: `Placa inválida!`,
      buttons: [{
        text: 'OK'
      }]    
    })
      .then(a => a.present());
      
  }

}
