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
        
function generate() {

		var ssid = $('#ssid').val();
		var hidden = $('#hidden').is(':checked');
		var encryption = $('#encryption').val();

		if (encryption != 'nopass') {
				var password = $('#password').val();
		} else {
				var password = '';
		}

		var qrstring = 
			'WIFI:S:' + 
			escape_string(ssid) +
			';T:' +
			encryption +
			';P:' +
			escape_string(password) + ';';

		if (hidden) {
				qrstring += 'H:true';
		}

		qrstring += ';';

		$('.print .qrcode').empty();
		$('.print .qrcode').qrcode({
			width: 800,
			height: 800,
			text: qrstring
		});

		print(); 
};
