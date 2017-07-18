
// GRIMT MEN TODO
// globale variable
var global_tableId = "table_exercises_1";
var global_opgavefunktionen = null;
var global_testfunktionen = null;

	function mysetup(containerid, opgavefunktion, testfunktion){
		
		var container = document.getElementById(containerid);
		create_table(container);
		global_opgavefunktionen =opgavefunktion;
		global_testfunktionen= testfunktion;
		generate_new_exercise();
	}
	
	function create_table(container){
		
		var table = document.createElement("table");
		table.setAttribute("id", global_tableId);
		var row = table.insertRow(0);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		
		cell1.innerHTML = "opgave";
		cell2.innerHTML = "-";
		cell3.innerHTML = "Løsning";
		cell4.innerHTML = "korrekt?";
		
		container.appendChild(table);
	}
	
	
	function test_and_new_exercise(e){
		
		var thecaller = e.getAttribute("countid");
		var tries = parseInt(e.getAttribute("tries"));
		tries = tries + 1;
		e.setAttribute("tries", tries);
		
		var resultat = e.getAttribute("resultattystys");
		var svar = document.getElementById("result_"+thecaller).value;
		
		var korrektfelt = document.getElementById("korrekt_"+thecaller);
		
		// test hvis rigtigt
		if (global_testfunktionen(svar, resultat, null)){
			//korrekt
			korrektfelt.innerHTML = "Korrekt: Forsoeg: "+tries + " Svar: "+resultat;
			korrektfelt.setAttribute("style", "background-color:green;");
			korrektfelt.setAttribute("solved", true);
			generate_new_exercise();
			e.disabled = true;
			
			// hvis mange rigtige næste type opgaver.
			if (thecaller >= 3){
				
				var t1 = document.getElementById("korrekt_"+thecaller).getAttribute("solved");
				var t2 = document.getElementById("korrekt_"+(thecaller-1)).getAttribute("solved");
				var t3 = document.getElementById("korrekt_"+(thecaller-2)).getAttribute("solved");
				
				var t1b = (t1 === 'true');
				var t2b = (t2 === 'true');
				var t3b = (t3 === 'true');
				
				if (t1b && t2b && t3b){
					alert("klaret tre i træk");
				}
			}
				
		} else {
			//forkert
			
			korrektfelt.innerHTML = "Forkert: Forsoeg: "+tries;
			korrektfelt.setAttribute("style", "background-color:red;");
			// hvis mange forkerte forsøg ny opgave og marker som ikke løst.
			if (tries > 1){
				korrektfelt.innerHTML = "IKKE løst. Forsøg: "+tries + "Svar: "+resultat;
				generate_new_exercise();
				e.disabled = true;
			}
		}
						
	}
	
	function generate_new_exercise(){
		var table = document.getElementById(global_tableId);
		
		var no_of_rows = document.getElementById(global_tableId).getElementsByTagName("tr").length;

		// Create an empty <tr> element and add it to the 1st position of the table:
		var row = table.insertRow(no_of_rows);
		row.setAttribute("id", "row"+no_of_rows);
		
		// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
		var cell1 = row.insertCell(0);
		cell1.setAttribute('id', 'opg_'+no_of_rows);
		
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		
		var txt1 = document.createTextNode("x=");
		var input1 = document.createElement("input");
		input1.setAttribute('type', 'text');
		input1.setAttribute('value', '');
		input1.setAttribute('id', 'result_'+no_of_rows);
		var input2 = document.createElement("input");
		input2.setAttribute('type', 'submit');
		input2.setAttribute('value', 'test');
		input2.setAttribute('id', 'submit_'+no_of_rows);
		input2.setAttribute('onclick', 'test_and_new_exercise(this)');
		var att = document.createAttribute("countid");       
		att.value = no_of_rows;                          
		input2.setAttributeNode(att); 
		var att2 = document.createAttribute("tries");       
		att2.value = 0;                          
		input2.setAttributeNode(att2); 
			
		cell3.appendChild(txt1);
		cell3.appendChild(input1);
		cell3.appendChild(input2);
		
		var cell4 = row.insertCell(3);
		cell4.innerHTML = "";
		cell4.setAttribute('id', 'korrekt_'+no_of_rows);
		var att4 = document.createAttribute("solved");       
		att4.value = false;                          
		cell4.setAttributeNode(att4); 
		
		var nyopg = global_opgavefunktionen();  //generate_opg1();
		//alert(nyopg);
		cell1.innerHTML = nyopg[0];
		var att3 = document.createAttribute("resultattystys");       
		att3.value = nyopg[1];                          
		input2.setAttributeNode(att3); 
		
		cell2.innerHTML = "";

		MathJax.Hub.Queue(["Typeset",MathJax.Hub,"opg_"+no_of_rows]);
		row.scrollIntoView();
	}


