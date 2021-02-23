{
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };


  const optArticleSelector = '.post';
  //const optArticleSelector = '.posts article';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';
  const optArticleTagsSelector = '.post-tags .list';

  const generateTitleLinks = function(customSelector = '') {
    console.log('art : ', optArticleSelector + customSelector);
    let html = '';

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML='';

    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    /* [DONE] for each article */
    for (let article of articles){

      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');

      /* [DONE] find the title element */
      /* [DONE] get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* [DONE] insert link into titleList */
      html += linkHTML;

    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  };

  const generateTags = function(){
  /*DONE find all articles */
    const articles = document.querySelectorAll('.posts article');

    /* [DONE] for each article */
    for (let article of articles){
    /* [DONE] find tags wrapper */
      const ArticleTagsSelector = article.querySelector(optArticleTagsSelector);

      /* [DONE] make html variable with empty string */
      let html = '';
      /* [DONE] get tags from data-tags attribute */
      /* [DONE] split tags into array */
      const tags=article.getAttribute('data-tags').split(' ');

      /* [DONE] START LOOP: for each tag */
      for (let tag of tags){
      /* [DONE] generate HTML of the link */
        const linkHTML = '<li><a href="#tag-'+ tag + '">' + tag + '</a></li>';
        /* [DONE] add generated code to html variable */
        html+=linkHTML;
        /* [DONE] END LOOP: for each tag */
      }
      /* [DONE] insert HTML of all the links into the tags wrapper */
      ArticleTagsSelector.innerHTML=html;
    /* [DONE] END LOOP: for every article: */
    }
  };

  function tagClickHandler(event){
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href=clickedElement.getAttribute('href');

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* [DONE] find all tag links with class active */
    const activeArticles = document.querySelectorAll('.posts article.active');

    /* [DONE] START LOOP: for each active tag link */
    for(let activeArticle of activeArticles){
      /* [DONE] remove class active */
      activeArticle.classList.remove('active');
    /* [DONE] END LOOP: for each active tag link */
    }

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* [DONE] START LOOP: for each found tag link */
    for (let tagLink of tagLinks){
      /* [DONE] add class active */
      tagLink.classList.add('active');
    /* [DONE] END LOOP: for each found tag link */
    }
    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags(){
    /* [DONE] find all links to tags */
    const links = document.querySelectorAll('[href^="#tag-"]');

    /* [DONE] START LOOP: for each link */
    for(let link of links){

      /* [DONE] add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);

    /* [DONE] END LOOP: for each link */
  }
}

  generateTags();

  addClickListenersToTags();

  generateTitleLinks();


}
