import { init } from './init.js';
export const verification = {
   /**
    * Vérifie si un déplacement est valide en comparant les coordonnées de la carte actuelle et de la carte cible.
    * @param {*} currentPos la position courante
    * @returns
    */
    checkMoves : (currentPos) => {
        const currentCoords = {x:parseInt(currentPos.dataset.x), y: parseInt(currentPos.dataset.y)} // point de départ
        const otherCoords = {x:parseInt(init.otherCard.dataset.x), y: parseInt(init.otherCard.dataset.y)} // point d'arrivé
        const moveLeft = currentCoords.x === otherCoords.x && currentCoords.y === otherCoords.y -1
        const moveRight = currentCoords.x === otherCoords.x && currentCoords.y === otherCoords.y +1
        const moveTop = currentCoords.x === otherCoords.x + 1 && currentCoords.y === otherCoords.y
        const moveDown = currentCoords.x === otherCoords.x -1 && currentCoords.y === otherCoords.y
        return moveLeft || moveRight || moveTop || moveDown
    },

    /**
     * Vérifie si l'utilisateur a gégné en comparant l'ordre les cartes actuelles avec l'ordre attendu.
     */
    checkWin : () => {
        const cards = []
        init.getCards().forEach(card => cards.push(card.id))

        if (cards.join('') === init.winningPattern.join('')) {
            init.gameOver= true
            const jsConfetti = new JSConfetti()
            jsConfetti.addConfetti({
                confettiColors: [
                  '#ec1e0b', '#79c91d', '#df390f', '#fdbe1f', '#640200', '#c1d684',
                ],
              })
        }

    }
}