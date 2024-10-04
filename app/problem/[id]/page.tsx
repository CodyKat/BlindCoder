'use client';

import ConsoleInput from "@/app/component/ConsoleInput";
import { useState, useEffect } from 'react';

const ProblemPage = ({ params }: { params: { id: string } }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const id = params.id;

    useEffect(() => {
        const fetchProblem = async () => {
            const response = await fetch(`/api/get-problem/${id}`);
            const dataJSON = await response.json();

            if (response.ok) {
                setTitle(dataJSON.title);
                setDescription(dataJSON.description);
            } else {
                alert(dataJSON.message);
            }
        };

        fetchProblem();
    }, [id]);

    return (
        <div>
            <h1>{title}</h1>
            <div>
                <div className="stage-container">
                    <div className="problem-description">
                        {description}
                    </div>
                    <ConsoleInput />
                </div>
                <div className="output-console">
                    output console
                </div>
            </div>
        </div>
    );
};

export default ProblemPage;
