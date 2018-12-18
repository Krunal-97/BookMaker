document.getElementById('siteData').addEventListener('submit',saveInfo)

function saveInfo(event) {
    
    var siteName = document.getElementById('siteName').value
    var siteUrl = document.getElementById('siteUrl').value

    if(!validation(siteName,siteUrl)) {
        return false
    }
    var siteData = {
        site : siteName,
        Url : siteUrl
    }

    if(localStorage.getItem('bookmarks') === null) {
        var bookMarks = [];
        bookMarks.push(siteData);

        var arrayToString = JSON.stringify(bookMarks)
        localStorage.setItem('bookmarks' , arrayToString)
       
    } else {
        var bookMarks = JSON.parse(localStorage.getItem('bookmarks'))
        bookMarks.push(siteData);

        var arrayToString = JSON.stringify(bookMarks)
        localStorage.setItem('bookmarks' , arrayToString)
    }

    document.getElementById('siteData').reset()

    displayInfo()
    event.preventDefault()
}

function validation(siteName,siteUrl) {
    if(!siteName || !siteUrl) {
        alert('Please Fill the Form')
        return false
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression)

    if(!siteUrl.match(regex)) {
        alert('Please Enter Valid Url')
        return false
    }
    return true
}

function deleteBookMark(Url) {
    
    var deleteUrl = Url
    var bookMarks = JSON.parse(localStorage.getItem('bookmarks'))

    for (let index = 0; index < bookMarks.length; index++) {
        
        if (deleteUrl == bookMarks[index].Url) {
            
            bookMarks.splice(index,1)
        }
        
    }
   
    var arrayToString = JSON.stringify(bookMarks)
    localStorage.setItem('bookmarks' , arrayToString)

    displayInfo()
}

function displayInfo() {

    var bookMarks = JSON.parse(localStorage.getItem('bookmarks'))
    var text = document.getElementById('savedInfo')
    text.innerHTML = ""
    //console.log(bookMarks[0].Url)
    for (var index = 0; index < bookMarks.length; index++) {
        
        var Name = bookMarks[index].site
        var Url = bookMarks[index].Url

        text.innerHTML += "<div class = 'displayName'>" + "<span><span class = 'name'>" +  Name  + 
                          "</span><a class = 'visit' target = '_blank' href = '" +Url+ "'>Visit</a>" +
                          '<a onclick = "deleteBookMark(\''+Url+'\')" class = "delete" href = "#"> Delete</a>' + "</span>"
                          "</div>"
    }
}
