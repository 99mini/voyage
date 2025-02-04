import express, { Express } from "express";
import dotenv from "dotenv";


// 환경 변수 로드
dotenv.config();

const app: Express = express();

// JSON 요청 본문 처리
app.use(express.json());

// 로컬 서버 실행
if (process.env.NODE_ENV !== "serverless") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}

export default app;