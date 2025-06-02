'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StarsBackground } from '@/components/ui/stars-background';
import { Spotlight } from '@/components/ui/spotlight-new';

export default function AuthPage() {
    const router = useRouter();

    // Example social auth handlers (replace with your actual logic)
    const handleGoogleSignIn = () => {
        router.push('/api/auth/google');
    };

    const handleGithubSignIn = () => {
        router.push('/api/auth/github');
    };

    const handleFacebookSignIn = () => {
        router.push('/api/auth/facebook');
    };

    return (
        <>
            <ScrollArea className="w-screen h-screen z-10 font-[family-name:var(--font-geist-sans)]">
                <Spotlight />
                <div className="min-h-screen flex items-center justify-center text-primary p-5">
                    <Card className="rounded-2xl shadow-2xl w-full max-w-md bg-muted/50">
                        <CardHeader>
                            <Image
                                src="/images/logo.png"
                                alt="Chatpoka Logo"
                                width={150}
                                height={100}
                                className="mx-auto mb-4"
                            />

                            <h2 className="text-lg font-bold mb-6 text-center">
                                Sign in with your account
                            </h2>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <button
                                onClick={handleGoogleSignIn}
                                className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 font-semibold py-2 rounded-lg transition duration-200"
                            >
                                <span className="mr-2">
                                    {/* Google Icon */}
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M21.805 10.023h-9.765v3.954h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.25s2.75-6.25 6.125-6.25c1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.703-1.57-3.898-2.523-6.656-2.523-5.523 0-10 4.477-10 10s4.477 10 10 10c5.75 0 9.547-4.023 9.547-9.695 0-.648-.07-1.141-.156-1.574z" /></svg>
                                </span>
                                Sign in with Google
                            </button>
                            <button
                                onClick={handleFacebookSignIn}
                                className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 font-semibold py-2 rounded-lg transition duration-200"
                            >
                                <span className="mr-2">
                                    {/* Updated Facebook Icon (2023) - No Outer Circle */}
                                    <svg width="20" height="20" viewBox="4 4 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 12.05C19.9813 10.5255 19.5273 9.03809 18.6915 7.76295C17.8557 6.48781 16.673 5.47804 15.2826 4.85257C13.8921 4.2271 12.3519 4.01198 10.8433 4.23253C9.33473 4.45309 7.92057 5.10013 6.7674 6.09748C5.61422 7.09482 4.77005 8.40092 4.3343 9.86195C3.89856 11.323 3.88938 12.8781 4.30786 14.3442C4.72634 15.8103 5.55504 17.1262 6.69637 18.1371C7.83769 19.148 9.24412 19.8117 10.75 20.05V14.38H8.75001V12.05H10.75V10.28C10.7037 9.86846 10.7483 9.45175 10.8807 9.05931C11.0131 8.66687 11.23 8.30827 11.5161 8.00882C11.8022 7.70936 12.1505 7.47635 12.5365 7.32624C12.9225 7.17612 13.3368 7.11255 13.75 7.14003C14.3498 7.14824 14.9482 7.20173 15.54 7.30003V9.30003H14.54C14.3676 9.27828 14.1924 9.29556 14.0276 9.35059C13.8627 9.40562 13.7123 9.49699 13.5875 9.61795C13.4627 9.73891 13.3667 9.88637 13.3066 10.0494C13.2464 10.2125 13.2237 10.387 13.24 10.56V12.07H15.46L15.1 14.4H13.25V20C15.1399 19.7011 16.8601 18.7347 18.0985 17.2761C19.3369 15.8175 20.0115 13.9634 20 12.05Z" fill="#ffffff"></path>
                                    </svg>
                                </span>
                                Sign in with Facebook
                            </button>
                            <button
                                onClick={handleGithubSignIn}
                                className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 rounded-lg transition duration-200"
                            >
                                <span className="mr-2">
                                    {/* GitHub Icon */}
                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576 4.765-1.588 8.2-6.084 8.2-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                </span>
                                Sign in with GitHub
                            </button>
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant={"link"}
                                onClick={() => router.push('/')}
                            >
                                <ArrowLeft /> Go back to home
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </ScrollArea>
            <StarsBackground />
        </>
    );
}
