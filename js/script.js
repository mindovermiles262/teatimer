// --- HELPER FUNCTIONS --- //

// Display timer
function disp_timer(ms) {
	min = Math.floor(ms/60000)
	ms = ms - (min * 60000);
	sec = Math.floor(ms/1000)
	$('#timer_count').empty();
	$('#timer_count').append(addZero(min) + ":" + addZero(sec))
}
// Add zeros for time display
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

// play chime
function play() { document.getElementById("snd").play(); }

// updates remaining steep time
time_left = function(end) {
	$('#time_plus').html('')
	$('#time_minus').html('')
	now = new Date();
	if (now < end) {
		remain = end - now;
		console.log("remain: ", remain);
		if (remain < 200) { play(); }
		disp_timer(remain);
	}
}


// --- START document.ready --- //
$(document).ready(function() {
	var steep = 0;
	var ready = false;
	disp_timer(steep);

	// set steep times by tea
	function choose_black() {
		$('#time_plus').html('&#9650;')
		$('#time_minus').html('&#9660;')
		$('#start').addClass("hover")
		steep = 270000;
		disp_timer(steep);
		ready = true;
	}
	function choose_white() {
		$('#time_plus').html('&#9650;')
		$('#time_minus').html('&#9660;')
		$('#start').addClass("hover")
		steep = 60000;
		disp_timer(steep);
		ready = true;
	}	
	function choose_green() {
		$('#time_plus').html('&#9650;')
		$('#time_minus').html('&#9660;')
		$('#start').addClass("hover")
		steep = 150000;
		disp_timer(steep);
		ready = true;
	}	
	$('#black').on("click", choose_black);
	$('#white').on("click", choose_white);
	$('#green').on("click", choose_green);

	// adjust steep time
	$('#time_plus').on("click", function() {
		if (steep < 420000) {
			steep += 15000;
		} else (steep = 420000)
		disp_timer(steep);
	})
	$('#time_minus').on("click", function() {
		if (steep > 15000) {
			steep -= 15000;
		} else (steep = 15000)
		disp_timer(steep);
	})

	// START function
	function start(ms) {
		if (ready) {
			now = new Date();
			var done = new Date(now.getTime() + ms)
			$('#time_plus').html('')
			$('#time_minus').html('')
			$('#start').html("");
			$('#pause').html("&#x7c; &#x7c;");
			$('.tea').off("click");
			$('.tea').removeClass("hover");
			var run = setInterval(function() { time_left(done) }, 100);
			// PAUSE function
			$('#pause').click(function() {
				clearInterval(run);
				steep_remain = done - new Date();
				$('#start').html("");
				$('#pause').html("");
				$('#resume').html("&#9654;");
				$('#reset').html("&#x21bb;");
			})
		}
	}

	// RESUME function
	function resume(ms) {
		now = new Date();
		var done = new Date(now.getTime() + ms)
		$('#start').html("");
		//$('#pause').html("&#9632;");
		$('#pause').html("&#x7c; &#x7c;");
		$('#resume').html("");
		$('#reset').html("");
		var run = setInterval(function() { time_left(done) }, 100);
		// PAUSE function
		$('#pause').click(function() {
			clearInterval(run);
			steep_remain = done - new Date();
			$('#start').html("");
			$('#pause').html("");
			$('#resume').html("&#9654;");
			$('#reset').html("&#x21bb;");
		})
	}

	// RESET function
	function reset() {
		ready = false;
		steep = 0
		//reset display
		disp_timer(steep);
		//reset buttons
		$('#start').html("&#9654;");
		$('#pause').html("");
		$('#resume').html("");
		$('#reset').html("");
		$('#black').on("click", choose_black);
		$('#white').on("click", choose_white);
		$('#green').on("click", choose_green);
		$('.tea').addClass("hover");
	}

	// Button presses
	$('#start').on("click", function() { start(steep)} );
	$('#resume').on("click", function () { resume(steep_remain)} );
	$('#reset').on("click", reset)

}) // end doc.ready


