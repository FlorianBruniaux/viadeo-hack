jQuery('.img.avatar').each(
	function(){
		var link = jQuery(jQuery(this).children()[0]); 
		var img = jQuery(link).children()[0];
		if(img != undefined){
			var src = img.src;
			if (/memberId/i.test(src)){
				var regx = /^http:\/\/.*?memberId=(.*)&height=.*/;
				var id = src.match(regx)[1];		
				console.log('www.viadeo.com/fr/profile/'+id);	
			}
		}
	}
);
