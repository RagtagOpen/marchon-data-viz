/* jshint esversion: 6 */
(function() {
  'use strict';

  let container = document.querySelector('main');
  let categories = [];
  let previous = document.querySelector('.page-header-previous');
  let next = document.querySelector('.page-header-next');
  let currentCategoryID = null;
  let pageTitle = document.querySelector('.page-title');
  let description = document.querySelector('.category-description');
  let commentList = document.querySelector('.comment-list');
  let scrollThrottle = 5;

  fetch('data.json')
    .then(function(result) {
      return result.json();
    })
    .then(function(result) {
      categories = result;
      init();
    });

  let previousCategory = function() {
    if (currentCategoryID - 1 < -1) {
      return categories[currentCategoryID - 1];
    }
    return categories[categories.length - 1];
  };

  let currentCategory = function() {
    return categories[currentCategoryID];
  };

  let nextCategory = function() {
    if (currentCategoryID + 1 < categories.length - 1) {
      return categories[currentCategoryID + 1];
    }
    return categories[0];
  };

  let showCategory = function(id) {
    currentCategoryID = id;

    if (categories.length === 1) {
      previous.remove();
      next.remove();
    }

    previous.title = previousCategory().name;
    next.title = nextCategory().name;

    pageTitle.innerHTML = currentCategory().name;
    document.title = currentCategory().name;

    description.innerHTML = currentCategory()
      .description.map(function(line) {
        return '<p>' + line + '</p>';
      })
      .join('\n');

    scrollTo.cancel();

    commentList.innerHTML = '';
    commentList.scrollTo(0, 0);

    commentList.innerHTML = currentCategory()
      .comments.map(function(comment) {
        return '<li class="comment">' + comment.body + '</li>';
      })
      .join('\n');

    commentList.style.bottom = 'auto'; // temporarily allow the list to be it's full height so we can get the size
    let targetHeight = commentList.getClientRects()[0].height + document.body.getClientRects()[0].height;
    commentList.removeAttribute('style');

    scrollTo(commentList, targetHeight, targetHeight * scrollThrottle);
  };

  let init = function() {
    if (!categories.length) {
      return;
    }

    showCategory(0);
  };

  previous.addEventListener(
    'click',
    function(ev) {
      ev.preventDefault();

      if (currentCategoryID > 0) {
        showCategory(currentCategoryID - 1);
      } else {
        showCategory(categories.length - 1);
      }
    },
    false
  );

  next.addEventListener(
    'click',
    function(ev) {
      ev.preventDefault();

      if (currentCategoryID < categories.length - 1) {
        showCategory(currentCategoryID + 1);
      } else {
        showCategory(0);
      }
    },
    false
  );

  // adapted from https://gist.github.com/andjosh/6764939
  let scrollTo = function(element, to, duration) {
    let start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 16; // 16 is just slightly better than 60fps

    let animateScroll = function() {
      currentTime += increment;
      let val = element.scrollTop + change / (duration / increment);
      window.requestAnimationFrame(function() {
        element.scrollTop = val;
      });
      if (currentTime < duration) {
        scrollTo.timeout = setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };

  scrollTo.cancel = function() {
    clearTimeout(scrollTo.timeout);
  };
})();
