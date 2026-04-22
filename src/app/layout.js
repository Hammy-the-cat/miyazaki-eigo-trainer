export const metadata = {
  title: "宮崎県 中学英語 教採対策トレーナー",
  description: "宮崎県公立学校教員採用選考試験（中学校英語）対策のための学習アプリ。文法200問＋中学英語学習指導要領200問、計400問を収録。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: "'Georgia', 'Noto Serif JP', serif" }}>
        {children}
      </body>
    </html>
  );
}
