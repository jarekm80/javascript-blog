{
const titleClickHandler = function(event){
  event.preventDefault();  
  const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);
  
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

  //  generateTitleLinks();
  }
  

const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(){
  let html = '';

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML='';    
  
  const articles = document.querySelectorAll('.posts article');
  
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
    //titleList.insertAdjacentHTML("beforeend",linkHTML);
    html += linkHTML;

  }  
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log('links : ',links)
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}

function generateTags(){
  /*DONE find all articles */
  const articles = document.querySelectorAll('.posts article');
  
  /* [DONE] for each article */
  for (let article of articles){
    /* [DONE] find tags wrapper */
    const ArticleTagsSelector = article.querySelector(optArticleTagsSelector);
    console.log('artTagSel : ', ArticleTagsSelector);
    
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-tags attribute */
    /* [DONE] split tags into array */
    const tags=article.getAttribute('data-tags').split(' ');

    /* START LOOP: for each tag */
    for (let tag of tags){
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-'+ tag + '">' + tag + '</a></li>';
      /* add generated code to html variable */
      html+=linkHTML;
    /* END LOOP: for each tag */
    }
//    console.log('html : ',html);

    /* insert HTML of all the links into the tags wrapper */
    ArticleTagsSelector.innerHTML=html;
    /* END LOOP: for every article: */
  }
}

generateTags();

generateTitleLinks();

}
