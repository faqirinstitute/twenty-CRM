import { defineObject, FieldType } from 'twenty-sdk';

// Universal identifiers are stable — never change them after first install
export const PROSPECT_OBJECT_UNIVERSAL_IDENTIFIER =
  'c8fc87b9-728f-4ce8-83d3-554ed959d1d0';

export const PROSPECT_NAME_FIELD_UNIVERSAL_IDENTIFIER =
  'b22a307e-8096-4722-ad83-2fe204ba7ae1';

export const PROSPECT_STATUS_FIELD_UNIVERSAL_IDENTIFIER =
  '908a9518-e9bd-412e-8e03-fac7e6a39df1';

export const PROSPECT_SOURCE_FIELD_UNIVERSAL_IDENTIFIER =
  '1252118a-efc1-464b-8cd5-a8e2b498e824';

export default defineObject({
  universalIdentifier: PROSPECT_OBJECT_UNIVERSAL_IDENTIFIER,
  nameSingular: 'prospect',
  namePlural: 'prospects',
  labelSingular: 'Prospect',
  labelPlural: 'Prospects',
  description: 'A potential client or partner being tracked by Faqir',
  icon: 'IconTarget',
  labelIdentifierFieldMetadataUniversalIdentifier:
    PROSPECT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
  fields: [
    {
      universalIdentifier: PROSPECT_NAME_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.TEXT,
      name: 'firstname',
      label: 'First Name',
      description: 'First name of the prospect',
      icon: 'IconUser',
    },
    {
      universalIdentifier: PROSPECT_STATUS_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.SELECT,
      name: 'status',
      label: 'Status',
      description: 'Current stage in the pipeline',
      icon: 'IconProgressCheck',
      options: [
        { value: 'NEW', label: 'New', color: 'blue', position: 0 },
        { value: 'CONTACTED', label: 'Contacted', color: 'yellow', position: 1 },
        { value: 'QUALIFIED', label: 'Qualified', color: 'purple', position: 2 },
        { value: 'PROPOSAL_SENT', label: 'Proposal sent', color: 'orange', position: 3 },
        { value: 'WON', label: 'Won', color: 'green', position: 4 },
        { value: 'LOST', label: 'Lost', color: 'red', position: 5 },
      ],
      defaultValue: "'NEW'",
    },
    {
      universalIdentifier: PROSPECT_SOURCE_FIELD_UNIVERSAL_IDENTIFIER,
      type: FieldType.SELECT,
      name: 'source',
      label: 'Source',
      description: 'How this prospect was acquired',
      icon: 'IconSourceCode',
      options: [
        { value: 'WEBSITE', label: 'Website', color: 'blue', position: 0 },
        { value: 'REFERRAL', label: 'Referral', color: 'green', position: 1 },
        { value: 'EVENT', label: 'Event', color: 'purple', position: 2 },
        { value: 'LINKEDIN', label: 'LinkedIn', color: 'sky', position: 3 },
        { value: 'OTHER', label: 'Other', color: 'gray', position: 4 },
      ],
    },
  ],
});
