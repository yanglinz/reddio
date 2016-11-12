import { expect } from 'chai';

import * as iframe from '../index';

describe('player iframe', () => {
  describe('iframe dom creation', () => {
    beforeEach(() => {
      document.body.innerHTML = '';
    });

    it('should create parent mount node', () => {
      const name = 'mount';
      iframe.createMount(name);
      const node = document.getElementById(name);
      expect(node).to.not.equal(null);
      expect(node.className).to.equal(name);
    });

    it('should get or create parent mount node', () => {
      const name = 'mount';
      iframe.getOrCreateMount(name);
      iframe.getOrCreateMount(name);
      const node = document.getElementById(name);
      expect(node).to.not.equal(null);
      expect(node.className).to.equal(name);
    });

    it('should create child mount node', () => {
      const parent = 'parent';
      const child = 'child';
      iframe.createChildMount(parent, child);
      const childNode = document.getElementById(child);
      expect(childNode).to.not.equal(null);
      expect(childNode.id).to.equal(child);
      expect(childNode.className).to.equal(child);
      expect(childNode.parentNode.id).to.equal(parent);
    });

    it('should get or create child mount node', () => {
      const parent = 'parent';
      const child = 'child';
      iframe.getOrCreateChildMount(parent, child);
      iframe.getOrCreateChildMount(parent, child);
      const childNode = document.getElementById(child);
      expect(childNode).to.not.equal(null);
      expect(childNode.id).to.equal(child);
      expect(childNode.className).to.equal(child);
      expect(childNode.parentNode.id).to.equal(parent);
    });

    it('should create iframe mount', () => {
      iframe.createPlayerMount();
      const youtubeNode = document.getElementById('youtube');
      const soundcloudNode = document.getElementById('soundcloud');
      expect(youtubeNode).to.not.equal(null);
      expect(soundcloudNode).to.not.equal(null);
      expect(youtubeNode.parentNode).to.deep.equal(soundcloudNode.parentNode);
      expect(youtubeNode.parentNode.id).to.equal('player');
    });
  });
});
