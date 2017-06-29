namespace DatabaseClient {
    window.addEventListener("load", init);

    function init(_event: Event): void {
        console.log("Init");
        let insertButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("insert");
        let refreshButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("refresh");
        insertButton.addEventListener("click", insert);
        refreshButton.addEventListener("click", refresh);
    }

    function insert(_event: Event): void {
        let inputs: NodeListOf<HTMLInputElement> = document.getElementsByTagName("input");
        let query: string = "command=insert"; //
        query += "&name=" + inputs[0].value; 
        query += "&firstname=" + inputs[1].value;
        query += "&matrikel=" + inputs[2].value;
        console.log(query);
        sendRequest(query, handleInsertResponse);
    }
    
    function insertSingle (_event: Event):void{
            
    
    }

    function refresh(_event: Event): void {
        let query: string = "command=find";  
        sendRequest(query, handleFindResponse);
    }

    //nimmt query entgegen und callback (Funktion kann auch EventListener sein: handleInsert?)
    function sendRequest(_query: string, _callback: EventListener): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8100?" + _query, true); //methode get wird verwendet; true-> asynchron = wartet nach send nicht ab sondern arbeitet weiter 
        //xhr.open("GET", "https://eia2-servertest.herokuapp.com?color=" + _color, true);
        xhr.addEventListener("readystatechange", _callback); //bei Serveränderung wird geguckt ob etwas angekommen ist
        xhr.send();
    }

    // wird bei Veränderung aufgerufen nimmt ProgressEvent entgegen und gibt antwort aus, wenn der Prozess abgeschlossen ist
    function handleInsertResponse(_event: ProgressEvent): void {
        let xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
        if (xhr.readyState == XMLHttpRequest.DONE) {
            alert(xhr.response);
        }
    }

    
    //bei refresh
    function handleFindResponse(_event: ProgressEvent): void {
        let xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
        if (xhr.readyState == XMLHttpRequest.DONE) {
            let output: HTMLTextAreaElement = document.getElementsByTagName("textarea")[0];
            output.value = xhr.response;
            let responseAsJson: JSON = JSON.parse(xhr.response);
            console.log(responseAsJson);
        }
    }
}