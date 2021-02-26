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
  const optArticleAuthorSelector= '.post-author';
  const optTagsListSelector = '.tags.list';
  const optCloudClassCount = 5;
  const optCloudClassPrefix = 'tag-size-';

  const generateTitleLinks = function(customSelector = '') {
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

  const generateAuthors = function(){
    /*DONE find all articles */
    const articles = document.querySelectorAll('.posts article');

    /* [DONE] for each article */
    for (let article of articles){
    /* [DONE] find author wrapper */
      const ArticleAuthorSelector = article.querySelector(optArticleAuthorSelector);
     
      /* [DONE] get author from data-author attribute */
      const author=article.getAttribute('data-author');
      /* [DONE] generate inner html */
      const html = 'by <a href="#author-'+ author + '">' + author + '</a>';
      /* [DONE] insert html into the author wrapper */
      ArticleAuthorSelector.innerHTML=html;
      /* [DONE] END LOOP: for every article: */
    }
  };  
  
  const calculateTagsParams = function(tags){
    let min=10;
    let max=0;
    for (const tag in tags){
      if (tags[tag]<min) {min=tags[tag];}    
      if (tags[tag]>max) {max=tags[tag];}    
    }
    return {'min' : min, 'max' : max};
  };

  const calculateTagClass = function (count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
    return classNumber;
  }

  const generateTags = function(){
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
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
        
        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }
      /* [DONE] insert HTML of all the links into the tags wrapper */
      ArticleTagsSelector.innerHTML=html;
    /* [DONE] END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    const tagsParams = calculateTagsParams(allTags);

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      //<li><a href="#">design</a></li>
      //calculateTagClass(allTags[tag], tagsParams)
      const tagLinkHTML = '<li><a class="tag-size-' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + ' </a></li>';
      console.log('tagLinkHTML:', tagLinkHTML);
      /* [NEW] generate code of a link and add it to allTagsHTML */
      //allTagsHTML += tag + ' (' + allTags[tag] + ') ';
      allTagsHTML += tagLinkHTML;
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  };

  const tagClickHandler = function(event){
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
  };

  const authorClickHandler = function(event){
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href=clickedElement.getAttribute('href');

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');

    /* [DONE] find all tag links with class active */
    const activeArticles = document.querySelectorAll('.posts article.active');

    /* [DONE] START LOOP: for each active tag link */
    for(let activeArticle of activeArticles){
      /* [DONE] remove class active */
      activeArticle.classList.remove('active');
    /* [DONE] END LOOP: for each active tag link */
    }

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* [DONE] START LOOP: for each found tag link */
    for (let authorLink of authorLinks){
      /* [DONE] add class active */
      authorLink.classList.add('active');
      /* [DONE] END LOOP: for each found tag link */
    }
    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  };


  const addClickListenersToTags = function(){
    /* [DONE] find all links to tags */
    const links = document.querySelectorAll('[href^="#tag-"]');

    /* [DONE] START LOOP: for each link */
    for(let link of links){

      /* [DONE] add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);

    /* [DONE] END LOOP: for each link */
    }
  };

  const addClickListenersToAuthors = function(){
    /* [DONE] find all links to tags */
    const links = document.querySelectorAll('[href^="#author-"]');

    /* [DONE] START LOOP: for each link */
    for(let link of links){

      /* [DONE] add tagClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);

    /* [DONE] END LOOP: for each link */
    }
  };

  generateTags();

  generateAuthors();

  addClickListenersToAuthors();

  addClickListenersToTags();

  generateTitleLinks();


}
