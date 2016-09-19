$(function() {
	 
	$("#usernameAlert").hide();
	$("#pageTwo").hide();
	$("#pageThree").hide();


	$("#searchButton").click(function (event){
		event.preventDefault();

		if($('#searchInput').val()) {

			// Hide the username alert if there is a value
			$("#usernameAlert").hide();

			var searchValue = $('#searchInput').val();
			gitHubRequest(searchValue);

		} else {
			$("#usernameAlert").show();
		}
	});

	$(".close").click(function (){
		$("#usernameAlert").hide();
	});


	function gitHubRequest(value) {
		$.ajax({
	 	  url: `https://api.github.com/users/${value}`,
	 	  success: function (data) {
	 	  		profileHandler(data);
	 	  },
	 	  error:function (xhr, ajaxOptions, thrownError){
			    if(xhr.status == 404) {
			        $("#usernameAlert").show();
			    }
			}
	 	});
	}

	function profileHandler(data) {
		// Hide first page
		// Show second profile page

		console.log(data);

		$("#pageOne").hide();
		$("#pageTwo").show();

		// Set Jumbotron CSS height
		$(".jumbotron").css("height", 350);

		// Set GitHub User
		$("#pageTwoHeader").text(data.name);
		$("#username").text(data.login);
		$("#company").text(data.company);
		$("#location").text(data.location);
		$("#blog").text(data.blog);
		$("#githubImage").attr("src",`${data.avatar_url}`);
	}

});

 	