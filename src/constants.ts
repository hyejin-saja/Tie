/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RecruitmentNotice, Applicant } from './types';

export const COLORS = {
  primary: '#003b71', // 수원시정연구원 Deep Navy
  secondary: '#00a1e3', // Suwon Cyan
  accent: '#f3f4f6',
  text: '#111827',
  muted: '#6b7280',
};

export const MOCK_NOTICES: RecruitmentNotice[] = [
  {
    id: 'notice-1',
    title: '2026년 상반기 정규직 연구원 채용 공고',
    category: 'RESEARCH_REGULAR',
    startDate: '2026-04-01',
    endDate: '2026-04-30',
    description: '수원시정연구원에서 도시 정책 연구를 수행할 역량 있는 인재를 모집합니다.',
    stages: [
      { id: 's1', name: '서류전형', order: 1, status: 'COMPLETED', announcementPosted: true },
      { id: 's2', name: '연구수행계획 발표', order: 2, status: 'IN_PROGRESS', announcementPosted: false },
      { id: 's3', name: '면접전형', order: 3, status: 'PENDING', announcementPosted: false },
      { id: 's4', name: '최종합격자 발표', order: 4, status: 'PENDING', announcementPosted: false },
    ],
  },
  {
    id: 'notice-2',
    title: '2026년 제2차 정원외 연구직(계약직) 채용 공고',
    category: 'RESEARCH_NON_REGULAR',
    startDate: '2026-04-15',
    endDate: '2026-05-15',
    description: '특정 과제 연구 및 현계 정책 지원을 위한 위촉연구원을 모집합니다.',
    stages: [
      { id: 's1', name: '서류전형', order: 1, status: 'IN_PROGRESS', announcementPosted: false },
      { id: 's2', name: '면접전형', order: 2, status: 'PENDING', announcementPosted: false },
      { id: 's3', name: '최종합격자 발표', order: 3, status: 'PENDING', announcementPosted: false },
    ],
  },
  {
    id: 'notice-3',
    title: '2026년 상반기 행정직 지원인력 채용',
    category: 'ADMINISTRATIVE',
    startDate: '2026-03-01',
    endDate: '2026-03-31',
    description: '연구원 행정 지원 및 사무 관리를 담당할 인재를 모집합니다.',
    stages: [
      { id: 's1', name: '서류전형', order: 1, status: 'COMPLETED', announcementPosted: true },
      { id: 's2', name: '면접전형', order: 2, status: 'COMPLETED', announcementPosted: true },
      { id: 's3', name: '최종합격자 발표', order: 3, status: 'COMPLETED', announcementPosted: true },
    ],
  },
];

export const MOCK_APPLICANTS: Applicant[] = [
  {
    id: 'app-1',
    recruitmentId: 'notice-1',
    name: '김수원',
    applicationNumber: '2026-R-001',
    email: 'kim@example.com',
    phone: '010-1234-5678',
    status: 'SCREENING',
    currentStageId: 's2',
    results: {
      's1': 'PASS',
      's2': 'PENDING',
    },
    submittedAt: '2026-04-05T10:00:00Z',
  },
  {
    id: 'app-2',
    recruitmentId: 'notice-1',
    name: '이수원',
    applicationNumber: '2026-R-002',
    email: 'lee@example.com',
    phone: '010-8765-4321',
    status: 'FAILED',
    currentStageId: 's1',
    results: {
      's1': 'FAIL',
    },
    submittedAt: '2026-04-06T14:30:00Z',
  },
  {
    id: 'app-3',
    recruitmentId: 'notice-3',
    name: '박행정',
    applicationNumber: '2026-A-001',
    email: 'park@example.com',
    phone: '010-5555-5555',
    status: 'PASSED',
    currentStageId: 's3',
    results: {
      's1': 'PASS',
      's2': 'PASS',
      's3': 'PASS',
    },
    submittedAt: '2026-03-05T09:00:00Z',
  },
];
