$('#drupalgap_taxonomy_term_edit').on('pagebeforeshow',function(){
	try {
		console.log(JSON.stringify(drupalgap.taxonomy_vocabulary));
		if (!drupalgap.taxonomy_term_edit || !drupalgap.taxonomy_term_edit.nid) {
			// Creating a new term.
			$('#drupalgap_taxonomy_term_edit h1').html('Create Term');
			$('#taxonomy_term_weight').val(0);
			$('#taxonomy_term_delete').hide();
		}
		else {
			// Editing an existing term.
			$('#drupalgap_taxonomy_term_edit h1').html('Edit Term');
		}
    }
	catch (error) {
		alert("drupalgap_taxonomy_term_edit - pagebeforeshow - " + error);
	}
});

$('#drupalgap_taxonomy_term_edit').on('pageshow',function(){
	try {
    }
	catch (error) {
		alert("drupalgap_taxonomy_term_edit - pageshow - " + error);
	}
});

$('#taxonomy_term_submit').on('click', function(){
	// Grab form input, build json taxonomy_term and call service resource.
	taxonomy_term = {
		'vid':drupalgap.taxonomy_vocabulary.vid,
		'name':$('#taxonomy_term_name').val(),
		'description':$('#taxonomy_term_description').val(),
		'weight':$('#taxonomy_term_weight').val(),
	};
	drupalgap.services.taxonomy_term.create.call({
		'taxonomy_term':taxonomy_term,
		'success':function(result){
			if (result[0] == 1) {
				alert('Term created!');
			}
			$.mobile.changePage('taxonomy_vocabulary.html');
		},
	});
});

$('#taxonomy_term_cancel').on('click', function(){
	$.mobile.changePage('taxonomy_vocabulary.html');
});

$('#taxonomy_term_delete').on('click', function(){
	if (confirm('Are you sure you want to delete "' + drupalgap.taxonomy_term_edit.name + '"? This cannot be undone.')) {
		drupalgap.services.taxonomy_term.del.call({
			'tid':drupalgap.drupalgap.taxonomy_term_edit.tid,
			'success':function(result){
				if (result) {
					drupalgap.taxonomy_term = {};
					drupalgap.taxonomy_term_edit = {};
					$.mobile.changePage('taxonomy_vocabulary.html');
				}
			},
		});
	}
});