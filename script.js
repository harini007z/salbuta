$(function() {

	var getPage = function (animate) {

		$(".active").removeClass("active");

		var activeItem = $(".sidenav a[href='" + window.location.hash + "']"),
			parentItems = activeItem.parents("li");

		parentItems.addClass("active");

		!parentItems.last().hasClass("uk-open") && UIkit.accordion( $("[uk-accordion]")[0] ).toggle( parentItems.last().index(), animate );

		!animate && $(".sidenav").scrollTop(activeItem.offset().top);

		try {

			$("section").html( eval( window.location.hash.replace("#","") ) );

			$("title").text(( "" != $(".content > p.uk-text-meta").text() ? ( $(".content > p.uk-text-meta").text() + " > " ) : "" ) + $("h1").first().text() + " - Documentation");

			$(".wrapper").focus().scrollTop(0);

			0 < $(".getting_started_theme_options").length && themeOptionsForm();

			0 < $(".layout_gadgets_menu").length && menuToolForm();

			0 < $(".prettyprint").length && prettyPrint();

		} catch(e) {
			console.log(e);

		}

	}, makeCheckBox = function() {

		$(".checkbox_group:not(.checkbox_ready)").each(function(){
			var e = $(this), i = $(this).find("input");
			e.addClass("checkbox_ready");
			i.after('<div class="toggle"><div class="bar"></div><div class="ball"></div></div>');
			e.hasClass("checked") ? i.val("on") : i.val("off");
			e.on("click", function(){
				e.toggleClass("checked");
				i.val( "on" == i.val() ? "off" : "on" );
			});
		});

	}, themeOptionsForm = function() {

		var elem = $(".theme_options form"),

			defaultObject = {text:{sideMenu:"Side Gadgets",menu:"Menu",followOn:"Follow on",shareTo:"Share to",filter:"Filter",view:"View",expandPosts:"Expand Posts",shrinkPosts:"Shrink Posts",followByEmailMessage:"Get updates right in your inbox. Join to get notified with all new stuff",backToTop:"Back To Top",emotions:"Emotions",emotionsInfo:"Copy and paste emojis inside comment box",monthsNames:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec"},layout:{enableLightStyle:!1,enableWavyStyle:!0,enableStickyHeader:!0,enableStickySidebar:!0,enableIndexSidebar:!1,enablePagesSidebar:!0,enableFilterOption:!0,enableViewOption:!0,enableShrinkedPosts:!1,enableShrinkingForAll:!1,enableImagesAutoHeight:!1,enableInfiniteScroll:!0},relatedPosts:{enable:!0,title:"Related Posts",maxResults:"5"},errorPage:{header1st:"Page not found",header2nd:"Error 404 - Ooops!",message:"It might has been removed, renamed Or temporarily unavailable. Search again!",enableFeaturedPosts:!0,featuredPostsMaxResults:"6"}

			},

			addInput = function (key, val, isNumber, monthsClass) {
				return "<div class=\"" + ( monthsClass ? monthsClass : "" ) + "\">" +
							"<label class=\"uk-form-label\" for=\"" + val.split(".").join("_") + "\">" + key + "</label>" +
							"<div class=\"uk-form-controls\">" +
								"<input class=\"uk-input uk-text-warning" + ( monthsClass ? ( " " + monthsClass ) : "" ) + "\" id=\"" + val.split(".").join("_") + "\" type=\"" + ( isNumber ? "number" : "text" ) + "\" placeholder=\"" + eval(val) + "\" value=\"" + eval(val) + "\"" + ( isNumber ? " min=\"1\"" : "" ) + ">" +
							"</div>" +
						"</div>";
			},
			
			addCheckBox = function (key, val) {
				return "<div>" +
							"<div class=\"checkbox_group" + ( eval(val) ? " checked" : "" ) + "\">" +
								"<input id=\"" + val.split(".").join("_") + "\" type=\"checkbox\">" +
								"<span>" + key + "</span>" +
							"</div>" +
						"</div>";
			};

		elem.find(".translation > div").append(
			addInput("Side Menu", "defaultObject.text.sideMenu") +
			addInput("Menu", "defaultObject.text.menu") +
			addInput("Follow On", "defaultObject.text.followOn") +
			addInput("Share To", "defaultObject.text.shareTo") +
			addInput("Filter", "defaultObject.text.filter") +
			addInput("View", "defaultObject.text.view") +
			addInput("Expand Posts", "defaultObject.text.expandPosts") +
			addInput("Shrink Posts", "defaultObject.text.shrinkPosts") +
			addInput("Follow By Email Message", "defaultObject.text.followByEmailMessage") +
			addInput("Back To Top", "defaultObject.text.backToTop") +
			addInput("Emotions", "defaultObject.text.emotions") +
			addInput("Emotions Info", "defaultObject.text.emotionsInfo")
		);

		var monthsNamesArray = defaultObject.text.monthsNames.split(" ");
		elem.find(".months > div").append(
			addInput("All Months", "defaultObject.text.monthsNames", "", "all_months uk-hidden") +
			addInput("January", "monthsNamesArray[0]", "", "month") +
			addInput("February", "monthsNamesArray[1]", "", "month") +
			addInput("March", "monthsNamesArray[2]", "", "month") +
			addInput("April", "monthsNamesArray[3]", "", "month") +
			addInput("May", "monthsNamesArray[4]", "", "month") +
			addInput("June", "monthsNamesArray[5]", "", "month") +
			addInput("July", "monthsNamesArray[6]", "", "month") +
			addInput("August", "monthsNamesArray[7]", "", "month") +
			addInput("September", "monthsNamesArray[8]", "", "month") +
			addInput("October", "monthsNamesArray[9]", "", "month") +
			addInput("November", "monthsNamesArray[10]", "", "month") +
			addInput("December", "monthsNamesArray[11]", "", "month")
		);

		elem.find(".layout > div").append(
			addCheckBox("Light Style", "defaultObject.layout.enableLightStyle") +
			addCheckBox("Wavy Style", "defaultObject.layout.enableWavyStyle") +
			addCheckBox("Sticky Header", "defaultObject.layout.enableStickyHeader") +
			addCheckBox("Sticky Sidebar", "defaultObject.layout.enableStickySidebar") +
			addCheckBox("Index Sidebar", "defaultObject.layout.enableIndexSidebar") +
			addCheckBox("Pages Sidebar", "defaultObject.layout.enablePagesSidebar") +
			addCheckBox("Filter Option", "defaultObject.layout.enableFilterOption") +
			addCheckBox("View Option", "defaultObject.layout.enableViewOption") +
			addCheckBox("Shrinking Posts", "defaultObject.layout.enableShrinkedPosts") +
			addCheckBox("Shrinking For All", "defaultObject.layout.enableShrinkingForAll") +
			addCheckBox("Images Auto Height", "defaultObject.layout.enableImagesAutoHeight") +
			addCheckBox("Infinite Scroll", "defaultObject.layout.enableInfiniteScroll")
		);

		elem.find(".related > div").append(
			addCheckBox("Enable Related Posts", "defaultObject.relatedPosts.enable") +
			addInput("Title", "defaultObject.relatedPosts.title") +
			addInput("Max Results", "defaultObject.relatedPosts.maxResults", true)
		);

		elem.find(".error > div").append(
			addInput("First header", "defaultObject.errorPage.header1st") +
			addInput("Second Header", "defaultObject.errorPage.header2nd") +
			addInput("Message Content", "defaultObject.errorPage.message") +
			addCheckBox("Enable Featured Posts", "defaultObject.errorPage.enableFeaturedPosts") +
			addInput("Featured Posts Max Results", "defaultObject.errorPage.featuredPostsMaxResults", true)
		);

		makeCheckBox();

		$("section").on("submit", ".theme_options form", function(evt) {
			evt.preventDefault();
		
			var elem = $(this),
				monthsValues = [],
				newValues = [];

				elem.find("input.month").each(function(){
					var itemValue = $(this).val();
					monthsValues.push(itemValue);
				});

				elem.find("input.all_months").val(monthsValues.join(" "));

				elem.find("input:not(.month)").each(function(){
					
					var itemValue = $(this).val();

					if ( itemValue == "on" ) {
						newValues.push(true);

					} else if ( itemValue == "off" ) {
						newValues.push(false);

					} else {
						newValues.push(itemValue);
					}
				});

				console.log(newValues);

				newCode = "<b:with value='{ text: { sideMenu: &quot;" + newValues[0] + "&quot;, menu: &quot;" + newValues[1] + "&quot;, followOn: &quot;" + newValues[2] + "&quot;, shareTo: &quot;" + newValues[3] + "&quot;, filter: &quot;" + newValues[4] + "&quot;, view: &quot;" + newValues[5] + "&quot;, expandPosts: &quot;" + newValues[6] + "&quot;, shrinkPosts: &quot;" + newValues[7] + "&quot;, followByEmailMessage: &quot;" + newValues[8] + "&quot;, backToTop: &quot;" + newValues[9] + "&quot;, emotions: &quot;" + newValues[10] + "&quot;, emotionsInfo: &quot;" + newValues[11] + "&quot;, monthsNames: &quot;" + newValues[12] + "&quot; }, layout: { enableLightStyle: " + newValues[13] + ", enableWavyStyle: " + newValues[14] + ", enableStickyHeader: " + newValues[15] + ", enableStickySidebar: " + newValues[16] + ", enableIndexSidebar: " + newValues[17] + ", enablePagesSidebar: " + newValues[18] + ", enableFilterOption: " + newValues[19] + ", enableViewOption: " + newValues[20] + ", enableShrinkedPosts: " + newValues[21] + ", enableShrinkingForAll: " + newValues[22] + ", enableImagesAutoHeight: " + newValues[23] + ", enableInfiniteScroll: " + newValues[24] + " }, relatedPosts: { enable: " + newValues[25] + ", title: &quot;" + newValues[26] + "&quot;, maxResults: &quot;" + newValues[27] + "&quot; }, errorPage: { header1st: &quot;" + newValues[28] + "&quot;, header2nd: &quot;" + newValues[29] + "&quot;, message: &quot;" + newValues[30] + "&quot;, enableFeaturedPosts: " + newValues[31] + ", featuredPostsMaxResults: &quot;" + newValues[32] + "&quot; } }' var='theme'>";

				$(".output_view").find("textarea").val(newCode);
				UIkit.modal($(".output_view")[0]).show();

		});

	}, menuToolForm = function () {

		$("section").on("change", ".menu_tool form input.list", function(evt) {
			$(this).parents("form").first().data("action", "list");
		});

		$("section").on("change", ".menu_tool form input.mega", function(evt) {
			$(this).parents("form").first().data("action", "mega");
		});

		$("section").on("submit", ".menu_tool form", function(evt) {
			evt.preventDefault();
		
			var elem = $(this);

			if ( elem.data("action") == "list" ) {

				var listItemTitle = elem.find('#listItemTitle').val(),
					listItemUrl = elem.find('#listItemUrl').val();
				elem.find('pre.ls').removeClass('prettyprinted');
				if( listItemTitle == "" | listItemUrl == "" ){
					elem.find('pre.ls').html('<b class="text-danger">ERROR: Fill in all form inputs</b>')
				} else {
					elem.find('pre.ls').html('&lt;li&gt;&lt;a href="'+listItemUrl+'"&gt;'+listItemTitle+'&lt;/a&gt;&lt;/li&gt;<br>');
				}

			} else if ( elem.data("action") == "mega" ) {

				var megaMenuTitle = elem.find('#megaMenuTitle').val(),
					megaLabelName = elem.find('#megaLabelName').val();
				elem.find('pre.mm').removeClass('prettyprinted');
				if( megaMenuTitle == "" | megaLabelName == ""){
					elem.find('pre.mm').html('<b class="text-danger">ERROR: Fill in all form inputs</b>')
				} else {
					elem.find('pre.mm').html('&lt;li&gt;&lt;a href="#"&gt;'+megaMenuTitle+'&lt;/a&gt;<br>  &lt;div class="mega" data-label="'+megaLabelName+'"&gt;&lt;/div&gt;<br>&lt;/li&gt;');
				}

			}

			prettyPrint();

		});
		
	};

	"" == window.location.hash ? (window.location.hash = "overview", $("section").html(overview)) : getPage(false);

	makeCheckBox();

	$("html").on("click", ".sidenav .nav a", function(evt) {
		evt.preventDefault();	
		window.location.hash = $(this).attr("href");	
	}).on("click", ".sidenav .rtl .checkbox_group", function(evt) {
		evt.preventDefault();
		$(this).hasClass("checked") ? $("body").addClass("show_rtl") : $("body").removeClass("show_rtl");
	});

//	$(".sidenav .rtl .checkbox_group").hasClass("checked") && $("body").addClass("show_rtl");

	$(window).on('hashchange', function() {
		getPage(true);
	});

});