//burger menu
let burgerBtn = document.querySelector('.burger-btn'),
    burgerWindow = document.querySelector('.burger-menu'),
    burgerMenu = document.querySelector('.burger'),
    closeBtn = document.querySelector('.close-btn p');

burgerBtn.onclick = function (){
    burgerWindow.style.zIndex = '10';
    burgerMenu.style.transform = 'translateX(0%)';
}
closeBtn.onclick = function (){
    burgerMenu.style.transform = 'translateX(100%)';
    setTimeout(function(){
      burgerWindow.style.zIndex = '-1';
    },500);  
}

//nav underline slide on mouseover
let navField = document.querySelector('.nav');
let navActive = document.querySelector('.nav-active');
let xActive = navActive.offsetLeft + navActive.offsetWidth/2;

navField.style.setProperty('--underlinePos', xActive+'px');

navField.onmousemove = function(e){
    let x = e.offsetX;
    this.style.setProperty('--underlinePos', x +'px');
}
navField.onmouseout = function(){
    this.style.setProperty('--underlinePos', xActive+'px');
}

// railway and multimodal buttons for service.html
let curtains = {
    curtains: document.querySelector('.curtains'),
    curLeft: document.querySelector('.cur-left'),
    curRight: document.querySelector('.cur-right'),
    openCur: function(){
        this.curtains.style.zIndex = '15';
        this.curLeft.style.left = '0';
        this.curRight.style.right = '0';
    },
    closeCur: function(){
        this.curtains.style.zIndex = '-1';
        this.curLeft.style.left = '-50%';
        this.curRight.style.right = '-50%';
       }
    },

    blogs={
        windowBlogs: document.querySelector('.window-blogs'),
        rwBlog:document.querySelector('.rw-blog'),
        mmBlog:document.querySelector('.mm-blog'),
        headerBtn:document.querySelector('.header-btn'),
        heightBlog:document.querySelector('.posRelative'),
        showBlog:function (blog){
            y = window.pageYOffset;
            yBot = y + blog.offsetHeight;
            this.windowBlogs.style.visibility = 'visible';
            blog.style.top = y+'px';
            this.headerBtn.style.top = '0';
            this.heightBlog.style.height = '350vh';
            // scroll limit
            window.onscroll = function (){
                let scrollTop = window.pageYOffset,
                    scrollBot = scrollTop + window.innerHeight;
                if (scrollTop<y) window.scrollTo(0,y);
                if (scrollBot>yBot) window.scrollBy(0,-30);
            };
        },
        hideBlog: function (blog){
            blog.style.top = '100%';
            this.headerBtn.style.top = '-10%';
            this.windowBlogs.style.visibility = 'hidden';
            this.heightBlog.style.height = '100vh';
            //scroll unlimit
            window.onscroll = function (){};
        }
    },
    currentBlog,
    y,
    yBot;

// show and hide
function showcase (servise){
    curtains.openCur();

    if (servise.hasAttribute("target")) currentBlog = blogs.rwBlog
    else currentBlog = blogs.mmBlog;

    blogs.showBlog(currentBlog);
};

function hidecase (){
    curtains.closeCur();
    blogs.hideBlog(currentBlog);
}