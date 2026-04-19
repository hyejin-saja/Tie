import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Users, 
  Settings, 
  Search, 
  ClipboardCheck, 
  ChevronRight, 
  ArrowLeft,
  Calendar,
  Building2,
  CheckCircle2,
  AlertCircle,
  Clock,
  LayoutDashboard
} from 'lucide-react';
import { MOCK_NOTICES, MOCK_APPLICANTS, COLORS } from './constants';
import { ViewState, RecruitmentNotice, JobCategory, Applicant } from './types';

export default function App() {
  const [view, setView] = useState<ViewState>('HOME');
  const [selectedNoticeId, setSelectedNoticeId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Selected Notice data
  const selectedNotice = useMemo(() => 
    MOCK_NOTICES.find(n => n.id === selectedNoticeId), 
    [selectedNoticeId]
  );

  const handleApply = (noticeId: string) => {
    setSelectedNoticeId(noticeId);
    setView('APPLY');
  };

  const handleViewDetail = (noticeId: string) => {
    setSelectedNoticeId(noticeId);
    setView('JOB_DETAIL');
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 selection:bg-cyan-100 selection:text-cyan-900">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div 
            className="flex cursor-pointer items-center space-x-2" 
            onClick={() => setView('HOME')}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#003b71] text-white">
              <Building2 size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-[#003b71]">수원시정연구원</h1>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#00a1e3]">Recruitment System</p>
            </div>
          </div>

          <div className="hidden space-x-8 md:flex">
            <button 
              onClick={() => setView('HOME')}
              className={`text-sm font-medium transition-colors ${view === 'HOME' ? 'text-[#00a1e3]' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              채용공고
            </button>
            <button 
              onClick={() => setView('RESULT_CHECK')}
              className={`text-sm font-medium transition-colors ${view === 'RESULT_CHECK' ? 'text-[#00a1e3]' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              합격조회
            </button>
          </div>

          <button 
            onClick={() => {
              setIsAdmin(!isAdmin);
              setView(isAdmin ? 'HOME' : 'ADMIN');
            }}
            className="flex items-center space-x-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-xs font-semibold text-neutral-600 transition-all hover:bg-neutral-50"
          >
            {isAdmin ? <LayoutDashboard size={14} /> : <Settings size={14} />}
            <span>{isAdmin ? '관리자 모드' : '관리자'}</span>
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {view === 'HOME' && <HomeView onApply={handleApply} onDetail={handleViewDetail} />}
          {view === 'JOB_DETAIL' && selectedNotice && (
            <DetailView notice={selectedNotice} onApply={() => setView('APPLY')} onBack={() => setView('HOME')} />
          )}
          {view === 'APPLY' && selectedNotice && (
            <ApplyView notice={selectedNotice} onBack={() => setView('JOB_DETAIL')} />
          )}
          {view === 'RESULT_CHECK' && <ResultCheckView onBack={() => setView('HOME')} />}
          {view === 'ADMIN' && <AdminView />}
        </AnimatePresence>
      </main>

      <footer className="border-t border-neutral-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-neutral-400">© 2026 수원시정연구원. ALL RIGHTS RESERVED.</p>
            <div className="flex space-x-6 text-sm text-neutral-400">
              <a href="#" className="hover:text-neutral-600 underline underline-offset-4">개인정보처리방침</a>
              <a href="#" className="hover:text-neutral-600 underline underline-offset-4">이용약관</a>
              <a href="#" className="hover:text-neutral-600 underline underline-offset-4">연구원 홈페이지</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Sub-views
function HomeView({ onApply, onDetail }: { onApply: (id: string) => void, onDetail: (id: string) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12"
    >
      <div className="max-w-3xl">
        <h2 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
          수원의 내일을 연구하는 <br />
          <span className="text-[#00a1e3]">창의적 인재</span>를 찾습니다.
        </h2>
        <p className="mt-6 text-lg text-neutral-500">
          수원시정연구원은 시민의 행복과 도시의 지속가능한 발전을 위한 전문적인 정책 대안을 제시합니다.
          함께 성장할 열정적인 전문가들의 도전을 기다립니다.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_NOTICES.map((notice) => (
          <motion.div 
            key={notice.id}
            whileHover={{ y: -4 }}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:shadow-xl hover:shadow-cyan-100/50"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  notice.category === 'RESEARCH_REGULAR' ? 'bg-[#003b71]/10 text-[#003b71]' : 
                  notice.category === 'RESEARCH_NON_REGULAR' ? 'bg-[#00a1e3]/10 text-[#00a1e3]' :
                  'bg-neutral-100 text-neutral-600'
                }`}>
                  {notice.category === 'RESEARCH_REGULAR' ? '정규직 연구직' : 
                   notice.category === 'RESEARCH_NON_REGULAR' ? '정원외 연구직' : '행정직'}
                </span>
                <Clock size={16} className="text-neutral-300" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-neutral-900 group-hover:text-[#003b71]">
                {notice.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-neutral-500">
                {notice.description}
              </p>
            </div>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-center space-x-2 text-xs text-neutral-400">
                <Calendar size={14} />
                <span>{notice.startDate} ~ {notice.endDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => onDetail(notice.id)}
                  className="flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50"
                >
                  상세보기
                </button>
                <button 
                  onClick={() => onApply(notice.id)}
                  className="flex-1 rounded-lg bg-[#003b71] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  지원하기
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function DetailView({ notice, onApply, onBack }: { notice: RecruitmentNotice, onApply: () => void, onBack: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <button 
        onClick={onBack}
        className="flex items-center space-x-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
      >
        <ArrowLeft size={16} />
        <span>목록으로 돌아가기</span>
      </button>

      <div className="rounded-3xl border border-neutral-200 bg-white p-8 sm:p-12">
        <div className="max-w-3xl">
          <span className="text-sm font-bold text-[#00a1e3]">RECRUITMENT NOTICE</span>
          <h2 className="mt-2 text-3xl font-bold text-neutral-900 sm:text-4xl">{notice.title}</h2>
          
          <div className="mt-12 space-y-12">
            <section>
              <h3 className="text-lg font-bold text-[#003b71]">1. 채용 개요</h3>
              <div className="mt-4 text-neutral-600 leading-relaxed">
                {notice.description}
                <br /><br />
                본 채용은 공정하고 투명한 절차를 통해 최적의 인재를 선발하는 것을 원칙으로 합니다.
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-[#003b71]">2. 전형 단계</h3>
              <div className="mt-6 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                {notice.stages.map((stage, idx) => (
                  <div key={stage.id} className="relative flex flex-1 flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-[#00a1e3] font-bold">
                      {idx + 1}
                    </div>
                    <p className="mt-3 text-center text-sm font-bold text-neutral-900">{stage.name}</p>
                    {idx < notice.stages.length - 1 && (
                      <ChevronRight className="absolute -right-2 top-4 hidden text-neutral-300 lg:block" size={16} />
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-[#003b71]">3. 접수 기간 및 방법</h3>
              <div className="mt-4 rounded-xl bg-neutral-50 p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">접수기간</h4>
                    <p className="mt-1 font-semibold">{notice.startDate} ~ {notice.endDate}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">접수방법</h4>
                    <p className="mt-1 font-semibold">채용 웹페이지 온라인 접수</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-12 flex justify-center">
            <button 
              onClick={onApply}
              className="group relative flex h-14 w-64 items-center justify-center overflow-hidden rounded-full bg-[#003b71] font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              <span className="relative z-10">지원 신청하기</span>
              <div className="absolute inset-0 translate-y-full bg-[#00a1e3] transition-transform duration-300 group-hover:translate-y-0" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ApplyView({ notice, onBack }: { notice: RecruitmentNotice, onBack: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-bold text-neutral-900">지원이 완료되었습니다.</h2>
        <p className="mt-4 max-w-md text-neutral-500">
          귀하의 소중한 지원에 감사드립니다. <br />
          응시번호는 <span className="font-bold text-[#003b71]">2026-R-999</span> 입니다. <br />
          마이페이지(합격조회)에서 전형 결과를 확인하실 수 있습니다.
        </p>
        <button 
          onClick={onBack}
          className="mt-8 rounded-full bg-[#003b71] px-8 py-3 font-bold text-white"
        >
          확인
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neutral-900">입사지원서 작성</h2>
        <span className="text-sm font-medium text-neutral-400">{notice.title}</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h3 className="mb-6 text-lg font-bold border-b border-neutral-100 pb-2">기본 정보</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-neutral-700">성명</label>
              <input type="text" required className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-2 focus:border-[#00a1e3] focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-700">이메일</label>
              <input type="email" required className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-2 focus:border-[#00a1e3] focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-700">휴대전화</label>
              <input type="tel" placeholder="010-0000-0000" required className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-2 focus:border-[#00a1e3] focus:outline-none" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h3 className="mb-6 text-lg font-bold border-b border-neutral-100 pb-2">첨부 서류</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-700">지원서 및 자기소개서 (PDF/HWP)</label>
              <div className="mt-1 flex items-center justify-center rounded-lg border-2 border-dashed border-neutral-200 p-6 transition-colors hover:border-[#00a1e3]">
                <div className="text-center">
                  <FileText className="mx-auto text-neutral-300" size={32} />
                  <p className="mt-2 text-xs text-neutral-400">파일을 드래그하거나 클릭하여 업로드</p>
                </div>
              </div>
            </div>
            {notice.category === 'RESEARCH_REGULAR' && (
              <div>
                <label className="block text-sm font-semibold text-neutral-700">연구수행계획서 (필수)</label>
                <div className="mt-1 flex items-center justify-center rounded-lg border-2 border-dashed border-neutral-200 p-6 transition-colors hover:border-[#00a1e3]">
                  <div className="text-center">
                    <ClipboardCheck className="mx-auto text-neutral-300" size={32} />
                    <p className="mt-2 text-xs text-neutral-400">정규직 연구원 지원 시 필수 제출 항목입니다.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between space-x-4">
          <button 
            type="button"
            onClick={onBack}
            className="flex-1 rounded-xl border border-neutral-200 px-6 py-4 font-bold text-neutral-600 transition-colors hover:bg-neutral-50"
          >
            취소
          </button>
          <button 
            type="submit"
            className="flex-1 rounded-xl bg-[#003b71] px-6 py-4 font-bold text-white shadow-lg transition-transform hover:scale-[1.01]"
          >
            지원서 제출
          </button>
        </div>
      </form>
    </motion.div>
  );
}

function ResultCheckView({ onBack }: { onBack: () => void }) {
  const [appNumber, setAppNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [result, setResult] = useState<Applicant | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = MOCK_APPLICANTS.find(a => a.applicationNumber === appNumber && a.name === userName);
    setResult(found || null);
    setHasSearched(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto space-y-12"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-neutral-900">전형 결과 조회</h2>
        <p className="mt-2 text-neutral-500">지원 시 발급된 응시번호와 성함을 입력해주세요.</p>
      </div>

      <form onSubmit={handleSearch} className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">응시번호</label>
            <input 
              type="text" 
              value={appNumber}
              onChange={(e) => setAppNumber(e.target.value)}
              placeholder="예: 2026-R-001"
              required 
              className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-2 focus:border-[#00a1e3] focus:outline-none" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400">성명</label>
            <input 
              type="text" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required 
              className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-2 focus:border-[#00a1e3] focus:outline-none" 
            />
          </div>
        </div>
        <button 
          type="submit"
          className="w-full rounded-xl bg-[#003b71] py-4 font-bold text-white shadow-lg shadow-blue-900/10 transition-transform hover:scale-[1.01]"
        >
          결과 조회하기
        </button>
      </form>

      {hasSearched && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="overflow-hidden"
        >
          {result ? (
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm space-y-8">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-neutral-900">{result.name}님 반갑니다.</h3>
                  <p className="text-sm text-neutral-500">응시번호: {result.applicationNumber}</p>
                </div>
                <div className={`rounded-full px-4 py-1 text-sm font-bold ${
                  result.status === 'PASSED' ? 'bg-green-100 text-green-700' : 
                  result.status === 'FAILED' ? 'bg-red-100 text-red-700' : 
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {result.status === 'PASSED' ? '최종합격' : 
                   result.status === 'FAILED' ? '불합격' : '전형진행중'}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-bold text-neutral-900">단계별 전형 결과</h4>
                <div className="space-y-4">
                  {Object.entries(result.results).map(([stageId, status]) => {
                    const stage = MOCK_NOTICES.find(n => n.id === result.recruitmentId)?.stages.find(s => s.id === stageId);
                    return (
                      <div key={stageId} className="flex items-center justify-between rounded-xl bg-neutral-50 p-4">
                        <span className="font-medium">{stage?.name}</span>
                        <span className={`text-sm font-bold ${
                          status === 'PASS' ? 'text-green-600' : 
                          status === 'FAIL' ? 'text-red-600' : 'text-yellow-600'
                        }`}>
                          {status === 'PASS' ? '합격' : status === 'FAIL' ? '불합격' : '진행중'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {result.status === 'PASSED' && (
                <div className="rounded-xl bg-[#003b71]/10 p-6 text-center">
                  <p className="font-bold text-[#003b71]">축하드립니다! 최종 합격하셨습니다.</p>
                  <p className="mt-2 text-sm text-neutral-600">추후 일정은 등록된 연락처로 개별 안내될 예정입니다.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-neutral-200 bg-white p-12 text-center">
              <AlertCircle size={40} className="text-neutral-300 mb-4" />
              <p className="text-neutral-500 font-medium">일치하는 지원 정보를 찾을 수 없습니다.</p>
              <p className="text-xs text-neutral-400 mt-1">입력된 정보를 다시 확인해주세요.</p>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

function AdminView() {
  const [activeTab, setActiveTab] = useState<'NOTICES' | 'APPLICANTS' | 'STAGES'>('NOTICES');

  return (
    <div className="flex flex-col space-y-8 min-h-[60vh]">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-neutral-900">관리자 대시보드</h2>
          <p className="text-neutral-500">채용 공고 및 전형 절차를 관리합니다.</p>
        </div>
        <div className="flex bg-neutral-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('NOTICES')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'NOTICES' ? 'bg-white shadow-sm text-[#003b71]' : 'text-neutral-500'}`}
          >
            공고 관리
          </button>
          <button 
            onClick={() => setActiveTab('APPLICANTS')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'APPLICANTS' ? 'bg-white shadow-sm text-[#003b71]' : 'text-neutral-500'}`}
          >
            지원자 관리
          </button>
          <button 
            onClick={() => setActiveTab('STAGES')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'STAGES' ? 'bg-white shadow-sm text-[#003b71]' : 'text-neutral-500'}`}
          >
            전형 관리
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
        {activeTab === 'NOTICES' && (
          <table className="w-full text-left">
            <thead className="bg-neutral-50 border-b border-neutral-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400">공고명</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400">직군</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400">전형수</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400">기간</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400 text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {MOCK_NOTICES.map(notice => (
                <tr key={notice.id} className="hover:bg-neutral-50/50">
                  <td className="px-6 py-4 font-semibold text-neutral-900">{notice.title}</td>
                  <td className="px-6 py-4 text-sm text-neutral-500">
                    {notice.category === 'RESEARCH_REGULAR' ? '연구직(정규)' : 
                     notice.category === 'RESEARCH_NON_REGULAR' ? '연구직(정원외)' : '행정직'}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-[#00a1e3]">{notice.stages.length}단계</td>
                  <td className="px-6 py-4 text-xs text-neutral-400">{notice.startDate} ~ {notice.endDate}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs font-bold text-[#003b71] hover:underline">편집</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'APPLICANTS' && (
          <table className="w-full text-left">
            <thead className="bg-neutral-50 border-b border-neutral-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400">성명(응시번호)</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400">지원공고</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400">현재단계</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400">상태</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-400 text-right">점수/평가</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {MOCK_APPLICANTS.map(app => {
                const notice = MOCK_NOTICES.find(n => n.id === app.recruitmentId);
                const currentStage = notice?.stages.find(s => s.id === app.currentStageId);
                return (
                  <tr key={app.id} className="hover:bg-neutral-50/50">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-neutral-900">{app.name}</p>
                      <p className="text-xs text-neutral-400">{app.applicationNumber}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500 max-w-xs truncate">{notice?.title}</td>
                    <td className="px-6 py-4 text-sm font-medium">{currentStage?.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        app.status === 'PASSED' ? 'bg-green-100 text-green-700' : 
                        app.status === 'FAILED' ? 'bg-red-100 text-red-700' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-xs font-bold text-[#003b71] hover:underline">평가하기</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6">
          <h3 className="text-lg font-bold flex items-center space-x-2">
            <ClipboardCheck size={20} className="text-[#00a1e3]" />
            <span>최근 합격 공고 현황</span>
          </h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
              <span className="text-sm font-medium">행정직 면접전형 결과</span>
              <span className="text-xs text-green-600 font-bold">공고완료</span>
            </div>
            <div className="flex items-center justify-between border-b border-neutral-50 pb-2">
              <span className="text-sm font-medium">연구직(정규) 서류전형 결과</span>
              <span className="text-xs text-green-600 font-bold">공고완료</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-400">연구직(정원외) 서류전형 진행중</span>
              <span className="text-xs text-neutral-400 font-bold">대기</span>
            </div>
          </div>
        </div>
        
        <div className="rounded-3xl border border-dashed border-neutral-300 bg-neutral-50/50 flex flex-col items-center justify-center p-6 text-center">
            <button className="h-10 w-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#003b71] mb-2">
              <Users size={20} />
            </button>
            <p className="text-sm font-bold text-neutral-900">새 채용공고 등록</p>
            <p className="text-xs text-neutral-400 mt-1">직군 선택 시 전형 단계가 자동 설정됩니다.</p>
        </div>
      </div>
    </div>
  );
}

