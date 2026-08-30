'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Zap, Cpu, Fingerprint, Pencil, Settings2, Sparkles } from 'lucide-react';
import { FeatureCard } from '@/components/ui/grid-feature-cards';

const features = [
    {
        title: 'Faaast',
        icon: Zap,
        description: 'It supports an entire helping developers and innovate.',
    },
    {
        title: 'Powerful',
        icon: Cpu,
        description: 'It supports an entire helping developers and businesses.',
    },
    {
        title: 'Security',
        icon: Fingerprint,
        description: 'It supports an helping developers businesses.',
    },
    {
        title: 'Customization',
        icon: Pencil,
        description: 'It supports helping developers and businesses innovate.',
    },
    {
        title: 'Control',
        icon: Settings2,
        description: 'It supports helping developers and businesses innovate.',
    },
    {
        title: 'Built for AI',
        icon: Sparkles,
        description: 'It supports helping developers and businesses innovate.',
    },
];

export default function DemoOne() {
    return (
        // The shadcn tokens default to a light palette (near-black foreground);
        // wrapping in `.dark` switches them so the cards read against the
        // site's black background instead of disappearing.
        <div className="dark min-h-svh bg-background">
            <section className="py-16 md:py-32">
                <div className="mx-auto w-full max-w-5xl space-y-8 px-4">
                    <AnimatedContainer className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold tracking-wide text-balance md:text-4xl lg:text-5xl xl:font-extrabold">
                            Power. Speed. Control.
                        </h2>
                        <p className="text-muted-foreground mt-4 text-sm tracking-wide text-balance md:text-base">
                            Everything you need to build fast, secure, scalable apps.
                        </p>
                    </AnimatedContainer>

                    <AnimatedContainer
                        delay={0.4}
                        className="grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed sm:grid-cols-2 md:grid-cols-3"
                    >
                        {features.map((feature, i) => (
                            <FeatureCard key={i} feature={feature} />
                        ))}
                    </AnimatedContainer>
                </div>
            </section>
        </div>
    );
}

type ViewAnimationProps = {
    delay?: number;
    className?: React.ComponentProps<'div'>['className'];
    children: React.ReactNode;
};

// Reveal-on-scroll without a motion library: an IntersectionObserver flips the
// element to its final state the first time it enters the viewport, and CSS
// transitions animate the blur/fade/rise. Honours prefers-reduced-motion.
function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [inView, setInView] = useState(false);
    const [prefersReduced, setPrefersReduced] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const reduced =
            typeof window.matchMedia === 'function' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        setPrefersReduced(reduced);
        if (reduced) {
            setInView(true);
            return;
        }

        if (typeof IntersectionObserver === 'undefined') {
            setInView(true);
            return;
        }

        const io = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    setInView(true);
                    io.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(-8px)',
                filter: inView ? 'blur(0px)' : 'blur(4px)',
                transition: prefersReduced
                    ? 'none'
                    : `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s, filter 0.8s ease ${delay}s`,
            }}
        >
            {children}
        </div>
    );
}
