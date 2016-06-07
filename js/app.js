var app = angular.module('myApp',["ngStorage"]);

app.directive('infoDir',function(){
	return{
		restrict:'E',
		templateUrl:'info.html',
		link:function(scope,element,attr){
			 $('.flexslider').flexslider({
				animation : "slide"
			 });
		}
	}
})

app.directive('eventsDir',function(){
	return{
		restrict:'E',
		templateUrl:'events.html',
		link:function(scope,element,attr){
			 
		}
	}
})

app.controller('eventCtrl',function($scope){
	$scope.achieversList =[
		{"Name":"S.Ram","Email":"ram@gmail.com","Phone":9090009944},
		{"Name":"R.Janani","Email":"janani@gmail.com","Phone":9898984484},
		{"Name":"S.Vinotha","Email":"vinotha@gmail.com","Phone":7676844884}
	];
})

app.directive('contactsDir',function(){
	return{
		restrict:'E',
		templateUrl:'contact.html',
		link:function(scope,element,attr){
		
		$('.item_top').each(function() {
		$(this).appear(function() {
			$(this).delay(150).animate({
				opacity : 1,
				top : "0px"
			}, 1000);
		});
	});
	
	$('.item_bottom').each(function() {
		$(this).appear(function() {
			$(this).delay(150).animate({
				opacity : 1,
				bottom : "0px"
			}, 1000);
		});
	});
			 	$(".validate").validate();
	$(document).on('submit', '#contactform', function() {
		$.ajax({
			url : 'contact/send_mail.php',
			type : 'post',
			dataType : 'json',
			data : $(this).serialize(),
			success : function(data) {
				if (data == true) {
					$('.form-respond').html("<div class='content-message'> <i class='fa fa-rocket fa-4x'></i> <h2>Email Sent Successfully</h2> <p>Your message has been submitted.</p> </div>");
				} else {
					$('.form-respond').html("<div class='content-message'> <i class='fa fa-times fa-4x'></i> <h2>Error sending</h2> <p>Try again later.</p> </div>");
				}
			},
			error : function(xhr, err) {
				$('.form-respond').html("<div class='content-message'> <i class='fa fa-times fa-4x'></i> <h2>Error sending</h2> <p>Try again later.</p> </div>");
			}
		});
		return false;
	});
		}
	}
})

 

app.directive('officialsDir',function(){
	return{
		restrict:'E',
		templateUrl:'officials.html',
		link:function(scope,element,attr){
			 $(window).bind('load', function() {
				parallaxInit();
			});

			function parallaxInit() {
				$('#one-parallax').parallax("30%", 0.1);
				$('#two-parallax').parallax("30%", 0.1);
				$('#three-parallax').parallax("30%", 0.1);
				$('#four-parallax').parallax("30%", 0.1);
				$('#five-parallax').parallax("30%", 0.1);
				$('#six-parallax').parallax("30%", 0.1);
				$('#seven-parallax').parallax("30%", 0.1);
				/*add as necessary*/
			}
		}
	}
})

app.directive('quiz', function($sessionStorage,quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		transclude:true,
		templateUrl: 'quiz.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.questionLength = 0;
				scope.repeatQuestion = false;
				scope.displayAll = false;
				scope.getQuestion();
				scope.answerList =[];
			};
			
			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			};
			
			scope.checkYrAnshere = function(){
				$sessionStorage.checkAns = scope.answerList;
				scope.quesJson = quizFactory.checkQues;
				scope.answersSet= $sessionStorage.checkAns;
				scope.displayAll=true; 
			};
			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.answerMode = true;
					scope.questionLength++;
					
				} else {
					scope.quizOver = true;
					 if(scope.questionLength == scope.score){
							$("#myModalHorizontal").modal("show");
					 }
					 else{
					 scope.repeatQuestion=true;
					  for(var i=0;i<scope.answerList.length;i++){
						//alert(scope.answerList[i]);
					  }
					 }
				}
			};

			scope.nextQuestionList = function() {
				if(!$('input[name=answer]:checked').length) return;

				var ans = $('input[name=answer]:checked').val();
				

				scope.answerList.push(ans);
				
				if(ans == scope.options[scope.answer]) {
				scope.score++;
					scope.correctAns = true;
				} else {
					scope.correctAns = false;
				}
				scope.nextQuestion();
				
			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
				scope.answerMode = true;
			}

			scope.reset();
		}
	}
});

app.factory('quizFactory', function() {
	var questions = [
		{
			question: " Who was the captain of Indian cricket team when they won their second world cup?",
			options: ["Sachin Tendulkar ", " Kabil Dev", " M.S.Dhoni", " Azaruthin"],
			answer: 2 
		},
	    {
			question: " What's the capital of Sri Lanka?",
			options: ["Jaffna ", "Colombo ", "Negombo ", " Galle"],
			answer:  1
		},
		{
			question: "Select the name of the captain of Sri Lankan cricket team who played that role in tenth world cup? ",
			options: [" Jajewardane", "Dilsan ", " Sangakara", " Malinga"],
			answer:  2
		},
		{
			question: "Which city hosted the 1996 Summer Olympics?",
			options: ["Atlanta", "Sydney", "Athens", "Beijing"],
			answer: 0
		},
		{
			question: "When did the second world war end?",
			options: ["1945", "1939", "1944", "1942"],
			answer: 0
		},
		{
			question: "What's the world's wonder that located in India? ",
			options: ["Pyramids ", "Great wall ", "Ajandha cave  ", "Taj Mahal "],
			answer:  3
		},
		{
			question: " What's the ocean that's between American and African continets?",
			options: [" Atlantic", "Indian ", " Pacific", " Artic"],
			answer:  0
		},
		{
			question: "Which is the largest country in the world by population?",
			options: ["India", "USA", "China", "Russia"],
			answer: 2
		},
		{
			question: "Where is the World's widest river?",
			options: [" Egypt", "America ", " Brazil", "Chile "],
			answer:  2
		},
		{	
			question: "Who invented telephone?",
			options: ["Albert Einstein", "Alexander Graham Bell", "Isaac Newton", "Marie Curie"],
			answer: 1
		},
		{
			question: "Who is Mr.Parac Obama? ",
			options: [" famous singer ", "actor ", " politician", " president"],
			answer:  3
		},
		{
			question: "Which was the first country to issue paper currency?",
			options: ["USA", "France", "Italy", "China"],
			answer: 3
		}
	];

	return {
		getQuestion: function(id) {
			var qlen = questions.length;
			if(id < qlen) {
				return questions[id];
			} else {
				return false;
			}
		},
		checkQues:questions
	};
});

app.directive('homeDir',function(){
	return{
		restrict:'E',
		templateUrl:'home.html',
		link:function(scope,element,attr){
			
		$("#navigation").sticky({
				topSpacing : 0
		});
					
	$('#brand, .nav li a, .start-button').bind('click', function(event) {
			var $anchor = $(this);

			$('html, body').stop().animate({
				scrollTop : $($anchor.attr('href')).offset().top - 60
			}, 1500, 'easeInOutExpo');

			event.preventDefault();
		});
	$('#fullscreen-slider').maximage({
		cycleOptions : {
			fx : 'fade',
			speed : 1000,
			timeout : 6000,
			prev : '#slider_left',
			next : '#slider_right',
			pause : 1,
			before : function(last, current) {
				jQuery('.slide-content').fadeOut().animate({
					top : '50%'
				}, {
					queue : false,
					easing : 'easeOutQuad',
					duration : 550
				});
				jQuery('.slide-content').fadeOut().animate({
					top : '-100px'
				});
			},
			after : function(last, current) {
				jQuery('.slide-content').fadeIn().animate({
					top : '0'
				}, {
					queue : false,
					easing : 'easeOutQuad',
					duration : 450
				});
			}
		},
		onFirstImageLoaded : function() {
			jQuery('#cycle-loader').delay(800).hide();
			jQuery('#fullscreen-slider').delay(800).fadeIn('slow');
			jQuery('.slide-content').fadeIn().animate({
				top : '0'
			});
			jQuery('.slide-content a').bind('click', function(event) {
				var $anchor = $(this);
				jQuery('html, body').stop().animate({
					scrollTop : $($anchor.attr('href')).offset().top - 44
				}, 1500, 'easeInOutExpo');
				event.preventDefault();
			});
		}
	});

		}
	}
})