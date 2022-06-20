import * as PIXI from 'pixi.js'
import { Game } from './game'
import { Button } from './button'

export class UI extends PIXI.Container{
    private game: Game
    private timeMachine: PIXI.Text
    private settings: Button

    constructor(game: Game){
        super()
        this.game = game
        const style = new PIXI.TextStyle({
            fontFamily: 'ArcadeFont',
            fontSize: 45,
            fontWeight: 'bold',
            fill: ['#000000']
        })

        this.timeMachine = new PIXI.Text(`3 onderdelen`, style)
        this.addChild(this.timeMachine)
        this.timeMachine.x = 100
        this.timeMachine.y = 10

        this.settings = new Button(this.game.loader.resources["settingsTexture"].texture!, this)  
        this.game.pixi.stage.addChild(this.settings)
        this.settings.x = 10
        this.settings.y = 10

    }
}