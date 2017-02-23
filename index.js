// Taken from
// https://github.com/evgeni/qifi
// Author: Evgeni Golov
// MIT License
function escape_string (string) {
		var to_escape = ['\\', ';', ',', ':', '"'];
		var hex_only = /^[0-9a-f]+$/i;
		var output = "";
		for (var i=0; i<string.length; i++) {
				if($.inArray(string[i], to_escape) != -1) {
						output += '\\'+string[i];
				}
				else {
						output += string[i];
				}
		}
		if (hex_only.test(output)) {
				output = '"'+output+'"';
		}
		return output;
};
        
function adjustFontSize(selector, maxWidth) {
	box = $(selector);

	while (box.width() > maxWidth) {
		fontSize = $(selector).css('font-size');
		fontSize = parseInt(fontSize);
		fontSize = fontSize - 5;
		$(selector).css('font-size', fontSize + 'px');
	}
}

function generate() {

		var ssid = $('#ssid').val();
		var hidden = $('#hidden').is(':checked');
		var encryption = $('#encryption').val();

		if (encryption != 'nopass') {
				var key = $('#key').val();
		} else {
				var key = '';
		}

		var qrstring = 
			'WIFI:S:' + 
			escape_string(ssid) +
			';T:' +
			encryption +
			';P:' +
			escape_string(key) + ';';

		if (hidden) {
				qrstring += 'H:true';
		}

		qrstring += ';';

		$('.print .ssid .text').text(ssid);
		$('.print .key .text').text(key);

		adjustFontSize('.print .ssid .text', 400)
		adjustFontSize('.print .key .text', 400)

		$('#qrcode').empty();
		$('#qrcode').qrcode({
			width: 520,
			height: 520,
			text: qrstring
		});

		print(); 
};
