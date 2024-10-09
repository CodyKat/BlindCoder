import Link from "next/link";

const ProblemsListContainer = ({ problems }) => {

    return (
        <div className="problemlist-table-container">
            <table className="problemlist-table">
                <thead>
                    <tr>
                        <th className="id-column">ID</th>
                        <th className="title-column">제목</th>
                        <th className="summary">설명</th>
                        <th className="submit">제출</th>
                        <th className="correct">맞힌 사람</th>
                        <th className="correct-rate">정답 비율</th>
                        <th className="correct-time-average">평균 통과 시간</th>
                    </tr>
                </thead>
                <tbody>
                    {problems.map((problem) => {
                        // 각 문제에 대해 `totalPlaytime` 계산
                        const timeString = problem.totalPlaytime || "00:00:00";
                        const [hours, minutes, seconds] = timeString.split(':').map(Number);
                        const totalPlaytimeSeconds = hours * 3600 + minutes * 60 + seconds;

                        // 평균 통과 시간 및 정답 비율 계산
                        const correctTimeAverageSeconds = problem.correct > 0 ? (totalPlaytimeSeconds / problem.correct) / 100 : 0;
                        const correctRate = problem.submit > 0 ? (problem.correct / problem.submit) * 100 : 0;

                        return (
                            <tr key={problem.id}>
                                <td>{problem.id}</td>
                                <td>
                                    <Link href={`/problem/${problem.id}`}>
                                        {problem.title}
                                    </Link>
                                </td>
                                <td>{problem.summary}</td>
                                <td>{problem.submit}</td>
                                <td>{problem.correct}</td>
                                <td>{correctRate.toFixed(2)}%</td>
                                <td>{correctTimeAverageSeconds.toFixed(2)} 분</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ProblemsListContainer;