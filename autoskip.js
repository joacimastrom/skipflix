// Send each DOM mutation through a filtering function.
const obs = new MutationObserver(mutations => mutations.map(matchAddedNodes));

// Send each added node through the matching and clicking function.
matchAddedNodes = mutation => mutation.addedNodes.forEach(matchAndClick);

var autoPaused = false;

/*
 * Try matching a node for the "skip" or "play" button.
 * Always click "skip", click "play" if skip has been clicked, causing Netflix to pause.
 */
matchAndClick = node => {
  if (node.nodeType === 1) {
    if (node.matches('.svg-icon-nfplayerPlay') && autoPaused) {
      node.parentNode.click();
      autoPaused = false;
    }
    if (node.matches('.skip-credits')) {
      node.firstChild.click();
      autoPaused = true;
    }
  }
};

// Observe the DOM for changes.
obs.observe(document.documentElement, { childList: true, subtree: true });
