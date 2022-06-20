import * as PIXI from 'pixi.js'
import { Graphics } from 'pixi.js'

export class Speechbubble extends PIXI.Graphics {
    speechText: PIXI.Text;

    constructor(x: number, y: number, speech: string) {
        super()

        this.lineStyle(2, 0x000000, 1);
        this.beginFill(0xFFFFFF);
        this.drawRect(0, 0, 225, 25)
        this.endFill();

        this.x = x - this.getBounds().width / 2
        this.y = y - this.getBounds().height / 2

        this.speechText = new PIXI.Text(speech, {
            "align": "center",
            "fontFamily": "VT323",
            "fontSize": 15,
        })


        this.speechText.x = this.getBounds().width / 2
        this.speechText.y = this.getBounds().height / 2
        this.speechText.anchor.set(0.5)

        this.addChild(this.speechText)

        this.interactive = true


    }
}