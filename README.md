# Korean Government Job Portal

대한민국 정부 중앙부처 채용정보를 통합하여 제공하는 웹 포털입니다. 25개 정부 기관의 채용공고를 실시간으로 수집하고 제공합니다.

## 🚀 Features

- **실시간 채용공고 수집**: 25개 정부 부처에서 자동 수집
- **통합 검색 및 필터링**: 부처별, 직종별, 키워드 검색
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- **자동 업데이트**: 5분마다 새로운 채용공고 확인
- **PDF 첨부파일**: 상세 채용공고 다운로드

## 🏛️ 지원 정부 기관

### 19개 부처
- 기획재정부, 교육부, 과학기술정보통신부, 외교부, 통일부
- 법무부, 국방부, 행정안전부, 국가보훈부, 문화체육관광부
- 농림축산식품부, 산업통상자원부, 보건복지부, 환경부
- 고용노동부, 여성가족부, 국토교통부, 인사혁신처, 법제처

### 3개 처
- 식품의약품안전처

### 5개 위원회
- 공정거래위원회, 국민권익위원회, 금융위원회
- 개인정보보호위원회, 원자력안전위원회

## 🛠️ Technology Stack

### Frontend
- **React 18**: 최신 React hooks와 함수형 컴포넌트
- **TypeScript**: 타입 안전성과 개발 생산성
- **Tailwind CSS**: 유틸리티 기반 스타일링
- **shadcn/ui**: 고품질 접근성 컴포넌트
- **TanStack Query**: 서버 상태 관리
- **Wouter**: 경량 라우팅

### Backend
- **Express.js**: RESTful API 서버
- **PostgreSQL**: 안정적인 관계형 데이터베이스
- **Drizzle ORM**: 타입 안전 데이터베이스 액세스
- **Python**: BeautifulSoup4 기반 웹 스크래핑

### Infrastructure
- **Vercel**: 서버리스 배포 플랫폼
- **Neon Database**: 서버리스 PostgreSQL

## 📦 Installation

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env

# 데이터베이스 스키마 푸시
npm run db:push

# 개발 서버 시작
npm run dev
```

## 🔧 Environment Variables

```env
DATABASE_URL=postgresql://...
NODE_ENV=development
```

## 🚀 Deployment

### Vercel 배포

1. GitHub에 코드 푸시
2. Vercel에서 프로젝트 import
3. 환경 변수 설정:
   - `DATABASE_URL`: Neon Database URL
4. 자동 배포 완료

### 빌드 명령어

```bash
# 프론트엔드 빌드
npm run build:client

# 서버 빌드
npm run build:server

# 전체 빌드
npm run build
```

## 📊 API Endpoints

### GET /api/jobs
채용공고 목록 조회 (페이징, 필터링, 검색 지원)

**Query Parameters:**
- `page`: 페이지 번호 (기본값: 1)
- `limit`: 페이지당 항목 수 (기본값: 10, 최대: 50)
- `search`: 검색 키워드
- `ministry`: 부처명 필터
- `sortBy`: 정렬 기준 (latest, deadline, ministry)

### GET /api/statistics
채용공고 통계 정보

### GET /api/jobs/:id
특정 채용공고 상세 조회

### GET /api/health
서버 상태 확인

## 🗄️ Database Schema

### job_postings
- 채용공고 기본 정보 (제목, 부처, 부서, 직종)
- 모집 조건 (인원, 지역, 고용형태)
- 지원 정보 (지원기간, 연락처, 자격요건)
- 메타데이터 (생성일, 긴급여부, 신규여부)

### ministry_urls
- 정부 부처 정보 및 채용 게시판 URL
- 활성 상태 및 마지막 확인 시간

## 🤖 Automated Features

- **자동 스크래핑**: 5분마다 새로운 채용공고 수집
- **데이터 정리**: 60일 이상 된 공고 자동 삭제
- **중복 방지**: 동일 URL 공고 중복 등록 방지
- **에러 복구**: 스크래핑 오류 시 자동 재시도

## 📝 License

MIT License

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📞 Support

문의사항이나 버그 리포트는 GitHub Issues를 통해 제출해 주세요.

---

**🇰🇷 Made for Korean Government Job Seekers**