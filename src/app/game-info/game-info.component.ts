import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnChanges  {
  cardAction = [
    { title: 'Waterfall', description: 'Spieler 1 setzt an und die anderen sofort hinter her , wenn Spieler 1 absetzt darf Spieler 2 absetzen und so weiter' },
    { title: 'You', description: 'du entscheidest wer trinkt' },
    { title: 'Me', description: 'Glückwunsch, du darfst einen Shot trinken!' },
    { title: 'Category', description: 'Themenrunde!' },
    { title: 'Bust a jive', description: 'Spieler 1 macht eine bewegung und Spieler 2 wiederholt diese und fügt eine hinzu und so weiter ' },
    { title: 'Chicks', description: 'Alle Frauen trinken.' },
    { title: 'Heaven', description: 'Schmeiß deine Hände in die Luft , wer sie als letztes oben hat trinkt' },
    { title: 'Mate', description: 'Such dir einen Mitspieler aus , der immer mit dir trinkt' },
    { title: 'Thumbmaster', description: 'Für jede Frage die dir beantwortet wird, muss der jenige ein trinken ()' },
    { title: 'Men', description: 'Alle Männer trinken.' },
    { title: 'Quizmaster', description: 'Wähle ein Wort worauf der nachfolgende Spieler ein Reim finden muss, wer kein Reim findet trinkt' },
    { title: 'Never have i ever...', description: 'Sag etwas was du noch nie getan hast , wenn es jemand getan hat muss er trinken' },
    { title: 'Rule', description: 'Stelle eine Regel auf , wer sie bricht , trinkt' },
  ];

  title = '';
  description = '';
  @Input() card!: string;

  constructor() {}


  ngOnChanges()  {
    if (this.card){
      console.log(this.card);
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }
}
