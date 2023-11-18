let todoList = { tasks: [] }
const menuButton = document.querySelector('.menu-button')
const menu = document.querySelector('.menu')
const formContainer = document.querySelector('.input-item-container')
const listContainer = document.querySelector('.list')
const buttonShowForm = document.querySelector('.add-item')
const buttonRemoveItem = document.querySelector('.remove-item')
const buttonEditItem = document.querySelector('.edit-item')
const formTitle = document.querySelector('.input-item-title')
const formText = document.querySelector('.input-item-text')
const sentItemElement = document.querySelector('.send-item')
const closeFormButton = document.querySelector('.close-form')
let itemSelected
let object
let currentDate


//מאזין ללחיצה על הרקע
listContainer.addEventListener('click', closeMenu)



//מאזין ללחיצה על השלוש נקודות
menuButton.addEventListener('click', openMenu)


//פתיחת התפריט בלחיצה על השלוש נקודות
function openMenu() {
    //הגובה נקבע לפי כמות הפרטים שיש בתפריט כל אחד 53
    menu.style.height = menu.style.height === '106px' ? closeMenu() : '106px'
}

//סגירת התפריט בלחיצה על המסך
function closeMenu() {
    menu.style.height = '0'
}



//כפתור לסגירת ההוספ משימה
closeFormButton.addEventListener('click', () => {
    formContainer.style.display = 'none'
    listContainer.style.filter = 'blur(0px)'
})






// פונקציה ליבוא הנתונים השמורים למערך
window.addEventListener('load', () => {
    const storeData = localStorage.getItem('todoList')
    if(storeData) {
        todoList = JSON.parse(storeData)
    }

    updateUi()
})






/**
 * מאזין ללחיצה על כפתור הוספת משימה
 * מציג את הטופס להוספת רשימה
 */
buttonShowForm.addEventListener('click', () => {
    listContainer.style.filter = 'blur(4px)'
    formTitle.value = ''
    formText.value = ''
    formContainer.style.display = 'block'
})




// פונקציה לשמירת הנתונים באחסון של הדפדפן
function saveToLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList))
}


//מאזין אירועים להוספת משימה
sentItemElement.addEventListener('click', addItem)

// פונקציה להוספת משימה למערך 
function addItem() {
    if (!object) {
        const item = {
            id: todoList.tasks.length + 1,
            title: formTitle.value,
            text: formText.value,
            compleited: false,
            date: getCurrentDate() + ' :נוצר בתאריך'
        }
        todoList.tasks.push(item)    
    } else {
        object.title = formTitle.value
        object.text = formText.value
        object.date = getCurrentDate() + ' :נערך בתאריך'
    }
    saveToLocalStorage()
    formContainer.style.display = 'none'
    listContainer.style.filter = 'blur(0px)'
    updateUi()
    object = undefined
}




/**
 * פונקציה לפתיחה או סגירה של המשימה
 * @param {מיקום האובייקט במערך} index 
 * @param {הדיב שמכיל את המשימה} div 
 */
function opemTask(index, itemBody) {
    itemBody.style.display = itemBody.style.display === 'block' ? 'none' : 'block'
    itemSelected = index
    showRemoveItem()
}


//מציג את האפשרות למחוק משימה
function showRemoveItem() {
    buttonRemoveItem.style.display = 'inline-block'
    buttonEditItem.style.display = 'inline-block'
}


//עריכת משימה
buttonEditItem.addEventListener('click', () => {
    object = todoList.tasks[itemSelected]
    formTitle.value = object.title
    formText.value = object.text
    listContainer.style.filter = 'blur(10px)'
    formContainer.style.display = 'block'
})


//מחיקת משימה מהמערך
buttonRemoveItem.addEventListener('click', () => {
    todoList.tasks.splice(itemSelected, 1)
    saveToLocalStorage()
    buttonRemoveItem.style.display = 'none'
    buttonEditItem.style.display = 'none'
    formContainer.style.display = 'none'
    listContainer.style.filter = 'blur(0px)'
    updateUi()
}) 




/**
 * פונקציה לשינוי הסטטוס של משימה
 * @param {מיקום של האובייקט במערך} index 
 * @param {הכפתור שמשנים לו עיצוב בהתאם למצב} btn 
 * @param {הכותרת שמשתנה לה העיצוב בהתאם למצב} h1 
 */
function setStatusItem(index, btn, h1) {
    todoList.tasks[index].compleited = !todoList.tasks[index].compleited

    if(todoList.tasks[index].compleited) {
        todoList.tasks[index].compleited = true
        btn.classList.add('done-button-click')
        h1.classList.add('header-item-click')
        btn.textContent = 'לא בוצע'
    } else {
        todoList.tasks[index].compleited = false
        btn.classList.remove('done-button-click')
        h1.classList.remove('header-item-click')
        btn.textContent = 'בוצע'
    }

    saveToLocalStorage()
}



/**
 * פונקציה שמחזירה תאריך במחרוזת בסדר
 * dd/mm/yyyy
 */
function getCurrentDate() {
    currentDate = new Date()

    let day = currentDate.getDate()
    let month = currentDate.getMonth() + 1
    let year = currentDate.getFullYear()
    let formatDate = day + '/' + month + '/' + year

    return formatDate
}





/**
 * פונקציה לרינדור המשימות
 * לוקח את המערך משימות מהאובייקט רשימת משימות 
 * יוצר את המשימות על המסך
 */
function updateUi() {
    date = new Date()
    listContainer.innerHTML = ''

    todoList.tasks.map((item, index) => {
        const itemElement = document.createElement('div')
        itemElement.classList.add('item')
        itemElement.addEventListener('click', (event) => {
            if(!event.target.matches('.itemDoneBtn')) {
                opemTask(index, itemBody)
            }
        })
        
        const itemHeader = document.createElement('div')
        itemHeader.classList.add('item-header')

        //אובייקט תאריך
        const itemDate = document.createElement('p')
        itemDate.classList.add('item-date')
        itemDate.textContent = item.date
        
        const itemDoneBtn = document.createElement('button')
        itemDoneBtn.classList.add('done-button')
        itemDoneBtn.textContent = item.compleited ? 'לא בוצע' : 'בוצע'
        itemDoneBtn.addEventListener('click', (event) => {
            event.stopPropagation()
            setStatusItem(index, itemDoneBtn, itemTitle)
        })

        const itemTitle = document.createElement('h1')
        itemTitle.classList.add('item-title')
        itemTitle.textContent = item.title
        
        const itemBody = document.createElement('div')
        itemBody.classList.add('item-body')

        const itemSeparator = document.createElement('hr')
        itemSeparator.classList.add('item-separator')

        const itemParagraph = document.createElement('p')
        itemParagraph.classList.add('item-paragraph')
        itemParagraph.textContent = item.text

        if(item.compleited) {
            itemDoneBtn.classList.add('done-button-click')
            itemTitle.classList.add('header-item-click')
        } else {
            itemDoneBtn.classList.remove('done-button-click')
            itemTitle.classList.remove('header-item-click')
        }
        
        itemHeader.appendChild(itemDoneBtn)
        itemHeader.appendChild(itemTitle)
        itemBody.appendChild(itemSeparator) 
        itemBody.appendChild(itemParagraph)
        itemBody.appendChild(itemDate)
        itemElement.appendChild(itemHeader)
        itemElement.appendChild(itemBody)
        listContainer.appendChild(itemElement)
    })
}




/**
 * ניהול והחלפת ברכת השעה 
 * בוקר טוב בין השעות  5-12
 * צהריים טובים בין השעות 12-17
 * ערב טוב בין השעות 17-21
 * לילה טוב בין השעות  21-5
 */

const headerTime = document.querySelector('.header-time')
const currentTime = new Date()
const hours = currentTime.getHours()

if(hours >= 5 && hours < 12) {
    headerTime.textContent = 'בוקר טוב'
} else if (hours >= 12 && hours < 17) {
    headerTime.textContent = 'צהריים טובים'
} else if (hours >= 17 && hours < 21) {
    headerTime.textContent = 'ערב טוב'
} else {
    headerTime.textContent = 'לילה טוב'
}






/**
 * שמירה של הנתונים בקובץ נפרד 
 * להוסיף אפשרות עריכת משימה
 */
