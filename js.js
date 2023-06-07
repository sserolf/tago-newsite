// VARIABLES
let changeES;
let changeEN;
let content;
let menu;
let navPage;
let menuItems;
let links;
let yt_video;
let yt;
let spoti;
let apple;
let logo;
let language;
let loading;
let loadingImg;
let flags;

window.onload = () => {
  // INITIALIZE VARIABLES
  changeES = document.getElementById('changeES');
  changeEN = document.getElementById('changeEN');
  flags = document.getElementsByClassName('flag');
  menu = document.getElementById('menu');
  navPage = document.getElementById('navPage');
  menuItems = document.getElementsByClassName('menu-items');
  links = document.getElementsByClassName('link');
  yt_video = document.getElementById('yt_video_img');
  yt = document.getElementById('yt_img');
  spoti = document.getElementById('spoti_img');
  apple = document.getElementById('apple_img');
  logo = document.getElementById('logo_img');

  // EVENTS
  content.onclick = () => {
    if (navPage.classList.contains('nav-page-active')) {
      menu.onclick();
    }
  }

  content.addEventListener('touchstart', function(event) {
    if (navPage.classList.contains('nav-page-active')) {
      menu.onclick();
    }
  });

  logo.onclick = () => {
    window.location = '#';
    content.scrollTo(0, 0);
  }
  
  menu.onclick = () => {
    if (navPage.classList.contains('nav-page-active')) {
      navPage.classList.remove('nav-page-active');
      for (let index = 0; index < menuItems.length; index++) {
        menuItems[index].style.opacity = 0;
      }
      if (flags) {
        flags[0].style.opacity = 0;
        flags[1].style.opacity = 0;
      }
      setTimeout(() => {
        navPage.style.display = 'none';
      }, 301);
    } else {
      navPage.style.display = 'block';
      setTimeout(() => {
        navPage.classList.add('nav-page-active');
        for (let index = 0; index < menuItems.length; index++) {
          menuItems[index].style.opacity = 1;
        }
        if (flags) {
          flags[0].style.opacity = 1;
          flags[1].style.opacity = 1;
        }  
      }, 1);
    }
  }

  for (let index = 0; index < links.length; index++) {
    links[index].onclick = () => {
      menu.onclick();
    }
  }

  yt_video.onclick = () => {
    window.open('https://www.youtube.com/channel/UCTUvdlbnJ0Yr1MISJ23xjeg');
  }
  yt.onclick = () => {
    window.open('https://music.youtube.com/channel/UC9mp0A_fqHokuN4m7T7kV-A?feature=share');
  }
  spoti.onclick = () => {
    window.open('https://open.spotify.com/artist/4jccI25PqKPNcD95vHMpaS?si=tw2A6SfvS0y_QY45Mq-aRg');
  }
  apple.onclick = () => {
    window.open('https://music.apple.com/es/artist/tago-mago/1629387378');
  }

  // LANGUAGE
  const getJson = (language) => {
    language.toUpperCase() == 'ES' ? flags[0].style.textDecoration = 'underline' : flags[1].style.textDecoration = 'underline';
    const http = new XMLHttpRequest();
    http.open('GET', 'languages/' + language.toUpperCase() + '.json');
    http.send();
    http.onreadystatechange = (res) => {
      if (res.target.readyState == 4 && res.target.status == 200) {
        changeLanguageValues(JSON.parse(res.target.response));
      }
    };
  }

  const changeLanguage = () => {
    showLoading();
    const gigsContainer = document.getElementById('gigsContainer');
    const pastGigsContainer = document.getElementById('pastGigsContainer');
    const spotifyContainer = document.getElementById('spotifyIframe');
    const newsContainer = document.getElementById('newsContainer');
    const historyContainer = document.getElementById('historyContainer');
    const contactContainer = document.getElementById('contactContainer');
  
    gigsContainer ? gigsContainer.remove() : null;
    pastGigsContainer ? pastGigsContainer.remove() : null;
    spotifyContainer ? spotifyContainer.remove() : null;
    newsContainer ? newsContainer.remove() : null;
    historyContainer ? historyContainer.remove() : null;
    contactContainer ? contactContainer.remove() : null;
    language = document.cookie.split('language=')[1];
    if (language) {
      getJson(language);
    } else {
      const navLanguage = window.navigator.userLanguage || window.navigator.language;
      language = navLanguage.toLowerCase().indexOf('es') > -1 ? 'ES' : 'EN';
      getJson(language);
    }
  }

  const test = (newLanguage) => {
    document.cookie = 'language=' + newLanguage.toLowerCase();
    changeLanguage();
  }

  changeES.onclick = (event) => {
    if (language && language.toUpperCase() != 'ES') {
      flags[0].style.textDecoration = 'none';
      flags[1].style.textDecoration = 'none';
      event.target.style.textDecoration = 'underline';
      test('ES');
    }
  }

  changeEN.onclick = (event) => {
    if (language && language.toUpperCase() == 'ES') {
      flags[0].style.textDecoration = 'none';
      flags[1].style.textDecoration = 'none';
      event.target.style.textDecoration = 'underline'
      test('EN');
    }
  }

  changeLanguage();

  const changeLanguageValues = (template) => {
    const isMobile = /iPhone|iPad|iPod|Android|Mac|MAC/i.test(navigator.userAgent);
    if (isMobile) {
      changeES.innerText = '🇪🇸';
      changeEN.innerText = '🇬🇧';
    } else {
      changeES.innerText = 'ES';
      changeEN.innerText = 'EN';
    }

    Object.entries(template).forEach(entry => {
      const [key, value] = entry;
      if (key.indexOf('body') > -1) {
        document.getElementById(key).style.cssText = value;
      }

      if (key.indexOf('content') > -1) {
        const contentId = key.split('_content')[0];
        let contentIdContainer = document.getElementById(contentId);
        let container = document.createElement('div');
        if (typeof(value) == 'object') {
          Object.entries(value).forEach(contentEntry => {
            const [contentKey, contentValue] = contentEntry;
            let newsTitle = document.createElement('h3');
            newsTitle.innerText = contentValue.split('||')[0];
            container.appendChild(newsTitle);
            for (let index = 1; index < contentValue.split('||').length - 1; index++) {
              let newsContent = document.createElement('p');
              newsContent.innerHTML = contentValue.split('||')[index];
              container.appendChild(newsContent);
            }
            const lastValue = contentValue.split('||')[contentValue.split('||').length - 1];
            if (lastValue.indexOf('jpg') > -1 || lastValue.indexOf('jpeg') > -1 || lastValue.indexOf('png') > -1 || lastValue.indexOf('gif') > -1) {
              let newsImg = document.createElement('img');
              newsImg.src = lastValue;
              container.appendChild(newsImg);
            } else {
              let newsContent = document.createElement('p');
              newsContent.innerText = lastValue;
              container.appendChild(newsContent);
            }
          });
        } else {
          for (let index = 0; index < value.split('||').length; index++) {
            if (value.split('||')[index].toLowerCase().indexOf('jpg') > -1 || value.split('||')[index].toLowerCase().indexOf('jpeg') > -1 || value.split('||')[index].toLowerCase().indexOf('png') > -1 || value.split('||')[index].toLowerCase().indexOf('gif') > -1) {
              let historyImg = document.createElement('img');
              historyImg.src = value.split('||')[index];
              container.appendChild(historyImg);
            } else {
              let historyContent = document.createElement('p');
              historyContent.innerText = value.split('||')[index];
              container.appendChild(historyContent);
            }
          }
        }
        container.setAttribute('id', contentId + 'Container');
        contentIdContainer.appendChild(container);
      }

      if (key.indexOf('iframe') > -1) {
        const iframeId = key.split('_iframe')[0];
        const iframeIdContainer = document.getElementById(iframeId);
        const spotifyIframe = document.createElement('iframe');
        Object.entries(value).forEach(iframeEntry => {
          const [iframeKey, iframeValue] = iframeEntry;
          spotifyIframe.setAttribute(iframeKey, iframeValue);
        });
        spotifyIframe.setAttribute('id', 'spotifyIframe');
        iframeIdContainer.appendChild(spotifyIframe);
      }

      if (key.indexOf('img') > -1) {
        document.getElementById(key).src = value;
      }

      if (key.indexOf('link') > -1) {
        let link = key.split('navPage_')[1].split('_link')[0];
        document.getElementById(key).innerText = value;
        document.getElementById(key).href = '#' + link.toLowerCase();
      }

      if (key.indexOf('text') > -1) {
        document.getElementById(key).innerText = value;
      }

      if (key.indexOf('ul_') > -1) {
        const ulId = key.split('ul_')[1];
        const ul = document.createElement('ul');
        const ulPastGigs = document.createElement('ul');
        ul.setAttribute('id', ulId + 'Container');
        ulPastGigs.setAttribute('id', 'pastGigsContainer');
        let li;
        Object.entries(value).forEach(ulEntry => {
          const [ulKey, ulValue] = ulEntry;
          Object.entries(ulValue).forEach(ulValueValue => {
            const [key1, value1] = ulValueValue;
            li = document.createElement('li');
            let span1;
            if (key1.indexOf('||') > -1) {
              span1 = document.createElement('a');
              span1.innerText = key1.split('||')[0];
              span1.href = key1.split('||')[1];
              span1.target = '_blank';
              span1.style.textDecoration = 'underline';
            } else {
              span1 = document.createElement('span');
              span1.innerText = key1;
            }
            if (ulId == 'gigs') {
              span1.classList.add('leftGig');
            } else {
              span1.classList.add('left');
            }
            let span2;
            if (value1.indexOf('||') > -1) {
              span2 = document.createElement('a');
              span2.innerText = value1.split('||')[0];
              span2.href = value1.split('||')[1];
              span2.target = '_blank';
              span2.style.textDecoration = 'underline';
            } else {
              span2 = document.createElement('span');
              span2.innerText = value1;
            }
            if (ulId == 'gigs') {
              span2.classList.add('rightGig');
              if (new Date(value1) < new Date()) {
                const day = new Date(span2.innerText).getDate().toString().length > 1 ? new Date(span2.innerText).getDate() : '0' + new Date(span2.innerText).getDate();
                const month = (new Date(span2.innerText).getMonth() + 1).toString().length > 1 ? (new Date(span2.innerText).getMonth() + 1) : '0' + (new Date(span2.innerText).getMonth() + 1);
                span2.innerText = day + '/' + month + '/' + new Date(span2.innerText).getFullYear();
              }
            } else {
              span2.classList.add('right');
            }
            li.appendChild(span1);
            li.appendChild(span2);
            if (ulId == 'gigs' && new Date(value1) < new Date()) {
              ulPastGigs.prepend(li);
            } else {
              ul.appendChild(li);
            }
          });
        });
        if (ulId == 'gigs') {
          const ulTitle = document.createElement('li');
          ulTitle.classList.add('ulTitle');
          ulTitle.innerHTML = language.toLowerCase() == 'es' ? 'Próximos Conciertos'.toUpperCase() : 'Upcoming Gigs'.toUpperCase();
          const ulPastTitle = document.createElement('li');
          ulPastTitle.classList.add('ulTitle');
          ulPastTitle.innerHTML = language.toLowerCase() == 'es' ? 'Conciertos Anteriores'.toUpperCase() : 'Past Gigs'.toUpperCase();
          ul.children.length >= 1 ? ul.prepend(ulTitle) : null;
          ulPastGigs.prepend(ulPastTitle);
          document.getElementById(ulId).appendChild(ul);
          ulPastGigs.children.length > 1 ? document.getElementById(ulId).appendChild(ulPastGigs) : null;
        } else {
          document.getElementById(ulId).appendChild(ul);
        }
      }
    });
    
  }

  FB.api(
    '/17841460325620436',
    'GET',
    {"fields":"business_discovery.username(bleemband){media{caption,timestampmedia_type,media_url,children{media_url}}}","access_token":"EAAVXIL0flZBYBAK3g4eokodgGW9aJNBO85lVctD8BzAp7ZCZCSpRbpspU8RQ1QeZAWQdqUJD1Ib1KShqrZBupwgJC2iZCMmviHGpgskVAWuRWO4CYAJImNncFlO7T7qARD0uEBSHHJ2D7iHjZBfH0i117HgNmEYVZCcpqUFCHCgqqbiJ4sfaZARDg5J1nlKz0X3FCmdElqfCgGvRRLy0vTZBp7"},
    function(response) {
        console.log(response);
    }
  );
}

const showLoading = () => {
  content = document.getElementsByClassName('content')[0];
  loading = document.getElementById('loading');
  loadingImg = document.getElementById('loading').firstElementChild;
  const ul = document.getElementById('navPage').firstElementChild;
  ul.style.display = 'none';
  menu.onclick();
  content.style.display = 'none';
  loading.style.display = 'block';
  changeES ? changeES.style.display = 'none' : null;
  changeEN ? changeEN.style.display = 'none' : null;
  setTimeout(() => {
    loading.style.opacity = 1;
    loadingImg.style.opacity = 1;
    setTimeout(() => {
      removeLoading();
    }, 510);
  }, 10);
}

const removeLoading = () => {
  content = document.getElementsByClassName('content')[0];
  loading = document.getElementById('loading');
  loadingImg = document.getElementById('loading').firstElementChild;
  const ul = document.getElementById('navPage').firstElementChild;
  ul.style.display = 'block';
  content.style.display = 'block';
  changeES ? changeES.style.display = 'block' : null;
  changeEN ? changeEN.style.display = 'block' : null;
  setTimeout(() => {
    loading.style.opacity = 0;
    loadingImg.style.opacity = 0;
    setTimeout(() => {
      loading.style.display = 'none';
    }, 501);
  }, 500);
}

document.addEventListener('readystatechange', (event) => {
  if (event.target.readyState === 'complete') {
    removeLoading();
  }
});
