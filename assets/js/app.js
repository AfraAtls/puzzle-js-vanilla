import { init } from './modules/init.js';
import { game } from './modules/game.js';

const app = {

    init : () => {
        game.MixCards()
        init.drawBoard()
        game.listeners()
    },
}
document.addEventListener('DOMContentLoaded', app.init)
