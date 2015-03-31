//	Le title contenant le nombre de visites
var h1 = jQuery('.top-h').html();
var regxNbVisites = /([0-9]+)/;

//	Nombre total de visites du profil
var nbVisites = h1.match(regxNbVisites)[1];	

//	Nombre de page (10 visites par page)
var nbPages = (nbVisites/10).round();
console.log("nbPages = "+nbPages);

//	Total de lignes parsées
var totalParsed = 0;

//	Pour parser toutes les urls possibles (celles avec une photo ?)
function parseUrl(){
	jQuery('.img.avatar').each(
		function(){
			var link = jQuery(jQuery(this).children()[0]); 
			var img = jQuery(link).children()[0];
			if(img != undefined){
				var src = img.src;
				if (/memberId/i.test(src)){
					var regxIdMembre = /^http:\/\/.*?memberId=(.*)&height=.*/;
					//	Id du membre
					var id = src.match(regxIdMembre)[1];	
					//	On log le lien de la fiche du visiteur
					console.log('www.viadeo.com/fr/profile/'+id);	
					//	On incrémente le nombre de profils trouvés
					totalParsed++;
				}
			}
		}
	);
	
	console.log(totalParsed + " profils identifiés !");
}

//	Numéro de la page parsée
var pageOk = 0;

//	On va parcourir toutes les pages
for(var page = 2; page <= nbPages; page++){

	var lis = [];
	
	jQuery.get('http://www.viadeo.com/monreseau/consultation/?pageNumber='+page).then(function(pageContent) {
		//	On récupère les li de la page consultée
	  	lis = jQuery(pageContent).find('.visitor-item');
	}).done(function(){
		//	On ajoute les visiteurs à la suite des autres
	  	jQuery('ul.visitors-list').append(lis);
	  	
	  	//	On incrémente
		pageOk++;
		
		//	On logue pour savoir où on en est (car ça peut prendre 2/3 minutes)
		console.log("page num "+pageOk+" : OK");
		
		//	Si on a tout récupéré
		if(pageOk == nbPages-1){
			//	On recherche les liens vers les profils
			parseUrl();
		}
		
	});
	
	
}


