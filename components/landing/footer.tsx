import React from 'react';

const Footer: React.FC = () => (
    <footer className='flex flex-col items-center justify-center p-5 md:py-10 text-primary text-center backdrop-blur-sm'>
        <div>
            &copy; {new Date().getFullYear()} Chatpoka. All rights reserved.
        </div>
        <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
            <a href="/privacy" style={{ color: '#aaa', marginRight: '1rem' }}>Privacy Policy</a>
            <a href="/terms" style={{ color: '#aaa' }}>Terms of Service</a>
        </div>
    </footer>
);

export default Footer;
