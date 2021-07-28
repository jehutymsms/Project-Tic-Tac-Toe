(Tic_Tac_ToeGame = () =>{

    const gameBoardDisplay = (player1 = 'Player 1', playerselection = 'X',player2 = 'Computer', computerselection = 'O') => {

        let selections = {player1:player1, playerselection:playerselection,player2:player2, computerselection:computerselection};
        
        let gameBoardArray = [0,1,2,3,4,5,6,7,8];

        const cacheDom = (() => {
            let popupForm = document.getElementById('popupForm'),
            playArea = document.getElementById('play-area')

            return{popupForm:popupForm,playArea:playArea} 
        })()

        const domElementMaker = (tag ,id="" ,cLass= "") => {
            let item = document.createElement(tag)
            item.id = id;
            item.className= cLass;
            return item;
        }

        // Creation and adding of elements to board
        const addDomElements = (array) =>{

            //3x3 Grid
            for(i=0; i < array.length;i++){
                let block = domElementMaker('div', 'block_' + array[i], 'block');
                cacheDom.playArea.append(block);
            }

            // Player Displays
            for(i=1; i < 3;i++){
                let player = domElementMaker('div', 'player' + i + 'Display', 'playerDisplay');
                cacheDom.playArea.append(player);
            }

            //Insert Reset button inbetween Player Displays
            let resetButton = domElementMaker('button', 'reset','resetMenu')
            resetButton.innerHTML = "Reset";
            resetButton.setAttribute("data-modal-target", "#modal")
            let player2Display = document.getElementById('player2Display');
            cacheDom.playArea.insertBefore(resetButton, player2Display);

            //Creating Text for Player Displays
            let playerSelect = (player, selection) => {
                let playerName = domElementMaker('p');
                let playerselection = domElementMaker('p');
                let score = domElementMaker('p');
                playerName.innerHTML = player;
                playerselection.innerHTML = selection;
                score.innerHTML= 'Score: 0'

                return[playerName,playerselection,score]
            }

            //Inserting player Selections into Winner Tags
            let playerInsertion = (array, id) => {
                let winner = document.getElementById(id);
                for(i=0;i<array.length;i++){
                    winner.append(array[i])
                }
            }

            playerInsertion(playerSelect(selections.player1, selections.playerselection),'player1Display')
            playerInsertion(playerSelect(selections.player2, selections.computerselection),'player2Display')
            
        }

        addDomElements(gameBoardArray)
        return {domElementMaker:domElementMaker};


    }

    const newGameButton = (() => {

        // cache DOM elements
        const cacheDom = (() => {
            let newButton = document.getElementById('new-button'),
            playArea = document.getElementById('play-area'),
            container = document.getElementById('container');

            return{newButton:newButton, playArea:playArea, container:container}
        })()


        // Bind events
        const bindEvents = () =>{
            cacheDom.newButton.addEventListener('click' ,  () => {
                checkforGrid();
            })

            
        }

        // Functions List
        const checkforGrid = () => {
            if (cacheDom.playArea.hasChildNodes()){
                removeGrid();
                removeRoundDisplay();
                formData.render.openForm();
            }else {
                formData.render.openForm();
            }
        }

        const removeGrid =() =>{
            while (cacheDom.playArea.lastChild) {
                cacheDom.playArea.removeChild(cacheDom.playArea.lastChild);
              }
        }
        const removeRoundDisplay =() =>{
            let roundIndicator = document.getElementById('round-winnerDisplay');
            roundIndicator.parentNode.removeChild(roundIndicator);
        }
        
        bindEvents()
    })()

    const formData = (() =>{

          // cache DOM elements
        const cacheDom = (() => {
            let form = document.getElementById('popupForm'), 
            formContainer = document.getElementById('formContainer'),
            formContainer2 = document.getElementById('formContainer2'),
            sumbmitButton = document.getElementById('sumbit-button'),
            playerName = document.getElementById('player1'),
            player2Name = document.getElementById('player2'),
            playerCharSelection = document.getElementById('playerselectX'),
            closeButton = document.getElementById('close-button'),
            computerSelectSwitch = document.getElementById('switch'),
            computerSelection = document.getElementById('playAgainstComp'),
            myFormData = document.getElementById('player1Form')

            return{formContainer:formContainer, sumbmitButton:sumbmitButton, playerName:playerName, playerCharSelection:playerCharSelection, computerSelection:computerSelection, player2Name:player2Name, form:form, closeButton:closeButton, formContainer2:formContainer2,computerSelectSwitch:computerSelectSwitch, myFormData:myFormData} 
        })()

        // bind events
        const bindEvents = () =>{
            cacheDom.closeButton.addEventListener('click', (event) => {
                event.preventDefault();
                render.closeForm();
            })

            cacheDom.sumbmitButton.addEventListener('click', (event) => {
                event.preventDefault();
                processFormData();
                render.closeForm();
            })

            cacheDom.computerSelectSwitch.addEventListener('click', () => {
                computerSelectionCheck()
            })
            
        }

        // Handle Form Submission Data
        function processFormData() {
            data = [];
            if(cacheDom.playerName.value == ""){
                data.push("Player 1");
            }else{
                data.push(cacheDom.playerName.value);
            };

            if(cacheDom.playerCharSelection.checked){
                data.push("X");
            }else{
                data.push("O");
            };

            if(!cacheDom.computerSelection.checked){
                data.push("Computer");
            }else{
                data.push(cacheDom.player2Name.value)
            };

            if(data[1] == "X"){
                data.push("O");
            }else{
                data.push("X");
            };

            render.clearInput();
            render.player2NameClose();
            gameBoardDisplay(...data);
            gameLogic();
            console.log(data)
            return{data:data};
        };    

        // render DOM
        const render = (()=> {
            const openForm = () =>{
                cacheDom.form.style.display = "block";
            }
            const closeForm = () =>{
                cacheDom.form.style.display = "none";
            }
            const player2NameClose = () => {
                cacheDom.formContainer2.style.display = "none";
            }
            const player2NameOpen = () => {
                cacheDom.formContainer2.style.display = "grid";
                cacheDom.player2Name.value = '';
            }
            const clearInput = () => {
                cacheDom.playerName.value = '';
                cacheDom.player2Name.value = '';
                cacheDom.computerSelection.checked = false;
                cacheDom.playerCharSelection.checked;
            }

            return{openForm:openForm, closeForm:closeForm, player2NameOpen:player2NameOpen, player2NameClose:player2NameClose, clearInput:clearInput}
        })()

        const computerSelectionCheck = () =>{
            if (cacheDom.computerSelection.checked){
                render.player2NameOpen();
            }else{
                render.player2NameClose();
            }
        }

        bindEvents()
        return{render:render}


    })()

    const gameLogic = () =>{
        // cache DOM elements
        const cacheDom = (() => {
            let newButton = document.getElementById('new-button'),
            playArea = document.getElementById('play-area'),
            player1Display = document.getElementById('player1Display'),
            player1Name = player1Display.childNodes[0].innerHTML,
            player1Selection = player1Display.childNodes[1].innerHTML,
            player1Score = player1Display.childNodes[2].innerHTML,
            player2Display = document.getElementById('player2Display'),
            player2Name = player2Display.childNodes[0].innerHTML,
            player2Selection = player2Display.childNodes[1].innerHTML,
            player2Score = player2Display.childNodes[2].innerHTML,
            formContainer = document.getElementById('formContainer'),
            container = document.getElementById('container')

            return {newButton:newButton ,playArea:playArea ,player1Display:player1Display ,player1Name:player1Name ,player1Selection:player1Selection, player1Score:player1Score,  player2Display:player2Display,player2Name:player2Name ,player2Selection:player2Selection, player2Score:player2Score, formContainer:formContainer,container:container}
        })()

        // bind events
        function bindEvents() {
            cacheDom.playArea.onclick = (e) => {
                selection(e.target);
            } 
        }

        // DOM Element Creation
        const domElementMaker = (tag ,id="" ,cLass= "") => {
            let item = document.createElement(tag);
            item.id = id;
            item.className= cLass;
            return item;
        }

    
        // Function List
        const changeTurnIndicator = (player = cacheDom.player1Display) =>{
            if (player.classList.length >1){
                render.player2TurnDisplay();
            }else{
                render.player1TurnDisplay();
            }
        }

        const selection = (target) => {
            if(target.className == 'block' && target.innerHTML == ''){
                render.enterSelection(turnIndicator(), target);
            }else if (target.className == 'block'){
                alert(`Selection present please Select another block`)
            }
        }

        const turnIndicator = () => {
            if(player1Display.className.includes('turn')){
                return cacheDom.player1Selection;
            }else{
                return cacheDom.player2Selection;
            }
        }

        const checkWin = ( selection = 'X')=>{
            let gameBoardHTMl = [],
            grid = cacheDom.playArea.childNodes;

            // Extract HTML from Grid Elements
            // Add to grid
            for (i=0; i < grid.length; i++){
                if(grid[i].className == 'block'){
                    gameBoardHTMl.push(grid[i].innerHTML);
                }else{
                    break
                }
            }
            //Function List
            const win = (condition, gridSelection, selection) => {
                let winList = [];
                for(const condi of condition){
                    winList = [];
                    for(const index of condi){
                        if(gridSelection[index] == selection){
                            winList.push(gridSelection[index])
                                if(winList.length == 3){
                                    return 'Win';
                                }
                        }else{
                            winList = [];
                        }
                    }
                }
                return 'Loss'
            }
            const checkVerticalWin = (selection, gridselection)=>{
                let condition = [[0,3,6],[1,4,7],[2,5,8]];
                return win(condition, gridselection, selection);
            }
            const checkhorizontalWin = (selection, gridselection)=>{
                let condition = [[0,1,2],[3,4,5],[6,7,8]];
                return win(condition, gridselection, selection);
            }
            const checkDiagonalWin = (selection, gridselection)=>{
                let condition = [[0,4,8],[2,4,6]];
                return win(condition, gridselection, selection);
            }
            // Win checker Statements
            if(checkVerticalWin(selection,gameBoardHTMl) == 'Win'){
                return "Win";
            }else if(checkhorizontalWin(selection,gameBoardHTMl) == 'Win'){
                return "Win";
            }else if (checkDiagonalWin(selection,gameBoardHTMl) == 'Win'){
                return "Win";
            }else{
                return "Loss";
            }

            
        }

        const gameProgress = () =>{
            bindEvents();
            changeTurnIndicator();

            //Observe Changes made on the Gameboard
            let observer = new MutationObserver(mutations => {
                if(mutations[0].addedNodes[0]== undefined){
                    observer.disconnect();
                }else{
                    if (checkWin(mutations[0].addedNodes[0].textContent) == 'Win'){
                        if(cacheDom.player1Selection == mutations[0].addedNodes[0].textContent){
                            observer.disconnect();
                            alert(`${cacheDom.player1Name} Won!!!!`)
                        }else{
                            observer.disconnect();
                            alert(`${cacheDom.player2Name} Won!!!!`)
                        }
                    }else if(boardFull.check()=='Good'){
                        changeTurnIndicator();
                        console.log(mutations[0].addedNodes[0].textContent)
                    }else{
                        alert(boardFull.check());
                    }
                }
                });

            // observe if HTML is added to grid
            observer.observe(cacheDom.playArea, {
            childList: true,
            subtree: true 
            });

        }

        const boardFull = (() =>{
            let board = [];

            const check = () =>{
                if (board.length == 9){
                    observer.disconnect();
                    return 'Board Full Resetting'
                }else{
                    return 'Good'
                }
            };

            // 
            let observer = new MutationObserver(mutations => {
                if(mutations[0].addedNodes[0]== undefined){
                    observer.disconnect();
                }else{
                    board.push(mutations[0].addedNodes[0].textContent)
                }
                
                });

            observer.observe(cacheDom.playArea, {
                childList: true,
                subtree: true 
            });

            
            return {check:check}
        })()

        // render DOM
        const render = (() => {

            // creating Display Round Indicator element
            let roundWinnerDisplay = domElementMaker('h2' ,     'round-winnerDisplay', 'round-Winner')
            roundWinnerDisplay.innerHTML= 'Round 1';

            // Inserting Round indicator into DOM
            cacheDom.container.insertBefore(roundWinnerDisplay, cacheDom.formContainer);

            const enterSelection = (selection, id) => {
                id.innerHTML = selection;
            }

            const player1TurnDisplay = () =>{
                player1Display.classList.add('turn');
                player2Display.classList.remove('turn');
            }

            const player2TurnDisplay = () =>{
                player1Display.classList.remove('turn');
                player2Display.classList.add('turn');
            }

            const roundUpdate = (round) =>{
                roundWinnerDisplay.innerHTML = `Round ${round}`;
            }
            const winnerDisplayUpdate = (string) =>{
                roundWinnerDisplay.innerHTML = string;
            }

            // Test Child Node function
            // Can Get Child nodes as an array of objects
            // Then Select inner HTML are strings
            // Use these to set up an array for keeping track of score and who's turn it is
            // let array = cacheDom.player1Display.childNodes
            // console.log(typeof(array[0].innerHTML))
            // const roundIndicatorUpdate = (string) =>{}

                
            return{enterSelection:enterSelection, player1TurnDisplay:player1TurnDisplay, player2TurnDisplay:player2TurnDisplay, roundUpdate:roundUpdate, winnerDisplayUpdate:winnerDisplayUpdate}

        }) ()
        gameProgress()
        
        return {gameProgress:gameProgress}
    }

    const resetGameButton = () => {
        // cache DOM elements
        const cacheDom = (() =>{
        let resetButton = document.getElementById('reset'),
            playArea = document.getElementById('play-area'),
            block = document.querySelectorAll('.block'),
            openModalButton = document.querySelector('[data-modal-target]'),
            closeModalButton = document.querySelector('[data-close-button]'), resetBoard = document.getElementById('resetBoard'),restartGame = document.getElementById('restartGame'),
            overlay = document.getElementById('overlay'),
            openModalData = document.querySelector(openModalButton.dataset.modalTarget),
            closeModalTargets = closeModalButton.closest('.modal');

            return{resetButton:resetButton,playArea:playArea,block:block,openModalButton:openModalButton,closeModalButton:closeModalButton,resetBoard:resetBoard,restartGame:restartGame,overlay:overlay,openModalData:openModalData,closeModalTargets:closeModalTargets}
        })()

        // bind events
        const bindEvents = (() =>{
            cacheDom.openModalButton.addEventListener('click', ()=> {
                openModal(cacheDom.openModalData);
            })

            cacheDom.overlay.addEventListener('click', ()=> {
                const modals = document.querySelectorAll('.modal.active')
                modals.forEach(modal =>{
                    closeModal(modal);
                })  
            })

            cacheDom.closeModalButton.addEventListener('click', ()=> {
                closeModal(cacheDom.closeModalTargets);
            })

            cacheDom.resetBoard.addEventListener('click' , ()=>{
                closeModal(cacheDom.closeModalTargets);
                boardClear();

            })

        })()

        // render DOM
        const render = (() =>{

            const modalShow = (modal) =>{
                modal.classList.add('active');
            }
            const modalHide = (modal) =>{
                modal.classList.remove('active');
            }
            const overlayShow = () =>{
                cacheDom.overlay.classList.add('active');
            }
            const overlayHide = () =>{
                cacheDom.overlay.classList.remove('active');
            }
            const clearHTML = (element) =>{
                element.innerHTML = ""
            }


            return{modalShow:modalShow,modalHide:modalHide,overlayShow:overlayShow,overlayHide:overlayHide,clearHTML:clearHTML}
        })()

        // Function List
        const openModal = (modal)=>{
            if(modal ==null) return
            render.modalShow(modal);
            render.overlayShow();
        }

        const closeModal = (modal)=>{
            if(modal ==null) return
            render.modalHide(modal);
            render.overlayHide();
        }

        const boardClear = () =>{
            cacheDom.block.forEach(element => {
                render.clearHTML(element);
            })
            
        }
    }

    gameBoardDisplay()
    gameLogic()
    resetGameButton()

})()