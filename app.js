// set date
const date = document.getElementById('date')
date.innerHTML = new Date().getFullYear()

// toggle links
const navToggle = document.querySelector('.nav-toggle')
const linksContainer = document.querySelector('.links-container')
const links = document.querySelector('.links')

navToggle.addEventListener('click', () => {
  //   linksContainer.classList.toggle('show-links')
  let containerHeight = linksContainer.getBoundingClientRect().height
  //  getBoundingClientRect get the height and other info of the element
  const linksHeight = links.getBoundingClientRect().height
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`
  } else {
    linksContainer.style.height = 0
  }
})

// fixed navbar
const navbar = document.getElementById('nav')
const topLink = document.querySelector('.top-link')
window.addEventListener('scroll', () => {
  const scrollHeight = window.pageYOffset
  //   px that window vertically scrolled
  const navHeight = navbar.getBoundingClientRect().height
  if (scrollHeight > navHeight) {
    navbar.classList.add('fixed-nav')
  } else {
    navbar.classList.remove('fixed-nav')
  }
  //   show the link (arrow up)
  if (scrollHeight > 500) {
    topLink.classList.add('show-link')
  } else {
    topLink.classList.remove('show-link')
  }
})

// ******smooth scroll***************
const scrollLinks = document.querySelectorAll('.scroll-link')

scrollLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    const id = e.currentTarget.getAttribute('href').slice(1)
    // console.log(id)
    const element = document.getElementById(id)
    // console.log(element)

    // calculate the heights
    const navHeight = navbar.getBoundingClientRect().height
    const containerHeight = linksContainer.getBoundingClientRect().height
    // give back true of false
    const fixedNav = navbar.classList.contains('fixed-nav')

    let position = element.offsetTop - navHeight

    if (!fixedNav) {
      // offsetTop: a num representing the top position of the element
      position = position - navHeight
    }
    if (navHeight > 82) {
      position = position + containerHeight
    }
    window.scrollTo({
      left: 0,
      top: position,
    })
    linksContainer.style.height = 0
    // close the linksContainer
  })
})

// *******menu array*********************
const menu = [
  {
    id: 1,
    title: 'Yes or No',
    category: 'Frontend',
    img: './images/1.png',
    desc: 'JS',
    link: 'https://qaz-creator.github.io/yesNo/',
  },
  {
    id: 2,
    title: 'Delivery Master',
    category: 'Frontend',
    img: './images/2.png',
    desc: 'JS',
    link: 'https://dev-cm-svg.github.io/deliveryCompany/',
  },
  {
    id: 3,
    title: 'Bird Clone',
    category: 'Frontend',
    img: './images/3.png',
    desc: 'JS',
    link: 'https://qaz-creator.github.io/clone-bird/',
    github: '',
  },
  {
    id: 4,
    title: 'Basic Login List',
    category: 'Full Stack',
    img: './images/4.png',
    desc: 'MERN',
    link: 'https://mernbasiclogin.herokuapp.com/',
    github: 'https://github.com/qaz-creator/mernBasicLogin',
  },
  {
    id: 5,
    title: 'Todo List',
    category: 'Full Stack',
    img: './images/5.png',
    desc: 'PERN',
    link: 'https://pern-stack-todolist.herokuapp.com/',
    github: 'https://github.com/qaz-creator/pern-todo',
  },
  {
    id: 6,
    title: 'Task System',
    category: 'Full Stack',
    img: './images/6.png',
    desc: 'MERN',
    link: 'https://tasksystemmern.herokuapp.com/',
    github: 'https://github.com/qaz-creator/tasksystem',
  },
  {
    id: 7,
    title: 'Image Board',
    category: 'Full Stack',
    img: './images/7.png',
    desc: 'MERN',
    link: 'https://insblog.herokuapp.com/signin',
    github: 'https://github.com/qaz-creator/imageBoard',
  },
  {
    id: 8,
    title: 'Simple Piano',
    category: 'Frontend',
    img: './images/8piano.png',
    desc: 'JS',
    link: 'https://qaz-creator.github.io/simplePiano',
    github: 'https://github.com/qaz-creator/simplePiano',
  },
  {
    id: 9,
    title: 'Dream List',
    category: 'Frontend-React',
    img: './images/9dream.png',
    desc: 'React',
    link: 'https://dev-cm-svg.github.io/dreamsTracker/',
    github: 'https://github.com/dev-cm-svg/dreamsTracker',
  },
]

const sectionCenter = document.querySelector('.section-center')
const container = document.querySelector('.btn-container')
// map when window load*****************
window.addEventListener('DOMContentLoaded', () => {
  displayMenuItems(menu)
  displayMenuButtons()
})

// filter items
// dataset can be set by yourself, data-

const displayMenuItems = (menuItems) => {
  let displayMenu = menuItems.map((item) => {
    // console.log(item)
    return `
    <article class="menu-item">
        <div class="image-wrapper">

          <a href=${item.link}><img src=${item.img} alt="" class="photo">
          <h3 id = "hover-content">${item.desc}</h3>
          </a>

        </div>
        <div class="project-footer">
          <a href=${item.github}><h4>${item.title}</h4></a>
        </div>
    </article>`
  })
  displayMenu = displayMenu.join('')
  sectionCenter.innerHTML = displayMenu
}

const displayMenuButtons = (menuItems) => {
  // 1. get all the categories in the array initialize with 'all'
  const categories = menu.reduce(
    (values, item) => {
      if (!values.includes(item.category)) {
        values.push(item.category)
      }
      return values
    },
    ['all'],
  )
  // all is the inital values; item: the item inside menu

  // 2. create categoryBtns depending on the array in 1
  const categoryBtns = categories
    .map((category) => {
      return `<button class="filter-btn" data-id="${category}">
    ${category}
</button>`
    })
    .join('')

  //3. insert the buttons to the page
  container.innerHTML = categoryBtns
  const filterBtns = document.querySelectorAll('.filter-btn')

  // 4. execting clicking the button and then show the items
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const category = e.currentTarget.dataset.id
      // get an array with filtered category
      const menuCategory = menu.filter((menuItem) => {
        if (menuItem.category === category) {
          return menuItem
        }
      })

      if (category === 'all') {
        displayMenuItems(menu)
      } else {
        displayMenuItems(menuCategory)
        console.log(menuCategory)
      }
    })
  })
}
