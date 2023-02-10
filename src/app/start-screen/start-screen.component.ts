import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore/firebase';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  constructor (private router: Router, private firestore: AngularFirestore) {}

  newGame() {
    //Start Game

    let game = new Game()
    this.firestore.collection('games').add(game.toJson()).then((gameInfo: any) =>{
      this.router.navigateByUrl('/game/' +gameInfo.id);
     

    });

    
  }

}
