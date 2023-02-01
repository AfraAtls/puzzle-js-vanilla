import { init } from "./init.js"
import { verification } from "./verification.js"
export const game = {

    listeners : () => {
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('dragstart', game.dragStart)
            img.addEventListener('dragover', game.dragOver)
            img.addEventListener('drop', game.dragDrop)
            img.addEventListener('dragend', game.dragEnd)
        })
        document.getElementById('rules').addEventListener('mouseover', init.displayRules)
        document.getElementById('rules').addEventListener('mouseout', init.HideRules)
        document.getElementById('cheat').addEventListener('click', game.cheat)
    },

    /**
     * Détermine la "blank card" sur laquelle les autres cards pourront être glissées
     */
    setBlankCard: () => {
        const blank = init.getCards().find(img => img.src.includes('img/7.jpg'))
        app.blankCard = {x: parseInt(blank.dataset.x), y:parseInt(blank.dataset.y)}
    },

    /**
     * Mélange aléatoirement les cards et vérifie quel'unicité de chaque valeur tirée
     */
    MixCards: () => {
        const tempArray = [];
        init.imgOrder.map(() => {
            let random = game.getRandom()
            while(tempArray.includes(random)) {
                random = game.getRandom()
            }
            tempArray.push(random)
        });
        init.imgOrder = tempArray;
    },

    /**
     * Génère une nombre aléatoire
     */
    getRandom : () => {
        return Math.floor(Math.random() * (init.imgOrder.length) + 1);
    },

    /**
     * Définit la propriété `currentCard`
     * @param {*} event
     * @returns
     */
    dragStart : (event) => {
        if(init.gameOver) return
        init.currentCard = event.target
    },

    dragOver : (event) => {
        event.preventDefault()
    },

    /**
     * Définit la propriété `otherCard`
     * @param {*} event
     */
    dragDrop : (event) => {
        init.otherCard = event.target
    },

    /**
     * Gére la fin de déplacement d'une carte
     * @param {*} event
     */
    dragEnd : (event) => {
        if(init.otherCard.src.includes('7.jpg') && !init.gameOver) {
            if(verification.checkMoves(event.target)) {
                game.switchSrc(event.target)
                game.switchId(event.target)
                game.incrementTurns()
                verification.checkWin()
            }
        }
        init.blankCard = {x: parseInt(init.otherCard.dataset.x), y: parseInt(init.otherCard.dataset.y)}
    },

    /**
     * Incrémente le nombre de tours
     */
    incrementTurns : () => {
        document.getElementById('turns').innerText = ++init.turns
    },

    /**
     * Echange les propriétés `src` de l'élément courant avec ceux de de l'élément cible
     * @param {*} currentCard
     */
    switchSrc : (currentCard) => {
        const currImg = currentCard.src
        const otherImg = init.otherCard.src
        currentCard.src = otherImg
        init.otherCard.src = currImg
    },

    /**
    * Echange les propriétés `id` de l'élément courant avec ceux de l'élément cible
    * @param {HTMLElement} currentCard - L'élément cible de l'événement.
    */
    switchId : (currentCard) => {
        const tempId = currentCard.id;
        currentCard.id = init.otherCard.id
        init.otherCard.id = tempId
    },
/**
    * Replace les images dans le bon ordre en modifiant les sources à partir du winningPattern
    */
    cheat : () => {
            if (!init.gameOver) {
                let cards = [...init.winningPattern.reverse()]
                let imgs = document.querySelectorAll('.parts')
                imgs.forEach((img, index) => {
                    img.src = `assets/img/parts/${cards[index]}.jpg`
                    img.id = `${cards[index]}`
                })
                verification.checkWin()
            }
        },
}
