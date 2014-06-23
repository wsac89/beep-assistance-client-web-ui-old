/*globals io*/
$(function() {
	'use strict';
	
	var host = window.location.host;
	var socket = io.connect(host +':1334');
	
	if ( !socket.socket.connected ) {
		socket = io.connect('http://localhost:1334');
	}
	
	//News event
	socket.on('beep-init', function (data) {
		console.log(data);
	});
	
	//Beep event
	socket.on('beep', function (data) {
		console.log(data);
		$('.text-ballon').eq(data.devID).fadeOut(200, function(){
			var $this = $(this);
			$this.html('<p class="beep-msg">'+data.tstring+'</p><p class="beep-meta">'+ data.kidID +' ' + data.beepMeta.timestamp + '</p>');
			$this.fadeIn();
		});
		//function(){ this.text(data.tstring).fadeIn() }
		//socket.emit('beep-response', { my: 'Recieved' });
	}).on('beep-close-app', function (data) {
		console.log(data);
		console.log('X.x close! ');
		window.open('', '_self', ''); //bug fix
		window.close();
	});
		
	function emitClose(){
		//console.log('shutdown! pls?');
		socket.emit('beep-adm-action', { action: 'shutdown' });
	}
	
	var longpress = 3000;
	var start = 0;
	
	$( '.btn-close' ).on( 'mousedown', function() {
		start = new Date().getTime();
	} ).on( 'mouseleave', function() {
		start = 0;
	} ).on( 'mouseup', function() {
		if ( new Date().getTime() >= ( start + longpress )  ) {
			console.log('long press!');
			$('#close-dialog').modal('toggle');
		} else {
			console.log('short press!');
		}
	} );
	
	$('.btn-app-close').on('click', emitClose );

});