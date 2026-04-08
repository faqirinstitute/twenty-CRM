import { styled } from '@linaria/react';
import { useLingui } from '@lingui/react/macro';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppPath, CoreObjectNameSingular } from 'twenty-shared/types';
import { getAppPath } from 'twenty-shared/utils';
import { IconCalendar, IconCheckbox } from 'twenty-ui/display';
import { ThemeContext, themeCssVariables } from 'twenty-ui/theme-constants';

import { useFindManyRecords } from '@/object-record/hooks/useFindManyRecords';
import { type ObjectRecord } from '@/object-record/types/ObjectRecord';
import { beautifyExactDate, hasDatePassed } from '~/utils/date-utils';

type TaskRecord = ObjectRecord & {
  title: string | null;
  status: string | null;
  dueAt: string | null;
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

const StyledCount = styled.span`
  background: ${themeCssVariables.background.secondary};
  border: 1px solid ${themeCssVariables.border.color.light};
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${themeCssVariables.font.color.secondary};
  font-size: ${themeCssVariables.font.size.sm};
  padding: 1px ${themeCssVariables.spacing[2]};
`;

const StyledTaskList = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 420px;
  overflow-y: auto;
`;

const StyledTaskRow = styled.div`
  align-items: center;
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  cursor: pointer;
  display: flex;
  gap: ${themeCssVariables.spacing[3]};
  justify-content: space-between;
  padding: ${themeCssVariables.spacing[3]} ${themeCssVariables.spacing[4]};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${themeCssVariables.background.secondary};
  }
`;

const StyledStatusDot = styled.div<{ status: string | null }>`
  background: ${({ status }) =>
    status === 'IN_PROGRESS'
      ? themeCssVariables.color.blue
      : themeCssVariables.font.color.light};
  border-radius: 50%;
  flex-shrink: 0;
  height: 8px;
  width: 8px;
`;

const StyledTaskTitle = styled.span`
  color: ${themeCssVariables.font.color.primary};
  flex: 1;
  font-size: ${themeCssVariables.font.size.sm};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledDueDate = styled.span<{ isPast: boolean }>`
  align-items: center;
  color: ${({ isPast }) =>
    isPast
      ? themeCssVariables.font.color.danger
      : themeCssVariables.font.color.secondary};
  display: flex;
  flex-shrink: 0;
  font-size: ${themeCssVariables.font.size.sm};
  gap: ${themeCssVariables.spacing[1]};
`;

const StyledEmptyState = styled.div`
  align-items: center;
  color: ${themeCssVariables.font.color.light};
  display: flex;
  font-size: ${themeCssVariables.font.size.sm};
  justify-content: center;
  padding: ${themeCssVariables.spacing[8]};
`;

export const HomeTasksWidget = () => {
  const { t } = useLingui();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const { records: tasks, loading } = useFindManyRecords<TaskRecord>({
    objectNameSingular: CoreObjectNameSingular.Task,
    filter: { status: { neq: 'DONE' } },
    orderBy: [{ dueAt: 'AscNullsLast' }, { createdAt: 'AscNullsLast' }],
    limit: 20,
    recordGqlFields: { id: true, title: true, status: true, dueAt: true },
  });

  const handleTaskClick = (taskId: string) => {
    navigate(
      getAppPath(AppPath.RecordShowPage, {
        objectNameSingular: CoreObjectNameSingular.Task,
        objectRecordId: taskId,
      }),
    );
  };

  return (
    <StyledWidget>
      <StyledWidgetHeader>
        <IconCheckbox size={theme.icon.size.md} />
        <StyledWidgetTitle>{t`Open Tasks`}</StyledWidgetTitle>
        {!loading && tasks.length > 0 && (
          <StyledCount>{tasks.length}</StyledCount>
        )}
      </StyledWidgetHeader>
      <StyledTaskList>
        {loading && <StyledEmptyState>{t`Loading...`}</StyledEmptyState>}
        {!loading && tasks.length === 0 && (
          <StyledEmptyState>{t`All caught up!`}</StyledEmptyState>
        )}
        {!loading &&
          tasks.map((task) => (
            <StyledTaskRow key={task.id} onClick={() => handleTaskClick(task.id)}>
              <StyledStatusDot status={task.status} />
              <StyledTaskTitle>{task.title || t`Untitled task`}</StyledTaskTitle>
              {task.dueAt && (
                <StyledDueDate isPast={hasDatePassed(task.dueAt)}>
                  <IconCalendar size={theme.icon.size.sm} />
                  {beautifyExactDate(task.dueAt)}
                </StyledDueDate>
              )}
            </StyledTaskRow>
          ))}
      </StyledTaskList>
    </StyledWidget>
  );
};
