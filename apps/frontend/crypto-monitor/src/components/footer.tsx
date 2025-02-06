export function Footer() {
  return (
    <footer className="bg-card border-border mt-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 서비스 정보 */}
          <div>
            <h3 className="text-foreground text-xl font-bold mb-4 text-text-primary">코인 기술적 분석</h3>
            <p className="text-foreground text-text-secondary text-sm leading-relaxed">
              암호화폐 기술적 분석 및 AI 분석 서비스를 제공합니다.
            </p>
          </div>

          {/* 링크 */}
          <div>
            <h3 className="text-foreground text-xl font-bold mb-4 text-text-primary">관련 링크</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://upbit.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-blue-500 text-sm transition-colors duration-200"
                >
                  업비트
                </a>
              </li>
            </ul>
          </div>

          {/* 면책 조항 */}
          <div>
            <h3 className="text-foreground text-xl font-bold mb-4 text-text-primary">면책 조항</h3>
            <p className="text-foreground text-text-secondary text-sm leading-relaxed">
              본 서비스는 투자 권유를 목적으로 하지 않으며, 제공되는 정보는 참고용입니다. 투자의 책임은
              전적으로 투자자 본인에게 있습니다.
            </p>
          </div>
        </div>

        {/* 저작권 */}
        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-foreground text-sm">
            © {new Date().getFullYear()} 코인 기술적 분석. All rights reserved.
          </p>
          <div className="text-foreground mt-3 text-sm text-gray-500">
            <span>Powered by </span>
            <a
              href="https://docs.upbit.com/reference/market-info-all"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
            >
              Upbit API
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
