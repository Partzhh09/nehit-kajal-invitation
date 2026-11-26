(function () {
  function prepareCoupleWords() {
    var story = document.getElementById('coupleStory');
    if (!story) return;

    var wordIndex = 0;
    story.querySelectorAll('.couple-story-line').forEach(function (line) {
      if (line.querySelector('.couple-story-word')) return;

      var textNodes = [];
      var walker = document.createTreeWalker(line, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) textNodes.push(walker.currentNode);

      textNodes.forEach(function (node) {
        var tokens = node.textContent.match(/\s+|\S+/g) || [];
        var fragment = document.createDocumentFragment();

        tokens.forEach(function (token) {
          if (/^\s+$/.test(token)) {
            fragment.appendChild(document.createTextNode(token));
            return;
          }

          var word = document.createElement('span');
          word.className = 'couple-story-word';
          word.textContent = token;
          word.style.setProperty('--word-delay', (wordIndex * 38) + 'ms');
          wordIndex += 1;
          fragment.appendChild(word);
        });

        node.parentNode.replaceChild(fragment, node);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', prepareCoupleWords, { once: true });
  } else {
    prepareCoupleWords();
  }
})();
