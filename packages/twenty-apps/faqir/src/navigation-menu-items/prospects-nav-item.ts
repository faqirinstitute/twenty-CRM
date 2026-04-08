import { defineNavigationMenuItem } from 'twenty-sdk';
import { NavigationMenuItemType } from 'twenty-shared/types';
import { PROSPECTS_VIEW_UNIVERSAL_IDENTIFIER } from 'src/views/prospects-view';

export default defineNavigationMenuItem({
  universalIdentifier: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  name: 'prospects-nav-item',
  icon: 'IconTarget',
  color: 'green',
  position: 0,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: PROSPECTS_VIEW_UNIVERSAL_IDENTIFIER,
});
