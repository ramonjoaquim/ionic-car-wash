import { Component,OnInit } from '@angular/core';
import { LoadingController, ToastController, AlertController, NavController } from "@ionic/angular";
import { ListasService } from '../listas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {


  private funcionario : string;
  private valor : string;
  private msg : Array<string>;
  private clientes : Array<string>;
  private veiculos : Array<string>;
  private cliente : string;
  private veiculo : string;
 
  private static listaStatus : Array<string>;

  constructor(
    private loadingController : LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private ListasService: ListasService)
    
    {
    this.funcionario = "";
    this.valor = "";
    this.cliente = "";
    this.veiculo = "";
    this.msg = [];
    Tab2Page.listaStatus = [];
    this.clientes = this.ListasService.getListaCliente();
    this.veiculos = this.ListasService.getListaVeiculo();
  }

  ngOnInit() {
  }

  salvar(){

    if(this.funcionario===""){
      this.showAlert("Funcionário");
      return;
    }
    if(this.valor===""){
      this.showAlert("valor");
      return;
    }

    this.setMensagem(this.funcionario,this.valor, this.cliente, this.veiculo);

    this.funcionario = "";
    this.valor = ""; 
    this.msg = [];
    setTimeout(() => {
        this.showLoading();               
        },100);

        
  }

  setMensagem(funcionario : string, valor : string, cliente : string, veiculo : string) {
    let teste: string=this.cliente+" "+veiculo+" "+funcionario+" "+valor;
    Tab2Page.listaStatus.push(teste);
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
        setTimeout(() => this.msg = Tab2Page.listaStatus, 2500);
                
      });

  }

  showToast() {
    this.toastController
      .create({
        message: 'Status salvo com sucesso!',
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

}
