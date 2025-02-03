'use client';

import ConsoleInput from "./ConsoleInput";
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';

const ProblemPage = ({ params }: { params: { id: string } }) => {
    const [title, setTitle] = useState<string | null>(null);
    const [summary, setSummary] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [language, setLanguage] = useState<string>("c");
    const [remainingTime, setRemainingTime] = useState<string>("00:00:00");
    const id = params.id;
    const router = useRouter();


    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value);
        console.log('Selected language:', event.target.value);
    };


    useEffect(() => {
        const fetchProblem = async () => {
            const response = await fetch(`/api/problemAlldata/${id}`, {
                method: 'GET',
                credentials: 'include'
            });
            if (response.status === 401) {
                router.push(`/login?redirectTo=problem/${id}`);
            }
            const dataJSON = await response.json();

            if (response.ok) {
                setTitle(dataJSON.title);
                setSummary(dataJSON.summary);
                setDescription(dataJSON.description);
            } else {
                alert(dataJSON.message);
            }
        };

        const fetchRemainingTime = async () => {
            const response = await fetch(`/api/remaining-time`, {
                method: 'GET',
                credentials: 'include',
            });
            const remainTime = await response.json();
            if (response.ok) {
                const remainTimeSeconds = Math.floor(remainTime.time / 1000);
                const hours = Math.floor(remainTimeSeconds / 3600);
                const minutes = Math.floor((remainTimeSeconds % 3600) / 60);
                const seconds = remainTimeSeconds % 60;

                const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                setRemainingTime(formattedTime);
            } else {
                console.error('Failed to fetch remaining time:', remainTime.message);
            }
        };

        fetchRemainingTime();

        fetchProblem();
    }, [id]);

    return (
        <div>
            <h1>{title} : {summary}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <p>language: </p>
                <select style={{ color: '#000'}}
                    id="language-select"
                    value={language}
                    onChange={handleLanguageChange}>
                    <option value="c">C</option>
                    <option value="javascript">javascript</option>
                    <option value="java">java</option>
                    <option value="c++">c++</option>
                    <option value="python">python</option>
                    <option value="rust">rust</option>
                </select>
                <p>남은 시간: {remainingTime}</p>
            </div>

            <div>
                <div className="stage-container">
                    <div className="problem-description">
                        {description}
                    </div>
                    <ConsoleInput language={language}/>
                </div>
                <div className="output-console">
                    output console
                </div>
            </div>
        </div>
    );
};

export default ProblemPage;
