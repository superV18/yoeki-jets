import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Yoeki Jets',
  description: 'Experience luxury private aviation with YoekiJets. Fly anywhere with total comfort and control.',
  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/icon.png" id="favicon" />
      </head>
      <body className={inter.className}>
        {children}
        <Script id="favicon-blink" strategy="afterInteractive">
          {`
            (function() {
              let useIcon1 = true;
              
              function updateFavicon() {
                const favicon = document.getElementById('favicon');
                if (favicon) {
                  favicon.setAttribute('href', useIcon1 ? '/icon.png' : '/icon2.png');
                  useIcon1 = !useIcon1;
                }
              }
              
              // Blink every 1 second
              setInterval(updateFavicon, 1000);
            })();
          `}
        </Script>
      </body>
    </html>
  )
}