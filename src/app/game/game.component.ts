import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog,} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EditPlayerComponent } from '../edit-player/edit-player.component';







@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  game!: Game;
  gameId!: string;
  player_images: any;
  gameOver = false;



  constructor(private route: ActivatedRoute  ,public dialog: MatDialog, private firestore: AngularFirestore ) {
    
  }

  ngOnInit(): void {   
  
    this.newGame();
    this.route.params.subscribe((params)=> {
      console.log(params['id'])

      this.firestore.collection('games').doc(params['id']).valueChanges().subscribe((game: any) => {
        console.log('Game update',game);
        this.gameId = params['id'];
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
        this.player_images = game.player_images;
        
      })
  
    })
  
  }



  newGame() {
    this.game = new Game();
    
  }

  takeCard() {
    if(this.game.stack.length == 0){
      this.gameOver = true; 
      } else if(!this.game.pickCardAnimation && this.game.players.length > 1) {
      this.game.currentCard = this.game.stack.pop()!;
      this.game.pickCardAnimation =  true;        
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      },1000);
    } else {
      alert('Erstelle mindestens 2 Spieler')
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent); 

    dialogRef.afterClosed().subscribe(name => {
      if(name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('user.png');
        this.saveGame();
      }   
    });
  }

  saveGame(){
    this.firestore.collection('games').doc(this.gameId).update(this.game.toJson())
  }

  editPlayer(playerId: number){
    console.log('Edit', playerId);
    
    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((change: string)=> {   
      if (change) {
        if (change == 'DELETE'){
          this.game.players.splice(playerId, 1);
          this.game.player_images.splice(playerId, 1);
        } else {
          console.log('received change', change)
          this.game.player_images[playerId] = change;         
        }
        this.saveGame();        
      }  
    });
  }


}
