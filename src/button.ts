import * as PIXI from "pixi.js"
import { settings } from "pixi.js"
import { UI } from "./ui"

export class Button extends PIXI.Sprite{
    constructor(texture: PIXI.Texture, ui: UI) {
        super(texture)

        this.scale.set(0.03)
        this.interactive = true
        this.on('pointerdown', () => this.onClick())
    }

    onClick(){
        // new settings()
    }
}