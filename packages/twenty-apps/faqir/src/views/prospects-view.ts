import { defineView, ViewKey } from 'twenty-sdk';
import {
  PROSPECT_OBJECT_UNIVERSAL_IDENTIFIER,
  PROSPECT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  PROSPECT_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
  PROSPECT_SOURCE_FIELD_UNIVERSAL_IDENTIFIER,
} from 'src/objects/prospect';

export const PROSPECTS_VIEW_UNIVERSAL_IDENTIFIER =
  '0c992ba2-56f5-41b5-8f18-33b2c62a00cc';

export default defineView({
  universalIdentifier: PROSPECTS_VIEW_UNIVERSAL_IDENTIFIER,
  name: 'All Prospects',
  objectUniversalIdentifier: PROSPECT_OBJECT_UNIVERSAL_IDENTIFIER,
  icon: 'IconTarget',
  key: ViewKey.INDEX,
  position: 0,
  fields: [
    {
      universalIdentifier: 'ccf10ba4-6d22-42ee-ba8c-c937e9ca3c46',
      fieldMetadataUniversalIdentifier: PROSPECT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      position: 0,
      isVisible: true,
      size: 200,
    },
    {
      universalIdentifier: 'e1a2b3c4-d5e6-7890-abcd-ef1234567890',
      fieldMetadataUniversalIdentifier: PROSPECT_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
      position: 1,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: 'f2b3c4d5-e6f7-8901-bcde-f12345678901',
      fieldMetadataUniversalIdentifier: PROSPECT_SOURCE_FIELD_UNIVERSAL_IDENTIFIER,
      position: 2,
      isVisible: true,
      size: 150,
    },
  ],
});
