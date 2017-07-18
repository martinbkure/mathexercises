
// GRIMT MEN TODO
// globale variable
var global_tableId = "table_exercises_1";
var global_opgavefunktionen = null;

	function mysetup(containerid, opgavefunktion){
		
		var container = document.getElementById(containerid);
		create_table(container);
		global_opgavefunktionen =opgavefunktion;
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
		var cell5 = row.insertCell(4);
		
		cell1.innerHTML = "opgave";
		cell2.innerHTML = "-";
		cell3.innerHTML = "Løsning";
		cell4.innerHTML = "visning";
		cell5.innerHTML = "korrekt?";
		
		container.appendChild(table);
	}
	
	function test_result(svar, facit, precision, type){

		
		svar = svar.replace(',','.');
		svar = svar.replace('*','');
		svar = svar.replace(/\s/g,'');  //remove all whitespaces
		
		// test hvis rigtigt
		if (svar === facit){
			return true;
		} else {
			return false;
		}
	}
	
	function test_and_new_exercise(e){
		
		var thecaller = e.getAttribute("countid");
		var tries = parseInt(e.getAttribute("tries"));
		tries = tries + 1;
		e.setAttribute("tries", tries);
		
		var resultat = e.getAttribute("resultattystys");
		var korrektfelt = document.getElementById("korrekt_"+thecaller);
		
		var svar = document.getElementById("result_"+thecaller).value;
		
		if(test_result(svar, resultat, 0.2, null)){
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
			if (tries>3){
				korrektfelt.innerHTML = "IKKE løst. Forsøg: "+tries + "Svar: "+resultat;
				generate_new_exercise();
				e.disabled = true;
			}
		}
						
	}
	
	function UpdateMath(number, data){
		//alert("jhdjsfh");
		var tdiv = document.getElementById("visning_"+number);
		tdiv.innerHTML="$"+data+"$";
		MathJax.Hub.Queue(["Typeset",MathJax.Hub,"visning_"+number]);
		
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
		
		//var txt1 = document.createTextNode("x=");
		var input1 = document.createElement("input");
		input1.setAttribute('type', 'text');
		input1.setAttribute('value', '');
		input1.setAttribute('id', 'result_'+no_of_rows);
		input1.setAttribute('onkeyup', 'UpdateMath('+no_of_rows+', this.value)');
		
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
			
		//cell3.appendChild(txt1);
		cell3.appendChild(input1);
		cell3.appendChild(input2);
		
		var cell35 = row.insertCell(3);
		var vis_div = document.createElement("div");
		vis_div.setAttribute('id', 'visning_'+no_of_rows);
		cell35.appendChild(vis_div);
		
		var cell4 = row.insertCell(4);
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


