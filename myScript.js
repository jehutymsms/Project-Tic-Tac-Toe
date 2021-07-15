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

        const addDomElements = (array) =>{

            //3x3 Grid
            for(i=0; i < array.length;i++){
                let title = domElementMaker('div', 'block_' + array[i], 'block');
                cacheDom.playArea.append(title);
            }

            // Winner Displays
            for(i=1; i < 3;i++){
                let title = domElementMaker('div', 'player' + i + 'Display', 'playerDisplay');
                cacheDom.playArea.append(title);
            }

            //Insert Reset button inbetween Winner Displays
            let resetButton = domElementMaker('button', 'reset',)
            resetButton.innerHTML = "Reset";
            let player2Display = document.getElementById('player2Display');
            cacheDom.playArea.insertBefore(resetButton, player2Display);

            //Creating Selections for Winner Tags
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

        // // cache DOM elements
        // const cacheDom = (() => {
        //     let popupForm = document.getElementById('popupForm'),
        //     playArea = document.getElementById('play-area')

        //     return{popupForm:popupForm,playArea:playArea} 
        // })()

        // // bind events
        // function bindEvents() {
        //     // DOM.$someElement.click(handleClick);
        // }
        // // handle click events
        // function handleClick(e) {
        //     // render(); etc
        // }
        // // render DOM
        // const render = () => {
        //     // Inserting Round indicator into DOM
        //     cacheDom.container.insertBefore(roundWinnerDisplay, cacheDom.formContainer);


        // }
    }

    const newGameButton = (() => {

        // cache DOM elements
        const cacheDom = (() => {
            let newButton = document.getElementById('new-button'),
            playArea = document.getElementById('play-area');

            return{newButton:newButton, playArea:playArea}
        })()


        // Bind events
        const bindEvents = () =>{
            cacheDom.newButton.addEventListener('click' ,  () => {
                checkforGrid()
            })

            
        }

        // Functions List
        const checkforGrid = () => {
            if (cacheDom.playArea.hasChildNodes()){
                removeGrid();
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
        // formData.render.openForm();
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
            player2Display = document.getElementById('player2Display'),
            formContainer = document.getElementById('formContainer'),
            container = document.getElementById('container')

            return {newButton:newButton ,playArea:playArea ,player1Display:player1Display ,player2Display:player2Display, formContainer:formContainer,container:container}
        })()

        // bind events
        function bindEvents() {
            // DOM.$someElement.click(handleClick);
        }
        // handle click events
        function handleClick(e) {
            // render(); etc
        }
        // render DOM
        const render = () => {
            // Inserting Round indicator into DOM
            cacheDom.container.insertBefore(roundWinnerDisplay, cacheDom.formContainer);


        }
        // DOM Element Creation
        const domElementMaker = (tag ,id="" ,cLass= "") => {
            let item = document.createElement(tag)
            item.id = id;
            item.className= cLass;
            return item;
        }

        //creating Display Round/Winner element
        let roundWinnerDisplay = domElementMaker('h2' , 'round-winnerDisplay', 'round-Winner')
        roundWinnerDisplay.innerHTML= 'Round 1'

        
        // Register Click Events
        // window.onclick = e => {
        //     console.log(e.target.id);
        // } 

        render()
    }

    gameBoardDisplay()

    // formData.render.openForm()
    
    // When new Player button is Clicked:
    // Board is Generated
    // New Player Form is opened:
    // Form needs to have a place to enter a name and a toggle to show a 2nd player name or computer player


})()