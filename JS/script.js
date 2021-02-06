function countWords() {
    const TRANSCRIPTINPUT = document.querySelector(".input-container #transcript").value;

    var transcriptSplit = TRANSCRIPTINPUT.split(/\s+/);

    loopThroughTranscript(transcriptSplit);
}

function wordsToIgnore() {
    const TEXTBOX = document.querySelector(".words-to-remove-modal textarea").value;
    return TEXTBOX.split(/\s+/);
}

function loopThroughTranscript(transcriptArray){
    var resultArray = [];

    for (let i=0; i< transcriptArray.length; i++){
        var wordExists = false;
        var transcriptWord = {
                                word: modifyWord(transcriptArray[i]),
                                count: 1
                             };

        if (wordsToIgnore().includes(transcriptWord.word)){
            continue;
        }
        
        if ( transcriptWord.word == "" || transcriptWord.word == " " ){
            continue;
        }
        
        if (resultArray.length > 0 ) {                    
            for (let i=0; i < resultArray.length ; i++) {
                if ( transcriptWord.word == resultArray[i].word) {
                    wordExists = true;
                    resultArray[i].count++;
                } else {
                }
            }

            if (!wordExists) {
                resultArray.push(transcriptWord);
            }

        } else {
            resultArray.push(transcriptWord);
        }
    }
    createResultsTable(resultArray);
}

function createResultsTable(resultArray){
    clearTable(false);

    const RESULTTABLE = document.querySelector(".results-output #results-table");
    const MINCOUNT = document.querySelector(".details-to-ignore #minimum-count").value;

    //create a table row containing data for each item in result array
    for (let i = 0; i < resultArray.length; i++){
        if (resultArray[i].count < MINCOUNT){
            continue;
        }
        var tableRow = document.createElement("tr");
        tableRow.setAttribute("class","word-count-result");
        
        var wordField = document.createElement("td");
        wordField.setAttribute("class","result-word");
        var wordText = document.createTextNode(resultArray[i].word);
        wordField.appendChild(wordText);
        
        var countField = document.createElement("td");
        countField.setAttribute("class","result-count");
        var countText = document.createTextNode(resultArray[i].count);
        countField.appendChild(countText);
        
        tableRow.appendChild(wordField);
        tableRow.appendChild(countField);
        RESULTTABLE.appendChild(tableRow);
    }

    sortTable();
}

function clearTable(clearTranscript){
    var existingTableRows = document.querySelectorAll("#results-table tr");
    for (let i = 0; i < existingTableRows.length; i++){
        var id = existingTableRows[i].getAttribute("id");

        if (id != "heading-row"){
            var parentElement = existingTableRows[i].parentElement;
            parentElement.removeChild(existingTableRows[i]);
        }
    }

    if (clearTranscript){
        document.querySelector(".input-container #transcript").value = "";
        document.querySelector(".input-container #transcript").focus();
    }
}

function sortTable() {
    const TABLEROWS = document.querySelectorAll(".word-count-result");

    var keepSorting = true;
    var loopCount = 0; 
    while (keepSorting) {
        console.log(++loopCount);

        var changeMade = false;
        for (let i=0; i< TABLEROWS.length; i++){
            if (i < (TABLEROWS.length -1)){

            //check if selected row occurs less than the row after it
            var selectedRowWord = TABLEROWS[i].childNodes[0].innerHTML;
            var selectedRowCount = TABLEROWS[i].childNodes[1].innerHTML;
            var nextRowWord = TABLEROWS[i+1].childNodes[0].innerHTML;
            var nextRowCount = TABLEROWS[i+1].childNodes[1].innerHTML;
            
            if (selectedRowCount < nextRowCount) {
                changeMade = true;
                TABLEROWS[i].childNodes[0].innerHTML = nextRowWord;
                TABLEROWS[i].childNodes[1].innerHTML = nextRowCount;
                TABLEROWS[i+1].childNodes[0].innerHTML = selectedRowWord;
                TABLEROWS[i+1].childNodes[1].innerHTML = selectedRowCount;
            }

            }
        }
        changeMade ? keepSorting = true : keepSorting = false;
    }

}

function modifyWord(word) {
    var removeSymbols = document.querySelector(".details-to-ignore #symbols").checked;
    var word = word.toLowerCase();

    if (removeSymbols){
        word = word.replace(/[^a-zA-Z ]/g,'');
    }
    return word;
}

function showCustomWordsModal(){
    document.querySelector(".words-to-remove-modal-background").style.display = "flex";
}

function hideCustomWordsModal(){
    document.querySelector(".words-to-remove-modal-background").style.display = "none";
}

document.querySelector(".input-container #transcript").focus();

document.querySelector(".results-output #clear-results").addEventListener("click",function(){clearTable(true)},false);