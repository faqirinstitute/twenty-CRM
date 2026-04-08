import { styled } from '@linaria/react';
import { useLingui } from '@lingui/react/macro';
import { CoreObjectNameSingular } from 'twenty-shared/types';
import {
  IconBriefcase,
  IconBuildingSkyscraper,
  IconHome,
  IconUsers,
} from 'twenty-ui/display';
import { MOBILE_VIEWPORT, themeCssVariables } from 'twenty-ui/theme-constants';

import { HomeGreetingCard } from '@/home/components/HomeGreetingCard';
import { HomeRecentRecordsWidget } from '@/home/components/HomeRecentRecordsWidget';
import { HomeTasksWidget } from '@/home/components/HomeTasksWidget';
import { PageContainer } from '@/ui/layout/page/components/PageContainer';
import { PageHeader } from '@/ui/layout/page/components/PageHeader';

const StyledScrollableContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[4]};
  overflow-y: auto;
  padding: ${themeCssVariables.spacing[4]};

  @media (max-width: ${MOBILE_VIEWPORT}px) {
    padding: ${themeCssVariables.spacing[3]};
  }
`;

const StyledGrid = styled.div`
  display: grid;
  gap: ${themeCssVariables.spacing[4]};
  grid-template-columns: 1fr 1fr;

  @media (max-width: ${MOBILE_VIEWPORT}px) {
    grid-template-columns: 1fr;
  }
`;

const StyledRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[4]};
`;

export const HomePage = () => {
  const { t } = useLingui();

  return (
    <PageContainer>
      <PageHeader title={t`Home`} Icon={IconHome} />
      <StyledScrollableContent>
        <HomeGreetingCard />
        <StyledGrid>
          <HomeTasksWidget />
          <StyledRightColumn>
            <HomeRecentRecordsWidget
              objectNameSingular={CoreObjectNameSingular.Company}
              title={t`Recent Companies`}
              Icon={IconBuildingSkyscraper}
              limit={6}
            />
            <HomeRecentRecordsWidget
              objectNameSingular={CoreObjectNameSingular.Person}
              title={t`Recent People`}
              Icon={IconUsers}
              limit={6}
            />
            <HomeRecentRecordsWidget
              objectNameSingular={CoreObjectNameSingular.Opportunity}
              title={t`Recent Opportunities`}
              Icon={IconBriefcase}
              limit={4}
            />
          </StyledRightColumn>
        </StyledGrid>
      </StyledScrollableContent>
    </PageContainer>
  );
};
