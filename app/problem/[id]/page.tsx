'use client';

import ConsoleInput from "@/app/component/ConsoleInput";
import { useState, useEffect } from 'react';

const ProblemPage = ({ params }: { params: { id: string } }) => {
    // const [data, setData] = useState(null);
    const [title, setTitle] = useState(''); // title 상태 추가
    const [description, setDescription] = useState(''); // description 상태 추가
    const id = params.id;

    useEffect(() => {
        const fetchProblem = async () => {
            const response = await fetch(`/api/get-problem/${id}`);
            const dataJSON = await response.json();

            if (response.ok) {
                // setData(dataJSON);
                setTitle(dataJSON.title); // 첫 번째 줄을 title로 설정
                setDescription(dataJSON.description); // 나머지 줄을 description으로 설정
            } else {
                // setData(null);
                alert(dataJSON.message); // 에러 메시지 표시
            }
        };

        fetchProblem();
    }, [id]); // id가 변경될 때만 호출

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
