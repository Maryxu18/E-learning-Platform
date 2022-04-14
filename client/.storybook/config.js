import { configure } from '@storybook/react';

function loadStories() {
  require('../src/stories/CreateProfile.js');
}

configure(loadStories, module);