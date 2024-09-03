import sublinks from "./data.js";

const toggleBtn = document.querySelector('.toggle-btn')
const closeBtn = document.querySelector('.close-btn')
const sidebarWrapper = document.querySelector('.sidebar-wrapper')
const sidebar = document.querySelector('.sidebar-links')
const linkBtns = [...document.querySelectorAll('.link-btn')]
const submenu = document.querySelector('.submenu')
const hero = document.querySelector('.hero')
const nav = document.querySelector('.nav')

closeBtn.addEventListener('click', ()=>{
    console.log('Removendo a class Show')
    if(sidebarWrapper.classList.contains('show')){
        sidebarWrapper.classList.remove('show')
    }
})

toggleBtn.addEventListener('click', ()=>{
    console.log('Adicionando a classe Show')
    if(!sidebarWrapper.classList.contains('show')){
        sidebarWrapper.classList.add('show')
    }
})
console.log(submenu)
// set side bar
console.table(sublinks)
sidebar.innerHTML = sublinks.map((link)=>{
    const {links, page} = link
    return `
    <article>
        <h4>${page}</h4>
        <div class="sidebar-sublinks">
            ${links.map((item)=> {
                const {label, icon, url} = item
                return `
                <a href = "${url}">
                    <i class ="${icon}"></i>${label}
                </a>
                `
            }).join('')}
        </div>
    </article>
    `
}).join('')
linkBtns.forEach((btn)=>{
    btn.addEventListener('mouseover', function(e){
        // rastreando coordenadas
        const text = e.currentTarget.textContent
        const tempBtn = e.currentTarget.getBoundingClientRect()
        const center = (tempBtn.left + tempBtn.right) / 2
        const bottom = tempBtn.bottom - 3
        const tempPage = sublinks.find(({page})=>page === text)
        if(tempPage){
            const {page, links} = tempPage
            console.log(links)
            submenu.classList.add('show')
            submenu.style.left = `${center}px`
            submenu.style.top = `${bottom}`
            // estritamente opcional

            let columns = 'col-2'
            if(links.length === 3){
                columns = 'col-3'
            }
            if(links.length > 3){columns = 'col-4'}
            submenu.innerHTML = `
                <section>
                <h4>${page}</h4>
                <div class="submenu-center ${columns}">
                    ${links.map(({label, icon, url})=> {
                        return `<a href="${url}"> <i class="${icon}"></i>${label}</a>`
                    }).join('')
                    }
                </div>
                </section>
            `
        }
        
    })
})
hero.addEventListener('mouseover', function(e){
    submenu.classList.remove('show')
})
nav.addEventListener('mouseover', function(e){
    if(!e.target.classList.contains('link-btn')){submenu.classList.remove('show')}
})