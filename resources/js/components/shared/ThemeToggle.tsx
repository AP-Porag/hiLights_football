import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false;
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        }
    }, []);

    const toggle = () => {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle('dark', next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label="Toggle theme"
            className="h-9 w-9 text-[#475569] hover:bg-[#FFF3EB] hover:text-[#FF6B00] dark:text-[#9A9A9A] dark:hover:bg-[rgba(255,107,0,0.08)] dark:hover:text-[#FF6B00]"
        >
            <Moon className="block h-4 w-4 dark:hidden" />
            <Sun className="hidden h-4 w-4 dark:block" />
        </Button>
    );
}
