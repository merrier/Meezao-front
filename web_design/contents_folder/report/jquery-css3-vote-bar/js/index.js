jQuery(document).ready(function(){
	jQuery('.skillbar').each(function(){
		jQuery(this).find('.skillbar-bar').animate({
			width:jQuery(this).attr('data-percent')
		},500);
	});
});
function showDiv() {
	document.getElementById('popWindow').style.display = 'block';
	document.getElementById('maskLayer').style.display = 'block';
}
function closeDiv() {
	document.getElementById('popWindow').style.display = 'none';
	document.getElementById('maskLayer').style.display = 'none';
}