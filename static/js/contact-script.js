$(document).ready(function(){
	$("#contact-submit").on("click", function(event) {
		if($("#contact-name").val() != "" && $("#contact-email").val() != "" && $("#contact-subject").val() != "" && $("#contact-msg").val() != "") {
			startSendAnimation();
			$("#msg-status").text("Sending Message...").show();
			$.ajax({
				data : {
					cName:  $("#contact-name").val(),
					cEmail : $("#contact-email").val(),
					cSubject : $("#contact-subject").val(),
					cMsg : $("#contact-msg").val()
				},
				type : "POST",
				url : "/email"
			})
			.done(function(data) {
				$("#contact-name").val("");
				$("#contact-email").val("");
				$("#contact-subject").val("");
				$("#contact-msg").val("");
				
				endSendAnimation();
				$("#msg-status").text(data.Status).show();
			});
		} else {
			checkBlankForm("contact-name");
			checkBlankForm("contact-email");
			checkBlankForm("contact-subject");
			checkBlankForm("contact-msg");
			
			startShakeAnimation();
			setTimeout(endShakeAnimation, 500);
			$("#msg-status").text("Please fill in all inputs.").show();
		}
		event.preventDefault();
	});
	
	$(".contact-input").focus(function(event){
		$(this).removeClass("errorBorder");
		setTimeout(checkBlankForm(this.id), 50);
	});
	
	$(".contact-input").keyup(function(event){
		$(this).removeClass("errorBorder");
		setTimeout(checkBlankForm(this.id), 10);
	});
});

function checkBlankForm(i) {
	id = "#" + i;
	if($(id).val() == "") { 
		$(id).addClass("errorBorder");
	}
}

function startSendAnimation() {
	resetAnimation();
	$("#contact-submit").removeClass("returnSendAnimation");
	$("#contact-submit").addClass("sendAnimation");
}

function endSendAnimation() {
	$("#contact-submit").removeClass("sendAnimation");
	$("#contact-submit").addClass("returnSendAnimation");
}

function resetAnimation() {
	var e = document.getElementById("contact-submit");
	e.style.animation = 'none';
	e.offsetHeight;
	e.style.animation = null; 
}

function startShakeAnimation() {
	$("#contact-submit").removeClass("sendAnimation");
	$("#contact-submit").removeClass("returnSendAnimation");
	$("#contact-submit").addClass("shake");
}

function endShakeAnimation() {
	$("#contact-submit").removeClass("shake");
}