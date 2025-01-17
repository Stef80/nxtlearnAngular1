import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Lezione } from 'src/app/core/model/lezione';
import { LezioneService } from 'src/app/services/lezione.service';
import { GuidaService } from 'src/app/services/guida.service';
import { Guida } from 'src/app/core/model/guida';

@Component({
  selector: 'nxt-lezione',
  templateUrl: './lezione.component.html',
  styleUrls: ['./lezione.component.scss']
})
export class LezioneComponent implements OnInit {

  lezione: Lezione;
  guida: Guida;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private guidaService: GuidaService,
    private lezioneService: LezioneService
    ) { }

  ngOnInit() {
    this.route.params.subscribe(val => {
      /*
      da aggiungere i vari controlli
      */
      if (val.idl != null) {
        this.scaricaDatiLezione(val.id, val.idc, val.idl);
        this.scaricaGuida(val.id);
      }
    }
    );
  } // end OnInit

  scaricaDatiLezione(id: number, idc: number, idl: number) {
    this.lezioneService.get(id, idc, idl).subscribe(
      risp => {
        this.lezione = risp;
        console.log(this.lezione);
      },
      err => console.error('ERRORE')
    );
  }


  scaricaGuida(id) {
    this.guidaService.getShort(id).subscribe(
      risp => this.guida = risp,
      error => console.error(error)
    );
  }

}
