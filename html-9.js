let filters = document.querySelector("#filterContent")
let newForm = document.querySelector('#newContent')
let opinions = document.querySelectorAll('.opinion')
let recipes = document.querySelectorAll('.recipe')
let updates = document.querySelectorAll('.update')

function showFilter() {
    if(filters.classList.contains("hidden")) {
        newForm.classList.remove("reveal")
        filters.classList.remove("hidden")
    } else {
        filters.classList.add("hidden")
    }
}

function showAddNew() {
    if(newForm.classList.contains("reveal")) {
        newForm.classList.remove("reveal")
    } else {
        filters.classList.add("hidden")
        newForm.classList.add("reveal")
    }
}

function filterArticles(filter) {
    switch(filter) {
        case 1:
            opinions.forEach(ele => {
                if(ele.classList.contains("hidden")) {
                    ele.classList.remove("hidden")
                } else {
                    ele.classList.add("hidden")
                }
            });
            break;
        case 2:
            recipes.forEach(ele => {
                if(ele.classList.contains("hidden")) {
                    ele.classList.remove("hidden")
                } else {
                    ele.classList.add("hidden")
                }
            });
            break;
        case 3:
            updates.forEach(ele => {
                if(ele.classList.contains("hidden")) {
                    ele.classList.remove("hidden")
                } else {
                    ele.classList.add("hidden")
                }
            });
            break;
    }
}

function highestArticleNumber() {

        let articles = document.querySelectorAll("#articleList article[id^= 'a']")
        let max = 0

        articles.forEach(a => {
            let i = parseInt(a.id.slice(1), 10)
            if (!Number.isNaN(i) && i > max) max = i;
        })

        return max + 1
}

function addNewArticle() {
    let listA = document.querySelector("#articleList")
    let newForm = document.querySelector("#newContent")

    let titleText = document.querySelector("#inputHeader").value.trim()
    let articleText = document.querySelector("#inputArticle").value.trim()
    let articleType = document.querySelector('input[name="articleType"]:checked')

    let label
    let type
    if (!articleType) {
        alert("Select an article type!")
        return
    }
    if (!titleText || !articleText) {
        alert("Please enter a text and title!!!!!!")
        return
    }

    if (articleType.id == "opinionRadio") {
        label = "opinion"
        type = "Opinion"
    }
    if (articleType.id == "recipeRadio") {
        label = "recipe"
        type = "Recipe"
    }
    if (articleType.id == "lifeRadio") {
        label = "update"
        type = "Update"
    }

    let article = document.createElement("article")
    article.classList.add(label)


    let nextId = highestArticleNumber()
    article.id = `a${nextId}`

    let marker = document.createElement("span")
    marker.classList.add("marker")
    marker.textContent = type

    let h2 = document.createElement("h2")
    h2.textContent = titleText

    let pText = document.createElement("p")
    pText.textContent = articleText

    let pRef = document.createElement("p")
    let link = document.createElement("a")
    link.href = "moreDetails.html"
    link.textContent = "Read more..."
    pRef.appendChild(link)

    article.appendChild(marker)
    article.appendChild(h2)
    article.appendChild(pText)
    article.appendChild(pRef)

    listA.appendChild(article)

    newForm.reset()
    newForm.classList.remove("reveal")

    opinions = document.querySelectorAll(".opinion")
    recipes = document.querySelectorAll(".recipe")
    updates = document.querySelectorAll(".update")

}
