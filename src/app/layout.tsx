import '~/styles/globals.css';

export const metadata = {
    title: 'Personal Portfolio',
    description: 'Showcasing projects and skills',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}