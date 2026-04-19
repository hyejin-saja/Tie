/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type JobCategory = 'RESEARCH_REGULAR' | 'RESEARCH_NON_REGULAR' | 'ADMINISTRATIVE';

export interface RecruitmentStage {
  id: string;
  name: string;
  order: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  date?: string;
  announcementPosted: boolean;
}

export interface RecruitmentNotice {
  id: string;
  title: string;
  category: JobCategory;
  startDate: string;
  endDate: string;
  stages: RecruitmentStage[];
  description: string;
}

export interface Applicant {
  id: string;
  recruitmentId: string;
  name: string;
  applicationNumber: string; // 응시번호
  email: string;
  phone: string;
  status: 'APPLIED' | 'SCREENING' | 'PASSED' | 'FAILED';
  currentStageId: string;
  results: Record<string, 'PASS' | 'FAIL' | 'PENDING'>;
  submittedAt: string;
}

export type ViewState = 'HOME' | 'JOB_DETAIL' | 'APPLY' | 'RESULT_CHECK' | 'ADMIN';
