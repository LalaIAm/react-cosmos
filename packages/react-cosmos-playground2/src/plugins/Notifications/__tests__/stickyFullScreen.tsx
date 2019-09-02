import { act, render } from '@testing-library/react';
import React from 'react';
import { ArraySlot, loadPlugins, resetPlugins } from 'react-plugin';
import { register } from '..';
import {
  getNotificationsMethods,
  mockRouter
} from '../../../testHelpers/pluginMocks';

afterEach(resetPlugins);

function loadTestPlugins() {
  loadPlugins();
  return render(<ArraySlot name="global" />);
}

function pushStickyNotification() {
  act(() =>
    getNotificationsMethods().pushStickyNotification({
      id: 'build',
      type: 'loading',
      title: 'Rebuilding...',
      info: 'Your code is updating.'
    })
  );
}

it('does not render sticky notification', async () => {
  mockRouter({ isFullScreen: () => true });
  register();
  const { queryByText } = loadTestPlugins();

  pushStickyNotification();
  expect(queryByText('Rebuilding...')).toBeNull();
});