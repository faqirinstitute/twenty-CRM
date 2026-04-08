import { styled } from '@linaria/react';
import { useLingui } from '@lingui/react/macro';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppPath, CoreObjectNameSingular } from 'twenty-shared/types';
import { type RecordGqlOperationGqlRecordFields } from 'twenty-shared/types';
import { getAppPath } from 'twenty-shared/utils';
import { type IconComponent } from 'twenty-ui/display';
import { ThemeContext, themeCssVariables } from 'twenty-ui/theme-constants';

import { useFindManyRecords } from '@/object-record/hooks/useFindManyRecords';
import { type ObjectRecord } from '@/object-record/types/ObjectRecord';

type HomeRecentRecordsWidgetProps = {
  objectNameSingular: string;
  title: string;
  Icon: IconComponent;
  limit?: number;
};

const RECORD_GQL_FIELDS_BY_OBJECT: Partial<
  Record<string, RecordGqlOperationGqlRecordFields>
> = {
  [CoreObjectNameSingular.Person]: {
    id: true,
    name: { firstName: true, lastName: true },
    createdAt: true,
  },
};

const DEFAULT_RECORD_GQL_FIELDS: RecordGqlOperationGqlRecordFields = {
  id: true,
  name: true,
  createdAt: true,
};

const getRecordDisplayName = (
  record: ObjectRecord,
  objectNameSingular: string,
): string => {
  if (objectNameSingular === CoreObjectNameSingular.Person) {
    const nameField = record.name as {
      firstName?: string | null;
      lastName?: string | null;
    } | null;
    const fullName = [nameField?.firstName, nameField?.lastName]
      .filter(Boolean)
      .join(' ');
    return fullName || 'Unnamed';
  }
  return (record.name as string | null) || 'Unnamed';
};

const StyledWidget = styled.div`
  background: ${themeCssVariables.background.primary};
  border: 1px solid ${themeCssVariables.border.color.medium};
  border-radius: ${themeCssVariables.border.radius.md};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const StyledWidgetHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  padding: ${themeCssVariables.spacing[4]};
`;

const StyledWidgetTitle = styled.span`
  color: ${themeCssVariables.font.color.primary};
  flex: 1;
  font-size: ${themeCssVariables.font.size.md};
  font-weight: ${themeCssVariables.font.weight.semiBold};
`;

const StyledRecordList = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledRecordRow = styled.div`
  align-items: center;
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  cursor: pointer;
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  justify-content: space-between;
  padding: ${themeCssVariables.spacing[3]} ${themeCssVariables.spacing[4]};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${themeCssVariables.background.secondary};
  }
`;

const StyledRecordName = styled.span`
  color: ${themeCssVariables.font.color.primary};
  flex: 1;
  font-size: ${themeCssVariables.font.size.sm};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledRecordDate = styled.span`
  color: ${themeCssVariables.font.color.light};
  flex-shrink: 0;
  font-size: ${themeCssVariables.font.size.sm};
`;

const StyledEmptyState = styled.div`
  align-items: center;
  color: ${themeCssVariables.font.color.light};
  display: flex;
  font-size: ${themeCssVariables.font.size.sm};
  justify-content: center;
  padding: ${themeCssVariables.spacing[6]};
`;

export const HomeRecentRecordsWidget = ({
  objectNameSingular,
  title,
  Icon,
  limit = 5,
}: HomeRecentRecordsWidgetProps) => {
  const { t } = useLingui();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const recordGqlFields =
    RECORD_GQL_FIELDS_BY_OBJECT[objectNameSingular] ?? DEFAULT_RECORD_GQL_FIELDS;

  const { records, loading } = useFindManyRecords({
    objectNameSingular,
    orderBy: [{ createdAt: 'DescNullsLast' }],
    limit,
    recordGqlFields,
  });

  const handleRecordClick = (recordId: string) => {
    navigate(
      getAppPath(AppPath.RecordShowPage, {
        objectNameSingular,
        objectRecordId: recordId,
      }),
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <StyledWidget>
      <StyledWidgetHeader>
        <Icon size={theme.icon.size.md} />
        <StyledWidgetTitle>{title}</StyledWidgetTitle>
      </StyledWidgetHeader>
      <StyledRecordList>
        {loading && <StyledEmptyState>{t`Loading...`}</StyledEmptyState>}
        {!loading && records.length === 0 && (
          <StyledEmptyState>{t`No records yet`}</StyledEmptyState>
        )}
        {!loading &&
          records.map((record) => (
            <StyledRecordRow
              key={record.id}
              onClick={() => handleRecordClick(record.id)}
            >
              <StyledRecordName>
                {getRecordDisplayName(record, objectNameSingular)}
              </StyledRecordName>
              {record.createdAt && (
                <StyledRecordDate>
                  {formatDate(record.createdAt as string)}
                </StyledRecordDate>
              )}
            </StyledRecordRow>
          ))}
      </StyledRecordList>
    </StyledWidget>
  );
};
