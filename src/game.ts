import * as PIXI from 'pixi.js';
import coverImage from './images/cover.png';
import knightImage from './images/knight.png';
import farmerImage from './images/farmer.png';
import landlordImage from './images/landlord.png';
import settingsImage from './images/settings.png';
import { Character } from './character';
import { Knight } from './knight';
import { Farmer } from './farmer';
import { Assets } from './assets';
import { Brandaan } from './brandaan';
import { UI } from './ui';
import { Button } from './button';
import { Landlord } from './landlord';
import { Speechbubble } from './speechbubble';

export class Game {
  private pixiWidth = 800;
  private pixiHeight = 500;

  public pixi: PIXI.Application;
  public loader: PIXI.Loader;
  private brandaan: Brandaan;
  private characters: Character[] = [];
  private interface: UI;

  private landlord: Landlord
  private landlordClickCounter: number = 0
  private speechBubble: Speechbubble

  //set timer on 15 minutes
  timeUntilFinish: number = 54000;

  constructor(pixi: PIXI.Application) {
    // this._pixi = new PIXI.Application({ width: 1440, height: 900})
    this.pixi = pixi

    new Assets(this);

    this.loader = new PIXI.Loader();
    this.loader.add('coverTexture', coverImage);
    this.loader.add('knightTexture', knightImage);
    this.loader.add('farmerTexture', farmerImage);
    this.loader.add('landlordTexture', landlordImage);
    this.loader.add('settingsTexture', settingsImage);
    this.loader.load(() => this.spriteLoadCompleted());
  }

  public loadCompleted() {
    //create brandaan mn niffouw
    let frames: PIXI.Texture[][] = this.createBrandaanFrames();
    this.brandaan = new Brandaan(this, frames, 50, 50);
    //let brandaan move
    this.pixi.ticker.add((delta: number) => this.update(delta));

    //create knight
    let knight = new Knight(
      this.loader.resources['knightTexture'].texture!,
      this,
      700,
      50
    );
    //click event for knight
    knight.on('click', function () {
      console.log('Ik ben een ridder');
    });
    this.characters.push(knight);
    this.pixi.stage.addChild(knight);

    //create farmer
    let farmer = new Farmer(
      this.loader.resources['farmerTexture'].texture!,
      this,
      750,
      400
    );
    //click event for farmer
    farmer.on('click', function () {
      console.log('Ik ben een boer');
    });
    this.characters.push(farmer);
    this.pixi.stage.addChild(farmer);

    //create landlord
    this.landlord = new Landlord(
      this.loader.resources['landlordTexture'].texture!,
      this,
      100,
      300
    );
    //click event for landlord
    this.landlord.on('click', function () {
      console.log('Ik ben de koning');
    });
    this.characters.push(this.landlord);
    this.pixi.stage.addChild(this.landlord);

    //create ui
    // this.interface = new UI(this);
    // this.pixi.stage.addChild(this.interface);
    this.pixi.stage.addChild(this.landlord);

    this.landlord.on('click', () => this.onLandlordClick());
  }

  private onLandlordClick() {
    if (this.landlord.dialoge.length === this.landlordClickCounter) {
        this.pixi.stage.removeChild(this.speechBubble)
        return;
    }

    if (this.speechBubble == null) {
        this.speechBubble = new Speechbubble(150, 250, this.landlord.dialoge[this.landlordClickCounter])
    } else {
        this.speechBubble.speechText.text = this.landlord.dialoge[this.landlordClickCounter];
    }
    this.pixi.stage.addChild(this.speechBubble)
    this.landlordClickCounter++
    
}


  public spriteLoadCompleted() {
    //create background
    let cover = new PIXI.Sprite(this.loader.resources['coverTexture'].texture!);
    cover.height = this.pixiHeight;
    cover.width = this.pixiWidth;
    this.pixi.stage.addChild(cover);
  }

  private update(delta: number) {
    this.brandaan.update(delta);

    //start timer
    this.timeUntilFinish -= delta;
    let secondsLeft = Math.floor(this.timeUntilFinish / 60);
    if (this.timeUntilFinish <= 0) {
      console.log('Je zit voor altijd vast in deze wereld!');
    } else {
      console.log(`Je hebt nog ${secondsLeft} over!`);
    }
  }

  private createBrandaanFrames(): PIXI.Texture[][] {
    // create an array of textures from an image path
    let frames: PIXI.Texture[] = [];
    let runFrames: PIXI.Texture[] = [];

    for (let i = 1; i <= 6; i++) {
      // magically works since the spritesheet was loaded with the pixi loader
      frames.push(PIXI.Texture.from(`brandaan_${i}`));
    }
    for (let i = 7; i <= 12; i++) {
      // magically works since the spritesheet was loaded with the pixi loader
      runFrames.push(PIXI.Texture.from(`brandaan_${i}`));
    }
    return [frames, runFrames];
  }
}

