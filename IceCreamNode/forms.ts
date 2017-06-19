namespace Form {
    window.addEventListener("load", init);

    let flavors: string[] = ["Chocolate", "Strawberry", "Vanilla", "Cinnamon", "Lemon", "Stracciatella", "Walnut"];
    let toppings: string[] = ["Chocolate Chips", "Strawberries", "Maple Syrup", "Whipped Cream", "Grated Coconut", "Vanilla Sauce", "Rainbow Sprinkles"];
    let containers: string[] = ["Waffle Cone", "Cup"];
    let scoopNumber: number = 0;
    let numberFields: HTMLInputElement[] = [];
//    let toppingInputs: HTMLInputElement[] = [];
//    let selectBoxes: HTMLSelectElement[] = [];
    let toppingCheckboxes: HTMLInputElement[] = [];
    let toppingNumber: number = 0;
    

    function init(_event: Event): void {
        console.log("Init");
        let fieldsets: NodeListOf<HTMLFieldSetElement> = document.getElementsByTagName("fieldset");

        //EventListener an fieldsets
        for (let i: number = 0; i < fieldsets.length; i++) {
            let fieldset: HTMLFieldSetElement = fieldsets[i];
            fieldset.addEventListener("change", handleChange);
        }
        document.getElementById("container").innerText = containers[0];
        document.getElementById("check").addEventListener("click", handleChange);
        createContainerField();

        //2.Version
        createFlavorField();
        createToppingField();
    };


    //    function calculatePrice(): void {
    //        let toppingPrice: number = toppingInputs.length * 0.4;
    //        let sum: number = scoopNumber * scoopPrice + toppingPrice;
    //
    //        document.getElementById("total").textContent = "" + (sum.toFixed(2)) + "€";
    //        console.log("Kugeln: " + scoopNumber + "|Kugelpreis: " + scoopPrice + "|toppinganzahl:" + toppingInputs.length + "|toppingPrice:" + toppiic
    //
    //    }


    //2.Version
    function calculatePrice(): void {
        let scoopPrice: number = 1;
        let toppingPrice: number = toppingNumber * 0.4;
        let sum: number = scoopNumber * scoopPrice + toppingPrice;

        document.getElementById("total").textContent = "" + (sum.toFixed(2)) + "€";
        console.log("Kugeln: " + scoopNumber + "|Kugelpreis: " + scoopPrice + "|toppinganzahl:" +  "|toppingPrice:" + toppingPrice);

    }

    function handleChange(_event: Event): void {
        //console.log(_event);
        //*/
        let target: HTMLInputElement = <HTMLInputElement>_event.target;
        console.log("Changed " + target.name + " to " + target.value);

        //*/
        //*/ note: this == _event.currentTarget in an event-handler

        if (this.id == "radio") {


        }

        if (this.id == "check") {
            let addressField: HTMLElement = document.getElementById("address");
            let inputFields: NodeListOf<HTMLInputElement> = addressField.getElementsByTagName("input");
            for (let i: number = 0; i < inputFields.length; i++) {
                let image: HTMLImageElement = <HTMLImageElement>document.getElementById("checkImg");

                if (inputFields[i].checkValidity() == false) {
                    image.src = "wrong.png";
                    console.log("false");
                    image.style.display = "inline";
                    inputFields[i].style.backgroundColor = "#fe8181";
                } else {
                    image.src = "checked.png";
                    console.log("true");
                    image.style.display = "inline";
                    inputFields[i].style.backgroundColor = "#c0c0c0";
                }
            }
        }

        //        if (this.className == "selectBox") {
        //            let flavorInputs: string[] = [];
        //            flavorInputs.push(this.value);
        //            console.log(flavorInputs); //console zeigt richtige Auswahl der Sorten an
        //
        //
        //            let flavorOutput: HTMLElement = document.getElementById("flavorOutput");
        //            for (let i: number = 0; i < flavorInputs.length; i++) {
        //
        //                flavorOutput.innerText += flavorInputs[i]; //hängt immer Array an. Wenn nur +, werden jedoch auch Eingaben aus neuen fieldsets überschrieben        }
        //            
        //            
        //            
        //        }


        //2.Version
        if (this.className == "flavorField") {
            scoopNumber = 0;
            let outputField = document.getElementById("flavorOutput");
            outputField.innerText = "";
            for (let i: number = 0; i < numberFields.length; i++) {
                let valueString: string = numberFields[i].value;
                scoopNumber += parseInt(valueString);

                if (parseInt(numberFields[i].value) > 0) {
                    outputField.innerHTML += numberFields[i].id + ": " + numberFields[i].value + "<br>";
                }
            }
            calculatePrice();
        }


        //        if (this.id == "toppings") {
        console.log("Changed " + target.name + " to " + target.value);
        let toppingOutput = document.getElementById("topping");
        let toppingField = document.getElementById("toppings");
        toppingOutput.innerText = "";
        let toppingCheckboxes = toppingField.getElementsByTagName("input");
        toppingNumber = 0;

        console.log(toppingCheckboxes);

        for (let i: number = 0; i < toppingCheckboxes.length; i++) {
            if (toppingCheckboxes[i].checked == true) {
                toppingOutput.innerHTML += toppingCheckboxes[i].value + "<br>";
                toppingCheckboxes[i].disabled = false;
                toppingNumber++;
            }

            if (toppingCheckboxes[i].checked == false) {
                if (toppingNumber >= scoopNumber) {
                    toppingCheckboxes[i].disabled = true;
                } else {
                    toppingCheckboxes[i].disabled = false;
                }
            }

            //            }
            calculatePrice();
        }

        //        if (this.className == "numberInput") {
        //            for (let i: number = 0; i < numberFields.length; i++) {
        //                let valueString: string = numberFields[i].value;
        //                scoopNumber = parseInt(valueString);
        //                calculatePrice();
        //            }
        //        }

        if (this.name == "containerChoice") {
            
            document.getElementById("container").innerText = target.value;
        }
           
        
    }
    //    function createContainerField(): void {
    //        let containerField = document.createElement("fieldset");
    //        containerField.id = "radio";
    //        let mainDiv = document.getElementById("main");
    //        mainDiv.appendChild(containerField);
    //
    //        //Legende für containerField
    //        let legend = document.createElement("legend");
    //        legend.innerText = "Cone or Cup?";
    //        containerField.appendChild(legend);
    //
    //        //Behälter-Optionen für Array-Einträge
    //        for (let i: number = 0; i < containers.length; i++) {
    //            let container:HTMLInputElement = <HTMLInputElement>document.createElement("input");
    //            container.type = "radio";
    //            container.value = containers[i];
    //
    //            container.name = "containerChoice"
    //            container.id = "radio" + i + 1;
    //            containerField.appendChild(container);
    //
    //            //Labels für Behälterauswahl
    //            let containerLabel = document.createElement("label");
    //            containerLabel.textContent = containers[i];
    //            containerLabel.htmlFor = "radio" + i + 1;
    //            containerField.appendChild(containerLabel);
    //            container.addEventListener("change", handleChange);//listener an Auswahl
    //        }
    //            
    //        //scoopButton erstellen
    //        let scoopButton = document.createElement("button");
    //        scoopButton.type = "button";
    //        scoopButton.name = "ScoopButton";
    //        scoopButton.className = "addScoop";
    //        scoopButton.innerText = "Add Scoop";
    //        containerField.appendChild(scoopButton);
    //
    //        addListenerToScoopButton();
    //    }

    //Version ohne dynamischen Aufbau über add-Buttons
    function createContainerField(): void {
        let containerField = document.createElement("fieldset");
        containerField.id = "radio";
        let mainDiv = document.getElementById("main");
        mainDiv.appendChild(containerField);

        //Legende für containerField
        let legend = document.createElement("legend");
        legend.innerText = "Cone or Cup?";
        containerField.appendChild(legend);
        let containerCheckboxes: HTMLInputElement[] = [];

        //Behälter-Optionen für Array-Einträge
        for (let i: number = 0; i < containers.length; i++) {
            let container: HTMLInputElement = <HTMLInputElement>document.createElement("input");
            container.type = "radio";
            container.value = containers[i];
            container.name = "containerChoice"
            container.id = "radio" + i + 1;
            containerField.appendChild(container);
            
            containerCheckboxes.push(container);
            containerCheckboxes[0].checked = true;



            //Labels für Behälterauswahl
            let containerLabel = document.createElement("label");
            containerLabel.textContent = containers[i];
            containerLabel.htmlFor = "radio" + i + 1;
            containerField.appendChild(containerLabel);
            container.addEventListener("change", handleChange);//listener an Auswahl
        }
    }


    //    function createFlavorField(): void {
    //        //flavorField erstellen
    //
    //        let flavorField = document.createElement("fieldset");
    //        flavorField.className = "flavorField";
    //        let mainDiv = document.getElementById("main");
    //        mainDiv.appendChild(flavorField);
    //
    //        //Legende
    //        let legend = document.createElement("legend");
    //        legend.innerText = "Choose Your Flavors";
    //        flavorField.appendChild(legend);
    //
    //        //Select-Form
    //        let selectBox = document.createElement("select");
    //        selectBox.name = "Select";
    //
    //        selectBox.className = "selectBox";
    //        flavorField.appendChild(selectBox);
    //
    //
    //        //Optionen für Array-Einträge
    //        for (let i: number = 0; i < flavors.length; i++) {
    //            let flavor = document.createElement("option");
    //            flavor.value = flavors[i];
    //            flavor.className = "flavorOptions";
    //            flavor.text = flavors[i];
    //            selectBox.appendChild(flavor);
    //        }
    //        selectBoxes.push(selectBox);
    //
    //        //Number-Feld für Eiskugel-Anzahl
    //        let numberInput = document.createElement("input");
    //        numberInput.type = "number";
    //        numberInput.className = "numberInput";
    //        numberInput.name = "numberInput";
    //        numberInput.step = "1";
    //        numberInput.min = "1";
    //        numberInput.max = "5";
    //        numberInput.value = "0";
    //        flavorField.appendChild(numberInput);
    //        numberFields.push(numberInput);
    //
    //        //toppingButton erstellen
    //        let toppingButton = document.createElement("button");
    //        toppingButton.type = "button";
    //        toppingButton.name = "ToppingButton";
    //        toppingButton.className = "addTopping";
    //        toppingButton.innerText = "Add Topping";
    //        flavorField.appendChild(toppingButton);
    //
    //        //EventListenser an toppingButtons
    //        let toppingButtons: NodeListOf<Element> = document.getElementsByClassName("addTopping");
    //        for (let i: number = 0; i < toppingButtons.length; i++) {
    //            let toppingButton = toppingButtons[i];
    //            toppingButton.addEventListener("click", createToppingField);
    //        }
    //    //        selectBox.addEventListener("change", handleChange);//eventListener an flavorSelect-Feld
    //        numberInput.addEventListener("change", handleChange);//eventListener an scoopNumber-Feld
    //
    //    }//createFlavorFiel   
    //Version ohne dynamischen Aufbau über add-Buttons
    function createFlavorField(): void {
        //flavorField erstellen

        let flavorField = document.createElement("fieldset");
        flavorField.className = "flavorField";
        let mainDiv = document.getElementById("main");
        mainDiv.appendChild(flavorField);

        //Legende
        let legend = document.createElement("legend");
        legend.innerText = "Choose Your Flavors";
        flavorField.appendChild(legend);

        //Optionen für Array-Einträge
        for (let i: number = 0; i < flavors.length; i++) {

            //Number-Feld für Eiskugel-Anzahl
            let numberInput = document.createElement("input");
            numberInput.type = "number";
            numberInput.id = flavors[i];
            numberInput.name = "numberInput";
            numberInput.step = "1";
            numberInput.min = "1";
            numberInput.max = "5";
            numberInput.value = "0";
            numberInput.style.display = "inline";
            flavorField.appendChild(numberInput);
            numberFields.push(numberInput);



            let nrLabel = document.createElement("label");
            nrLabel.textContent = flavors[i];
            nrLabel.htmlFor = numberInput.id;
            flavorField.appendChild(nrLabel);
            nrLabel.addEventListener("change", handleChange);


            flavorField.addEventListener("change", handleChange);//eventListener an flavorSelect-Feld
            numberInput.addEventListener("change", handleChange);//eventListener an scoopNumber-Feld

        }//createFlavorField
    }

    //    function createToppingField(): void {
    //
    //        //toppingField erstellen
    //        let toppingField = document.createElement("fieldset");
    //        toppingField.id = "toppings";
    //        let mainDiv = document.getElementById("main");
    //        mainDiv.appendChild(toppingField);
    //
    //        //Legende
    //        let legend = document.createElement("legend");
    //        legend.innerText = "Add Your Toppings";
    //        toppingField.appendChild(legend);
    //
    //        //checkbox für Array-Einträge
    //        for (let i: number = 0; i < toppings.length; i++) {
    //            let topping = document.createElement("input");
    //            topping.type = "checkbox";
    //            topping.value = toppings[i];
    //            topping.name = "toppingCheckbox";
    //            topping.id = "Checkbox" + i;
    //            toppingField.appendChild(topping);
    //
    //
    //            //Label für checkboxen
    //            let toppingLabel = document.createElement("label");
    //            toppingLabel.textContent = toppings[i];
    //            toppingLabel.htmlFor = topping.id;
    //            toppingField.appendChild(toppingLabel);
    //            topping.addEventListener("change", handleChange);
    //        }
    //
    //        //scoopButton
    //        let scoopButton = document.createElement("button");
    //        scoopButton.type = "button";
    //        scoopButton.name = "ScoopButton";
    //        scoopButton.className = "addScoop";
    //        scoopButton.innerText = "Add Scoop";
    //        toppingField.appendChild(scoopButton);
    //
    //        addListenerToScoopButton();
    //    }
    //
    //    function addListenerToScoopButton(): void {
    //        let scoopButtons: NodeListOf<Element> = document.getElementsByClassName("addScoop");
    //
    //        for (let i: number; i < scoopButtons.length; i++) {
    //            let scoopButton = scoopButtons[i];
    //            scoopButton.addEventListener("click", createFlavorField);
    //        }
    //    }

    //Version ohne dynamischen Aufbau über add-Buttons
    function createToppingField(): void {

        //toppingField erstellen
        let toppingField = document.createElement("fieldset");
        toppingField.id = "toppings";
        let mainDiv = document.getElementById("main");
        mainDiv.appendChild(toppingField);

        //Legende
        let legend = document.createElement("legend");
        legend.innerText = "Add Your Toppings";
        toppingField.appendChild(legend);
        toppingField.addEventListener("change", handleChange);

        //checkbox für Array-Einträge
        for (let i: number = 0; i < toppings.length; i++) {
            let topping = document.createElement("input");
            topping.type = "checkbox";
            topping.value = toppings[i];
            topping.name = "toppingCheckbox";
            topping.id = "Checkbox" + i;
            toppingField.appendChild(topping);
            toppingCheckboxes.push(topping);


            //Label für checkboxen
            let toppingLabel = document.createElement("label");
            toppingLabel.textContent = toppings[i];
            toppingLabel.htmlFor = topping.id;
            toppingField.appendChild(toppingLabel);
        }
    }



} //namespace