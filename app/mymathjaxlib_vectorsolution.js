
// GRIMT MEN TODO
// globale variable
var global_tableId = "table_exercises_1";
var global_opgavefunktionen = null;
var global_testfunktionen = null;
var global_dim = 2;
var global_lefttxt = "";
var global_righttxt = "";

/* dim er dimension enten 1,2 eller 3 */
	function mysetup(containerid, opgavefunktion, testfunktion, dim, lefttxt, righttxt){
		
		var container = document.getElementById(containerid);
		create_table(container);
		global_opgavefunktionen =opgavefunktion;
		global_testfunktionen= testfunktion;
		global_dim=dim;
		global_lefttxt = lefttxt;
		global_righttxt = righttxt;
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
		var svar_1 = document.getElementById("resulta_"+thecaller).value;
		var svar_array = [svar_1];
		
		if (global_dim>=2){
			var svar_2 = document.getElementById("resultb_"+thecaller).value;
			svar_array.push(svar_2);
		}
		
		if (global_dim >=3){
			var svar_3 = document.getElementById("resultc_"+thecaller).value;
			svar_array.push(svar_3);
		}
		
		var korrektfelt = document.getElementById("korrekt_"+thecaller);
		
		// test hvis rigtigt
		if (global_testfunktionen(svar_array, resultat, null)){
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
		
		var t = document.createElement("table");
		var t1 = document.createElement("th");
		t1.setAttribute("style", "border:none;")
		
		var t2 = document.createElement("td");
		t2.setAttribute("rowspan", "2");
		t2.setAttribute("style", "padding:0;border:none;");
		t2.setAttribute("id", "lefttext_"+no_of_rows);
		
		var txt1 = document.createTextNode(global_lefttxt);
		
		t2.appendChild(txt1);
		t1.appendChild(t2);
		
		var t3 = document.createElement("td");
		t3.setAttribute("style", "padding:0;border:none;");
		
		var input1a = document.createElement("input");
		input1a.setAttribute('type', 'text');
		input1a.setAttribute('value', '');
		input1a.setAttribute('id', 'resulta_'+no_of_rows);
		input1a.setAttribute("style", "display:block;");
		t3.appendChild(input1a);
		
		if (global_dim>=2){
			var input1b = document.createElement("input");
			input1b.setAttribute('type', 'text');
			input1b.setAttribute('value', '');
			input1b.setAttribute('id', 'resultb_'+no_of_rows);
			input1b.setAttribute("style", "display:block;");	
			t3.appendChild(input1b);
		}
		
		if (global_dim>=3){
			var input1c = document.createElement("input");
			input1c.setAttribute('type', 'text');
			input1c.setAttribute('value', '');
			input1c.setAttribute('id', 'resultc_'+no_of_rows);
			input1c.setAttribute("style", "display:block;");
			t3.appendChild(input1c);		
		}
		
		
		
		t1.appendChild(t3);
		
		var t4 = document.createElement("td");
		t4.setAttribute("style", "padding:0;border:none;");
		var txt2 = document.createTextNode(global_righttxt);
		t4.appendChild(txt2);
		
		t1.appendChild(t4);
		
		var t5 = document.createElement("td");
		
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
		input2.setAttribute("style", "display:block;position:right;vertical-align: middle;margin: 0 auto;");
		t5.appendChild(input2);
		t5.setAttribute("style", "padding:0;border:none;");
		
		t1.appendChild(t5);
		cell3.appendChild(t1);
		
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

		MathJax.Hub.Queue(["Typeset",MathJax.Hub,"lefttext_"+no_of_rows]);
		MathJax.Hub.Queue(["Typeset",MathJax.Hub,"opg_"+no_of_rows]);
		row.scrollIntoView();
	}


