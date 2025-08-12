# Vercel 배포 가이드

## 🚀 Vercel로 배포하기

### 1. GitHub 준비
```bash
# 새 GitHub 레포지토리 생성 후
git init
git add .
git commit -m "Initial commit: Korean Government Job Portal"
git branch -M main
git remote add origin https://github.com/username/korean-gov-jobs.git
git push -u origin main
```

### 2. Neon Database 설정
1. [Neon Console](https://console.neon.tech)에 로그인
2. 새 프로젝트 생성: `korean-gov-jobs`
3. Database URL 복사 (형식: `postgresql://username:password@hostname/database`)

### 3. Vercel 배포
1. [Vercel Dashboard](https://vercel.com/dashboard)에 로그인
2. "New Project" 클릭
3. GitHub 레포지토리 선택
4. 프로젝트 설정:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`

### 4. 환경 변수 설정
Vercel Dashboard → Settings → Environment Variables에서 추가:

```
DATABASE_URL=postgresql://username:password@hostname/database
NODE_ENV=production
```

### 5. 도메인 연결 (선택사항)
1. Vercel Dashboard → Domains
2. 사용자 정의 도메인 추가: `korea-jobportal.co.kr`
3. DNS 설정에서 CNAME 레코드 추가

### 6. 자동 배포 확인
- GitHub에 push할 때마다 자동 배포
- Preview URL에서 테스트 가능
- 프로덕션 도메인에서 최종 확인

## 🔧 빌드 설정

### package.json 스크립트
```json
{
  "scripts": {
    "build": "npm run build:client && npm run build:server",
    "build:client": "vite build",
    "build:server": "esbuild api/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --target=node18"
  }
}
```

### vercel.json 설정
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist/public"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/public/$1"
    }
  ]
}
```

## 📊 모니터링

### Vercel Analytics
- 페이지 조회수, 성능 메트릭 확인
- 실시간 로그 모니터링

### Database 관리
- Neon Console에서 쿼리 실행
- 연결 상태 및 성능 모니터링

## 🔄 업데이트 프로세스

1. 로컬에서 개발 및 테스트
2. GitHub에 변경사항 push
3. Vercel에서 자동 빌드 및 배포
4. Preview URL에서 검증
5. 프로덕션 배포 완료

## ❗ 주의사항

- **환경 변수**: DATABASE_URL은 반드시 설정 필요
- **빌드 시간**: 초기 빌드는 3-5분 소요
- **로그 확인**: Vercel Dashboard에서 실시간 로그 모니터링
- **도메인 전파**: DNS 변경은 최대 24시간 소요

## 🆘 문제 해결

### 빌드 실패
```bash
# 로컬에서 빌드 테스트
npm run build

# 의존성 확인
npm install
```

### API 오류
- Environment Variables에서 DATABASE_URL 확인
- Neon Database 연결 상태 점검

### 배포 실패
- Vercel Dashboard → Functions → Logs 확인
- GitHub 레포지토리 권한 설정 확인

---

**✅ 배포 완료 후 162개+ 채용공고가 실시간으로 표시됩니다!**