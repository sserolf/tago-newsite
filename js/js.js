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
let posts = [];
let pendingPosts = [];
let postsToUse = [];
let allPosts = 0;
let postsCounter = 0;
let oldPostsCounter = 0;

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
    const moreNews_remove = document.getElementById('moreNews_text');
    const resetNews_remove = document.getElementById('resetNews_text');
  
    gigsContainer ? gigsContainer.remove() : null;
    pastGigsContainer ? pastGigsContainer.remove() : null;
    spotifyContainer ? spotifyContainer.remove() : null;
    newsContainer ? newsContainer.remove() : null;
    historyContainer ? historyContainer.remove() : null;
    contactContainer ? contactContainer.remove() : null;
    moreNews_remove ? moreNews_remove.remove() : null;
    resetNews_remove ? resetNews_remove.remove() : null;

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
          addNews(value, container);
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
        if (contentId == 'news') {
          postsCounter = 0;
          pendingPosts = [];        
          posts.length == oldPostsCounter ? callFBApi(posts) : showAllNews(posts);
          let moreNews_button = document.createElement('button');
          let resetNews_button = document.createElement('button');
          moreNews_button.onclick = () => {
            showAllNews(posts);
          }
          moreNews_button.id = 'moreNews_text';
          resetNews_button.onclick = () => {
            resetNews();
          }
          resetNews_button.style.display = 'none';
          resetNews_button.id = 'resetNews_text';
          contentIdContainer.appendChild(moreNews_button);
          contentIdContainer.appendChild(resetNews_button);
        }
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

}

const addNews = (value, container) => {
  posts = [];
  oldPostsCounter = 0;
  Object.entries(value).forEach(contentEntry => {
    const [contentKey, contentValue] = contentEntry;
    posts.push({
      'time': contentValue.split('||')[0].split(' ')[0],
      'caption': contentValue.split('||')[1],
      'media': contentValue.split('||')[contentValue.split('||').length - 1].indexOf('jpg') || contentValue.split('||')[contentValue.split('||').length - 1].indexOf('jpeg') || contentValue.split('||')[contentValue.split('||').length - 1].indexOf('png') || contentValue.split('||')[contentValue.split('||').length - 1].indexOf('gif') ? contentValue.split('||')[contentValue.split('||').length - 1] : undefined,
      'media_type': 'oldPost'
    })
    oldPostsCounter++;
  });
}

const showAllNews = posts => {
  if (allPosts != postsCounter) {
    if (pendingPosts == 0) {
      for (let i = 0; i < posts.length; i++) {
        pendingPosts.push(posts[i]);
      }
    }
    postsToUse = [];
    for (let i = 0; i < 3; i++) {
      if (pendingPosts[i] != undefined) {
        postsToUse.push(pendingPosts[i]);
        postsCounter++;
      }
    }
    pendingPosts.splice(0,3);
    postsToUse.forEach(post => {
      let newsTitle = document.createElement('h3');
      let realTime;
      if (post.time.length > 10) {
        const timeToDate = new Date(post.time);
        const day = timeToDate.getDate().toString().length > 1 ? timeToDate.getDate() : '0' + timeToDate.getDate();
        const month = (timeToDate.getMonth() + 1).toString().length > 1 ? (timeToDate.getMonth() + 1) : '0' + (timeToDate.getMonth() + 1);
        realTime = innerText = day + '/' + month + '/' + timeToDate.getFullYear();
      } else {
        realTime = post.time;
      }
      if (post.media_type != 'oldPost') {
        realTime = realTime + ' IG Post';
      }
      newsTitle.innerText = realTime;
      if (post.permalink) {
        newsTitle.onclick = () => {
          window.open(post.permalink,'_blank');
        }
        newsTitle.onmouseover = newsTitle.style.cursor = 'pointer';
        newsTitle.style.textDecoration = 'underline';
        newsTitle.style.color = 'darkblue';
      }
      newsContainer.appendChild(newsTitle);
      let realCaption;
      if (post.caption) {
        realCaption = post.caption.split('\n#')[0];
        realCaption.split('\n').forEach(newParagraph => {
          let newsContent = document.createElement('p');
          newsContent.innerHTML = newParagraph;
          newsContainer.appendChild(newsContent);
        })
      }
      const newsMedia = post.media;
      if (post.media_type != 'VIDEO') {
        if (post.media && post.media.length > 0 && typeof(post.media) == 'string') {
          let newsImg = document.createElement('img');
          newsImg.src = newsMedia;
          newsContainer.appendChild(newsImg);
        } else if (post.media && post.media.length > 0 && typeof(post.media) == 'object') {
          post.media.forEach(moreMedia => {
            let newsImg = document.createElement('img');
            newsImg.src = moreMedia.media_url;
            newsContainer.appendChild(newsImg);
          });
        }
      } else {
        let newVid = document.createElement('video');
        newVid.style.width = '-webkit-fill-available';
        newVid.style.height = '300px';
        newVid.controls = true;
        let newSrc = document.createElement('source');
        newSrc.src = newsMedia;
        newVid.appendChild(newSrc);
        newsContainer.appendChild(newVid);
      }
    });
    if (allPosts == postsCounter) {
      document.getElementById('moreNews_text').style.display = 'none';
    } else if (postsCounter > 3 && document.getElementById('resetNews_text').style.display != 'block' && document.getElementById('resetNews_text').style.display != '' && document.getElementById('resetNews_text').style.display != undefined) {
      document.getElementById('resetNews_text').style.display = 'block';
    }
  } else {
    // alert('no more');
  }
}

const resetNews = () => {
  newsContainer.innerHTML = '';
  postsCounter = 0;
  pendingPosts = [];
  showAllNews(posts);
  location.href = '#news';
  document.getElementById('moreNews_text').style.display = 'block';
  document.getElementById('resetNews_text').style.display = 'none';
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
  content.scrollTo(0,0);
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

const callFBApi = (posts) => {
  posts = posts;
  let serverCall = new XMLHttpRequest();
  serverCall.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let response = [this.responseText.split('|||')[0], this.responseText.split('|||')[1]];
      response.forEach(res => {
        let data = JSON.parse(res);
        let media;
        if (data.business_discovery) {
          data.business_discovery.media.data.forEach((element) => {
            media = element.children != undefined ? element.children.data : element.media_url;
            posts.push({
              'time': element.timestamp,
              'caption': element.caption,
              'media': media,
              'media_type': element.media_type,
              'permalink': element.permalink
            });
          });
        }
      })
      posts = posts.sort((a, b) => {
        a = a.time.length == 10 ? new Date(a.time.split('/').reverse().join('/')) : new Date(a.time);
        b = b.time.length == 10 ? new Date(b.time.split('/').reverse().join('/')) : new Date(b.time);
        return b - a
      });

      allPosts = posts.length;
      showAllNews(posts);
    }
  }
  serverCall.open('GET', 'https://server.tagomagoband.com/getIGPosts/');
  serverCall.send();
}

document.addEventListener('readystatechange', (event) => {
  if (event.target.readyState === 'complete') {
    removeLoading();
  }
});
