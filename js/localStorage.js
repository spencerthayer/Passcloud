$(function(){
	var operation = "A"; //"A"=Adding; "E"=Editing
	var selected_index = -1; //Index of the selected list item
	var tbClients = localStorage.getItem("tbClients");//Retrieve the stored data
	tbClients = JSON.parse(tbClients); //Converts string to object
	if(tbClients == null) //If there is no data, initialize an empty array
    tbClients = [];
    //ADD FUNCTION
	function Add(){
		var client = JSON.stringify({
			Site    : $("#site").val(),
			Profile  : $("#profile").val(),
			Characters : $("#countVal").val()
		});
		tbClients.push(client);
		localStorage.setItem("tbClients", JSON.stringify(tbClients));
		//alert("The data was saved.");
		return true;
	}
    //EDIT FUNCTION
	function Edit(){
		tbClients[selected_index] = JSON.stringify({
				Site    : $("#domain").val(),
				Name  : $("#profile").val(),
				Characters : $("#countVal").val()
        });//Alter the selected item on the table
		localStorage.setItem("tbClients", JSON.stringify(tbClients));
		//alert("The data was edited.")
		operation = "A"; //Return to default value
		return true;
	}
    //DELETE FUNCTION
	function Delete(){
		tbClients.splice(selected_index, 1);
		localStorage.setItem("tbClients", JSON.stringify(tbClients));
		//alert("Client deleted.");
	}
    //BUILD THE LIST FUNCTION
	function List(){
		$("#tblList").html("");
		$("#tblList").html(
			"<ul class=\"collapsible\" data-collapsible=\"expandable\">"+
			"</ul>"
			);
		for(var i in tbClients){
			var cli = JSON.parse(tbClients[i]);
		  	$("#tblList ul").append(

					"<li data=\"Edit"+i+"\" class=\"btnEdit drawer-item\" id=\"menu-trigger\" onclick=\"generatePassword();\">"+
					//"<li class=\"clear slide-pass\" data=\"Edit"+i+"\" class=\"btnEdit drawer-item\" class=\"drawer-item\" id=\"menu-trigger\" onclick=\"generatePassword();\">"+
						"<div class=\"collapsible-header\">"+
							"<img src=\"http://www.google.com/s2/favicons?domain="+cli.Site+"\" />"+
							"<span>"+
								cli.Site+
							"</span>"+
							"<i class=\"material-icons red-text btnDelete\" data=\"Delete"+i+"\">delete</i>"+
						"</div>"+
						"<div class=\"collapsible-body\">"+
							"<span class=\"username block\"><strong>Username:</strong> "+cli.Profile+"</span>"+
							"<span class=\"characters block\"><strong>Characters:</strong> "+cli.Characters+"</span>"+
							"<span class=\"masterpassword block\"></span>"+
						"</div>"+
					"</li>"
			);
		}
        //EDIT BUTTON
        $(".btnEdit").click(function() {
                operation = "E";
                selected_index = parseInt($(this).attr("data").replace("Edit", ""));
                var cli = JSON.parse(tbClients[selected_index]);
                $("#site").val(cli.Site);
                $("#profile").val(cli.Profile);
                $("#countVal").val(cli.Characters);
                $("#site").focus();
                generatePassword();
            });
        $('.btnEdit').click(generatePassword());
        //DELETE BUTTON
        $(".btnDelete").click(function() {
                selected_index = parseInt($(this).attr("data").replace("Delete", ""));
                Delete();
                List();
            });
        }
	//SUBMITTING
	//$("#formCloud").bind("submit",function(){
	$("#formCloud").bind("submit",function(){
		if (operation == "A")
			return Add();
		else
			return Edit();
			return List();
	});
	function Save(){
		if (operation == "A")
			return Add();
		else
			return Edit();
			return List();
	};

	List();
        return false;
    });




		// "<li class=\"clear slide-pass\">"+
		// 	"<div class=\"collapsible-header\">"+
		// 		"<img src=\"http://www.google.com/s2/favicons?domain="+cli.Site+"\" />"+
		// 		"<span>"+
		// 			cli.Site+
		// 		"</span>"+
		// 		"<i class=\"material-icons red-text btnDelete\" data=\"Delete"+i+"\">delete</i>"+
		// 	"</div>"+
		// 	"<div class=\"collapsible-body\">"+
		// 		"<span>"+
		// 			cli.Site+
		// 		"</span>"+
		// 	"</div>"+
		// "</li>"
// "<tr>"+
// "<td alt=\"Edit"+i+"\" class=\"btnEdit drawer-item\" class=\"drawer-item\" id=\"menu-trigger\" onclick=\"generatePassword();\">"+
// ""+cli.Site+""+
// "</td>"+
// "<td class=\"del\">"+
// "<img src=\"img/delete.png\" alt=\"Delete"+i+"\" width=\"16\" height=\"16\" class=\"btnDelete\"/>"+
// "</td>"+
// "</tr>"
