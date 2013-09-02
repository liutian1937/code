;(function($){
	$(function(){
		//Nav List 
		$('#navList').delegate('li','click',function(e){
			if($(this).hasClass('dropdown')){
				e.preventDefault();
				$(this).find('ul').slideToggle();
			}
		});
		//Tab List
		$('.tabList li').each(function(index){
			$(this).on('click',function(e){
				e.preventDefault();
				var parents = $(this).parent().next('.widgetBody');
				$(this).addClass('cur').siblings().removeClass('cur');
				parents.find('.content').hide();
				parents.find('.content').eq(index).show();
			})
		});
		//Uniform
		if($.uniform){
			$('input:checkbox, input:radio, .uniform-file').uniform();
		};
		// check all checkboxes in table
		$('.checkall').click(function(){
		   var parentTable = $(this).parents('table');										   
		   var ch = parentTable.find('tbody input[type=checkbox]');
		   if($(this).is(':checked')) {			
			  //check all rows in table
			  ch.each(function(){ 
				 $(this).attr('checked',true);
				 $(this).parent().addClass('checked');	//used for the custom checkbox style
				 $(this).parents('tr').addClass('selected'); // to highlight row as selected
			  });			
		   } else {		
			  //uncheck all rows in table
			  ch.each(function(){ 
				 $(this).attr('checked',false); 
				 $(this).parent().removeClass('checked');	//used for the custom checkbox style
				 $(this).parents('tr').removeClass('selected');
			  });	
		   }
		});
		// delete row in a table
		$('.deleterow').click(function(){
		   var conf = confirm('Continue delete?');
		   if(conf)
			  $(this).parents('tr').fadeOut(function(){
				 $(this).remove();
				 // do some other stuff here
			  });
		   return false;
		});   
		
	});
})(jQuery);
