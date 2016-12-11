'use strict';

var SP = function () {
	var 
	getListItem = function (url, list, id, callback) {
		if(url == "") url = ".";
		$.ajax(	{
			url: url+"/_api/web/lists/getByTitle('"+list+"')/items('"+id+"')",
			type: "GET",
			headers: {
				"Accept": "application/json;odata=verbose",
			},
			success: function (data) {
				if (callback !== undefined)	callback(data.d);
			},
			error: function (err) {
				console.log(JSON.stringify(err));
			}
		});
	},
	getListItems = function (url, list, query, callback) {
		if(url == "") url = ".";
		$.ajax(	{
			url: url+"/_api/web/lists/getByTitle('"+list+"')/items/?" + encodeURIComponent(query),
			type: "GET",
			headers: {
				"Accept": "application/json;odata=verbose",
			},
			success: function (data) {
				if (callback !== undefined) callback(data.d.results);
			},
			error: function (error) {
				console.log(JSON.stringify(error));
			}
		});
	},
	createListItem = function (url, list, item, callback) {
		var _item = $.extend({
			"__metadata": { "type": getListItemType(list) }
		}, item);

		$.when(this.getFormDigest()).done(function(fd) {		
			if(url == "") url = ".";
			$.ajax({
				url: url+"/_api/web/lists/getByTitle('"+list+"')/items",
				type: "POST",
				contentType: "application/json;odata=verbose",
				data: JSON.stringify(_item),
				headers: {
					"Accept": "application/json;odata=verbose",
					"X-RequestDigest": fd.d.GetContextWebInformation.FormDigestValue,
				},
				success: function (data) {
					if (callback !== undefined)	callback(data);
				},
				error: function (error) {
					console.log(JSON.stringify(error));
				}
			});
		});
	},
	updateListItem = function (url, list, item, data, callback) {
		var _item = $.extend({
			"__metadata": { "type": getListItemType(list) }
		}, item);

		$.when(this.getFormDigest()).done(function(fd) {
			if(url == "") url = ".";
			$.ajax({
				url: url+"/_api/web/lists/getByTitle('"+list+"')/items('"+_item.ID+"')",
				type: "POST",
				contentType: "application/json;odata=verbose",
				data: JSON.stringify(_item),
				headers: {
					"accept": "application/json;odata=verbose",
					"X-RequestDigest": fd.d.GetContextWebInformation.FormDigestValue,
					"IF-MATCH": "*",
					"X-Http-Method": "MERGE"
				},
				success: function (data) {
					if (callback !== undefined) callback(data);
				},
				error: function (error) {
					console.log(JSON.stringify(error));
				}
			});
		});
	},
	deleteListItem = function (url, list, id, callback) {
		$.when(this.getFormDigest()).done(function(fd) {
			if(url == "") url = ".";
			$.ajax({
				url: url+"/_api/web/lists/getByTitle('"+list+"')/items('"+id+"')",
				type: "DELETE",
				headers: {
					"accept": "application/json;odata=verbose",
					"X-RequestDigest": fd.d.GetContextWebInformation.FormDigestValue,
					"IF-MATCH": "*"
				},
				success: function (data) {
					if (callback !== undefined) callback(data);
				},
				error: function (error) {
					console.log(JSON.stringify(error));
				}
			});
		});
	},
	getFormDigest = function() {
		return $.ajax({
			url: "_api/contextinfo",
			type: "POST",
			headers: {
				"Accept": "application/json;odata=verbose",
				"contentType": "text/xml"
			}
		});
	},
	getListItemType = function(list) {
		return "SP.Data."+list[0].toUpperCase()+list.substring(1)+"ListItem";
	}	

	return {
		createListItem: createListItem,
		getListItems: getListItems,
		getListItem: getListItem,
		updateListItem: updateListItem,
		deleteListItem: deleteListItem,
		getFormDigest: getFormDigest,
		getListItemType: getListItemType
	}
}();
