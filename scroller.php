<!DOCTYPE html>
<html>
<head>
	<title>Test</title>
	<script type="text/javascript">
	
	//init();
	</script>
</head>
<?php //body onload="pageScroll();" ?>
<body>
<a href="javascript: 
	 	var VERSION='1.0'; var s = document.createElement('script'); s.type='text/javascript'; document.body.appendChild(s); s.src='https://raw.github.com/andrescheca/AutoScroller/master/autoScroller.min.js';
		void(0);
	">Scroller</a>
	</br>

<?php 
	$cantidad = 0;
	for ($i = 0; $i < $cantidad; $i++) {
		echo(($i + 1) . ".- Este es un texto muy largo y lo voy a poner en la p&aacute;gina para que ocupe espacio.</br>");
	}
?>
</body>
</html>
