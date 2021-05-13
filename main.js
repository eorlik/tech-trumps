// Declare global variables
let emails = new Array; // This holds all the emails from selected cards.
const emailList = new Array; // This holds all emails in the JSON array.

//create a card and populate it for a given object from an array. The object should have key/value pairs for 'name', 'bio' etc.
createCard = (person) => {
        //Create a card div for the person, and make it look a bit skew-whiff using CSS transform
        const card = document.createElement("div"); card.className = "card";
            const angle = (Math.random()*1.8-0.9);
            card.style.transform = `rotate(${angle}deg)`;
            document.getElementById("container").append(card);

        //Store the person's email the emailList array
        emailList.push(person.email)

        //Create p and ul HTML elements for each attribute, and fill them with the person's values. This uses JQuery.
        const nameElement = $("<p id='name'>").text(person.name);
        const gradeElement = $("<div id='grade'>").text(person.grade);
        const pronounsElement = $("<div id='pronouns'>").text(person.pronouns);
        const teamElement = $("<p id='team'>").text(person.team);
        const bioElement = $("<p id='bio'>").text(person.bio);
        const lmElement = $("<p id='manager'>").text("LM: " + person.manager);
        const ul = document.createElement("ul"); ul.id = "foci";
        //Create an emoji element. The emoji is picked from the emoji array above if the object's team name matches one in the emoji array.
        const emojiElement = $("<span id='emoji'>").text(emoji[person.team]);
        //Create invisible tag HTML element, which will be searchable
        const tagElement = $("<ul id='tags' style='display:none'>");
        const treeButton = $("<div class='tree'>").text('⋔').attr('onclick', 'buildFamily(people['+people.indexOf(person)+'])');

        //Populate the foci and tag ul elements with the person's interests/tags - but only if the foci array exists to avoid empty lists.
        //Then append the populated elements to the card div.
        if (Array.isArray(person.foci)) {
            ul.innerHTML = "Interests";
            person.foci.forEach( item => {
                let li = document.createElement("li");
                ul.append(li);
                li.innerHTML = item;}) }

        if (Array.isArray(person.tags)) {
            tagElement.innerHTML = "Tags";
            person.tags.forEach( item => {
                let li = document.createElement("li");
                tagElement.append(li);
                li.innerHTML = item;}) }

        $(card).append(nameElement);
        $(card).append(teamElement);
        $(card).append(bioElement);
        $(card).append(ul);
        $(card).append(lmElement);
        $(teamElement).before(emojiElement);
        if (person.grade){$(card).append(gradeElement)};
        if (person.pronouns){$(card).append(pronounsElement)};
        $(card).append(tagElement);
        $(card).append(treeButton);
            }

//Change card state when clicked and add email from corresponding index in emailsList variable
selectCard = () => {
        let anchors = document.getElementsByClassName('card');
        let trees = document.getElementsByClassName('tree');
        for(let i = 0; i < anchors.length; i++) {
            let anchor = anchors[i];
            let tree = trees[i];
            anchor.onclick = function() {
                if($(".tree:hover").length == 0){
               anchor.classList.toggle("cardClicked");
               let addressToSave = emailList[i];
               if ( emails.includes(addressToSave))
                {   emails.splice(emails.indexOf(addressToSave),1);
                    } else {;
                    emails.push(addressToSave)
               ;
               }
               if (emails.length !== 0){
                    document.getElementById("dummytext").style.display = "none";
                    document.getElementById("copyButton").style.display = "";
                    document.getElementById("clearButton").style.display = "";
                } else {
                    document.getElementById("dummytext").style.display = "";
                    document.getElementById("copyButton").style.display = "none";
                    document.getElementById("clearButton").style.display = "none";
                };
                document.getElementById("email-addresses").innerHTML = emails;
            }
        };}
    }

//jquery search box
search = () => {
    const searchBox = document.getElementById("searchbox");
    searchBox.onkeyup = function() {
      var value = $(this).val().toLowerCase().replace(/\s*$/,"");
      $(".card").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
//highlight searched text
      $(".results").removeClass("results");
      $(".card > p, .card > ul > li").each(function () {
        if (value != "" && $(this).text().search(new RegExp(value,'gi')) != -1) {
         $(this).addClass("results")
        }});
    };
  };

copytoclipboard = () => {
    const elm = document.createElement("textarea");
    elm.value = emails;
    document.body.appendChild(elm);
    elm.select();
    document.execCommand("copy");
    document.body.removeChild(elm);
    alert("Copied the text: " + elm.value);
}

clearSelection = () => {
    emails = [];
    let clickedCards = document.querySelectorAll(".cardClicked");
    document.getElementById("email-addresses").innerHTML = emails;
    document.getElementById("dummytext").style.display = "";
    document.getElementById("copyButton").style.display = "none";
    document.getElementById("clearButton").style.display = "none";
    clickedCards.forEach(card => {
        card.classList.remove("cardClicked")
    })
}

//Start searching on keydown and clear searchbox on esc key
 typeToSearch = (e) => {
    const searchbox = document.getElementById("searchbox");
    const protectedKeys = [9,13,16,17,18,20,91,46,37,38,39,40,8,44];

    if(e.key == "Escape") {
        searchbox.value = "";
      $(".card").show()}
    else if (!protectedKeys.includes(e.keyCode))
     {searchbox.focus();}
 };

//Zoom slider
$("#slider").on("input",function () {
            $('.card').css("font-size", $(this).val() + "%");
    });
